import aroven from "../assets/projects/aroven.jpg";
import autovoyce from "../assets/projects/autovoyce.jpg";
import convo from "../assets/projects/convo.jpg";
import wordwave from "../assets/projects/wordwave.jpg";
import wanderlust from "../assets/projects/wanderlust.jpg";
import apiwrapper from "../assets/projects/apiwrapper.jpg";
import cursor from "../assets/projects/cursor.jpg";

// `preview` is the short line on Home; `description` is the full line on /projects.
// `live` is optional: no live link means no Live button.
export const projects = [
  {
    id: "aroven",
    title: "Aroven",
    featured: true,
    image: aroven,
    stack: "Workouts, nutrition, check-ins, coaching analytics",
    previewStack: "Fitness tracking, coaching",
    preview: "Track progress. Coach with clarity. One app for workouts, nutrition and check-ins.",
    description:
      "My first product. A fitness tracking and coaching platform for individuals and for coaches managing clients. Log workouts, track calories and macros (manually or AI-assisted), and do daily check-ins with weight, sleep, hydration, recovery and progress photos. Coaches get a dashboard with health scores, at-risk client alerts, roster analytics and program templates.",
    live: "https://www.aroven.fit/",
    liveLabel: "Website",
  },
  {
    id: "autovoyce",
    title: "AutoVoyce",
    image: autovoyce,
    stack: "FastAPI, LangChain, Pinecone, Gemini, ElevenLabs, AWS EC2, React",
    previewStack: "FastAPI, LangChain, Pinecone, Gemini, React",
    preview: "Chat or voice with YouTube videos, with memory and reasoning across several videos.",
    description:
      "Chat or voice with YouTube videos. It analyzes videos, remembers context, and answers questions across several videos at once.",
    github: "https://github.com/sanketsonkusare/AutoVoyce",
    live: "https://autovoyce.sanketsonkusare.me/",
  },
  {
    id: "convo",
    title: "Convo",
    image: convo,
    stack: "React, Vite, Tailwind, Socket.IO, Zustand",
    previewStack: "React, Socket.IO, Tailwind",
    preview: "Real-time chat app with a built-in AI assistant.",
    description:
      "Real-time chat app with a built-in AI assistant, built with React, Node.js, Socket.IO and OpenRouter.",
    github: "https://github.com/sanketsonkusare/Convo",
    live: "https://convo.sanketsonkusare.me/",
  },
  {
    id: "wordwave",
    title: "Wordwave",
    image: wordwave,
    stack: "React, Node.js, Express, MongoDB, JWT",
    previewStack: "React, Node.js, MongoDB",
    preview: "Full-stack blog platform with likes and comments.",
    description: "Full-stack blog platform where users can read, write, like and comment on posts.",
    github: "https://github.com/sanketsonkusare/Wordwave",
    live: "https://wordwave.sanketsonkusare.me/",
  },
  {
    id: "wanderlust",
    title: "Wanderlust",
    image: wanderlust,
    stack: "Node.js, Express, MongoDB, Passport.js",
    previewStack: "Node.js, Express, MongoDB",
    preview: "Travel listings app with reviews and interactive maps.",
    description: "Travel listings app with reviews and interactive maps.",
    github: "https://github.com/sanketsonkusare/Wanderlust",
    live: "https://projects.sanketsonkusare.me/wanderlust",
  },
  {
    id: "github-wrapper",
    title: "GitHub API Wrapper",
    image: apiwrapper,
    stack: "Node.js, npm",
    previewStack: "Node.js, npm",
    preview: "Lightweight npm package for the GitHub REST API v3.",
    description:
      "Lightweight npm package for the GitHub REST API v3, covering users, repos, issues and pull requests.",
    github: "https://github.com/sanketsonkusare/github-wrapper",
    live: "https://www.npmjs.com/package/@sassysanket/github-wrapper",
    liveLabel: "npm",
  },
  {
    id: "hand-cursor",
    title: "Hand Cursor Control",
    image: cursor,
    stack: "Python, OpenCV, MediaPipe",
    previewStack: "Python, OpenCV, MediaPipe",
    preview: "Control the mouse cursor with hand gestures.",
    description:
      "Control the mouse cursor with hand gestures in real time, including click and right-click.",
    github: "https://github.com/sanketsonkusare/Hand-cursor-control",
  },
];
