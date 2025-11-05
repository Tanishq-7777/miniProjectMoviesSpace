import { Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto  flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-wide">
            <span className="text-orange-500">M</span>OV
            <span className="text-green-500">I</span>ES
            <span className="text-orange-500">S</span>P
            <span className="text-green-500">A</span>CE
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            © {new Date().getFullYear()} MovieSpace. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link to="/" className="hover:text-orange-400 transition">
            Home
          </Link>
          <Link to="/genre" className="hover:text-orange-400 transition">
            Genre
          </Link>
          <a href="#" className="hover:text-orange-400 transition">
            Help
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            to="https://www.instagram.com/tanishq_saxena07/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-orange-400 transition"
          >
            <Instagram size={22} />
          </Link>
          <Link
            to="https://www.linkedin.com/in/tanishq-saxena-20bb75344"
            target="_blank"
            className="hover:text-green-400 transition"
          >
            <Linkedin size={22} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
