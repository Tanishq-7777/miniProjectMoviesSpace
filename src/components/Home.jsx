import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";

const Home = () => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const getProfile = async () => {
    const res = await axios.get("http://localhost:7777/user", {
      withCredentials: true,
    });
    if (res.data.length > 0) {
      navigate("/");
      setIsValid(true);
    }

    console.log(res);
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
