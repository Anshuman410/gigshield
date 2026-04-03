"use client";

import { useEffect, useState } from "react";
import { Shield, Activity, HandHeart, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/user/me")
      .then(r => r.json())
      .then(d => setUser(d));
  }, []);

  if (!user) return <div className="text-indigo-600 font-semibold animate-pulse">Loading dashboard...</div>;

  const activePolicies = user.policies?.filter((p: any) => p.status === "ACTIVE") || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, {user.name} 👋
        </h1>
        <p className="text-slate-500">Here's your income protection overview for today.</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border text-center border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="inline-flex p-3 bg-emerald-50 rounded-xl mb-4">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-slate-500 font-medium mb-1">Active Policies</p>
          <p className="text-4xl font-bold text-slate-900">{activePolicies.length}</p>
        </div>

        <div className="bg-white border text-center border-slate-200 p-6 rounded-2xl shadow-sm">
          <div className="inline-flex p-3 bg-blue-50 rounded-xl mb-4">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-slate-500 font-medium mb-1">Total Claims</p>
          <p className="text-4xl font-bold text-slate-900">{user.claims?.length || 0}</p>
        </div>

        <Link href="/dashboard/policies" className="group">
          <div className="h-full bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center text-white hover:shadow-lg transition-all">
            <HandHeart className="w-10 h-10 mb-3 opacity-90 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-1">Explore Policies</h3>
            <p className="text-indigo-100 text-sm">Get dynamic AI coverage</p>
          </div>
        </Link>
      </div>

      {activePolicies.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <ShieldCheck className="w-6 h-6 mr-3 text-indigo-600" /> Your Active Policies
          </h2>
          <div className="space-y-4">
            {activePolicies.map((policy: any) => (
              <div key={policy.id} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                      Active
                    </span>
                    <span className="text-slate-400 text-xs font-mono">ID: {policy.id.substring(0,8)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{policy.zone?.name || "Global Zone"}</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Valid till: <span className="font-semibold text-slate-700">{new Date(policy.endDate).toLocaleDateString()}</span>
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">Coverage Limit</p>
                  <p className="text-2xl font-bold text-indigo-600">₹{policy.maxCoverage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
