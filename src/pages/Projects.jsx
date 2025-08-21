// Import project images
import convoImage from '../assets/convo.png';
import apiWrapperImage from '../assets/apiwrapper.png';
import wordwaveImage from '../assets/wordwave.png';
import wanderlustImage from '../assets/wanderlust.png';
import cursorImage from '../assets/cursor.png';

const projects = [
  {
    image: convoImage,
    title: 'Convo',
    stack: 'React, Vite, Tailwind CSS, DaisyUI, Zustand, Socket.IO, React Markdown',
    description: 'A modern real-time chat application with integrated AI assistant, built with React, Node.js, Socket.IO, and OpenRouter AI.',
    github: 'https://github.com/sanketsonkusare/Convo',
    live: 'https://projects.sanketsonkusare.me/projects/convo',
  },
  {
    image: apiWrapperImage,
    title: 'GithubAPI wrapper',
    stack: 'Node.js',
    description: 'A lightweight and easy-to-use Node.js wrapper for the GitHub REST API v3. This wrapper simplifies interactions with various GitHub resources such as users, repositories, issues, pull requests, and more.',
    github: 'https://github.com/sanketsonkusare/github-wrapper',
    live: 'https://www.npmjs.com/package/@sassysanket/github-wrapper',
  },
  {
    image: wordwaveImage,
    title: 'Wordwave',
    stack: 'React, Node.js, Tailwind, Express.js, MongoDB, JWT',
    description: 'A modern full-stack blog platform built with the MERN stack and styled with Tailwind CSS. It allows users to read, write, like, and comment on blog posts.',
    github: 'https://github.com/sanketsonkusare/Wordwave',
    live: 'https://projects.sanketsonkusare.me/projects/wordwave',
  },
  {
    image: wanderlustImage,
    title: 'Wanderlust',
    stack: 'Node.js, Express.js, MongoDB, Passport.js, Multer',
    description: 'A full-stack web application designed to help users explore and list various travel destinations. The application allows users to create, edit, and delete travel destination listings, leave reviews, and view locations on an interactive map.',
    github: 'https://github.com/sanketsonkusare/Wanderlust',
    live: 'https://projects.sanketsonkusare.me/projects/wanderlust',
  },
  {
    image: cursorImage,
    title: 'Hand cursor control',
    stack: 'Python, OpenCV, MediaPipe',
    description: 'This Python script demonstrates real-time hand cursor control with click and right-click functionality using MediaPipe and PyAutoGUI libraries.',
    github: 'https://github.com/sanketsonkusare/Hand-cursor-control',
    live: 'https://gifsec.com/wp-content/uploads/2022/10/rickroll-gif-7.gif',
  },
];

function Projects({ theme }) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
      <h1 className={`text-xl md:text-4xl font-bold mb-4 mt-20 ${theme === "dark" ? "text-red-400" : "text-red-500"}`}>Projects</h1>
      <p className={`text-lg md:text-xl mb-18 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Here are some of my projects.</p>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`border rounded-xl shadow-lg flex flex-col overflow-hidden hover:scale-[1.025] transition-transform
              ${theme === "dark" ? "bg-[#181818] border-gray-700" : "bg-white border-gray-300"}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover md:h-48"
            />
            <div className="flex-1 flex flex-col p-4">
              <h2 className="text-sm md:text-xl font-bold text-red-400 mb-1">{project.title}</h2>
              <div className={`text-xs md:text-base mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                <span className="font-semibold">Stack:</span> {project.stack}
              </div>
              <p className={`text-xs md:text-base mb-4 flex-1 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>{project.description}</p>
              <div className="flex gap-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-xs md:text-base border rounded-lg px-3 py-1 text-center transition
                    ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-100 hover:bg-gray-200 text-black border-gray-300"}`}
                >
                  GitHub Repo
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-xs md:text-base bg-red-400 hover:bg-red-500 text-white rounded-lg px-3 py-1 text-center transition"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
