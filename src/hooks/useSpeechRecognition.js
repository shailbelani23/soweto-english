import { useState, useRef, useCallback, useEffect } from 'react'

// Web Speech API — built into Chrome (desktop + Android), zero download, free.
// On modern Android Chrome recognition runs on-device; elsewhere it may use
// the browser vendor's speech service. We expose `supported` so the UI can
// fall back gracefully on browsers without it (e.g. Firefox).
const SR =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition)

export function useSpeechRecognition({ lang = 'en-ZA' } = {}) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interim, setInterim] = useState('')
  const [error, setError] = useState(null)
  const recRef = useRef(null)

  const supported = Boolean(SR)

  const stop = useCallback(() => {
    recRef.current?.stop()
  }, [])

  const reset = useCallback(() => {
    setTranscript('')
    setInterim('')
    setError(null)
  }, [])

  const start = useCallback(() => {
    if (!SR) return
    setError(null)
    setTranscript('')
    setInterim('')

    const rec = new SR()
    rec.lang = lang
    rec.interimResults = true
    rec.continuous = true

    rec.onresult = (e) => {
      let finalText = ''
      let interimText = ''
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i]
        if (r.isFinal) finalText += r[0].transcript + ' '
        else interimText += r[0].transcript
      }
      if (finalText) setTranscript(finalText.trim())
      setInterim(interimText)
    }
    rec.onerror = (e) => {
      // 'no-speech' and 'aborted' are routine; anything else is a real error.
      if (e.error !== 'aborted') setError(e.error)
      setListening(false)
    }
    rec.onend = () => {
      setInterim('')
      setListening(false)
    }

    recRef.current = rec
    rec.start()
    setListening(true)
  }, [lang])

  // Kill the mic if the component unmounts mid-recording.
  useEffect(() => () => recRef.current?.abort(), [])

  return { supported, listening, transcript, interim, error, start, stop, reset }
}
