"use server";

import HomePage from "@/components/home/home-page";
import { auth } from "@/auth";
import HomePageClient from "@/components/home/home-page-client";
import SearchProvider from "@/components/home/search-provider";
import { Suspense } from "react";
import { ProvidersGridSkeleton } from "@/components/skeletons/home-page-skeleton";

import FilterProvider from "@/components/home/filter-provider";

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
  const session = await auth();

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
          <SearchProvider />
          <FilterProvider />
        </div>
        {session?.user && <HomePageClient />}

        <Suspense
          key={query + sortBy + location + minRating + from + to}
          fallback={<ProvidersGridSkeleton />}
        >
          <HomePage
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

