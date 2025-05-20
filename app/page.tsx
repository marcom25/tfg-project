"use server";

import HomePage from "@/components/home/home-page";
import { auth } from "@/auth";
import HomePageClient from "@/components/home/home-page-client";
import SearchBar from "@/components/common/search-bar";
import { Suspense } from "react";
import { ProvidersGridSkeleton } from "@/components/skeletons/home-page-skeleton";
import FilterOptions from "@/components/common/filter-options";


export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]> | Promise<Record<string, string | string[]>>
}) {
  let params: Record<string, string | string[]>;
  if (searchParams && typeof (searchParams as Promise<unknown>).then === "function") {
    params = await searchParams as Record<string, string | string[]>;
  } else {
    params = (searchParams ?? {}) as Record<string, string | string[]>;
  }
  const query = params.query || "";
  const sortBy = params.sortBy || "nameAsc";
  const location = params.location || "all";
  const minRating = params.minRating || "0";
  const from = params.from || "";
  const to = params.to || "";
  const session = await auth();

  return (
    <div className="min-h-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {session?.user ? (
          <HomePageClient />
        ) : (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Encuentra el cuidador ideal
            </h2>
            <p className="text-xl text-gray-600">
              Cuidadores domiciliarios y niñeras confiables cerca de ti
            </p>
          </div>
        )}

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
            Array.isArray(to) ? to.join(",") : to
          ].join("|")}
          fallback={<ProvidersGridSkeleton />}
        >
          <HomePage
            query={Array.isArray(query) ? query.join(",") : query}
            sortBy={Array.isArray(sortBy) ? sortBy.join(",") : sortBy}
            location={Array.isArray(location) ? location.join(",") : location}
            minRating={Array.isArray(minRating) ? minRating.join(",") : minRating}
            from={Array.isArray(from) ? from.join(",") : from}
            to={Array.isArray(to) ? to.join(",") : to}
          />
        </Suspense>
      </main>
    </div>
  );
}

