import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

export default function LanguageSelector() {
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

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe size={15} />
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 py-1 min-w-[160px] z-50">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => { setLanguage(lang.code); setOpen(false) }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors',
                lang.code === language ? 'text-brand-700 font-medium' : 'text-gray-700'
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
