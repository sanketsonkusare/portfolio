const socialLinks = [
  { href: "https://www.linkedin.com/in/sanketsonkusare/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
  { href: "https://github.com/sanketsonkusare", icon: "fa-brands fa-github", label: "GitHub" },
  { href: "https://x.com/sassysanket", icon: "fa-brands fa-x-twitter", label: "Twitter/X" },
  { href: "https://www.instagram.com/sassysanket/", icon: "fa-brands fa-instagram", label: "Instagram" },
];

function Footer({ theme }) {
  const isDark = theme === "dark";
  return (
    <footer
      className="w-full py-6 text-center mt-auto transition-colors duration-300"
      style={{
        borderTop: `1px solid ${isDark ? "#2a2a2a" : "#e5e5e5"}`,
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-3 justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="social-icon"
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <span className={`text-xs ${isDark ? "text-[#666]" : "text-gray-400"}`}>
          &copy; {new Date().getFullYear()} Sanket Sonkusare
        </span>
      </div>
    </footer>
  );
}

export default Footer;
