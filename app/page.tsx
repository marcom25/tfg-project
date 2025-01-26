import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import HomePage from "@/components/home/home-page";
import { auth } from "@/auth";
import HomePageClient from "@/components/home/home-page-client";

export default async function Page() {

  const session = await auth()

  return (
    <div className="min-h-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Encuentra el cuidador ideal
          </h2>
          <p className="text-xl text-gray-600">
            Cuidadores domiciliarios y niñeras confiables cerca de ti
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar cuidadores..."
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="flex h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Filter size={20} />
            Filtros
          </Button>
        </div>
        {session?.user && (
          <HomePageClient />
        )}

        <HomePage />
      </main>
    </div>
  );
}

