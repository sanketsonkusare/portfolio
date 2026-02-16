import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import medal1 from "../assets/medal/i1.jpg";
import medal2 from "../assets/medal/i2.jpg";
import medal3 from "../assets/medal/i3.jpg";
import medal4 from "../assets/medal/i4.jpg";
import medal5 from "../assets/medal/i5.jpg";

import journey1 from "../assets/journey/1.jpg";
import journey2 from "../assets/journey/2.jpg";
import journey3 from "../assets/journey/3.jpg";
import journey4 from "../assets/journey/4.jpg";
import journey5 from "../assets/journey/5.jpg";
import journey6 from "../assets/journey/6.jpg";
import journey7 from "../assets/journey/7.jpg";
import journey8 from "../assets/journey/8.jpg";

const medalImages = [medal1, medal2, medal3, medal4, medal5];
const journeyImages = [journey1, journey2, journey3, journey4, journey5, journey6, journey7, journey8];

function Slideshow({ images, alt }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ background: "#111" }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? "bg-white w-3" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Built({ theme }) {
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
          Built Different 💪
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className={`text-sm mb-10 ${isDark ? "text-[#a0a0a0]" : "text-gray-500"}`}
        >
          My bodybuilding story — discipline, resilience, and continuous improvement.
        </motion.p>

        {/* Achievement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-10"
        >
          <h2 className="section-title">🏆 Achievement</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className={`exp-card flex-1 flex flex-col items-center justify-center py-8`}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/625/625395.png"
                alt="Medal"
                className="w-24 h-24 object-contain mb-3"
              />
              <p className={`text-sm text-center font-medium ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}>
                🥈 Silver Medalist — University Bodybuilding 2023
              </p>
            </div>
            <div className="flex-1 aspect-[4/3] rounded-xl overflow-hidden border" style={{ borderColor: isDark ? "#333" : "#e0e0e0" }}>
              <Slideshow images={medalImages} alt="Medal photos" />
            </div>
          </div>
        </motion.div>

        {/* Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-10"
        >
          <h2 className="section-title">🏋️ Journey</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className={`flex-1 text-xs leading-relaxed space-y-3 ${isDark ? "text-[#a0a0a0]" : "text-gray-600"}`}>
              <p>
                My fitness journey began as a skinny kid in school. I started home workouts, and despite slow progress, my determination never faded. After two years, I saw my first visible changes.
              </p>
              <p>
                In college, the gym became my second home. Post-pandemic, I joined a local gym, learning proper training and diet. After a year of intense dedication, I secured second place at the Pune University matches.
              </p>
              <p>
                Today, I'm preparing for the national stage. My transformation is a testament to consistency, hard work, and the power of building both body and mind.
              </p>
            </div>
            <div className="flex-1 aspect-[4/3] rounded-xl overflow-hidden border" style={{ borderColor: isDark ? "#333" : "#e0e0e0" }}>
              <Slideshow images={journeyImages} alt="Journey photos" />
            </div>
          </div>
        </motion.div>

        {/* Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="section-title">📸 Instagram</h2>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: isDark ? "#333" : "#e0e0e0" }}>
            <iframe
              src="https://www.instagram.com/sassysanket/embed/"
              title="Instagram Feed"
              className="w-full h-[450px] md:h-[550px]"
              style={{ border: "none" }}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Built;
