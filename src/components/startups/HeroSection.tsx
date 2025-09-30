import React from "react";

type Props = {
  onExplore?: () => void;
  onPost?: () => void; // open create-startup modal (frontend-only)
};

const HeroSection: React.FC<Props> = ({ onExplore, onPost }) => {
  return (
    <header className="relative overflow-hidden">
      {/* animated gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full animate-gradient-shift" />
        <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden>
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#6a11cb" />
              <stop offset="50%" stopColor="#2575fc" />
              <stop offset="100%" stopColor="#ff5ac4" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <div className="rounded-2xl p-8 md:p-12 bg-black/30 backdrop-blur-sm border border-white/6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Startup
                <span className="ml-2 inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
                  Showcase
                </span>
              </h1>

              <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                Explore early-stage teams, join founding squads, and discover
                opportunities in hubs across India.
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  Startup Showcase
                </span>
                &nbsp;highlights curated projects using neon purple, cyan, and pink
                accents.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={onExplore}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-xl transform transition hover:scale-105 focus:outline-none"
                >
                  Explore Startups
                </button>

                <button
                  onClick={() => {
                    if (onPost) return onPost();
                    return window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent border border-white/12 text-white/90 hover:bg-white/5 transition font-medium"
                >
                  Post a Startup
                </button>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              {/* subtle card showing featured stats or visual */}
              <div className="rounded-xl p-4 bg-white/3 border border-white/6">
                <div className="text-sm text-white/90">Featured</div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-white/70">
                      Curated Startups
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">34</div>
                    <div className="text-xs text-white/70">Open Roles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-gradient-shift {
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, rgba(106,17,203,0.15) 0%, rgba(37,117,252,0.12) 40%, rgba(255,90,196,0.10) 80%);
          background-size: 300% 300%;
          animation: gradientShift 12s linear infinite;
          filter: blur(28px);
          opacity: 0.9;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </header>
  );
};

export default HeroSection;