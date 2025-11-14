const WhatWeOffer = () => {
  return (
    <section className="w-full bg-black text-white py-16 px-5 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white/5 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-xl font-bold mb-2">🔥 Trending Movies</h3>
          <p className="opacity-80">
            Stay updated with the most popular titles fetched from TMDB every
            day.
          </p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-xl font-bold mb-2">⭐ Top Rated Picks</h3>
          <p className="opacity-80">
            Explore the highest-rated films across the world in one place.
          </p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-xl font-bold mb-2">🎭 Genre Explorer</h3>
          <p className="opacity-80">
            Browse movies by Action, Romance, Thriller, Sci-Fi, Horror & more.
          </p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-xl font-bold mb-2">🎬 Detailed Information</h3>
          <p className="opacity-80">
            Get cast, release date, ratings, descriptions & trailers instantly.
          </p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-xl font-bold mb-2">📱 Responsive Experience</h3>
          <p className="opacity-80">
            A modern, fast React + Tailwind interface designed for all screens.
          </p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-xl font-bold mb-2">🔄 Daily Updates</h3>
          <p className="opacity-80">
            Fresh movie data synced automatically from TMDB.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
