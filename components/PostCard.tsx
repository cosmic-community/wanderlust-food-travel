import { Post } from '@/types'
import Link from 'next/link'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`}>
        {featuredImage && (
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
            <img 
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {category && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium">
                {category.title}
              </span>
            )}
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
      </Link>
      
      {author && (
        <div className="flex items-center gap-3 mt-4">
          {author.metadata?.profile_photo && (
            <Link href={`/authors/${author.slug}`}>
              <img 
                src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.title}
                width={40}
                height={40}
                className="rounded-full hover:ring-2 hover:ring-primary-500 hover:ring-offset-2 transition-all cursor-pointer"
              />
            </Link>
          )}
          <div>
            <Link 
              href={`/authors/${author.slug}`}
              className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
            >
              {author.title}
            </Link>
            {post.metadata?.published_date && (
              <p className="text-sm text-gray-500">
                {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  )
}