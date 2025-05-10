'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UserIcon, PencilIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import PageTitle from '@/components/PageTitle'
import { useTheme } from '@/context/ThemeContext'
import Link from 'next/link'

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
    <PageContainer className={theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500'}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6 text-center 
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      >
        <PageTitle title="Dashboard Overview" />

        <div className="flex flex-col items-center gap-4">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 shadow-inner">
              <UserIcon className="w-8 h-8" />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Link href="/profile">
            <Button label="Edit Profile" icon={<PencilIcon className="w-4 h-4" />} />
          </Link>
        </div>
      </motion.div>
    </PageContainer>
  )
}
