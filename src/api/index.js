import { Lesson } from 'entities/Lesson'
import { InterviewQuestion } from 'entities/InterviewQuestion'
import { WorkplaceSkill } from 'entities/WorkplaceSkill'
import { UserProgress } from 'entities/UserProgress'

export function getLessons({ jobTrack, category, level } = {}) {
  let results = Lesson.getAll()
  if (jobTrack) results = results.filter(l => l.jobTrack === jobTrack)
  if (category) results = results.filter(l => l.category === category)
  if (level) results = results.filter(l => l.level === level)
  return results
}

export function getLesson(id) {
  return Lesson.getById(id)
}

export function getDailyLesson() {
  return Lesson.getDailyLesson()
}

export function getInterviewQuestions({ category, difficulty } = {}) {
  let results = InterviewQuestion.getAll()
  if (category) results = results.filter(q => q.category === category)
  if (difficulty) results = results.filter(q => q.difficulty === difficulty)
  return results
}

export function getInterviewQuestion(id) {
  return InterviewQuestion.getById(id)
}

export function getWorkplaceSkills() {
  return WorkplaceSkill.getAll()
}

export function getUserProgress() {
  return UserProgress.get()
}

export function getLessonCategories(jobTrack) {
  return Lesson.getCategories(jobTrack)
}

export function getInterviewCategories() {
  return InterviewQuestion.getCategories()
}
