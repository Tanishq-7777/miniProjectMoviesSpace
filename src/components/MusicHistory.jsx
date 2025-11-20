import BASE_URL from "../utils/constanst";
import axios from "axios";
import { useEffect, useState } from "react";

const MusicHistory = () => {
  const [musicHistory, setMusicHistory] = useState();

  const getMovieHistory = async () => {
    const data = await axios.get(BASE_URL + "user/getMusicHistory", {
      withCredentials: true,
    });
    setMusicHistory(data.data);
  };

  const removeHistory = async (videoId) => {
    try {
      await axios.delete(`${BASE_URL}user/deleteMusicHistory/${videoId}`, {
        withCredentials: true,
      });

      setMusicHistory((prev) => prev.filter((item) => item.videoId != videoId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieHistory();
  }, [musicHistory]);

  return (
    <div className="min-h-[81.7vh] bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center tracking-wide text-purple-400">
        🎵 Your Music History
      </h1>

      {!musicHistory && (
        <p className="text-center text-gray-400 text-lg">Loading...</p>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {musicHistory &&
          musicHistory.data &&
          musicHistory.data.map((item, index) => (
            <div
              key={index}
              className="
              bg-white/5 backdrop-blur-xl border border-white/10 
              shadow-xl rounded-2xl p-4 transition-all 
              hover:scale-[1.03] hover:shadow-2xl hover:border-purple-500/50
              duration-300"
            >
              <h2 className="font-bold text-lg mb-1 text-purple-300">
                {item.title}
              </h2>
              <p className="text-sm text-gray-400 mb-4">{item.author}</p>

              <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg mb-4">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${item.videoId}`}
                  title={item.title}
                  allowFullScreen
                ></iframe>
              </div>
              <button
                onClick={() => removeHistory(item.videoId)}
                className="w-full bg-red-600/80 hover:bg-red-700 text-white py-2 rounded-lg font-semibold shadow-md transition"
              >
                Remove
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MusicHistory;
