// The language state now lives in a React context so switching language
// re-renders the whole app. This file re-exports the hook for backwards
// compatibility with existing imports.
export { useLanguage } from '@/i18n/LanguageContext'
