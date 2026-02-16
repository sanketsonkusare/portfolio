import { motion } from "framer-motion";
import autovoyce from "../assets/autovoyce.png";
import convoImage from "../assets/convo.png";
import apiWrapperImage from "../assets/apiwrapper.png";
import wordwaveImage from "../assets/wordwave.png";
import wanderlustImage from "../assets/wanderlust.png";
import cursorImage from "../assets/cursor.png";

const projects = [
  {
    image: autovoyce,
    title: "AutoVoyce",
    stack: "FastAPI · LangChain · Pinecone · Google Gemini · ElevenLabs · AWS EC2 · React · Vite",
    description: "Talk to YouTube, not just watch it. AutoVoyce analyzes videos, remembers context, and lets you ask questions via chat or voice with multi-video cross-reasoning.",
    github: "https://github.com/sanketsonkusare/AutoVoyce",
    live: "https://autovoyce.sanketsonkusare.me/",
  },
  {
    image: convoImage,
    title: "Convo",
    stack: "React · Vite · Tailwind · Socket.IO · Zustand",
    description: "A modern real-time chat application with integrated AI assistant, built with React, Node.js, Socket.IO, and OpenRouter AI.",
    github: "https://github.com/sanketsonkusare/Convo",
    live: "https://convo.sanketsonkusare.me/",
  },
  {
    image: apiWrapperImage,
    title: "GithubAPI Wrapper",
    stack: "Node.js · npm",
    description: "A lightweight Node.js wrapper for the GitHub REST API v3. Simplifies interactions with users, repos, issues, and pull requests.",
    github: "https://github.com/sanketsonkusare/github-wrapper",
    live: "https://www.npmjs.com/package/@sassysanket/github-wrapper",
  },
  {
    image: wordwaveImage,
    title: "Wordwave",
    stack: "React · Node.js · Express · MongoDB · JWT",
    description: "A full-stack blog platform built with the MERN stack. Users can read, write, like, and comment on blog posts.",
    github: "https://github.com/sanketsonkusare/Wordwave",
    live: "https://wordwave.sanketsonkusare.me/",
  },
  {
    image: wanderlustImage,
    title: "Wanderlust",
    stack: "Node.js · Express · MongoDB · Passport.js",
    description: "A full-stack app to explore and list travel destinations with creation, editing, reviews, and interactive maps.",
    github: "https://github.com/sanketsonkusare/Wanderlust",
    live: "https://projects.sanketsonkusare.me/wanderlust",
  },
  {
    image: cursorImage,
    title: "Hand Cursor Control",
    stack: "Python · OpenCV · MediaPipe",
    description: "Real-time hand cursor control with click and right-click functionality using MediaPipe and PyAutoGUI.",
    github: "https://github.com/sanketsonkusare/Hand-cursor-control",
    live: "https://gifsec.com/wp-content/uploads/2022/10/rickroll-gif-7.gif",
  },
];

function Projects({ theme }) {
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen px-5 py-10">
      <div className="max-w-3xl mx-auto pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-3xl font-bold mb-2"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className={`text-sm mb-8 ${isDark ? "text-[#a0a0a0]" : "text-gray-500"}`}
        >
          Things I've built.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="project-card flex flex-col overflow-hidden"
            >
              {/* Image — full width on top */}
              <div className="w-full h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col">
                <h2 className="text-base font-bold mb-0.5">{project.title}</h2>
                <p className={`text-xs mb-2 font-mono ${isDark ? "text-[#666]" : "text-gray-400"}`}>{project.stack}</p>
                <p className={`text-xs leading-relaxed mb-3 flex-1 ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}>{project.description}</p>
                <div className="flex gap-2.5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${isDark ? "border-[#333] text-[#a0a0a0] hover:border-[#555] hover:text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                  >
                    <i className="fa-brands fa-github mr-1"></i> Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${isDark ? "bg-[#333] text-white hover:bg-[#444]" : "bg-gray-800 text-white hover:bg-gray-700"
                      }`}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square mr-1"></i> Live
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
