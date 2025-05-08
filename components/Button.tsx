'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: React.ReactNode
}

export default function Button({ label, icon, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-50"
    >
      {icon}
      {label}
    </button>
  )
}
