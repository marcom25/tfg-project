"use client";
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
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, LoginFormSchemaType } from "@/lib/schemas";
import { LoadingButton } from "@/components/ui/loading-button";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormSchemaType) {
    setLoading(true);
    await authenticate(data);
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center h-full ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle component="h3" variant="h3">
            Iniciar Sesión
          </CardTitle>
          <CardDescription component="h4" variant="h4">
            Ingresa a tu cuenta de Care Connect
          </CardDescription>
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
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <LoadingButton
                isLoading={loading}
                labelButton="Ingresar"
                loadingLabel="Procesando..."
                className="w-full"
                type="submit"
              />
              <p className="mt-4 text-sm text-center">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Regístrate
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
