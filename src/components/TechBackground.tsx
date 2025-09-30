import React from "react";

const TechBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#020817] to-[#0a1a2f]">
			{/* Grid pattern overlay */}
			<div
				aria-hidden
				className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
				style={{ opacity: 0.06 }}
			/>

			{/* Optional glowing nodes */}
			<div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-cyan-400 blur-md animate-pulse opacity-60" />
			<div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-purple-500 blur-md animate-pulse opacity-60" />

			{/* Content container */}
			<div className="relative z-10">{children}</div>
		</div>
	);
};

export default TechBackground;
