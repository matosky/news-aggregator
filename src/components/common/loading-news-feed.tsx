import { ShimmerNewsCard } from "../ui/shimmer-news-card";

export default function LoadingNewsFeed() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <ShimmerNewsCard key={i} />
      ))}
    </div>
  )
}

