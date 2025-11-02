import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";

export default function MovieDetails() {
  const [singleMovie, setSingleMovie] = useState([]);
  const { id } = useParams();
  const fetchMovies = async () => {
    const url = `https://imdb236.p.rapidapi.com/api/imdb/${id}`;
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
      <div className="h-120 w-160 movie-container rounded-lg border-4 border-green-300  bg-stone-900 text-white flex flex-col items-center justify-center">
        <div>
          <ReactPlayer src={singleMovie.trailer} />
        </div>
        <div>
          <div>Title : {singleMovie.primaryTitle}</div>
          <div>Rating : {singleMovie.averageRating}</div>
          <div>Rated: {singleMovie.contentRating}</div>
          <div>Story : {singleMovie.description}</div>
        </div>
      </div>
    </div>
  );
}
