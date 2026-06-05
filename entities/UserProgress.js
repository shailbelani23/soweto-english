const STORAGE_KEY = 'soweto_english_progress'

const defaultProgress = {
  name: 'Learner',
  language: 'en',
  completedLessons: [],
  completedInterviews: [],
  streakDays: 0,
  lastActiveDate: null,
  totalMinutes: 0,
  jobTrack: 'Hospitality',
  confidenceScores: {},
  quizResults: {},
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : { ...defaultProgress }
  } catch {
    return { ...defaultProgress }
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // storage full or unavailable — silent fail
  }
}

export class UserProgress {
  static get() {
    return load()
  }

  static setName(name) {
    const p = load()
    save({ ...p, name })
  }

  static setLanguage(lang) {
    const p = load()
    save({ ...p, language: lang })
  }

  static completeLesson(lessonId, durationMinutes) {
    const p = load()
    const today = new Date().toDateString()
    const wasActiveToday = p.lastActiveDate === today
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const wasActiveYesterday = p.lastActiveDate === yesterday

    const newStreak = wasActiveToday
      ? p.streakDays
      : wasActiveYesterday
        ? p.streakDays + 1
        : 1

    save({
      ...p,
      completedLessons: p.completedLessons.includes(lessonId)
        ? p.completedLessons
        : [...p.completedLessons, lessonId],
      lastActiveDate: today,
      streakDays: newStreak,
      totalMinutes: p.totalMinutes + (durationMinutes || 0),
    })
  }

  static completeInterview(questionId) {
    const p = load()
    save({
      ...p,
      completedInterviews: p.completedInterviews.includes(questionId)
        ? p.completedInterviews
        : [...p.completedInterviews, questionId],
    })
  }

  static saveQuizResult(lessonId, correct) {
    const p = load()
    save({ ...p, quizResults: { ...p.quizResults, [lessonId]: correct } })
  }

  static saveConfidence(questionId, score) {
    const p = load()
    save({ ...p, confidenceScores: { ...p.confidenceScores, [questionId]: score } })
  }

  static getJobReadiness(totalLessons, totalInterviews) {
    const p = load()
    if (totalLessons === 0 && totalInterviews === 0) return 0
    const lessonScore = totalLessons ? (p.completedLessons.length / totalLessons) * 60 : 0
    const interviewScore = totalInterviews ? (p.completedInterviews.length / totalInterviews) * 40 : 0
    return Math.round(lessonScore + interviewScore)
  }

  static getReadinessLabel(pct) {
    if (pct === 0) return 'Starting Out'
    if (pct < 25) return 'Building Foundations'
    if (pct < 50) return 'Growing Confidence'
    if (pct < 75) return 'Nearly Ready'
    if (pct < 100) return 'Interview Ready'
    return 'Job Ready!'
  }

  static reset() {
    save({ ...defaultProgress })
  }
}
