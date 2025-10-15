import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🍜</span>
              <div>
                <h3 className="text-xl font-bold">Wanderlust Kitchen</h3>
                <p className="text-sm text-gray-400">Food Travel Stories</p>
              </div>
            </div>
            <p className="text-gray-400">
              Exploring authentic cuisines and local food cultures around the world.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/street-food" className="text-gray-400 hover:text-white transition-colors">
                  Street Food
                </Link>
              </li>
              <li>
                <Link href="/categories/local-markets" className="text-gray-400 hover:text-white transition-colors">
                  Local Markets
                </Link>
              </li>
              <li>
                <Link href="/categories/fine-dining" className="text-gray-400 hover:text-white transition-colors">
                  Fine Dining
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">About</h4>
            <p className="text-gray-400 mb-4">
              A curated collection of food travel experiences from passionate writers exploring culinary traditions worldwide.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} Wanderlust Kitchen. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by{' '}
            <a 
              href="https://www.cosmicjs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}