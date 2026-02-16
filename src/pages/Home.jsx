import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profilePic from "../assets/1000136928.jpg";
import resumePDF from "../assets/Sanket_Sonkusare_Resume.pdf";

const roles = ["an AI Engineer.", "a Full Stack Developer.", "a Body Builder."];

const tools = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
];

const aiTools = [
  { name: "LangChain", icon: "🦜" },
  { name: "LangGraph", icon: "🔀" },
  { name: "RAG", icon: "🔍" },
  { name: "Multi-Agent AI", icon: "🤖" },
  { name: "NLP", icon: "💬" },
  { name: "FastMCP", icon: "⚡" },
  { name: "MediaPipe", icon: "📹" },
];

const socialLinks = [
  { href: "/", icon: "fa-solid fa-house", label: "Home" },
  { href: "https://github.com/sanketsonkusare", icon: "fa-brands fa-github", label: "GitHub" },
  { href: "https://www.linkedin.com/in/sanketsonkusare/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
  { href: "https://x.com/sassysanket", icon: "fa-brands fa-x-twitter", label: "Twitter" },
  { href: "https://www.instagram.com/sassysanket/", icon: "fa-brands fa-instagram", label: "Instagram" },
];

function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 1800) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentWord.substring(0, text.length - 1)
            : currentWord.substring(0, text.length + 1)
        );
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

function LiveClock({ theme }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("en-IN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  return (
    <span className={`status-bar ${theme === "dark" ? "text-[#4ade80]" : "text-green-600"}`}>
      IN {formatted}
    </span>
  );
}

function Home({ theme }) {
  const isDark = theme === "dark";
  const typedText = useTypewriter(roles);

  return (
    <div className="min-h-screen px-5">
      <div className="w-full max-w-3xl mx-auto pt-20">

        {/* ===== STATUS BAR ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10 mt-4"
        >
          <LiveClock theme={theme} />
          <span className={`status-bar flex items-center gap-1.5 ${isDark ? "text-[#a0a0a0]" : "text-gray-500"}`}>
            <i className="fa-solid fa-location-dot text-xs"></i> Pune, India
          </span>
        </motion.div>

        {/* ===== HERO ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14"
        >
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
              Hi, I'm Sanket 👋
            </h1>
            <div className={`text-lg md:text-xl ${isDark ? "text-[#a0a0a0]" : "text-gray-500"}`}>
              I am {typedText}
              <span className="typewriter-cursor"></span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div
              className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden"
              style={{
                border: `3px solid ${isDark ? "#333" : "#ddd"}`,
              }}
            >
              <img src={profilePic} alt="Sanket Sonkusare" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* ===== ABOUT ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="section-title">About</h2>
          <div className={`text-sm leading-relaxed space-y-3 ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}>
            <p>
              Hello! I'm an AI Engineer from Pune, India. I build things that make <strong className={isDark ? "text-white" : "text-black"}>sense</strong>, both in code and in the real world.
            </p>
            <p>
              I believe the best way to learn is by <strong className={isDark ? "text-white" : "text-black"}>building</strong>. I spend my time creating{" "}
              <span className="text-blue-400 font-medium">full-stack applications</span> and{" "}
              <span className="text-blue-400 font-medium">AI-powered systems</span> with{" "}
              <strong className={isDark ? "text-white" : "text-black"}>Python</strong>,{" "}
              <strong className={isDark ? "text-white" : "text-black"}>React</strong>, and{" "}
              <strong className={isDark ? "text-white" : "text-black"}>Node.js</strong>, taking them from a simple idea to a{" "}
              <span className="text-green-400 font-medium italic">finished product</span>.
            </p>
          </div>
        </motion.div>

        {/* ===== OPEN TO ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="open-badge">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            Open to new opportunities and collaborations
          </div>
        </motion.div>

        {/* ===== TOOLS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-8"
        >
          <h2 className="section-title">Tools that I have used</h2>
          <div className="flex flex-wrap gap-2.5 mb-4">
            {tools.map((tool) => (
              <span key={tool.name} className="tool-badge">
                <img src={tool.icon} alt={tool.name} />
                {tool.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {aiTools.map((tool) => (
              <span key={tool.name} className="tool-badge">
                <span className="text-sm">{tool.icon}</span>
                {tool.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ===== SOCIAL ROW ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-3 py-8 mb-6"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              aria-label={link.label}
              className="social-icon"
            >
              <i className={link.icon}></i>
            </a>
          ))}
          {/* Resume download */}
          <a
            href={resumePDF}
            download
            aria-label="Download Resume"
            className="social-icon"
            title="Download Resume"
          >
            <i className="fa-solid fa-download"></i>
          </a>
        </motion.div>

        {/* ===== JOURNEY & PASSIONS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-10"
        >
          <h2 className="section-title">My Journey & Passions</h2>
          <div className={`text-sm leading-relaxed space-y-3 ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}>
            <p>
              I'm not just about the code! I believe in a balanced life, which for me means a strong focus on <strong className={isDark ? "text-white" : "text-black"}>fitness</strong>. I'm proud to be a <span className="text-blue-400 font-medium">Silver Medalist in University Bodybuilding</span>, and I love sharing my journey in this space.
            </p>
            <p>
              When I need to clear my head, you'll often find me with a flute in hand. <strong className={isDark ? "text-white" : "text-black"}>Music</strong> is my meditation – I can play almost anything!
            </p>
          </div>
        </motion.div>

        {/* ===== RANDOM STATS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="section-title">My Random Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { emoji: "🧩", text: "Can solve Rubik's cube under 69 secs" },
              { emoji: "💪", text: "Current Skeletal Muscle Mass: 35kgs" },
              { emoji: "🌊", text: "Can hold breath for 2+ mins" },
              { emoji: "💧", text: "Suffering from hyperhydrosis" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`exp-card px-4 py-3 text-sm flex items-center gap-3 ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}
              >
                <span className="text-base">{stat.emoji}</span>
                {stat.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== PHILOSOPHY ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mb-16"
        >
          <h2 className="section-title">My Philosophy</h2>
          <div
            className={`exp-card px-5 py-4`}
          >
            <p className={`italic text-base mb-2 ${isDark ? "text-[#e5e5e5]" : "text-gray-800"}`}>
              "You either lift heavy weights or heavy code. I do both."
            </p>
            <p className={`text-xs ${isDark ? "text-[#666]" : "text-gray-400"}`}>
              This fun fact encapsulates my approach to life – balancing intellectual rigor with physical discipline.
            </p>
          </div>
          <p className={`mt-6 text-sm ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}>
            Thanks for stopping by! Let's build, lift, and grow together. 💪🔥
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default Home;
