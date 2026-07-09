import { useState, useEffect, useCallback } from 'react'
import { UserProgress } from 'entities/UserProgress'
import { Lesson } from 'entities/Lesson'
import { InterviewQuestion } from 'entities/InterviewQuestion'
import { Simulation } from 'entities/Simulation'

export function useProgress() {
  const [progress, setProgress] = useState(() => UserProgress.get())

  const refresh = useCallback(() => {
    setProgress(UserProgress.get())
  }, [])

  const completeLesson = useCallback((lessonId, duration) => {
    UserProgress.completeLesson(lessonId, duration)
    refresh()
  }, [refresh])

  const completeInterview = useCallback((questionId) => {
    UserProgress.completeInterview(questionId)
    refresh()
  }, [refresh])

  const saveQuiz = useCallback((lessonId, correct) => {
    UserProgress.saveQuizResult(lessonId, correct)
    refresh()
  }, [refresh])

  const saveConfidence = useCallback((questionId, score) => {
    UserProgress.saveConfidence(questionId, score)
    refresh()
  }, [refresh])

  const jobReadiness = UserProgress.getJobReadiness(
    Lesson.getAll().length,
    InterviewQuestion.getAll().length,
    Simulation.getAll().length
  )

  const readinessLabel = UserProgress.getReadinessLabel(jobReadiness)

  return {
    progress,
    jobReadiness,
    readinessLabel,
    completeLesson,
    completeInterview,
    saveQuiz,
    saveConfidence,
    refresh,
  }
}
