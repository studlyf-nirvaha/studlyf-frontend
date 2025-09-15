
import { motion } from "framer-motion";

const HiringBanner = () => {
  const companies = [
    { name: "Google", logo: "🔍" },
    { name: "Microsoft", logo: "⊞" },
    { name: "Amazon", logo: "📦" },
    { name: "Apple", logo: "🍎" },
    { name: "Meta", logo: "📘" },
    { name: "Netflix", logo: "🎬" },
    { name: "Spotify", logo: "🎵" },
    { name: "Tesla", logo: "⚡" }
  ];

  return (
    <motion.div
      className="w-full py-6 md:py-8 rounded-2xl bg-gradient-to-r from-brand-purple/20 to-brand-pink/20 border border-brand-purple/30"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          🚀 Hiring Companies This Month
        </h2>
        <p className="text-white/70 text-sm md:text-base">
          Top companies actively recruiting talented students
        </p>
      </div>
      
      <div className="overflow-hidden">
        <motion.div
          className="flex space-x-8 md:space-x-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center space-x-2 md:space-x-3 whitespace-nowrap"
            >
              <span className="text-2xl md:text-3xl">{company.logo}</span>
              <span className="text-white font-medium text-sm md:text-base">
                {company.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HiringBanner;
