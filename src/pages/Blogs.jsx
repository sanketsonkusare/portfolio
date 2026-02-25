import { motion } from "framer-motion";

const blogs = [
    {
        title: "Chatbot Widget Using React, Tailwind and Vercel",
        platform: "Hashnode",
        platformIcon: "fa-brands fa-hashnode",
        description:
            "A step-by-step guide on building a production-ready chatbot widget with React and Tailwind CSS, deployed on Vercel.",
        tags: ["React", "Tailwind CSS", "Vercel", "Chatbot"],
        link: "https://blog.sanketsonkusare.me/chatbot-widget-using-react-tailwind-and-vercel",
    },
    {
        title: "Why Hybrid search is better than semantic search",
        platform: "X (Twitter)",
        platformIcon: "fa-brands fa-x-twitter",
        description:
            "When building AutoVoyce. Initially, semantic search felt like the most intelligent option. But as the system evolved, I realized that semantic search alone isn’t enough for production-level reliability.",
        tags: ["AI", "LangChain", "Pinecone", "FastAPI", "AWS"],
        link: "https://x.com/sassysanket/status/2025925953273438602",
    },
];

function Blogs({ theme }) {
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
                    Blogs & Articles
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className={`text-sm mb-8 ${isDark ? "text-[#a0a0a0]" : "text-gray-500"}`}
                >
                    Things I've written about.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {blogs.map((blog, idx) => (
                        <motion.a
                            key={idx}
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08, duration: 0.4 }}
                            className="blog-card flex flex-col overflow-hidden cursor-pointer"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            {/* Platform banner */}
                            <div
                                className={`px-4 py-3 flex items-center gap-2 border-b ${isDark ? "border-[#333]" : "border-gray-200"
                                    }`}
                            >
                                <i className={`${blog.platformIcon} text-lg`}></i>
                                <span
                                    className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-[#a0a0a0]" : "text-gray-500"
                                        }`}
                                >
                                    {blog.platform}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4 flex flex-col">
                                <h2 className="text-base font-bold mb-2 leading-snug">
                                    {blog.title}
                                </h2>
                                <p
                                    className={`text-xs leading-relaxed mb-4 flex-1 ${isDark ? "text-[#a0a0a0]" : "text-gray-600"
                                        }`}
                                >
                                    {blog.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${isDark
                                                    ? "bg-[#2a2a2a] text-[#a0a0a0]"
                                                    : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Read link */}
                                <div className="flex items-center gap-1 mt-auto">
                                    <span
                                        className={`text-xs font-medium ${isDark ? "text-blue-400" : "text-blue-600"
                                            }`}
                                    >
                                        Read Article
                                    </span>
                                    <i
                                        className={`fa-solid fa-arrow-right text-[10px] ${isDark ? "text-blue-400" : "text-blue-600"
                                            }`}
                                    ></i>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blogs;
