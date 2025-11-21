import { Link } from "react-router";
import logo from "../assets/Black White Modern Letter A Logo Design.png";
const Footer = () => {
  return (
    <footer className="bg-[#0c0c0c] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center py-1 pr-6 lg:pr-10">
              <img
                src={logo}
                alt="App Logo"
                className="h-10 w-auto scale-250  object-contain origin-center"
              />
            </Link>

            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Muvies. All rights reserved.
            </p>
          </div>

          <nav className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/tanishq-saxena-20bb75344/" // your LinkedIn URL here
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#181818] text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239
      5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11
      19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764
      s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75
      1.764zm13.5 11.268h-3v-5.604c0-1.337-.027-3.059-1.865-3.059
      -1.865 0-2.152 1.459-2.152 2.968v5.695h-3v-10h2.881v1.367h.041c.401-.761
      1.379-1.562 2.839-1.562 3.036 0 3.6 2.036 3.6 4.685v5.51z"
                />
              </svg>
            </a>

            <a
              href="https://www.youtube.com/@tanishqsaxena07"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#181818] text-gray-400 hover:bg-purple-500/20 hover:text-purple-400 transition-all duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 
                  0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 
                  8.549 4.385 8.816 3.6.245 11.626.246 15.23 
                  0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185
                  -.484-8.549-4.385-8.816zm-10.615 
                  12.816v-8l8 3.993-8 4.007z"
                ></path>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/tanishq_saxena07/"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#181818] text-gray-400 hover:bg-pink-500/20 hover:text-pink-400 transition-all duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 
      0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 
      1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 
      1.346-3 3-3h10zm-5 3c-2.757 0-5 2.243-5 5s2.243 5 5 5 
      5-2.243 5-5-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 
      3-3 3-3-1.346-3-3 1.346-3 3-3zm4.5-4a1.5 1.5 
      0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
