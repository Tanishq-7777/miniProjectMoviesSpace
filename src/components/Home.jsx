import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import BASE_URL from "../utils/constanst";

const Home = () => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const getProfile = async () => {
    const res = await axios.get(BASE_URL + "user", {
      withCredentials: true,
    });
    if (res.data.length > 0) {
      navigate("/");
      setIsValid(true);
    }
  };
  useState(() => {
    getProfile();
  });
  if (isValid == false) {
    <div>
      <h1>Hey</h1>
    </div>;
  }
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
