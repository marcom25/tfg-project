"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  DollarSignIcon,
  UserIcon,
  ClockIcon,
} from "lucide-react";


export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Ejemplo de datos de turnos (en una aplicación real, estos datos vendrían de una API)
  const turnos = [
    {
      id: 1,
      cliente: "María García",
      fecha: "2023-06-15",
      hora: "09:00",
      tipo: "Cuidado de ancianos",
    },
    {
      id: 2,
      cliente: "Juan Pérez",
      fecha: "2023-06-16",
      hora: "14:00",
      tipo: "Niñera",
    },
    {
      id: 3,
      cliente: "Ana Rodríguez",
      fecha: "2023-06-17",
      hora: "10:00",
      tipo: "Cuidado de ancianos",
    },
    {
      id: 4,
      cliente: "Carlos López",
      fecha: "2023-06-18",
      hora: "11:00",
      tipo: "Niñera",
    },
    {
      id: 5,
      cliente: "Laura Martínez",
      fecha: "2023-06-19",
      hora: "15:00",
      tipo: "Cuidado de ancianos",
    },
  ];

  // Ejemplo de datos de ganancias (en una aplicación real, estos datos vendrían de una API)
  const ganancias = {
    total: 1500,
    esteMes: 500,
    pendiente: 200,
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Proveedor</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Turnos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {turnos.slice(0, 3).map((turno) => (
                <li key={turno.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{turno.cliente[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{turno.cliente}</p>
                    <p className="text-sm text-gray-500">
                      {turno.fecha} - {turno.hora}
                    </p>
                  </div>
                  <Badge>{turno.tipo}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ganancias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <DollarSignIcon className="mr-2 h-4 w-4 text-green-500" />
                  Total
                </span>
                <span className="font-bold">${ganancias.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                  Este mes
                </span>
                <span className="font-bold">${ganancias.esteMes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4 text-yellow-500" />
                  Pendiente
                </span>
                <span className="font-bold">${ganancias.pendiente}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mis Turnos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {turnos.map((turno) => (
              <Card key={turno.id} className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{turno.cliente[0]}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{turno.cliente}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {turno.fecha}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="mr-2 h-4 w-4" />
                      {turno.hora}
                    </div>
                    <Badge className="w-fit">{turno.tipo}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
