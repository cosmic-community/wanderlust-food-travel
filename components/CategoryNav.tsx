import { Category } from '@/types'
import Link from 'next/link'

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  if (!categories || categories.length === 0) {
    return null
  }
  
  return (
    <section className="border-y border-gray-200 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const categoryImage = category.metadata?.category_image
          
          return (
            <Link 
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-[16/10] rounded-lg overflow-hidden"
            >
              {categoryImage && (
                <img 
                  src={`${categoryImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                {category.metadata?.description && (
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {category.metadata.description}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}