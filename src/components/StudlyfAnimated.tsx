import { motion } from "framer-motion";

const letters = ["S", "t", "u", "d", "l", "y", "f"];

export default function StudlyfAnimated() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-6xl md:text-8xl font-extrabold tracking-wide flex space-x-1"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500 hover:scale-110 hover:text-white transition-transform duration-300"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Glow Animation */}
      <motion.div
        className="w-64 h-2 mt-8 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full blur-lg opacity-70"
        initial={{ width: 0 }}
        animate={{ width: 256 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />

      {/* Tagline */}
      <motion.p
        className="mt-6 text-gray-300 text-lg md:text-xl font-light tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Learn • Connect • Grow 🚀
      </motion.p>
    </div>
  );
}
