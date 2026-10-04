import devrev from "../assets/logos/devrev.svg";
import scrobits from "../assets/logos/scrobits.png";
import manastik from "../assets/logos/manastik.png";
import rubixe from "../assets/logos/rubixe.png";

export const experience = [
  {
    id: "devrev",
    role: "Forward Deployed Engineer",
    company: "DevRev",
    logo: devrev,
    dates: "Apr 2026 – Present",
    current: true,
    preview:
      "Building connectors and workflows that bring customer data into the platform. One workflow replaced three connector snap-ins and has registered 167 datasets without a failure.",
    summary:
      "Automation Squad engineer building the connectors and workflows that bring customer data into DevRev's platform.",
    bullets: [
      "Built one scheduled workflow that replaces three connector snap-ins (BigQuery, Snowflake, PostgREST) for dataset registration. It registered 167 datasets with no failures.",
      "Wrote RS256 JWT signing and OAuth2 flows by hand to work inside a restricted Python sandbox.",
      "Built a zero-copy, read-only BigQuery connector in TypeScript with LLM-based table classification and access-control mirroring.",
      "Moved automations from personal connections to service-owned credentials, and worked on the Granola migration for transcript sync reliability.",
    ],
  },
  {
    id: "scrobits",
    role: "AI Engineer",
    company: "Scrobits Technologies",
    logo: scrobits,
    dates: "Aug 2025 – Mar 2026",
    preview:
      "Agentic RAG and multi-agent assistants for enterprise customers. The support chatbot routed queries with 95% accuracy and cut response latency by 40%.",
    summary: "Built production AI assistants and retrieval systems for enterprise customers.",
    bullets: [
      "Agentic enterprise RAG with FastAPI, LangGraph and Pinecone, covering multitenant search and human-in-the-loop escalation.",
      "Multi-agent support chatbot with 95% routing accuracy and 40% lower latency.",
      "Multi-agent system with LangChain and Gemini, connected through FastAPI and a WhatsApp webhook.",
    ],
  },
  {
    id: "manastik",
    role: "Machine Learning Intern",
    company: "Manastik",
    logo: manastik,
    logoPadding: "tight",
    dates: "Nov 2023 – Apr 2024",
    preview: "Real-time pose detection and scoring for a yoga app.",
    summary: "Worked on real-time pose detection and scoring for a yoga and fitness app.",
    bullets: [
      "MediaPipe model deployed through TFLite with 93% accuracy.",
      "Repetition counter trained on 10,000+ images.",
      "Three posture scoring metrics based on yoga performance standards.",
    ],
  },
  {
    id: "rubixe",
    role: "Data Science Consultant",
    company: "Rubixe",
    logo: rubixe,
    dates: "Dec 2022 – May 2023",
    preview: "Data cleaning and machine learning models for clients.",
    summary: "Turned raw client data into clean datasets and tested machine learning models.",
    bullets: ["Cleaned and validated 3GB+ of raw data.", "Built and tuned 10+ machine learning models."],
  },
];
