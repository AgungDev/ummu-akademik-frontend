import { useEffect, type ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.replace(redirectTo)
    }
  }, [isAuthenticated, redirectTo])

  if (!isAuthenticated) {
    return <div className="route-loading" aria-label="Memuat halaman" />
  }
  return children
}
