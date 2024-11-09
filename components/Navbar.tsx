import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Care Connect</h1>
        <nav>
          <Button variant="ghost">
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button>
            <Link href="/register">Registrarse</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
