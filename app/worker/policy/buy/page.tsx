'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ShieldAlert } from 'lucide-react'

export default function BuyPolicy() {
  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/risk/quote?worker_id=W123&zone_id=Z-DEL-South')
      .then(async r => {
        if (!r.ok) throw new Error('Failed to fetch quote')
        return r.json()
      })
      .then(data => setQuote(data))
      .catch(e => console.error(e))
  }, [])

  const handleBuy = async () => {
    setLoading(true)
    const res = await fetch('/api/policies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        worker_id: 'W123',
        zone_id: 'Z-DEL-South',
        premium_paid: quote.weekly_premium_inr
      })
    })
    
    if (res.ok) {
      router.push('/worker?success=true')
    }
  }

  if (!quote) return <div className="p-8 text-center animate-pulse">Loading Risk Quote...</div>

  return (
    <div className="max-w-md mx-auto p-6 pt-12">
      <h1 className="text-2xl font-bold mb-2">Weekly Income Cover</h1>
      <p className="text-slate-500 mb-8">Dynamic pricing based on localized AI risk forecast.</p>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">LIVE QUOTE</div>
        
        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4 mt-2">
          <span className="text-slate-500 font-medium">Shift Risk Score</span>
          <span className="font-bold text-xl text-amber-600">{quote.risk_score} <span className="text-sm text-slate-400">/ 10</span></span>
        </div>
        
        <div className="flex items-end gap-2 mb-2">
           <span className="text-5xl font-black">₹{quote.weekly_premium_inr}</span>
           <span className="text-slate-500 mb-1">/ week</span>
        </div>
        
        <p className="text-sm text-slate-500 mb-6">Protects up to ₹{quote.max_coverage_inr} in lost earnings if extreme events hit your zone.</p>

        <ul className="space-y-3 mb-8">
           <li className="flex items-center gap-3 text-sm text-slate-700">
             <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> No physical paperwork
           </li>
           <li className="flex items-center gap-3 text-sm text-slate-700">
             <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Parametric auto-settlement
           </li>
           <li className="flex items-center gap-3 text-sm text-slate-700">
             <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Free micro-relief vouchers
           </li>
        </ul>

        <button 
          onClick={handleBuy}
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-slate-900/20 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Swipe to Pay ₹' + quote.weekly_premium_inr}
        </button>
      </div>

      <p className="text-xs text-center text-slate-400">
        By continuing, you agree to the GigShield Loss of Income parametric terms. 
      </p>
    </div>
  )
}
