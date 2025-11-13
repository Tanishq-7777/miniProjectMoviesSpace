const Trending = ({ movie }) => {
  return (
    <a
      href="#"
      className="group hover-3d my-10 cursor-pointer 
                 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[30%] 
                 relative perspective-1000"
    >
      <div
        className="relative card h-48 sm:h-56 md:h-80 rounded-2xl overflow-hidden shadow-lg 
                   transform-gpu transition-all duration-300 
                   group-hover:scale-[1.03]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-white/10 text-white backdrop-blur-[2px]">
          <div className="flex justify-between mb-1 items-center">
            <h3 className="text-base sm:text-lg font-bold truncate">
              {movie.title}
            </h3>
            <span className="px-2 py-1 text-xs bg-yellow-400 text-black rounded-md font-semibold">
              ⭐ {movie.vote_average}
            </span>
          </div>

          <div className="flex justify-between text-xs sm:text-sm opacity-80">
            <span className="font-semibold">
              {movie.original_language.toUpperCase()}
            </span>
            <span className="font-medium">
              {movie.release_date?.split("-")[0]}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Trending;
