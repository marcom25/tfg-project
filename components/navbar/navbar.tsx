"use server";

import Image from "next/image";
import NavRoles from "./nav-roles";
import { auth } from "@/auth";
import NavUser from "./nav-user";
import { headers } from "next/headers";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className={`bg-white shadow-sm z-50 "sticky top-0 left-0 z-50"`}>
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
        <NavRoles session={session} />
        <NavUser session={session} />
      </div>
    </header>
  );
}

