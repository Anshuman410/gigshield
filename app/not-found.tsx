import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-slate-400 mb-8">This is the GigShield custom 404 page.</p>
      <Link href="/" className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
        Go Back Home
      </Link>
    </div>
  )
}
