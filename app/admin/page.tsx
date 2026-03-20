'use client'
import { useState, useEffect } from 'react'
import { Activity, MapPin, AlertTriangle, ShieldCheck } from 'lucide-react'

export default function AdminOverview() {
  const [triggers, setTriggers] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/triggers')
      .then(res => res.json())
      .then(data => setTriggers(data))
  }, [])

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Insurer Control Center</h1>
        <p className="text-slate-500 mt-1">Real-time GigShield Portfolio & Risk Monitoring</p>
      </header>

      {/* High-level Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase">Active Policies</h3>
            <p className="text-3xl font-black mt-2">1,204</p>
            <span className="text-xs text-emerald-500 font-bold">+12% this week</span>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase">Weekly Premiums</h3>
            <p className="text-3xl font-black mt-2 text-indigo-600">₹42,140</p>
            <span className="text-xs text-slate-400 font-bold">Avg ₹35/worker</span>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase">YTD Loss Ratio</h3>
            <p className="text-3xl font-black mt-2 text-rose-500">42%</p>
            <span className="text-xs text-rose-500 font-bold">Target &lt; 65%</span>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase">Fraud Denials</h3>
            <p className="text-3xl font-black mt-2">118</p>
            <span className="text-xs text-emerald-500 font-bold">₹14k saved</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Zone Risk Map (Mock) */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
             <h3 className="font-bold flex items-center gap-2 text-slate-800"><MapPin className="w-5 h-5 text-indigo-500" /> AI ZoneHeatMap (Delhi)</h3>
           </div>
           
           <div className="aspect-video bg-slate-900 relative p-6">
              {/* Fake Map visualization */}
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-emerald-500/30 rounded-full border border-emerald-500/50 flex items-center justify-center">
                 <span className="text-emerald-300 text-xs font-bold uppercase">North</span>
              </div>
              <div className="absolute bottom-1/4 right-[40%] w-48 h-48 bg-rose-500/40 rounded-full border border-rose-500 animate-pulse flex items-center justify-center flex-col">
                 <AlertTriangle className="text-rose-200 w-6 h-6 mb-1" />
                 <span className="text-rose-100 text-xs font-bold uppercase">South Delhi (Elevated)</span>
              </div>
           </div>
        </div>

        {/* Active Triggers Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
           <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
             <h3 className="font-bold flex items-center gap-2 text-slate-800"><Activity className="w-5 h-5 text-rose-500" /> Live Environment</h3>
           </div>
           
           <div className="p-4 space-y-3">
             {triggers.length === 0 && <p className="text-slate-400 text-sm italic p-4 text-center">No active systemic triggers.</p>}
             {triggers.map(t => (
               <div key={t.id} className="bg-rose-50 p-3 rounded-lg border border-rose-200 relative overflow-hidden">
                 <div className="absolute top-0 right-0 bottom-0 w-2 bg-rose-500"></div>
                 <p className="text-xs text-slate-500 font-mono mb-1">{new Date(t.timestamp).toLocaleTimeString()}</p>
                 <p className="font-bold text-rose-900">{t.eventType}</p>
                 <p className="text-sm text-rose-700">Severity: {t.severity} | Zone: {t.zoneId}</p>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  )
}
