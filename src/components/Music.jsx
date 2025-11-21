import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import ReactPlayer from "react-player";
import BASE_URL from "../utils/constanst";

const Music = () => {
  const [music, setMusic] = useState([]);
  const [query, setQuery] = useState("lag ja gale");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const downloadMusic = async (link) => {
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${link}`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8a75c35cd3msh47bea06b172383ep17e501jsn190ac1c2224e",
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const downloadUrl = data.link;

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
    }
  };

  const searchMusic = async () => {
    if (!query.trim()) return;

    if (inputRef.current) {
      inputRef.current.blur();
    }

    setIsLoading(true);

    const url = `https://youtube-music-api3.p.rapidapi.com/search?q=${query}&type=song`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "8a75c35cd3msh47bea06b172383ep17e501jsn190ac1c2224e",
        "x-rapidapi-host": "youtube-music-api3.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMusic(result.result.slice(0, 10));
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMusicHistory = async (song) => {
    const { author, title, thumbnail, videoId } = song;

    try {
      await axios.post(
        BASE_URL + "user/sendMusicHistory",
        { author, title, thumbnail, videoId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchMusic();
  };

  useEffect(() => {
    Aos.init({ duration: 800, offset: 100 });
    searchMusic();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-down">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2">
            🎵 Music Explorer
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Discover, Stream, and Download Your Favorite Tracks
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-10" data-aos="fade-up">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex gap-3 bg-white/5 backdrop-blur-xl rounded-2xl p-3 border border-white/10 shadow-2xl">
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base"
                  placeholder="Search for any song, artist, or album..."
                  autoComplete="off"
                  style={{ fontSize: "16px" }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Search</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">
                Finding the best tracks for you...
              </p>
            </div>
          </div>
        )}

        {/* Music Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {music.map((song, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
              >
                {/* Video Player */}
                <div className="relative aspect-video bg-black/50">
                  <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${song.videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    onPlay={() => handleMusicHistory(song)}
                    config={{
                      youtube: {
                        playerVars: { modestbranding: 1 },
                      },
                    }}
                  />
                </div>

                {/* Song Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-purple-400 transition-colors">
                        {song.title}
                      </h3>
                      <p className="text-sm text-gray-400 truncate flex items-center gap-2">
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {song.author}
                      </p>
                    </div>

                    {song.duration && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-lg text-xs text-gray-300 flex-shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {song.duration}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => downloadMusic(song.videoId)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <svg
                      className="w-5 h-5 group-hover/btn:animate-bounce"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download MP3
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && music.length === 0 && (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="text-6xl mb-4">🎸</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Songs Found
            </h3>
            <p className="text-gray-400">
              Try searching for a different artist or song
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
