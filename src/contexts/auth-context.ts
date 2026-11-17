import { createContext } from 'react'
import type { AuthSession } from '@ganz404/js-auth'

export interface AuthContextValue {
  session: AuthSession | null
  isAuthenticated: boolean
  getAccessToken: () => string | null
  signIn: (username: string, password: string) => Promise<AuthSession>
  loginWithGoogle: () => void
  completeGoogleLogin: () => Promise<AuthSession>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
