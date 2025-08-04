import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-[#1E1E1E] min-h-screen pt-20">
        <Outlet />
      </div>
    </>
  );
}

export default App;
