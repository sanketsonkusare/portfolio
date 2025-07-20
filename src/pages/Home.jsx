import profilePic from "../assets/1000136928.jpg";

function Home({ theme }) {
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${theme === "dark" ? "bg-transparent" : "bg-gray-200"}`}>
      <div className="w-full max-w-6xl ">
        <div className="mx-auto my-40 flex flex-col md:flex-row items-center justify-between gap-12 pt-20">
          {/* Left Side: align with Portfolio */}
          <div className="flex-1 min-w-[250px] md:min-w-[320px] text-left md:pl-0">
            <h2 className={`text-base md:text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
              👋 Hey there!
            </h2>
            <h1 className={`text-2xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
              I'm <span className="font-bold">Sanket Sonkusare</span>
            </h1>
            <div className=" h-1 bg-red-400 rounded mb-6" />
            <p className={`text-sm md:text-2xl max-w-xl ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
              Crafting the future through Design, Development, Data, and
              Discipline.
            </p>
            {/* Social Icons */}
            <div className="flex gap-6 mt-6 text-2xl">
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
            {/* Resume Download Button */}
            <div className="mt-6">
              <a
                href="/src/assets/Sanket_Sonkusare_Resume.pdf"
                download
                className="inline-block px-6 py-2 rounded-lg bg-red-400 text-white text-sm md:text-xl font-semibold shadow hover:bg-red-600 transition"
              >
                Resume <i class="fa-solid fa-download"></i>
              </a>
            </div>
          </div>
          {/* Right Side: align with last nav item */}
          <div className="flex-1 flex items-center justify-end md:pr-0">
            <div className={`w-52 h-52 md:w-82 md:h-82 rounded-full border-4 border-red-400 flex items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
              <img
                src={profilePic}
                alt="Sanket Sonkusare"
                className="w-full h-full object-cover rounded-full"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className={`text-2xl md:text-4xl font-bold mt-16 ${theme === "dark" ? "text-white" : "text-black"}`}>
            About me
          </h1>
          <div className={`my-10 text-sm/5 md:text-2xl/10 mx-4 md:mx-10 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            <p>
              I'm currently immersing myself in the world of Data Science as an
              MTech student, driven by a passion for building intelligent
              systems with Machine Learning and Deep Learning.
            </p>
            <p>
              Beyond the algorithms and data, I'm a hands-on MERN Stack
              Developer, actively building awesome full-stack projects. I thrive
              on bringing ideas to life with technology.
            </p>
          </div>
          <div className={`my-10 text-sm/5 md:text-xl/10 mx-4 md:mx-10 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            <h2 className="text-xl md:text-2xl font-bold text-red-400 mb-2">My Toolkit</h2>
            <div className={`my-10 mx-10 rounded-lg overflow-hidden shadow-lg border ${theme === "dark" ? "bg-[#181818] border-gray-700" : "bg-gray-100 border-gray-300"}`}>
              <div className={`flex items-center px-4 py-2 border-b ${theme === "dark" ? "bg-[#232323] border-gray-700" : "bg-gray-200 border-gray-300"}`}>
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className={`ml-4 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>stack.js</span>
              </div>
              <pre className={`p-4 text-xs font-mono whitespace-pre overflow-x-auto ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                <code>
                  {`const stack = {
                  frontend: ['React', 'Tailwind CSS', 'JavaScript'],
                  backend: ['Node.js', 'Express.js', 'MongoDB'],
                  ml_ai: ['Python', 'TensorFlow', 'Scikit-Learn','FastAPI'],
                  tools: ['Git', 'VS Code', 'Jupyter', 'Postman']
                };`}
                </code>
              </pre>
            </div>
            <h2 className="mt-15 text-xl md:text-2xl font-bold text-red-400 mb-2">
              My Journey & Passions
            </h2>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-200" : "text-black"}`}>
              I'm not just about the code! I believe in a balanced life, which
              for me means a strong focus on fitness. I'm proud to be a Silver
              Medalist in University Bodybuilding, and I love sharing my journey
              in this space.
            </p>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-200" : "text-black"}`}>
              When I need to clear my head, you'll often find me with a flute in
              hand. Music is my meditation – I can play almost anything!
            </p>

            <h2 className="mt-10 text-xl md:text-2xl font-bold text-red-400 mb-2">My random stats</h2>
            <ul className={`list-disc pl-6 text-sm/5 md:text-xl/10 mb-6 ${theme === "dark" ? "text-gray-300" : "text-black"}`}>
              <li>Can solve rubik's cube under 69 secs</li>
              <li>Current Skeletal Muscle Mass : 35kgs</li>
              <li>Can hold breath for 2+ mins</li>
              <li>Suffering from hyperhydrosis</li>
            </ul>
            <h2 className="mt-15 text-xl md:text-2xl font-bold text-red-400 mb-2 mt-8">
              My Philosophy
            </h2>
            <p className={`italic border-l-4 border-red-400 pl-4 mb-4 ${theme === "dark" ? "text-gray-200" : "text-black"}`}>
              "You either lift heavy weights or heavy code. I do both."
            </p>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-200" : "text-black"}`}>
              This fun fact encapsulates my approach to life – balancing
              intellectual rigor with physical discipline.
            </p>
            <p className={`mt-6 ${theme === "dark" ? "text-gray-200" : "text-black"}`}>
              Thanks for stopping by! Let's build, lift, and grow together.{" "}
              <span role="img" aria-label="muscle">
                💪
              </span>
              <span role="img" aria-label="fire">
                🔥
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
