import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Home, BookOpen, Briefcase, Gamepad2, Layers } from 'lucide-react'
import LanguageSelector from '@/components/ui/LanguageSelector'
import { useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

const NAV = [
  { to: '/', icon: Home, key: 'nav.home' },
  { to: '/simulator', icon: Gamepad2, key: 'nav.simulator' },
  { to: '/lessons', icon: BookOpen, key: 'nav.lessons' },
  { to: '/interview', icon: Briefcase, key: 'nav.interview' },
  { to: '/job-tracks', icon: Layers, key: 'nav.tracks' },
]

export default function Layout() {
  const location = useLocation()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#f3f6f3] max-w-lg mx-auto relative">
      {/* Top bar — flat near-black with a solid green rule */}
      <header className="bg-ink-900 border-b-4 border-brand-500 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-ink-950 text-sm font-black">R4</span>
          </div>
          <div>
            <span className="font-extrabold text-white text-sm tracking-tight">{t('app.name')}</span>
            <p className="text-[10px] text-brand-300 font-medium leading-tight">{t('app.tagline')}</p>
          </div>
        </div>
        <LanguageSelector variant="dark" />
      </header>

      {/* Page content */}
      <main className="min-h-[calc(100vh-124px)]">
        <Outlet />
      </main>

      {/* Bottom nav — flat dark, solid green top bar marks the active tab */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-ink-900 border-t-4 border-ink-950 flex z-30 pb-[env(safe-area-inset-bottom)]">
        {NAV.map(({ to, icon: Icon, key }) => {
          const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-3 gap-1 border-t-4 -mt-1',
                active ? 'border-brand-500' : 'border-transparent'
              )}
            >
              <Icon
                size={21}
                className={cn(active ? 'text-brand-400' : 'text-white/40')}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span
                className={cn(
                  'text-[11px] font-bold leading-none uppercase tracking-wide',
                  active ? 'text-brand-300' : 'text-white/40'
                )}
              >
                {t(key)}
              </span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
