'use client'
import { ReceiptText, HelpCircle, CheckCircle } from 'lucide-react'

export default function ClaimsHistory() {
  
  // Hardcoded mock data for the demo of "Why I Got Paid"
  const history = [
    {
      id: "SET-8821",
      date: "March 18, 2026",
      type: "End-of-Week Settlement",
      amount: "₹1,320",
      status: "APPROVED",
      math: {
        expected: "₹3,420 (40 hrs @ ₹85.5/hr)",
        actual: "₹2,100",
        drop: "38.5%",
      }
    }
  ]

  return (
    <div className="max-w-md mx-auto relative pt-8 pb-20 p-6 bg-slate-50 min-h-screen text-slate-800">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Claim History</h1>
        <p className="text-sm text-slate-500">Transparent breakdowns of your payouts.</p>
      </header>

      <div className="space-y-4">
        {history.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h3 className="font-bold text-slate-800">{item.type}</h3>
                 <p className="text-xs text-slate-500">{item.date}</p>
               </div>
               <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs flex items-center gap-1">
                 <CheckCircle className="w-3 h-3" /> {item.status}
               </span>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
               <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-1">
                 <HelpCircle className="w-4 h-4" /> Why I got paid
               </h4>
               
               <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                    <span className="text-slate-500">Expected Earnings</span>
                    <span className="font-medium">{item.math.expected}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-slate-500">Actual Earnings</span>
                    <span className="font-medium text-red-500">{item.math.actual}</span>
                 </div>
                 <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                    <span className="font-bold text-slate-700">Earnings Drop</span>
                    <span className="font-bold text-slate-900">{item.math.drop}</span>
                 </div>
               </div>
            </div>

            <div className="flex justify-between items-end">
               <span className="text-xs text-slate-400 font-mono">ID: {item.id}</span>
               <div className="text-right">
                  <span className="text-xs text-slate-500">Payout</span>
                  <p className="text-2xl font-black text-emerald-600">{item.amount}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
