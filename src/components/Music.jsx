import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";
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

      console.log(result);
      setMusic(result.result.slice(0, 10));
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 100,
    });
    searchMusic();
  }, []);

  return (
    <div
      data-aos="fade-out"
      className="flex justify-center no-scrollbar items-center  p-4 bg-gradient-to-br from-black via-gray-900 to-gray-800"
    >
      <div
        data-aos="fade-left"
        className="mockup-phone border-[#ff8938]  shadow-2xl h-150 w-75"
      >
        <div className="mockup-phone-camera"></div>

        <div className="mockup-phone-display bg-base-100 h-full overflow-y-auto p-4 pt-10 space-y-4 ">
          <div className="flex gap-2 sticky top-0 bg-base-100 pt-2 pb-4 z-50">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              className="input input-bordered w-full rounded-xl text-black"
              placeholder="Lag ja gale..."
            />
            <button
              onClick={searchMusic}
              className="btn bg-[#ff8938] border-none rounded-xl text-white"
            >
              Go
            </button>
          </div>

          {music.map((song, index) => (
            <div
              key={index}
              className="bg-gray-900/80 p-3 rounded-2xl shadow-xl space-y-3"
            >
              <iframe
                className="w-full h-52 rounded-xl shadow-lg"
                src={`https://www.youtube.com/embed/${song.videoId}`}
                title={song.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="text-center">
                <h2 className="text-lg font-bold text-white">{song.title}</h2>
                <p className="text-sm text-gray-300">{song.author}</p>
              </div>

              <div className="flex justify-between text-sm text-gray-400">
                <span>Duration: {song.duration}</span>
                <button
                  className=" btn btn-primary"
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
