import './globals.css'
import Providers from './providers'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/context/ThemeContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <ThemeProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
