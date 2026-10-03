import { useId, useRef } from "react";
import { emailContact, socials } from "../data/socials.js";
import { clampShift } from "../lib/clampShift.js";

const stroke = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

const glyphs = {
  email: (s) => (
    <svg {...stroke} width={s} height={s}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  github: (s) => (
    <svg {...stroke} width={s} height={s}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  x: (s) => (
    <svg viewBox="0 0 24 24" width={s - 2} height={s - 2} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (s) => (
    <svg {...stroke} width={s} height={s}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  instagram: (s) => (
    <svg {...stroke} width={s} height={s}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
};

function SocialLink({ social }) {
  const card = useRef(null);
  const link = useRef(null);
  const cardId = useId();

  // Keep the card inside the screen: measure when it is about to show.
  const place = () => {
    const hc = card.current;
    const a = link.current;
    if (!hc || !a) return;
    hc.classList.remove("moved");
    hc.style.left = "";
    const r = a.getBoundingClientRect();
    const shift = clampShift({ centerX: r.left + r.width / 2, cardWidth: hc.offsetWidth, viewportWidth: window.innerWidth });
    if (shift !== 0) {
      hc.classList.add("moved");
      hc.style.left = `${r.width / 2 - hc.offsetWidth / 2 + shift}px`;
    }
  };

  const external = social.id !== "email";
  return (
    <a
      ref={link}
      className="si"
      href={social.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={social.ariaLabel ?? `${social.label} profile`}
      aria-describedby={cardId}
      onPointerEnter={place}
      onFocus={place}
    >
      {glyphs[social.id](20)}
      <span ref={card} id={cardId} className="hc" role="tooltip">
        <span className="hh">
          <span className="hi">{glyphs[social.id](20)}</span>
          <span>
            <b>{social.label}</b>
            <em>{social.handle}</em>
          </span>
        </span>
        <span className="hd">{social.blurb}</span>
        <span className="ho">{social.cta ?? "Open profile"}</span>
      </span>
    </a>
  );
}

export default function SocialIcons({ small = false, up = false }) {
  return (
    <div className={["soc", small && "sm", up && "up"].filter(Boolean).join(" ")}>
      {[emailContact, ...socials].map((s) => (
        <SocialLink key={s.id} social={s} />
      ))}
    </div>
  );
}
