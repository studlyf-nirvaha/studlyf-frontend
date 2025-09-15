import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Spline from '@splinetool/react-spline';
import StarBorder from '@/components/ui/StarBorder';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SlideButtonDemo from '@/components/ui/slide-button-demo'
import { useNavigate } from 'react-router-dom';

const NAV_LOGO_TOP = 24; // px from top (adjust to match Navbar)
const NAV_LOGO_LEFT = 32; // px from left (adjust to match Navbar)
const NAV_LOGO_SIZE = 48; // px (adjust to match Navbar logo size)

const Landing = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);
  const [logoRect, setLogoRect] = useState<{ top: number, left: number, width: number }>();
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Calculate logo's current position for animation
  const handleExplore = () => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      setLogoRect({ top: rect.top, left: rect.left, width: rect.width });
      setAnimating(true);
    }
  };

  // After animation, navigate
  useEffect(() => {
    if (animating) {
      const timeout = setTimeout(() => {
        navigate('/home');
      }, 900); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [animating, navigate]);

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

  // Animation target: top left of viewport (Navbar logo position)
  const target = {
    top: NAV_LOGO_TOP,
    left: NAV_LOGO_LEFT,
    width: NAV_LOGO_SIZE,
  };

  return (
    <motion.div className="min-h-screen text-white overflow-x-hidden bg-black flex flex-col items-center justify-center relative">
      {/* Animated background and glows (copied from Index) */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden" style={{ minHeight: '100vh', minWidth: '100vw' }}>
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] w-full h-full"
        />
        <motion.div
          style={{ y: glowY1 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
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
          className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
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
      </div>
      {/* Spline 3D Section - Absolutely fill viewport on all screens */}
      <div className="fixed inset-0 w-full h-full flex flex-col justify-center items-center bg-transparent z-10">
        <Spline scene="https://prod.spline.design/05L756QvwD1di3M7/scene.splinecode" className="absolute inset-0 w-full h-full" />
        <AnimatePresence>
          {!animating && (
            <motion.img
              ref={logoRef}
              src="/logo3.png"
              alt="Studlyf Logo"
              className="absolute z-20 w-72 md:w-[28rem] lg:w-[36rem] xl:w-[48rem] pointer-events-none select-none"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: 'auto',
                borderRadius: '10px',
                objectFit: 'contain',
                display: 'block',
              }}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          {animating && logoRect && (
            <motion.img
              src="/logo3.png"
              alt="Studlyf Logo"
              className="fixed z-50 pointer-events-none select-none"
              style={{
                top: logoRect.top,
                left: logoRect.left,
                width: logoRect.width,
                height: 'auto',
                margin: 0,
                padding: 0,
                borderRadius: '10px',
                objectFit: 'contain',
                display: 'block',
              }}
              initial={{
                top: logoRect.top,
                left: logoRect.left,
                width: logoRect.width,
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              animate={{
                top: target.top,
                left: target.left,
                width: target.width,
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        {/* Explore Now button, hidden during animation */}
        {!animating && (
          <div className="absolute z-30 left-1/2" style={{ top: '80%', transform: 'translate(-50%, 0)' }}>
            <div className="mb-4">
              <SlideButtonDemo />
            </div>
            {/* Removed InteractiveHoverButton */}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Landing;