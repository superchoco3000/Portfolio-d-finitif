import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useLanguage } from '../hooks/useLanguage'
import { supabase } from '../lib/supabaseClient'

// ─────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────
type HistoryFilter = 'all' | 'apps' | 'webs' | 'misc'

// ─────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const { lang } = useLanguage()
  const title = project.name
  const desc = project.descriptions?.[lang] || project.descriptions?.['en'] || ''

  const modalLabels = {
    fr: { links: 'Liens', visit: '\u2197 Voir le projet', noLinks: 'Aucun lien disponible' },
    es: { links: 'Enlaces', visit: '\u2197 Ver proyecto', noLinks: 'Sin enlaces disponibles' },
    en: { links: 'Links', visit: '\u2197 View project', noLinks: 'No links available' },
  }
  const ml = modalLabels[lang]

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

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
          <div>
            <span style={s.modalCategory}>{project.category === 'active' || project.category === 'history' || project.category === 'both' ? 'SaaS' : project.category}</span>
          </div>
          <button onClick={onClose} style={s.closeBtn} aria-label="Fermer">✕</button>
        </div>

        <h2 style={s.modalTitle}>{title}</h2>
        <p style={s.modalDesc}>{desc}</p>

        <div style={s.section}>
          <h4 style={s.sectionLabel}>Stack</h4>
          <div style={s.stackList}>
            {project.stack?.map((tech: string) => (
              <span key={tech} style={s.stackBadge}>{tech}</span>
            ))}
          </div>
        </div>

        <div style={s.section}>
          <h4 style={s.sectionLabel}>{ml.links}</h4>
          <div style={s.linksRow}>
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer" style={s.btnPrimary}>
                {ml.visit}
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer" style={s.btnOutline}>
                GitHub →
              </a>
            )}
            {!project.live_url && !project.github_url && (
              <span style={s.btnDisabled}>{ml.noLinks}</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// TARJETA
// ─────────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onSelect, className = "col-lg-3 col-md-6" }: { project: any; index: number; onSelect: (p: any) => void; className?: string }) {
  const { lang } = useLanguage()
  const title = project.name
  const desc = project.descriptions?.[lang] || project.descriptions?.['en'] || ''
  const [hovered, setHovered] = useState(false)

  const shortDesc = desc.length > 110 ? desc.substring(0, 110) + '...' : desc;

  return (
    <motion.div
      className={className}
      onClick={() => onSelect(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(project) }}
      aria-label={`Voir le projet ${title}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      style={className === "" ? { width: '100%' } : {}}
    >
      <div style={{ ...s.card, ...(hovered ? s.cardHovered : {}) }}>
        <div style={s.cardImgWrapper}>
          <img src={project.image_url || 'https://via.placeholder.com/400x300/1e293b/ffffff?text=No+Image'} alt={title} style={s.cardImg} />
          <div style={s.cardCategoryBadge}>
            <span style={s.categoryBadge}>{project.category === 'active' || project.category === 'history' || project.category === 'both' ? 'SaaS' : project.category}</span>
          </div>
        </div>

        <div style={s.cardBody}>
          <div style={s.cardMeta}>
            <h3 style={s.cardTitle}>{title}</h3>
          </div>
          
          <p style={s.cardDesc}>{shortDesc}</p>

          <div style={s.stackList}>
            {project.stack?.slice(0, 4).map((tech: string) => (
              <span key={tech} style={s.stackBadge}>{tech}</span>
            ))}
            {project.stack?.length > 4 && <span style={s.stackBadge}>...</span>}
          </div>

          <div style={s.cardFooter}>
            <span style={s.detailsHint}>
              {lang === 'fr' ? 'Détails →' : lang === 'es' ? 'Detalles →' : 'Details →'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('all')
  const { lang } = useLanguage()

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true })
      if (data) {
        setProjects(data)
      } else {
        console.error('Error fetching portfolio:', error)
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const loadingLabel = lang === 'fr' ? 'Chargement des projets...' : lang === 'es' ? 'Cargando proyectos...' : 'Loading projects...'

  if (loading) {
    return (
      <section style={{ ...s.main, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">{loadingLabel}</span>
          </div>
          <h4 className="mt-4" style={{ color: 'var(--color-muted)' }}>{loadingLabel}</h4>
        </div>
      </section>
    )
  }

  const activeProjects = projects.filter(p => p.category === 'active' || p.category === 'both')
  const historyProjects = projects.filter(p => p.category === 'history' || p.category === 'both')
  
  // Como el historyCategory no está mapeado directamente en la nueva tabla, aplicamos 'all' o dejamos que funcione si existiese
  const filteredHistoryProjects = historyFilter === 'all' 
    ? historyProjects 
    : historyProjects.filter(p => p.history_category === historyFilter)

  const headingLabels: Record<string, { heading: string; subtitle: string }> = {
    fr: { heading: 'Mon Portfolio', subtitle: 'Découvrez mon évolution technique à travers mes projets' },
    es: { heading: 'Mi Portfolio',  subtitle: 'Descubre mi evolución técnica a través de mis proyectos' },
    en: { heading: 'My Portfolio',  subtitle: 'Discover my technical evolution through my projects' },
  }
  const { heading, subtitle } = headingLabels[lang]

  const labels = {
    fr: {
      historyTabs: { all: 'Tout', apps: 'Apps', webs: 'Webs', misc: 'Divers' },
      blocks: { active: 'Projets Actifs', history: 'Archives' },
      empty: 'Aucun projet trouvé.'
    },
    es: {
      historyTabs: { all: 'Todo', apps: 'Apps', webs: 'Webs', misc: 'Miscelánea' },
      blocks: { active: 'Proyectos Activos', history: 'Archivo' },
      empty: 'No se encontraron proyectos.'
    },
    en: {
      historyTabs: { all: 'All', apps: 'Apps', webs: 'Webs', misc: 'Misc' },
      blocks: { active: 'Active Projects', history: 'Archive' },
      empty: 'No projects found.'
    }
  }

  const t = labels[lang]

  const historyCounts = {
    all: historyProjects.length,
    apps: historyProjects.filter(p => p.history_category === 'apps').length,
    webs: historyProjects.filter(p => p.history_category === 'webs').length,
    misc: historyProjects.filter(p => p.history_category === 'misc').length,
  }

  return (
    <motion.section 
      id="portfolio" 
      style={s.main}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h1 style={s.heading}>{heading}</h1>
      <p style={s.subtitle}>{subtitle}</p>

      {/* ──────────────── BLOQUE: PROYECTOS ACTIVOS ──────────────── */}
      <div style={s.blockContainer}>
        <h2 style={s.blockTitle}>{t.blocks.active}</h2>
        {activeProjects.length === 0 ? (
          <p style={s.emptyMsg}>{t.empty}</p>
        ) : (
          <div className="row justify-content-center gy-4">
            {activeProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onSelect={setSelectedProject} />
            ))}
          </div>
        )}
      </div>

      {/* ──────────────── BLOQUE: HISTORIAL (SWIPER) ──────────────── */}
      <div style={{ ...s.blockContainer, marginTop: '6rem' }}>
        <h2 style={s.blockTitle}>{t.blocks.history}</h2>
        
        {/* Sub-Filtro Historia */}
        <div style={s.subFilterBar}>
          {(['all', 'apps', 'webs', 'misc'] as HistoryFilter[]).map((hf) => {
            const isActive = historyFilter === hf
            return (
              <button
                key={hf}
                onClick={() => setHistoryFilter(hf)}
                style={{ ...s.subFilterBtn, ...(isActive ? s.subFilterBtnActive : {}) }}
              >
                {t.historyTabs[hf]}
                <span style={{ ...s.subFilterCount, ...(isActive ? s.subFilterCountActive : {}) }}>
                  {historyCounts[hf]}
                </span>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: '2rem' }}>
          {filteredHistoryProjects.length === 0 ? (
            <p style={s.emptyMsg}>{t.empty}</p>
          ) : filteredHistoryProjects.length <= 3 ? (
            <div className="row justify-content-center gy-4">
              {filteredHistoryProjects.map((p, i) => (
                <ProjectCard 
                  key={p.id} 
                  project={p} 
                  index={i} 
                  onSelect={setSelectedProject} 
                />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
              }}
              loop={filteredHistoryProjects.length >= 3}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              style={{ paddingBottom: '4rem' }}
            >
              {filteredHistoryProjects.map((p, i) => (
                <SwiperSlide key={p.id}>
                  <ProjectCard 
                    project={p} 
                    index={i} 
                    onSelect={setSelectedProject} 
                    className="" 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}

// ─────────────────────────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  main:               { padding: '6rem 2rem', background: 'var(--color-bg)', color: 'var(--color-text)', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-body)' },
  heading:            { textAlign: 'center', fontSize: '2.8rem', fontWeight: 800, color: 'var(--color-heading)', margin: '0 0 1rem 0', fontFamily: 'var(--font-heading)' },
  subtitle:           { textAlign: 'center', fontSize: '1rem', color: 'var(--color-muted)', marginBottom: '4rem', fontFamily: 'var(--font-nav)' },
  
  blockContainer:     { display: 'flex', flexDirection: 'column' },
  blockTitle:         { fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-heading)', margin: '0 0 2rem 0', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary-dim)', paddingBottom: '0.5rem', display: 'inline-block', alignSelf: 'center', textAlign: 'center' },

  subFilterBar:       { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.8rem', margin: '0 0 1.5rem 0' },
  subFilterBtn:       { background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '30px', padding: '0.4rem 1rem', color: 'var(--color-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-nav)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  subFilterBtnActive: { background: 'var(--color-primary)', borderColor: 'var(--color-primary)', color: '#fff' },
  subFilterCount:     { background: 'var(--color-surface)', color: 'var(--color-muted)', padding: '0.1rem 0.4rem', borderRadius: '10px', fontSize: '0.7rem' },
  subFilterCountActive:{ background: 'rgba(255,255,255,0.2)', color: '#fff' },
  
  emptyMsg:           { textAlign: 'center', color: 'var(--color-muted)', fontStyle: 'italic', marginTop: '3rem', fontFamily: 'var(--font-nav)' },

  // Tarjeta
  card:               { background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' },
  cardHovered:        { transform: 'translateY(-6px)', boxShadow: '0 12px 24px rgba(0,0,0,0.5)', borderColor: 'var(--color-primary-dim)' },
  cardImgWrapper:     { width: '100%', height: '180px', overflow: 'hidden', position: 'relative' },
  cardImg:            { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
  cardCategoryBadge:  { position: 'absolute', top: '1rem', right: '1rem', zIndex: 2 },
  categoryBadge:      { background: 'rgba(4, 11, 20, 0.8)', backdropFilter: 'blur(4px)', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-nav)' },
  cardBody:           { padding: '1.2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  cardMeta:           { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' },
  cardTitle:          { fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-heading)', margin: 0, fontFamily: 'var(--font-heading)' },
  cardDesc:           { fontSize: '0.9rem', color: 'var(--color-accent)', lineHeight: 1.6, margin: '0 0 1.2rem 0', flexGrow: 1, fontFamily: 'var(--font-nav)' },
  stackList:          { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' },
  stackBadge:         { background: 'var(--color-surface-dark)', border: '1px solid var(--color-border)', color: 'var(--color-muted)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.7rem', fontFamily: 'var(--font-nav)' },
  cardFooter:         { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' },
  detailsHint:        { fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, fontFamily: 'var(--font-nav)' },

  // Modal
  overlay:            { position: 'fixed', inset: 0, background: 'rgba(4, 11, 20, 0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' },
  panel:              { background: 'var(--color-surface-dark)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.8rem' },
  panelHeader:        { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  modalCategory:      { background: 'var(--color-primary-dim)', color: 'var(--color-primary)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '0.8rem', fontFamily: 'var(--font-nav)' },
  closeBtn:           { background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-muted)', width: '36px', height: '36px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' },
  modalTitle:         { fontSize: '2rem', fontWeight: 800, color: 'var(--color-heading)', margin: 0, fontFamily: 'var(--font-heading)', lineHeight: 1.2 },
  modalDesc:          { fontSize: '1.05rem', color: 'var(--color-accent)', lineHeight: 1.9, margin: 0, fontFamily: 'var(--font-nav)', paddingBottom: '0.5rem' },
  section:            { display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  sectionLabel:       { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', margin: 0, fontFamily: 'var(--font-nav)' },
  btnPrimary:         { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-primary)', color: '#fff', border: '1px solid var(--color-primary)', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-nav)', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' },
  btnOutline:         { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-surface)', color: 'var(--color-heading)', border: '1px solid var(--color-border)', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-nav)', transition: 'all 0.2s' },
  btnDisabled:        { display: 'inline-flex', alignItems: 'center', color: 'var(--color-muted)', fontSize: '0.9rem', fontStyle: 'italic', padding: '0.6rem 0', fontFamily: 'var(--font-nav)' },
}
