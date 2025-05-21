"use server";

import SearchBar from "@/components/common/search-bar";
import { Suspense } from "react";
import { ProvidersGridSkeleton } from "@/components/skeletons/home-page-skeleton";

import FilterOptions from "@/components/common/filter-options";
import SearchClients from "@/components/searchClients/search-clients";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string | string[];
    sortBy?: string | string[];
    location?: string | string[];
    minRating?: string | string[];
    from?: string | string[];
    to?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";
  const sortBy = params?.sortBy || "nameAsc";
  const location = params?.location || "all";
  const minRating = params?.minRating || "0";
  const from = params?.from || "";
  const to = params?.to || "";

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
          key={[
            Array.isArray(query) ? query.join(",") : query,
            Array.isArray(sortBy) ? sortBy.join(",") : sortBy,
            Array.isArray(location) ? location.join(",") : location,
            Array.isArray(minRating) ? minRating.join(",") : minRating,
            Array.isArray(from) ? from.join(",") : from,
            Array.isArray(to) ? to.join(",") : to,
          ].join("|")}
          fallback={<ProvidersGridSkeleton />}
        >
          <SearchClients
            query={Array.isArray(query) ? query.join(",") : query}
            sortBy={Array.isArray(sortBy) ? sortBy.join(",") : sortBy}
            location={Array.isArray(location) ? location.join(",") : location}
            minRating={
              Array.isArray(minRating) ? minRating.join(",") : minRating
            }
            from={Array.isArray(from) ? from.join(",") : from}
            to={Array.isArray(to) ? to.join(",") : to}
          />
        </Suspense>
      </main>
    </div>
  );
}

