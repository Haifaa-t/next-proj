'use client'

import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { useTheme } from '@/context/ThemeContext'

export default function Home() {
  const { theme } = useTheme()

  const background = theme === 'dark'
    ? 'bg-gray-900'
    : 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500'

  const headingColor = theme === 'dark' ? 'text-white' : 'text-white'
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-white text-opacity-90'

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center px-6 ${background}`}>
      <div className="text-center space-y-6 max-w-2xl">
       
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl sm:text-6xl font-extrabold tracking-tight flex justify-center items-center gap-3 drop-shadow-xl ${headingColor}`}
        >
         
          Welcome to the System
        </motion.h1>

       
        <p className={`text-lg sm:text-xl ${textColor}`}>
          View, edit your profile.
        </p>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center"
        >
          <Button
            label="Login to Explore"
            onClick={() => window.location.href = '/dashboard'}
          />
        </motion.div>
      </div>
    </main>
  )
}
