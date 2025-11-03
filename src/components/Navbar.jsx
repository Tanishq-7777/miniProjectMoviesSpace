import { Menu, X } from "lucide-react"; // icons
import { useState } from "react";
export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      {/* fixed outer bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-stone-800">
        <div className="nav-compo max-w-7xl mx-auto md:justify-between text-white flex items-center justify-evenly px-6 py-3">
          <div className="logo flex  items-center">
            <div className="ml-2 mr-2">
              <span className="md:text-2xl text-xl text-orange-500">M</span>
              <span>O</span>
              <span className="md:text-2xl text-xl text-green-600">V</span>
              <span>I</span>
              <span>E</span>
              <span className="md:text-2xl text-xl text-orange-500">S</span>
            </div>
            <div>
              <span className="md:text-2xl text-xl  text-green-500">S</span>
              <span>P</span>
              <span className="md:text-2xl text-xl  text-orange-500">A</span>
              <span>C</span>
              <span className="md:text-2xl text-xl  text-green-500">E</span>
            </div>
          </div>

          <div className="hidden space-x-4 md:block">
            <a href="#">Home</a>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="button-nav  md:hidden">
            <button onClick={() => setIsNavOpen((prev) => !prev)}>
              {isNavOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile dropdown (positioned below the fixed bar) */}
      {isNavOpen && (
        <div className="fixed top-16 left-0 right-0 md:hidden flex flex-col items-center bg-stone-800 space-y-4 py-6 gap-2 text-white">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>
      )}
    </>
  );
}
