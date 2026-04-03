import Link from "next/link";
import { ArrowRight, User, LayoutDashboard, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex justify-center items-center p-4 rounded-full bg-indigo-100 mb-4">
            <ShieldCheck className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            Welcome to <span className="text-indigo-600">GigShield</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Dynamic income protection and zero-touch claims for gig workers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard" className="group">
            <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Worker App</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Access your dashboard to manage policies, view zone safety ratings, and track automated claims payouts.
              </p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                Go to Worker App <ArrowRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </Link>

          <Link href="/admin" className="group">
            <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                <LayoutDashboard className="w-6 h-6 text-slate-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Admin Dashboard</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Log in to monitor platform metrics and manually simulate automated system disruption events.
              </p>
              <div className="flex items-center text-slate-700 font-semibold group-hover:gap-2 transition-all">
                Go to Admin Panel <ArrowRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
