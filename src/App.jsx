import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import BASE_URL from "./utils/constanst";

// Pages / Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Movies from "./components/Movies";
import MovieCard from "./components/MovieCard";
import GenreCard from "./components/GenreCard";
import Music from "./components/Music";
import History from "./components/History";
import MusicHistory from "./components/MusicHistory";
import WatchList from "./components/WatchList";
import ProtectRoutes from "./components/ProtectRoutes";

export default function App() {
  const [backendReady, setBackendReady] = useState(false);

  // 🔥 Wake up Render backend (ONLY ONCE PER SESSION)
  useEffect(() => {
    const warmBackend = async () => {
      const isWarm = sessionStorage.getItem("backend_warm");

      if (isWarm) {
        setBackendReady(true);
        return;
      }

      try {
        await axios.get(`${BASE_URL}health`);
      } catch (err) {
      } finally {
        sessionStorage.setItem("backend_warm", "true");
        setBackendReady(true);
      }
    };

    warmBackend();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  if (!backendReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4 text-lg font-semibold">Waking up server… 🚀</p>
        </div>
      </div>
    );
  }

  return (
    <div data-theme="lofi" className="w-full scroll-smooth">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectRoutes>
                <Home />
              </ProtectRoutes>
            }
          >
            <Route index element={<Landing />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:movieId" element={<MovieCard />} />
            <Route path="genreDetail/:genreId" element={<GenreCard />} />
            <Route path="music" element={<Music />} />
            <Route path="history" element={<History />} />
            <Route path="musichistory" element={<MusicHistory />} />
            <Route path="watchlist" element={<WatchList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
