import { useState, useEffect } from "react";
import Spline from '@splinetool/react-spline';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Refactored components
import FinanceHero from "@/components/finance/FinanceHero"; // <-- already updated to show first image
import SmartFilters from "@/components/finance/SmartFilters";
import GuidedPath from "@/components/finance/GuidedPath";
import LearningCards from "@/components/finance/LearningCards";
import SmartTools from "@/components/finance/SmartTools";
import RecommendationsSection from "@/components/finance/RecommendationsSection";
import CallToActionSection from "@/components/finance/CallToActionSection";

const Finance = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Finance | StudLyF – Smart Student Finance Tools</title>
        <meta
          name="description"
          content="Plan, track, and optimize your finances with calculators, planners, and smart tools for students."
        />
      </Helmet>

      {/* Contextual internal links for SEO */}
      <div className="seo-links" style={{ display: "none" }}>
        <a href="/events">Events</a>
        <a href="/network">Network</a>
        <a href="/project-hunt">Project Hunt</a>
        <a href="/startups">Startups</a>
      </div>

      <div className="min-h-screen bg-black overflow-x-hidden relative">
        {/* Navbar */}
        <Navbar />

        <div className="relative z-10 w-full">
          <div className="w-full px-4 pt-20 pb-16">
            <motion.div
              className="max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* ✅ Hero Section (now using first image via FinanceHero.jsx) */}
              <FinanceHero
                showAdvanced={showAdvanced}
                setShowAdvanced={setShowAdvanced}
              />

              {/* Smart Tools & Calculators */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
              >
                <SmartTools />
              </motion.div>

              {/* Smart Filters + Search */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full"
              >
                <SmartFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </motion.div>

              {/* Core Learning Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-full"
              >
                <LearningCards selectedCategory={selectedCategory} />
              </motion.div>

              {/* Recommendations & Resources */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-full"
              >
                <RecommendationsSection />
              </motion.div>

              {/* Call-to-Action Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="w-full"
              >
                <CallToActionSection />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Guided Path / Interactive Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-7xl mx-auto px-4 pb-12"
      >
        <GuidedPath />
      </motion.div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Finance;
