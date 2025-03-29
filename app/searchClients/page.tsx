"use server";

import SearchBar from "@/components/common/search-bar";
import { Suspense } from "react";
import { ProvidersGridSkeleton } from "@/components/skeletons/home-page-skeleton";

import FilterOptions from "@/components/common/filter-options";
import SearchClients from "@/components/searchClients/search-clients";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sortBy?: string;
    location?: string;
    minRating?: string;
    from?: string;
    to?: string;
  };
}) {
  const query = searchParams?.query || "";
  const sortBy = searchParams?.sortBy || "nameAsc";
  const location = searchParams?.location || "all";
  const minRating = searchParams?.minRating || "0";
  const from = searchParams?.from || "";
  const to = searchParams?.to || "";

  return (
    <div className="min-h-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Encuentra el cliente ideal
          </h2>
          <p className="text-xl text-gray-600">
            Conecta con familias y personas que necesitan tus servicios
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar />
          <FilterOptions />
        </div>

        <Suspense
          key={query + sortBy + location + minRating + from + to}
          fallback={<ProvidersGridSkeleton />}
        >
          <SearchClients
            query={query}
            sortBy={sortBy}
            location={location}
            minRating={minRating}
            from={from}
            to={to}
          />
        </Suspense>
      </main>
    </div>
  );
}
