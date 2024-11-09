import type { Metadata } from "next";
import { geistMono, geistSans } from "@/font";
import Navbar from "@/components/navbar";



export const metadata: Metadata = {
  title: "Care Connect",
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

