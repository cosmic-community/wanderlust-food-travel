// app/categories/[slug]/page.tsx
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const categories = await getCategories() as Category[]
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug) as Category
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.title} - Wanderlust Kitchen`,
    description: category.metadata?.description || `Browse ${category.title} posts`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategory(slug) as Category
  
  if (!category) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <Link href="/" className="text-primary-600 hover:text-primary-700">
          Return Home
        </Link>
      </div>
    )
  }
  
  const posts = await getPostsByCategory(category.id) as Post[]
  const categoryImage = category.metadata?.category_image
  
  return (
    <div>
      <div className="bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {categoryImage && (
              <div className="mb-8 rounded-lg overflow-hidden mx-auto max-w-2xl">
                <img 
                  src={`${categoryImage.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
                  alt={category.title}
                  width={600}
                  height={200}
                  className="w-full"
                />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {category.title}
            </h1>
            {category.metadata?.description && (
              <p className="text-xl text-gray-600">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No posts in this category yet.</p>
        )}
      </div>
    </div>
  )
}