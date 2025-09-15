
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Users } from "lucide-react";

const InternshipHero = () => {
  const stats = [
    { icon: Briefcase, label: "Active Internships", value: "500+" },
    { icon: TrendingUp, label: "Success Rate", value: "85%" },
    { icon: Users, label: "Students Placed", value: "2000+" }
  ];

  return (
    <div className="text-center space-y-6 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink leading-tight">
          Find Your Dream Internship
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 text-white/80 max-w-3xl mx-auto">
          Discover opportunities from top companies and kickstart your career journey
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-brand-purple/50 transition-all duration-300"
          >
            <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-brand-purple mx-auto mb-2" />
            <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm md:text-base text-white/70">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InternshipHero;
