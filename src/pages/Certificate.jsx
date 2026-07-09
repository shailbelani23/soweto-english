import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Award, Download, Share2, Lock } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

// Certificate unlocks at this Job Readiness % — reaching it means the learner
// has worked through most lessons, interviews and simulations.
export const CERT_THRESHOLD = 80

const INK = '#141b16'
const GREEN = '#1a9a41'
const GREEN_LIGHT = '#4fd376'

// Draws the certificate onto a canvas at print-friendly resolution.
function drawCertificate(canvas, { name, dateStr, readiness }) {
  const W = 1400
  const H = 1000
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // Paper
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // Retro double border
  ctx.strokeStyle = INK
  ctx.lineWidth = 12
  ctx.strokeRect(30, 30, W - 60, H - 60)
  ctx.strokeStyle = GREEN
  ctx.lineWidth = 4
  ctx.strokeRect(54, 54, W - 108, H - 108)

  // Header band
  ctx.fillStyle = INK
  ctx.fillRect(54, 54, W - 108, 120)
  ctx.fillStyle = GREEN_LIGHT
  ctx.font = '900 34px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('READY4WORK', W / 2, 112)
  ctx.fillStyle = '#ffffff'
  ctx.font = '600 20px Inter, sans-serif'
  ctx.fillText('JOB READINESS PROGRAMME', W / 2, 148)

  // Title
  ctx.fillStyle = INK
  ctx.font = '900 64px Inter, sans-serif'
  ctx.fillText('Certificate of Completion', W / 2, 300)

  // Green rule
  ctx.fillStyle = GREEN
  ctx.fillRect(W / 2 - 160, 330, 320, 6)

  // Awarded to
  ctx.fillStyle = '#666f68'
  ctx.font = '500 26px Inter, sans-serif'
  ctx.fillText('This certifies that', W / 2, 410)

  ctx.fillStyle = INK
  ctx.font = '900 72px Inter, sans-serif'
  ctx.fillText(name, W / 2, 500)

  // Body
  ctx.fillStyle = '#3d453f'
  ctx.font = '500 24px Inter, sans-serif'
  const lines = [
    'has completed the Ready4Work job readiness programme:',
    'workplace lessons, interview practice, live job simulations',
    'and speaking practice for Hospitality, Call Centre and Retail.',
  ]
  lines.forEach((line, i) => ctx.fillText(line, W / 2, 570 + i * 38))

  // Readiness badge
  ctx.fillStyle = GREEN
  ctx.beginPath()
  ctx.arc(W / 2, 770, 62, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = INK
  ctx.lineWidth = 6
  ctx.stroke()
  ctx.fillStyle = '#ffffff'
  ctx.font = '900 34px Inter, sans-serif'
  ctx.fillText(`${readiness}%`, W / 2, 782)
  ctx.fillStyle = INK
  ctx.font = '700 18px Inter, sans-serif'
  ctx.fillText('JOB READINESS', W / 2, 866)

  // Footer: date + signature
  ctx.textAlign = 'left'
  ctx.fillStyle = INK
  ctx.fillRect(150, 890, 320, 3)
  ctx.font = '600 20px Inter, sans-serif'
  ctx.fillText(dateStr, 150, 880)
  ctx.font = '500 18px Inter, sans-serif'
  ctx.fillStyle = '#666f68'
  ctx.fillText('Date', 150, 922)

  ctx.textAlign = 'right'
  ctx.fillStyle = INK
  ctx.fillRect(W - 470, 890, 320, 3)
  ctx.font = '500 18px Inter, sans-serif'
  ctx.fillStyle = '#666f68'
  ctx.fillText('Programme Facilitator', W - 150, 922)

  return canvas
}

export default function Certificate() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { progress, jobReadiness } = useProgress()
  const canvasRef = useRef(null)

  const unlocked = jobReadiness >= CERT_THRESHOLD
  const dateStr = new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })

  const makePng = (cb) => {
    const canvas = canvasRef.current || document.createElement('canvas')
    drawCertificate(canvas, { name: progress.name, dateStr, readiness: jobReadiness })
    canvas.toBlob((blob) => blob && cb(blob), 'image/png')
  }

  const download = () =>
    makePng((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Ready4Work-Certificate-${progress.name}.png`
      a.click()
      URL.revokeObjectURL(url)
    })

  const share = () =>
    makePng(async (blob) => {
      const file = new File([blob], `Ready4Work-Certificate-${progress.name}.png`, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: 'Ready4Work Certificate' })
        } catch {
          // user cancelled the share sheet — nothing to do
        }
      } else {
        download()
      }
    })

  // ── Locked state ──
  if (!unlocked) {
    return (
      <div className="px-4 pt-6 pb-28">
        <BackLink onClick={() => navigate(-1)} label={t('cert.back')} />
        <div className="bg-white rounded-xl border-2 border-ink-900 shadow-lift p-6 text-center mt-4">
          <div className="w-16 h-16 rounded-lg bg-gray-100 border-2 border-ink-900 mx-auto flex items-center justify-center">
            <Lock size={28} className="text-gray-400" />
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 mt-4">{t('cert.lockedTitle')}</h1>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {t('cert.lockedBody', { target: CERT_THRESHOLD, current: jobReadiness })}
          </p>
          <div className="h-3 bg-gray-100 border border-ink-900/20 rounded-sm mt-5 overflow-hidden">
            <div
              className="h-full bg-brand-500 transition-all duration-700"
              style={{ width: `${Math.min(100, (jobReadiness / CERT_THRESHOLD) * 100)}%` }}
            />
          </div>
          <p className="text-xs font-bold text-brand-700 mt-2">
            {jobReadiness}% / {CERT_THRESHOLD}%
          </p>
          <button
            onClick={() => navigate('/simulator')}
            className="w-full mt-5 bg-brand-500 text-ink-950 rounded-lg border-2 border-ink-900 shadow-soft py-3.5 font-extrabold active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            {t('cert.keepPractising')}
          </button>
        </div>
      </div>
    )
  }

  // ── Unlocked state ──
  return (
    <div className="px-4 pt-6 pb-28">
      <BackLink onClick={() => navigate(-1)} label={t('cert.back')} />

      <div className="text-center mt-2 mb-4">
        <div className="w-14 h-14 rounded-lg bg-brand-500 border-2 border-ink-900 mx-auto flex items-center justify-center">
          <Award size={26} className="text-ink-950" />
        </div>
        <h1 className="text-xl font-extrabold text-gray-900 mt-3">{t('cert.unlockedTitle')}</h1>
        <p className="text-sm text-gray-600 mt-1">{t('cert.unlockedBody')}</p>
      </div>

      {/* On-screen certificate preview (the PNG mirrors this) */}
      <div className="bg-white border-4 border-ink-900 rounded-sm p-1.5 shadow-lift">
        <div className="border-2 border-brand-600 px-4 py-6 text-center">
          <div className="bg-ink-900 -mx-4 -mt-6 px-4 py-3 mb-5">
            <p className="text-brand-400 font-black text-sm tracking-widest">READY4WORK</p>
            <p className="text-white/80 text-[10px] font-semibold tracking-widest uppercase">
              {t('cert.programme')}
            </p>
          </div>
          <h2 className="text-lg font-extrabold text-gray-900">{t('cert.certTitle')}</h2>
          <div className="w-24 h-1 bg-brand-500 mx-auto mt-2" />
          <p className="text-xs text-gray-500 mt-4">{t('cert.awardedTo')}</p>
          <p className="text-2xl font-black text-gray-900 mt-1">{progress.name}</p>
          <p className="text-xs text-gray-600 leading-relaxed mt-3 max-w-xs mx-auto">{t('cert.completedText')}</p>
          <div className="w-16 h-16 rounded-full bg-brand-500 border-2 border-ink-900 mx-auto mt-4 flex items-center justify-center">
            <span className="text-white font-black text-sm">{jobReadiness}%</span>
          </div>
          <p className="text-[10px] font-bold text-gray-700 mt-1 uppercase tracking-wide">{t('home.jobReadiness')}</p>
          <div className="flex justify-between mt-6 pt-3 text-[10px] text-gray-500">
            <div className="border-t-2 border-ink-900 pt-1 px-2 font-semibold">{dateStr}</div>
            <div className="border-t-2 border-ink-900 pt-1 px-2 font-semibold">{t('cert.signature')}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 space-y-2.5">
        <button
          onClick={download}
          className="w-full bg-brand-500 text-ink-950 rounded-lg border-2 border-ink-900 shadow-soft py-3.5 font-extrabold flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
        >
          <Download size={17} /> {t('cert.download')}
        </button>
        <button
          onClick={share}
          className="w-full bg-white text-ink-900 border-2 border-ink-900 shadow-soft rounded-lg py-3.5 font-extrabold flex items-center justify-center gap-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
        >
          <Share2 size={17} /> {t('cert.share')}
        </button>
      </div>

      {/* Hidden canvas used to render the PNG */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

function BackLink({ onClick, label }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-900">
      <ArrowLeft size={16} /> {label}
    </button>
  )
}
