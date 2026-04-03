"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShieldAlert, CheckSquare, LogOut, Loader2, ShieldCheck, FileText } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  useEffect(() => {
    fetch("/api/user/me")
      .then(res => res.json())
      .then(data => {
        if (data.error) router.push("/login");
        else setUser(data);
      });
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-900">GigShield</h1>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl bg-indigo-50 text-indigo-700">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Overview
          </Link>
          <Link href="/dashboard/policies" className="flex items-center px-4 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <ShieldAlert className="w-5 h-5 mr-3" /> Policies
          </Link>
          <Link href="/dashboard/claims" className="flex items-center px-4 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <CheckSquare className="w-5 h-5 mr-3" /> Claims History
          </Link>
          <Link href="/dashboard/request-claim" className="flex items-center px-4 py-3 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <FileText className="w-5 h-5 mr-3" /> Request Claim
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="bg-slate-50 p-4 rounded-xl mb-4 text-center border border-slate-100">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Logged in as</p>
            <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-slate-600 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">
        {children}
      </main>
    </div>
  );
}
