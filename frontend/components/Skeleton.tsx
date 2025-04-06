interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
        />
      ))}
    </>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
      <div className="space-y-4">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" count={3} />
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32" />
    </div>
  )
} 