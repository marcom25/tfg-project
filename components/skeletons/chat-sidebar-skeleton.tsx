import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

function ChatSidebarSkeleton() {
  return (
    <div className="w-80 border-r border-blue-100 bg-white">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-blue-100">
        <Skeleton className="h-7 w-36" />
        <Button variant="ghost" size="icon" className="rounded-md opacity-50 cursor-not-allowed" disabled>
          <PlusIcon className="h-5 w-5 text-gray-400" />
        </Button>
      </div>

      {/* Conversations List */}
      <ScrollArea className="h-[calc(100%-64px)]">
        {/* Conversation Item 1 */}
        <div className="flex items-center gap-3 p-4 hover:bg-blue-50">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-4 w-40 mt-1" />
          </div>
        </div>

        {/* Conversation Item 2 */}
        <div className="flex items-center gap-3 p-4 hover:bg-blue-50">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-36 mt-1" />
          </div>
        </div>

        {/* Conversation Item 3 */}
        <div className="flex items-center gap-3 p-4 hover:bg-blue-50">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-4 w-44 mt-1" />
          </div>
        </div>

        {/* Conversation Item 4 - Variación de tamaño */}
        <div className="flex items-center gap-3 p-4 hover:bg-blue-50">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3 w-14" />
            </div>
            <Skeleton className="h-4 w-32 mt-1" />
          </div>
        </div>

        {/* Puedes añadir más elementos skeleton si es necesario */}
      </ScrollArea>

      {/* Alternativa: Estado vacío (comentado, descomentar para usar) */}
      {/* 
      <div className="flex flex-col items-center justify-center h-full text-center pb-52">
        <MessageSquareIcon className="h-12 w-12 text-gray-200" />
        <Skeleton className="h-5 w-48 mt-4" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>
      */}
    </div>
  )
}

export default ChatSidebarSkeleton
