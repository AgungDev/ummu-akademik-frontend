import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthSession } from '@ganz404/js-auth'
import { AuthContext, type AuthContextValue } from './auth-context'
import {
  authClient,
  authenticatedHttp,
  getCurrentUser,
  loginWithPassword,
  sessionManager,
  tokenManager,
} from '../lib/auth/client'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() =>
    sessionManager.get(),
  )

  useEffect(() => sessionManager.subscribe(setSession), [])

  const signIn = useCallback(async (username: string, password: string) => {
    const nextSession = await loginWithPassword(username, password)
    tokenManager.setSession(nextSession)
    return nextSession
  }, [])

  const completeGoogleLogin = useCallback(async () => {
    const nextSession = authClient.handleCallback()
    tokenManager.setSession(nextSession)

    try {
      const user = await getCurrentUser()
      const sessionWithUser = { ...nextSession, user }
      tokenManager.setSession(sessionWithUser)
      return sessionWithUser
    } catch (error) {
      tokenManager.clear()
      throw error
    }
  }, [])

  const loginWithGoogle = useCallback(() => authClient.login(), [])

  const logout = useCallback(async () => {
    try {
      const currentSession = sessionManager.get()
      if (currentSession) {
        const sdkSession = authClient.getSession()
        if (sdkSession?.accessToken === currentSession.accessToken) {
          await authClient.logout()
          return
        }

        const response = await authenticatedHttp.fetch('/api/v1/auth/logout', {
          method: 'POST',
        })
        if (!response.ok) {
          throw new Error(`Logout gagal (HTTP ${response.status}).`)
        }
      }
    } finally {
      tokenManager.clear()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: sessionManager.isAuthenticated(),
      getAccessToken: () => tokenManager.getAccessToken(),
      signIn,
      loginWithGoogle,
      completeGoogleLogin,
      logout,
    }),
    [session, signIn, loginWithGoogle, completeGoogleLogin, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
