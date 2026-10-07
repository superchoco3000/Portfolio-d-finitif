import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { LanguageProvider, useLanguage } from './hooks/useLanguage'
import type { Lang } from './data/projects'
import Hero      from './components/Hero'
import About     from './components/About'
import Portfolio from './components/Portfolio'
import Services  from './components/Services'
import Contact   from './components/Contact'
import Admin     from './pages/Admin'

// ─────────────────────────────────────────────────────────────────
// SELECTOR DE IDIOMA
// ─────────────────────────────────────────────────────────────────
function LanguageSelector() {
  const { lang, setLang, SUPPORTED_LANGS } = useLanguage()
  return (
    <div style={s.langSelector}>
      {SUPPORTED_LANGS.map((l: Lang) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{ ...s.langBtn, ...(lang === l ? s.langBtnActive : {}) }}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────
function Header() {
  const { lang } = useLanguage()

  const navLabels: Record<string, { about: string; portfolio: string; services: string; contact: string }> = {
    fr: { about: 'À propos', portfolio: 'Portfolio', services: 'Services', contact: 'Contact' },
    es: { about: 'Sobre mí', portfolio: 'Portfolio', services: 'Servicios', contact: 'Contacto' },
    en: { about: 'About',     portfolio: 'Portfolio', services: 'Services', contact: 'Contact' },
  }
  const nav = navLabels[lang]

  return (
    <header style={s.header}>
      <div className="container" style={s.headerInner}>
        <a href="#hero" style={s.logo} aria-label="Lucas Casanove — Accueil">
          Lucas <span style={{ color: 'var(--color-primary)' }}>Casanove</span>
        </a>
        <nav style={s.nav} aria-label="Navigation principale">
          <a href="#about"     style={s.navLink}>{nav.about}</a>
          <a href="#portfolio" style={s.navLink}>{nav.portfolio}</a>
          <a href="#services"  style={s.navLink}>{nav.services}</a>
          <a href="#contact"   style={s.navLink}>{nav.contact}</a>
        </nav>
        <LanguageSelector />
      </div>
    </header>
  )
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────
function Footer() {
  const { lang } = useLanguage()
  const [adminMode, setAdminMode] = React.useState(false)

  const copy: Record<string, string> = {
    fr: `© ${new Date().getFullYear()} Lucas Casanove · Tous droits réservés`,
    es: `© ${new Date().getFullYear()} Lucas Casanove · Todos los derechos reservados`,
    en: `© ${new Date().getFullYear()} Lucas Casanove · All rights reserved`,
  }

  const handleSecretClick = (e: React.MouseEvent) => {
    if (e.detail >= 5 && !adminMode) {
      setAdminMode(true)
      const msg = lang === 'fr' ? 'Mode Admin Activé' : lang === 'es' ? 'Modo Admin Activado' : 'Admin Mode Activated'
      alert(msg)
    }
  }

  return (
    <footer style={s.footer}>
      <div className="container text-center">
        <p 
          style={{ ...s.footerText, cursor: adminMode ? 'default' : 'pointer', userSelect: 'none' }} 
          onClick={handleSecretClick}
        >
          {copy[lang]}
        </p>
        {adminMode && (
          <div style={{ marginTop: '1rem' }}>
            <Link to="/admin" style={s.btnAdminVisible}>Accéder au Panel Admin</Link>
          </div>
        )}
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────
// SCROLL-TO-TOP
// ─────────────────────────────────────────────────────────────────
function ScrollTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={s.scrollTop}
      aria-label="Retour en haut"
    >
      ↑
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────
// SHELL DE LA APP
// ─────────────────────────────────────────────────────────────────
function AppShell() {
  return (
    <div style={s.app}>
      <Header />

      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// ROOT — wrappé par le provider de langue et le router
// ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

// ─────────────────────────────────────────────────────────────────
// STYLES DU SHELL
// ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  app:           { minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' },

  // Header
  header:        { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(4, 11, 20, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)' },
  headerInner:   { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem', flexWrap: 'wrap', gap: '0.75rem' },
  logo:          { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-heading)', textDecoration: 'none', letterSpacing: '0.02em' },
  nav:           { display: 'flex', gap: '1.5rem' },
  navLink:       { fontFamily: 'var(--font-nav)', fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.03em' },

  // Sélecteur de langue
  langSelector:  { display: 'flex', gap: '0.4rem' },
  langBtn:       { background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-muted)', padding: '0.2rem 0.55rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-nav)', letterSpacing: '0.07em', transition: 'all 0.15s' },
  langBtnActive: { border: '1px solid var(--color-primary)', color: 'var(--color-primary)', background: 'var(--color-primary-dim)' },

  // Footer
  footer:        { background: 'var(--color-bg-dark)', borderTop: '1px solid var(--color-border)', padding: '1.5rem 0' },
  footerText:    { fontFamily: 'var(--font-nav)', fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 },
  btnAdminVisible: { display: 'inline-block', background: 'var(--color-primary-dim)', color: 'var(--color-primary)', padding: '0.4rem 1rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-nav)', transition: 'all 0.2s' },

  // Scroll-top
  scrollTop:     { position: 'fixed', bottom: '1.5rem', right: '1.5rem', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, boxShadow: '0 4px 16px var(--color-primary-glow)' },
}
