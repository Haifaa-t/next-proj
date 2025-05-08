'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '@/store/userSlice'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LockIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import PageContainer from '@/components/PageContainer'
import PageTitle from '@/components/PageTitle'
import Button from '@/components/Button'
import ThemedCard from '@/components/ThemedCard'
import InputField from '@/components/InputField'
import { useTheme } from '@/context/ThemeContext'

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { theme } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === 'user@tamkeen.com' && password === '123456') {
      dispatch(login({ email }))
      toast.success('Login successful!')
      router.push('/dashboard')
    } else {
      toast.error('Invalid credentials')
    }
  }

  const background = theme === 'dark'
    ? 'bg-gray-900'
    : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500'

  return (
    <PageContainer className={background}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ThemedCard>
          <LockIcon className="w-10 h-10 mx-auto text-blue-600" />
          <PageTitle title="Login" />
          <p className="text-gray-500 dark:text-gray-300 text-center">Please login to access your dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <div className="flex justify-center">
              <Button type="submit" label="Login" />
            </div>
          </form>
        </ThemedCard>
      </motion.div>
    </PageContainer>
  )
}


