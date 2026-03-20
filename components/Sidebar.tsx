'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShieldCheck, User, LayoutDashboard, CloudLightning } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/worker', icon: User, label: 'Worker App' },
    { href: '/admin', icon: LayoutDashboard, label: 'Admin Panel' },
    { href: '/admin/events', icon: CloudLightning, label: 'Trigger Events' },
  ]

  return (
    <aside className="w-64 glass-panel border-r border-slate-200/20 dark:border-slate-800/50 text-slate-700 dark:text-slate-300 min-h-screen p-5 flex flex-col transition-all duration-300 relative z-10 m-3 rounded-2xl shadow-2xl">
      <div className="flex items-center gap-3 mb-10 mt-2 p-2">
        <div className="bg-gradient-to-tr from-indigo-500 to-emerald-400 p-2 rounded-xl shadow-lg shadow-indigo-500/30">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-black tracking-wide text-gradient">GigShield</h1>
      </div>

      <nav className="flex-1 space-y-3">
        {links.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                active 
                  ? 'bg-gradient-to-r from-indigo-500/10 to-transparent text-indigo-600 dark:text-indigo-400 font-semibold shadow-[inset_2px_0_0_0_rgba(99,102,241,1)]' 
                  : 'hover:bg-slate-100 hover:dark:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="relative z-10">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-2">
        <div className="bg-gradient-to-r from-indigo-500/5 to-emerald-500/5 p-4 rounded-xl border border-indigo-500/10 backdrop-blur-sm">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">GigShield Platform</div>
          <div className="text-[10px] text-slate-500">v2.0 Premium Build © 2026</div>
        </div>
      </div>
    </aside>
  )
}
