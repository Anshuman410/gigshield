"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ShieldAlert, CheckCircle, Info, FileText, Briefcase, PlusCircle } from "lucide-react";

const POLICY_PACKAGES = [
  {
    id: "pkg_basic_1m",
    title: "Basic Shield",
    company: "SecureGig Inc.",
    durationDays: 30,
    durationText: "1 Month",
    maxCoverage: 10000,
    basePremium: 1500,
    features: ["Quick approval", "Zone specific protection", "24/7 Email Support"],
    terms: "Coverage applies only for extreme weather events verified by local authorities. Payouts processed within 48 hours.",
    claimProcess: "Submit zero-touch claim via dashboard. Automatic resolution upon anomaly detection."
  },
  {
    id: "pkg_standard_3m",
    title: "Standard Protection",
    company: "SafeWorker Trust",
    durationDays: 90,
    durationText: "3 Months",
    maxCoverage: 25000,
    basePremium: 4000,
    features: ["Higher limits", "Multi-hazard protection", "Priority Phone Support"],
    terms: "Covers weather and localized health alerts. Standard deductible implies 5% of maximum coverage.",
    claimProcess: "Use dashboard for auto-claim. For manual claims, provide photo evidence."
  },
  {
    id: "pkg_pro_6m",
    title: "Pro Guard",
    company: "Reliance Safety",
    durationDays: 180,
    durationText: "6 Months",
    maxCoverage: 50000,
    basePremium: 7500,
    features: ["Comprehensive hazard", "Zero deductible", "Instant Payouts"],
    terms: "Comprehensive localized disruption coverage. Valid only if logged in within the affected zone at the time of the event.",
    claimProcess: "Zero-touch claims are immediate. VIP manual claim resolution under 12 hours."
  },
  {
    id: "pkg_annual_1y",
    title: "Annual Global",
    company: "GlobalSure Ltd.",
    durationDays: 365,
    durationText: "1 Year",
    maxCoverage: 100000,
    basePremium: 12000,
    features: ["Massive limits", "All-hazard cover", "Dedicated Agent"],
    terms: "Maximum year-round protection. Includes coverage for extreme temperature spikes alongside rain/floods.",
    claimProcess: "Dedicated agent assigned automatically. Zero-touch verified directly with meteorological data."
  },
  {
    id: "pkg_titan_3y",
    title: "Titan Long-Term",
    company: "Titan Insurance Co.",
    durationDays: 1095,
    durationText: "3 Years",
    maxCoverage: 300000,
    basePremium: 30000,
    features: ["Lifetime feeling", "Family protection add-on", "Maximum Payout Options"],
    terms: "The ultimate safety net. Prevents premium hikes across the 3 year period regardless of claim volume.",
    claimProcess: "Zero-touch priority queue. Funds instantly wired upon local disruption alert."
  }
];

export default function PoliciesPage() {
  const [zones, setZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/zones").then(r => r.json()).then(data => {
      setZones(data);
      if (data.length > 0) setSelectedZone(data[0].id);
    });
  }, []);

  const handlePurchase = async (pkg: typeof POLICY_PACKAGES[0]) => {
    if (!selectedZone) return;
    setPurchasingId(pkg.id);
    try {
      const res = await fetch("/api/policies/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zoneId: selectedZone,
          durationMonths: Math.max(1, Math.round(pkg.durationDays / 30)),
          maxCoverageAmount: pkg.maxCoverage,
          totalPremium: pkg.basePremium
        })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to purchase policy");
      }
    } finally {
      setPurchasingId(null);
    }
  };

  if (success) {
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-emerald-50 border border-emerald-200 p-12 rounded-3xl text-center shadow-sm">
          <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Purchase Successful</h2>
          <p className="text-emerald-700">Your policy package is active. Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Available Policies</h1>
        <p className="text-slate-500">Select a pre-configured policy package from our trusted partners.</p>
      </header>

      <div className="bg-white shadow-sm border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center mb-1">
            <MapPin className="w-5 h-5 mr-3 text-indigo-500" /> Primary Operating Zone
          </h3>
          <p className="text-slate-500 text-sm">Policies will be inherently tied to disruptions in this specific area.</p>
        </div>
        <select 
          value={selectedZone} 
          onChange={e => setSelectedZone(e.target.value)}
          className="w-full md:w-auto bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none min-w-[200px]"
        >
          {zones.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {POLICY_PACKAGES.map(pkg => (
          <div key={pkg.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="p-6 md:p-8 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{pkg.title}</h3>
                  <div className="flex items-center text-indigo-600 text-sm font-semibold">
                    <Briefcase className="w-4 h-4 mr-1" /> {pkg.company}
                  </div>
                </div>
                <div className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full text-sm whitespace-nowrap">
                  {pkg.durationText}
                </div>
              </div>

              <div className="flex items-center gap-4 py-4 border-y border-slate-100 my-6">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase mb-1">Coverage Limit</p>
                  <p className="text-xl font-bold text-slate-900">₹{pkg.maxCoverage.toLocaleString()}</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase mb-1">Premium</p>
                  <p className="text-xl font-bold text-emerald-600">₹{pkg.basePremium.toLocaleString()}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-600 text-sm">
                    <PlusCircle className="w-4 h-4 mr-2 text-indigo-400 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>

              {expandedId === pkg.id && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 mb-6 text-sm">
                  <div>
                    <strong className="flex items-center text-slate-800 mb-1">
                      <FileText className="w-4 h-4 mr-2" /> Terms & Conditions
                    </strong>
                    <p className="text-slate-600 leading-relaxed pl-6">{pkg.terms}</p>
                  </div>
                  <div>
                    <strong className="flex items-center text-slate-800 mb-1">
                      <Info className="w-4 h-4 mr-2" /> How to Claim
                    </strong>
                    <p className="text-slate-600 leading-relaxed pl-6">{pkg.claimProcess}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 pt-0 flex gap-3 mt-auto">
              <button 
                onClick={() => setExpandedId(expandedId === pkg.id ? null : pkg.id)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                {expandedId === pkg.id ? "Hide Details" : "View Details"}
              </button>
              <button 
                onClick={() => handlePurchase(pkg)}
                disabled={purchasingId !== null}
                className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 text-sm flex items-center justify-center"
              >
                {purchasingId === pkg.id ? "Processing..." : "Select Package"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
