import { getPosts, getCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryNav from '@/components/CategoryNav'
import Hero from '@/components/Hero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wanderlust Kitchen - Food Travel Blog',
  description: 'Explore culinary adventures from street food to fine dining. Discover authentic cuisines and local food markets around the world.',
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

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const posts = await getPosts() as Post[]
  const categories = await getCategories() as Category[]
  
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)
  
  return (
    <div>
      {featuredPost && <Hero post={featuredPost} />}
      
      <div className="container py-12">
        <CategoryNav categories={categories} />
        
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Stories</h2>
          
          {recentPosts && recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">No posts available yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}