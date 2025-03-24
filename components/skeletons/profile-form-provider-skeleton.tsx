import { Skeleton } from "@/components/ui/skeleton"

export function ProfileFormProviderSkeleton() {
  return (
    <div className="flex justify-center min-h-screen w-full py-8">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 flex flex-col space-y-1.5 pb-3">
                <Skeleton className="h-8 w-40 mx-auto" />
              </div>
              <div className="p-6 pt-0 space-y-4">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6 space-y-4">
                  <div className="relative">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    {/* <Skeleton className="h-8 w-8 rounded-full absolute bottom-0 right-0" /> */}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name and Lastname */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  {/* Email and Phone */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  {/* Experience and Password */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  {/* Services */}
                  <div className="col-span-2 space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-8 w-32" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-10 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-10 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-span-2 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <div className="flex gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-32 flex-shrink-0" />
                    </div>
                  </div>

                  {/* Province and City */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                {/* About Me */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

