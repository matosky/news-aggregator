export function ShimmerNewsCard() {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="md:flex">
          <div className="md:w-1/3 h-[200px] relative bg-gray-200 dark:bg-gray-700 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-600 shimmer"></div>
          </div>
          <div className="md:w-2/3 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-600 shimmer"></div>
              </div>
              <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-600 shimmer"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-600 shimmer"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-600 shimmer"></div>
            </div>
            <div className="space-y-2 flex-grow">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-600 shimmer"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-600 shimmer"></div>
              </div>
              <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-600 shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  