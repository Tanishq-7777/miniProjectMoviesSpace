import BASE_URL from "../utils/constanst";
import axios from "axios";
import { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState();

  const getHistoryData = async () => {
    const data = await axios.get(BASE_URL + "user/getHistory", {
      withCredentials: true,
    });
    setHistory(data.data);
  };

  useEffect(() => {
    getHistoryData();
  }, []);

  return (
    <div className="px-6 py-8 min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide">
        🎬 Your Watch History
      </h1>

      {!history ? (
        <p className="text-gray-400">Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-500 text-lg">You have no watch history yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7">
          {history.map((movie) => (
            <div
              key={movie._id}
              className="relative bg-[#111113] rounded-2xl overflow-hidden shadow-xl border border-white/5 transition-all duration-300 hover:scale-[1.06] hover:shadow-2xl hover:border-red-500/40 group"
            >
              <div className="relative">
                {movie.trailerKey ? (
                  <div className="relative overflow-hidden">
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                      title={movie.title}
                      className="rounded-t-2xl transition-all duration-300 group-hover:opacity-95"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="h-52 flex items-center justify-center bg-black/50 text-gray-400">
                    No Trailer Available
                  </div>
                )}
              </div>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
