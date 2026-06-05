import { Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn, LEVEL_COLORS, CATEGORY_COLORS } from '@/lib/utils'

export default function LessonCard({ lesson, completed = false }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/lessons/${lesson.id}`)}
      className="w-full text-left bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
        {lesson.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{lesson.title}</h3>
          {completed && (
            <span className="text-brand-600 text-lg flex-shrink-0">✓</span>
          )}
        </div>
        <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{lesson.description}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', LEVEL_COLORS[lesson.level])}>
            {lesson.level}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} />
            {lesson.duration} min
          </span>
        </div>
      </div>
    </button>
  )
}
