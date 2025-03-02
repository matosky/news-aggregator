import { Skeleton } from "../ui/skeleton";

export default function LoadingNewsFeed() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-[200px] w-full rounded-md" />
        </div>
      ))}
    </div>
  )
}

