import { Volume2, Square } from 'lucide-react'
import { useTextToSpeech } from '@/hooks/useTextToSpeech'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

// Small "listen" toggle. Reads `text` out loud with the device's TTS engine.
// Hidden entirely on browsers without speechSynthesis.
export default function ListenButton({ text, className, size = 'sm' }) {
  const { supported, speaking, speak, stop } = useTextToSpeech()
  const { t } = useLanguage()

  if (!supported || !text) return null

  const big = size === 'md'

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        speaking ? stop() : speak(text)
      }}
      aria-label={speaking ? t('listen.stop') : t('listen.play')}
      title={speaking ? t('listen.stop') : t('listen.play')}
      className={cn(
        'inline-flex items-center justify-center rounded-md border-2 shrink-0 transition-colors',
        big ? 'w-9 h-9' : 'w-7 h-7',
        speaking
          ? 'bg-brand-500 border-ink-900 text-ink-950'
          : 'bg-white border-ink-900/25 text-ink-900 hover:border-ink-900',
        className
      )}
    >
      {speaking ? <Square size={big ? 14 : 11} fill="currentColor" /> : <Volume2 size={big ? 17 : 14} />}
    </button>
  )
}
