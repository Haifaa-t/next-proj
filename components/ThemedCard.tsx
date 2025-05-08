'use client'

import { useTheme } from '@/context/ThemeContext'

export default function ThemedCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const { theme } = useTheme()
  const style = theme === 'dark'
    ? 'bg-gray-800 text-white'
    : 'bg-white text-gray-900'

  return (
    <div className={`rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6 ${style} ${className}`}>
      {children}
    </div>
  )
}
