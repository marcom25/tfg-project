"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getRating } from "@/lib/utils"


export function ContractCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
    >
      <CarouselContent>
        {/* {providers.map((provider) => (
          <CarouselItem key={provider.proveedor_id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="p-1">
              <Link href={`/providers/${provider.proveedor_id}/info`}>
                <Card className="overflow-hidden">
                  <CardContent className="p-4 aspect-square flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-20 h-20 mb-2">
                        <AvatarImage src={provider.usuario.imagen_perfil_id ?? ""} />
                        <AvatarFallback>
                          {`${provider.usuario.nombre[0]}${provider.usuario.apellido[0]}`}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-center line-clamp-1">{provider.usuario.nombre}</h3>
                      <div className="flex items-center text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="ml-1">{getRating(provider.usuario.calificados)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-gray-600 text-sm">
                      <MapPin size={14} className="mr-1" />
                      <span className="line-clamp-1">{provider.usuario.direccion.ciudad.nombre}</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {provider.servicios.slice(0, 2).map((service) => (
                        <Badge key={service.nombre_servicio} variant="secondary" className="text-xs">
                          {service.nombre_servicio}
                        </Badge>
                      ))}
                      {provider.servicios.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{provider.servicios.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))} */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

