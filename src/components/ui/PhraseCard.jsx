export default function PhraseCard({ phrase, meaning }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3">
      <p className="font-medium text-gray-900 text-sm italic">"{phrase}"</p>
      <p className="text-xs text-gray-500 mt-1">{meaning}</p>
    </div>
  )
}
