import { Skeleton } from "@/components/ui/skeleton"

export function DashCalendarModalSkeleton() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        {/* Modal title */}
        <Skeleton className="h-7 w-3/4 mb-6" />

        {/* Contract items */}
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={`contract-${i}`} className="flex items-center space-x-4 p-3">
                {/* Avatar */}
                <Skeleton className="h-12 w-12 rounded-full" />

                {/* Contract details */}
                <div className="flex-grow">
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>

                {/* Badge */}
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
        </div>

        {/* Close button */}
        <div className="mt-4 flex justify-end">
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </div>
  )
}
