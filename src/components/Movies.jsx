import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const fetchMovies = async () => {
    const url =
      "https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "ffc834759cmshd405526cfe22042p1548a8jsn04b0664f2de5",
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMoviesList(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  console.log(moviesList);
  return (
    <div className="min-h-screen w-full bg-stone-900">
      <div className="max-w-7xl m-auto text-2xl">
        <h1 className="text-white text-center">Top 100 Trending Movies</h1>
        <div className="movie-main mt-10 flex flex-wrap justify-center gap-10">
          {moviesList.map((movie) => {
            const { primaryTitle, primaryImage } = movie;
            return (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="card w-1/2 md:w-1/3 flex flex-col gap-6 border-16 border-stone-800   rounded-lg item-center justify-center text-white"
              >
                <div className="h-full w-full  rounded-t-lg">
                  <img
                    className=" h-60 w-full object-cover"
                    src={primaryImage}
                    alt={primaryTitle}
                  />
                </div>
                <div className="p-2 bg-stone-900 text-white text-center truncate">
                  <p className="text-sm font-semibold">{primaryTitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
