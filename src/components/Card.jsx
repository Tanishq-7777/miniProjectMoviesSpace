import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Trending from "./Trending";

const Card = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const searchMovies = async (query) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=576fc1f6c367a4a896800f2bb0b637ef&query=${query}`
    );
    const data = await res.json();
    setMovies(data.results.slice(0, 4));
  };
  useEffect(() => {
    searchMovies(query);
  }, [query]);

  return (
    <div className="flex flex-wrap justify-center gap-6 px-2 sm:px-10 w-full">
      {movies?.map((movie, index) => {
        return <Trending key={index} movie={movie} />;
      })}
    </div>
  );
};

export default Card;
