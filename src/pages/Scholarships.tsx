import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SplitText } from "@/components/ui/split-text";

const scholarships = [
  {
    id: 1,
    title: "TVS Cheema Scholarship Foundation",
    description: "Scholarships for meritorious students from economically weaker sections.",
    link: "https://www.tvscsf.com/",
  },
  {
    id: 2,
    title: "ICF Foundation Scholarship",
    description: "ICF Foundation supports students in their academic pursuits.",
    link: "https://foundationoficf.org/",
  },
  {
    id: 3,
    title: "Sitaram Jindal Foundation Scholarships",
    description: "Scholarships supporting various levels of education across India.",
    link: "https://www.sitaramjindalfoundation.org/",
  },
  {
    id: 4,
    title: "Prime Minister’s Scholarship Scheme (PMSS)",
    description: "Financial aid for wards of ex-servicemen and Coast Guard personnel.",
    link: "https://www.myscheme.gov.in/schemes/pmss",
  },
  {
    id: 5,
    title: "Indira Gandhi Single Girl Child Scholarship",
    description: "For single girl children pursuing higher education.",
    link: "https://www.buddy4study.com/article/indira-gandhi-single-girl-child-scholarship",
  },
  {
    id: 6,
    title: "Infosys STEM Stars Scholarship",
    description: "Empowering girls in STEM education across India.",
    link: "https://www.buddy4study.com/page/infosys-stem-stars-scholarship",
  },
];

export default function Scholarships() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 🌠 Floating Starfield */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_8px_#fff]"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🌍 Animated Background Globe */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🌐 Rotating Globe */}
        <motion.svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          className="absolute opacity-50"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        >
          <defs>
            <radialGradient id="globe-gradient" r="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="180" stroke="url(#globe-gradient)" strokeWidth="0.5" fill="none" />
          {Array.from({ length: 10 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="200"
              rx={180 - i * 15}
              ry={180}
              stroke="url(#globe-gradient)"
              strokeWidth="0.4"
              fill="none"
              opacity="0.4"
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="200"
              y1="20"
              x2="200"
              y2="380"
              stroke="url(#globe-gradient)"
              strokeWidth="0.4"
              transform={`rotate(${i * 15} 200 200)`}
              opacity="0.3"
            />
          ))}
        </motion.svg>

        {/* Floating Orbit Particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_10px_#ec4899]"
            animate={{
              x: [0, Math.sin(i) * 300, 0],
              y: [0, Math.cos(i) * 200, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-block bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl px-10 py-10 border border-purple-500/30 backdrop-blur-md shadow-[0_0_50px_rgba(168,85,247,0.4)]"
          >
            <SplitText
              text="Scholarships for Students"
              className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              delay={50}
              animationFrom={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
              easing="easeOutCubic"
              threshold={0.3}
            />
            <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
              Discover national & international scholarships to fund your education and dreams.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {scholarships.map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168,85,247,0.4)" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 shadow-lg backdrop-blur-md hover:border-purple-500/60 transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-purple-300 mb-2">{s.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-sm">{s.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="inline-block mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-lg hover:shadow-purple-500/40 transition"
                    >
                      Learn More
                    </motion.a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
