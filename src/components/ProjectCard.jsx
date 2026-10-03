import { Link } from "react-router-dom";

const ext = { target: "_blank", rel: "noopener noreferrer" };

export default function ProjectCard({ project: p, variant = "full" }) {
  const cls = p.featured ? "card wide" : "card";
  const image = (
    <div className="im">
      <img src={p.image} alt="" loading="lazy" />
    </div>
  );
  const title = (
    <h3>
      {p.title}
      {p.featured && <span className="tag">Featured</span>}
    </h3>
  );

  if (variant === "preview") {
    return (
      <Link className={cls} to="/projects">
        {image}
        <div className="bd">
          {title}
          <p>{p.preview}</p>
          <div className="st">{p.previewStack}</div>
        </div>
      </Link>
    );
  }

  return (
    <article className={cls}>
      {image}
      <div className="bd">
        {title}
        <p>{p.description}</p>
        <div className="st">{p.stack}</div>
        <div className="lk">
          {p.live && <a href={p.live} {...ext}>{p.liveLabel ?? "Live"}</a>}
          {p.github && <a href={p.github} {...ext}>GitHub</a>}
        </div>
      </div>
    </article>
  );
}
