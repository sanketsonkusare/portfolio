import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/S_logo.png";



function Navbar({ menuOpen, setMenuOpen, theme, setTheme }) {
  const navigate = useNavigate();

  // On mount, set theme from localStorage or default to dark
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When theme changes, update html class and localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Close menu on route change (optional, for better UX)
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  },);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 shadow-sm transition-colors duration-300 ${theme === "dark" ? "bg-[#272727] bg-opacity-90" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <img className="w-12 h-12 object-contain" src={logo} alt="Logo" />
        </Link>
        <div className="flex items-center gap-4">
          {/* Theme Toggle First */}
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2 sm:mr-0 px-1 cursor-pointer flex items-center justify-center"
            tabIndex={0}
            type="button"
          >
            {theme === "dark" ? (
              // Lightning icon for light mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-400 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                tabIndex={-1}
                pointerEvents="none"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 2L3 14h7v8l8-12h-7z" />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-600 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                tabIndex={-1}
                pointerEvents="none"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          {/* Hamburger for mobile */}
          <div className="sm:hidden">
            <button
              aria-label="Open Menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              {menuOpen ? (
                // Close icon
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
          {/* Nav Links: always visible on sm and up, toggled on mobile */}
          <div
            className={`absolute sm:static top-full left-0 w-full sm:w-auto z-40 transition-all duration-200
              ${menuOpen ? 'flex' : 'hidden'} sm:flex`}
          >
            <div className={`${theme === "dark" ? "bg-[#272727] opacity-75" : "bg-white opacity-95"} w-full h-full absolute sm:hidden top-0 left-0 z-[-1]`} />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto relative">
              <div
                className="w-full sm:w-auto cursor-pointer"
                onClick={() => { setMenuOpen(false); navigate('/projects'); }}
              >
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `block w-full text-right transition px-3 py-1 rounded-lg ${
                      isActive
                        ? 'text-red-400'
                        : theme === "dark"
                          ? 'text-white hover:text-red-400'
                          : 'text-black hover:text-red-400'
                    }`
                  }
                  tabIndex={-1}
                >
                  Projects
                </NavLink>
              </div>
              <div
                className="w-full sm:w-auto cursor-pointer"
                onClick={() => { setMenuOpen(false); navigate('/resume'); }}
              >
                <NavLink
                  to="/resume"
                  className={({ isActive }) =>
                    `block w-full text-right transition px-3 py-1 rounded-lg ${
                      isActive
                        ? 'text-red-400'
                        : theme === "dark"
                          ? 'text-white hover:text-red-400'
                          : 'text-black hover:text-red-400'
                    }`
                  }
                  tabIndex={-1}
                >
                  Resume
                </NavLink>
              </div>
              <div
                className="w-full sm:w-auto cursor-pointer"
                onClick={() => { setMenuOpen(false); navigate('/built'); }}
              >
                <NavLink
                  to="/built"
                  className={({ isActive }) =>
                    `block w-full text-right transition px-3 py-1 rounded-lg ${
                      isActive
                        ? 'text-red-400'
                        : theme === "dark"
                          ? 'text-white hover:text-red-400'
                          : 'text-black hover:text-red-400'
                    }`
                  }
                  tabIndex={-1}
                >
                  Built
                </NavLink>
              </div>
              <div
                className="w-full sm:w-auto cursor-pointer"
                onClick={() => { setMenuOpen(false); navigate('/connect'); }}
              >
                <NavLink
                  to="/connect"
                  className={({ isActive }) =>
                    `block w-full text-right transition px-3 py-1 rounded-lg ${
                      isActive
                        ? 'text-red-400'
                        : theme === "dark"
                          ? 'text-white hover:text-red-400'
                          : 'text-black hover:text-red-400'
                    }`
                  }
                  tabIndex={-1}
                >
                  Connect
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
