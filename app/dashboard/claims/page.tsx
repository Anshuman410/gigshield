"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock } from "lucide-react";

export default function ClaimsPage() {
  const [user, setUser] = useState<any>(null);

  const fetchUser = () => {
    fetch("/api/user/me").then(r => r.json()).then(d => setUser(d));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <div className="text-indigo-500 font-semibold animate-pulse">Loading claims...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Claim History</h1>
          <p className="text-slate-500">Track the status of your reported disruptions.</p>
        </div>
        <button onClick={fetchUser} className="text-indigo-600 font-medium hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors border border-indigo-200">
          Refresh
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {user.claims?.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl text-center">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700">No active claims</h3>
          </div>
        ) : (
          user.claims?.map((claim: any) => (
            <div 
              key={claim.id} 
              className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 font-semibold text-xs rounded-full border ${claim.status === 'APPROVED' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                    {claim.status}
                  </span>
                  <span className="text-slate-400 text-xs font-mono">Claim ID: {claim.id.substring(0,8)}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{claim.description || "System Identified Disruption"}</h3>
                <p className="text-slate-500 text-sm mt-2 flex items-center">
                  <Clock className="w-4 h-4 text-slate-400 mr-2" />
                  Filed on: {new Date(claim.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="md:text-right bg-slate-50 p-4 rounded-xl border border-slate-200 self-start md:self-auto min-w-[150px]">
                <p className="text-slate-500 text-xs font-semibold uppercase mb-1">Claim Amount</p>
                <p className="text-3xl font-bold text-slate-900">₹{claim.amount}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
