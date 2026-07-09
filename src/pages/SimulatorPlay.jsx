import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lightbulb, Play, RotateCcw, Trophy, ChevronRight } from 'lucide-react'
import { Simulation, TRACK_META } from 'entities/Simulation'
import { UserProgress } from 'entities/UserProgress'
import { useLanguage } from '@/hooks/useLanguage'
import SpeakingChallenge from '@/components/ui/SpeakingChallenge'
import ListenButton from '@/components/ui/ListenButton'
import { cn } from '@/lib/utils'

const PHASE = { INTRO: 'intro', PLAYING: 'playing', RESULT: 'result' }

function pointTone(points) {
  if (points >= 10) return { bar: 'bg-emerald-500', text: 'text-emerald-700', bubble: 'bg-emerald-50 border-emerald-100' }
  if (points >= 5) return { bar: 'bg-amber-500', text: 'text-amber-700', bubble: 'bg-amber-50 border-amber-100' }
  return { bar: 'bg-red-500', text: 'text-red-700', bubble: 'bg-red-50 border-red-100' }
}

export default function SimulatorPlay() {
  const { simId } = useParams()
  const navigate = useNavigate()
  const { t, L } = useLanguage()
  const sim = Simulation.getById(simId)

  const [phase, setPhase] = useState(PHASE.INTRO)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [score, setScore] = useState(0)
  const [messages, setMessages] = useState([])
  const bottomRef = useRef(null)

  // Reset everything when the scenario id changes (e.g. "Next Scenario").
  useEffect(() => {
    setPhase(PHASE.INTRO)
    setSceneIndex(0)
    setAnswered(false)
    setSelectedChoice(null)
    setScore(0)
    setMessages([])
  }, [simId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, phase])

  if (!sim) {
    return (
      <div className="px-4 pt-10 text-center">
        <p className="text-gray-500">Scenario not found.</p>
        <button onClick={() => navigate('/simulator')} className="mt-4 text-brand-600 font-semibold">
          {t('sim.backToScenarios')}
        </button>
      </div>
    )
  }

  const maxScore = Simulation.maxScore(sim)
  const meta = TRACK_META[sim.track]

  const start = () => {
    const scene = sim.scenes[0]
    setMessages([{ kind: 'npc', speaker: L(scene.speaker), emoji: scene.speakerEmoji, text: L(scene.says) }])
    setSceneIndex(0)
    setAnswered(false)
    setSelectedChoice(null)
    setScore(0)
    setPhase(PHASE.PLAYING)
  }

  const choose = (choice, idx) => {
    if (answered) return
    setSelectedChoice(idx)
    setAnswered(true)
    setScore((s) => s + choice.points)
    setMessages((m) => [
      ...m,
      { kind: 'you', text: L(choice.text) },
      { kind: 'reaction', text: L(choice.reaction), points: choice.points },
      { kind: 'coach', text: L(choice.tip) },
    ])
  }

  // Called by SpeakingChallenge once the learner finishes a spoken answer.
  const finishSpeak = ({ points, transcript, reactionText, coachText }) => {
    if (answered) return
    setAnswered(true)
    setScore((s) => s + points)
    setMessages((m) => [
      ...m,
      { kind: 'you', text: `🎙 “${transcript || '…'}”` },
      { kind: 'reaction', text: reactionText, points },
      { kind: 'coach', text: coachText },
    ])
  }

  const advance = () => {
    if (sceneIndex < sim.scenes.length - 1) {
      const next = sim.scenes[sceneIndex + 1]
      setMessages((m) => [
        ...m,
        { kind: 'npc', speaker: L(next.speaker), emoji: next.speakerEmoji, text: L(next.says) },
      ])
      setSceneIndex((i) => i + 1)
      setAnswered(false)
      setSelectedChoice(null)
    } else {
      UserProgress.completeSimulation(sim.id, score)
      setPhase(PHASE.RESULT)
    }
  }

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (phase === PHASE.INTRO) {
    return (
      <div className="px-4 pt-4 pb-28">
        <button
          onClick={() => navigate('/simulator')}
          className="flex items-center gap-1 text-gray-500 text-sm mb-4 hover:text-gray-900"
        >
          <ArrowLeft size={16} /> {t('sim.backToScenarios')}
        </button>

        <div className="bg-white rounded-xl border-2 border-ink-900 shadow-lift overflow-hidden">
          <div className={cn('h-24 flex items-center justify-center text-5xl border-b-2 border-ink-900', meta.tint)}>
            {sim.emoji}
          </div>
          <div className="p-5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm bg-ink-900 text-brand-300">
              {meta.emoji} {t(meta.labelKey)} · {t(`difficulty.${sim.difficulty}`)}
            </span>
            <h1 className="text-xl font-extrabold text-gray-900 mt-3">{L(sim.title)}</h1>
            <p className="text-sm text-brand-700 font-bold mt-1">{L(sim.role)}</p>
            <div className="mt-4 bg-gray-50 border-2 border-ink-900/10 rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{L(sim.setting)}</p>
            </div>
            <button
              onClick={start}
              className="w-full mt-5 bg-brand-500 text-ink-950 rounded-lg border-2 border-ink-900 shadow-soft py-3.5 font-extrabold flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Play size={18} fill="currentColor" /> {t('sim.startScenario')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── RESULT ───────────────────────────────────────────────────────────────
  if (phase === PHASE.RESULT) {
    const band = Simulation.band(sim, score)
    const pct = Math.round((score / maxScore) * 100)
    const bandColor =
      band === 'great' ? 'text-emerald-600' : band === 'ok' ? 'text-amber-600' : 'text-red-600'
    const bandBg =
      band === 'great' ? 'bg-emerald-500' : band === 'ok' ? 'bg-amber-500' : 'bg-red-500'

    const all = Simulation.getAll()
    const nextSim = all[(all.findIndex((s) => s.id === sim.id) + 1) % all.length]

    return (
      <div className="px-4 pt-6 pb-28">
        <div className="bg-white rounded-xl border-2 border-ink-900 shadow-lift p-6 text-center">
          <div className={cn('w-16 h-16 rounded-lg border-2 border-ink-900 mx-auto flex items-center justify-center', bandBg)}>
            <Trophy size={30} className="text-white" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 mt-4">{t('result.title')}</h1>
          <p className={cn('text-sm font-bold mt-1', bandColor)}>{t(`result.rating.${band}`)}</p>

          {/* Score meter */}
          <div className="mt-5">
            <div className="flex items-end justify-center gap-1">
              <span className="text-4xl font-extrabold text-gray-900">{score}</span>
              <span className="text-lg text-gray-400 mb-1">/ {maxScore}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{L(sim.meterLabel)} · {pct}%</p>
            <div className="h-3 bg-gray-100 border border-ink-900/20 rounded-sm mt-3 overflow-hidden">
              <div className={cn('h-full transition-all duration-700', bandBg)} style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {/* Takeaways */}
        <div className="mt-5 bg-white rounded-xl border-2 border-ink-900 shadow-soft p-5">
          <h2 className="text-sm font-extrabold text-gray-900 mb-3 uppercase tracking-wide">{t('result.takeaways')}</h2>
          <ul className="space-y-2.5">
            {sim.takeaways.map((tk, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-sm bg-ink-900 text-brand-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{L(tk)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-5 space-y-2.5">
          <button
            onClick={start}
            className="w-full bg-brand-500 text-ink-950 rounded-lg border-2 border-ink-900 shadow-soft py-3.5 font-extrabold flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <RotateCcw size={17} /> {t('result.tryAgain')}
          </button>
          <button
            onClick={() => navigate(`/simulator/${nextSim.id}`)}
            className="w-full bg-white text-ink-900 border-2 border-ink-900 shadow-soft rounded-lg py-3.5 font-extrabold flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            {t('result.nextScenario')} <ChevronRight size={17} />
          </button>
          <button
            onClick={() => navigate('/simulator')}
            className="w-full text-gray-500 py-2 text-sm font-medium hover:text-gray-900"
          >
            {t('sim.backToScenarios')}
          </button>
        </div>
      </div>
    )
  }

  // ─── PLAYING ──────────────────────────────────────────────────────────────
  const scene = sim.scenes[sceneIndex]
  const isLastScene = sceneIndex === sim.scenes.length - 1

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Sticky status bar */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate('/simulator')} className="text-gray-400 hover:text-gray-700">
            <ArrowLeft size={18} />
          </button>
          <span className="text-xs font-semibold text-gray-500">
            {t('sim.scene', { current: sceneIndex + 1, total: sim.scenes.length })}
          </span>
          <span className="text-xs font-bold text-brand-700">{score} pts</span>
        </div>
        <div className="h-2 bg-gray-100 border border-ink-900/20 rounded-sm overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all duration-500"
            style={{ width: `${((sceneIndex + (answered ? 1 : 0)) / sim.scenes.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Chat transcript */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} youLabel={t('sim.you')} coachLabel={t('result.tipLabel')} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Choices / speaking challenge / continue */}
      <div className="border-t border-gray-100 bg-white px-4 py-3 space-y-2 max-h-[55vh] overflow-y-auto">
        {!answered ? (
          scene.type === 'speak' ? (
            <SpeakingChallenge key={sceneIndex} scene={scene} onDone={finishSpeak} />
          ) : (
          <>
            <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 px-1">
              {t('sim.chooseResponse')}
            </p>
            {scene.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => choose(choice, idx)}
                className="w-full text-left bg-white hover:bg-brand-50 border-2 border-ink-900 rounded-lg px-4 py-3 text-sm text-gray-800 font-semibold transition-colors active:translate-x-0.5 active:translate-y-0.5"
              >
                {L(choice.text)}
              </button>
            ))}
          </>
          )
        ) : (
          <button
            onClick={advance}
            className="w-full bg-brand-500 text-ink-950 rounded-lg border-2 border-ink-900 shadow-soft py-3.5 font-extrabold flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            {isLastScene ? t('sim.finish') : t('sim.continue')} <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  )
}

function Message({ msg, youLabel, coachLabel }) {
  if (msg.kind === 'npc') {
    return (
      <div className="flex gap-2 items-end">
        <div className="w-8 h-8 rounded-md bg-white border-2 border-ink-900 flex items-center justify-center text-lg shrink-0">
          {msg.emoji}
        </div>
        <div className="max-w-[80%]">
          <p className="text-[10px] font-bold text-gray-400 mb-0.5 ml-1 uppercase tracking-wide">{msg.speaker}</p>
          <div className="bg-white border-2 border-ink-900 rounded-lg rounded-bl-none px-4 py-2.5 text-sm text-gray-800 leading-relaxed">
            {msg.text}
            <div className="mt-1.5 -mb-0.5">
              <ListenButton text={msg.text} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (msg.kind === 'you') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%]">
          <p className="text-[10px] font-bold text-brand-700 mb-0.5 mr-1 text-right uppercase tracking-wide">{youLabel}</p>
          <div className="bg-brand-500 text-ink-950 font-medium border-2 border-ink-900 rounded-lg rounded-br-none px-4 py-2.5 text-sm leading-relaxed">
            {msg.text}
          </div>
        </div>
      </div>
    )
  }

  if (msg.kind === 'reaction') {
    const tone = pointTone(msg.points)
    return (
      <div className="flex justify-center">
        <div className={cn('max-w-[85%] border-2 rounded-lg px-4 py-2.5', tone.bubble)}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-700 leading-relaxed italic">{msg.text}</p>
            <span className={cn('text-xs font-bold shrink-0', tone.text)}>
              {msg.points > 0 ? `+${msg.points}` : msg.points}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // coach
  return (
    <div className="flex justify-center">
      <div className="max-w-[85%] flex gap-2 items-start bg-brand-50 border-2 border-brand-700/30 rounded-lg px-4 py-2.5">
        <Lightbulb size={15} className="text-brand-500 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wide text-brand-500 mb-0.5">{coachLabel}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
          <div className="mt-1.5">
            <ListenButton text={msg.text} />
          </div>
        </div>
      </div>
    </div>
  )
}
