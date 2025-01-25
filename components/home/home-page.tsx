import Link from "next/link";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { getProviders } from "@/actions/provider";
import { getRating } from "@/lib/utils";

export default async function HomePage() {
  const providers = await getProviders();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {providers.map((provider) => (
        <Link
          key={provider.proveedor_id}
          href={`/providers/${provider.proveedor_id}/info`}
        >
          <Card className="overflow-hidden flex flex-col h-full">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="w-24 h-24 mb-2">
                  <AvatarImage src={provider.usuario.imagen_perfil_id ?? ""} />
                  <AvatarFallback>
                    {`${provider.usuario?.nombre?.[0]}${provider.usuario?.apellido?.[0]}`}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-center">
                  {provider.usuario?.nombre}
                </h3>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1">
                    {getRating(provider.usuario?.calificados ?? null)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-1" />
                <span>{provider.usuario?.direccion?.ciudad?.nombre}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                {provider.servicios.map((service) => (
                  <Badge key={service.nombre_servicio} variant="secondary">
                    {service.nombre_servicio}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
