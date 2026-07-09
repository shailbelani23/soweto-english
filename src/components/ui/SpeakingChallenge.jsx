import { useState } from 'react'
import { Mic, Square, CheckCircle2, XCircle, RotateCcw, ChevronRight, Volume2 } from 'lucide-react'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { scoreTranscript } from '@/lib/speechScore'
import { useLanguage } from '@/hooks/useLanguage'
import ListenButton from '@/components/ui/ListenButton'
import { cn } from '@/lib/utils'

const MAX_ATTEMPTS = 3

// Renders in the bottom panel of SimulatorPlay for `type: 'speak'` scenes.
// The learner speaks out loud; we transcribe, score against keyword goals,
// and hand the result (points + composed feedback) back to the parent.
export default function SpeakingChallenge({ scene, onDone }) {
  const { t, L } = useLanguage()
  const { supported, listening, transcript, interim, error, start, stop, reset } =
    useSpeechRecognition({ lang: 'en-ZA' })

  const [attempts, setAttempts] = useState(0)
  const [result, setResult] = useState(null) // last scored attempt
  const [best, setBest] = useState(null) // best attempt so far

  const speak = scene.speak

  const finish = (res, transcriptText) => {
    const hitLabels = res.hit.map((g) => L(g.label)).join(', ')
    const missedLabels = res.missed.map((g) => L(g.label)).join(', ')
    const reactionText = L(
      res.pass ? speak.reactionPass : res.points > 0 ? speak.reactionPartial : speak.reactionFail
    )
    const coachParts = []
    if (hitLabels) coachParts.push(t('sim.youCovered', { items: hitLabels }))
    if (missedLabels) coachParts.push(t('sim.youMissed', { items: missedLabels }))
    coachParts.push(`${t('sim.showExample')}: “${L(speak.example)}”`)
    onDone({
      points: res.points,
      transcript: transcriptText,
      reactionText,
      coachText: coachParts.join(' · '),
    })
  }

  // ── Fallback for browsers without speech recognition ──
  if (!supported) {
    return (
      <div className="space-y-3">
        <GoalCard t={t} L={L} speak={speak} />
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <p className="text-sm font-bold text-amber-800">{t('sim.speechUnsupported')}</p>
          <p className="text-xs text-amber-700 mt-1 leading-relaxed">{t('sim.speechUnsupportedBody')}</p>
          <div className="flex items-start gap-2 mt-3">
            <ListenButton text={speak.example.en} />
            <p className="text-sm text-gray-700 italic flex-1">“{L(speak.example)}”</p>
          </div>
        </div>
        <button
          onClick={() =>
            onDone({
              points: 5,
              transcript: t('sim.practisedAloud'),
              reactionText: L(speak.reactionPartial),
              coachText: `${t('sim.showExample')}: “${L(speak.example)}”`,
            })
          }
          className="w-full bg-brand-600 text-white rounded-2xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors"
        >
          {t('sim.iPractised')} <ChevronRight size={17} />
        </button>
      </div>
    )
  }

  const evaluate = () => {
    const res = scoreTranscript(transcript, speak)
    const scored = { ...res, transcriptText: transcript }
    setResult(scored)
    setBest((b) => (!b || res.points > b.points ? scored : b))
    setAttempts((a) => a + 1)
  }

  const retry = () => {
    setResult(null)
    reset()
  }

  const attemptsLeft = MAX_ATTEMPTS - attempts
  const canRetry = attemptsLeft > 0 && result && !result.pass

  // ── Scored state: show pass/fail + goals hit ──
  if (result) {
    const keep = best ?? result
    return (
      <div className="space-y-3">
        <div
          className={cn(
            'rounded-2xl border p-4',
            result.pass
              ? 'bg-emerald-50 border-emerald-100'
              : result.points > 0
                ? 'bg-amber-50 border-amber-100'
                : 'bg-red-50 border-red-100'
          )}
        >
          <div className="flex items-center gap-2">
            {result.pass ? (
              <CheckCircle2 size={18} className="text-emerald-600" />
            ) : (
              <XCircle size={18} className={result.points > 0 ? 'text-amber-600' : 'text-red-500'} />
            )}
            <p className="text-sm font-bold text-gray-900">
              {result.pass ? t('sim.speakPass') : result.points > 0 ? t('sim.speakPartial') : t('sim.speakFail')}
            </p>
            <span className="ml-auto text-xs font-bold text-gray-500">+{result.points} pts</span>
          </div>
          <p className="text-xs text-gray-600 mt-2 italic">“{result.transcriptText || '…'}”</p>
          <div className="mt-3 space-y-1">
            {speak.keywords.map((g, i) => {
              const gHit = result.hit.includes(g)
              return (
                <div key={i} className="flex items-center gap-1.5 text-xs">
                  {gHit ? (
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle size={13} className="text-gray-300 shrink-0" />
                  )}
                  <span className={gHit ? 'text-gray-700 font-medium' : 'text-gray-400'}>{L(g.label)}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-2">
          {canRetry && (
            <button
              onClick={retry}
              className="flex-1 bg-white border border-gray-200 text-gray-900 rounded-2xl py-3 font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-gray-50"
            >
              <RotateCcw size={15} /> {t('sim.retrySpeak')} ({attemptsLeft})
            </button>
          )}
          <button
            onClick={() => finish(keep, keep.transcriptText)}
            className="flex-1 bg-brand-600 text-white rounded-2xl py-3 font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-brand-700"
          >
            {t('sim.continue')} <ChevronRight size={15} />
          </button>
        </div>
      </div>
    )
  }

  // ── Recording state ──
  return (
    <div className="space-y-3">
      <GoalCard t={t} L={L} speak={speak} />

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          {t('sim.micError')}
        </p>
      )}

      {(transcript || interim) && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">{t('sim.heardYou')}</p>
          <p className="text-sm text-gray-800 leading-relaxed">
            {transcript} <span className="text-gray-400">{interim}</span>
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={listening ? stop : start}
          className={cn(
            'flex-1 rounded-2xl py-3.5 font-bold flex items-center justify-center gap-2 transition-colors',
            listening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-brand-600 text-white hover:bg-brand-700'
          )}
        >
          {listening ? (
            <>
              <Square size={16} fill="currentColor" /> {t('sim.listening')}
            </>
          ) : (
            <>
              <Mic size={18} /> {t('sim.tapToSpeak')}
            </>
          )}
        </button>
        {!listening && transcript && (
          <button
            onClick={evaluate}
            className="flex-1 bg-emerald-600 text-white rounded-2xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            <CheckCircle2 size={17} /> {t('sim.checkAnswer')}
          </button>
        )}
      </div>
    </div>
  )
}

function GoalCard({ t, L, speak }) {
  return (
    <div className="bg-brand-50/70 border border-brand-100 rounded-2xl p-4">
      <div className="flex items-center gap-1.5 mb-1">
        <Volume2 size={14} className="text-brand-600" />
        <p className="text-[10px] font-bold uppercase tracking-wide text-brand-600">{t('sim.speakChallenge')}</p>
      </div>
      <p className="text-sm text-gray-800 leading-relaxed font-medium">{L(speak.goal)}</p>
    </div>
  )
}
