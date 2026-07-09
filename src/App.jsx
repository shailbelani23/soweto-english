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
import Simulator from './pages/Simulator'
import SimulatorPlay from './pages/SimulatorPlay'
import Certificate from './pages/Certificate'
import UserNotRegisteredError from './components/ui/UserNotRegisteredError'
import { LanguageProvider } from './i18n/LanguageContext'
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
      { path: 'simulator', element: <Simulator /> },
      { path: 'simulator/:simId', element: <SimulatorPlay /> },
      { path: 'certificate', element: <Certificate /> },
    ],
  },
])

export default function App() {
  const [registered, setRegistered] = useState(() => {
    const p = UserProgress.get()
    return p.name !== 'Learner' && p.name !== ''
  })

  return (
    <LanguageProvider>
      {registered ? (
        <RouterProvider router={router} />
      ) : (
        <UserNotRegisteredError onRegister={() => setRegistered(true)} />
      )}
    </LanguageProvider>
  )
}
