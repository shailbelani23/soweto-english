// Keyword-group scoring for spoken answers.
//
// A speaking challenge defines `keywords`: an array of goal groups, each with
// several accepted phrasings, e.g.
//   { any: ['sorry', 'apologise', 'apologize'], label: { en: 'Apologise', zu: 'Xolisa' } }
// The learner passes a group if ANY phrasing appears in their transcript.
// Overall: hit >= minMatches → pass (10 pts); hit >= half of minMatches → 5; else 0.

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function scoreTranscript(transcript, challenge) {
  const t = ` ${normalize(transcript)} `
  const hit = []
  const missed = []

  for (const group of challenge.keywords) {
    // Space-padded match only — the transcript is padded on both ends, so this
    // enforces word boundaries ('hi' must not match inside 'this').
    const matched = group.any.some((phrase) => t.includes(` ${normalize(phrase)} `))
    ;(matched ? hit : missed).push(group)
  }

  const min = challenge.minMatches ?? challenge.keywords.length
  const points = hit.length >= min ? 10 : hit.length >= Math.ceil(min / 2) ? 5 : 0

  return { hit, missed, points, pass: points === 10 }
}
