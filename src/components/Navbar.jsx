import BASE_URL from "../utils/constanst";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const Navbar = () => {
  const [photoUrl, setPhotoUrl] = useState();

  const navigate = useNavigate();
  const getUserInfo = async () => {
    const user = await axios.get(BASE_URL + "user", {
      withCredentials: true,
    });
    setPhotoUrl(user.data.data.photoUrl);
    console.log(user);
  };
  async function handleClick() {
    await axios.post(BASE_URL + "user/logout", {}, { withCredentials: true });
    navigate("/login");
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  console.log(photoUrl);
  return (
    <div className="">
      <div className="px-10 text-red-500  navbar bg-primary shadow-sm ">
        <div className="flex-1 ">
          <a className="btn btn-ghost font-mono text-xl">MOVIES SPACE</a>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    photoUrl ||
                    "https://www.greengold.tv/assets/Character/CB/Bheem.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleClick}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
