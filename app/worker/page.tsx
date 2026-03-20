'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CloudRain, AlertTriangle, ShieldCheck, ArrowRight, ShieldAlert, Zap } from 'lucide-react'

export default function WorkerHome() {
  const [quote, setQuote] = useState<any>(null)
  const [policy, setPolicy] = useState<any>(null)

  useEffect(() => {
    // Check local active policy and risk score
    fetch('/api/risk/quote?worker_id=W123&zone_id=Z-DEL-South')
      .then(async r => {
        if (!r.ok) throw new Error('Failed to fetch quote')
        return r.json()
      })
      .then(data => setQuote(data))
      .catch(e => console.error(e))

    fetch('/api/policies?worker_id=W123')
      .then(async r => {
        if (!r.ok) throw new Error('Failed to fetch policies')
        return r.json()
      })
      .then(data => setPolicy(data.hasPolicy ? data.policy : null))
      .catch(e => console.error(e))
  }, [])

  return (
    <div className="max-w-md mx-auto relative pt-8 pb-24 px-6 bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-6rem)] md:min-h-screen text-slate-800 dark:text-slate-100 md:border-x border-slate-200 dark:border-slate-800/50 shadow-2xl xl:rounded-3xl xl:my-6 xl:min-h-[90vh] overflow-hidden">
      {/* Subtle background glow for the mobile view */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full -z-10" />

      <header className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h2 className="text-xs font-bold text-indigo-500 tracking-widest uppercase mb-1">Worker Dashboard</h2>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Hello, Ravi</h1>
        </div>
        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20">
          <img src="https://i.pravatar.cc/150?u=ravi" alt="Ravi" className="w-full h-full rounded-[14px] object-cover bg-white" />
        </div>
      </header>

      {/* Active System Alert (Fake) */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-8 flex gap-4 shadow-sm backdrop-blur-md relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1 h-full bg-red-500" />
        <div className="bg-red-500/20 p-2 rounded-xl h-fit">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 shrink-0" />
        </div>
        <div>
          <p className="font-bold text-red-900 dark:text-red-400">Severe AQI Alert</p>
          <p className="text-sm text-red-800/80 dark:text-red-300/80 mt-1 leading-relaxed">Your zone is experiencing extreme pollution. Expect high drops in order volumes today. Cover up and stay hydrated.</p>
        </div>
      </div>

      {/* AI Shift Risk Score */}
      <div className="relative group rounded-3xl p-[1px] mb-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-slate-800 rounded-3xl opacity-50 dark:opacity-100" />
        <div className="relative bg-white dark:bg-slate-900 rounded-[23px] p-6 backdrop-blur-xl h-full">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-5 flex items-center gap-2">
            <div className="bg-indigo-500/10 p-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-indigo-500" /> 
            </div>
            AI Risk Forecast (South Delhi)
          </h3>
          {quote ? (
            <div className="flex gap-6 items-center">
              <div className="flex-1">
                <div className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {quote.risk_score}<span className="text-2xl text-slate-400 dark:text-slate-600 font-medium">/10</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{quote.advice}</p>
              </div>
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-rose-600 flex items-center justify-center text-white font-black text-lg shadow-[0_0_30px_rgba(244,63,94,0.4)] border-4 border-white/10">
               HIGH
              </div>
            </div>
          ) : (
            <div className="animate-pulse flex gap-6 items-center">
              <div className="flex-1 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl" />
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800" />
            </div>
          )}
        </div>
      </div>

      {/* Weekly Policy Status */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 px-2">Income Protection</h3>
        
        {policy ? (
          <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl shadow-emerald-500/20 group">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-800" />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
             
             <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <span className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-50">Active Policy</span>
                  <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                    <ShieldCheck className="w-6 h-6 text-emerald-100" />
                  </div>
               </div>
               <p className="text-emerald-100/80 text-sm font-medium mb-1">Covered up to</p>
               <h2 className="text-5xl font-black tracking-tight drop-shadow-sm">₹2,000</h2>
               
               <div className="mt-8 pt-5 border-t border-emerald-400/30 flex justify-between items-center">
                 <div>
                    <p className="text-xs text-emerald-200/70 font-medium mb-1">Valid until</p>
                    <p className="font-bold tracking-wide">{new Date(policy.endDate).toLocaleDateString()}</p>
                 </div>
                 <Link href="/worker/claims" className="bg-white text-teal-900 hover:bg-emerald-50 px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg">
                   View Claims
                 </Link>
               </div>
             </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center shadow-sm backdrop-blur-sm">
             <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
               <ShieldAlert className="w-8 h-8 text-slate-400 dark:text-slate-500" />
             </div>
             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">You are uninsured!</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6 max-w-[250px] mx-auto">You have no loss-of-income coverage for this shift.</p>
             <Link href="/worker/policy/buy" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition shadow-xl shadow-indigo-500/30 w-full group">
                Get Weekly Cover <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        )}
      </div>

      {/* Claim Micro-Relief Button (floating action style demo) */}
      {policy && (
         <div className="fixed bottom-6 w-full max-w-md left-1/2 -translate-x-1/2 px-6 z-50">
           <Link href="/worker/claims/new" className="relative group block w-full">
             <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
             <div className="relative bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-3 transition overflow-hidden">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
               <CloudRain className="w-5 h-5 relative z-10" /> 
               <span className="relative z-10">Trigger Micro-Relief Claim</span>
             </div>
           </Link>
         </div>
      )}

    </div>
  )
}
