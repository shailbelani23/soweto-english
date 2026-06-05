import { useState } from 'react'
import { getInterviewQuestions, getInterviewCategories } from '@/api'
import { useProgress } from '@/hooks/useProgress'
import InterviewCard from '@/components/ui/InterviewCard'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const DIFFICULTIES = ['All', 'beginner', 'intermediate']

export default function Interview() {
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [catOpen, setCatOpen] = useState(false)
  const [diffOpen, setDiffOpen] = useState(false)
  const { progress, completeInterview, saveConfidence } = useProgress()

  const categories = ['All', ...getInterviewCategories()]
  const questions = getInterviewQuestions({
    category: category === 'All' ? undefined : category,
    difficulty: difficulty === 'All' ? undefined : difficulty,
  })

  const completedCount = progress.completedInterviews.length

  return (
    <div className="px-4 pt-6 pb-28">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Interview Prep</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {completedCount} of {getInterviewQuestions().length} questions practised
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / getInterviewQuestions().length) * 100}%` }}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <button
            onClick={() => { setCatOpen(o => !o); setDiffOpen(false) }}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 text-left"
          >
            <span className="truncate">{category}</span>
            <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
          </button>
          {catOpen && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden max-h-52 overflow-y-auto">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setCatOpen(false) }}
                  className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50', c === category && 'font-semibold text-brand-700')}
                >
                  {c}{c === category && ' ✓'}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setDiffOpen(o => !o); setCatOpen(false) }}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 gap-2"
          >
            {difficulty === 'All' ? 'Level' : difficulty}
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {diffOpen && (
            <div className="absolute top-full mt-1 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden min-w-[140px]">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  onClick={() => { setDifficulty(d); setDiffOpen(false) }}
                  className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 capitalize', d === difficulty && 'font-semibold text-brand-700')}
                >
                  {d}{d === difficulty && ' ✓'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {questions.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-8">No questions match your filters.</p>
        ) : (
          questions.map(q => (
            <InterviewCard
              key={q.id}
              question={q}
              completed={progress.completedInterviews.includes(q.id)}
              onComplete={completeInterview}
              onConfidence={saveConfidence}
            />
          ))
        )}
      </div>
    </div>
  )
}
