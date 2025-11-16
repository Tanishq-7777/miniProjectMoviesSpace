import Aos from "aos";
import "aos/dist/aos.css";
import React, { useActionState, useEffect, useState } from "react";
import Trending from "./Trending";
import Genre from "./Genre";
import WhatWeOffer from "./WhatWeOffer";
import { Link } from "react-router";
import Card from "./Card";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [query, setQuery] = useState("Pyaar");
  const getPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=576fc1f6c367a4a896800f2bb0b637ef`
    );
    const top = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=576fc1f6c367a4a896800f2bb0b637ef`
    );
    const data = await res.json();
    const data2 = await top.json();
    setMovies(data.results.slice(3, 8));
    setTopRated(data2.results.slice(0, 6));
  };
  console.log(topRated);
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 100,
    });
    getPopularMovies();
  }, []);
  return (
    <div className="bg-black   overflow-x-hidden flex flex-col items-center justify-center gap-10 px-4">
      <div className="w-full md:w-[85%] lg:w-[70%]">
        <div
          data-aos="fade-up"
          className="carousel w-full rounded-2xl h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[75vh] 
             shadow-2xl overflow-hidden"
          style={{
            scrollBehavior: "smooth",
            scrollSnapType: "x mandatory",
            overflowX: "auto",
          }}
        >
          {movies?.map((movie, index) => {
            return (
              <div
                id={`slide${index}`}
                key={movie.id}
                className="carousel-item relative w-full"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="w-full h-full object-cover"
                  alt={movie.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90"></div>

                <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 text-white space-y-2 sm:space-y-3">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-xl">
                    {movie.title}
                  </h2>

                  <p className="text-sm sm:text-base opacity-80 max-w-lg">
                    ⭐ {movie.vote_average} — Released: {movie.release_date}
                  </p>
                  <Link to={`/movies/${movie.id}`}>
                    <button className="px-3 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-300 transition-all text-sm sm:text-base">
                      More Details
                    </button>
                  </Link>
                </div>

                <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-black/40 to-transparent"></div>

                <div className="absolute left-3 right-3 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 justify-between">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const prevIndex =
                        index === 0 ? movies.length - 1 : index - 1;
                      const carousel = document.getElementById(
                        `slide${prevIndex}`
                      );
                      carousel?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    }}
                    className="btn btn-circle glass bg-white/10 hover:bg-white/30 text-white border-none"
                  >
                    ❮
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const nextIndex =
                        index === movies.length - 1 ? 0 : index + 1;
                      const carousel = document.getElementById(
                        `slide${nextIndex}`
                      );
                      carousel?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    }}
                    className="btn btn-circle glass bg-white/10 hover:bg-white/30 text-white border-none"
                  >
                    ❯
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1
          data-aos="zoom-out"
          className="text-2xl mt-10 sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-md text-center px-2"
        >
          Most Popular
        </h1>
      </div>
      <div
        data-aos="fade-right"
        className="flex flex-wrap justify-center gap-6 px-2 sm:px-10 w-full"
      >
        {topRated?.map((movie, index) => {
          return <Trending key={index} movie={movie} />;
        })}
      </div>
      <div>
        <h1
          data-aos="zoom-in"
          className="text-2xl mt-10 sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-md text-center px-2"
        >
          Genres
        </h1>
      </div>
      <div data-aos="fade-left">
        <Genre />
      </div>
      <div>
        <h1 className="text-2xl mt-10 sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-md text-center px-2">
          What we Offer
        </h1>
      </div>
      <div data-aos="fade-bottom">
        <WhatWeOffer />
      </div>
      <div data-aos="fade-right">
        <h1 className="text-2xl mt-10 sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-md text-center px-2">
          Search Your Favourite Movie
        </h1>
      </div>
      <div
        data-aos="fade-right"
        className="flex flex-wrap justify-center gap-6 px-2 sm:px-10 w-full"
      >
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-72 sm:w-96 px-4 py-2 rounded-xl 
             bg-white/10 backdrop-blur-md border border-white/20 
             text-white placeholder-gray-300
             focus:outline-none focus:ring-2 focus:ring-purple-500 
             transition-all duration-300"
        />

        <Card query={query} />
      </div>
    </div>
  );
};

export default Movies;
