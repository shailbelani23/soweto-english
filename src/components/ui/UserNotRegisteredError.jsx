import { useState } from 'react'
import { UserProgress } from 'entities/UserProgress'
import { useLanguage } from '@/hooks/useLanguage'
import LanguageSelector from '@/components/ui/LanguageSelector'

export default function UserNotRegisteredError({ onRegister }) {
  const [name, setName] = useState('')
  const { t } = useLanguage()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    UserProgress.setName(name.trim())
    onRegister?.(name.trim())
  }

  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center px-6 relative">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector variant="dark" />
      </div>
      <div className="bg-white rounded-xl border-2 border-ink-950 shadow-glow p-8 w-full max-w-sm text-center relative">
        <div className="w-16 h-16 bg-brand-500 rounded-lg border-2 border-ink-900 flex items-center justify-center text-3xl mx-auto mb-4">
          👋
        </div>
        <h1 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight">{t('register.title')}</h1>
        <p className="text-gray-500 text-sm mb-6">{t('register.subtitle')}</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder={t('register.namePlaceholder')}
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border-2 border-ink-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-600"
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-brand-500 text-ink-950 py-3.5 rounded-lg border-2 border-ink-900 shadow-soft font-extrabold text-sm disabled:opacity-40 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            {t('register.button')} →
          </button>
        </form>
      </div>
    </div>
  )
}
