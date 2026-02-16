import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/S_logo.png";

const navLinks = [
  { to: null, label: "Blogs", href: "https://blog.sanketsonkusare.me/", external: true },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Experience" },
  { to: "/built", label: "Built" },
  { to: "/connect", label: "Connect" },
];

function Navbar({ menuOpen, setMenuOpen, theme, setTheme }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
      document.documentElement.classList.toggle("light", storedTheme === "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  },);

  const handleNav = (link) => {
    setMenuOpen(false);
    if (link.to) navigate(link.to);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
      style={{
        background: theme === "dark" ? "rgba(26,26,26,0.9)" : "rgba(250,250,250,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme === "dark" ? "#2a2a2a" : "#e5e5e5"}`,
      }}
    >
      <div className="max-w-3xl mx-auto px-5 py-3 flex justify-between items-center">
        <Link to="/">
          <img className="w-9 h-9 object-contain" src={logo} alt="Logo" />
        </Link>

        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <div className="sm:hidden">
            <button
              aria-label="Open Menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 rounded-lg"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === "dark" ? "text-white" : "text-black"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme === "dark" ? "text-white" : "text-black"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${theme === "dark" ? "text-[#a0a0a0] hover:text-white" : "text-gray-500 hover:text-black"
                    }`}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive
                      ? theme === "dark" ? "text-white bg-[#2a2a2a]" : "text-black bg-gray-200"
                      : theme === "dark" ? "text-[#a0a0a0] hover:text-white" : "text-gray-500 hover:text-black"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Theme toggle */}
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-lg text-sm cursor-pointer transition-colors ${theme === "dark" ? "text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]" : "text-gray-500 hover:text-black hover:bg-gray-200"
              }`}
            type="button"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden"
            style={{
              background: theme === "dark" ? "#1a1a1a" : "#fafafa",
              borderTop: `1px solid ${theme === "dark" ? "#2a2a2a" : "#e5e5e5"}`,
            }}
          >
            <div className="px-5 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label} onClick={() => handleNav(link)} className="cursor-pointer">
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block py-2 px-3 rounded-lg text-sm ${theme === "dark" ? "text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]" : "text-gray-500 hover:text-black hover:bg-gray-100"
                        }`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-lg text-sm ${isActive
                          ? theme === "dark" ? "text-white bg-[#2a2a2a]" : "text-black bg-gray-200"
                          : theme === "dark" ? "text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]" : "text-gray-500 hover:text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
