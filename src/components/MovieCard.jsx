import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const MovieCard = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const getMovieById = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=576fc1f6c367a4a896800f2bb0b637ef`
    );
    return res.json();
  };
  const getTrailer = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=576fc1f6c367a4a896800f2bb0b637ef`
    );
    const data = await res.json();

    const trailer = data.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (trailer) setTrailerKey(trailer.key);
  };

  useEffect(() => {
    getMovieById().then(setMovie);
    getTrailer();
  }, [movieId]);

  if (!movie) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="flex justify-center my-5 ">
      <div className="card bg-base-100 w-[600px] my-5 shadow-xl">
        <figure className="w-full">
          {trailerKey ? (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
              className="rounded-t-lg"
            ></iframe>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-t-lg"
            />
          )}
        </figure>

        <div className="card-body">
          <h2 className="card-title text-lg font-bold">
            {movie.title}
            <div className="badge badge-secondary ml-2">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>
          </h2>

          <p className="text-sm text-gray-600">{movie.overview}</p>

          <p className="text-sm mt-2">
            <strong>Release:</strong> {movie.release_date}
          </p>

          <div className="card-actions justify-start mt-3 flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <div key={genre.id} className="badge badge-outline">
                {genre.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
