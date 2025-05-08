'use client'
import { useTheme } from '@/context/ThemeContext'

export default function PageTitle({ title }: { title: string }) {
  const { theme } = useTheme()
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800'

  return (
    <h1 className={`text-3xl font-bold text-center ${textColor}`}>
      {title}
    </h1>
  )
}
