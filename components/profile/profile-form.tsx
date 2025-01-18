"use client";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AddressFormFields from "./address-form";
import { updateProfile } from "@/actions/profile";
import { useActionState } from "react";
import { UserProfileFormState } from "@/lib/schemas";
import { Province, UserProfile } from "@/lib/data";

type ProfileFormProps = {
  userData: UserProfile;
  provincesAndCities: Province[];
};

export default function ProfileForm({
  userData,
  provincesAndCities,
}: ProfileFormProps) {
  // const [errorMessage, formAction, isPending] = useActionState(updateProfile, {
  //   message: "",
  //   errors: {},
  // });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Mi Perfil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={""} className="space-y-4">
          <div className="flex flex-col items-center mb-6 space-y-4">
            <Avatar className={`w-24 h-24`}>
              <AvatarFallback className="font-bold text-2xl">
                {userData.name?.[0]}
                {userData.lastname?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" name="nombre" defaultValue={userData.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                name="apellido"
                defaultValue={userData.lastname}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                defaultValue={userData.phone}
              />
            </div>
            {userData.experience ?? (
              <div className="space-y-2">
                <Label htmlFor="experiencia">Experiencia</Label>
                <Input
                  id="experiencia"
                  name="experiencia"
                  defaultValue={userData.experience ?? ""}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="servicios">Servicios</Label>
              <Select
                name="servicios"
                defaultValue={userData.services?.[0]?.service_name}
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
                  <SelectItem value="Cuidado de niños y ancianos">
                    Cuidado de niños y ancianos
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AddressFormFields
              provincesAndCities={provincesAndCities}
              initialAddress={userData.address.city}
              initialCity={userData.address.street}
              initialProvince={userData.address.province}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sobreMi">Sobre mí</Label>
            <Textarea
              id="sobreMi"
              name="sobreMi"
              defaultValue={userData.aboutMe}
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full">
            Guardar Cambios
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
