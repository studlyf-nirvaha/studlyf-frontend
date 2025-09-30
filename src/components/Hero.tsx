import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, TrendingUp } from "lucide-react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-[#0a0a1a] to-[#1c0030] overflow-hidden">
      {/* Background Glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[150px] z-0"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Headline */}
      <motion.div
        className="relative z-10 max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Building <span className="text-purple-400">the</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Student Internet
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/70 mb-8"
          variants={itemVariants}
        >
          Empowering students with smarter study & balanced life.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={itemVariants}
        >
          <Button className="px-6 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition">
            Join Now
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 rounded-full text-lg font-semibold border-purple-400 text-white hover:bg-purple-800/30 transition"
          >
            Explore Resources
          </Button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          variants={itemVariants}
        >
          {[
            {
              icon: TrendingUp,
              title: "Finance",
              desc: "Smart tools for student finance management",
            },
            {
              icon: Users,
              title: "Events",
              desc: "Discover and join student events worldwide",
            },
            {
              icon: Briefcase,
              title: "Project Hunt",
              desc: "Showcase projects and find collaborators",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-400/50 transition-all group"
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:text-pink-400 transition" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-white mb-16"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-3xl font-bold">5000+</h2>
            <p className="text-white/70">Students Connected</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">200+</h2>
            <p className="text-white/70">Projects Shared</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">100+</h2>
            <p className="text-white/70">Internships Offered</p>
          </div>
        </motion.div>

        {/* Testimonials Section (placeholder) */}
        <motion.div
          className="bg-white/5 p-6 rounded-xl max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <p className="text-white/90 italic mb-3">
            “Empowering students with smarter study & balanced life”
          </p>
          <p className="text-white/60">— Jane Doe, ABC College</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;

