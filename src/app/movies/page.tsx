import { Suspense } from "react";
import { MovieList } from "./_components/movie-list";
import { MovieGridSkeleton } from "./_components/movie-skeletons";
import { SearchForm } from "./_components/search-form";
import { SortBy } from "./_components/sort-by";
import { getMovies } from "./actions";
import { Metadata } from "next";

export const prefetch = "partial";

interface SearchParams {
  s?: string;
  page?: string;
  sort?: string;
}

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export const metadata: Metadata = {
  title: "Movies",
  description: "Explore a collection of movies",
};

async function MovieResults({ searchParams }: HomeProps) {
  const { s, page } = await searchParams;

  const query = s || "batman";
  const currentPage = parseInt(page || "1");

  const moviesPromise = getMovies(query, currentPage);

  return <MovieList moviesPromise={moviesPromise} />;
}

export default function MoviesPage({ searchParams }: HomeProps) {
  return (
    <>
      <div className="sticky top-0 z-10 mb-8 py-4 flex flex-nowrap justify-center items-center gap-4">
        <Suspense fallback={<div className="h-10" />}>
          <SearchForm />
          <SortBy />
        </Suspense>
      </div>

      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}
