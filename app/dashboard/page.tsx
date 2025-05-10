'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UserIcon, PencilIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import PageTitle from '@/components/PageTitle'
import PageContainer from '@/components/PageContainer'
import { useTheme } from '@/context/ThemeContext'

export default function DashboardPage() {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user.user)
  const { theme } = useTheme()

  useEffect(() => {
    if (!user || !user.email) {
      router.push('/login')
    }
  }, [user, router])

  if (!user || !user.email) return null

  return (
    <main className={`min-h-screen flex items-center justify-center px-4 
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500'}`}>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-gray-500 border-4 border-gray-300 dark:border-gray-600 shadow-inner bg-gray-200 dark:bg-gray-700">
              <UserIcon className="w-8 h-8" />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Welcome back, {user.firstName || 'User'} {user.lastName || ''}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            label="Edit Profile"
            icon={<PencilIcon className="w-4 h-4" />}
            onClick={() => router.push('/profile')}
          />
        </div>
      </motion.div>
    </main>
  )
}

