function Connect({ theme }) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
      <div className="max-w-6xl">
        <h1 className={`text-2xl md:text-4xl font-bold mb-4 text-red-400 ${theme === "dark" ? "text-red-400" : "text-red-500"}`}>Let's Connect</h1>
        <p className={`text-sm md:text-lg mb-6 text-left max-w-2xl ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
          Whether you have a project idea, a question about my work, or just want to say hello, I'd love to hear from you.
        </p>
        <div className={`text-8xl text-center my-15 text-red-400 animate-bounce`}><i className="fa-solid fa-handshake"></i></div>
          {/* Social Media List in same section as mail/location, icons match color */}
          <div className="mb-6 flex flex-col gap-2 text-lg md:text-xl">
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-linkedin-in text-2xl text-red-400"></i>
              <a
                href="https://www.linkedin.com/in/sanketsonkusare/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-red-400 transition font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
              >
                Sanket Sonkusare
              </a>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-x-twitter text-2xl text-red-400"></i>
              <a
                href="https://x.com/sassysanket"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-red-400 transition font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
              >
                sassysanket
              </a>
            </div>
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-instagram text-2xl text-red-400"></i>
              <a
                href="https://www.instagram.com/sassysanket/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-red-400 transition font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
              >
                sassysanket
              </a>
            </div>
            <div className={`flex items-center gap-2 text-lg md:text-xl mt-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
              <i className="fa-solid fa-envelope text-red-400"></i>
              <a
                href="mailto:sanketsonkusare01@gmail.com"
                className={`text-base md:text-lg hover:text-red-400 ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                sanketsonkusare01@gmail.com
              </a>
            </div>
            <div className={`flex items-center gap-2 text-lg md:text-xl mt-2 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
              <i className="fa-solid fa-location-dot text-red-400"></i>
              <p className={`text-base md:text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>Pune</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Connect;
