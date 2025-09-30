import React from "react";

const ProjectHuntHero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Studylf</span>
        </div>

        <ul className="flex space-x-8 text-sm font-medium">
          <li className="hover:text-purple-400 transition">Home</li>
          <li className="hover:text-purple-400 transition">Finance</li>
          <li className="hover:text-purple-400 transition">Events</li>
          <li className="hover:text-purple-400 transition">Network</li>
          <li className="text-purple-400 underline">Project Hunt</li>
          <li className="hover:text-purple-400 transition">Startups</li>
        </ul>

        <div className="w-9 h-9 flex items-center justify-center rounded-full border border-white/30 hover:border-purple-400 cursor-pointer">
          <span className="text-lg">👤</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between items-center px-12 lg:px-24 py-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-6">Project Hunt</h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Discover, join, or launch real-world student tech projects. <br />
            Collaborate, innovate, and build your future with peers across
            domains.
          </p>
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-purple-500/50 transition font-semibold">
            Post Your Project
          </button>
        </div>

        {/* Optional animated background waves */}
        <div className="absolute bottom-0 right-0 w-full h-64 pointer-events-none">
          <svg
            className="w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="url(#gradient)"
              fillOpacity="1"
              d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,128C840,128,960,160,1080,181.3C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6a11cb" />
                <stop offset="100%" stopColor="#2575fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default ProjectHuntHero;
