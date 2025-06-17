import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="flex items-center gap-8 mb-12">
      <Link 
        href="/" 
        className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
      >
        Home
      </Link>
      <Link 
        href="/blog" 
        className="text-gray-600 font-medium hover:text-primary-500 transition-colors"
      >
        Blog
      </Link>
    </nav>
  )
} 