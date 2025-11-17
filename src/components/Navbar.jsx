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
    <nav className="backdrop-blur-md bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 border-b border-gray-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
              MOVIES SPACE
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Link
                to="/"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                to="/movies"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 font-medium"
              >
                Movies
              </Link>
              <Link
                to="/music"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
              >
                Music
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  New
                </span>
              </Link>
              <Link
                to="/history"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
              >
                History
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  New
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full ring-2 ring-purple-500/50 overflow-hidden">
                <img
                  alt="User avatar"
                  src={
                    photoUrl ||
                    "https://www.greengold.tv/assets/Character/CB/Bheem.jpg"
                  }
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={handleClick}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-200 font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Logout
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full ring-2 ring-purple-500/50 overflow-hidden">
              <img
                alt="User avatar"
                src={
                  photoUrl ||
                  "https://www.greengold.tv/assets/Character/CB/Bheem.jpg"
                }
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/movies"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 font-medium"
            >
              Movies
            </Link>
            <Link
              to="/music"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 font-medium"
            >
              <div className="flex items-center justify-between">
                <span>Music</span>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  New
                </span>
              </div>
            </Link>
            <button
              onClick={handleClick}
              className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-200 font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
