import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

export default function LanguageSelector({ variant = 'light' }) {
  const { language, setLanguage, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = languages.find(l => l.code === language) || languages[0]
  const dark = variant === 'dark'

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          'flex items-center gap-1.5 text-sm px-3 py-2 rounded-md font-bold transition-colors border-2',
          dark
            ? 'border-white/25 text-white hover:border-brand-400'
            : 'border-ink-900 text-ink-900 bg-white hover:bg-gray-50'
        )}
      >
        <Globe size={15} />
        <span>{current.label}</span>
        <ChevronDown size={13} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-soft border-2 border-ink-900 py-1 min-w-[170px] z-50 overflow-hidden">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setOpen(false) }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-brand-50 transition-colors',
                lang.code === language ? 'text-brand-700 font-bold bg-brand-50/60' : 'text-gray-700 font-medium'
              )}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {lang.code === language && <span className="ml-auto text-brand-600">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
