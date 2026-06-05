import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import LessonDetail from './pages/LessonDetail'
import DailyLesson from './pages/DailyLesson'
import Interview from './pages/Interview'
import JobTracks from './pages/JobTracks'
import Speaking from './pages/Speaking'
import UserNotRegisteredError from './components/ui/UserNotRegisteredError'
import { UserProgress } from 'entities/UserProgress'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'lessons', element: <Lessons /> },
      { path: 'lessons/:id', element: <LessonDetail /> },
      { path: 'daily', element: <DailyLesson /> },
      { path: 'interview', element: <Interview /> },
      { path: 'job-tracks', element: <JobTracks /> },
      { path: 'speaking', element: <Speaking /> },
    ],
  },
])

export default function App() {
  const [registered, setRegistered] = useState(() => {
    const p = UserProgress.get()
    return p.name !== 'Learner' && p.name !== ''
  })

  if (!registered) {
    return <UserNotRegisteredError onRegister={() => setRegistered(true)} />
  }

  return <RouterProvider router={router} />
}
