import { getLessons } from '@/api'
import { useProgress } from '@/hooks/useProgress'
import { getWorkplaceSkills } from '@/api'
import { cn } from '@/lib/utils'
import LessonCard from '@/components/ui/LessonCard'
import { useState } from 'react'

const TRACK = {
  name: 'Hospitality',
  emoji: '🍽️',
  description: 'Learn the skills to work confidently in restaurants, hotels, cafes, and events.',
  color: 'bg-teal-600',
}

const SKILL_COLORS = {
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-amber-100 text-amber-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
}

export default function JobTracks() {
  const { progress } = useProgress()
  const lessons = getLessons({ jobTrack: 'Hospitality' })
  const skills = getWorkplaceSkills()
  const [tab, setTab] = useState('lessons')

  const completedCount = progress.completedLessons.filter(id =>
    lessons.some(l => l.id === id)
  ).length
  const pct = Math.round((completedCount / lessons.length) * 100)

  return (
    <div className="pb-28">
      {/* Track header */}
      <div className={cn('px-6 pt-8 pb-6 text-white', TRACK.color)}>
        <div className="text-4xl mb-2">{TRACK.emoji}</div>
        <h1 className="text-2xl font-bold">{TRACK.name}</h1>
        <p className="text-teal-100 text-sm mt-1">{TRACK.description}</p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-teal-200 mb-1.5">
            <span>{completedCount} of {lessons.length} lessons complete</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 bg-teal-500 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white">
        {['lessons', 'skills'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 py-3.5 text-sm font-semibold capitalize transition-colors',
              tab === t ? 'text-brand-700 border-b-2 border-brand-600' : 'text-gray-400'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-5 space-y-3">
        {tab === 'lessons' && lessons.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            completed={progress.completedLessons.includes(lesson.id)}
          />
        ))}

        {tab === 'skills' && skills.map(skill => (
          <div key={skill.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{skill.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{skill.name}</h3>
                <p className="text-xs text-gray-500">{skill.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skill.subskills.map((sub, i) => (
                <span key={i} className={cn('text-xs px-2 py-0.5 rounded-full', SKILL_COLORS[skill.color] || 'bg-gray-100 text-gray-600')}>
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
