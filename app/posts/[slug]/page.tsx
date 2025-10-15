// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = await getPosts() as Post[]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug) as Post
  
  if (!post) {
    return {
      title: 'Post Not Found - Wanderlust Kitchen',
      description: 'The requested post could not be found.',
    }
  }
  
  return {
    title: `${post.title} - Wanderlust Kitchen`,
    description: post.metadata?.excerpt || post.title,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug) as Post
  
  if (!post) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Link href="/" className="text-primary-600 hover:text-primary-700">
          Return Home
        </Link>
      </div>
    )
  }
  
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const publishedDate = post.metadata?.published_date
  
  return (
    <article className="container py-12 max-w-4xl">
      {category && (
        <Link 
          href={`/categories/${category.slug}`}
          className="inline-block px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors mb-6"
        >
          {category.title}
        </Link>
      )}
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>
      
      {author && (
        <div className="flex items-center gap-4 mb-8">
          {author.metadata?.profile_photo && (
            <img 
              src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={author.title}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <Link 
              href={`/authors/${author.slug}`}
              className="font-semibold text-gray-900 hover:text-primary-600"
            >
              {author.title}
            </Link>
            {publishedDate && (
              <p className="text-sm text-gray-500">
                {new Date(publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>
      )}
      
      {featuredImage && (
        <div className="mb-10 rounded-lg overflow-hidden">
          <img 
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={450}
            className="w-full"
          />
        </div>
      )}
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.metadata?.content || ''}</ReactMarkdown>
      </div>
      
      {author && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-start gap-6">
            {author.metadata?.profile_photo && (
              <img 
                src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={author.title}
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                About {author.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {author.metadata?.bio || ''}
              </p>
              <div className="flex gap-4">
                {author.metadata?.twitter && (
                  <a 
                    href={`https://twitter.com/${author.metadata.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Twitter
                  </a>
                )}
                {author.metadata?.instagram && (
                  <a 
                    href={`https://instagram.com/${author.metadata.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}