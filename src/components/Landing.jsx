import React from "react";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div>
      <div
        className="hero min-h-[81.7vh]"
        style={{
          backgroundImage:
            "url(https://wallpapers.com/images/hd/poster-background-hlybuowt1whxbh2z.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold ">Movies Space</h1>
            <p className="mb-5 font-bold">
              MovieSpace is your personal gateway to the world of cinema —
              discover trending movies, explore detailed reviews, track your
              favourites, and enjoy a smooth, modern experience built for movie
              lovers. Whether you're searching for something new to watch or
              exploring classics, MovieSpace brings everything together in one
              simple, elegant platform.
            </p>
            <Link to="/movies">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
