import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getStateMessage, getVariantFromState, truncateText } from "@/lib/utils";
import { getContractsByClientId } from "@/actions/contract";

export async function ContractCarousel() {
  const contracts = await getContractsByClientId();

  return (
    <div className="relative w-full max-w-[1400px] mx-auto">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-10" // Increased padding to make room for navigation arrows
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {contracts.length === 0 ? (
            <CarouselItem className="pl-2 md:pl-4 basis-full">
              <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="flex flex-col items-center justify-center py-6 px-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileText  />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No hay contratos disponibles
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                    No tienes solicitudes o contratos de servicio pendientes o
                    activos en este momento.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ) : (
            contracts.map((contract) => (
              <CarouselItem
                key={contract.contrato_id}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <Link href={`/agreement/${contract.contrato_id}`}>
                  <Card className="overflow-hidden h-full">
                    <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-between h-[220px]">
                      <div className="flex flex-col items-center gap-1">
                        <Avatar className="w-12 h-12 sm:w-14 sm:h-14">
                          <AvatarImage
                            src={
                              contract.proveedor.usuario.imagen_perfil_id ?? ""
                            }
                          />
                          <AvatarFallback>
                            {`${contract.proveedor.usuario.nombre?.[0] ?? ""}${
                              contract.proveedor.usuario.apellido?.[0] ?? ""
                            }`}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm sm:text-base font-semibold text-center mt-1 line-clamp-1">
                          {contract.proveedor.usuario.nombre}
                        </h3>
                        <Badge
                          variant={getVariantFromState(contract.estado?.estado)}
                          className="text-xs px-2 py-0.5 mt-0.5"
                        >
                          {getStateMessage(contract.estado?.estado)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-center text-gray-600 text-xs mt-1">
                        <MapPin size={12} className="mr-1 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {contract.direccion?.ciudad?.nombre}
                        </span>
                      </div>

                      <div className="flex flex-wrap justify-center gap-1 mt-1">
                        {contract.proveedor.servicios
                          .slice(0, 1)
                          .map((service) => (
                            <Badge
                              key={service.nombre_servicio}
                              variant="secondary"
                              className="text-xs"
                            >
                              {truncateText(service.nombre_servicio, 20)}
                            </Badge>
                          ))}
                        {contract.proveedor.servicios.length > 1 && (
                          <Badge variant="secondary" className="text-xs">
                            +{contract.proveedor.servicios.length - 1}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))
          )}
        </CarouselContent>

        {/* Positioned the navigation buttons absolutely relative to the container */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <CarouselPrevious className="relative left-0 h-8 w-8 shadow-md" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <CarouselNext className="relative right-0 h-8 w-8 shadow-md" />
        </div>
      </Carousel>
    </div>
  );
}

