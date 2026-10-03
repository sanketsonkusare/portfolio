import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { useTheme } from "../hooks/useTheme.js";

export default function Layout() {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    // Keep the browser's own scroll position on first load and reload; reset only on navigation.
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return (
    <>
      <ProgressBar />
      <Header theme={theme} onToggle={toggle} />
      <Outlet />
      <Footer />
    </>
  );
}
