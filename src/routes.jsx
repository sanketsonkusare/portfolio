import { Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Experience from "./pages/Experience.jsx";
import Projects from "./pages/Projects.jsx";

const toHome = { element: <Navigate to="/" replace />, handle: { redirectTo: "/" } };

// Old pages (Blogs, Built, Connect, Resume) and unknown URLs land on Home.
export const routes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/experience", element: <Experience /> },
      { path: "/projects", element: <Projects /> },
      { path: "*", ...toHome },
    ],
  },
];
