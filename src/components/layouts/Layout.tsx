import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'
import { Home, BarChart3, Users, LogOut, Menu } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/patients', label: 'Patients', icon: Users },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div className="h-screen w-full bg-surface flex overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-light border-r border-border
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 h-screen flex flex-col`}
      >
        {/* Logo */}
        <div className="px-5 py-4 border-b border-border">
          <h1 className="text-base font-semibold text-text-primary tracking-tight">
            RAGA <span className="text-primary">Health</span>
          </h1>
          <p className="text-xs text-text-secondary mt-1 truncate">
            {user?.email}
          </p>
        </div>

        {/* Nav (scrollable) */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition
                  ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                  }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout (fixed bottom) */}
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-surface-elevated hover:text-text-primary transition"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar (mobile) */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-surface-light">
          <h1 className="text-sm font-semibold text-text-primary">
            RAGA Health
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-text-secondary hover:text-text-primary transition"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Content (scrollable ONLY here) */}
        <main className="flex-1 px-4 md:px-6 py-5 md:py-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}