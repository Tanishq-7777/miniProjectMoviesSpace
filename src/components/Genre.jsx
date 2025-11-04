import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Button from "./Button";
import MovieDetails from "./MovieDetails";
import GenreCard from "./GenreCard";
import Footer from "./Footer";

export default function Genre() {
  const [genreButton, setGenreButton] = useState("");
  const [genre, setGenre] = useState([]);
  const fetchMovies = async () => {
    const url = `https://imdb236.p.rapidapi.com/api/imdb/genres`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5633d15da1msh0473b559c7dccf4p17efafjsn9a6221588109",
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setGenre(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  console.log(genreButton);
  return (
    <div className="w-full min-h-screen    bg-gradient-to-r from-[#ff512f] to-[#dd2476] ">
      <div className="py-4">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <div className="w-full min-h-10 flex flex-wrap justify-center   text-white">
          {genre.map((genres) => {
            return (
              <Button
                key={Math.random()}
                genres={genres}
                setGenreButton={setGenreButton}
              />
            );
          })}
        </div>
        <div className="">
          <GenreCard genreButton={genreButton} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
