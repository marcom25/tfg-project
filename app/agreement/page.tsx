"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  MessageSquare,
} from "lucide-react";

interface AcuerdoProps {
  clienteNombre: string;
  cuidadorNombre: string;
  fecha: string;
  hora: string;
  duracion: string;
  tarifa: string;
  ubicacion: string;
  clienteAceptado: boolean;
  cuidadorAceptado: boolean;
  onAceptar: () => void;
  onRechazar: () => void;
  esCliente: boolean;
}

export default function Page({
  clienteNombre,
  cuidadorNombre,
  fecha,
  hora,
  duracion,
  tarifa,
  ubicacion,
  clienteAceptado,
  cuidadorAceptado,
  onAceptar,
  onRechazar,
  esCliente,
}: AcuerdoProps) {
  const [aceptado, setAceptado] = useState(
    esCliente ? clienteAceptado : cuidadorAceptado
  );
  const [mensaje, setMensaje] = useState("");

  const handleAceptar = () => {
    setAceptado(true);
    onAceptar();
  };

  const handleRechazar = () => {
    setAceptado(false);
    onRechazar();
  };

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
                Información acordada entre {clienteNombre} y {cuidadorNombre}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Cliente:</h3>
                    <p>{clienteNombre}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Cuidador:</h3>
                    <p>{cuidadorNombre}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Fecha Inicio:</h3>
                    <p>{fecha}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Fecha Fin:</h3>
                    <p>{hora}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Duración (horas):</h3>
                    <p>{duracion}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Rango monetario:</h3>
                    <p>{tarifa}</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Ubicación:</h3>
                    <p>{ubicacion}</p>
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
                  <Badge variant={clienteAceptado ? "success" : "destructive"}>
                    {clienteAceptado ? (
                      <CheckCircle className="mr-1 h-4 w-4" />
                    ) : (
                      <XCircle className="mr-1 h-4 w-4" />
                    )}
                    {clienteAceptado ? "Aceptado" : "Pendiente"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cuidador:</span>
                  <Badge variant={cuidadorAceptado ? "success" : "destructive"}>
                    {cuidadorAceptado ? (
                      <CheckCircle className="mr-1 h-4 w-4" />
                    ) : (
                      <XCircle className="mr-1 h-4 w-4" />
                    )}
                    {cuidadorAceptado ? "Aceptado" : "Pendiente"}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              {!aceptado && (
                <>
                  <Button
                    onClick={handleRechazar}
                    variant="destructive"
                    className="w-full"
                  >
                    Rechazar
                  </Button>
                  <Button onClick={handleAceptar} className="w-full">
                    Aceptar
                  </Button>
                </>
              )}
              {aceptado && (
                <Badge
                  variant="success"
                  className="text-lg py-2 w-full justify-center"
                >
                  Acuerdo Aceptado
                </Badge>
              )}
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Mensajes Adicionales</CardTitle>
            <CardDescription>
              Añade notas o preguntas sobre el acuerdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Escribe tu mensaje aquí..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={4}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Enviar Mensaje
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
