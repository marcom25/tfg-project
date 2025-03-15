"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock, FileText, CreditCard } from "lucide-react";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
import { provincia, ciudad } from "@prisma/client";
import {
  ReservationFormSchema,
  ReservationFormSchemaType,
} from "@/lib/schemas";
import { normalizeText } from "@/lib/utils";
import { createReservation } from "@/actions/contract";
import { toast } from "sonner";

type ReservationFormProps = {
  id: string;
  provinces: (provincia & { ciudades: ciudad[] })[];
  providerName: string;
};

export default function ReservationForm({
  id,
  provinces,
  providerName,
}: ReservationFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });

  const form = useForm<ReservationFormSchemaType>({
    resolver: zodResolver(ReservationFormSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      minimumRange: 0,
      maximumRange: 0,
      duration: "",
      street: "",
      streetNumber: undefined,
      provinceId: "",
      cityId: "",
      requirements: "",
    },
  });

  // Get the selected province to filter cities
  const selectedProvinceId = form.watch("provinceId");
  const minimumRange = form.watch("minimumRange");
  const maximumRange = form.watch("maximumRange");
  const selectedProvince = provinces.find(
    (p) => p.provincia_id === Number(selectedProvinceId)
  );
  const cities = selectedProvince?.ciudades || [];

  async function onSubmit(data: ReservationFormSchemaType) {
    setLoading(true);
    const response = await createReservation(Number(id), data);
    if (response?.error) {
      setError(response);
    }
    setSuccessMessage(response.message);
    toast.success(response.message || "Reserva creada con éxito")
    form.reset()
    
    setLoading(false);
    
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
    }
  }, [successMessage])

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la reserva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <Label htmlFor="startDate">
                      <CalendarIcon className="mr-2 h-4 w-4 inline" />
                      Fecha Inicio
                    </Label>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>
                                Selecciona la fecha de inicio del servicio
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <Label htmlFor="endDate">
                      <CalendarIcon className="mr-2 h-4 w-4 inline" />
                      Fecha Fin
                    </Label>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>
                                Selecciona la fecha de finalización del servicio
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => {
                              const startDate = form.watch("startDate");
                              return (
                                date < new Date() ||
                                (startDate && date < startDate)
                              );
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label htmlFor="priceRange">
                  <CreditCard className="mr-2 h-4 w-4 inline" />
                  Rango monetario
                </Label>
                <div className="flex justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="minimumRange"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Mínimo"
                            {...field}
                            value={field.value === 0 ? "" : field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maximumRange"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Máximo"
                            {...field}
                            value={field.value === 0 ? "" : field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <Label htmlFor="duration">
                      <Clock className="mr-2 h-4 w-4 inline" />
                      Duración (horas)
                    </Label>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Dirección</Label>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Calle" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="streetNumber"
                    render={({ field }) => (
                      <FormItem className="w-60">
                        <FormControl>
                          <Input
                            placeholder="Número"
                            type="number"
                            {...field}
                            value={field.value === 0 ? "" : field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="provinceId"
                  render={({ field }) => (
                    <FormItem className="space-y-2 w-full">
                      <Label htmlFor="provinceId">Provincia</Label>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Reset city when province changes
                            form.setValue("cityId", "");
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu provincia" />
                          </SelectTrigger>
                          <SelectContent>
                            {provinces.map((province) => (
                              <SelectItem
                                key={province.provincia_id}
                                value={province.provincia_id.toString()}
                              >
                                {normalizeText(province.nombre)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cityId"
                  render={({ field }) => (
                    <FormItem className="space-y-2 w-full">
                      <Label htmlFor="cityId">Ciudad</Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!selectedProvinceId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem
                                key={city.ciudad_id}
                                value={city.ciudad_id.toString()}
                              >
                                {city.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <Label htmlFor="requirements">
                      <FileText className="mr-2 h-4 w-4 inline" />
                      Requisitos especiales
                    </Label>
                    <FormControl>
                      <Textarea
                        placeholder="Ingrese cualquier requisito especial aquí"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {error.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <LoadingButton
            isLoading={loading}
            labelButton="Confirmar reserva"
            loadingLabel="Procesando..."
            className="w-full"
            type="submit"
          />
        </form>
      </Form>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Resumen de la reserva</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Cuidador:</span>
              <span>{providerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Fecha inicio:</span>
              <span>
                {form.watch("startDate")
                  ? format(form.watch("startDate"), "PPP", { locale: es })
                  : "No seleccionada"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Fecha fin:</span>
              <span>
                {form.watch("endDate")
                  ? format(form.watch("endDate"), "PPP", { locale: es })
                  : "No seleccionada"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Duración:</span>
              <span>
                {form.watch("duration")
                  ? `${form.watch("duration")} horas`
                  : "No seleccionada"}
              </span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-bold">Total:</span>
              <span>
                {minimumRange && maximumRange
                  ? `$ ${minimumRange} - $ ${maximumRange}`
                  : "No seleccionado"}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              El pago se realizará al finalizar el servicio.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
