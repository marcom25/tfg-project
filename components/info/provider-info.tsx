import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  StarIcon,
  MessageCircleIcon,
  MailIcon,
  NotepadText,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";
import { getProviderInfo } from "@/actions/provider";
import { getRating, normalizeText } from "@/lib/utils";
import CommentSection from "@/components/info/comment-section";
import {
  getUserIdFromClientId,
  getUserIdFromProviderId,
} from "@/actions/users";
import { getQualifications } from "@/actions/qualifications";

export default async function ProviderInfo({ id }: { id: number }) {
  const provider = await getProviderInfo(id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-row justify-between gap-4">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={provider.usuario.imagen_perfil_id ?? ""}
                alt="User's avatar"
              />
              <AvatarFallback>{`${provider.usuario?.nombre?.[0]}${provider.usuario?.apellido?.[0]}`}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>
                {provider.usuario?.nombre} {provider.usuario?.apellido}
              </CardTitle>
              <CardDescription>Proveedor de servicios</CardDescription>
              <div className="flex items-center mt-2">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">
                  {getRating(provider.usuario.calificados)} (
                  {provider.usuario.comentarios.length} reseñas)
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <CardTitle>Experiencia</CardTitle>
            <CardDescription className="text-end">
              {provider.experiencia}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-sm text-gray-600">
                {provider.usuario.descripcion}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {provider.servicios.map((service) => (
                  <Badge key={service.servicio_id}>
                    {service.nombre_servicio}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ubicación</h3>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2" />
                <span className="text-sm text-gray-600">
                  {provider.usuario.direccion?.ciudad.nombre},{" "}
                  {normalizeText(
                    provider.usuario.direccion?.ciudad.provincia?.nombre
                  )}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contacto</h3>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <MessageCircleIcon className="w-4 h-4 mr-2" />
                  Enviar mensaje
                </Button>
                <Button variant="outline" size="sm">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Enviar email
                </Button>
                <Button variant="outline" size="sm">
                  <Link href={`/providers/createReserve`} className="flex">
                    <NotepadText className="w-4 h-4 mr-2" />
                    Reservar turno
                  </Link>
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
            {provider.usuario.comentarios.map((comment) => (
              <div
                key={comment.comentario_id}
                className="border-b pb-4 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">
                    {comment.comentador.nombre} {comment.comentador.apellido}
                  </span>
                  <div className="flex items-center">
                    {comment.puntuacion 
                      ? [...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i <
                              (comment.puntuacion &&
                                comment.puntuacion.puntuacion
                                ? comment.puntuacion.puntuacion
                                : 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))
                      : "Sin Calificación"}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{comment.comentario}</p>
              </div>
            ))}
          </div>

          <CommentSection providerId={Number(id)} />
        </CardContent>
      </Card>
    </div>
  );
}
