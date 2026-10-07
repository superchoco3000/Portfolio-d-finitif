import React from 'react'
import { motion } from 'framer-motion'
import AnimatedProfile from './AnimatedProfile'
import { useLanguage } from '../hooks/useLanguage'
import { profileData } from '../data/config'
import type { Lang } from '../data/config'

export default function About() {
  const { lang } = useLanguage()

  const i18n = {
    fr: {
      badge:       'Un peu plus sur moi',
      heading:     'Passionné par la création d\'expériences numériques',
      p1:          'Après un parcours enrichissant dans les domaines des lettres et de la vente, j\'ai découvert une véritable passion pour le développement web.',
      p2:          'En autodidacte déterminé, j\'ai acquis des compétences solides en programmation à travers des formations en ligne, des projets personnels et une pratique intensive. Cette reconversion m\'a permis de combiner créativité littéraire et sens du service avec les technologies modernes du web.',
      stats:       [{ n: '13+', l: 'Projets Réalisés' }, { n: '1+', l: 'An d\'expérience' }, { n: '3+', l: 'Clients satisfaits' }],
      details:     [
        { label: 'Stack Front',     value: 'HTML · CSS · JS · React · Bootstrap · Tailwind' },
        { label: 'Stack Back',      value: 'Node.js · Express · MongoDB · REST API' },
        { label: 'Formation',       value: 'Dév. Web Full-Stack + Angular (en cours)' },
        { label: 'Langues',         value: 'Français (natif) · Espagnol (natif) · Anglais (pro)' },
      ],
      cvBtn:       'Télécharger mon CV',
      contactBtn:  'Discutons',
      profileRole: 'Développeur Web & Designer / Intégrateur',
    },
    es: {
      badge:       'Un poco más sobre mí',
      heading:     'Apasionado por crear experiencias digitales',
      p1:          'Tras un enriquecedor recorrido en letras y ventas, descubrí una verdadera pasión por el desarrollo web.',
      p2:          'Como autodidacta determinado, adquirí sólidas habilidades de programación a través de cursos en línea, proyectos personales y práctica intensiva. Esta reconversión me permitió combinar creatividad literaria y vocación de servicio con las tecnologías web modernas.',
      stats:       [{ n: '13+', l: 'Proyectos Realizados' }, { n: '1+', l: 'Año de experiencia' }, { n: '3+', l: 'Clientes satisfechos' }],
      details:     [
        { label: 'Stack Front',     value: 'HTML · CSS · JS · React · Bootstrap · Tailwind' },
        { label: 'Stack Back',      value: 'Node.js · Express · MongoDB · REST API' },
        { label: 'Formación',       value: 'Dév. Web Full-Stack + Angular (en curso)' },
        { label: 'Idiomas',         value: 'Francés (nativo) · Español (nativo) · Inglés (profesional)' },
      ],
      cvBtn:       'Descargar mi CV',
      contactBtn:  'Hablemos',
      profileRole: 'Desarrollador Web y Diseñador / Integrador',
    },
    en: {
      badge:       'A bit more about me',
      heading:     'Passionate about crafting digital experiences',
      p1:          'After an enriching journey through literature and sales, I discovered a genuine passion for web development.',
      p2:          'As a determined self-taught developer, I built solid programming skills through online courses, personal projects, and intensive practice. This career change let me combine literary creativity and customer focus with modern web technologies.',
      stats:       [{ n: '13+', l: 'Projects Built' }, { n: '1+', l: 'Year of experience' }, { n: '3+', l: 'Happy clients' }],
      details:     [
        { label: 'Front Stack',     value: 'HTML · CSS · JS · React · Bootstrap · Tailwind' },
        { label: 'Back Stack',      value: 'Node.js · Express · MongoDB · REST API' },
        { label: 'Training',        value: 'Full-Stack Web Dev + Angular (ongoing)' },
        { label: 'Languages',       value: 'French (native) · Spanish (native) · English (professional)' },
      ],
      cvBtn:       'Download my CV',
      contactBtn:  'Let\'s talk',
      profileRole: 'Web Developer & Designer / Integrator',
    },
  }
  const t = i18n[lang]
  const bioData = profileData.bio[lang as Lang] || profileData.bio['fr']
  const stackData = profileData.stack[lang as Lang] || profileData.stack['fr']

  return (
    <motion.section 
      id="about" 
      style={s.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="row gy-5 align-items-center">

          {/* Carte profil */}
          <div className="col-lg-4">
            <div style={s.profileCard}>
              <div style={s.profileImgWrapper}>
                <AnimatedProfile style={{ width: '140px', height: '140px' }} />
                <div style={s.profileBadge} title="Développeur certifié">★</div>
              </div>
              <h3 style={s.profileName}>Lucas Casanove</h3>
              <p style={s.profileRole}>{t.profileRole}</p>
              <div style={s.profileLinks}>
                <a href="mailto:lucascasanove@yahoo.fr" style={s.profileLink}>
                  ✉ lucascasanove@yahoo.fr
                </a>
                <a href="tel:+33768657818" style={s.profileLink}>
                  ☎ +33 7 68 65 78 18
                </a>
                <span style={s.profileLink}>📍 160 avenue francis de pressencé, Vénissieux</span>
              </div>
            </div>
          </div>

          {/* Contenu biographique */}
          <div className="col-lg-8">
            <div style={s.content}>
              <span style={s.badge}>{t.badge}</span>
              <h2 style={s.heading}>{bioData.heading}</h2>
              <p style={s.text}>{bioData.p1}</p>
              <p style={s.text}>{bioData.p2}</p>

              {/* Stats */}
              <div style={s.statsGrid}>
                {t.stats.map((st) => (
                  <div key={st.l} style={s.statItem}>
                    <span style={s.statNum}>{st.n}</span>
                    <span style={s.statLabel}>{st.l}</span>
                  </div>
                ))}
              </div>

              {/* Détails en grille dynamique */}
              <div className="row gy-3" style={{ marginBottom: '1.75rem' }}>
                {stackData.map((d) => (
                  <div className="col-12" key={d.label}>
                    <div style={s.detailItem}>
                      <span style={s.detailLabel}>{d.label}</span>
                      <span style={s.detailValue}>{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={s.ctas}>
                <a
                  href={
                    lang === 'es'
                      ? '/assets/img/cvs/LUCAS_CASANOVE2025.pdf'
                      : lang === 'en'
                      ? '/assets/img/cvs/LUCAS.CASANOVE.pdf'
                      : '/assets/img/cvs/LucasCasanove2025.pdf'
                  }
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.btnPrimary}
                >
                  ↓ {t.cvBtn}
                </a>
                <a href="#contact" style={s.btnOutline}>
                  💬 {t.contactBtn}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  )
}

// ─────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  section:       { padding: '5rem 0', background: 'var(--color-bg)' },

  // Carte profil
  profileCard:   { background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
  profileImgWrapper: { position: 'relative', display: 'inline-block' },
  profileImg:    { width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-border)' },
  profileBadge:  { position: 'absolute', bottom: '4px', right: '4px', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 },
  profileName:   { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-heading)', margin: 0 },
  profileRole:   { fontFamily: 'var(--font-nav)', fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 },
  profileLinks:  { display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' },
  profileLink:   { fontFamily: 'var(--font-nav)', fontSize: '0.8rem', color: 'var(--color-muted)', textDecoration: 'none', textAlign: 'center' },

  // Contenu
  content:       { display: 'flex', flexDirection: 'column', gap: '0' },
  badge:         { display: 'inline-block', fontFamily: 'var(--font-nav)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', background: 'var(--color-primary-dim)', padding: '0.2rem 0.7rem', borderRadius: '4px', marginBottom: '0.75rem' },
  heading:       { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: 'var(--color-heading)', marginBottom: '1rem' },
  text:          { fontFamily: 'var(--font-default)', color: 'var(--color-muted)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '0.75rem' },

  // Stats
  statsGrid:     { display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
  statItem:      { display: 'flex', flexDirection: 'column', gap: '0.1rem' },
  statNum:       { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--color-primary)' },
  statLabel:     { fontFamily: 'var(--font-nav)', fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' },

  // Details
  detailItem:    { display: 'flex', flexDirection: 'column', gap: '0.15rem', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' },
  detailLabel:   { fontFamily: 'var(--font-nav)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', fontWeight: 700 },
  detailValue:   { fontFamily: 'var(--font-default)', fontSize: '0.85rem', color: 'var(--color-muted)' },

  // CTAs
  ctas:          { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' },
  btnPrimary:    { background: 'var(--color-primary)', color: '#fff', padding: '0.6rem 1.4rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-nav)', fontSize: '0.875rem' },
  btnOutline:    { background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', padding: '0.6rem 1.4rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-nav)', fontSize: '0.875rem' },
}
