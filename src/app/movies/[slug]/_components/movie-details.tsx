"use client";

import Image from "next/image";
import { BackLink } from "./back-link";
import { use, ViewTransition } from "react";
import { MovieData } from "../page";
import { ImageOff } from "lucide-react";

export function Details({
  moviePromise,
}: {
  moviePromise: Promise<MovieData | null>;
}) {
  const movie = use(moviePromise);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <ViewTransition>
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BackLink />

                <ViewTransition name={`movie-poster-${movie.imdbID}`}>
                  {movie.Poster && movie.Poster !== "N/A" ? (
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-slate-900/50">
                      <Image
                        src={movie.Poster}
                        alt={movie.Title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority
                        loading="eager"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500 text-center p-4">
                        <ImageOff size={48} />

                        <p className="text-sm ">no image available</p>
                      </div>
                    </div>
                  )}
                </ViewTransition>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <ViewTransition name={`movie-title-${movie.imdbID}`}>
                    <h1 className="text-4xl font-bold text-white mb-2 ">
                      {movie.Title}
                    </h1>
                  </ViewTransition>

                  <div className="flex items-center space-x-4 text-gray-400 ">
                    <span>{movie.Year}</span>
                    <span>•</span>
                    <span>{movie.Runtime}</span>
                    <span>•</span>
                    <span className="capitalize">{movie.Type}</span>
                  </div>
                </div>

                {movie.imdbRating && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 font-bold text-2xl">
                        ★
                      </span>
                      <div>
                        <div className="text-white font-bold text-xl">
                          {movie.imdbRating}
                          <div className="text-gray-400 text-sm ">/10</div>
                        </div>
                      </div>
                    </div>
                    {movie.imdbVotes && (
                      <div className="text-gray-400 text-sm ">
                        {movie.imdbVotes} votes
                      </div>
                    )}
                  </div>
                )}

                {movie.Plot && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3 ">
                      plot
                    </h2>
                    <p className="text-gray-300 leading-relaxed ">
                      {movie.Plot}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {movie.Genre && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 ">
                        genre
                      </h3>
                      <p className="text-gray-300 ">{movie.Genre}</p>
                    </div>
                  )}

                  {movie.Director && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 ">
                        director
                      </h3>
                      <p className="text-gray-300 ">{movie.Director}</p>
                    </div>
                  )}

                  {movie.Writer && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 ">
                        writer
                      </h3>
                      <p className="text-gray-300 ">{movie.Writer}</p>
                    </div>
                  )}

                  {movie.Actors && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 ">
                        cast
                      </h3>
                      <p className="text-gray-300 ">{movie.Actors}</p>
                    </div>
                  )}

                  {movie.Released && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 ">
                        released
                      </h3>
                      <p className="text-gray-300 ">{movie.Released}</p>
                    </div>
                  )}

                  {movie.Rated && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 ">
                        rated
                      </h3>
                      <p className="text-gray-300 ">{movie.Rated}</p>
                    </div>
                  )}
                </div>

                {movie.Ratings && movie.Ratings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 ">
                      ratings
                    </h3>
                    <div className="space-y-2">
                      {movie.Ratings.map((rating, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-white/5 backdrop-blur-md rounded-lg p-3"
                        >
                          <span className="text-gray-300 ">
                            {rating.Source}
                          </span>
                          <span className="text-white font-semibold ">
                            {rating.Value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {movie.BoxOffice && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 ">
                      box office
                    </h3>
                    <p className="text-gray-300 ">{movie.BoxOffice}</p>
                  </div>
                )}

                {movie.Production && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 ">
                      production
                    </h3>
                    <p className="text-gray-300 ">{movie.Production}</p>
                  </div>
                )}

                {movie.Website && movie.Website !== "N/A" && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 ">
                      website
                    </h3>
                    <a
                      href={movie.Website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors "
                    >
                      {movie.Website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
