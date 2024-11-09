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
import { StarIcon, MessageCircleIcon, PhoneIcon, MailIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// type ClientInfoProps = {
//   params: {
//     id: number;
//   };
// };

export default function Page({params} : {params: {id: string}}) {
  const id = params.id;

  console.log(id)
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
        <CardHeader className="flex flex-row items-center gap-4">
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
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-sm text-gray-600">
                Soy un profesional con experiencia en diseño gráfico y
                desarrollo web. Me especializo en crear soluciones visuales
                atractivas y funcionales para mis clientes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Diseño Gráfico</Badge>
                <Badge>Desarrollo Web</Badge>
                <Badge>UI/UX</Badge>
                <Badge>Branding</Badge>
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
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  Llamar
                </Button>
                <Button variant="outline" size="sm">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Enviar email
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
