
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SplitText } from "@/components/ui/split-text";
import { Sparkles } from "lucide-react";

const PaidCourses = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SplitText
              text="Paid Courses"
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Premium courses with expert instruction, certifications, and comprehensive support.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center py-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  "0 0 0px #a259ff55",
                  "0 0 32px #f7599088",
                  "0 0 0px #a259ff55"
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              className="inline-flex items-center gap-3 px-8 py-6 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-pink shadow-xl"
            >
              <Sparkles className="h-8 w-8 text-yellow-300 animate-spin-slow" />
              <span className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 drop-shadow-lg">
                Coming Soon
              </span>
              <Sparkles className="h-8 w-8 text-purple-300 animate-spin-slow" />
            </motion.div>
            <p className="mt-8 text-lg text-white/70 max-w-xl mx-auto">
              Our premium courses are launching soon! Stay tuned for expert-led content, certifications, and more.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaidCourses;
