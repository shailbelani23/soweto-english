import { useNavigate } from 'react-router-dom'
import { BookOpen, Briefcase, Mic, TrendingUp } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { getLessons, getDailyLesson } from '@/api'
import DailyStreak from '@/components/ui/DailyStreak'
import JobTrackCard from '@/components/ui/JobTrackCard'

const JOB_TRACK = {
  name: 'Hospitality',
  emoji: '🍽️',
  description: 'Serve guests with confidence',
}

export default function Home() {
  const navigate = useNavigate()
  const { progress, jobReadiness, readinessLabel } = useProgress()
  const allLessons = getLessons({ jobTrack: 'Hospitality' })
  const completedCount = progress.completedLessons.filter(id =>
    allLessons.some(l => l.id === id)
  ).length

  return (
    <div className="px-4 pt-6 pb-28 space-y-5">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {progress.name} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Ready to practice your English?</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Job Readiness */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={14} className="text-brand-600" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Job Readiness</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{jobReadiness}%</div>
          <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-700"
              style={{ width: `${jobReadiness}%` }}
            />
          </div>
          <p className="text-xs text-brand-600 font-medium mt-1.5">{readinessLabel}</p>
        </div>

        <DailyStreak days={progress.streakDays} />
      </div>

      {/* Quick Start */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Start</h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => navigate('/daily')}
            className="bg-brand-600 text-white rounded-2xl py-4 flex flex-col items-center gap-2 hover:bg-brand-700 transition-colors"
          >
            <BookOpen size={22} />
            <span className="text-xs font-semibold text-center leading-tight">Today's Lesson</span>
          </button>
          <button
            onClick={() => navigate('/interview')}
            className="bg-blue-500 text-white rounded-2xl py-4 flex flex-col items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Briefcase size={22} />
            <span className="text-xs font-semibold text-center leading-tight">Interview Prep</span>
          </button>
          <button
            onClick={() => navigate('/speaking')}
            className="bg-violet-500 text-white rounded-2xl py-4 flex flex-col items-center gap-2 hover:bg-violet-600 transition-colors"
          >
            <Mic size={22} />
            <span className="text-xs font-semibold text-center leading-tight">Speaking Practice</span>
          </button>
        </div>
      </div>

      {/* Job Track */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">Your Job Track</h2>
          <button
            onClick={() => navigate('/job-tracks')}
            className="text-xs text-brand-600 font-semibold"
          >
            See All
          </button>
        </div>
        <JobTrackCard
          track={JOB_TRACK}
          completedCount={completedCount}
          totalCount={allLessons.length}
        />
      </div>

      {/* Continue where you left off */}
      {progress.completedLessons.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Keep Going</h2>
          <button
            onClick={() => navigate('/lessons')}
            className="w-full bg-white rounded-2xl p-4 border border-brand-200 text-left hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-semibold text-brand-700">Continue your lessons →</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {completedCount} of {allLessons.length} lessons complete
            </p>
          </button>
        </div>
      )}
    </div>
  )
}
