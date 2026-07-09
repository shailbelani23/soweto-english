import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'
import { getLesson } from '@/api'
import { useProgress } from '@/hooks/useProgress'
import { cn, LEVEL_COLORS } from '@/lib/utils'
import PhraseCard from '@/components/ui/PhraseCard'
import QuizCard from '@/components/ui/QuizCard'
import DialoguePlayer from '@/components/ui/DialoguePlayer'

export default function LessonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = getLesson(id)
  const { progress, completeLesson, saveQuiz } = useProgress()
  const [stepIndex, setStepIndex] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [finished, setFinished] = useState(false)

  if (!lesson) {
    return (
      <div className="px-4 pt-6 text-center">
        <p className="text-gray-500">Lesson not found.</p>
        <button onClick={() => navigate('/lessons')} className="mt-4 text-brand-600 font-medium">
          Back to Lessons
        </button>
      </div>
    )
  }

  const alreadyComplete = progress.completedLessons.includes(lesson.id)
  const step = lesson.steps[stepIndex]
  const isLast = stepIndex === lesson.steps.length - 1

  function handleNext() {
    if (isLast) {
      completeLesson(lesson.id, lesson.duration)
      setFinished(true)
    } else {
      setStepIndex(i => i + 1)
      setQuizAnswered(false)
    }
  }

  if (finished) {
    return (
      <div className="px-4 pt-6 pb-28 flex flex-col items-center text-center gap-5">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl">
          🎉
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Lesson Complete!</h2>
          <p className="text-gray-500 text-sm mt-1">
            You finished <span className="font-semibold">{lesson.title}</span>
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => navigate('/lessons')}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            More Lessons
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 rounded-2xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700"
          >
            Back Home
          </button>
        </div>
      </div>
    )
  }

  const canProceed = step.type !== 'quiz' || quizAnswered

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-start gap-3">
          <span className="text-3xl">{lesson.emoji}</span>
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-snug">{lesson.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', LEVEL_COLORS[lesson.level])}>
                {lesson.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={11} /> {lesson.duration} min
              </span>
              {alreadyComplete && (
                <span className="flex items-center gap-1 text-xs text-brand-600 font-medium">
                  <CheckCircle size={11} /> Completed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / lesson.steps.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Step {stepIndex + 1} of {lesson.steps.length}</p>
      </div>

      {/* Step content */}
      <div className="flex-1 px-4 pb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3">{step.title}</h2>

          {step.type === 'learn' && (
            <p className="text-sm text-gray-700 leading-relaxed">{step.content}</p>
          )}

          {step.type === 'checklist' && (
            <ul className="space-y-2">
              {step.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {step.type === 'phrase' && (
            <div className="space-y-2">
              {step.phrases.map((p, i) => (
                <PhraseCard key={i} phrase={p.phrase} meaning={p.meaning} />
              ))}
            </div>
          )}

          {step.type === 'dialogue' && (
            <DialoguePlayer lines={step.lines} scenario={step.scenario} />
          )}

          {step.type === 'quiz' && (
            <QuizCard
              step={step}
              onAnswer={(correct) => {
                // Only a correct answer unlocks the Next/Complete button.
                setQuizAnswered(correct)
                saveQuiz(lesson.id, correct)
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 pb-8">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={cn(
            'w-full py-4 rounded-2xl font-semibold text-sm transition-all',
            canProceed
              ? 'bg-brand-600 text-white hover:bg-brand-700'
              : 'bg-gray-100 text-gray-400'
          )}
        >
          {isLast ? '✓ Complete Lesson' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
