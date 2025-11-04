import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function MovieCast() {
  const navigate = useNavigate();
  const [singleMovie, setSingleMovie] = useState();
  const [singleMovieCast, setSingleMovieCast] = useState([]);
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
      setSingleMovie(data.primaryTitle);
      setSingleMovieCast(data.cast);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  console.log(singleMovie);
  return (
    <div className="w-full min-h-screen    bg-gradient-to-r from-[#ff512f] to-[#dd2476] flex flex-col p-2 justify-center items-center">
      <h1 className="font-bold">Cast of the Movie {singleMovie}</h1>
      <button
        className="px-4 py-1 mt-5  rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>

      <div className="flex flex-wrap gap-10 justify-center items-center p-10">
        {singleMovieCast.map((cast) => {
          return (
            <Link to={cast.url}>
              <div className="h-64 w-40 bg-white flex flex-col justify-center  border-4  rounded-2xl shadow-lg ">
                <div className="h-full ">
                  <img
                    className="h-52 w-42 rounded-2xl object-cover"
                    src={
                      cast.primaryImage
                        ? cast.primaryImage
                        : "https://icon-library.com/images/user-icon-free/user-icon-free-8.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="text-black text-center">
                  {cast.fullName.length >= 18
                    ? cast.fullName.slice(0, 18)
                    : cast.fullName}
                  .
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
