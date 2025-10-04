import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Brain, Users, Heart } from "lucide-react"; 
import logo from "../logo3.png"; 
import WhystudyImg from "../Whystudlyf.jpeg";
import HowitwImg from "../Howitw.jpg";

// You should place your animation video (e.g., mp4, webm) in your public folder or import it.
// Example: import heroVideo from "../videos/your-3d-hero-animation.mp4";
// For now, we'll use a public folder path:
const heroVideo = "/animi/loop-animation.mp4"; // <-- update with your actual video path

const Landing = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const navigate = useNavigate();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen text-gray-100 overflow-x-hidden bg-black flex flex-col relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-grid-pink-200/[0.08] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
        <motion.div
          style={{ y: glowY1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
          animate={{
            background: [
              "radial-gradient(circle, rgba(236,72,153,0.15), transparent)",
              "radial-gradient(circle, rgba(244,114,182,0.25), transparent)",
              "radial-gradient(circle, rgba(236,72,153,0.15), transparent)",
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ y: glowY2 }}
          className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
          animate={{
            background: [
              "radial-gradient(circle, rgba(244,114,182,0.2), transparent)",
              "radial-gradient(circle, rgba(236,72,153,0.3), transparent)",
              "radial-gradient(circle, rgba(244,114,182,0.2), transparent)",
            ],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-screen z-10 flex flex-col items-center justify-center">
        {/* Animation video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <motion.img
          src={logo}
          alt="Studlyf Logo"
          className="w-[70%] md:w-[50%] lg:w-[40%] drop-shadow-[0_0_40px_rgba(236,72,153,0.6)] rounded-xl z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
        />
      </div>

      {/* Scrollable Sections */}
      <div ref={aboutRef} className="relative z-20 w-full max-w-6xl mx-auto px-6 space-y-24">
        {/* --- Sections unchanged --- */}
        {/* About Section */}
        <section className="relative text-center py-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src="/src/about-bg.jpg"
              alt="Tech City Collaboration"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
          </div>
          <h2 className="text-5xl font-extrabold mb-8 text-pink-600">
            About <span className="text-pink-500">StudLYF</span>
          </h2>
          <p className="text-gray-300 max-w-4xl mx-auto mb-14 text-lg leading-relaxed font-medium">
            StudLYF revolutionizes the student experience by seamlessly integrating academic
            excellence with personal well-being...
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, rotateX: 8, rotateY: -8 }}
              className="bg-black p-8 rounded-2xl shadow-lg hover:shadow-pink-400/50 border border-pink-900/20"
            >
              <Brain className="w-14 h-14 mx-auto text-pink-600" />
              <h3 className="text-2xl font-semibold text-pink-600 mt-6">AI-Powered Learning</h3>
              <p className="mt-4 text-gray-300 text-lg">
                Personalized study plans, flashcards, and adaptive AI learning algorithms.
              </p>
            </motion.div>
            {/* Card 2 */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, rotateX: 8, rotateY: 8 }}
              className="bg-black p-8 rounded-2xl shadow-lg hover:shadow-pink-400/50 border border-pink-900/20"
            >
              <Users className="w-14 h-14 mx-auto text-pink-500" />
              <h3 className="text-2xl font-semibold text-pink-500 mt-6">Collaborative Community</h3>
              <p className="mt-4 text-gray-300 text-lg">
                Connect with study groups, share resources, and learn together worldwide.
              </p>
            </motion.div>
            {/* Card 3 */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, rotateX: -8, rotateY: 8 }}
              className="bg-black p-8 rounded-2xl shadow-lg hover:shadow-pink-400/50 border border-pink-900/20"
            >
              <Heart className="w-14 h-14 mx-auto text-pink-400" />
              <h3 className="text-2xl font-semibold text-pink-400 mt-6">Wellness Integration</h3>
              <p className="mt-4 text-gray-300 text-lg">
                Mindfulness exercises, stress management tools, and lifestyle tips.
              </p>
            </motion.div>
          </div>
        </section>
        {/* Why Use Section */}
        <section className="text-center py-16 relative">
          <div className="absolute inset-0 -z-10">
            <img
              src={WhystudyImg}
              alt="Why StudLYF Background"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <h2 className="text-5xl font-extrabold mb-10 text-pink-600">
            Why Use <span className="text-pink-500">StudLYF?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="text-left max-w-lg">
              <ul className="space-y-4 text-lg text-gray-300">
                <li>✔ Proven Academic Results – 40% better retention rates</li>
                <li>✔ Personalized Learning Experience – AI adapts to you</li>
                <li>✔ Holistic Wellness – balance academics + mental health</li>
                <li>✔ Global Learning Community – connect worldwide</li>
              </ul>
            </div>
            <div className="bg-black p-8 rounded-3xl shadow-xl text-center border border-pink-200/30">
              <h3 className="text-4xl font-bold text-pink-600">50,000+</h3>
              <p className="mt-4 text-lg text-gray-300">Students transforming their journey</p>
              <p className="text-sm mt-2 text-gray-400">98% Satisfaction • 40% Better Retention</p>
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section className="text-center py-16 relative">
          <div className="absolute inset-0 -z-10">
            <img
              src={HowitwImg}
              alt="How It Works Background"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <h2 className="text-5xl font-extrabold mb-6 text-pink-600">
            How <span className="text-pink-500">It Works</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-12 text-lg">
            Get started with StudLYF in three simple steps and transform your learning experience.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, rotateX: 10, rotateY: -10 }}
              className="bg-black p-12 rounded-3xl shadow-lg relative border border-pink-200/30"
            >
              <span className="absolute -top-5 left-6 bg-pink-600 text-white px-5 py-2 rounded-full text-base font-semibold shadow-md">
                01
              </span>
              <h3 className="text-2xl font-semibold mt-10 text-pink-600">Sign Up & Setup</h3>
              <p className="mt-4 text-gray-300 text-lg">
                Create your account and personalize your experience.
              </p>
            </motion.div>
            {/* Step 2 */}
            <motion.div
              animate={{ y: [0, -22, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, rotateX: 10, rotateY: 10 }}
              className="bg-black p-12 rounded-3xl shadow-lg relative border border-pink-200/30"
            >
              <span className="absolute -top-5 left-6 bg-pink-500 text-white px-5 py-2 rounded-full text-base font-semibold shadow-md">
                02
              </span>
              <h3 className="text-2xl font-semibold mt-10 text-pink-500">Start Learning</h3>
              <p className="mt-4 text-gray-300 text-lg">
                Access AI-powered tools, join groups, and begin your journey.
              </p>
            </motion.div>
            {/* Step 3 */}
            <motion.div
              animate={{ y: [0, -24, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, rotateX: -10, rotateY: 10 }}
              className="bg-black p-12 rounded-3xl shadow-lg relative border border-pink-200/30"
            >
              <span className="absolute -top-5 left-6 bg-pink-400 text-white px-5 py-2 rounded-full text-base font-semibold shadow-md">
                03
              </span>
              <h3 className="text-2xl font-semibold mt-10 text-pink-400">Track & Improve</h3>
              <p className="mt-4 text-gray-300 text-lg">
                Monitor your progress and optimize your study habits.
              </p>
            </motion.div>
          </div>
        </section>
        {/* Final Explore Now */}
        <div className="text-center pb-16">
          <button
            onClick={() => navigate('/home')}
            className="px-10 py-5 bg-gradient-to-r from-pink-600 to-pink-400 rounded-full text-xl font-semibold text-white shadow-lg hover:scale-105 transition"
          >
            Explore Now →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Landing;