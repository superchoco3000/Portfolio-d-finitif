import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyznevpv'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormFields {
  name:    string
  email:   string
  subject: string
  message: string
}

const EMPTY: FormFields = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { lang } = useLanguage()
  const [fields, setFields]   = useState<FormFields>(EMPTY)
  const [status, setStatus]   = useState<FormStatus>('idle')
  const [errMsg, setErrMsg]   = useState('')

  const i18n = {
    fr: {
      sectionBadge: 'Contact',
      heading:      'Travaillons ensemble',
      sub:          'Je réponds toujours dans les plus brefs délais.',
      namePh:       'Votre nom',
      emailPh:      'Votre adresse email',
      subjectPh:    'Objet',
      msgPh:        'Votre message',
      send:         'Envoyer le message',
      sending:      'Envoi en cours…',
      successTitle: 'Message envoyé !',
      successText:  'Merci pour votre message. Je vous réponds très vite.',
      errorText:    'Une erreur est survenue. Veuillez réessayer.',
      newMsg:       'Nouveau message',
      infoItems: [
        { icon: '✉', label: 'lucascasanove@yahoo.fr' },
        { icon: '☎', label: '+33 7 68 65 78 18' },
        { icon: '📍', label: '160 avenue francis de pressencé, Vénissieux' },
      ],
    },
    es: {
      sectionBadge: 'Contacto',
      heading:      'Trabajemos juntos',
      sub:          'Siempre respondo en el menor tiempo posible.',
      namePh:       'Tu nombre',
      emailPh:      'Tu correo electrónico',
      subjectPh:    'Asunto',
      msgPh:        'Tu mensaje',
      send:         'Enviar el mensaje',
      sending:      'Enviando…',
      successTitle: '¡Mensaje enviado!',
      successText:  'Gracias por tu mensaje. Te responderé muy pronto.',
      errorText:    'Ocurrió un error. Por favor, inténtalo de nuevo.',
      newMsg:       'Nuevo mensaje',
      infoItems: [
        { icon: '✉', label: 'lucascasanove@yahoo.fr' },
        { icon: '☎', label: '+33 7 68 65 78 18' },
        { icon: '📍', label: '160 avenue francis de pressencé, Vénissieux' },
      ],
    },
    en: {
      sectionBadge: 'Contact',
      heading:      'Let\'s work together',
      sub:          'I always reply as quickly as possible.',
      namePh:       'Your name',
      emailPh:      'Your email address',
      subjectPh:    'Subject',
      msgPh:        'Your message',
      send:         'Send message',
      sending:      'Sending…',
      successTitle: 'Message sent!',
      successText:  'Thanks for your message. I\'ll get back to you very soon.',
      errorText:    'Something went wrong. Please try again.',
      newMsg:       'New message',
      infoItems: [
        { icon: '✉', label: 'lucascasanove@yahoo.fr' },
        { icon: '☎', label: '+33 7 68 65 78 18' },
        { icon: '📍', label: '160 avenue francis de pressencé, Vénissieux' },
      ],
    },
  }
  const t = i18n[lang]

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(fields),
      })

      if (res.ok) {
        setStatus('success')
        setFields(EMPTY)
      } else {
        const data = await res.json().catch(() => ({}))
        setErrMsg((data as { error?: string }).error ?? t.errorText)
        setStatus('error')
      }
    } catch {
      setErrMsg(t.errorText)
      setStatus('error')
    }
  }

  return (
    <motion.section 
      id="contact" 
      style={s.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">

        {/* En-tête de section */}
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <span style={s.badge}>{t.sectionBadge}</span>
          <h2 style={s.heading}>{t.heading}</h2>
          <p style={s.sub}>{t.sub}</p>
        </div>

        <div className="row gy-5 justify-content-center">

          {/* Infos de contact */}
          <div className="col-lg-4">
            <div style={s.infoCard}>
              {t.infoItems.map((item) => (
                <div key={item.label} style={s.infoItem}>
                  <span style={s.infoIcon}>{item.icon}</span>
                  <span style={s.infoText}>{item.label}</span>
                </div>
              ))}
              <div style={s.divider} />
              <div style={s.socialRow}>
                <a href="https://github.com/superchoco3000"                     target="_blank" rel="noreferrer" style={s.socialLink}>GitHub</a>
                <a href="https://www.linkedin.com/in/lucas-casanove-2790692a6/" target="_blank" rel="noreferrer" style={s.socialLink}>LinkedIn</a>
                <a href="https://www.instagram.com/lucascasanove/"              target="_blank" rel="noreferrer" style={s.socialLink}>Instagram</a>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="col-lg-7">
            {status === 'success' ? (
              <div style={s.successBox}>
                <span style={s.successIcon}>✓</span>
                <h3 style={s.successTitle}>{t.successTitle}</h3>
                <p style={s.successText}>{t.successText}</p>
                <button onClick={() => setStatus('idle')} style={s.btnOutline}>
                  {t.newMsg}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="row gy-3">

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder={t.namePh}
                      value={fields.name}
                      onChange={handleChange}
                      required
                      style={s.input}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder={t.emailPh}
                      value={fields.email}
                      onChange={handleChange}
                      required
                      style={s.input}
                    />
                  </div>

                  <div className="col-12">
                    <input
                      className="form-control"
                      type="text"
                      name="subject"
                      placeholder={t.subjectPh}
                      value={fields.subject}
                      onChange={handleChange}
                      required
                      style={s.input}
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="form-control"
                      name="message"
                      placeholder={t.msgPh}
                      rows={6}
                      value={fields.message}
                      onChange={handleChange}
                      required
                      style={{ ...s.input, resize: 'vertical' }}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="col-12">
                      <div style={s.errorBox}>{errMsg || t.errorText}</div>
                    </div>
                  )}

                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={{ ...s.btnPrimary, ...(status === 'loading' ? s.btnDisabled : {}) }}
                    >
                      {status === 'loading' ? t.sending : t.send}
                    </button>
                  </div>

                </div>
              </form>
            )}
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
  section:      { padding: '5rem 0', background: 'var(--color-bg)' },
  badge:        { display: 'inline-block', fontFamily: 'var(--font-nav)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', background: 'var(--color-primary-dim)', padding: '0.2rem 0.7rem', borderRadius: '4px', marginBottom: '0.6rem' },
  heading:      { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--color-heading)', marginBottom: '0.5rem' },
  sub:          { fontFamily: 'var(--font-nav)', color: 'var(--color-muted)', fontSize: '0.95rem' },

  // Carte d'infos
  infoCard:     { background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' },
  infoItem:     { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  infoIcon:     { fontSize: '1.1rem', flexShrink: 0 },
  infoText:     { fontFamily: 'var(--font-nav)', fontSize: '0.875rem', color: 'var(--color-muted)' },
  divider:      { borderTop: '1px solid var(--color-border)', margin: '0.5rem 0' },
  socialRow:    { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' },
  socialLink:   { fontFamily: 'var(--font-nav)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none' },

  // Formulaire
  input:        { background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)', borderRadius: '8px', padding: '0.65rem 1rem', width: '100%', fontFamily: 'var(--font-default)', fontSize: '0.9rem', outline: 'none' },
  btnPrimary:   { background: 'var(--color-primary)', color: '#fff', padding: '0.65rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 700, fontFamily: 'var(--font-nav)', fontSize: '0.9rem', cursor: 'pointer' },
  btnOutline:   { background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', padding: '0.6rem 1.4rem', borderRadius: '8px', fontWeight: 700, fontFamily: 'var(--font-nav)', fontSize: '0.875rem', cursor: 'pointer' },
  btnDisabled:  { opacity: 0.6, cursor: 'not-allowed' },
  errorBox:     { background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#f87171', borderRadius: '8px', padding: '0.75rem 1rem', fontFamily: 'var(--font-nav)', fontSize: '0.875rem' },

  // Succès
  successBox:   { background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
  successIcon:  { width: '52px', height: '52px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--color-heading)', margin: 0 },
  successText:  { fontFamily: 'var(--font-nav)', color: 'var(--color-muted)', fontSize: '0.95rem', margin: 0 },
}
