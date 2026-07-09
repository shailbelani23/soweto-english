import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

// The lesson can only be completed once the learner answers correctly.
// A wrong answer shows the explanation but NOT the right option, so
// "Try again" is a real second attempt rather than a copy exercise.
export default function QuizCard({ step, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const { t } = useLanguage()

  function handleSelect(i) {
    if (selected !== null) return
    setSelected(i)
    onAnswer?.(i === step.correct)
  }

  function retry() {
    setSelected(null)
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
              'w-full text-left px-4 py-3 rounded-lg text-sm border-2 transition-all',
              selected === null
                ? 'border-ink-900/20 hover:border-brand-500 hover:bg-brand-50'
                : correct && i === step.correct
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold'
                  : wrong && i === selected
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : 'border-ink-900/10 text-gray-400'
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {correct && step.explanation && (
        <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
          <span className="font-bold">{t('quiz.correct')} </span>
          {step.explanation}
        </div>
      )}

      {wrong && (
        <div className="space-y-2">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-3 text-xs text-red-800">
            <span className="font-bold">{t('quiz.wrong')} </span>
            {step.explanation}
          </div>
          <button
            onClick={retry}
            className="w-full bg-ink-900 text-brand-300 rounded-lg py-3 font-bold text-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-transform"
          >
            <RotateCcw size={15} /> {t('quiz.tryAgain')}
          </button>
        </div>
      )}
    </div>
  )
}
