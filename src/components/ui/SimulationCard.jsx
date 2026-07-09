import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronRight, Mic } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

export default function SimulationCard({ sim, completed, bestScore, maxScore }) {
  const navigate = useNavigate()
  const { t, L } = useLanguage()

  return (
    <button
      onClick={() => navigate(`/simulator/${sim.id}`)}
      className="w-full bg-white rounded-xl p-4 border-2 border-ink-900 shadow-soft text-left active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-3"
    >
      <div className="w-12 h-12 rounded-md bg-brand-50 border border-ink-900/15 flex items-center justify-center text-2xl shrink-0">
        {sim.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900 text-sm truncate">{L(sim.title)}</h3>
          {completed && <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />}
        </div>
        <p className="text-xs text-gray-500 truncate mt-0.5">{L(sim.role)}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {t(`difficulty.${sim.difficulty}`)}
          </span>
          {sim.voice && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 flex items-center gap-0.5">
              <Mic size={9} /> {t('sim.voiceBadge')}
            </span>
          )}
          {completed && (
            <span className="text-[10px] font-semibold text-emerald-600">
              {t('sim.completed')} · {bestScore}/{maxScore}
            </span>
          )}
        </div>
      </div>
      <ChevronRight size={18} className={cn('text-gray-300 shrink-0')} />
    </button>
  )
}
