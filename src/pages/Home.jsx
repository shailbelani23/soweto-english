import { useNavigate } from 'react-router-dom'
import { BookOpen, Briefcase, Mic, TrendingUp, Gamepad2, ChevronRight, Award, Lock } from 'lucide-react'
import { CERT_THRESHOLD } from './Certificate'
import { useProgress } from '@/hooks/useProgress'
import { useLanguage } from '@/hooks/useLanguage'
import { getLessons } from '@/api'
import { TRACKS, TRACK_META } from 'entities/Simulation'
import DailyStreak from '@/components/ui/DailyStreak'
import JobTrackCard from '@/components/ui/JobTrackCard'

const JOB_TRACK = {
  name: 'Hospitality',
  emoji: '🍽️',
  description: 'Serve guests with confidence',
}

function readinessKey(pct) {
  if (pct === 0) return 'readiness.startingOut'
  if (pct < 25) return 'readiness.building'
  if (pct < 50) return 'readiness.growing'
  if (pct < 75) return 'readiness.nearly'
  if (pct < 100) return 'readiness.ready'
  return 'readiness.jobReady'
}

const SIM_TRACKS = [TRACKS.HOSPITALITY, TRACKS.CALL_CENTER, TRACKS.RETAIL, TRACKS.JOB_HUNT]

function cnCert(unlocked) {
  return unlocked
    ? 'w-11 h-11 rounded-md bg-brand-500 border-2 border-ink-900 flex items-center justify-center shrink-0'
    : 'w-11 h-11 rounded-md bg-gray-100 border-2 border-ink-900/20 flex items-center justify-center shrink-0'
}

export default function Home() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { progress, jobReadiness } = useProgress()
  const allLessons = getLessons({ jobTrack: 'Hospitality' })
  const completedCount = progress.completedLessons.filter((id) =>
    allLessons.some((l) => l.id === id)
  ).length

  return (
    <div className="px-4 pt-6 pb-28 space-y-5">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t('home.welcome', { name: progress.name })}
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">{t('home.subtitle')}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 border-2 border-ink-900 shadow-soft">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={14} className="text-brand-600" />
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
              {t('home.jobReadiness')}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-gray-900">{jobReadiness}%</div>
          <div className="h-2.5 bg-gray-100 border border-ink-900/20 rounded-sm mt-2 overflow-hidden">
            <div
              className="h-full bg-brand-500 transition-all duration-700"
              style={{ width: `${jobReadiness}%` }}
            />
          </div>
          <p className="text-xs text-brand-700 font-bold mt-1.5">{t(readinessKey(jobReadiness))}</p>
        </div>

        <DailyStreak days={progress.streakDays} label={t('home.dayStreak')} />
      </div>

      {/* Job Simulator hero — flat black card, green offset shadow */}
      <button
        onClick={() => navigate('/simulator')}
        className="w-full text-left bg-ink-900 rounded-xl p-5 text-white border-2 border-ink-950 shadow-glow active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
            <Gamepad2 size={15} className="text-ink-950" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-brand-400">
            {t('home.jobSimulator')}
          </span>
        </div>
        <p className="text-xl font-extrabold leading-snug">{t('home.tryASimulation')}</p>
        <p className="text-sm text-white/70 mt-1">{t('home.jobSimulatorDesc')}</p>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {SIM_TRACKS.map((track) => (
            <span
              key={track}
              className="text-xs font-bold border-2 border-white/25 rounded-md px-2.5 py-1 flex items-center gap-1.5"
            >
              <span>{TRACK_META[track].emoji}</span>
              {t(TRACK_META[track].labelKey)}
            </span>
          ))}
        </div>
      </button>

      {/* Quick Start */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">{t('home.quickStart')}</h2>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => navigate('/daily')}
            className="bg-white border-2 border-ink-900 shadow-soft rounded-xl py-4 px-1 flex flex-col items-center gap-2.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <div className="w-11 h-11 rounded-md bg-brand-100 border border-ink-900/15 flex items-center justify-center">
              <BookOpen size={21} className="text-brand-700" />
            </div>
            <span className="text-xs font-bold text-center leading-tight">{t('home.todaysLesson')}</span>
          </button>
          <button
            onClick={() => navigate('/interview')}
            className="bg-white border-2 border-ink-900 shadow-soft rounded-xl py-4 px-1 flex flex-col items-center gap-2.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <div className="w-11 h-11 rounded-md bg-sky-100 border border-ink-900/15 flex items-center justify-center">
              <Briefcase size={21} className="text-sky-700" />
            </div>
            <span className="text-xs font-bold text-center leading-tight">{t('home.interviewPrep')}</span>
          </button>
          <button
            onClick={() => navigate('/speaking')}
            className="bg-white border-2 border-ink-900 shadow-soft rounded-xl py-4 px-1 flex flex-col items-center gap-2.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <div className="w-11 h-11 rounded-md bg-violet-100 border border-ink-900/15 flex items-center justify-center">
              <Mic size={21} className="text-violet-700" />
            </div>
            <span className="text-xs font-bold text-center leading-tight">{t('home.speakingPractice')}</span>
          </button>
        </div>
      </div>

      {/* Certificate */}
      <button
        onClick={() => navigate('/certificate')}
        className="w-full text-left bg-white rounded-xl p-4 border-2 border-ink-900 shadow-soft active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-3"
      >
        <div
          className={cnCert(jobReadiness >= CERT_THRESHOLD)}
        >
          {jobReadiness >= CERT_THRESHOLD ? (
            <Award size={22} className="text-ink-950" />
          ) : (
            <Lock size={20} className="text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-gray-900">
            {jobReadiness >= CERT_THRESHOLD ? t('cert.homeUnlocked') : t('cert.homeLocked')}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {jobReadiness >= CERT_THRESHOLD
              ? t('cert.homeUnlockedSub')
              : t('cert.homeLockedSub', { target: CERT_THRESHOLD })}
          </p>
        </div>
        <ChevronRight size={18} className="text-gray-400 shrink-0" />
      </button>

      {/* Job Track */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">{t('home.yourJobTrack')}</h2>
          <button onClick={() => navigate('/job-tracks')} className="text-xs text-brand-600 font-semibold">
            {t('home.seeAll')}
          </button>
        </div>
        <JobTrackCard track={JOB_TRACK} completedCount={completedCount} totalCount={allLessons.length} />
      </div>

      {/* Continue */}
      {progress.completedLessons.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">{t('home.keepGoing')}</h2>
          <button
            onClick={() => navigate('/lessons')}
            className="w-full bg-white rounded-xl p-4 border-2 border-ink-900 shadow-soft text-left active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-brand-700">{t('home.continueLessons')}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {t('home.lessonsComplete', { done: completedCount, total: allLessons.length })}
              </p>
            </div>
            <ChevronRight size={18} className="text-brand-400" />
          </button>
        </div>
      )}
    </div>
  )
}
