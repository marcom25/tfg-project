import { Card, CardContent, CardHeader } from "../ui/card"
import { CarouselItem } from "../ui/carousel"
import { Skeleton } from "../ui/skeleton"

function ContractCardSkeleton() {
  return (
    <CarouselItem className="flex-shrink-0 w-48 max-w-[375px]">
      <Card className="h-full border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1 rounded-full" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="flex gap-1 mt-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  )
}

export default ContractCardSkeleton
