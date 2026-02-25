import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profilePic from "../assets/1000136928.jpg";
import autovoyce from "../assets/autovoyce.png";

const roles = ["an AI Engineer.", "a Full Stack Developer.", "a Body Builder."];

const languages = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
];

const frameworks = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
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

// Staggered reveal variant with scale + blur
const sectionReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

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

function SectionDivider({ isDark }) {
  return (
    <div className="section-divider" style={{
      background: isDark
        ? "linear-gradient(90deg, transparent, #333, transparent)"
        : "linear-gradient(90deg, transparent, #ddd, transparent)",
    }} />
  );
}

function Home({ theme }) {
  const isDark = theme === "dark";
  const typedText = useTypewriter(roles);

  return (
    <div className="min-h-screen px-5">
      <div className="w-full max-w-3xl mx-auto pt-28">

        {/* ===== HERO ===== */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-6 mb-16"
        >
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
              Hi, I'm Sanket 👋
            </h1>
            <div className={`text-lg md:text-xl ${isDark ? "text-[#a0a0a0]" : "text-gray-500"}`}>
              I am{" "}
              <span className="typewriter-highlight">{typedText}</span>
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
          variants={sectionReveal}
          initial="hidden"
          animate="visible"
          custom={0.2}
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

        <SectionDivider isDark={isDark} />

        {/* ===== FEATURED PROJECT ===== */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mb-10"
        >
          <h2 className="section-title">Featured Project</h2>
          <a
            href="https://autovoyce.sanketsonkusare.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-project-card block overflow-hidden"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                <img
                  src={autovoyce}
                  alt="AutoVoyce"
                  className="featured-project-image w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 p-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                    ⭐ Spotlight
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">AutoVoyce</h3>
                <p className={`text-xs font-mono mb-2 ${isDark ? "text-[#666]" : "text-gray-400"}`}>
                  FastAPI · LangChain · Pinecone · Google Gemini · ElevenLabs · AWS EC2 · React
                </p>
                <p className={`text-xs leading-relaxed mb-3 ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}>
                  Talk to YouTube, not just watch it. AutoVoyce analyzes videos, remembers context, and lets you ask questions via chat or voice with multi-video cross-reasoning.
                </p>
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-medium ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                    View Project
                  </span>
                  <i className={`fa-solid fa-arrow-right text-[10px] ${isDark ? "text-blue-400" : "text-blue-600"}`}></i>
                </div>
              </div>
            </div>
          </a>
          <div className="mt-3 text-center">
            <Link
              to="/projects"
              className={`text-xs font-medium inline-flex items-center gap-1 transition-colors ${isDark ? "text-[#666] hover:text-[#a0a0a0]" : "text-gray-400 hover:text-gray-600"}`}
              style={{ textDecoration: "none" }}
            >
              View all projects <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </Link>
          </div>
        </motion.div>

        <SectionDivider isDark={isDark} />

        {/* ===== TOOLS ===== */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mb-10"
        >
          <h2 className="section-title">Tools that I have used</h2>

          {/* Languages */}
          <p className={`tool-group-label ${isDark ? "text-[#666]" : "text-gray-400"}`}>Languages</p>
          <div className="flex flex-wrap gap-2.5 mb-4">
            {languages.map((tool) => (
              <span key={tool.name} className="tool-badge">
                <img src={tool.icon} alt={tool.name} />
                {tool.name}
              </span>
            ))}
          </div>

          {/* Frameworks & Infrastructure */}
          <p className={`tool-group-label ${isDark ? "text-[#666]" : "text-gray-400"}`}>Frameworks & Infrastructure</p>
          <div className="flex flex-wrap gap-2.5 mb-4">
            {frameworks.map((tool) => (
              <span key={tool.name} className="tool-badge">
                <img src={tool.icon} alt={tool.name} />
                {tool.name}
              </span>
            ))}
          </div>

          {/* AI / ML */}
          <p className={`tool-group-label ${isDark ? "text-[#666]" : "text-gray-400"}`}>AI / ML</p>
          <div className="flex flex-wrap gap-2.5">
            {aiTools.map((tool) => (
              <span key={tool.name} className="tool-badge">
                <span className="text-sm">{tool.icon}</span>
                {tool.name}
              </span>
            ))}
          </div>
        </motion.div>

        <SectionDivider isDark={isDark} />

        {/* ===== JOURNEY & PASSIONS ===== */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate="visible"
          custom={0.5}
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

        <SectionDivider isDark={isDark} />

        {/* ===== RANDOM STATS ===== */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate="visible"
          custom={0.55}
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

        <SectionDivider isDark={isDark} />

        {/* ===== PHILOSOPHY ===== */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate="visible"
          custom={0.6}
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
