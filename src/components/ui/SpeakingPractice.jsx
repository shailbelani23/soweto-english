import { useState, useRef } from 'react'
import { Mic, Square, RefreshCw, CheckCircle2 } from 'lucide-react'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import ListenButton from '@/components/ui/ListenButton'
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

// Feedback thresholds on the spoken answer, in words.
const TOO_SHORT = 8
const STRONG = 25

function feedbackFor(words, seconds) {
  if (words === 0)
    return { tone: 'red', msg: "We didn't hear anything. Check your microphone and try again — speak up like the interviewer is across the table." }
  if (words < TOO_SHORT)
    return { tone: 'amber', msg: `Only ${words} words — that answer would feel very short in a real interview. Try again and add one example or one more sentence.` }
  if (words < STRONG)
    return { tone: 'green', msg: `Good — ${words} words in ${seconds}s. Clear and to the point. Want to push further? Add one concrete example.` }
  return { tone: 'green', msg: `Strong answer — ${words} words in ${seconds}s. That length shows confidence. Make sure every sentence earns its place.` }
}

export default function SpeakingPractice({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [practiced, setPracticed] = useState(new Set())
  const [result, setResult] = useState(null) // { transcript, words, seconds }
  const [selfMode, setSelfMode] = useState(false) // fallback flow state
  const startedAt = useRef(null)

  const { supported, listening, transcript, interim, error, start, stop, reset } =
    useSpeechRecognition({ lang: 'en-ZA' })

  // Mirror the latest transcript so finish() reads fresh state after the
  // recognition engine flushes its final results.
  const transcriptRef = useRef('')
  transcriptRef.current = transcript

  const prompt = prompts[currentIndex]

  const begin = () => {
    startedAt.current = Date.now()
    start()
  }

  const finish = () => {
    stop()
    // onend fires async; give the final transcript a beat to land
    setTimeout(() => {
      const text = transcriptRef.current.trim()
      const seconds = Math.max(1, Math.round((Date.now() - startedAt.current) / 1000))
      const words = text ? text.split(/\s+/).length : 0
      setResult({ transcript: text, words, seconds })
      if (words > 0) {
        setPracticed((prev) => new Set([...prev, prompt.id]))
        onComplete?.(prompt.id)
      }
    }, 350)
  }

  const selfDone = () => {
    setSelfMode(false)
    setResult({ transcript: '', words: -1, seconds: 0 })
    setPracticed((prev) => new Set([...prev, prompt.id]))
    onComplete?.(prompt.id)
  }

  const next = () => {
    setResult(null)
    reset()
    setCurrentIndex((i) => (i + 1) % prompts.length)
  }

  const retry = () => {
    setResult(null)
    reset()
  }

  const fb = result && result.words >= 0 ? feedbackFor(result.words, result.seconds) : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="bg-ink-900 text-brand-300 px-2.5 py-1 rounded-md font-bold">
          {prompt.category}
        </span>
        <span className="font-semibold">{practiced.size}/{prompts.length} practised</span>
      </div>

      {/* Prompt */}
      <div className="bg-white rounded-xl border-2 border-ink-900 shadow-soft p-5 space-y-3">
        <div className="flex items-start gap-2.5">
          <ListenButton text={prompt.text} size="md" />
          <p className="font-bold text-gray-900 text-base leading-snug flex-1">{prompt.text}</p>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg px-4 py-2 text-xs text-amber-800 text-left">
          <span className="font-bold">Tip: </span>{prompt.hint}
        </div>
      </div>

      {/* Mic problems (permission denied, no audio) */}
      {supported && error && !listening && !result && (
        <p className="text-xs text-red-700 bg-red-50 border-2 border-red-200 rounded-lg px-3 py-2.5 leading-relaxed">
          We couldn't use your microphone. Check that mic permission is allowed for this site, then try again.
        </p>
      )}

      {/* Live transcript while speaking */}
      {supported && (listening || transcript) && !result && (
        <div className="bg-gray-50 border-2 border-ink-900/15 rounded-xl px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">What we heard</p>
          <p className="text-sm text-gray-800 leading-relaxed">
            {transcript} <span className="text-gray-400">{interim}</span>
          </p>
        </div>
      )}

      {/* Result feedback */}
      {result && (
        <div className="space-y-2.5">
          {fb ? (
            <div
              className={cn(
                'rounded-xl border-2 px-4 py-3 text-sm leading-relaxed',
                fb.tone === 'green' && 'bg-emerald-50 border-emerald-300 text-emerald-800',
                fb.tone === 'amber' && 'bg-amber-50 border-amber-300 text-amber-800',
                fb.tone === 'red' && 'bg-red-50 border-red-300 text-red-800'
              )}
            >
              {fb.msg}
            </div>
          ) : (
            <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 rounded-xl px-4 py-3 text-sm text-center font-semibold">
              ✓ Great practice! Confidence builds with repetition.
            </div>
          )}
          {result.transcript && (
            <div className="bg-white border-2 border-ink-900/15 rounded-xl px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Your answer</p>
              <p className="text-sm text-gray-700 italic leading-relaxed">“{result.transcript}”</p>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={retry}
              className="flex-1 py-3 rounded-lg bg-white border-2 border-ink-900 shadow-soft text-ink-900 font-bold text-sm flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Mic size={15} /> Try again
            </button>
            <button
              onClick={next}
              className="flex-1 py-3 rounded-lg bg-brand-500 border-2 border-ink-900 shadow-soft text-ink-950 font-extrabold text-sm flex items-center justify-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <RefreshCw size={14} /> Next prompt
            </button>
          </div>
        </div>
      )}

      {/* Speak controls */}
      {!result &&
        (supported ? (
          <button
            onClick={listening ? finish : begin}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3.5 rounded-lg border-2 border-ink-900 font-extrabold text-sm transition-all',
              listening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-brand-500 text-ink-950 shadow-soft active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
            )}
          >
            {listening ? (
              <>
                <Square size={15} fill="currentColor" /> Listening… tap when you finish
              </>
            ) : (
              <>
                <Mic size={16} /> Start speaking aloud
              </>
            )}
          </button>
        ) : (
          // No speech recognition in this browser — honest self-practice flow.
          <div className="flex gap-3">
            {!selfMode ? (
              <button
                onClick={() => setSelfMode(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg bg-brand-500 border-2 border-ink-900 shadow-soft text-ink-950 font-extrabold text-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <Mic size={16} /> Speak your answer out loud
              </button>
            ) : (
              <button
                onClick={selfDone}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg bg-emerald-600 border-2 border-ink-900 text-white font-extrabold text-sm"
              >
                <CheckCircle2 size={16} /> I finished speaking
              </button>
            )}
          </div>
        ))}
    </div>
  )
}
