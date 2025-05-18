import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Calendar, Clock, DollarSign, MapPin, FileText } from "lucide-react"

export default function AgreementSkeleton() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Detalles del Servicio Card */}
          <Card className="col-span-2 border-t-4 border-t-blue-500 shadow-md">
            <CardHeader className="pb-2">
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-5 w-full max-w-md" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Cliente */}
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <Skeleton className="h-5 w-32 mt-1" />
                  </div>
                </div>

                {/* Cuidador */}
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Cuidador</p>
                    <Skeleton className="h-5 w-32 mt-1" />
                  </div>
                </div>

                {/* Fecha Inicio */}
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha Inicio</p>
                    <Skeleton className="h-5 w-24 mt-1" />
                  </div>
                </div>

                {/* Fecha Fin */}
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha Fin</p>
                    <Skeleton className="h-5 w-24 mt-1" />
                  </div>
                </div>

                {/* Duración */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Duración</p>
                    <Skeleton className="h-5 w-20 mt-1" />
                  </div>
                </div>

                {/* Rango monetario */}
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Rango monetario</p>
                    <Skeleton className="h-5 w-36 mt-1" />
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-start gap-3 col-span-full">
                  <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <Skeleton className="h-5 w-full max-w-md mt-1" />
                  </div>
                </div>

                {/* Requisitos especiales */}
                <div className="flex items-start gap-3 col-span-full">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Requisitos especiales</p>
                    <Skeleton className="h-5 w-full max-w-md mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado del Acuerdo Card */}
          <Card className="border-t-4 border-t-blue-500 shadow-md h-full flex flex-col">
            <CardHeader className="pb-2 flex">
              <Skeleton className="h-7 w-48 mb-3" />
              <Skeleton className="h-7 w-40" />
            </CardHeader>
            <CardContent className="pt-6 pb-6 flex-grow">
              <div className="space-y-8">
                {/* Cliente status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-md">Cliente:</span>
                  </div>
                  <Skeleton className="h-7 w-28" />
                </div>

                {/* Cuidador status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-md">Cuidador:</span>
                  </div>
                  <Skeleton className="h-7 w-28" />
                </div>

                {/* Monto acordado */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[50%]">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-md">Monto acordado:</span>
                  </div>
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4 mt-auto">
              {/* Action buttons */}
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
