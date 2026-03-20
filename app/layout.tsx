import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

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
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 flex h-screen overflow-hidden text-slate-900 dark:text-slate-50 relative selection:bg-indigo-500/30`}>
        {/* Ambient background glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[100px]" />
        </div>
        
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full relative">
          <div className="container mx-auto px-4 py-6 md:p-8 max-w-7xl h-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
