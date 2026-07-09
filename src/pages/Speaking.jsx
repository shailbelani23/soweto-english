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

      <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-4 mb-5 text-sm text-violet-800">
        <p className="font-bold mb-1">How this works</p>
        <p className="text-xs leading-relaxed">
          Read the prompt (or tap the speaker to hear it). Think for 10 seconds, then speak your answer out loud —
          as if you are in a real interview. The app listens, shows you what it heard, and tells you if your answer
          was long enough. You are training your mouth, not just your brain.
        </p>
      </div>

      <SpeakingPractice />
    </div>
  )
}
