import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Care Connect</h1>
        <nav className="flex gap-1">
          <Button variant="ghost">
            <Link href="/">Página Principal</Link>
          </Button>
          <Button variant="ghost">
            <Link href="/aboutUs">Sobre Nosotros</Link>
          </Button>
          <Button variant="ghost">
            <Link href="/chat">Chat</Link>
          </Button>
          {/* <Button>
            <Link></Link>
          </Button> */}
        </nav>
        <nav className="flex gap-1">
          <Button variant="ghost">
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button variant="ghost">
            <Link href="/register">Registrarse</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
