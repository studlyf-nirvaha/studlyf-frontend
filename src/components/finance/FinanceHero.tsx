import React from "react";
import { motion } from "framer-motion";

// ✅ Since the image is in the same folder as FinanceHero.jsx
import firstImage from "./finance-hero.png";


const FinanceHero = ({ showAdvanced, setShowAdvanced }) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-12">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Smarter Student Finance Tools
        </h1>
        <p className="text-gray-300 text-lg max-w-xl">
          Plan, track, and optimize your finances with calculators, planners, and 
          intelligent insights built for students.
        </p>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition"
        >
          {showAdvanced ? "Hide Advanced Tools" : "Explore Advanced Tools"}
        </button>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 mt-10 md:mt-0 flex justify-center"
      >
        {/* ✅ This now loads your first image */}
        <img
          src={firstImage}
          alt="Finance Hero"
          className="max-w-md w-full rounded-xl shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default FinanceHero;
