'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/userSlice'
import { RootState } from '@/store'
import { useTheme } from '@/context/ThemeContext'
import { MoonIcon, SunIcon, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import LogoutDialog from './LogoutDialog'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const { theme, toggleTheme } = useTheme()

  const [showLogout, setShowLogout] = useState(false)

  const isActive = (path: string) =>
    pathname === path
      ? 'bg-blue-100 text-blue-700 font-semibold rounded px-3 py-1'
      : 'text-gray-600 hover:text-blue-600 px-3 py-1 transition'

  const navBg = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'

  return (
    <nav className={`flex items-center justify-between px-6 py-4 shadow-md ${navBg}`}>
      <div className="flex gap-4 items-center">
        <Link href="/" className={isActive('/')}>Home</Link>

        {user?.email && (
          <>
            <Link href="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
            <Link href="/profile" className={isActive('/profile')}>Profile</Link>
          </>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm font-medium"
        >
          {theme === 'dark' ? (
            <>
              <MoonIcon className="w-4 h-4" />
              Dark
            </>
          ) : (
            <>
              <SunIcon className="w-4 h-4" />
              Light
            </>
          )}
        </button>

        {user?.email && (
          <>
            <button
              onClick={() => setShowLogout(true)}
              className="flex items-center gap-1 text-sm text-red-500 hover:underline"
            >
              <LogOutIcon className="w-4 h-4" />
              Logout
            </button>

            <LogoutDialog
              isOpen={showLogout}
              onClose={() => setShowLogout(false)}
              onConfirm={() => {
                dispatch(logout())
                setShowLogout(false)
                router.push('/login')
              }}
            />
          </>
        )}
      </div>
    </nav>
  )
}
