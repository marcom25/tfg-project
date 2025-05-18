import Link from "next/link";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { getRating } from "@/lib/utils";
import { NoResults } from "../common/no-results";
import { getFilteredClients } from "@/actions/client";

export default async function SearchClients({
  query,
  sortBy,
  location,
  minRating,
  from,
  to,
}: {
  query: string;
  sortBy: string;
  location: string;
  minRating: string;
  from: string;
  to: string;
}) {
  const clients = await getFilteredClients(
    query,
    sortBy,
    location,
    minRating,
    from,
    to
  );

  if (!clients.length) {
    return <NoResults />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {clients.map((client) => (
        <Link
          key={client.cliente_id}
          href={`/clients/${client.cliente_id}/info`}
        >
          <Card className="overflow-hidden flex flex-col h-full">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="w-24 h-24 mb-2">
                  <AvatarImage src={client.usuario.imagen_perfil_id ?? ""} />
                  <AvatarFallback>
                    {`${client.usuario?.nombre?.[0]}${client.usuario?.apellido?.[0]}`}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-center">
                  {client.usuario?.nombre}
                </h3>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1">
                    {getRating(client.usuario?.calificados ?? null)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-1" />
                <span>{client.usuario?.direccion?.ciudad?.nombre}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                {client.servicios.slice(0, 1).map((service) => (
                  <Badge key={service.nombre_servicio} variant="secondary">
                    {service.nombre_servicio}
                  </Badge>
                ))}
                {client.servicios.length > 1 && (
                  <Badge variant="secondary" className="text-xs">
                    +{client.servicios.length - 1}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
