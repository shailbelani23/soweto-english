import { useState, useCallback, useEffect, useRef } from 'react'

// Text-to-speech via the browser's built-in speechSynthesis.
// On Android this uses the phone's on-device Google TTS engine (offline voices),
// so it costs nothing and needs no download. Known quirks handled here:
// - voices load asynchronously (voiceschanged event)
// - Android does not support pause → we only ever play/stop
const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

let cachedVoice = null

function pickVoice() {
  if (!synth) return null
  if (cachedVoice) return cachedVoice
  const voices = synth.getVoices()
  if (!voices.length) return null
  // Prefer South African English, then any English, then whatever exists.
  cachedVoice =
    voices.find((v) => v.lang === 'en-ZA') ||
    voices.find((v) => v.lang?.startsWith('en-GB')) ||
    voices.find((v) => v.lang?.startsWith('en')) ||
    voices[0]
  return cachedVoice
}

export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef(null)

  const supported = Boolean(synth)

  // Voices arrive late on some platforms — warm the cache when they land.
  useEffect(() => {
    if (!synth) return
    const onVoices = () => pickVoice()
    synth.addEventListener?.('voiceschanged', onVoices)
    pickVoice()
    return () => synth.removeEventListener?.('voiceschanged', onVoices)
  }, [])

  const stop = useCallback(() => {
    if (!synth) return
    synth.cancel()
    setSpeaking(false)
  }, [])

  const speak = useCallback(
    (text) => {
      if (!synth || !text) return
      synth.cancel() // only one voice at a time
      const u = new SpeechSynthesisUtterance(text)
      const voice = pickVoice()
      if (voice) u.voice = voice
      u.lang = voice?.lang || 'en-ZA'
      u.rate = 0.95 // slightly slower for learners
      u.onend = () => setSpeaking(false)
      u.onerror = () => setSpeaking(false)
      utteranceRef.current = u // keep a ref so it isn't garbage-collected mid-speech
      setSpeaking(true)
      synth.speak(u)
    },
    []
  )

  // Stop speech if the component unmounts mid-playback.
  useEffect(() => () => synth?.cancel(), [])

  return { supported, speaking, speak, stop }
}
