import { cn } from '@/lib/utils'

export default function DialoguePlayer({ lines, scenario }) {
  return (
    <div className="space-y-3">
      {scenario && (
        <p className="text-xs text-gray-500 italic bg-gray-50 rounded-lg px-3 py-2">{scenario}</p>
      )}
      <div className="space-y-2">
        {lines.map((line, i) => {
          const isYou = line.speaker === 'you'
          return (
            <div
              key={i}
              className={cn('flex gap-2', isYou ? 'flex-row-reverse' : 'flex-row')}
            >
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                isYou ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600'
              )}>
                {isYou ? 'Y' : line.speaker === 'manager' ? 'M' : 'G'}
              </div>
              <div className={cn(
                'max-w-[80%] rounded-2xl px-3 py-2 text-sm',
                isYou
                  ? 'bg-brand-600 text-white rounded-tr-sm'
                  : 'bg-gray-100 text-gray-800 rounded-tl-sm'
              )}>
                {line.text}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
