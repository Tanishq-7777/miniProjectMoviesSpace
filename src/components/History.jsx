import BASE_URL from "../utils/constanst";
import axios from "axios";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const History = () => {
  const [history, setHistory] = useState([]);

  const getHistoryData = async () => {
    const data = await axios.get(BASE_URL + "user/getHistory", {
      withCredentials: true,
    });
    setHistory(data.data);
  };

  const removeHistory = async (movieId) => {
    try {
      await axios.delete(BASE_URL + `user/deleteHistory/${movieId}`, {
        withCredentials: true,
      });

      setHistory((prev) => prev.filter((item) => item.videoId !== videoId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 100 });
    getHistoryData();
  }, [history]);

  return (
    <div className="px-6 py-8 min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide">
        🎬 Your Watch History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500 text-lg">You have no watch history yet.</p>
      ) : (
        <div
          data-aos="fade-left"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          lg:grid-cols-4 xl:grid-cols-5 gap-7"
        >
          {history.map((movie) => (
            <div
              key={movie._id}
              className="relative bg-[#111113] rounded-2xl overflow-hidden 
              shadow-xl border border-white/5 transition-all duration-300 
              hover:scale-[1.06] hover:shadow-2xl hover:border-red-500/40 group"
            >
              {/* Trailer or Poster */}
              <div className="relative">
                {movie.trailerKey ? (
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                    title={movie.title}
                    className="rounded-t-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="h-52 w-full object-cover rounded-t-2xl"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1 truncate group-hover:text-red-400 transition">
                  {movie.title}
                </h2>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300 flex items-center gap-1">
                    ⭐ {movie.vote_average}
                  </p>
                  <span className="text-gray-500 text-xs">
                    {movie.release_date}
                  </span>
                </div>

                <p className="text-gray-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                  {movie.overview}
                </p>
                <button
                  onClick={() => removeHistory(movie.movieId)}
                  className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white 
                  py-1.5 rounded-lg text-sm transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
