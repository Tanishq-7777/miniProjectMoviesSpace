import { NavLink } from "react-router";
import Landing from "./Landing";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="min-h-screen w-full p-10 bg-stone-900">
      <Landing />
    </div>
  );
}
