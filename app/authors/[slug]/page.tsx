// app/authors/[slug]/page.tsx
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const authors = await getAuthors() as Author[]
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }
  
  return {
    title: `${author.title} - Wanderlust Kitchen`,
    description: author.metadata?.bio || `Posts by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author
  
  if (!author) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Author Not Found</h1>
        <Link href="/" className="text-primary-600 hover:text-primary-700">
          Return Home
        </Link>
      </div>
    )
  }
  
  const posts = await getPostsByAuthor(author.id) as Post[]
  const profilePhoto = author.metadata?.profile_photo
  
  return (
    <div>
      <div className="bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {profilePhoto && (
              <div className="mb-6">
                <img 
                  src={`${profilePhoto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
                  alt={author.title}
                  width={160}
                  height={160}
                  className="rounded-full mx-auto"
                />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {author.title}
            </h1>
            {author.metadata?.bio && (
              <p className="text-xl text-gray-600 mb-6">
                {author.metadata.bio}
              </p>
            )}
            <div className="flex gap-4 justify-center">
              {author.metadata?.twitter && (
                <a 
                  href={`https://twitter.com/${author.metadata.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
                >
                  Twitter
                </a>
              )}
              {author.metadata?.instagram && (
                <a 
                  href={`https://instagram.com/${author.metadata.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Posts by {author.title}</h2>
        
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No posts by this author yet.</p>
        )}
      </div>
    </div>
  )
}