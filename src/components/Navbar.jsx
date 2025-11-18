import BASE_URL from "../utils/constanst";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [photoUrl, setPhotoUrl] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const user = await axios.get(BASE_URL + "user", {
        withCredentials: true,
      });

      setPhotoUrl(user.data.data.photoUrl);
      setUserName(user.data.data.name);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  async function handleClick() {
    try {
      await axios.post(BASE_URL + "user/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Movies", to: "/movies" },
    { name: "Music", to: "/music" },
    { name: "Watchlist", to: "/watchList" },
    { name: "History", to: "/history" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#0a0a0a] via-[#101010] to-[#0a0a0a] border-b border-gray-800/60 shadow-2xl backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center group py-1">
          <svg
            className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            ></path>
          </svg>

          <h1 className="text-2xl font-extrabold text-white ml-2 tracking-wider group-hover:text-purple-300 transition">
            MovieSpace
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="relative text-gray-300 hover:text-white transition text-sm font-semibold group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Desktop User Elements */}
        <div className="hidden md:flex items-center gap-5">
          {/* Welcome */}
          {userName && (
            <div className="hidden lg:flex text-sm bg-white/5 px-3 py-1.5 rounded-lg text-gray-300 border border-white/10 shadow-lg backdrop-blur-md">
              Welcome,{" "}
              <span className="ml-1 text-purple-400 font-bold">{userName}</span>
            </div>
          )}

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500 shadow-md cursor-pointer hover:ring-purple-300 transition">
            <img
              src={
                photoUrl ||
                "https://www.greengold.tv/assets/Character/CB/Bheem.jpg"
              }
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Logout */}
          <button
            onClick={handleClick}
            className="px-4 py-1.5 bg-red-600/80 hover:bg-red-700 text-white text-sm rounded-lg shadow-md transition font-medium"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white transition text-3xl p-1"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-[#111] py-4 px-6 text-gray-300 space-y-2 border-t border-gray-800">
          {/* Mobile Profile Section */}
          <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500">
              <img
                src={
                  photoUrl ||
                  "https://www.greengold.tv/assets/Character/CB/Bheem.jpg"
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {userName ? (
              <p className="text-base text-white font-semibold">
                Welcome, <span className="text-purple-400">{userName}</span>
              </p>
            ) : (
              <p className="text-base text-white font-semibold">Loading...</p>
            )}
          </div>

          {/* Mobile Nav Links */}
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="block py-2 px-3 hover:bg-gray-800 rounded-lg text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile logout */}
          <button
            onClick={() => {
              handleClick();
              setIsMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-red-400 hover:bg-gray-800 rounded-lg mt-4 border-t border-gray-800 pt-3 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
