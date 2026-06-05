import { useState, useCallback } from 'react'
import { UserProgress } from 'entities/UserProgress'
import { LANGUAGES } from '@/lib/utils'

export function useLanguage() {
  const [language, setLanguageState] = useState(() => UserProgress.get().language || 'en')

  const setLanguage = useCallback((code) => {
    UserProgress.setLanguage(code)
    setLanguageState(code)
  }, [])

  const currentLanguage = LANGUAGES.find(l => l.code === language) || LANGUAGES[0]

  return { language, currentLanguage, setLanguage, languages: LANGUAGES }
}
