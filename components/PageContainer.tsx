'use client'

export default function PageContainer({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <main className={`min-h-screen flex items-center justify-center px-4 py-12 ${className}`}>
      {children}
    </main>
  )
}

