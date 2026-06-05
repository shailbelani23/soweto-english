import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function QuizCard({ step, onAnswer }) {
  const [selected, setSelected] = useState(null)

  function handleSelect(i) {
    if (selected !== null) return
    setSelected(i)
    onAnswer?.(i === step.correct)
  }

  const correct = selected !== null && selected === step.correct
  const wrong = selected !== null && selected !== step.correct

  return (
    <div className="space-y-3">
      <p className="font-semibold text-gray-900 text-sm">{step.question}</p>
      <div className="space-y-2">
        {step.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={cn(
              'w-full text-left px-4 py-3 rounded-xl text-sm border transition-all',
              selected === null
                ? 'border-gray-200 hover:border-brand-400 hover:bg-brand-50'
                : i === step.correct
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                  : i === selected
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : 'border-gray-100 text-gray-400'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && step.explanation && (
        <div className={cn(
          'rounded-xl p-3 text-xs',
          correct ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
        )}>
          <span className="font-semibold">{correct ? '✓ Correct! ' : '✗ Not quite. '}</span>
          {step.explanation}
        </div>
      )}
    </div>
  )
}
