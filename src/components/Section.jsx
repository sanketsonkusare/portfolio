import { Link } from "react-router-dom";

export default function Section({ title, link, children }) {
  return (
    <section>
      <h2>
        {title}
        {link && <Link to={link.to}>{link.label}</Link>}
      </h2>
      {children}
    </section>
  );
}
