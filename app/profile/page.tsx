"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Tipos de usuario
type UserRole = "proveedor" | "cliente";

// Interfaz para los datos del usuario
interface UserData {
  nombre: string;
  apellido: string;
  edad: string;
  telefono: string;
  experiencia?: string;
  servicios: string[];
  sobreMi: string;
  fotoPerfil: string;
  direccion: string;
  ciudad: string;
  provincia: string;
}

const provinciasArgentina = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

export default function Page() {
  const [userRole, setUserRole] = useState<UserRole>("cliente");
  const [userData, setUserData] = useState<UserData>({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    experiencia: "",
    servicios: [],
    sobreMi: "",
    fotoPerfil: "",
    direccion: "",
    ciudad: "",
    provincia: "",
  });
  const router = useRouter();

  // Simula la obtención de datos del usuario
  useEffect(() => {
    // Aquí normalmente harías una llamada a tu API
    const fetchUserData = async () => {
      // Simula una respuesta de API
      const mockUserData: UserData = {
        nombre: "Juan",
        apellido: "Pérez",
        edad: "30",
        telefono: "1234567890",
        experiencia: "5 años",
        servicios: ["Cuidado de ancianos", "Cuidado de niños"],
        sobreMi: "Soy un cuidador profesional con experiencia en...",
        fotoPerfil: "/placeholder.svg?height=100&width=100",
        direccion: "Av. Corrientes 1234",
        ciudad: "Buenos Aires",
        provincia: "Buenos Aires",
      };
      setUserData(mockUserData);
      // Simula obtener el rol del usuario
      setUserRole("proveedor");
    };

    fetchUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setUserData((prev) => ({ ...prev, servicios: [value] }));
  };

  const handleProvinciaChange = (value: string) => {
    setUserData((prev) => ({ ...prev, provincia: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí enviarías los datos actualizados a tu API
    console.log("Datos actualizados:", userData);
    // Simula una redirección después de guardar
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Mi Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.fotoPerfil} alt={userData.nombre} />
                <AvatarFallback className="font-bold">
                  {userData.nombre[0]}
                  {userData.apellido[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={userData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={userData.apellido}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  name="edad"
                  value={userData.edad}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  value={userData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              {userRole === "proveedor" && (
                <div className="space-y-2">
                  <Label htmlFor="experiencia">Experiencia</Label>
                  <Input
                    id="experiencia"
                    name="experiencia"
                    value={userData.experiencia}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="servicios">Servicios</Label>
                <Select
                  onValueChange={handleServiceChange}
                  value={userData.servicios[0]}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cuidado de ancianos">
                      Cuidado de ancianos
                    </SelectItem>
                    <SelectItem value="Cuidado de niños">
                      Cuidado de niños
                    </SelectItem>
                    <SelectItem value="Cuidado de mascotas">
                      Cuidado de niños y ancianos
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  value={userData.direccion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input
                  id="ciudad"
                  name="ciudad"
                  value={userData.ciudad}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 ">
                <Label htmlFor="provincia">Provincia</Label>
                <Select
                  onValueChange={handleProvinciaChange}
                  value={userData.provincia}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinciasArgentina.map((provincia) => (
                      <SelectItem key={provincia} value={provincia}>
                        {provincia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sobreMi">Sobre mí</Label>
              <Textarea
                id="sobreMi"
                name="sobreMi"
                value={userData.sobreMi}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
