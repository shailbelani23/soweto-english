import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Home, BookOpen, Briefcase, Mic, Layers } from 'lucide-react'
import LanguageSelector from '@/components/ui/LanguageSelector'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/lessons', icon: BookOpen, label: 'Lessons' },
  { to: '/interview', icon: Briefcase, label: 'Interview' },
  { to: '/speaking', icon: Mic, label: 'Speaking' },
  { to: '/job-tracks', icon: Layers, label: 'Tracks' },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 max-w-lg mx-auto relative">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">SE</span>
          </div>
          <span className="font-bold text-gray-900 text-sm">SowetoEnglish</span>
        </div>
        <LanguageSelector />
      </header>

      {/* Page content */}
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-gray-100 flex z-30">
        {NAV.map(({ to, icon: Icon, label }) => {
          const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5"
            >
              <Icon
                size={20}
                className={cn(active ? 'text-brand-600' : 'text-gray-400')}
                strokeWidth={active ? 2.5 : 1.5}
              />
              <span className={cn('text-[10px] font-medium', active ? 'text-brand-600' : 'text-gray-400')}>
                {label}
              </span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
