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
import { Error } from "@/lib/definitions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>({
    error: false,
    message: "",
  });
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  async function onSubmit(data: LoginFormSchemaType) {
    setLoading(true);
    const response = await authenticate(data);
    if (response?.error) {
      setError(response);
    }
    router.refresh()
  }

  return (
    <div className="flex items-center justify-center min-h-[90dvh] ">
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
              {error?.error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              )}
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
