"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, DollarSign, ListChecks } from "lucide-react";
import Link from "next/link";

export default function RequestClaimPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user/me")
      .then(r => r.json())
      .then(d => {
        const activePolicies = d.policies?.filter((p: any) => p.status === "ACTIVE") || [];
        setPolicies(activePolicies);
        if (activePolicies.length > 0) setSelectedPolicyId(activePolicies[0].id);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/claims/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policyId: selectedPolicyId, amount, description })
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard/claims");
      } else {
        setError(data.error || "Failed to submit claim");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Request Claim</h1>
        <p className="text-slate-500">Submit a manual claim request for specialized verification.</p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        {policies.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold text-slate-700 mb-2">No Active Policies found</h3>
            <p className="text-slate-500 mb-6">You must have an active policy to file a manual claim.</p>
            <Link href="/dashboard/policies">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl">Purchase Policy</button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Active Policy</label>
              <select 
                value={selectedPolicyId} 
                onChange={(e) => setSelectedPolicyId(e.target.value)}
                className="w-full border border-slate-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
              >
                {policies.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.zone?.name || "Global"} Zone - Max Coverage: ₹{p.maxCoverage}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Claim Amount Requested (₹)</label>
              <div className="relative">
                <input 
                  type="number" 
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 5000"
                />
                <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Date & Reason for Claim</label>
              <textarea 
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-slate-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Include the date of disruption, cause, and any relevant context for manual processing..."
              />
            </div>

            {error && <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</div>}

            <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 mt-4 flex items-center justify-center">
              <ListChecks className="w-5 h-5 mr-2" />
              {loading ? "Submitting Request..." : "Submit Claim Verification"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
