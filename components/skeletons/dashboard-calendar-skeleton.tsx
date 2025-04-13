import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardCalendarSkeleton() {
  return (
    <Card className="flex-shrink-0 w-full md:w-1/5 flex flex-col">
      <CardHeader>
        <CardTitle>Calendario</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Month navigation */}
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={`weekday-${i}`} className="h-6 w-6 mx-auto" />
            ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array(35)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={`day-${i}`} className="h-8 w-8 rounded-md mx-auto" />
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
