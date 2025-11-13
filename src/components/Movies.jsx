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
    setMovies(data.results);
    setTopRated(data2.results);
  };
  console.log(topRated);
  useEffect(() => {
    getPopularMovies();
  }, []);
  return (
    <div className="bg-black min-h-[81.7vh] flex flex-col items-center justify-center gap-10">
      <div className="w-[70%] ">
        <div className="carousel w-full rounded-2xl h-[81.7vh] shadow-2xl overflow-hidden">
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

                <div className="absolute bottom-10 left-10 text-white space-y-3">
                  <h2 className="text-4xl font-bold drop-shadow-xl">
                    {movie.title}
                  </h2>

                  <p className="text-lg opacity-80 max-w-xl">
                    ⭐ {movie.vote_average} — Released: {movie.release_date}
                  </p>

                  <button className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-300 transition-all">
                    More Details
                  </button>
                </div>

                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/40 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/40 to-transparent"></div>

                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button
                    onClick={() => {
                      const prevIndex =
                        index === 0 ? movies.length - 1 : index - 1;
                      document
                        .getElementById(`slide${prevIndex}`)
                        .scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "start",
                        });
                    }}
                    className="btn btn-circle glass bg-white/10 hover:bg-white/30 backdrop-blur-md text-white border-none"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => {
                      const nextIndex =
                        index === movies.length - 1 ? 0 : index + 1;
                      document
                        .getElementById(`slide${nextIndex}`)
                        .scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "start",
                        });
                    }}
                    className="btn btn-circle glass bg-white/10 hover:bg-white/30 backdrop-blur-md text-white border-none"
                  >
                    ❯
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-md">
        Most Popular Movies Of All Time
      </h1>
      <div className="flex  flex-wrap justify-between px-10">
        {topRated?.map((movie) => {
          return (
            <a
              href="#"
              key={movie.id}
              className="group hover-3d my-12 mx-2 cursor-pointer transition-all duration-300"
            >
              <div
                className="relative card w-96 h-60 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                {/* Glass card content */}
                <div className="absolute bottom-0 left-0 w-full p-4  bg-white/10 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold truncate">
                      {movie.title}
                    </h3>
                    <span className="px-2 py-1 text-xs bg-yellow-400 text-black rounded-md font-semibold">
                      ⭐ {movie.vote_average}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm opacity-90">
                    <span className="font-semibold">
                      {movie.original_language.toUpperCase()}
                    </span>

                    <span className="font-medium">
                      {movie.release_date?.split("-")[0]}
                    </span>
                  </div>
                </div>

                {/* Smooth hover shadow */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[inset_0_0_40px_rgba(0,0,0,0.7)] transition-all"></div>
              </div>

              {/* Your 8 empty divs for 3D effect */}
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
