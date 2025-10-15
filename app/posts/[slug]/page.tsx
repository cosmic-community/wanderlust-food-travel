// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import Link from 'next/link'
import { marked } from 'marked'
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

  const featuredImage = post.metadata?.featured_image
  const imageUrl = featuredImage?.imgix_url 
    ? `${featuredImage.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined

  return {
    title: `${post.title} - Wanderlust Kitchen`,
    description: post.metadata?.excerpt || `Read ${post.title} on Wanderlust Kitchen`,
    openGraph: {
      title: `${post.title} - Wanderlust Kitchen`,
      description: post.metadata?.excerpt || `Read ${post.title} on Wanderlust Kitchen`,
      type: 'article',
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
      publishedTime: post.metadata?.published_date,
      authors: post.metadata?.author?.title ? [post.metadata.author.title] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - Wanderlust Kitchen`,
      description: post.metadata?.excerpt || `Read ${post.title} on Wanderlust Kitchen`,
      images: imageUrl ? [imageUrl] : undefined,
    }
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

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  
  // Convert markdown content to HTML
  const contentHtml = marked(post.metadata?.content || '')

  return (
    <article className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          {category && (
            <Link 
              href={`/categories/${category.slug}`}
              className="inline-block px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium mb-4 hover:bg-primary-600 transition-colors"
            >
              {category.title}
            </Link>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-600 mb-6">
              {post.metadata.excerpt}
            </p>
          )}
          
          {author && (
            <div className="flex items-center gap-4">
              {author.metadata?.profile_photo && (
                <Link href={`/authors/${author.slug}`}>
                  <img 
                    src={`${author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={author.title}
                    width={60}
                    height={60}
                    className="rounded-full hover:ring-2 hover:ring-primary-500 hover:ring-offset-2 transition-all"
                  />
                </Link>
              )}
              <div>
                <Link 
                  href={`/authors/${author.slug}`}
                  className="font-medium text-gray-900 hover:text-primary-600 transition-colors block"
                >
                  By {author.title}
                </Link>
                {post.metadata?.published_date && (
                  <time className="text-sm text-gray-500">
                    {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8">
            <img 
              src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Author Bio */}
        {author && author.metadata?.bio && (
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-4">
              {author.metadata?.profile_photo && (
                <Link href={`/authors/${author.slug}`}>
                  <img 
                    src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={author.title}
                    width={80}
                    height={80}
                    className="rounded-full hover:ring-2 hover:ring-primary-500 hover:ring-offset-2 transition-all"
                  />
                </Link>
              )}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <Link 
                    href={`/authors/${author.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    About {author.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-3">
                  {author.metadata.bio}
                </p>
                <div className="flex gap-3">
                  {author.metadata?.twitter && (
                    <a 
                      href={`https://twitter.com/${author.metadata.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Twitter
                    </a>
                  )}
                  {author.metadata?.instagram && (
                    <a 
                      href={`https://instagram.com/${author.metadata.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Instagram
                    </a>
                  )}
                  <Link 
                    href={`/authors/${author.slug}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View All Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}