import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { type ServiceData, getServiceText } from '../data/services'
import { projects, getProjectText } from '../data/projects'

interface Props {
  service: ServiceData
  onClose: () => void
}

export default function ServiceDetailModal({ service, onClose }: Props) {
  const { lang } = useLanguage()
  const { title, subtitle, fullSalesCopy, features } = getServiceText(service, lang)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const ctaText = {
    fr: 'Demander un devis',
    es: 'Solicitar presupuesto',
    en: 'Request a quote'
  }[lang]

  const relatedTitle = {
    fr: 'Exemples réels',
    es: 'Ejemplos reales',
    en: 'Real examples'
  }[lang]

  const handleCtaClick = () => {
    onClose()
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  // Filter the projects based on the current service's examples array
  const relatedProjects = projects.filter(p => service.examples?.includes(p.slug))

  return (
    <motion.div 
      style={s.overlay} 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        style={s.panel} 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.4 }}
      >
        <div style={s.panelHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <i className={`bi ${service.icon}`} style={s.modalIcon}></i>
            <div>
              <span style={s.modalCategory}>{title}</span>
              <span style={s.modalSubtitle}>{subtitle}</span>
            </div>
          </div>
          <button onClick={onClose} style={s.closeBtn} aria-label="Close">✕</button>
        </div>

        <div style={s.imageWrapper}>
          <img src={service.imagePath} alt={title} style={s.image} />
        </div>

        <p style={s.modalDesc}>{fullSalesCopy}</p>

        <div style={s.section}>
          <h4 style={s.sectionLabel}>
            {lang === 'fr' ? 'Avantages & Fonctionnalités' : lang === 'es' ? 'Ventajas y Características' : 'Benefits & Features'}
          </h4>
          <ul style={s.featureList}>
            {features.map((feat, i) => (
              <li key={i} style={s.featureItem}>
                <i className="bi bi-check2-circle" style={s.checkIcon}></i>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {relatedProjects.length > 0 && (
          <div style={s.section}>
            <h4 style={s.sectionLabel}>{relatedTitle}</h4>
            <div style={s.relatedList}>
              {relatedProjects.map((rp) => {
                const rpText = getProjectText(rp, lang)
                const url = rp.links.liveUrl || rp.links.githubUrl || '#'
                return (
                  <motion.a 
                    key={rp.id}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    style={s.relatedCard}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'var(--color-primary)' }}
                  >
                    <div style={s.relatedImageWrapper}>
                      <img src={rp.images.thumbnail} alt={rpText.title} style={s.relatedImage} />
                    </div>
                    <div style={s.relatedInfo}>
                      <h5 style={s.relatedTitle}>{rpText.title}</h5>
                      <p style={s.relatedSubtitle}>{rpText.shortDescription}</p>
                    </div>
                    <i className="bi bi-arrow-up-right" style={s.relatedIcon}></i>
                  </motion.a>
                )
              })}
            </div>
          </div>
        )}

        <div style={s.footer}>
          <button onClick={handleCtaClick} style={s.btnPrimary}>
            {ctaText} <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const s: Record<string, React.CSSProperties> = {
  // Modal overlay
  overlay:            { position: 'fixed', inset: 0, background: 'rgba(4, 11, 20, 0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' },

  // Modal panel
  panel:              { background: 'var(--color-surface-dark)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2rem', width: '100%', maxWidth: '580px', maxHeight: '88vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  panelHeader:        { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  modalIcon:          { fontSize: '1.8rem', color: 'var(--color-primary)' },
  modalCategory:      { background: 'var(--color-primary-dim)', color: 'var(--color-primary)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.5rem', fontFamily: 'var(--font-nav)' },
  modalSubtitle:      { color: 'var(--color-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-nav)' },
  closeBtn:           { background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-muted)', width: '32px', height: '32px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  
  imageWrapper:       { width: '100%', height: '180px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' },
  image:              { width: '100%', height: '100%', objectFit: 'cover' },

  modalDesc:          { fontSize: '1rem', color: 'var(--color-heading)', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-nav)' },
  
  section:            { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  sectionLabel:       { fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', margin: 0, fontFamily: 'var(--font-nav)' },
  
  featureList:        { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  featureItem:        { display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--color-accent)', fontSize: '0.9rem', fontFamily: 'var(--font-nav)', lineHeight: 1.5 },
  checkIcon:          { color: 'var(--color-primary)', fontSize: '1rem', marginTop: '0.1rem' },

  relatedList:        { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  relatedCard:        { display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.6rem', textDecoration: 'none', transition: 'all 0.2s', cursor: 'pointer' },
  relatedImageWrapper:{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 },
  relatedImage:       { width: '100%', height: '100%', objectFit: 'cover' },
  relatedInfo:        { display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' },
  relatedTitle:       { color: 'var(--color-heading)', fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.1rem 0', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  relatedSubtitle:    { color: 'var(--color-muted)', fontSize: '0.75rem', margin: 0, fontFamily: 'var(--font-nav)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  relatedIcon:        { color: 'var(--color-muted)', fontSize: '1.1rem', paddingRight: '0.3rem' },

  footer:             { marginTop: '0.5rem', display: 'flex', justifyContent: 'center' },
  btnPrimary:         { display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-primary)', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '30px', textDecoration: 'none', fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-nav)', cursor: 'pointer', boxShadow: '0 4px 15px var(--color-primary-glow)', transition: 'transform 0.2s' },
}
