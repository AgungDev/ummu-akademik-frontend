import { Icon } from '../components/Icons'
import type { AuthSession } from '@ganz404/js-auth'
import { portals, type PortalConfig } from './portal-config'

interface PortalPageProps {
  portal: PortalConfig
  session: AuthSession
  onNavigate: (path: string) => void
  onLogout: () => void
}

function getDisplayName(session: AuthSession) {
  return session.user?.full_name || session.user?.email || session.user?.username || 'Developer'
}

export function PortalPage({ portal, session, onNavigate, onLogout }: PortalPageProps) {
  const displayName = getDisplayName(session)
  const initials = displayName.slice(0, 1).toUpperCase()

  return (
    <main className={`portal-shell theme-${portal.accent}`}>
      <aside className="sidebar">
        <a className="brand sidebar-brand" href="/developer" onClick={(event) => {
          event.preventDefault()
          onNavigate('/developer')
        }}>
          <span className="brand-symbol"><span /></span>
          <span className="brand-copy">
            <strong>UMMU</strong>
            <small>DIGITAL CAMPUS</small>
          </span>
        </a>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="portal-nav" aria-label="Pilih portal">
          {portals.map((item) => (
            <a
              aria-current={portal.id === item.id ? 'page' : undefined}
              className={`portal-nav-link ${portal.id === item.id ? 'active' : ''}`}
              href={item.path}
              key={item.id}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(item.path)
              }}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.title}</span>
              {portal.id === item.id && <i className="nav-active-mark" />}
            </a>
          ))}
        </nav>

        <div className="sidebar-note">
          <div className="sidebar-note-icon"><Icon name="spark" size={17} /></div>
          <strong>Satu kampus,<br />banyak kemungkinan.</strong>
          <span>UMMU Digital Ecosystem</span>
        </div>

        <button className="logout-button" onClick={onLogout} type="button">
          <Icon name="logout" size={18} />
          Keluar
        </button>
      </aside>

      <section className="portal-main">
        <header className="portal-topbar">
          <div className="breadcrumb">
            <span>UMMU</span><i>/</i><strong>{portal.title}</strong>
          </div>
          <div className="topbar-actions">
            <span className="semester-pill">TA 2025 / 2026</span>
            <span className="topbar-divider" />
            <div className="user-chip">
              <span className="user-avatar">{initials}</span>
              <span className="user-chip-copy">
                <strong>{displayName}</strong>
                <small>{portal.title}</small>
              </span>
            </div>
          </div>
        </header>

        <div className="portal-content">
          <section className="welcome-row">
            <div>
              <span className="eyebrow portal-eyebrow">{portal.subtitle}</span>
              <h1>{portal.greeting}</h1>
              <p>{portal.description}</p>
            </div>
            <div className="welcome-date">
              <span className="welcome-date-dot" />
              RUANG KAMPUS DIGITAL
            </div>
          </section>

          <section className="stat-grid" aria-label="Ringkasan">
            {portal.stats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <div className="stat-card-top">
                  <span>{stat.label}</span>
                  <span className="stat-icon"><Icon name={stat.icon} size={17} /></span>
                </div>
                <strong className="stat-value">{stat.value}</strong>
                <span className="stat-detail">{stat.detail}</span>
              </article>
            ))}
          </section>

          {portal.id === 'developer' ? (
            <DeveloperOverview portal={portal} />
          ) : (
            <RoleOverview portal={portal} />
          )}

          <footer className="portal-footer">
            <span>UMMU DIGITAL CAMPUS <i>·</i> MVP PREVIEW <i>·</i> DATA DEMO</span>
            <span>Butuh bantuan? Hubungi helpdesk kampus</span>
          </footer>
        </div>
      </section>
    </main>
  )
}

function DeveloperOverview({ portal }: { portal: PortalConfig }) {
  const bars = [38, 58, 46, 74, 52, 86, 66, 94, 72, 82, 57, 98]

  return (
    <section className="overview-grid">
      <article className="overview-card developer-chart-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DEVELOPER OVERVIEW</span>
            <h2>Aktivitas layanan</h2>
          </div>
          <span className="demo-tag"><i /> DEMO</span>
        </div>
        <div className="chart-summary">
          <strong>99.94<span>%</span></strong>
          <span>uptime simulasi <b>data contoh</b></span>
        </div>
        <div className="mini-chart" role="img" aria-label="Grafik uptime layanan dalam 12 minggu terakhir">
          {bars.map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} className={index === 11 ? 'bar-current' : ''} />
          ))}
        </div>
        <div className="chart-axis"><span>12 minggu lalu</span><span>Minggu ini</span></div>
      </article>

      <article className="overview-card activity-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SYSTEM STATUS</span>
            <h2>Komponen utama</h2>
          </div>
          <button className="text-action" type="button">Lihat semua <Icon name="arrow" size={14} /></button>
        </div>
        <div className="system-list">
          {[
            ['API Gateway', 'Contoh status layanan', 'gateway'],
            ['Auth Service', 'Contoh status layanan', 'auth'],
            ['Academic Core', 'Contoh status layanan', 'academic'],
          ].map(([name, status, id]) => (
            <div className="system-row" key={id}>
              <span className={`system-symbol system-${id}`}>{id === 'gateway' ? '⌘' : id === 'auth' ? '◈' : '✳'}</span>
              <span className="system-copy"><strong>{name}</strong><small>{status}</small></span>
              <span className="system-health"><i /> Preview</span>
            </div>
          ))}
        </div>
      </article>

      <article className="overview-card actions-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">QUICK ACCESS</span>
            <h2>{portal.focusTitle}</h2>
          </div>
          <span className="action-count">03</span>
        </div>
        <p className="actions-intro">{portal.focusDescription}</p>
        <div className="quick-action-list">
          {portal.actions.map((action) => (
            <div className="quick-action" key={action.title}>
              <span className="quick-action-icon"><Icon name={action.icon} size={18} /></span>
              <span><strong>{action.title}</strong><small>{action.description}</small></span>
              <Icon name="arrow" size={15} />
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

function RoleOverview({ portal }: { portal: PortalConfig }) {
  return (
    <section className="role-overview">
      <article className="role-hero-card">
        <div className="role-hero-copy">
          <span className="eyebrow">RUANG KERJAMU</span>
          <h2>{portal.focusTitle}</h2>
          <p>{portal.focusDescription}</p>
          <span className="preview-label"><Icon name="spark" size={14} /> Tampilan awal MVP</span>
        </div>
        <div className="role-hero-art" aria-hidden="true">
          <span className="role-orbit orbit-a" />
          <span className="role-orbit orbit-b" />
          <span className="role-art-icon"><Icon name={portal.icon} size={45} /></span>
          <span className="role-art-dot dot-a" />
          <span className="role-art-dot dot-b" />
        </div>
      </article>
      <div className="role-action-grid">
        {portal.actions.map((action, index) => (
          <article className="role-action-card" key={action.title}>
            <span className="role-action-index">0{index + 1}</span>
            <span className="role-action-icon"><Icon name={action.icon} size={20} /></span>
            <h3>{action.title}</h3>
            <p>{action.description}</p>
            <span className="role-action-link">Buka layanan <Icon name="arrow" size={14} /></span>
          </article>
        ))}
      </div>
    </section>
  )
}
