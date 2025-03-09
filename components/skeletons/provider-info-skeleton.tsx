import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageCircleIcon, MailIcon, NotepadText, MapPinIcon, StarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProviderInfoSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-row justify-between gap-4">
          <div className="flex flex-row items-center gap-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-36 mb-2" />
              <div className="flex items-center mt-2">
                <StarIcon className="w-4 h-4 text-muted mr-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ubicación</h3>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2 text-muted" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contacto</h3>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" disabled>
                  <MessageCircleIcon className="w-4 h-4 mr-2" />
                  Enviar mensaje
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <MailIcon className="w-4 h-4 mr-2" />
                  Enviar email
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <NotepadText className="w-4 h-4 mr-2" />
                  Reservar turno
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comentarios y Puntuaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-5 w-32" />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <StarIcon key={j} className="w-4 h-4 text-muted" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>

          <CommentSectionSkeleton />
        </CardContent>
      </Card>
    </div>
  )
}

function CommentSectionSkeleton() {
  return (
    <div className="mt-8">
      <h4 className="font-semibold mb-2">Deja tu comentario</h4>
      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <span className="mr-2">Tu puntuación:</span>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-muted cursor-not-allowed" />
            ))}
          </div>
        </div>

        <Skeleton className="h-24 w-full" />

        <Skeleton className="h-10 w-36" />
      </div>
    </div>
  )
}

