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
      `https://www.omdbapi.com/?apikey=31188ba3&s=${
        input ? input : "war"
      }&type=movie`
    );
    const data = await res.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    fetchMovies();
  }, [input]);
  console.log(movies);
  return (
    <div className="max-w-12xl m-auto text-2xl mt-5 flex flex-col justify-center">
      <div className="w-full flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search your movie..."
          value={input}
          onChange={handleInputChange}
          className="w-[50%] md:w-[60%] bg-gradient-to-r from-[#ff512f] to-[#dd2476] 
         placeholder-white shadow-[0_0_20px_rgba(255,100,100,0.5)]  lg:w-[40%] p-4 rounded-3xl text-black text-lg outline-none shadow-lg focus:shadow-xl transition-all duration-300"
        />
      </div>
      <div className="movie-main mt-10 flex flex-wrap justify-center gap-10">
        {movies?.map((movie) => {
          const { Title, Poster } = movie;
          return (
            <Link
              key={movie.imdbID}
              to={`/movies/${movie.imdbID}`}
              className="card w-60 md:1/2 md:w-1/3 movie-container flex flex-col gap-6 border-16 border-stone-800 bg-black   rounded-lg item-center justify-center text-white"
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
