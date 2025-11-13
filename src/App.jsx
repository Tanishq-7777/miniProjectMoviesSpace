import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Movies from "./components/Movies";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: false, // animation runs every scroll
    });
  }, []);
  return (
    <div data-theme="lofi" className="w-full">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
