import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Footer from "./components/Footer";
import Genre from "./components/Genre";
import MovieCast from "./components/MovieCast";

export default function App() {
  const [input, setInput] = useState();
  return (
    <BrowserRouter>
      {/* <Navbar input={input} setInput={setInput} /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:id" element={<MovieDetails />}></Route>
        <Route path="/movies/:id/cast" element={<MovieCast />}></Route>
        <Route path="/genre" element={<Genre />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
