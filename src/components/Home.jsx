import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className=" min-h-[81.7vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
