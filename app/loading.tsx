export default function Loading() {
  return (
    <div className="container py-16">
      <div className="animate-pulse">
        <div className="h-96 bg-gray-200 rounded-lg mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[16/10] bg-gray-200 rounded-lg"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}