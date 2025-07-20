
function Resume({ theme }) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-10 ${theme === "dark" ? "text-white" : "text-black"}`}> 
      <h1 className="text-xl md:text-4xl font-bold mb-4 mt-20 text-red-400">Resume</h1>
      <p className={`text-lg md:text-xl mb-8 ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>View or download my professional resume below.</p>
      <div className="w-full max-w-3xl flex justify-center">
        <div className="w-full border-4 rounded-2xl border-red-400 shadow-xl overflow-hidden bg-white dark:bg-[#181818] flex justify-center items-center" style={{ aspectRatio: '7.8/11' }}>
          {/* Replace the src below with the correct path to your exported PDF first page image */}
          <img
            src="/src/assets/Sanket_Sonkusare_Resume.jpg"
            alt="Resume"
            className="w-full h-full object-contain"
            style={{ border: 'none' }}
          />
        </div>
      </div>
      <a
        href="/src/assets/Sanket_Sonkusare_Resume.pdf"
        download
        className="mt-6 inline-block px-6 py-2 rounded-lg bg-red-400 text-white font-semibold shadow hover:bg-red-500 transition"
      >
        Download PDF
      </a>
    </div>
  );
}

export default Resume;
