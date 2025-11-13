import Aos from "aos";
import "aos/dist/aos.css";
import React, { useActionState, useEffect, useState } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const getPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=576fc1f6c367a4a896800f2bb0b637ef`
    );
    const top = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=576fc1f6c367a4a896800f2bb0b637ef`
    );
    const data = await res.json();
    const data2 = await top.json();
    setMovies(data.results.slice(0, 5));
    setTopRated(data2.results.slice(0, 6));
  };
  console.log(topRated);
  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 100,
    });
    getPopularMovies();
  }, []);
  return (
    <div className="bg-black  min-h-[81.7vh] flex flex-col items-center justify-center gap-10 px-4">
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

                  <button className="px-3 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-300 transition-all text-sm sm:text-base">
                    More Details
                  </button>
                </div>

                <div className="absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-black/40 to-transparent"></div>

                <div className="absolute left-3 right-3 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 justify-between">
                  <button
                    onClick={() => {
                      const prevIndex =
                        index === 0 ? movies.length - 1 : index - 1;
                      document
                        .getElementById(`slide${prevIndex}`)
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn btn-circle glass bg-white/10 hover:bg-white/30 text-white border-none"
                  >
                    ❮
                  </button>

                  <button
                    onClick={() => {
                      const nextIndex =
                        index === movies.length - 1 ? 0 : index + 1;
                      document
                        .getElementById(`slide${nextIndex}`)
                        .scrollIntoView({ behavior: "smooth" });
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
        <h1 className="text-2xl mt-10 sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-md text-center px-2">
          Most Popular
        </h1>
      </div>
      <div
        data-aos="fade-right"
        className="flex flex-wrap justify-center gap-6 px-2 sm:px-10 w-full"
      >
        {topRated?.map((movie) => {
          return (
            <a
              href="#"
              key={movie.id}
              className="group hover-3d my-10 cursor-pointer w-[90%] sm:w-[45%] md:w-[30%] lg:w-[30%] relative perspective-1000"
            >
              <div
                className="relative card h-48 sm:h-56 md:h-80 rounded-2xl overflow-hidden shadow-lg 
               transform-gpu transition-all duration-300 
               group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-4 bg-white/10 text-white backdrop-blur-[2px]">
                  <div className="flex justify-between mb-1 items-center">
                    <h3 className="text-base sm:text-lg font-bold truncate">
                      {movie.title}
                    </h3>

                    <span className="px-2 py-1 text-xs bg-yellow-400 text-black rounded-md font-semibold">
                      ⭐ {movie.vote_average}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs sm:text-sm opacity-80">
                    <span className="font-semibold">
                      {movie.original_language.toUpperCase()}
                    </span>
                    <span className="font-medium">
                      {movie.release_date?.split("-")[0]}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[inset_0_0_50px_rgba(0,0,0,0.7)] transition-all"></div>
              </div>

              <div className="absolute inset-0 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"></div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
