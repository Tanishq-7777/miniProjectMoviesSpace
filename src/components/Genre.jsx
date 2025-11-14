import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router";
const Genre = () => {
  const [genre, setGenre] = useState([]);

  const getGenre = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=576fc1f6c367a4a896800f2bb0b637ef&language=en`
    );
    const data = await res.json();
    setGenre(data.genres.slice(0, 8));
  };
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 100,
    });
    getGenre();
  }, []);
  console.log(genre);
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-10 justify-center my-10 backdrop-blur-  py-5 w-[90%] ">
        {genre.map((singleGenre) => {
          return (
            <NavLink
              to={`/genreDetail/${singleGenre.id}`}
              key={singleGenre.id}
              className="hover-3d group cursor-pointer"
            >
              <figure
                className="w-60 h-32 rounded-xl bg-gradient-to-br from-black via-neutral-900 to-neutral-800
 backdrop-blur-xl flex items-center justify-center shadow-xl"
              >
                <div className="h-12 w-12 bg-white/20 rounded-xl backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition duration-300">
                  <span className="text-white text-lg font-bold">
                    {singleGenre.name.slice(0, 1)}
                  </span>
                </div>

                <div className="absolute bottom-2 bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
                  <p className="text-white font-medium text-sm tracking-wide">
                    {singleGenre.name}
                  </p>
                </div>
              </figure>

              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Genre;
