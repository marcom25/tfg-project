import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function DashboardHoursSkeleton() {
  return (
    <Card className="flex-grow w-full md:w-1/4 flex flex-col">
      <CardHeader>
        <Skeleton className="h-7 w-24" />
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 gap-4 w-full">
          {/* Este mes skeleton */}
          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-7 w-24" />
            </div>
          </div>

          {/* Esta semana skeleton */}
          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-7 w-24" />
            </div>
          </div>

          {/* Promedio semanal skeleton */}
          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                <Skeleton className="h-5 w-36" />
              </div>
              <Skeleton className="h-7 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardHoursSkeleton
