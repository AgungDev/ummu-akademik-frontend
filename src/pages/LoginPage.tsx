import { useState, type FormEvent } from 'react'
import { Icon } from '../components/Icons'
import { useAuth } from '../hooks/useAuth'

interface LoginPageProps {
  notice?: string
  onAuthenticated: () => void
}

const portalNames = ['Developer', 'Keuangan', 'Administrasi', 'Mahasiswa', 'Dosen']

export function LoginPage({ notice, onAuthenticated }: LoginPageProps) {
  const { signIn, loginWithGoogle } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(undefined)
    setIsSubmitting(true)

    try {
      await signIn(username.trim(), password)
      onAuthenticated()
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Login tidak berhasil. Silakan coba kembali.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleGoogleLogin() {
    loginWithGoogle()
  }

  return (
    <main className="login-page">
      <section className="login-visual" aria-label="UMMU Digital Campus">
        <div className="visual-topbar">
          <div className="brand brand-light" aria-label="UMMU Digital Campus">
            <span className="brand-symbol"><span /></span>
            <span className="brand-copy">
              <strong>UMMU</strong>
              <small>DIGITAL CAMPUS</small>
            </span>
          </div>
          <span className="campus-status"><i /> DIGITAL CAMPUS</span>
        </div>

        <div className="visual-copy">
          <span className="eyebrow eyebrow-light"><Icon name="spark" size={15} /> SATU AKSES, BANYAK KEMUNGKINAN</span>
          <h1>
            Ruang baru
            <br />
            untuk <span>bertumbuh.</span>
          </h1>
          <p>
            Semua perjalanan akademik dan kolaborasi kampus, kini berada dalam
            satu ekosistem digital yang terhubung.
          </p>
        </div>

        <div className="campus-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-sun" />
          <div className="art-building building-back">
            <i /><i /><i /><i /><i /><i />
          </div>
          <div className="art-building building-front">
            <span className="building-roof" />
            <span className="building-floor floor-one"><i /><i /><i /><i /></span>
            <span className="building-floor floor-two"><i /><i /><i /><i /></span>
            <span className="building-door" />
          </div>
          <div className="art-ground" />
          <div className="art-glow" />
          <div className="art-label"><span>01</span> YOUR CAMPUS, IN SYNC</div>
        </div>

        <div className="visual-bottom">
          <span>MALUKU UTARA, INDONESIA</span>
          <span>LEARN · BUILD · BELONG</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-mobile-brand">
          <div className="brand" aria-label="UMMU Digital Campus">
            <span className="brand-symbol"><span /></span>
            <span className="brand-copy">
              <strong>UMMU</strong>
              <small>DIGITAL CAMPUS</small>
            </span>
          </div>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <span className="eyebrow">SELAMAT DATANG KEMBALI</span>
            <h2>Masuk ke ruangmu.</h2>
            <p>Gunakan akun kampus untuk melanjutkan.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username kampus</label>
            <div className="input-wrap">
              <span className="input-leading" aria-hidden="true">U</span>
              <input
                autoComplete="username"
                id="username"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Masukkan username"
                required
                type="text"
                value={username}
              />
            </div>
            <span className="field-hint">
              Gunakan username akun UMMU, bukan alamat email.
            </span>

            <div className="password-label">
              <label htmlFor="password">Kata sandi</label>
              <span>Gunakan akun UMMU</span>
            </div>
            <div className="input-wrap">
              <span className="input-leading password-dot" aria-hidden="true">●</span>
              <input
                autoComplete="current-password"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan kata sandi"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              <button
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                className="password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </div>

            {(error || notice) && (
              <div className="form-message" role="alert">
                {error || notice}
              </div>
            )}

            <button className="primary-button" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <><span className="button-spinner" /> Memeriksa akun...</>
              ) : (
                <>Masuk ke portal <Icon name="arrow" size={17} /></>
              )}
            </button>
          </form>

          <div className="or-divider"><span>ATAU LANJUTKAN DENGAN</span></div>

          <button className="google-button" onClick={handleGoogleLogin} type="button">
            <span className="google-mark" aria-hidden="true">G</span>
            Masuk dengan Google
          </button>

          <div className="login-footnote">
            <span className="security-dot" />
            Akses aman melalui UMMU Identity
          </div>
        </div>

        <div className="portal-preview">
          <span className="portal-preview-label">SATU AKUN UNTUK</span>
          <div className="portal-chips">
            {portalNames.map((name) => <span key={name}>{name}</span>)}
          </div>
        </div>

        <footer className="login-footer">
          <span>© 2026 UMMU · DIGITAL CAMPUS</span>
          <span>Butuh bantuan? Hubungi helpdesk kampus</span>
        </footer>
      </section>
    </main>
  )
}
