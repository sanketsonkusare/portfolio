function Footer({ theme }) {
  return (
    <footer className={`w-full z-50 shadow-md py-4 text-center mt-auto transition-colors duration-300
      ${theme === "dark" ? "bg-[#272727] bg-opacity-90 text-gray-300" : "bg-white text-black"}
    `}>
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-6 justify-center text-2xl mb-1">
          <a
            href="https://x.com/sassysanket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter/X"
            className={theme === "dark" ? "text-gray-400 hover:text-white transition" : "text-gray-600 hover:text-red-400 transition"}
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a
            href="https://github.com/sanketsonkusare"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={theme === "dark" ? "text-gray-400 hover:text-white transition" : "text-gray-600 hover:text-red-400 transition"}
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/sanketsonkusare/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={theme === "dark" ? "text-gray-400 hover:text-white transition" : "text-gray-600 hover:text-red-400 transition"}
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            href="https://www.instagram.com/sassysanket/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={theme === "dark" ? "text-gray-400 hover:text-white transition" : "text-gray-600 hover:text-red-400 transition"}
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
        <span className="text-sm">&copy; {new Date().getFullYear()} Sanket Sonkusare. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
