import SocialIcons from "./SocialIcons.jsx";
import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer>
      <div className="fbar">
        <div className="l">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.location}</span>
        </div>
        <div className="r">
          <a className="btn p" href={`mailto:${profile.email}`}>Email me</a>
          <SocialIcons small up />
        </div>
      </div>
    </footer>
  );
}
