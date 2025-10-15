'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
          
          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/categories/street-food" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Street Food
              </Link>
              <Link 
                href="/categories/local-markets" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Markets
              </Link>
              <Link 
                href="/categories/fine-dining" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fine Dining
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}