import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { useTheme } from "../hooks/useTheme.js";

export default function Layout() {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
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
