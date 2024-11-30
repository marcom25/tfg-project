'use client'
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
import { authenticate } from "@/actions/auth";
import { useActionState } from "react";
import { CircleAlert } from "lucide-react";
import * as argon2 from "argon2"

export default function Login() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)
  

  return (
    <div className="flex items-center justify-center h-full ">
        <form action={formAction}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle component="h3" variant="h3">
              Iniciar Sesión
            </CardTitle>
            <CardDescription component="h4" variant="h4">
              Ingresa a tu cuenta de Care Connect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="email" placeholder="Email" type="email" name="email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="Contraseña"
                  name="password"
                  type="password"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" aria-disabled={isPending}>
              Ingresar
            </Button>
            <p className="mt-4 text-sm text-center">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Regístrate
              </Link>
            </p>
          </CardFooter>
          {errorMessage && (
            <>
              <CircleAlert className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </Card>
    </form>
      </div>
  );
}
