import SpeakingPractice from '@/components/ui/SpeakingPractice'

export default function Speaking() {
  return (
    <div className="px-4 pt-6 pb-28">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Speaking Practice</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Say each answer out loud. Confidence comes from repetition.
        </p>
      </div>

      <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-5 text-sm text-violet-800">
        <p className="font-semibold mb-1">How this works</p>
        <p className="text-xs leading-relaxed">
          Read the prompt. Think for 10 seconds. Speak your answer out loud — as if you are in a real interview.
          You are training your mouth, not just your brain. Tap <strong>Start speaking</strong> to begin, then <strong>Done</strong> when you finish.
        </p>
      </div>

      <SpeakingPractice />
    </div>
  )
}
