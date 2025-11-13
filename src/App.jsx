import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Movies from "./components/Movies";

export default function App() {
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
