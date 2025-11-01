import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
