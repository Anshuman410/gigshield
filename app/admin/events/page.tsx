'use client'
import { useState } from 'react'
import { CloudLightning, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TriggerSimulator() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleInject = async (type: string, severity: number) => {
    setLoading(true)
    const res = await fetch('/api/triggers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zone_id: 'Z-DEL-South',
        event_type: type,
        severity: severity
      })
    })

    if(res.ok) {
        setSuccess('Successfully injected ' + type + ' to South Delhi.')
        setTimeout(() => { setSuccess(''); router.push('/admin'); }, 2000)
    }
  }

  const runSettlement = async () => {
    setLoading(true)
    const res = await fetch('/api/settlements/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ worker_id: 'W123', policy_id: 'POL-MOCK-123' })
    })
    
    if(res.ok) {
        setSuccess('Settlement batch completed. Worker history updated.')
        setTimeout(() => { setSuccess('') }, 3000)
        setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto h-full">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">System Simulator</h1>
        <p className="text-slate-500 mt-1">Inject weather/AQI events or run chron jobs for MVP Demo.</p>
      </header>
      
      {success && <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl mb-6 font-bold">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Trigger Injection */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4"><CloudLightning className="text-indigo-500" /> Inject Real-time Trigger</h2>
          <p className="text-sm text-slate-500 mb-6">Spoof API payloads from OpenWeather or AQI India to trigger micro-relief flows automatically.</p>
          
          <div className="space-y-4">
             <button disabled={loading} onClick={() => handleInject('AQI_SEVERE', 480)} className="w-full bg-slate-100 hover:bg-slate-200 p-4 rounded-xl text-left border border-slate-300 transition relative overflow-hidden group">
                <div className="absolute right-0 top-0 bottom-0 bg-red-500 w-2 group-hover:w-4 transition-all"></div>
                <h3 className="font-bold text-slate-900">Severe AQI Incident</h3>
                <p className="text-sm text-slate-500">AQI &gt; 450 (South Delhi)</p>
             </button>

             <button disabled={loading} onClick={() => handleInject('RAIN_HEAVY', 65)} className="w-full bg-slate-100 hover:bg-slate-200 p-4 rounded-xl text-left border border-slate-300 transition relative overflow-hidden group">
                <div className="absolute right-0 top-0 bottom-0 bg-blue-500 w-2 group-hover:w-4 transition-all"></div>
                <h3 className="font-bold text-slate-900">Heavy Rainfall Incident</h3>
                <p className="text-sm text-slate-500">Flood Warning Level 2</p>
             </button>
          </div>
        </div>

        {/* Settlement Chron execution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-bold flex items-center gap-2 mb-4"><Zap className="text-emerald-500" /> Fast-Forward Sunday Settlement</h2>
           <p className="text-sm text-slate-500 mb-6">Manually trigger the end-of-week settlement cron job. The system will compare the active week earnings against the 4-week historical ledger.</p>
           
           <button disabled={loading} onClick={runSettlement} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-4 rounded-xl shadow-lg transition">
              Run Settlement Batch
           </button>
        </div>
      </div>
    </div>
  )
}
