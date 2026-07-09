import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function JobTrackCard({ track, completedCount, totalCount }) {
  const navigate = useNavigate()
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <button
      onClick={() => navigate('/job-tracks')}
      className="w-full text-left bg-white rounded-xl p-4 border-2 border-ink-900 shadow-soft active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-md bg-brand-100 border border-ink-900/15 flex items-center justify-center text-2xl flex-shrink-0">
          {track.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">{track.name}</h3>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-xs mt-0.5 truncate">{track.description}</p>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">{pct}% complete</span>
              <span className="text-xs text-gray-400">{completedCount}/{totalCount} lessons</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
