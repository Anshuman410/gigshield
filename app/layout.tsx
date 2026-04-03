import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GigShield',
  description: 'AI Risk Forecast and Income Drop Protection for Gig Workers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} bg-slate-950 text-slate-50 relative selection:bg-indigo-500/30`}>
        {children}
      </body>
    </html>
  )
}
