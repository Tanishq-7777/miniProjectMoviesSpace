import BASE_URL from "../utils/constanst";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [photoUrl, setPhotoUrl] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const getUserInfo = async () => {
    const user = await axios.get(BASE_URL + "user", {
      withCredentials: true,
    });
    setPhotoUrl(user.data.data.photoUrl);
  };

  async function handleClick() {
    await axios.post(BASE_URL + "user/logout", {}, { withCredentials: true });
    navigate("/login");
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <nav className="bg-[#0c0c0c] border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <h1 className="text-2xl font-bold text-white tracking-wide group-hover:text-purple-400 transition">
            MovieSpace
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="relative text-gray-300 hover:text-white transition font-medium"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all"></span>
          </Link>

          <Link
            to="/movies"
            className="relative text-gray-300 hover:text-white transition font-medium"
          >
            Movies
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 hover:w-full transition-all"></span>
          </Link>

          <Link
            to="/music"
            className="relative text-gray-300 hover:text-white transition font-medium"
          >
            Music
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 hover:w-full transition-all"></span>
          </Link>

          <Link
            to="/watchList"
            className="relative text-gray-300 hover:text-white transition font-medium"
          >
            Watchlist
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 hover:w-full transition-all"></span>
          </Link>

          <Link
            to="/history"
            className="relative text-gray-300 hover:text-white transition font-medium"
          >
            History
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 hover:w-full transition-all"></span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500">
            <img
              src={
                photoUrl ||
                "https://www.greengold.tv/assets/Character/CB/Bheem.jpg"
              }
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={handleClick}
            className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition"
          >
            Logout
          </button>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white transition text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#111] py-3 space-y-2 px-6 text-gray-300">
          {["Home", "Movies", "Music", "Watchlist", "History"].map(
            (item, i) => (
              <Link
                key={i}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            )
          )}

          <button
            onClick={handleClick}
            className="w-full text-left py-2 text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
