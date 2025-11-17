import BASE_URL from "../utils/constanst";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const MovieCard = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

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

    return trailer ? trailer.key : null;
  };

  const sendUserHistory = async (movieId, movie, trailerKey) => {
    const { title, vote_average, release_date, poster_path, overview } = movie;
    const genres = (movie.genres || []).map((g) =>
      typeof g === "string" ? g : g.name
    );
    await axios.post(
      BASE_URL + "user/sendHistory",
      {
        title,
        movieId,
        vote_average,
        release_date,
        trailerKey,
        poster_path,
        overview,
        genres,
      },
      {
        withCredentials: true,
      }
    );
  };

  useEffect(() => {
    const load = async () => {
      const movieData = await getMovieById();
      setMovie(movieData);

      const trailer = await getTrailer();
      setTrailerKey(trailer);

      sendUserHistory(movieId, movieData, trailer);
    };

    load();
  }, [movieId]);
  if (!movie) return <p className="text-center text-white">Loading...</p>;
  console.log(movie);
  return (
    <div className="my-5">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline ml-5 mb-4"
      >
        ← Back
      </button>

      <div className="flex justify-center">
        <div className="card bg-base-100 w-[600px] shadow-xl">
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
    </div>
  );
};

export default MovieCard;
