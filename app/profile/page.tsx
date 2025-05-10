'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'
import { updateProfile } from '@/store/userSlice'
import { motion } from 'framer-motion'
import { UserCogIcon, SaveIcon, ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import PageTitle from '@/components/PageTitle'
import Button from '@/components/Button'
import ThemedCard from '@/components/ThemedCard'
import { useTheme } from '@/context/ThemeContext'

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const { theme } = useTheme()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  useEffect(() => {
    if (!user || !user.email) {
      router.push('/login')
    } else {
      setFirstName(user.firstName || '')
      setLastName(user.lastName || '')
      setProfilePicture(user.profilePicture || '')
    }
  }, [user, router])

  if (!user || !user.email) return null

  const handleSave = () => {
    dispatch(updateProfile({ firstName, lastName, profilePicture }))
    toast.success('Profile updated!')
  }

  const noImageStyle = theme === 'dark'
    ? 'bg-gray-700 text-gray-300 border-gray-600'
    : 'bg-gray-200 text-gray-500 border-gray-300'

  return (
    <PageContainer className={theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500'}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ThemedCard>
          <UserCogIcon className="w-10 h-10 mx-auto text-blue-600" />
          <PageTitle title="Your Profile" />
          <p className="text-gray-500 dark:text-gray-300 text-center">Update your personal information</p>

          <div className="flex justify-center">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-inner ${noImageStyle}`}>
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="space-y-4 text-left">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Profile Picture URL</label>
              <input
                type="text"
                value={profilePicture}
                onChange={e => setProfilePicture(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              label="Save"
              icon={<SaveIcon className="w-5 h-5" />}
              onClick={handleSave}
            />
          </div>

          <Link
            href="/dashboard"
            className="block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline text-center"
          >
            ← Back to Dashboard
          </Link>
        </ThemedCard>
      </motion.div>
    </PageContainer>
  )
}
