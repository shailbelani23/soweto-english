import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'
import ConfidenceMeter from './ConfidenceMeter'
import ListenButton from './ListenButton'

export default function InterviewCard({ question, completed = false, onComplete, onConfidence }) {
  const [expanded, setExpanded] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const difficultyColor = {
    beginner: 'bg-emerald-100 text-emerald-700',
    intermediate: 'bg-amber-100 text-amber-700',
    advanced: 'bg-red-100 text-red-700',
  }[question.difficulty]

  return (
    <div className={cn(
      'bg-white rounded-2xl shadow-sm border transition-all',
      completed ? 'border-brand-200' : 'border-gray-100'
    )}>
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', difficultyColor)}>
              {question.difficulty}
            </span>
            <span className="text-xs text-gray-400">{question.category}</span>
            {completed && <span className="text-brand-600 text-sm font-medium ml-auto">✓ Done</span>}
          </div>
          <p className="font-semibold text-gray-900 text-sm leading-snug">{question.question}</p>
        </div>
        <span className="text-gray-400 flex-shrink-0 mt-0.5">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
          <div className="flex items-center gap-2">
            <ListenButton text={question.question} />
            <span className="text-xs text-gray-400 font-medium">Hear the question</span>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 flex gap-2">
            <Lightbulb size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">{question.tip}</p>
          </div>

          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full text-center text-sm text-brand-600 font-medium py-2 border border-brand-200 rounded-xl hover:bg-brand-50 transition-colors"
            >
              Show example answer
            </button>
          ) : (
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Example answer</p>
                <ListenButton text={question.exampleAnswer} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{question.exampleAnswer}</p>
            </div>
          )}

          {question.followUps?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Follow-up questions</p>
              <ul className="space-y-1">
                {question.followUps.map((fu, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-2">
                    <span className="text-gray-300">→</span>{fu}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {onConfidence && (
            <ConfidenceMeter questionId={question.id} onRate={(score) => {
              onConfidence(question.id, score)
              if (!completed && onComplete) onComplete(question.id)
            }} />
          )}
        </div>
      )}
    </div>
  )
}
