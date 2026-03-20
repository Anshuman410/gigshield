'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Info } from 'lucide-react'

export default function ClaimRelief() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const router = useRouter()

  const handleClaim = async () => {
    setLoading(true)
    // Simulate GPS fetch
    const simulatedGps = { lat: 28.5355, lng: 77.2410 } // South Delhi mock
    
    // In a real app we fetch active policy details. Hardcoding for MVP demo.
    const res = await fetch('/api/claims/micro-relief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        worker_id: 'W123',
        policy_id: 'POL-MOCK-123', 
        trigger_id: 'ACTIVE-EVENT',
        gps: simulatedGps
      })
    })

    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-6 pt-12">
      <h1 className="text-2xl font-bold mb-2 text-rose-600">Active Disruption!</h1>
      <p className="text-slate-500 mb-8">Claim instant relief during this extreme event.</p>

      {!result ? (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center">
          <div className="bg-rose-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Location Verified</h2>
          <p className="text-sm text-slate-500 mb-6">You are currently active in the South Delhi severe weather zone.</p>
          
          <div className="bg-slate-50 rounded-xl p-4 text-left mb-6 text-xs text-slate-500 flex gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p>Your platform activity and GPS are automatically verified by GigShield AI to process this claim instantly.</p>
          </div>

          <button 
            onClick={handleClaim}
            disabled={loading}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-rose-500/20 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Request Micro-Relief Voucher'}
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 text-center">
          {result.status === 'APPROVED' ? (
            <>
              <h2 className="text-2xl font-bold text-emerald-700 mb-2">Approved!</h2>
              <p className="text-emerald-600 mb-6">Here is your hot chai & shelter voucher.</p>
              
              <div className="bg-white p-4 rounded-xl inline-block shadow-sm mb-4">
                {/* Mock QR code visual */}
                <div className="w-40 h-40 bg-slate-900 mb-2 p-2">
                   <div className="w-full h-full border-4 border-dashed border-white"></div>
                </div>
                <p className="font-mono font-bold text-slate-800 tracking-wider">{result.code}</p>
              </div>
              <button onClick={() => router.push('/worker')} className="mt-4 text-emerald-700 font-semibold underline">Return Home</button>
            </>
          ) : (
            <div className="bg-red-50 text-red-700 p-6 rounded-3xl border border-red-200">
               <h2 className="text-xl font-bold mb-2">Claim {result.status}</h2>
               <p>Reason: {result.reason}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
