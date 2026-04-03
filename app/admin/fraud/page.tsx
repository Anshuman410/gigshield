'use client'
import { useState, useEffect } from 'react'
import { ShieldAlert, CheckCircle, Clock } from 'lucide-react'

export default function FraudFeed() {
  // In a full implementation we would fetch this from /api/admin/claims
  // Implemented with static mock data structurally mirroring our Prisma schema for MVP demo.
  const [claims, setClaims] = useState<any[]>([
    {
      id: "CLM-9912",
      workerName: "Ravi Kumar",
      type: "MICRO-RELIEF",
      amount: "₹50 (Voucher)",
      status: "APPROVED",
      fraudScore: 0,
      timestamp: new Date().toISOString()
    },
    {
      id: "CLM-9915",
      workerName: "Amit Singh",
      type: "SETTLEMENT",
      amount: "₹1,800",
      status: "REJECTED",
      fraudScore: 100,
      reason: "Activity Proof Mismatch",
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: "CLM-9917",
      workerName: "Suresh P",
      type: "MICRO-RELIEF",
      amount: "₹50",
      status: "PENDING",
      fraudScore: 40,
      reason: "Zone Location Mismatch (GPS Edge)",
      timestamp: new Date(Date.now() - 7200000).toISOString()
    }
  ])

  return (
    <div className="p-8 max-w-5xl mx-auto h-full">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <ShieldAlert className="text-rose-500 w-8 h-8"/> 
          Fraud & Adjudication Engine
        </h1>
        <p className="text-slate-500 mt-1">Review flagged anomalies and monitor automated parametric decisions.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
              <th className="p-4">Claim ID</th>
              <th className="p-4">Worker</th>
              <th className="p-4">Type</th>
              <th className="p-4">Fraud Score</th>
              <th className="p-4">Decision</th>
            </tr>
          </thead>
          <tbody>
            {claims.map(claim => (
              <tr key={claim.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                <td className="p-4 font-mono text-xs text-slate-500">{claim.id}</td>
                <td className="p-4 font-bold text-slate-800">{claim.workerName}</td>
                <td className="p-4 text-sm text-slate-600">{claim.type} <span className="block text-xs text-slate-400">{claim.amount}</span></td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div 
                         className={`h-full ${claim.fraudScore > 69 ? 'bg-red-500' : claim.fraudScore > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                         style={{ width: `${claim.fraudScore}%`}}>
                       </div>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{claim.fraudScore}/100</span>
                  </div>
                  {claim.reason && <p className="text-xs text-red-500 mt-1 max-w-[200px] truncate">{claim.reason}</p>}
                </td>
                <td className="p-4">
                  {claim.status === 'APPROVED' && <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded font-bold flex items-center w-max gap-1 block"><CheckCircle className="w-3 h-3"/> APPROVED</span>}
                  {claim.status === 'REJECTED' && <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold flex items-center w-max gap-1 block">REJECTED</span>}
                  {claim.status === 'PENDING' && (
                     <div className="flex gap-2">
                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded font-bold flex items-center gap-1"><Clock className="w-3 h-3"/> REVIEW</span>
                        <button className="text-xs bg-slate-900 text-white px-3 py-1 rounded">Approve</button>
                     </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
