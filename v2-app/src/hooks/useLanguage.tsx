/**
 * HOOK — useLanguage
 * ─────────────────────────────────────────────────────────────────
 * Contexto ligero para el idioma activo de la app.
 *
 * USO:
 *   <LanguageProvider>...</LanguageProvider>   ← en App.tsx
 *   const { lang, setLang } = useLanguage()    ← en cualquier componente
 * ─────────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Lang } from '../data/projects'

const SUPPORTED_LANGS: Lang[] = ['fr', 'es', 'en']
const DEFAULT_LANG: Lang = 'fr'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  SUPPORTED_LANGS: Lang[]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('portfolio_lang') as Lang | null
    return stored && SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG
  })

  function setLang(newLang: Lang) {
    if (!SUPPORTED_LANGS.includes(newLang)) return
    localStorage.setItem('portfolio_lang', newLang)
    setLangState(newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, SUPPORTED_LANGS }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside <LanguageProvider>')
  }
  return context
}
