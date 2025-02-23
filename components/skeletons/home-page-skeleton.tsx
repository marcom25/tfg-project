import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProviderCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col items-center mb-4">
          {/* Avatar skeleton */}
          <Skeleton className="w-24 h-24 rounded-full mb-2" />

          {/* Name skeleton */}
          <Skeleton className="h-6 w-32 mb-2" />

          {/* Rating skeleton */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>

        {/* Location skeleton */}
        <div className="flex items-center justify-center mb-2">
          <Skeleton className="h-4 w-4 mr-1" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Services badges skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mt-auto">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ProvidersGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProviderCardSkeleton key={index} />
      ))}
    </div>
  )
}
