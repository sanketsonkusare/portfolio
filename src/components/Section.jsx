import { Link } from "react-router-dom";

// `link` is { to, label } for a page on this site, or { href, label } for an external page.
export default function Section({ title, link, children }) {
  return (
    <section>
      <h2>
        {title}
        {link?.href && (
          <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
        )}
        {link?.to && <Link to={link.to}>{link.label}</Link>}
      </h2>
      {children}
    </section>
  );
}
