import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🍜</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Wanderlust Kitchen</h1>
              <p className="text-sm text-gray-500">Food Travel Stories</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/categories/street-food" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Street Food
            </Link>
            <Link 
              href="/categories/local-markets" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Markets
            </Link>
            <Link 
              href="/categories/fine-dining" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Fine Dining
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}