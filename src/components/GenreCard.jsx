import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";
import Trending from "./Trending";

const GenreCard = () => {
  const [genreCard, setGenreCard] = useState([]);
  const { genreId } = useParams();
  const fetchMoviesByGenre = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=576fc1f6c367a4a896800f2bb0b637ef&with_genres=${genreId}`
    );
    const data = await res.json();
    setGenreCard(data.results);
    return data.results;
  };
  useEffect(() => {
    fetchMoviesByGenre();
  }, []);
  return (
    <div
      data-aos="fade-right"
      className="flex flex-wrap justify-center gap-6 px-2 sm:px-10 w-full"
    >
      {genreCard?.map((movie, index) => {
        return <Trending key={index} movie={movie} />;
      })}
    </div>
  );
};

export default GenreCard;
