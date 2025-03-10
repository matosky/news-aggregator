import type React from "react"
import { cn } from "../../lib/utils"; // Utility function for merging classNames with Tailwind classes

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export { Skeleton }

