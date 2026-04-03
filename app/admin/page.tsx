"use client";

import { useState, useEffect } from "react";
import { Activity, LayoutDashboard, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/zones").then(r => r.json()).then(data => setZones(data));
  }, []);

  const simulateTrigger = async (zoneId: string, eventType: string, severity: number) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/simulate-trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zoneId, eventType, severity })
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (e) {
      setMessage("Simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    document.cookie = "admin_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 pb-6 border-b border-slate-200">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="p-3 bg-white rounded-xl border border-slate-200 mr-4 shadow-sm">
              <LayoutDashboard className="w-8 h-8 text-slate-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Admin Dashboard</h1>
              <p className="text-slate-500 text-sm">Monitor zones and simulate disruption events.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <button className="bg-white border border-slate-200 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-medium transition-colors text-slate-700">
                Back to Home
              </button>
            </Link>
            <button onClick={handleLogout} className="bg-rose-50 border border-rose-200 hover:bg-rose-100 px-5 py-2.5 rounded-xl font-medium transition-colors text-rose-700">
              Logout
            </button>
          </div>
        </header>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold flex items-center mb-4 text-slate-900">
            <Activity className="w-6 h-6 mr-3 text-indigo-600" />
            Disruption Simulator
          </h2>
          <p className="text-slate-500 mb-8 max-w-3xl leading-relaxed">
            Execute mock environmental anomalies across listed zones. This triggers the Zero-Touch resolution algorithm, automatically verifying and approving claims for workers with active policies in that area.
          </p>

          {message && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl mb-8 font-medium text-sm">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {zones.map(z => (
              <div key={z.id} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-300 transition-colors">
                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 flex justify-between items-start">
                    {z.name}
                    <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded font-semibold">Score: {z.historicalSafetyScore}</span>
                  </h3>
                  <p className="text-slate-500 text-sm">City: {z.city}</p>
                </div>
                <button 
                  disabled={loading}
                  onClick={() => simulateTrigger(z.id, "EXTREME_WEATHER", 0.9)}
                  className="w-full bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-indigo-700 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center disabled:opacity-50"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" /> Simulate Heavy Rain
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
