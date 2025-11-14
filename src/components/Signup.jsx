import BASE_URL from "@/utils/constanst";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  async function handleSignUp() {
    const res = await axios.post(
      BASE_URL + "user/signup",
      {
        name,
        photoUrl,
        email,
        password,
      },
      { withCredentials: true }
    );
    if (res.status == 200) {
      navigate("/");
    }
  }
  return (
    <div>
      <div className="hero flex justify-center  bg-accent min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-primary-content">
              Sign up now!
            </h1>
            <p className="py-6 w-80 text-secondary-content">
              Signup to continue your cinematic journey.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="label">PhotoUrl</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
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
                <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
                  Signup
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
