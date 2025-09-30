import React from "react";

type Props = {
  children?: React.ReactNode;
  compact?: boolean; // when true, don't force full-screen height
  className?: string;
};

const NetworkBackground: React.FC<Props> = ({ children, compact = false, className = "" }) => {
  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br from-[#04030a] via-[#071229] to-[#071433] ${compact ? 'rounded-2xl' : 'min-h-screen'} ${className}`}>
      {/* SVG overlay with lines and nodes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="nodeGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#7cf7ff" stopOpacity="1" />
            <stop offset="60%" stopColor="#6f4dff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff5ac4" stopOpacity="0.6" />
          </radialGradient>

          <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#4ea8ff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#b06cff" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <g className="network-lines" stroke="url(#lineGrad)" strokeWidth={1} fill="none" strokeLinecap="round">
          <line x1="60" y1="120" x2="300" y2="80" />
          <line x1="300" y1="80" x2="520" y2="120" />
          <line x1="520" y1="120" x2="760" y2="70" />
          <line x1="760" y1="70" x2="1050" y2="140" />

          <line x1="140" y1="200" x2="360" y2="290" />
          <line x1="360" y1="290" x2="640" y2="260" />
          <line x1="640" y1="260" x2="920" y2="340" />

          <line x1="80" y1="480" x2="340" y2="420" />
          <line x1="340" y1="420" x2="640" y2="460" />
          <line x1="640" y1="460" x2="980" y2="500" />

          <line x1="200" y1="80" x2="200" y2="380" />
          <line x1="500" y1="40" x2="500" y2="360" />
          <line x1="800" y1="90" x2="800" y2="420" />
        </g>

        <g className="network-nodes">
          <circle cx="300" cy="80" r="6" fill="url(#nodeGrad)" filter="url(#glow)" className="node node--big" />
          <circle cx="760" cy="70" r="5" fill="#6f4dff" filter="url(#glow)" className="node node--med" />
          <circle cx="640" cy="260" r="4.2" fill="#4ea8ff" filter="url(#glow)" className="node node--med" />
          <circle cx="980" cy="500" r="4" fill="#b06cff" filter="url(#glow)" className="node node--small" />

          <circle cx="60" cy="120" r="2.6" fill="#7cf7ff" className="node node--tiny" />
          <circle cx="520" cy="120" r="2.6" fill="#b06cff" className="node node--tiny" />
          <circle cx="360" cy="290" r="2.6" fill="#6f4dff" className="node node--tiny" />
          <circle cx="200" cy="80" r="2.6" fill="#7cf7ff" className="node node--tiny" />
          <circle cx="340" cy="420" r="2.6" fill="#4ea8ff" className="node node--tiny" />
          <circle cx="640" cy="460" r="2.6" fill="#b06cff" className="node node--tiny" />
        </g>
      </svg>

      {/* optional animated subtle particle for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full" />
      </div>

      {/* Content goes on top */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {children}
      </div>

      <style>{`
        .network-lines { mix-blend-mode: screen; }
        .node { transition: transform 0.3s ease, opacity 0.3s ease; }
        .node--big { animation: pulse 3.6s ease-in-out infinite; }
        .node--med { animation: pulse 4.2s ease-in-out infinite; }
        .node--small { animation: pulse 5s ease-in-out infinite; }
        .node--tiny { opacity: 0.9; }
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.9; }
          50% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.9; }
        }
        .network-lines line { opacity: 0.16; stroke-width: 1.1; }
        @media (max-width: 640px) {
          svg { transform: scale(1.05); }
          .network-lines line { opacity: 0.12; }
        }
      `}</style>
    </div>
  );
};

export default NetworkBackground;
