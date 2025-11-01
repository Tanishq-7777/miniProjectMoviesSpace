import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-stone-900">
      <Navbar />
      <Landing />
    </div>
  );
}
