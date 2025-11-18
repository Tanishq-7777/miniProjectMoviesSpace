import BASE_URL from "../utils/constanst";
import axios from "axios";
import React, { useEffect, useState } from "react";

const WatchList = () => {
  const [watchList, setWatchList] = useState([]);

  const getWatchList = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/getWatchList", {
        withCredentials: true,
      });
      setWatchList(res.data.data || []);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const deleteWatchList = async (movieId) => {
    try {
      await axios.delete(BASE_URL + `user/removeWatchList/${movieId}`, {
        withCredentials: true,
      });

      // update UI
      setWatchList((prev) => prev.filter((item) => item.movieId != movieId));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWatchList();
  }, []);

  return (
    <div className="p-6 bg-[#0f0f0f] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>

      {watchList.length === 0 && (
        <p className="text-center text-xl text-gray-400 mt-20">
          Your Watchlist is empty 😢
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchList.map((movie) => (
          <div
            key={movie.movieId}
            className="bg-[#181818] rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="w-full">
              {movie.trailerKey ? (
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                  title={movie.title}
                  className="w-full h-[200px] rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[200px] object-cover rounded-t-xl"
                />
              )}
            </div>

            <div className="p-4">
              <h2 className="font-semibold text-lg text-white flex items-center">
                {movie.title}
                <span className="badge badge-secondary ml-2">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
              </h2>

              <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                {movie.overview}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                <strong>Release:</strong> {movie.release_date}
              </p>

              {/* ⭐ Remove Button */}
              <button
                onClick={() => deleteWatchList(movie.movieId)}
                className="btn btn-error btn-sm w-full mt-3"
              >
                ❌ Remove from Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
