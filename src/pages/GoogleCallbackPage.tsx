import { useEffect, useRef } from 'react'
import { Icon } from '../components/Icons'
import { useAuth } from '../hooks/useAuth'

interface GoogleCallbackPageProps {
  onAuthenticated: () => void
  onError: (message: string) => void
}

const googleErrorMessages: Record<string, string> = {
  invalid_google_oauth_state: 'Sesi Google tidak valid. Silakan mulai login kembali.',
  google_login_denied: 'Login Google dibatalkan.',
  missing_authorization_code: 'Google tidak mengirimkan kode autentikasi.',
  google_login_unavailable: 'Login Google sedang tidak tersedia.',
  google_authentication_failed: 'Verifikasi akun Google gagal. Silakan coba lagi.',
  google_login_failed: 'Akun Google tidak dapat digunakan untuk masuk.',
}

export function GoogleCallbackPage({ onAuthenticated, onError }: GoogleCallbackPageProps) {
  const processed = useRef(false)
  const { completeGoogleLogin } = useAuth()

  useEffect(() => {
    if (processed.current) return
    processed.current = true

    void completeGoogleLogin()
      .then(() => onAuthenticated())
      .catch((cause: unknown) => {
        const message = cause instanceof Error ? cause.message : ''
        const errorCode = message.replace('Google login failed: ', '')
        onError(
          googleErrorMessages[errorCode] ??
            (message || 'Login Google tidak berhasil. Silakan coba kembali.'),
        )
      })
  }, [completeGoogleLogin, onAuthenticated, onError])

  return (
    <main className="callback-screen">
      <span className="callback-mark"><Icon name="spark" size={23} /></span>
      <h1>Menghubungkan akunmu</h1>
      <p>Login berhasil diproses. Sebentar, kami siapkan ruang kerjamu.</p>
      <span className="callback-loader" aria-label="Memuat" />
    </main>
  )
}
