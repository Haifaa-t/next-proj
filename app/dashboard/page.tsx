'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { logout } from '@/store/userSlice'
import { LogOutIcon, UserIcon, PencilIcon } from 'lucide-react'
import PageContainer from '@/components/PageContainer'
import PageTitle from '@/components/PageTitle'
import Button from '@/components/Button'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const { theme } = useTheme()

  useEffect(() => {
    if (!user || !user.email) {
      router.push('/login')
    }
  }, [user, router])

  if (!user || !user.email) return null

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'

  const background = theme === 'dark'
    ? 'bg-gray-900'
    : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500'

  const cardStyle = theme === 'dark'
    ? 'bg-gray-800 text-white'
    : 'bg-white text-gray-900'

  const imageBorder = theme === 'dark'
    ? 'border-gray-600'
    : 'border-gray-300'

  const noImageBg = theme === 'dark'
    ? 'bg-gray-700 text-gray-300'
    : 'bg-gray-200 text-gray-500'

  return (
    <PageContainer className={background}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`rounded-2xl shadow-xl p-8 w-full max-w-2xl space-y-6 ${cardStyle}`}
      >
        <PageTitle title="Dashboard" />

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className={`w-28 h-28 rounded-full object-cover border ${imageBorder} shadow-md`}
            />
          ) : (
            <div className={`w-28 h-28 rounded-full flex items-center justify-center border ${imageBorder} shadow-inner ${noImageBg}`}>
              <UserIcon className="w-10 h-10" />
            </div>
          )}

          <div className="text-center sm:text-left flex-1">
            <h2 className="text-3xl font-bold">
              Welcome, {fullName}
            </h2>
            <p className="text-sm mt-1">{user.email}</p>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end gap-4 mt-4">
          <Button
            label="Edit Profile"
            icon={<PencilIcon className="w-4 h-4" />}
            onClick={() => router.push('/profile')}
            variant="secondary"
          />
        
        </div>
      </motion.div>
    </PageContainer>
  )
}

