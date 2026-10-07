import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { services, getServiceText, type ServiceData } from '../data/services'
import ServiceDetailModal from './ServiceDetailModal'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Services() {
  const { lang } = useLanguage()
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null)

  const headings = {
    fr: { 
      title: 'Mes Services', 
      subtitle: 'Je vous accompagne dans la réalisation de vos objectifs digitaux.', 
      s1: 'Solutions', s2: 'Digitales sur Mesure',
      desc: 'J\'intègre des stratégies digitales créatives et des technologies de pointe pour offrir des expériences exceptionnelles.',
      cta: 'Démarrer un projet'
    },
    es: { 
      title: 'Mis Servicios', 
      subtitle: 'Estoy aquí para ayudarte a alcanzar tus objetivos digitales.', 
      s1: 'Soluciones', s2: 'Digitales a Medida',
      desc: 'Integro estrategias digitales creativas y tecnologías punteras para ofrecer experiencias excepcionales.',
      cta: 'Empezar un proyecto'
    },
    en: { 
      title: 'My Services', 
      subtitle: 'I am here to help you achieve your digital goals.', 
      s1: 'Tailored', s2: 'Digital Solutions',
      desc: 'I integrate creative digital strategies and cutting-edge technologies to deliver exceptional customer experiences.',
      cta: 'Start a project'
    }
  }

  const { title, subtitle, s1, s2, desc, cta } = headings[lang]

  return (
    <section id="services" style={s.servicesSection}>
      <div className="container" style={{ marginBottom: '3rem' }}>
        <motion.div 
          style={s.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 style={s.mainHeading}>{title}</h2>
          <p style={s.mainSubtitle}>{subtitle}</p>
        </motion.div>
      </div>

      <div className="container">
        <div style={s.serviceHeader}>
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-12">
              <motion.h2 
                style={s.serviceHeading}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <div>{s1}</div>
                <div><span style={s.highlight}>{s2}</span></div>
              </motion.h2>
            </div>
            <div className="col-lg-4 col-md-12">
              <motion.div 
                style={s.serviceSummary}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <p style={s.summaryText}>{desc}</p>
                <a href="#contact" style={s.serviceBtn}>
                  {cta}
                  <i className="bi bi-arrow-right" style={{ marginLeft: '8px' }}></i>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center gy-4">
          {services.map((srv, i) => {
            const text = getServiceText(srv, lang)
            return (
              <div key={srv.id} className="col-lg-3 col-md-6">
                <motion.div 
                  style={s.serviceCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: (i + 1) * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', borderColor: 'var(--color-primary)' }}
                  onClick={() => setSelectedService(srv)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedService(srv) }}
                >
                  <div style={s.serviceIcon}>
                    <i className={`bi ${srv.icon}`}></i>
                  </div>
                  <h3 style={s.cardTitle}>
                    {text.title}<span style={s.cardSubtitle}> {text.subtitle}</span>
                  </h3>
                  <p style={s.cardDesc}>{text.shortDescription}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}

const s: Record<string, React.CSSProperties> = {
  servicesSection: {
    padding: '6rem 0',
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    position: 'relative'
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  mainHeading: {
    fontSize: '2.5rem',
    fontWeight: 800,
    fontFamily: 'var(--font-heading)',
    color: 'var(--color-heading)',
    marginBottom: '0.5rem'
  },
  mainSubtitle: {
    color: 'var(--color-muted)',
    fontSize: '1rem',
    fontFamily: 'var(--font-nav)'
  },
  serviceHeader: {
    marginBottom: '4rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '3rem'
  },
  serviceHeading: {
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: 1.2,
    margin: 0,
    color: 'var(--color-heading)',
    fontFamily: 'var(--font-heading)'
  },
  highlight: {
    color: 'var(--color-primary)'
  },
  serviceSummary: {
    paddingTop: '1rem'
  },
  summaryText: {
    color: 'var(--color-muted)',
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-nav)'
  },
  serviceBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'var(--color-primary)',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    fontFamily: 'var(--font-nav)',
    borderBottom: '1px solid var(--color-primary)',
    paddingBottom: '0.2rem',
    transition: 'opacity 0.2s'
  },
  serviceCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '2.5rem 2rem',
    borderRadius: '16px',
    height: '100%',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column'
  },
  serviceIcon: {
    fontSize: '3rem',
    color: 'var(--color-primary)',
    marginBottom: '1.5rem',
    display: 'inline-block'
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: 'var(--color-heading)',
    marginBottom: '1rem',
    fontFamily: 'var(--font-heading)'
  },
  cardSubtitle: {
    color: 'var(--color-primary)',
    fontWeight: 400
  },
  cardDesc: {
    color: 'var(--color-muted)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    margin: 0,
    fontFamily: 'var(--font-nav)',
    flexGrow: 1
  }
}
