import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/font";

import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Care Connect",
  description:
    "Trabajo Final de Grado de Marco Mignacco, CareConnect una app para conectar niñeras y cuidadores domiciliarios con clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`bg-gradient-to-b from-blue-50 to-white flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Toaster />

      </body>
    </html>
  );
}

