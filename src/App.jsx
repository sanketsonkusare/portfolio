import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Built from "./pages/Built";
import Connect from "./pages/Connect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-[#171717]" : "bg-gray-200"}`}> 
      <Router>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} theme={theme} setTheme={setTheme} />
        <div className={`flex-1 transition-all duration-200 ${menuOpen ? 'blur-sm' : ''} ${theme === "dark" ? "text-white" : "text-black"}`}>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/projects" element={<Projects theme={theme} />} />
            <Route path="/resume" element={<Resume theme={theme} />} />
            <Route path="/built" element={<Built theme={theme} />} />
            <Route path="/connect" element={<Connect theme={theme} />} />
          </Routes>
        </div>
        <Footer theme={theme} setTheme={setTheme} />
      </Router>
    </div>
  );
}

export default App;
