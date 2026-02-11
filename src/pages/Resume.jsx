
// Import resume assets
import resumePDF from '../assets/Sanket_Sonkusare_Resume.pdf';

function Resume({ theme }) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
      <h1 className="text-xl md:text-4xl font-bold mb-4 mt-20 text-red-400">Experience</h1>
      {/* Floating Download Button (bottom-left) */}
      <a
        href={resumePDF}
        download
        aria-label="Download Resume"
        className={`
          group fixed bottom-28 left-48 z-50 
          flex items-center justify-start
          h-12 w-12 hover:w-[190px] 
          rounded-full shadow-lg 
          overflow-hidden transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-red-400 
          ${theme === "dark" ? "bg-red-500" : "bg-red-400"} 
          text-white
        `}
      >
        {/* Icon Container - Fixed size, never shrinks */}
        <span className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v12m0 0l-4-4m4 4 4-4M21 21H3"
            />
          </svg>
        </span>

        {/* Text - Fades in and slides right */}
        <span className="whitespace-nowrap font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
          Download Resume
        </span>
      </a>
      {/* Experience cards */}
      <div className="w-full max-w-3xl mt-8 flex flex-col gap-6">
        <div className={`w-full border-2 rounded-2xl p-6 ${theme === "dark" ? 'bg-[#0f0f0f] border-red-400' : 'bg-white border-red-400'}`}>
          <h2 className="text-lg md:text-xl font-bold text-red-400">AI Engineer <span className="text-sm font-medium text-gray-400">| Scrobits Technologies</span></h2>
          <p className="text-sm text-gray-400 mb-3">Aug 2025 – Present</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Built an Agentic Enterprise RAG system using FastAPI, LangGraph, and Pinecone, enabling multitenant semantic search, human-in-loop escalation, and real-time dashboards, reducing query time by 60% and token usage by 40% used FastMCP for tools and prompts.</li>
            <li>Built a multi-agent AI support chatbot using FastAPI, LangGraph, Pinecone, and Google Gemini, achieving 95% query routing accuracy, 40% latency reduction, real-time human escalation, and zeroconfig embeddable deployment.</li>
            <li>Engineered and deployed a multi-agent AI system using LangChain, Gemini, and RAG with pinecone DB, integrating Retriever and Query agents via FastAPI and WhatsApp webhook for a Media Monitoring & Knowledge Assistant.</li>
          </ul>
        </div>

        <div className={`w-full border-2 rounded-2xl p-6 ${theme === "dark" ? 'bg-[#0f0f0f] border-red-400' : 'bg-white border-red-400'}`}>
          <h2 className="text-lg md:text-xl font-bold text-red-400">Machine Learning Intern <span className="text-sm font-medium text-gray-400">| Manastik</span></h2>
          <p className="text-sm text-gray-400 mb-3">Nov 2023 – Apr 2024</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><span className="font-semibold">Real-Time Pose Detection:</span> Engineered a high-performance MediaPipe model deployed via TFLite, achieving 93% accuracy for real-time applications.</li>
            <li><span className="font-semibold">Computer Vision Solutions:</span> Developed a pose estimation algorithm with a repetition counter trained on a custom dataset of 10,000+ images (95% accuracy).</li>
            <li><span className="font-semibold">Product Integration:</span> Designed the logic for in-app posture scoring, implementing three distinct metrics based on yoga performance standards.</li>
          </ul>
        </div>

        <div className={`w-full border-2 rounded-2xl p-6 ${theme === "dark" ? 'bg-[#0f0f0f] border-red-400' : 'bg-white border-red-400'}`}>
          <h2 className="text-lg md:text-xl font-bold text-red-400">Data Science Consultant <span className="text-sm font-medium text-gray-400">| Rubixe</span></h2>
          <p className="text-sm text-gray-400 mb-3">Dec 2022 – May 2023</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><span className="font-semibold">Data Pipeline Engineering:</span> Processed, cleaned, and validated over 3GB+ of raw data to prepare robust datasets for analysis.</li>
            <li><span className="font-semibold">Exploratory Data Analysis:</span> Leveraged the Python stack (Pandas, NumPy, Scikit-learn) to uncover insights through comprehensive data visualization.</li>
            <li><span className="font-semibold">Model Development:</span> Implemented and optimized 10+ machine learning models, utilizing hyper-parameter tuning and cross-validation to ensure peak performance.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Resume;
