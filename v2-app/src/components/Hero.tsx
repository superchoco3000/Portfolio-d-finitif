import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

// ── Typed text effect (sin librería externa) ──────────────────────
function TypedText({ items }: { items: string[] }) {
  const [current, setCurrent] = React.useState(0)
  const [displayed, setDisplayed] = React.useState('')
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    const target = items[current]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setCurrent((c) => (c + 1) % items.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, current, items])

  return (
    <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
      {displayed}
      <span style={{ borderRight: '2px solid var(--color-primary)', marginLeft: '2px', animation: 'blink 1s step-end infinite' }} />
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const { lang } = useLanguage()

  const i18n = {
    fr: {
      role:        'Développeur Web',
      roleAccent:  'Full-Stack',
      typedPrefix: 'Je suis un ',
      typed:       ['UI/UX Designer', 'Développeur Front-End', 'Développeur Back-End', 'Intégrateur Web'],
      desc:        'Passionné par la création d\'expériences numériques qui allient design innovant et développement fonctionnel. Je transforme vos idées en réalités web modernes, intuitives et performantes.',
      cta1:        'Mes projets',
      cta2:        'Me contacter',
    },
    es: {
      role:        'Desarrollador Web',
      roleAccent:  'Full-Stack',
      typedPrefix: 'Soy ',
      typed:       ['Diseñador UI/UX', 'Desarrollador Front-End', 'Desarrollador Back-End', 'Integrador Web'],
      desc:        'Apasionado por crear experiencias digitales que combinan diseño innovador y desarrollo funcional. Transformo tus ideas en realidades web modernas, intuitivas y eficientes.',
      cta1:        'Mis proyectos',
      cta2:        'Contáctame',
    },
    en: {
      role:        'Web Developer',
      roleAccent:  'Full-Stack',
      typedPrefix: 'I am a ',
      typed:       ['UI/UX Designer', 'Front-End Developer', 'Back-End Developer', 'Web Integrator'],
      desc:        'Passionate about crafting digital experiences that blend innovative design with functional development. I turn your ideas into modern, intuitive, and performant web realities.',
      cta1:        'My projects',
      cta2:        'Contact me',
    },
  }
  const t = i18n[lang]

  return (
    <motion.section 
      id="hero" 
      style={s.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cercles décoratifs (hérités du design original) */}
      <div style={s.circle1} aria-hidden="true" />
      <div style={s.circle2} aria-hidden="true" />

      <div className="container">
        <div className="row align-items-center gy-5">

          {/* Colonne texte */}
          <div className="col-lg-10" style={s.textCol}>
            <p style={s.eyebrow}>Lucas Casanove</p>
            <h1 style={s.title}>
              {t.role}{' '}
              <span style={{ color: 'var(--color-primary)' }}>{t.roleAccent}</span>
            </h1>
            <p style={s.typedLine}>
              {t.typedPrefix}<TypedText items={t.typed} />
            </p>
            <p style={s.desc}>{t.desc}</p>

            <div style={s.actions}>
              <a href="#portfolio" style={s.btnPrimary}>{t.cta1}</a>
              <a href="#contact"   style={s.btnOutline}>{t.cta2}</a>
            </div>

            <div style={s.socials}>
              <a href="https://github.com/superchoco3000"                     target="_blank" rel="noreferrer" style={s.socialLink} aria-label="GitHub">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/lucas-casanove-2790692a6/" target="_blank" rel="noreferrer" style={s.socialLink} aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </motion.section>
  )
}

// ─────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  section:     { position: 'relative', overflow: 'hidden', padding: '6rem 0 5rem', minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--color-bg-dark)' },
  circle1:     { position: 'absolute', top: '-120px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, var(--color-primary-dim) 0%, transparent 70%)', pointerEvents: 'none' },
  circle2:     { position: 'absolute', bottom: '-100px', left: '-60px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' },
  textCol:     { position: 'relative', zIndex: 1 },
  eyebrow:     { fontFamily: 'var(--font-nav)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', marginBottom: '0.5rem' },
  title:       { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-heading)', lineHeight: 1.15, marginBottom: '1rem' },
  typedLine:   { fontFamily: 'var(--font-default)', fontSize: '1.1rem', color: 'var(--color-muted)', marginBottom: '1.25rem', minHeight: '1.6rem' },
  desc:        { fontFamily: 'var(--font-default)', color: 'var(--color-muted)', lineHeight: 1.8, fontSize: '0.95rem', maxWidth: '520px', marginBottom: '2rem' },
  actions:     { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' },
  btnPrimary:  { background: 'var(--color-primary)', color: '#fff', padding: '0.65rem 1.6rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-nav)', fontSize: '0.9rem', transition: 'opacity 0.2s' },
  btnOutline:  { background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', padding: '0.65rem 1.6rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-nav)', fontSize: '0.9rem' },
  socials:     { display: 'flex', gap: '0.75rem' },
  socialLink:  { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '8px', border: '1px solid var(--color-border)', color: 'var(--color-muted)', transition: 'all 0.2s' },
  photoWrapper:{ position: 'relative', display: 'inline-block', maxWidth: '340px' },
  photoBg:     { position: 'absolute', inset: '-12px', borderRadius: '50%', background: 'radial-gradient(circle, var(--color-primary-dim) 0%, transparent 70%)', zIndex: 0 },
  photo:       { width: '100%', maxWidth: '300px', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '50%', border: '3px solid var(--color-border)', position: 'relative', zIndex: 1 },
}
