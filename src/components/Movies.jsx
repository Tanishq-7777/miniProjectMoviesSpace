import { useEffect, useState } from "react";

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const fetchMovies = async () => {
    const url = "https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "fad3cf5020msh4873e60572eb5b6p18be83jsn8a2c1d80ad54",
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
              <div
                key={movie.id}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
