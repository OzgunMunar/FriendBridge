import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full h-screen bg-slate-900 text-gray-300 flex items-center justify-center flex-col gap-10">
      <p className="text-8xl">404</p>
      <p className="text-6xl">Not Found</p>
      <Link href="/" className="transition-all duration-200 ease-in bg-orange-600 hover:bg-orange-700 px-5 py-1 rounded-sm">Return Home</Link>
    </div>
  )
}