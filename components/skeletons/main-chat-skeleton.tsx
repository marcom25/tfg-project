import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"

function MainChatSkeleton() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header Skeleton */}
      <div className="h-16 flex-shrink-0 flex justify-between items-center px-4 border-b border-blue-100">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 flex flex-col h-[calc(100%-64px)]">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Mensaje recibido */}
            <div className="flex justify-start">
              <div className="max-w-[70%]">
                <div className="space-y-2">
                  <Skeleton className="h-16 w-48 rounded-2xl bg-blue-300/50" />
                </div>
              </div>
            </div>

            {/* Mensaje enviado */}
            <div className="flex justify-end">
              <div className="max-w-[70%]">
                <div className="space-y-2">
                  <Skeleton className="h-12 w-56 rounded-2xl bg-blue-100/50" />
                </div>
              </div>
            </div>

            {/* Mensaje recibido */}
            <div className="flex justify-start">
              <div className="max-w-[70%]">
                <div className="space-y-2">
                  <Skeleton className="h-20 w-64 rounded-2xl bg-blue-300/50" />
                </div>
              </div>
            </div>

            {/* Mensaje enviado */}
            <div className="flex justify-end">
              <div className="max-w-[70%]">
                <div className="space-y-2">
                  <Skeleton className="h-10 w-40 rounded-2xl bg-blue-100/50" />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Message Input Skeleton */}
      <div className="flex-shrink-0 p-4 bg-blue-50 border-t border-blue-100">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 flex-1 rounded-md bg-white/50" />
          <Button variant="ghost" size="icon" className="opacity-50 cursor-not-allowed" disabled>
            <SendIcon className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MainChatSkeleton
