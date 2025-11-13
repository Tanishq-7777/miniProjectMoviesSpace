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
        <div className="carousel w-full rounded-2xl h-[81.7vh]">
          {movies?.map((movie, index) => {
            return (
              <div
                id={`slide${index}`}
                key={movie.id}
                className="carousel-item relative w-full"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="w-full"
                  alt={movie.title}
                />

                {/* ARROWS */}
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  {/* Previous Slide */}
                  <a
                    href={`#slide${
                      index === 0 ? movies.length - 1 : index - 1
                    }`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>

                  {/* Next Slide */}
                  <a
                    href={`#slide${
                      index === movies.length - 1 ? 0 : index + 1
                    }`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex  flex-wrap justify-between px-10">
        {topRated?.map((movies) => {
          return (
            <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">
              <div
                className="card w-96 h-60 text-white bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden relative "
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,
                }}
              >
                <div className="card-body">
                  <div className="flex justify-between mb-10">
                    <div className="font-bold">{movies.title}</div>
                  </div>
                  <div className="text-lg mb-4 opacity-40"></div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs opacity-90">Movie Rating</div>
                      <div className="text-white font-bold">
                        {movies.vote_average}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-white font-bold opacity-90">
                        Language
                      </div>
                      <div className="text-white font-bold">
                        {movies.original_language.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8 empty divs needed for the 3D effect */}
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
