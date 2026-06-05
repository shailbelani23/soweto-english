import { useNavigate } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'
import { getDailyLesson } from '@/api'
import { useProgress } from '@/hooks/useProgress'
import { cn, LEVEL_COLORS } from '@/lib/utils'

export default function DailyLesson() {
  const navigate = useNavigate()
  const lesson = getDailyLesson()
  const { progress } = useProgress()
  const done = progress.completedLessons.includes(lesson?.id)

  if (!lesson) {
    return (
      <div className="px-4 pt-6 text-center text-gray-500">
        No lesson available today.
      </div>
    )
  }

  return (
    <div className="px-4 pt-6 pb-28 space-y-5">
      <div>
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-1">
          {new Date().toLocaleDateString('en-ZA', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="text-xl font-bold text-gray-900">Today's Lesson</h1>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 px-6 py-8 text-white text-center">
          <div className="text-5xl mb-3">{lesson.emoji}</div>
          <h2 className="text-xl font-bold">{lesson.title}</h2>
          <p className="text-brand-100 text-sm mt-1">{lesson.description}</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
              {lesson.level}
            </span>
            <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
              {lesson.duration} min
            </span>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What you will learn</span>
          </div>
          <ul className="space-y-2 mb-5">
            {lesson.steps.map((step, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  {i + 1}
                </span>
                {step.title}
              </li>
            ))}
          </ul>

          {done ? (
            <div className="bg-emerald-50 text-emerald-700 rounded-xl px-4 py-3 text-sm text-center font-medium">
              ✓ You completed this lesson today!
            </div>
          ) : (
            <button
              onClick={() => navigate(`/lessons/${lesson.id}`)}
              className="w-full bg-brand-600 text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors"
            >
              Start Lesson <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Why this matters</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Practising one lesson every day builds habits. Employers notice when someone is consistent —
          it tells them you will show up, learn, and grow. You do not need to rush.
        </p>
      </div>
    </div>
  )
}
