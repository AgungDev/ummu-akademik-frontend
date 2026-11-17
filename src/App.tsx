import { useCallback, useEffect, useState } from 'react'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { useAuth } from './hooks/useAuth'
import { LoginPage } from './pages/LoginPage'
import { GoogleCallbackPage } from './pages/GoogleCallbackPage'
import { PortalPage } from './pages/PortalPage'
import { portals } from './pages/portal-config'
import './App.css'

function App() {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [loginNotice, setLoginNotice] = useState<string>()
  const { session, logout } = useAuth()

  const navigate = useCallback((path: string, replace = false) => {
    if (replace) {
      window.history.replaceState(null, '', path)
    } else {
      window.history.pushState(null, '', path)
    }
    setPathname(window.location.pathname)
  }, [])

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const routePath = pathname === '/'
    ? session ? '/developer' : '/login'
    : pathname
  const activePortal = portals.find((portal) => portal.path === routePath)

  const handleAuthenticated = () => {
    setLoginNotice(undefined)
    navigate('/developer', true)
  }

  const handleLogout = () => {
    void logout()
      .catch((cause: unknown) => {
        setLoginNotice(
          cause instanceof Error ? cause.message : 'Logout tidak berhasil.',
        )
      })
      .finally(() => navigate('/login', true))
  }

  if (routePath === '/oauth/callback') {
    return (
      <GoogleCallbackPage
        onAuthenticated={handleAuthenticated}
        onError={(message) => {
          setLoginNotice(message)
          navigate('/login', true)
        }}
      />
    )
  }

  if (routePath === '/login' || !activePortal) {
    return (
      <LoginPage
        notice={loginNotice}
        onAuthenticated={handleAuthenticated}
      />
    )
  }

  if (activePortal) {
    return (
      <ProtectedRoute>
        {session ? (
          <PortalPage
            portal={activePortal}
            session={session}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        ) : null}
      </ProtectedRoute>
    )
  }

  return <div className="route-loading" aria-label="Memuat halaman" />
}

export default App
