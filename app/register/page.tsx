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
import { register } from "@/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RegisterFormSchema, RegisterFormSchemaType } from "@/lib/schemas";
import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Error } from "@/lib/definitions";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>({
    error: false,
    message: "",
  });
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      userType: undefined,
    },
  });
  const router = useRouter();
  async function onSubmit(data: RegisterFormSchemaType) {
    setLoading(true);
    const response = await register(data);
    if (response?.error) {
      setError(response);
    }
    router.refresh()
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>Crea tu cuenta en Care Connect</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Contraseña"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Repetir Contraseña"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col space-y-1.5">
                          <Button
                            type="button"
                            variant={
                              field.value === "client" ? "default" : "outline"
                            }
                            className="w-full"
                            onClick={() => form.setValue("userType", "client")}
                          >
                            Necesito un servicio
                          </Button>
                          <Button
                            type="button"
                            variant={
                              field.value === "provider" ? "default" : "outline"
                            }
                            className="w-full"
                            onClick={() =>
                              form.setValue("userType", "provider")
                            }
                          >
                            Quiero prestar un servicio
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <LoadingButton
                isLoading={loading}
                labelButton="Registrarse"
                loadingLabel="Procesando..."
                className="w-full"
                type="submit"
              />
              {error?.error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error.message}
                  </AlertDescription>
                </Alert>
              )}
              <p className="mt-4 text-sm text-center">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
