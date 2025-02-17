import {
  Calendar as CalendarIcon,
  Clock,
  // User,
  FileText,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
// import { format } from 'date-fns'
// import { es } from 'date-fns/locale'

type ProviderReserveProps = {
  params: Promise<{
    id: string;
  }>;
};

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

export default async function Page({ params }: ProviderReserveProps) {
  const id = (await params).id;
  console.log(id);
  // const [fecha, setFecha] = useState<Date>()
  // const [hora, setHora] = useState<string>('')
  // const [duracion, setDuracion] = useState<string>('')
  // const [requisitos, setRequisitos] = useState<string>('')

  // const calcularPrecioTotal = () => {
  //   if (!duracion) return precioBase;
  //   const horas = parseInt(duracion);
  //   return precioBase * horas;
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Aquí iría la lógica para procesar la reserva
  //   console.log('Reserva enviada', { fecha, hora, duracion, requisitos });
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Reserva tu servicio de cuidado
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        <form
          // onSubmit={handleSubmit}

          className="md:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la reserva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fecha">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Fecha Inicio
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {/* {fecha ? format(fecha, 'PPP', { locale: es }) :  */}
                      <span>Selecciona la fecha de inicio del servicio</span>
                      {/* } */}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      // selected={fecha}
                      // onSelect={setFecha}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Fecha Fin
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {/* {fecha ? format(fecha, 'PPP', { locale: es }) :  */}
                      <span>
                        Selecciona la fecha de finalización del servicio
                      </span>
                      {/* } */}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      // selected={fecha}
                      // onSelect={setFecha}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Rango monetario
                </Label>
                <div className="flex justify-between gap-4">
                  <Input
                    name="minimunRange"
                    type="number"
                    placeholder="Mínimo"
                  />
                  <Input
                    name="maximunRange"
                    type="number"
                    placeholder="Máximo"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duracion">
                  <Clock className="mr-2 h-4 w-4" />
                  Duración (horas)
                </Label>
                <Select
                // onValueChange={setDuracion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la duración" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                      <SelectItem key={h} value={h.toString()}>
                        {h} {h === 1 ? "hora" : "horas"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  placeholder="Ingresa tu dirección"
                  // value={userData.direccion}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-4">
                <div className="space-y-2 w-full">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    name="ciudad"
                    placeholder="Ingresa tu ciudad"
                    // value={userData.ciudad}
                    // onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="provincia">Provincia</Label>
                  <Select
                  // onValueChange={handleProvinciaChange}
                  // value={userData.provincia}
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
                <Label htmlFor="requisitos">
                  <FileText className="mr-2 h-4 w-4" />
                  Requisitos especiales
                </Label>
                <Textarea
                  id="requisitos"
                  placeholder="Ingrese cualquier requisito especial aquí"
                  // value={requisitos}
                  // onChange={(e) => setRequisitos(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          <Button type="submit" className="w-full">
            Confirmar reserva
          </Button>
        </form>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen de la reserva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Cuidador:</span>
                <span>{/* {prestadorNombre} */}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Fecha:</span>
                <span>
                  {/* {fecha ? format(fecha, 'PPP', { locale: es }) :  */}
                  No seleccionada
                  {/* } */}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Hora:</span>
                <span>
                  {/* { hora ||  */}
                  No seleccionada
                  {/* } */}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Duración:</span>
                <span>
                  {/* {duracion ? `${duracion} horas` : ' */}
                  No seleccionada
                  {/* '} */}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${/* {calcularPrecioTotal()} */}</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                El pago se realizará al finalizar el servicio.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
