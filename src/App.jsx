import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Built from "./pages/Built";
import Blogs from "./pages/Blogs";
import Connect from "./pages/Connect";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

function AnimatedRoutes({ theme }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home theme={theme} /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects theme={theme} /></PageWrapper>} />
        <Route path="/blogs" element={<PageWrapper><Blogs theme={theme} /></PageWrapper>} />
        <Route path="/resume" element={<PageWrapper><Resume theme={theme} /></PageWrapper>} />
        <Route path="/built" element={<PageWrapper><Built theme={theme} /></PageWrapper>} />
        <Route path="/connect" element={<PageWrapper><Connect theme={theme} /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-wrapper"
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  return (
    <div
      className="flex flex-col min-h-screen transition-colors duration-300"
      style={{ background: theme === "dark" ? "#1a1a1a" : "#fdf8f3" }}
    >
      <ParticleBackground theme={theme} />
      <Router>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} theme={theme} setTheme={setTheme} />
        <div className={`flex-1 relative z-10 ${menuOpen ? 'blur-sm pointer-events-none' : ''} ${theme === "dark" ? "text-[#e5e5e5]" : "text-[#1a1a1a]"}`}>
          <AnimatedRoutes theme={theme} />
        </div>
        <Footer theme={theme} />
      </Router>
    </div>
  );
}

export default App;
