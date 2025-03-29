"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { faker } from "@faker-js/faker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Plus, Trash2, RefreshCw } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  UserProfileFormClientSchema,
  type UserProfileFormClientSchemaType,
} from "@/lib/schemas";
import { updateProfile } from "@/actions/profile";
import type { ciudad, provincia } from "@prisma/client";
import { normalizeText } from "@/lib/utils";
import { getClientInfoFromUserId } from "@/actions/client";

type GetClientInfoResponse = Awaited<
  ReturnType<typeof getClientInfoFromUserId>
>;

type ProfileFormClientProps = {
  userData: GetClientInfoResponse;
  provincesAndCities: (provincia & { ciudades: ciudad[] })[];
};

const SERVICE_OPTIONS = [
  "Cuidado de ancianos",
  "Cuidado de niños",
  "Cuidado de mascotas",
  "Limpieza",
  "Cocina",
  "Ayuda escolar",
  "Cuidado de personas con discapacidad",
  "Cuidado de personas con movilidad reducida",
  "Cuidado de personas con enfermedades mentales",
  "Acompañamiento en actividades escolares",
  "Preparación de comidas para niños",
  "Cuidado nocturno",
  "Apoyo en tareas escolares",
  "Organización de actividades recreativas",
  "Cuidado de recién nacidos",
  "Supervisión de juegos",
  "Transporte a actividades extracurriculares",
  "Cuidado durante emergencias",
  "Apoyo en rutinas diarias",
];

export default function ProfileFormClient({
  userData,
  provincesAndCities,
}: ProfileFormClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "",
  });

  // Generate initial avatar seed
  const [avatarId, setAvatarId] = useState(
    userData.usuario.imagen_perfil_id ?? ""
  );

  // Map user services to string array
  const userServices = userData.servicios.map((s) => s.nombre_servicio || "");

  const form = useForm<UserProfileFormClientSchemaType>({
    resolver: zodResolver(UserProfileFormClientSchema),
    defaultValues: {
      name: userData.usuario.nombre || "",
      lastname: userData.usuario.apellido || "",
      email: userData.usuario.email || "",
      phone: userData.usuario.telefono || "",
      services:
        userServices.length > 0
          ? userServices.map((service) => ({ serviceName: service }))
          : [{ serviceName: "Cuidado de ancianos" }],
      street: userData.usuario.direccion?.calle || "",
      streetNumber: Number(userData.usuario.direccion?.numero) || 0,
      provinceId:
        userData.usuario.direccion?.ciudad.provincia?.provincia_id?.toString() ||
        "",
      cityId: userData.usuario.direccion?.ciudad_id.toString() || "",
      aboutMe: userData.usuario.descripcion || "",
      avatarId: avatarId,
      password: "",
    },
  });

  // Setup field array for services
  const { fields, append, remove } = useFieldArray<
    UserProfileFormClientSchemaType,
    "services",
    "id"
  >({
    control: form.control,
    name: "services",
  });

  // Get the selected province to filter cities
  const selectedProvinceId = form.watch("provinceId");
  const selectedProvince = provincesAndCities.find(
    (p) => p.provincia_id.toString() === selectedProvinceId
  );
  const cities = selectedProvince?.ciudades || [];

  // Function to generate a new avatar
  const generateNewAvatar = () => {
    const newSeed = faker.image.avatar();
    setAvatarId(newSeed);
    form.setValue("avatarId", newSeed);
  };

  async function onSubmit(data: UserProfileFormClientSchemaType) {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    setLoading(true);
    const response = await updateProfile(data);
    if (response?.error) {
      setError(response);
    } else {
      setSuccessMessage(response.message);
      toast.success(response.message || "Perfil actualizado con éxito");
    }
    setLoading(false);
    router.push("/");
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div className="flex justify-center min-h-screen w-full py-8">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:col-span-2 space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    Mi Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center mb-6 space-y-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={`${avatarId}`} alt="Avatar" />
                        <AvatarFallback className="font-bold text-2xl">
                          {form.watch("name")?.[0]}
                          {form.watch("lastname")?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full"
                        onClick={generateNewAvatar}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <Label htmlFor="name">Nombre</Label>
                          <FormControl>
                            <Input
                              id="name"
                              {...field}
                              placeholder="Ingresa tu nombre"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <Label htmlFor="lastname">Apellido</Label>
                          <FormControl>
                            <Input
                              id="lastname"
                              {...field}
                              placeholder="Ingresa tu apellido"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <FormControl>
                            <Input
                              id="email"
                              {...field}
                              placeholder="Ingresa tu correo electrónico"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <FormControl>
                            <Input
                              id="phone"
                              {...field}
                              placeholder="Ingresa tu número de teléfono"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <Label htmlFor="password">Contraseña actual</Label>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              {...field}
                              placeholder="Ingresa tu contraseña actual"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="col-span-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Servicios que necesito</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => append({ serviceName: "" })}
                          disabled={fields.length >= SERVICE_OPTIONS.length}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Agregar servicio
                        </Button>
                      </div>

                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`services.${index}.serviceName`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecciona un servicio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {SERVICE_OPTIONS.filter(
                                        (option) =>
                                          !form
                                            .watch("services")
                                            .some(
                                              (s: { serviceName: string }) =>
                                                s.serviceName === option
                                            ) || option === field.value
                                      ).map((service) => (
                                        <SelectItem
                                          key={service}
                                          value={service}
                                        >
                                          {service}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 w-full">
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
                            <FormItem className="w-48">
                              <FormControl>
                                <Input
                                  placeholder="Número"
                                  type="number"
                                  {...field}
                                  value={field.value === 0 ? "" : field.value}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value === ""
                                        ? 0
                                        : Number(e.target.value)
                                    )
                                  }
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
                                  {provincesAndCities.map((province) => (
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
                  </div>

                  <FormField
                    control={form.control}
                    name="aboutMe"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <Label htmlFor="aboutMe">Sobre mí</Label>
                        <FormControl>
                          <Textarea
                            id="aboutMe"
                            rows={4}
                            {...field}
                            placeholder="Escribe algo sobre ti"
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
                labelButton="Guardar Cambios"
                loadingLabel="Guardando..."
                className="w-full"
                type="submit"
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
