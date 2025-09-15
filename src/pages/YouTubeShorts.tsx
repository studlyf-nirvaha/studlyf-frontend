import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { SplitText } from "@/components/ui/split-text";
import TrendingContent from '@/components/TrendingContent';

const YouTubeShorts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = ['All', 'Tech', 'Finance', 'Entrepreneurship', 'Study Tips', 'Career'];

  // YouTube Shorts links provided by the user
  const youtubeShortLinks = [
    "https://youtube.com/shorts/l_AEy1e1u6w?si=RmIrYYCN_ufL24nt",
    "https://youtube.com/shorts/c3r2EyhtAFI?si=MnuOpdd06OuliEN6",
    "https://youtube.com/shorts/Mz_B2h3CCXo?si=7DuNJi2cgKAMd38o",
    "https://youtube.com/shorts/rNXpauB6t_A?si=XUhBFkGmgpaNoA3B",
    "https://youtube.com/shorts/zYkF1X2bBRk?si=tNIV2CluTxePQ5Ri",
    "https://youtube.com/shorts/nVhBrCeUC8s?si=kBoyBe9n10b9Eo8o",
    "https://youtube.com/shorts/aOUPycUS5lw?si=iDSA0WBvKXl7Uch8",
    "https://youtube.com/shorts/49sGbt1_QPI?si=R-uUKsqB8KfgPTOQ",
    "https://youtube.com/shorts/gm3ITLOJkFc?si=3E9s8RYLx2li-wAp",
    "https://youtube.com/shorts/R11oxDWg-u0?si=loVP1QJdQCp0GApe",
    "https://youtube.com/shorts/V2p80e98l9E?si=lXs6ZV_h3vZSu4KK",
    "https://youtube.com/shorts/c2ED0LZ4pCk?si=nGXn6PVYau979Nh-",
    "https://youtube.com/shorts/W8kG3vFjBOY?si=hdTrMdryGNS5cJKJ",
    "https://youtube.com/shorts/R4psUPXzLSs?si=lCXlLSfRVsx_M3vT",
    "https://youtube.com/shorts/xQHJOjr2sho?si=oIDaSOlJskQDD0l7",
    "https://youtube.com/shorts/TkV_iq-UbO0?si=LagYtLJPMxykgmqJ",
    "https://youtube.com/shorts/hpmYP_gQNu8?si=mfycEODumUBPire-",
    "https://youtube.com/shorts/LMDA5Ip4PYY?si=QB7-YcI1Sj07tc6o",
    "https://youtube.com/shorts/obER3ncpH2I?si=mfgzX0wiUvnqpoWG",
    "https://youtube.com/shorts/CeCitNDHNV0?si=BzaQuVS9qDFDT967",
    "https://youtube.com/shorts/TCdgKpRPwOM?si=xm2saKeCKSugPJgk",
    "https://youtube.com/shorts/B6z8QpeS2-Q?si=v-sCMUmsvoumGm0O",
    "https://youtube.com/shorts/5B4OiFm48Tw?si=JZuDf3e58jLEgXHZ",
    "https://youtube.com/shorts/zey9DSS1LOU?si=sHGvK6XeQPaODTK0",
    "https://youtube.com/shorts/FbtYxPUrhq8?si=FtakJG-HDX2MeoaU"
  ];

  // Helper to extract the video ID from a shorts URL
  function getShortsId(url) {
    const match = url.match(/shorts\/([\w-]+)/);
    return match ? match[1] : null;
  }

  const allShorts = youtubeShortLinks.map((url, idx) => {
    const id = getShortsId(url);
    return {
      id: id || idx,
      url,
      thumbnail: id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '',
    };
  });

  const filteredShorts = allShorts.filter(short => {
    // Optionally, add search/category filtering here if needed
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Heading and tagline */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Trending YouTube Shorts</h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Bite-sized videos to inspire your mindset, reveal surprising facts, and keep you updated on the latest in technology, learning, and more.
            </p>
              </div>

          {/* Videos Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2"
          >
            {filteredShorts.map((short, index) => (
              <motion.div
                key={short.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="block w-full text-left"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <Card className="glass-card border-none overflow-hidden group cursor-pointer p-0 rounded-2xl">
                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white" style={{ aspectRatio: '9/16', minHeight: 80, maxWidth: 180, margin: '0 auto' }}>
                    <img
                      src={short.thumbnail}
                        alt="YouTube Short Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                        style={{ aspectRatio: '9/16' }}
                      />
                      {/* Overlay for YouTube Shorts style */}
                      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end pointer-events-none">
                        <div className="flex justify-center pb-2">
                          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                            Watch
                          </span>
                        </div>
                    </div>
                    </div>
                </Card>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Mini modal for Shorts */}
          {openIndex !== null && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
              {/* Close button at top edge of screen on desktop, above modal on mobile */}
              <button
                className="fixed top-4 right-4 text-white bg-black/70 rounded-full p-3 z-50 hover:bg-black/90"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                style={{ position: 'fixed' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="relative bg-black rounded-xl shadow-2xl w-[60vw] max-w-[260px] sm:max-w-xs md:max-w-sm lg:max-w-md" style={{ aspectRatio: '9/16' }}>
                <iframe
                  src={
                    openIndex !== null && filteredShorts[openIndex]?.id
                      ? `https://www.youtube.com/embed/${filteredShorts[openIndex].id}?autoplay=1&modestbranding=1&rel=0&playsinline=1`
                      : undefined
                  }
                  title="YouTube Short"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full rounded-xl"
                  style={{ aspectRatio: '9/16', background: 'black' }}
                />
              </div>
              {/* Prev button outside modal */}
              {openIndex > 0 && (
                <button
                  className="fixed left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-3 z-50 hover:bg-black/90"
                  onClick={() => setOpenIndex(openIndex - 1)}
                  aria-label="Previous"
                  style={{ position: 'fixed' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
              )}
              {/* Next button outside modal */}
              {openIndex < filteredShorts.length - 1 && (
                <button
                  className="fixed right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full p-3 z-50 hover:bg-black/90"
                  onClick={() => setOpenIndex(openIndex + 1)}
                  aria-label="Next"
                  style={{ position: 'fixed' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YouTubeShorts;