import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wanderlust Kitchen - Food Travel Blog',
  description: 'Explore culinary adventures from street food to fine dining. Discover authentic cuisines and local food markets around the world.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍜</text></svg>'
  },
  openGraph: {
    title: 'Wanderlust Kitchen - Food Travel Blog',
    description: 'Explore culinary adventures from street food to fine dining. Discover authentic cuisines and local food markets around the world.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Wanderlust Kitchen',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Wanderlust Kitchen - Food Travel Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wanderlust Kitchen - Food Travel Blog',
    description: 'Explore culinary adventures from street food to fine dining. Discover authentic cuisines and local food markets around the world.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop&auto=format,compress',
        alt: 'Wanderlust Kitchen - Food Travel Blog'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}