import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import ReactPlayer from "react-player";
import BASE_URL from "../utils/constanst";

const Music = () => {
  const [music, setMusic] = useState([]);
  const [query, setQuery] = useState("lag ja gale");
  const navigate = useNavigate();

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
    if (!query) return;

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

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 100 });
    searchMusic();
  }, []);

  return (
    <div className="flex justify-center items-center p-4 bg-black min-h-screen">
      <div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        {/* SEARCH BAR */}
        <div className="p-4 sticky top-0 bg-gray-900 z-50 flex gap-2 border-b border-gray-700">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full rounded-xl bg-gray-800 text-white"
            placeholder="Search a song..."
          />

          <button
            onClick={searchMusic}
            className="btn bg-blue-600 hover:bg-blue-700 border-none rounded-xl text-white"
          >
            Go
          </button>
        </div>

        <div className="p-4 space-y-6">
          {music.map((song, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-3 shadow-lg border border-gray-700"
            >
              <div className="mt-3 rounded-xl overflow-hidden">
                <div className="relative pt-[56.25%] rounded-xl overflow-hidden">
                  <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${song.videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0"
                    onPlay={() => handleMusicHistory(song)}
                  />
                </div>
              </div>

              <div className="text-center mt-3">
                <h2 className="text-lg font-bold text-white">{song.title}</h2>
                <p className="text-sm text-gray-400">{song.author}</p>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-300 mt-3">
                <span>⏱ {song.duration}</span>

                <button
                  className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white rounded-lg"
                  onClick={() => downloadMusic(song.videoId)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Music;
