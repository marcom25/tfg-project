import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Filter } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const cuidadores = [
    {
      id: 1,
      name: "Agostina Heinzmann",
      rating: 4.8,
      location: "Buenos Aires",
      specialties: ["Bestie", "🧚🧚🧚🧚"],
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      rating: 4.6,
      location: "Córdoba",
      specialties: ["Niñera", "Educación especial"],
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      name: "María López",
      rating: 4.9,
      location: "Rosario",
      specialties: ["Cuidado de enfermos", "Terapia ocupacional"],
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      name: "Juan Pérez",
      rating: 4.7,
      location: "Mendoza",
      specialties: ["Fisioterapia", "Cuidado de ancianos"],
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 5,
      name: "Laura Sánchez",
      rating: 4.5,
      location: "La Plata",
      specialties: ["Niñera", "Tareas escolares"],
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 6,
      name: "Diego Martínez",
      rating: 4.8,
      location: "San Miguel de Tucumán",
      specialties: ["Cuidado postoperatorio", "Enfermería"],
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 7,
      name: "Sofía Fernández",
      rating: 4.9,
      location: "Mar del Plata",
      specialties: ["Cuidado infantil", "Primeros auxilios"],
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 8,
      name: "Martín González",
      rating: 4.7,
      location: "Salta",
      specialties: ["Acompañante terapéutico", "Cuidado de discapacitados"],
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Encuentra el cuidador ideal
          </h2>
          <p className="text-xl text-gray-600">
            Cuidadores domiciliarios y niñeras confiables cerca de ti
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar cuidadores..."
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cuidadores.map((cuidador) => (
            <Link key={cuidador.id} href={`/providers/${cuidador.id}/info`}>
              <Card className="overflow-hidden flex flex-col">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex flex-col items-center mb-4">
                    <Avatar className="w-24 h-24 mb-2">
                      <AvatarImage src={cuidador.image} alt={cuidador.name} />
                      <AvatarFallback>
                        {cuidador.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-center">
                      {cuidador.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1">{cuidador.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{cuidador.location}</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {cuidador.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

