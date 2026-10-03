import SocialIcons from "./SocialIcons.jsx";
import { profile } from "../data/profile.js";

export default function Hero() {
  const { bio } = profile;
  return (
    <div className="hero">
      <div className="load">
        <h1>{profile.name}</h1>
        <div className="role">{profile.title}</div>
        <div className="loc">{profile.location}</div>
        <p className="bio">
          {bio.before}
          <b>{bio.strong}</b>
          {bio.after}
        </p>
        <div className="acts">
          <a className="btn p" href={profile.resumeUrl}>Download resume</a>
        </div>
        <SocialIcons />
      </div>
      <img className="photo load d2" src={profile.photo} alt={profile.name} width="172" height="172" fetchPriority="high" />
    </div>
  );
}
