import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function GenreCard({ genreButton }) {
  const [genreData, setGenreData] = useState([]);
  const fetchMovies = async () => {
    const url = `https://imdb236.p.rapidapi.com/api/imdb/search?type=movie&genre=${
      genreButton ? genreButton : "Drama"
    }&rows=25&sortOrder=ASC&sortField=id`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "887ff7f35amsh28723ad62fabc8cp1283e8jsn6586831dc150",
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setGenreData(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [genreButton]);
  console.log(genreData);
  return (
    <div className="movie-main mt-10 flex flex-wrap justify-center gap-10">
      {genreData?.map((movie) => {
        const { id, primaryTitle, primaryImage } = movie;
        return (
          <Link
            key={id}
            to={`/movies/${id}`}
            className="card w-60 md:1/2 md:w-1/3 movie-container flex flex-col gap-6 border-16 border-stone-800 bg-black   rounded-lg item-center justify-center text-white"
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
  );
}
