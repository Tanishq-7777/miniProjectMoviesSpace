import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="m-auto rounded-3xl  w-[80%] z-50 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-2 ">
          <div className="nav-compo max-w-7xl mx-auto text-white flex items-center justify-between px-12 py-3">
            <div className="logo flex items-center font-bold tracking-wide">
              <div className="ml-2 mr-2">
                <span className="md:text-2xl text-xl text-black">M</span>
                <span>O</span>
                <span className="md:text-2xl text-xl text-green-600">V</span>
                <span>I</span>
                <span>E</span>
                <span className="md:text-2xl text-xl text-black">S</span>
              </div>
              <div>
                <span className="md:text-2xl text-xl text-green-500">S</span>
                <span>P</span>
                <span className="md:text-2xl text-xl text-black">A</span>
                <span>C</span>
                <span className="md:text-2xl text-xl text-green-500">E</span>
              </div>
            </div>

            <div className="hidden space-x-6 md:flex">
              <a href="#" className="hover:text-orange-400 transition">
                Home
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                About Us
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                Contact Us
              </a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsNavOpen(!isNavOpen)}>
                {isNavOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isNavOpen && (
        <div className="flex justify-center">
          <div className="md:hidden m-auto  w-[80%] rounded-3xl flex flex-col items-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] space-y-4 py-6 text-white">
            <Link to="/" className="hover:text-orange-400 transition">
              Home
            </Link>
            <Link href="#" className="hover:text-orange-400 transition">
              Genre
            </Link>
            <Link href="#" className="hover:text-orange-400 transition">
              WhishList
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
