import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            className="w-12 h-12"
            src="/images/logo.svg"
            alt="Ganzo Blanco"
            width="56"
            height="56"
          />
          <h1 className="text-2xl font-bold text-blue-600">Care Connect</h1>
        </div>
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
          {/* <Button variant="ghost">
            <Link href="/">Buscar Clientes</Link>
          </Button> */}
        </nav>
        <nav className="flex gap-1">
          {true ? (
            <>
              <Button variant="ghost">
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button variant="ghost">
                <Link href="/register">Registrarse</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/avatar.png" alt="User Avatar" />
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem  className="flex items-center text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
}
