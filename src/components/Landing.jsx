import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

export default function Landing() {
  const [input, setInput] = useState("war");
  const [movies, setMovies] = useState([]);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  console.log(input);
  const fetchMovies = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=31188ba3&s=${input}`
    );
    const data = await res.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    fetchMovies();
  }, [input]);
  console.log(movies);
  return (
    <div className="max-w-7xl m-auto text-2xl mt-5 flex flex-col justify-center">
      <div className="m-auto p-10">
        <input
          type="text"
          className="bg-white h-7 hidden md:block p-5 w-76 rounded-4xl  text-black outline-none"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className="movie-main mt-10 flex flex-wrap justify-center gap-10">
        {movies?.map((movie) => {
          const { Title, Poster } = movie;
          return (
            <Link
              key={movie.imdbID}
              to={`/movies/${movie.imdbID}`}
              className="card w-1/2 md:w-1/3 movie-container flex flex-col gap-6 border-16 border-stone-800   rounded-lg item-center justify-center text-white"
            >
              <div className="h-full w-full  rounded-t-lg">
                <img
                  className=" h-60 w-full object-cover"
                  src={Poster}
                  alt={Title}
                />
              </div>
              <div className="p-2 bg-stone-900 text-white text-center truncate">
                <p className="text-sm font-semibold">{Title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
