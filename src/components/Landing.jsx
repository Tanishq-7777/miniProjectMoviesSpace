import { use, useEffect, useState } from "react";

export default function Landing() {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const res = await fetch("https://www.omdbapi.com/?apikey=31188ba3&s=Love");
    const data = await res.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  console.log(movies);
  return (
    <div className="max-w-7xl m-auto text-4xl mt-5">
      <h1 className="text-white text-center">A Space of Movies</h1>
      <div className="movie-main mt-10 flex flex-wrap justify-center gap-10">
        {movies.map((movie) => {
          const { Poster } = movie;
          return (
            <div
              key={movie.imdbID}
              className="card w-1/2 md:w-1/3  h-60 bg-stone-800 rounded-lg flex items-center justify-center text-white"
            >
              <img
                className="h-full w-full object-cover rounded-lg"
                src={Poster}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
