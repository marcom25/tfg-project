
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CarouselItem } from "../ui/carousel";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { Contract } from "@/actions/contract";
import { ContractStates } from "@/lib/definitions";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { servicio } from "@prisma/client";
import { getStateMessage } from "@/lib/utils";
import Link from "next/link";

function getColorByState(state: number): string {
  switch (state) {
    case ContractStates.ON_GOING:
      return "bg-green-100 text-green-500 border-green-500";
    case ContractStates.FINISHED:
      return "bg-gray-100 text-gray-500 border-gray-500";
    case ContractStates.PENDING:
      return "bg-blue-100 text-blue-500 border-blue-500";
    default:
      return "bg-red-100 text-red-500 border-red-500";
  }
}

function ContractCard({ contract }: { contract: Contract }) {
  const colorClasses = getColorByState(contract.estado?.estado_id ?? -1);

  return (
    <CarouselItem
      key={contract.contrato_id}
      className="flex-shrink-0 w-48 max-w-[375px]"
    >
      <Link href={`/contracts/${contract.contrato_id}`}>
      <Card className={`h-full border ${colorClasses}`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-lg">
            <span className="flex items-center space-x-2">
              <Avatar
                className={`h-8 w-8 border-2 rounded-full overflow-hidden ${colorClasses}`}
              >
                <AvatarImage
                  src={contract.cliente.usuario.imagen_perfil_id ?? ""}
                />
                <AvatarFallback className={`bg-opacity-20 ${colorClasses}`}>
                  {`${contract.cliente.usuario.nombre?.[0]}${contract.cliente.usuario.apellido?.[0]}`}
                </AvatarFallback>
              </Avatar>
              <span className="truncate text-md">
                {contract.cliente.usuario.nombre}{" "}
                {contract.cliente.usuario.apellido}
              </span>

            </span>
						<Badge variant="default">{getStateMessage(contract.estado?.estado)}</Badge>

          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-md">
          <p className={`flex items-center ${colorClasses}`}>
            <CalendarIcon
              className={`inline-block h-4 w-4 mr-1 ${colorClasses}`}
            />
            {format(contract.fecha_inicio, "dd/MM/yyyy", { locale: es })} -
            {format(contract.fecha_fin, "dd/MM/yyyy", { locale: es })}
          </p>
          <p className={`flex items-center ${colorClasses}`}>
            <ClockIcon
              className={`inline-block h-4 w-4 mr-1 ${colorClasses}`}
            />
            {contract.cantidad_horas} horas
          </p>
          <p className={`flex items-center ${colorClasses}`}>
            <MapPinIcon
              className={`inline-block h-4 w-4 mr-1 ${colorClasses}`}
            />
            {contract.direccion?.calle} {contract.direccion?.numero},{" "}
            {contract.direccion?.ciudad?.nombre}
          </p>
          <div className="w-fit mt-2">
            {contract.cliente.servicios.slice(0, 2).map((service: servicio) => (
              <Badge key={service.nombre_servicio} variant="default">
                {service.nombre_servicio}
              </Badge>
            ))}
            {contract.cliente.servicios.length > 2 && (
              <Badge variant="default" className="text-xs">
                +{contract.cliente.servicios.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
      </Link>
    </CarouselItem>
  );
}

export default ContractCard;

