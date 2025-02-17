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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

type ProviderInfoProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: ProviderInfoProps) {
  const id = (await params).id;


  const comments = [
    {
      id: 1,
      author: "Cliente Satisfecho",
      rating: 5,
      comment: "Excelente servicio, muy profesional y puntual.",
    },
    {
      id: 2,
      author: "Usuario Contento",
      rating: 4,
      comment: "Buen trabajo, aunque hubo un pequeño retraso en la entrega.",
    },
    {
      id: 3,
      author: "Cliente Recurrente",
      rating: 5,
      comment: "Siempre entrega un trabajo de calidad. Muy recomendado.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-row justify-between gap-4">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User's avatar" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Usuario Nombre</CardTitle>
              <CardDescription>Proveedor de servicios</CardDescription>
              <div className="flex items-center mt-2">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">4.8 (120 reseñas)</span>
              </div>
            </div>
          </div>
          <div>
            <CardTitle>Experiencia</CardTitle>
            <CardDescription className="text-end">3 años</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-sm text-gray-600">
                Soy una niñera profesional con experiencia en el cuidado y
                desarrollo infantil. Me especializo en proporcionar un entorno
                seguro, cariñoso y estimulante para los niños, adaptándome a las
                necesidades específicas de cada familia.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Niñera</Badge>
                <Badge>Primeros auxilios</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ubicación</h3>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2" />
                <span className="text-sm text-gray-600">
                  Buenos Aires, Argentina
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
            {comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{comment.author}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < comment.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{comment.comment}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="font-semibold mb-2">Deja tu comentario</h4>
            <div className="flex items-center mb-2">
              <span className="mr-2">Tu puntuación:</span>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-400"
                />
              ))}
            </div>
            <Textarea
              placeholder="Escribe tu comentario aquí..."
              className="mb-2"
            />
            <Button>Enviar comentario</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
