import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { UserProgress } from 'entities/UserProgress'
import { translations } from './translations'
import { LANGUAGES } from '@/lib/utils'

const LanguageContext = createContext(null)

function interpolate(str, vars) {
  if (!vars) return str
  return str.replace(/\{(\w+)\}/g, (m, key) => (key in vars ? String(vars[key]) : m))
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => UserProgress.get().language || 'en')

  const setLanguage = useCallback((code) => {
    UserProgress.setLanguage(code)
    setLanguageState(code)
  }, [])

  const value = useMemo(() => {
    const dict = translations[language] || translations.en

    // Translate a UI key. Falls back to English, then to the raw key.
    const t = (key, vars) => {
      const str = dict[key] ?? translations.en[key] ?? key
      return interpolate(str, vars)
    }

    // Pick the right language from a bilingual content object { en, zu }.
    // Passes plain strings through unchanged.
    const L = (obj) => {
      if (obj == null) return ''
      if (typeof obj === 'string') return obj
      return obj[language] ?? obj.en ?? ''
    }

    const currentLanguage = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0]

    return { language, setLanguage, t, L, languages: LANGUAGES, currentLanguage }
  }, [language, setLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
