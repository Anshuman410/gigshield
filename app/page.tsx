import Link from 'next/link'
import { ShieldCheck, ArrowRight, User, LayoutDashboard } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20 pointer-events-none">
         <div className="w-full max-w-3xl h-64 bg-gradient-to-tr from-indigo-500 to-emerald-400 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-4 animate-fade-in-up">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          DEVTrails 2026 Submission
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          AI Risk Forecast & <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-400">
            Income Protection
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          GigShield empowers gig workers with localized risk intelligence and instant micro-coverage against income drops caused by severe disruptions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto px-4">
        {/* Worker App Card */}
        <Link href="/worker" className="group relative rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20 active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 opacity-80 transition-opacity group-hover:opacity-100" />
          <div className="relative h-full bg-white dark:bg-slate-900 rounded-[22px] p-8 flex flex-col items-start gap-4 transition-colors group-hover:bg-opacity-95 dark:group-hover:bg-opacity-95 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Worker App</h2>
            <p className="text-slate-500 dark:text-slate-400 flex-1">
              Simulate ravi's phone. View zone risk scores, buy weekly policies, and trigger micro-relief claims.
            </p>
            <div className="mt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-3 transition-all">
              Launch Prototype <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </Link>

        {/* Admin Dashboard Card */}
        <Link href="/admin" className="group relative rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-slate-500/20 active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 opacity-80 transition-opacity group-hover:opacity-100" />
          <div className="relative h-full bg-white dark:bg-slate-900 rounded-[22px] p-8 flex flex-col items-start gap-4 transition-colors group-hover:bg-opacity-95 dark:group-hover:bg-opacity-95 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 mb-2">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
            <p className="text-slate-500 dark:text-slate-400 flex-1">
              View platform analytics, live active policies, trigger zone disruption events, and review claims.
            </p>
            <div className="mt-4 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold group-hover:gap-3 transition-all">
              Enter Dashboard <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
