import BASE_URL from "../utils/constanst";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    const res = await axios.post(
      BASE_URL + "user/login",
      { email, password },
      { withCredentials: true }
    );
    if (res.data) {
      navigate("/");
    }

    console.log(res);
  };
  function handleLogin() {
    login();
  }

  return (
    <div>
      <div className="hero flex justify-center  bg-accent min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-primary-content">
              Login now!
            </h1>
            <p className="py-6 w-80 text-secondary-content">
              Login to continue your cinematic journey.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <Link to="/signup" className="link link-hover font-mono">
                    New User? Sign up here
                  </Link>
                </div>
                <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                  Login
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
