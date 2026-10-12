"use server";

import { MovieDetail } from "@/src/utils/movies";
import { cacheLife } from "next/cache";

export const getMovies = async (
  query: string,
  page: number,
  itemsPerPage: number = 10,
): Promise<{
  movies: MovieDetail[];
  totalPages: number;
  totalResults: number;
}> => {
  "use cache";
  cacheLife("hours");

  const url = `https://www.omdbapi.com/?apikey=${
    process.env.SECRET_OMDB_API_KEY
  }&s=${encodeURIComponent(query)}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();

  const movies = data.Search || [];
  const totalPages = Math.ceil(data.totalResults / itemsPerPage);
  const totalResults = parseInt(data.totalResults || "0");

  return { movies, totalPages, totalResults };
};
