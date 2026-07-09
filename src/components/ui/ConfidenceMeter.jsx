import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

const levels = [
  { score: 1, emoji: '😟', key: 'confidence.1', color: 'bg-red-100 border-red-400' },
  { score: 2, emoji: '😕', key: 'confidence.2', color: 'bg-orange-100 border-orange-400' },
  { score: 3, emoji: '🙂', key: 'confidence.3', color: 'bg-yellow-100 border-yellow-500' },
  { score: 4, emoji: '😄', key: 'confidence.4', color: 'bg-lime-100 border-lime-500' },
  { score: 5, emoji: '🌟', key: 'confidence.5', color: 'bg-emerald-100 border-emerald-500' },
]

export default function ConfidenceMeter({ questionId, onRate, initialScore }) {
  const [selected, setSelected] = useState(initialScore || null)
  const { t } = useLanguage()

  function handleRate(score) {
    setSelected(score)
    onRate?.(score)
  }

  return (
    <div>
      <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
        {t('confidence.title')}
      </p>
      <div className="grid grid-cols-5 gap-1.5">
        {levels.map(({ score, emoji, key, color }) => (
          <button
            key={score}
            onClick={() => handleRate(score)}
            className={cn(
              'flex flex-col items-center gap-1 py-2 px-0.5 rounded-lg border-2 transition-all',
              selected === score
                ? color + ' scale-105'
                : 'bg-white border-ink-900/15 hover:border-ink-900/40'
            )}
          >
            <span className="text-lg leading-none">{emoji}</span>
            <span
              className={cn(
                'text-[9px] font-bold text-center leading-tight',
                selected === score ? 'text-gray-800' : 'text-gray-500'
              )}
            >
              {t(key)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
