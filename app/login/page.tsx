// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from 'next/link'

export default function Login() {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const router = useRouter()

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // Aquí iría la lógica de autenticación
  //   console.log('Login attempt', { email, password })
  //   // Redirigir al usuario a la página de inicio después del login
  //   router.push('/home')
  // }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle component="h3" variant="h3">Iniciar Sesión</CardTitle>
          <CardDescription component="h4" variant="h4">Ingresa a tu cuenta de Care Connect</CardDescription>
        </CardHeader>
        <CardContent>
          <form 
          // onSubmit={handleSubmit}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input 
                  id="email" 
                  placeholder="Email" 
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input 
                  id="password" 
                  placeholder="Contraseña" 
                  type="password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">Ingresar</Button>
          <p className="mt-4 text-sm text-center">
            ¿No tienes una cuenta? <Link href="/register" className="text-blue-500 hover:underline">Regístrate</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}