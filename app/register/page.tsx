"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { useFormState } from "react-dom";
import { register } from "@/actions/auth";
import { FormEvent, useActionState, useState } from "react";

export default function Register() {
  const [state, formAction] = useActionState(register, {
    message: "",
    errors: {},
  });
  const [userType, setUserType] = useState<'client' | 'provider' | null>(null)

  return (
    <form action={formAction}>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>Crea tu cuenta en Care Connect</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <Input
                type="hidden"
                name="userType"
                value={userType || ''}
              />
              <div className="flex flex-col space-y-1.5">
                <Button
                  type="button"
                  variant={userType === "client" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setUserType('client')}
                >
                  Necesito un servicio
                </Button>
                <Button
                  type="button"
                  variant={userType === "provider" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setUserType('provider')}
                >
                  Quiero prestar un servicio
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Registrarse
            </Button>
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
            <p className="mt-4 text-sm text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
