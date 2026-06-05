import { useState } from 'react'
import { cn } from '@/lib/utils'

const levels = [
  { score: 1, label: 'Not sure yet', color: 'bg-red-400' },
  { score: 2, label: 'Getting there', color: 'bg-orange-400' },
  { score: 3, label: 'Almost ready', color: 'bg-yellow-400' },
  { score: 4, label: 'Confident', color: 'bg-lime-400' },
  { score: 5, label: 'Nailed it!', color: 'bg-emerald-500' },
]

export default function ConfidenceMeter({ questionId, onRate, initialScore }) {
  const [selected, setSelected] = useState(initialScore || null)

  function handleRate(score) {
    setSelected(score)
    onRate?.(score)
  }

  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
        How confident do you feel?
      </p>
      <div className="flex gap-2">
        {levels.map(({ score, label, color }) => (
          <button
            key={score}
            onClick={() => handleRate(score)}
            title={label}
            className={cn(
              'flex-1 h-7 rounded-lg transition-all',
              selected === score ? color + ' ring-2 ring-offset-1 ring-gray-400' : 'bg-gray-200 hover:bg-gray-300'
            )}
          />
        ))}
      </div>
      {selected && (
        <p className="text-xs text-center text-gray-500 mt-1.5">
          {levels.find(l => l.score === selected)?.label}
        </p>
      )}
    </div>
  )
}
