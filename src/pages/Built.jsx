
import { useState, useEffect } from "react";

// Import medal images
import medal1 from '../assets/medal/i1.jpg';
import medal2 from '../assets/medal/i2.jpg';
import medal3 from '../assets/medal/i3.jpg';
import medal4 from '../assets/medal/i4.jpg';
import medal5 from '../assets/medal/i5.jpg';

// Import journey images
import journey1 from '../assets/journey/1.jpg';
import journey2 from '../assets/journey/2.jpg';
import journey3 from '../assets/journey/3.jpg';
import journey4 from '../assets/journey/4.jpg';
import journey5 from '../assets/journey/5.jpg';
import journey6 from '../assets/journey/6.jpg';
import journey7 from '../assets/journey/7.jpg';
import journey8 from '../assets/journey/8.jpg';

const medalImages = [
  medal1,
  medal2,
  medal3,
  medal4,
  medal5,
];

const journeyImages = [
  journey1,
  journey2,
  journey3,
  journey4,
  journey5,
  journey6,
  journey7,
  journey8,
];
function Built({ theme }) {

  // Slideshow state for medals
  const [medalIndex, setMedalIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMedalIndex((prev) => (prev + 1) % medalImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Slideshow state for journey images
  const [journeyIndex, setJourneyIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setJourneyIndex((prev) => (prev + 1) % journeyImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen mt-20 w-full flex flex-col items-center justify-start px-4 md:px-8 py-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
      <h1 className={`text-xl md:text-4xl font-bold mb-6 ${theme === "dark" ? "text-red-400" : "text-red-500"}`}>
        My Bodybuilding Story
      </h1>
      <p className={`text-sm md:text-lg max-w-3xl mb-15 text-left ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
        Welcome to the 'Built' section, where I share my dedication to physical
        strength and mental discipline. For me, bodybuilding isn't just a hobby;
        it's a parallel journey of growth, resilience, and continuous
        improvement, much like my work in tech.
      </p>

      {/* Achievements Section (heading full width, content split) */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-red-400 mb-8 w-full">
          Achievements
        </h2>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Left: Card with medal image and text */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className={`w-full max-w-xs h-95 rounded-lg flex flex-col items-center justify-center p-4 mb-4 md:mb-0 border-2 border-red-400
              ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
              {/* Replace src with your medal image path */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/625/625395.png"
                alt="Medal"
                className="w-60 h-60 object-contain rounded mb-2"
              />
              <span className={`text-xs md:text-lg text-center w-full font-semibold mt-6 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                Silver Medalist: University Bodybuilding Competition 2023!
              </span>
            </div>
          </div>
          {/* Right: Slideshow placeholder */}
          <div className="flex-1 flex items-center justify-center w-full">
            {/* Replace with your image slider logic or a library */}
            <div className={`w-full max-w-xs h-95 rounded-lg flex items-center justify-center text-xs md:text-base border-2 border-red-400
              ${theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-white text-gray-600 border-gray-300"}`}>
              {/* Slideshow: loop through medalImages */}
              <img
                src={medalImages[medalIndex]}
                alt="Medal"
                className="w-full h-full object-cover rounded-lg transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bodybuilding Journey Section (heading full width, content split) */}
      <section className="w-full max-w-5xl mb-16 mt-15">
        <h2 className="text-xl md:text-2xl font-bold text-red-400 mb-8 w-full">
          My Bodybuilding Journey
        </h2>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <p className={`text-sm md:text-base ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              My fitness journey began as a skinny kid in school, eager to play
              but lacking in sports. I started home workouts, and despite slow
              progress, my determination never faded. After two years, I saw my
              first visible changes.
              <br />
              <br />
              In college, the college gym became my second home, quickly leading
              to noticeable shape improvements. Post-pandemic, I joined a local
              gym, learning proper training and diet from general trainers. After
              a year of intense dedication, I competed, proudly securing second
              place at the Pune University matches.
              <br />
              <br />
              Today, I'm relentlessly preparing for the national stage. My
              transformation is a testament to consistency, hard work, and the
              power of building both body and mind.
            </p>
          </div>
          {/* Right: Slideshow placeholder */}
          <div className="flex-1 flex items-center justify-center w-full ">
            {/* Replace with your image slider logic or a library */}
            <div className="w-full max-w-xs h-95 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-xs md:text-base border-2 border-red-400">
              {/* Slideshow: loop through journeyImages */}
              <img
                src={journeyImages[journeyIndex]}
                alt="Journey"
                className="w-full h-full object-cover rounded-lg transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="w-full max-w-5xl flex flex-col items-center mt-10 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-red-400 mb-4">
          Instagram Feed
        </h2>
        <div className="w-full rounded-lg overflow-hidden border border-gray-700 bg-[#181818]">
          <iframe
            src="https://www.instagram.com/sassysanket/embed/"
            title="Instagram Feed"
            className="w-full h-[500px] md:h-[600px]"
            style={{ border: "none" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Built;
