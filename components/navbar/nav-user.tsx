"use server";

import { Session } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User } from "lucide-react";
import { logout } from "@/actions/auth";

type NavUser = {
  session: Session | null;
};
function NavUser({ session }: NavUser) {
  return (
    <nav className="flex gap-1">
      {!session?.user ? (
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
              <AvatarImage src={session?.user.image ?? ""} alt="User Avatar" />
              <AvatarFallback>{`${session?.user?.name?.[0] ?? "N"}${session?.user?.lastname?.[0] ?? "N"}`}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center">
              <Link href="/profile" className="flex items-center w-full">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <form action={logout}>
              <button>
                <DropdownMenuItem className="flex items-center text-red-600 ">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}

export default NavUser;
