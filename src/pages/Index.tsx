import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingContent from "@/components/TrendingContent";
import EventCarousel from "@/components/EventCarousel";
import Footer from "@/components/Footer";
import StatsSection from "@/components/StatsSection";
import StudentDiscountPreview from "@/components/StudentDiscountPreview";
import StarBorder from '@/components/ui/StarBorder';
import Aurora from '../Aurora';
import RollingGallery from '../RollingGallery';
import ContainerScroll from "@/components/ui/ContainerScroll";
import { GradientText } from "@/components/ui/GradientText";
import { CardCarousel } from "@/components/ui/CardCarousel";
import AdGrid from "@/components/ui/AdGrid";
import { LoaderOne } from "@/components/ui/loader";

const FEATURES = [
  {
    title: 'Smart Finance Tools',
    description: 'Plan, track, and optimize your finances with calculators, planners, and more.',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=600&h=900&fit=crop',
    bg: 'from-purple-500 to-pink-400',
  },
  {
    title: 'Events & Networking',
    description: 'Join events, connect with peers, and grow your professional network.',
    image: 'https://images.unsplash.com/photo-1506665531195-37a89d6b3095?q=80&w=600&h=900&fit=crop',
    bg: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Startup Ecosystem',
    description: 'Discover internships, startup jobs, and entrepreneurial resources.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&h=900&fit=crop',
    bg: 'from-green-500 to-lime-400',
  },
  {
    title: 'Scholarships & Courses',
    description: 'Access curated scholarships, free and paid courses, and learning materials.',
    image: 'https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=600&h=900&fit=crop',
    bg: 'from-yellow-500 to-orange-400',
  },
  {
    title: 'Student Discounts',
    description: 'Unlock exclusive student discounts and offers from top brands.',
    image: 'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=600&h=900&fit=crop',
    bg: 'from-pink-500 to-red-400',
  },
  {
    title: 'AI Study Assistant',
    description: 'Get instant help with your studies using our AI-powered assistant.',
    image: 'https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=600&h=900&fit=crop',
    bg: 'from-indigo-500 to-purple-400',
  },
  {
    title: 'Marketplace',
    description: 'Buy and sell study materials, gadgets, and more with fellow students.',
    image: 'https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=600&h=900&fit=crop',
    bg: 'from-orange-500 to-yellow-400',
  },
  {
    title: 'Podcasts & Blogs',
    description: 'Stay inspired and informed with curated podcasts and blogs.',
    image: 'https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=600&h=900&fit=crop',
    bg: 'from-pink-500 to-purple-400',
  },
  {
    title: 'YouTube Shorts',
    description: 'Learn on the go with bite-sized educational videos.',
    image: 'https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=600&h=900&fit=crop',
    bg: 'from-blue-500 to-indigo-400',
  },
  {
    title: 'Community Q&A',
    description: 'Ask questions and get answers from the student community.',
    image: 'https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=600&h=900&fit=crop',
    bg: 'from-green-500 to-teal-400',
  },
];

function FeatureGallery() {
  return (
    <RollingGallery
      autoplay={true}
      pauseOnHover={true}
      images={FEATURES.map(f => f.image)}
    />
  );
}

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const [openNewsIndex, setOpenNewsIndex] = useState(null);
  const [newsCards, setNewsCards] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Parallax effects for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    // Fetch news
    fetch("http://localhost:5001/tech-news")
      .then(res => res.json())
      .then(data => setNewsCards(data.news))
      .catch(console.error);

    // Fetch blogs
    fetch("http://localhost:5001/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data.blogs))
      .catch(console.error);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      }
    },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  
  return (
    <>
      {/* SEO: Update title, description, and structured data here for homepage */}
      <Helmet>
        <title>StudLyF – Learn, Connect & Grow</title>
        <meta name="description" content="StudLyF is your platform to learn new skills, connect with peers, and grow your career. Discover courses, events, projects, startups, and more." />
        {/* Organization & WebSite JSON-LD for rich snippets and sitelinks */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "StudLyF",
              "url": "https://www.studlyf.in",
              "logo": "https://www.studlyf.in/logo.png",
              "sameAs": [
                "https://www.instagram.com/studlyf.in",
                "https://www.linkedin.com/company/studlyf"
              ]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "StudLyF",
              "url": "https://www.studlyf.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.studlyf.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>
      {/* Navbar - Now visible at the top */}
      <div className="relative w-full z-50">
        <Navbar />
      </div>

      {/* Hero Section with Video Background */}
     {/* ======================== Hero Section ======================== */}
<div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#050014] overflow-hidden">

  {/* Background Video or Image */}
  <video
    src="/animi/globe-loop.mp4" // replace with your actual path
    className="absolute inset-0 w-full h-full object-cover opacity-30"
    autoPlay
    loop
    muted
    playsInline
  />

  {/* Overlay Glow */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0a001a]/90" />

  {/* ======================== Hero Content ======================== */}
  <motion.div
    className="relative z-10 max-w-3xl"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3, delayChildren: 0.2 },
      },
    }}
  >
    <motion.h1
      className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      <span className="block text-lg sm:text-xl text-purple-300 font-semibold italic tracking-wide mb-2">
            Building the
          </span>
          <span
            className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 
              bg-clip-text text-transparent
              drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]
              sm:drop-shadow-[0_0_25px_rgba(236,72,153,0.7)]"
          >
            Student Internet
          </span>
    </motion.h1>

    <motion.p
      className="mt-4 text-lg md:text-xl text-white/70"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      Empowering students with smarter study & balanced life.
    </motion.p>
  </motion.div>
</div>


      {/* Black background moved to the farthest back for animation visibility */}
      <ContainerScroll titleComponent={<></>}>
        <div className="flex flex-col items-center justify-center h-full px-2 sm:px-4 mb-24">
          {/* Ads Grid */}
          <AdGrid />
          {/* Example feature cards or content can go here */}
          {/* Removed feature cards as per user request */}
          {/* Add more cards or content as needed */}
        </div>
      </ContainerScroll>
      {/* Single Card Carousel with all features */}
      <div className="my-8 sm:my-12 px-2 sm:px-0 mt-[120]">
        <GradientText className="text-2xl sm:text-4xl md:text-6xl font-bold mt-32 mb-10 block text-center text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Latest News
        </GradientText>
        <div className="horizontal-scroll-grid mt-8">
          {newsCards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col min-w-[210px] max-w-[210px] bg-white/10 rounded-xl shadow-lg overflow-hidden mr-4"
              style={{ height: "340px" }}
            >
              <img
                src={card.urlToImage || "/placeholder.jpg"}
                alt={card.title}
                className="w-full h-28 object-cover rounded-t-xl"
                style={{ objectFit: "cover" }}
              />
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="text-base font-semibold mb-1 text-white line-clamp-2">{card.title}</h3>
                <p className="text-gray-300 text-xs mb-2 line-clamp-4">{card.description}</p>
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 text-sm font-semibold hover:underline mt-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* Mini modal for News */}
        {openNewsIndex !== null && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
            <div className="relative bg-white rounded-xl shadow-2xl w-[98vw] max-w-3xl h-[90vh] flex flex-col">
              <button
                className="absolute top-2 right-2 text-black bg-gray-200 rounded-full p-2 z-50 hover:bg-gray-300"
                onClick={() => setOpenNewsIndex(null)}
                aria-label="Close"
                style={{ position: 'absolute' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <NewsIframeWithFallback
                url={newsCards[openNewsIndex]?.url || newsCards[openNewsIndex]?.link} // Fix: use correct field for NewsAPI
                title={newsCards[openNewsIndex]?.title}
              />
            </div>
          </div>
        )}
      </div>
      {/* Enhanced Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Grid pattern with animation */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />

        {/* Animated border lines */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
              "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.3), transparent)",
              "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
              "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.3), transparent)",
              "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
              "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.3), transparent)",
              "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
          animate={{
            background: [
              "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
              "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.3), transparent)",
              "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Enhanced animated glow spots with parallax */}
        <motion.div
          style={{ y: glowY1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-[100px] opacity-60"
          animate={{
            background: [
              "radial-gradient(circle, rgba(209, 58, 255, 0.2), transparent)",
              "radial-gradient(circle, rgba(255, 77, 160, 0.3), transparent)",
              "radial-gradient(circle, rgba(209, 58, 255, 0.2), transparent)",
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            background: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          style={{ y: glowY2 }}
          className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-[100px] opacity-60"
          animate={{
            background: [
              "radial-gradient(circle, rgba(255, 77, 160, 0.2), transparent)",
              "radial-gradient(circle, rgba(209, 58, 255, 0.3), transparent)",
              "radial-gradient(circle, rgba(255, 77, 160, 0.2), transparent)",
            ],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            background: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }
          }}
        />

        {/* Additional floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: 20 + i * 15 + "%",
              top: 30 + i * 10 + "%",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Cosmic planet arc and floating stars background */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {/* Soft floating stars */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 shadow-lg"
            style={{
              width: 1.5 + Math.random() * 2.5 + "px",
              height: 1.5 + Math.random() * 2.5 + "px",
              left: 10 + Math.random() * 80 + "%",
              top: 5 + Math.random() * 80 + "%",
              filter: 'blur(0.5px)',
            }}
            animate={{
              y: [0, -10 - Math.random() * 20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={sectionVariants}
        className="relative z-10 w-full overflow-x-hidden"
      >
        {/* Features Rolling Gallery */}
        <GradientText className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 mt-12 animate-gradient text-center">Trending Content</GradientText>
        <motion.div
          variants={sectionVariants}
          transition={{ ease: 'easeOut' }}
          className="w-full overflow-x-hidden"
        >

          <TrendingContent />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
      </motion.div>

      {/* Collaboration partners - autoplay marquee like StatsSection */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="w-full mt-8 mb-6"
      >
        <div className="w-full">
          {/* Full-bleed partners card */}
          <div className="w-full bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-md px-6 py-10">
            <h3 className="text-center text-xl sm:text-2xl font-semibold text-white">Collaboration Partners</h3>
            <p className="text-center text-sm text-white/60 mt-2">Proudly partnered with leading organisations and student groups</p>

            <MarqueePartners />
          </div>
        </div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <StatsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.div>
      {/* Hide Spline watermark with CSS */}
      <style>{`
        .spline-watermark, .spline-watermark__container, [class*='watermark'] {
          display: none !important;
        }
      `}</style>
    </>
  );
};

export default Index;

function CollegeGallery() {
  const galleries = [
    [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1495103033382-fe343886b671?auto=format&fit=crop&w=600&q=80",
    ],
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % galleries.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full mx-auto flex flex-col gap-2">
      <div className="w-full aspect-[8/2]">
        <img
          src={galleries[index][0]}
          alt="College 1"
          className="w-full h-full object-cover rounded-2xl shadow-xl"
          style={{ border: '4px solid #a259ff', boxShadow: '0 0 16px 4px #a259ff88' }}
        />
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex-1 aspect-[1.5/1]">
          <img
            src={galleries[index][1]}
            alt="College 2"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
            style={{ border: '4px solid #a259ff', boxShadow: '0 0 16px 4px #a259ff88' }}
          />
        </div>
        <div className="flex-1 aspect-[1.5/1]">
          <img
            src={galleries[index][2]}
            alt="College 3"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
            style={{ border: '4px solid #a259ff', boxShadow: '0 0 16px 4px #a259ff88' }}
          />
        </div>
      </div>
    </div>
  );
}

function NewsIframeWithFallback({ url, title }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" /></svg>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to display this news here</h2>
        <p className="text-gray-600 mb-6 text-center">This news article does not allow embedding for security reasons. You can still read it in a new tab.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Open News in New Tab
        </a>
      </div>
    );
  }
  return (
    <>
      {loading && <div className="w-full h-full flex items-center justify-center"><LoaderOne /></div>}
      <iframe
        src={url}
        title={title}
        allowFullScreen
        className="w-full h-full rounded-xl border-0 flex-1"
        style={{ background: 'white', minHeight: 0 }}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}

function MarqueePartners() {
  const partners = [
    "/s-hatch.jpeg",
    "/unifesto_logo.jpeg",
    "/founders_hub.jpg",
    "/traviiczo.jpg",
    "/yudi.jpeg",
    "/rges.jpeg",
    "/ie_cell.jpeg",
    "/varenyam_ai.jpg",
    "/nextgen_nexus_logo.jpeg"
  ];

  // Duplicate the array for seamless looping (3 sets)
  const loopedPartners = [...partners, ...partners, ...partners];
  const cardsRef = useRef<HTMLDivElement | null>(null); // Correct type
  const [cardsWidth, setCardsWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (cardsRef.current) {
        setCardsWidth(cardsRef.current.scrollWidth / 3); // 3 sets
      }
    });
    if (cardsRef.current) resizeObserver.observe(cardsRef.current);
    // initial calc
    if (cardsRef.current) setCardsWidth(cardsRef.current.scrollWidth / 3);
    return () => resizeObserver.disconnect();
  }, []);

  const DURATION = 20; // seconds for one full loop

  // Mobile auto-scroll refs/state
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const oneSetWidthRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    let rafId: number | null = null;
    let last = performance.now();

    const step = (now: number) => {
      if (!mq.matches || paused) {
        last = now;
        rafId = requestAnimationFrame(step);
        return;
      }
      const elapsed = now - last;
      last = now;
      const speedPxPerMs = 0.06; // ~60px/s
      const delta = elapsed * speedPxPerMs;
      const el = mobileRef.current;
      if (el) {
        // set one set width if unknown
        if (!oneSetWidthRef.current) {
          const total = el.scrollWidth;
          oneSetWidthRef.current = total / 3; // because loopedPartners = 3 sets
        }
        el.scrollLeft += delta;
        // When we've scrolled past one set, jump back by one set to create seamless loop
        if (el.scrollLeft >= oneSetWidthRef.current) {
          el.scrollLeft = el.scrollLeft - oneSetWidthRef.current;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [paused]);

  return (
    <div className="mt-8">
      <div className="w-full" style={{ maxWidth: "100vw" }}>
        {/* Desktop / tablet: animated marquee (hidden on small screens) */}
        <div className="hidden md:block overflow-hidden relative">
          <motion.div
            ref={cardsRef}
            className="flex gap-6 items-center py-4 px-2"
            animate={{ x: [0, -cardsWidth] }}
            transition={{ repeat: Infinity, ease: "linear", duration: DURATION }}
            style={{ willChange: 'transform', minWidth: '300%' }}
          >
            {loopedPartners.map((src, i) => (
              <div
                key={i}
                className="w-36 h-36 rounded-full partner-circle bg-white/10 flex items-center justify-center shadow-md border border-white/10 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`partner-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: continuous auto-scroll with pause-on-interaction; uses duplicated sets for seamless loop */}
        <div className="md:hidden mt-4">
          <div
            ref={mobileRef}
            className="flex gap-4 overflow-x-auto px-4 py-3 -mx-4 no-scrollbar"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            onPointerDown={() => setPaused(true)}
            onPointerUp={() => setPaused(false)}
          >
            {loopedPartners.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-24 h-24 rounded-full partner-circle bg-white/10 flex items-center justify-center shadow-sm border border-white/8 overflow-hidden">
                <img src={src} alt={`partner-mobile-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}