import Link from "next/link";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { RolesClient } from "@/lib/definitions";


type NavRolesProps = {
  session: Session | null;
};

function NavUser() {
  return (
    <nav className="flex gap-1">
      <Button variant="ghost">
        <Link href="/">Página Principal</Link>
      </Button>
      <Button variant="ghost">
        <Link href="/aboutUs">Sobre Nosotros</Link>
      </Button>
    </nav>
  );
}

function NavClient() {
  return (
    <nav className="flex gap-1">
      <Button variant="ghost">
        <Link href="/">Página Principal</Link>
      </Button>
      <Button variant="ghost">
        <Link href="/chat">Chat</Link>
      </Button>
      <Button variant="ghost">
        <Link href="/aboutUs">Sobre Nosotros</Link>
      </Button>
    </nav>
  );
}

function NavProvider() {
  return (
    <nav className="flex gap-1">
      <Button variant="ghost">
        <Link href="/dashboard">Dashboard</Link>
      </Button>

      <Button variant="ghost">
        <Link href="/chat">Chat</Link>
      </Button>
      <Button variant="ghost">
        <Link href="/searchClients">Buscar Clientes</Link>
      </Button>
      <Button variant="ghost">
        <Link href="/aboutUs">Sobre Nosotros</Link>
      </Button>
    </nav>
  );
}

function NavRoles({ session }: NavRolesProps) {
    if (!session?.user) return <NavUser/>
    if (session?.user.role === "CLIENT") return <NavClient />
    if (session?.user.role === "PROVIDER") return <NavProvider />
}

export default NavRoles;
