import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function Page() {
  return (
    <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Resumen del Acuerdo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Detalles del Servicio</CardTitle>
              <CardDescription>
                Información acordada entre Carlos y Sofia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Cliente:</h3>
                    <p>Carlos</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Cuidador:</h3>
                    <p>Sofia</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Fecha Inicio:</h3>
                    <p></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Fecha Fin:</h3>
                    <p></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Duración (horas):</h3>
                    <p></p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Rango monetario:</h3>
                    <p></p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Ubicación:</h3>
                    <p></p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Requisitos especiales:</h3>
                    <p></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estado del Acuerdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Cliente:</span>
                  <Badge variant={true ? "success" : "destructive"}>
                    {true ? (
                      <CheckCircle className="mr-1 h-4 w-4" />
                    ) : (
                      <XCircle className="mr-1 h-4 w-4" />
                    )}
                    {true ? "Aceptado" : "Pendiente"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cuidador:</span>
                  <Badge variant={false ? "success" : "destructive"}>
                    {false ? (
                      <CheckCircle className="mr-1 h-4 w-4" />
                    ) : (
                      <XCircle className="mr-1 h-4 w-4" />
                    )}
                    {false ? "Aceptado" : "Pendiente"}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex flex-col gap-2 w-full">
                {!false && (
                  <>
                    <Button variant="destructive" className="w-full">
                      Rechazar
                    </Button>
                    <Button className="w-full">Aceptar</Button>
                  </>
                )}
                {false && (
                  <Badge
                    variant="success"
                    className="text-lg py-2 w-full justify-center"
                  >
                    Acuerdo Aceptado
                  </Badge>
                )}
              </div>

              <Button className="w-full mt-6">
                <MessageSquare className="mr-2 h-4 w-4" />
                Enviar Mensaje
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
