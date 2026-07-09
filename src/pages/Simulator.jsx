import { useState } from 'react'
import { Gamepad2 } from 'lucide-react'
import { Simulation, TRACKS, TRACK_META } from 'entities/Simulation'
import { UserProgress } from 'entities/UserProgress'
import { useLanguage } from '@/hooks/useLanguage'
import SimulationCard from '@/components/ui/SimulationCard'
import { cn } from '@/lib/utils'

const TRACK_ORDER = [TRACKS.HOSPITALITY, TRACKS.CALL_CENTER, TRACKS.RETAIL, TRACKS.JOB_HUNT]

export default function Simulator() {
  const { t, L } = useLanguage()
  const [activeTrack, setActiveTrack] = useState('all')
  const progress = UserProgress.get()

  const filtered =
    activeTrack === 'all'
      ? Simulation.getAll()
      : Simulation.getByTrack(activeTrack)

  // Group by track for display
  const grouped = TRACK_ORDER
    .map((track) => ({ track, sims: filtered.filter((s) => s.track === track) }))
    .filter((g) => g.sims.length > 0)

  return (
    <div className="px-4 pt-6 pb-28 space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-md bg-brand-500 border-2 border-ink-900 flex items-center justify-center">
            <Gamepad2 size={19} className="text-ink-950" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{t('sim.title')}</h1>
        </div>
        <p className="text-gray-500 text-sm mt-1.5">{t('sim.subtitle')}</p>
      </div>

      {/* Track filter chips */}
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 no-scrollbar">
        <FilterChip
          active={activeTrack === 'all'}
          onClick={() => setActiveTrack('all')}
          label={t('sim.allTracks')}
        />
        {TRACK_ORDER.map((track) => (
          <FilterChip
            key={track}
            active={activeTrack === track}
            onClick={() => setActiveTrack(track)}
            label={`${TRACK_META[track].emoji} ${t(TRACK_META[track].labelKey)}`}
          />
        ))}
      </div>

      {/* Grouped scenarios */}
      {grouped.map(({ track, sims }) => (
        <div key={track}>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span>{TRACK_META[track].emoji}</span>
              {t(TRACK_META[track].labelKey)}
            </h2>
            <span className="text-xs text-gray-400">
              {sims.length} {t('sim.scenarios')}
            </span>
          </div>
          <div className="space-y-2.5">
            {sims.map((sim) => (
              <SimulationCard
                key={sim.id}
                sim={sim}
                completed={progress.completedSimulations?.includes(sim.id)}
                bestScore={progress.simulationScores?.[sim.id] ?? 0}
                maxScore={Simulation.maxScore(sim)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-colors border-2 border-ink-900',
        active ? 'bg-ink-900 text-brand-400' : 'bg-white text-ink-900'
      )}
    >
      {label}
    </button>
  )
}
