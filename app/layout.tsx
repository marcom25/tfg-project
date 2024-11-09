import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { geistMono, geistSans } from "@/font";



export const metadata: Metadata = {
  title: "CareConnect",
  description: "Trabajo Final de Grado de Marco Mignacco, CareConnect una app para conectar niñeras y cuidadores domiciliarios con clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col bg-gray-100 ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        
      </body>
    </html>
  );
}

