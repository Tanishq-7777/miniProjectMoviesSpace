import { NavLink } from "react-router";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen w-full p-5 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    </div>
  );
}
