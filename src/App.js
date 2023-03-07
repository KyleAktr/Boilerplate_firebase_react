import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUpModal from "./components/SignUpModal";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <SignUpModal />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
