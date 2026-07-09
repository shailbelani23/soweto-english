import ListenButton from '@/components/ui/ListenButton'

export default function PhraseCard({ phrase, meaning }) {
  return (
    <div className="bg-white border-2 border-ink-900/15 rounded-lg p-3 flex items-start gap-2.5">
      <ListenButton text={phrase} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm italic">"{phrase}"</p>
        <p className="text-xs text-gray-500 mt-1">{meaning}</p>
      </div>
    </div>
  )
}
