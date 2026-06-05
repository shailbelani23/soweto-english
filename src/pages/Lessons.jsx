import { useState } from 'react'
import { getLessons, getLessonCategories } from '@/api'
import { useProgress } from '@/hooks/useProgress'
import LessonCard from '@/components/ui/LessonCard'
import { cn, CATEGORY_COLORS } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

const JOB_TRACKS = ['Hospitality']

export default function Lessons() {
  const [jobTrack, setJobTrack] = useState('Hospitality')
  const [category, setCategory] = useState('All Categories')
  const [trackOpen, setTrackOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const { progress } = useProgress()

  const categories = ['All Categories', ...getLessonCategories(jobTrack)]
  const lessons = getLessons({
    jobTrack,
    category: category === 'All Categories' ? undefined : category,
  })

  const grouped = lessons.reduce((acc, lesson) => {
    const key = lesson.category
    if (!acc[key]) acc[key] = []
    acc[key].push(lesson)
    return acc
  }, {})

  return (
    <div className="px-4 pt-6 pb-28">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Lessons</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        {/* Job Track */}
        <div className="relative flex-1">
          <button
            onClick={() => { setTrackOpen(o => !o); setCatOpen(false) }}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800"
          >
            {jobTrack}
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {trackOpen && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
              {JOB_TRACKS.map(t => (
                <button
                  key={t}
                  onClick={() => { setJobTrack(t); setTrackOpen(false); setCategory('All Categories') }}
                  className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50', t === jobTrack && 'font-semibold text-brand-700')}
                >
                  {t}
                  {t === jobTrack && ' ✓'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category */}
        <div className="relative flex-1">
          <button
            onClick={() => { setCatOpen(o => !o); setTrackOpen(false) }}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800"
          >
            {category}
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {catOpen && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setCatOpen(false) }}
                  className={cn('w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50', c === category && 'font-semibold text-brand-700')}
                >
                  {c}
                  {c === category && ' ✓'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lessons grouped by category */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([cat, catLessons]) => (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{cat}</h2>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="space-y-3">
              {catLessons.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  completed={progress.completedLessons.includes(lesson.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
