import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { profile } from "../data/profile.js";

const active = ({ isActive }) => (isActive ? "on" : undefined);

export default function Header({ theme, onToggle }) {
  return (
    <header>
      <div className="bar">
        <Link className="brand" to="/">{profile.name}</Link>
        <nav aria-label="Main">
          <NavLink to="/experience" className={active}>Experience</NavLink>
          <NavLink to="/projects" className={active}>Projects</NavLink>
          <ThemeToggle theme={theme} onToggle={onToggle} />
        </nav>
      </div>
    </header>
  );
}
