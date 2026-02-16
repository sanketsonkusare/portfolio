import { motion } from "framer-motion";
import resumePDF from "../assets/Sanket_Sonkusare_Resume.pdf";

const experiences = [
  {
    role: "AI Engineer",
    company: "Scrobits Technologies",
    period: "Aug 2025 – Present",
    current: true,
    points: [
      "Built an Agentic Enterprise RAG system using FastAPI, LangGraph, and Pinecone, enabling multitenant semantic search, human-in-loop escalation, and real-time dashboards.",
      "Built a multi-agent AI support chatbot using FastAPI, LangGraph, Pinecone, and Google Gemini, achieving 95% query routing accuracy and 40% latency reduction.",
      "Engineered a multi-agent AI system using LangChain, Gemini, and RAG with Pinecone DB, integrating Retriever and Query agents via FastAPI and WhatsApp webhook.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "Manastik",
    period: "Nov 2023 – Apr 2024",
    points: [
      "Engineered a high-performance MediaPipe model deployed via TFLite, achieving 93% accuracy for real-time pose detection.",
      "Developed a pose estimation algorithm with a repetition counter trained on a custom dataset of 10,000+ images (95% accuracy).",
      "Designed in-app posture scoring logic, implementing three distinct metrics based on yoga performance standards.",
    ],
  },
  {
    role: "Data Science Consultant",
    company: "Rubixe",
    period: "Dec 2022 – May 2023",
    points: [
      "Processed, cleaned, and validated over 3GB+ of raw data to prepare robust datasets for analysis.",
      "Leveraged the Python stack (Pandas, NumPy, Scikit-learn) to uncover insights through comprehensive data visualization.",
      "Implemented and optimized 10+ machine learning models, utilizing hyper-parameter tuning and cross-validation.",
    ],
  },
];

function Resume({ theme }) {
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen px-5 py-10">
      <div className="max-w-3xl mx-auto pt-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold">Experience</h1>
          <a
            href={resumePDF}
            download
            className={`text-xs px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${isDark ? "border-[#333] text-[#a0a0a0] hover:border-[#555] hover:text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
          >
            <i className="fa-solid fa-download"></i> Resume
          </a>
        </motion.div>

        <div className="flex flex-col gap-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="exp-card"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    {exp.role}
                    {exp.current && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        Current
                      </span>
                    )}
                  </h2>
                  <p className={`text-sm ${isDark ? "text-[#a0a0a0]" : "text-gray-500"}`}>{exp.company}</p>
                </div>
                <span className={`text-xs flex-shrink-0 ${isDark ? "text-[#666]" : "text-gray-400"}`}>{exp.period}</span>
              </div>
              <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}>
                {exp.points.map((point, j) => (
                  <li key={j} className="flex gap-2">
                    <span className={`mt-0.5 flex-shrink-0 ${isDark ? "text-[#555]" : "text-gray-300"}`}>▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resume;
