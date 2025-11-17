import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Movies from "./components/Movies";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MovieCard from "./components/MovieCard";
import GenreCard from "./components/GenreCard";
import ProtectRoutes from "./components/ProtectRoutes";
import Signup from "./components/Signup";
import Music from "./components/Music";
import History from "./components/History";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div data-theme="lofi" className="w-full  scroll-smooth">
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
            <Route path="/music" element={<Music />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
