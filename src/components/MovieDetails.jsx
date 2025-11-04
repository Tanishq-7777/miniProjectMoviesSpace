import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import { Card } from "./Card";

export default function MovieDetails() {
  const [singleMovie, setSingleMovie] = useState([]);
  const { id } = useParams();
  const fetchMovies = async () => {
    const url = `https://imdb236.p.rapidapi.com/api/imdb/${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4ea82d44dbmsh7b354a828f8f444p12260bjsncc24febb35a8",
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSingleMovie(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  console.log(singleMovie);
  return (
    <div className="w-full h-screen  bg-stone-900 flex items-center justify-center">
      <Card singleMovie={singleMovie} id={id} />
    </div>
  );
}
