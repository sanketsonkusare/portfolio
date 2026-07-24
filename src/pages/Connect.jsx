import { motion } from "framer-motion";

const contactLinks = [
  {
    icon: "fa-brands fa-linkedin-in",
    label: "LinkedIn",
    value: "Sanket Sonkusare",
    href: "https://www.linkedin.com/in/sanketsonkusare/",
    color: "#0a66c2",
  },
  {
    icon: "fa-brands fa-x-twitter",
    label: "Twitter / X",
    value: "@sassysanket",
    href: "https://x.com/sassysanket",
    color: "#1d9bf0",
  },
  {
    icon: "fa-brands fa-instagram",
    label: "Instagram",
    value: "@sassysanket",
    href: "https://www.instagram.com/sassysanket/",
    color: "#e1306c",
  },
  {
    icon: "fa-brands fa-github",
    label: "GitHub",
    value: "sanketsonkusare",
    href: "https://github.com/sanketsonkusare",
    color: "#8b5cf6",
  },
  {
    icon: "fa-solid fa-envelope",
    label: "Email",
    value: "sanketsonkusare01@gmail.com",
    href: "mailto:sanketsonkusare01@gmail.com",
    color: "#ef4444",
  },
  {
    icon: "fa-solid fa-location-dot",
    label: "Location",
    value: "Bengaluru, India",
    href: null,
    color: "#4ade80",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Connect({ theme }) {
  const isDark = theme === "dark";

  return (
    <div className="connect-page min-h-screen px-5 py-10 flex items-center justify-center">
      <div className="connect-panel max-w-2xl w-full">
        <div className="connect-overlay" aria-hidden="true" />

        <div className="connect-content relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 connect-header"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2 connect-heading">
              Hi There! 👋
            </h1>
            <p
              className={`text-sm leading-relaxed connect-intro ${isDark ? "text-[#a0a0a0]" : "text-gray-500"}`}
            >
              I'm Sanket,<br></br>
              a 24 year old AI engineer. <br />
              I code to make money, then spend it proteinmaxxing.
              <br />
              Follow me on social media to keep up with my journey.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 connect-links"
          >
            {contactLinks.map((link) => {
              const Wrapper = link.href ? "a" : "div";
              const wrapperProps = link.href
                ? {
                    href: link.href,
                    target: link.href.startsWith("http") ? "_blank" : undefined,
                    rel: link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined,
                  }
                : {};

              return (
                <motion.div
                  key={link.label}
                  variants={cardVariants}
                  className="min-w-0"
                >
                  <Wrapper
                    {...wrapperProps}
                    aria-label={`${link.label}: ${link.value}`}
                    title={`${link.label}: ${link.value}`}
                    className={`connect-card group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                      link.href ? "cursor-pointer" : ""
                    } ${
                      isDark
                        ? "border-[#2a2a2a] bg-[#1e1e1e] hover:border-[#444] hover:bg-[#252525]"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                    style={{ ["--accent-color"]: link.color }}
                  >
                    <div
                      className="connect-card-icon w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{
                        background: `${link.color}15`,
                        border: `1px solid ${link.color}30`,
                      }}
                    >
                      <i
                        className={`${link.icon} text-base`}
                        style={{ color: link.color }}
                      ></i>
                    </div>
                    <div className="connect-card-text min-w-0 flex-1 overflow-hidden">
                      <p
                        className={`connect-card-label text-[11px] uppercase tracking-wider font-medium ${
                          isDark ? "text-[#555]" : "text-gray-400"
                        }`}
                      >
                        {link.label}
                      </p>
                      <p
                        className={`connect-card-value text-sm font-medium truncate transition-colors duration-200 ${
                          isDark
                            ? "text-[#ccc] group-hover:text-white"
                            : "text-gray-800 group-hover:text-black"
                        }`}
                      >
                        {link.value}
                      </p>
                    </div>
                    {link.href && (
                      <i
                        className={`connect-card-arrow fa-solid fa-arrow-right text-xs ml-auto flex-shrink-0 transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 ${
                          isDark ? "text-white" : "text-black"
                        }`}
                      ></i>
                    )}
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Connect;
