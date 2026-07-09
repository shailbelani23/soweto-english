import { Flame } from 'lucide-react'

export default function DailyStreak({ days, label = 'Daily Streak' }) {
  return (
    <div className="bg-white rounded-xl p-4 border-2 border-ink-900 shadow-soft">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">{label}</span>
        <Flame size={18} className={days > 0 ? 'text-orange-400' : 'text-gray-300'} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{days}</span>
        <span className="text-sm text-gray-500">{days === 1 ? 'day' : 'days'}</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {days === 0
          ? 'Start your streak today!'
          : days < 3
            ? 'Keep it going!'
            : days < 7
              ? 'You\'re on a roll!'
              : 'Incredible consistency!'}
      </p>
    </div>
  )
}
