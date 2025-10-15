import { Post } from '@/types'
import Link from 'next/link'

interface HeroProps {
  post: Post;
}

export default function Hero({ post }: HeroProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  
  return (
    <section className="relative h-[600px] overflow-hidden">
      {featuredImage && (
        <div className="absolute inset-0">
          <img 
            src={`${featuredImage.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}
      
      <div className="relative container h-full flex items-end pb-16">
        <div className="max-w-3xl text-white">
          {category && (
            <Link 
              href={`/categories/${category.slug}`}
              className="inline-block px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors mb-4"
            >
              {category.title}
            </Link>
          )}
          
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {post.title}
          </h2>
          
          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-200 mb-6 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}
          
          <div className="flex items-center gap-4 mb-6">
            {author && author.metadata?.profile_photo && (
              <img 
                src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={author.title}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            {author && (
              <div>
                <Link 
                  href={`/authors/${author.slug}`}
                  className="font-semibold hover:text-primary-300 transition-colors"
                >
                  {author.title}
                </Link>
                {post.metadata?.published_date && (
                  <p className="text-sm text-gray-300">
                    {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            )}
          </div>
          
          <Link 
            href={`/posts/${post.slug}`}
            className="inline-block px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Read Full Story
          </Link>
        </div>
      </div>
    </section>
  )
}