import { useState } from 'react'
import { Mic, Volume2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

const prompts = [
  {
    id: 'sp-1',
    category: 'Introduction',
    text: 'Tell me about yourself in 60 seconds.',
    hint: 'Cover: your name, where you\'re from, one achievement, and why you want this job.',
  },
  {
    id: 'sp-2',
    category: 'Customer Service',
    text: 'A guest walks in and you greet them warmly. What do you say?',
    hint: 'Start with the time of day. Smile. Ask if they\'ve been here before.',
  },
  {
    id: 'sp-3',
    category: 'Problem Solving',
    text: 'Explain to a guest that the dish they ordered is no longer available.',
    hint: 'Apologize first. Offer alternatives. Suggest your personal recommendation.',
  },
  {
    id: 'sp-4',
    category: 'Teamwork',
    text: 'Describe a time you worked with others to solve a problem.',
    hint: 'Use STAR: Situation → Task → Action → Result.',
  },
  {
    id: 'sp-5',
    category: 'Strength',
    text: 'What is your greatest strength and how does it help you in hospitality?',
    hint: 'Pick ONE strength. Give a concrete example.',
  },
  {
    id: 'sp-6',
    category: 'Goals',
    text: 'Where do you see yourself in two years?',
    hint: 'Show ambition. Connect your goal to this specific job.',
  },
  {
    id: 'sp-7',
    category: 'Complaint',
    text: 'A guest is upset because they waited 30 minutes for their food. What do you say to them?',
    hint: 'Listen first. Apologize sincerely. Do not make excuses. Offer a solution.',
  },
  {
    id: 'sp-8',
    category: 'Professionalism',
    text: 'How do you handle a situation where a colleague is rude to a customer?',
    hint: 'Stay calm. Prioritize the customer. Address the colleague later, privately.',
  },
]

export default function SpeakingPractice({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [practiced, setPracticed] = useState(new Set())
  const [recording, setRecording] = useState(false)
  const [done, setDone] = useState(false)

  const prompt = prompts[currentIndex]

  function handlePracticed() {
    setRecording(false)
    setDone(true)
    setPracticed(prev => new Set([...prev, prompt.id]))
    onComplete?.(prompt.id)
  }

  function handleNext() {
    setDone(false)
    setCurrentIndex(i => (i + 1) % prompts.length)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="bg-brand-100 text-brand-700 px-2 py-1 rounded-full font-medium">
          {prompt.category}
        </span>
        <span>{practiced.size}/{prompts.length} practised</span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center space-y-3">
        <p className="font-semibold text-gray-900 text-base leading-snug">{prompt.text}</p>
        <div className="bg-amber-50 rounded-xl px-4 py-2 text-xs text-amber-700 text-left">
          <span className="font-semibold">Tip: </span>{prompt.hint}
        </div>
      </div>

      <div className="flex gap-3">
        {!done ? (
          <>
            <button
              onClick={() => setRecording(r => !r)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-medium text-sm transition-all',
                recording
                  ? 'bg-red-500 text-white'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              )}
            >
              <Mic size={16} />
              {recording ? 'Recording... tap when done' : 'Start speaking aloud'}
            </button>
            {recording && (
              <button
                onClick={handlePracticed}
                className="px-4 py-3 rounded-2xl bg-emerald-500 text-white font-medium text-sm"
              >
                Done
              </button>
            )}
          </>
        ) : (
          <div className="flex-1 space-y-2">
            <div className="bg-emerald-50 text-emerald-700 rounded-xl px-4 py-3 text-sm text-center font-medium">
              ✓ Great practice! Confidence builds with repetition.
            </div>
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              <RefreshCw size={14} />
              Next prompt
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
