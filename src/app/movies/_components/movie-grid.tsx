"use client";

import { type MovieDetail } from "@/src/utils/movies";
import { ViewTransition } from "react";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: MovieDetail[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4 ">no movies found</div>
        <p className="text-gray-500 ">try searching for something else</p>
      </div>
    );
  }

  return (
    <ViewTransition>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </ViewTransition>
  );
}
