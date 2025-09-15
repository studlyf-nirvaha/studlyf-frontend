import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const TrendingContent = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [openBlogIndex, setOpenBlogIndex] = useState(null);

  // Sample data
  const [youtubeShorts] = useState([
    {
      id: 1,
      title: "How to Land Your First Tech Internship",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      views: "125K",
      creator: "Tech Career Tips"
    },
    {
      id: 2,
      title: "5 Financial Hacks Every Student Should Know",
      thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
      views: "89K",
      creator: "Student Finance"
    },
    {
      id: 3,
      title: "Day in the Life of a Student Entrepreneur",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      views: "210K",
      creator: "StartupLife"
    },
    {
      id: 4,
      title: "Quick Tips for Better Productivity",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      views: "67K",
      creator: "ProductivityPro"
    },
    {
      id: 5,
      title: "Best Study Techniques for Exams",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      views: "156K",
      creator: "StudySmart"
    }
  ]);

  // Updated blogLinks with correct titles and images for the provided blogs
  const blogLinks = [
    {
      url: "https://theknowledgereviewmagazine.in/the-rise-of-skill-based-education-in-india/",
      title: "The Rise of Skill-Based Education in India",
      image: "/blog5.png",
    },
    {
      url: "https://blog.google/technology/ai/google-ai-updates-june-2025/",
      title: "Google AI Updates June 2025",
      image: "/blog4.png",
    },
    {
      url: "https://blog.google/outreach-initiatives/entrepreneurs/ai-for-education-cohort/",
      title: "AI for Education Cohort by Google",
      image: "/blog3.png",
    },
    {
      url: "https://blog.google/products/gemini/google-gemini-learning-features/",
      title: "Google Gemini Learning Features",
      image: "/blog2.png",
    },
    {
      url: "https://blog.google/outreach-initiatives/google-org/google-cybersecurity-investments-june-2024/",
      title: "Google Cybersecurity Investments June 2024",
      image: "/blog1.png",
    },
    {
      url: "https://www.financialexpress.com/industry/education-2/",
      title: "Financial Express: Education & Finance"
    },
    {
      url: "https://www.moneycontrol.com/news/business/personal-finance/",
      title: "Moneycontrol: Personal Finance Blog"
    },
    {
      url: "https://www.investopedia.com/financial-advisor-blog-5180723",
      title: "Investopedia: Financial Advisor Blog"
    },
    {
      url: "https://www.npr.org/sections/ed/",
      title: "NPR: Education Blog"
    },
    {
      url: "https://www.nerdwallet.com/blog/",
      title: "NerdWallet: Personal Finance Blog"
    }
  ];

  // Podcasts section removed

  // YouTube Shorts links provided by the user
  const youtubeShortLinks = [
    "https://youtube.com/shorts/l_AEy1e1u6w?si=RmIrYYCN_ufL24nt",
    "https://youtube.com/shorts/c3r2EyhtAFI?si=MnuOpdd06OuliEN6",
    "https://youtube.com/shorts/Mz_B2h3CCXo?si=7DuNJi2cgKAMd38o",
    "https://youtube.com/shorts/rNXpauB6t_A?si=XUhBFkGmgpaNoA3B",
    "https://youtube.com/shorts/zYkF1X2bBRk?si=tNIV2CluTxePQ5Ri",
    "https://youtube.com/shorts/nVhBrCeUC8s?si=kBoyBe9n10b9Eo8o",
    "https://youtube.com/shorts/aOUPycUS5lw?si=iDSA0WBvKXl7Uch8",
    // ... more links for the YouTube Shorts page
  ];

  // Helper to extract the video ID from a shorts URL
  function getShortsId(url) {
    const match = url.match(/shorts\/([\w-]+)/);
    return match ? match[1] : null;
  }

  return (
    <>
      {/* YouTube Shorts Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="bg-red-600 text-white p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                </svg>
              </span>
              <span className="text-xl font-semibold leading-tight pb-1" style={{ display: 'inline-block' }}>YouTube Shorts</span>
            </div>
            <InteractiveHoverButton
              text="Show More"
              onClick={() => navigate('/youtube-shorts')}
              className="w-20 px-3 py-1.5 text-xs flex items-center gap-1 rounded-full md:w-48 md:px-6 md:py-2 md:text-lg"
            >
              <ArrowRight className="h-4 w-4" />
            </InteractiveHoverButton>
          </div>
          <ScrollArea className="w-full whitespace-nowrap scroll-smooth">
            <div className="flex space-x-4 sm:space-x-8 pb-4">
              {youtubeShortLinks.slice(0, 7).map((url, idx) => {
                const id = getShortsId(url);
                const thumbnail = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
                return (
                  <button
                    key={id || idx}
                    type="button"
                    onClick={() => setOpenIndex(idx)}
                    className="group cursor-pointer flex-shrink-0 w-[150px] sm:w-[130px] md:w-[140px] lg:w-[160px] xl:w-[180px] flex flex-col items-center bg-transparent border-none p-0"
                    style={{ outline: 'none' }}
                  >
                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white" style={{ aspectRatio: '9/16', minHeight: 150 }}>
                      <img
                        src={thumbnail}
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
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        {/* Mini modal for Shorts (only close button) */}
        {openIndex !== null && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
            <div
              className="relative bg-black rounded-xl shadow-2xl w-[80vw] max-w-[300px] sm:max-w-[300px] md:max-w-[300px] lg:max-w-[300px] mt-24"
              style={{ aspectRatio: '9/16', maxHeight: '80vh' }}
            >
              <button
                className="absolute top-2 right-2 text-white bg-black/70 rounded-full p-2 z-50 hover:bg-black/90"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                style={{ position: 'absolute' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${getShortsId(youtubeShortLinks[openIndex])}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
                title="YouTube Short"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full rounded-xl"
                style={{ aspectRatio: '9/16', background: 'black' }}
              />
            </div>
          </div>
        )}
      </section>

      {/* Popular Blogs Section */}
      <section className="pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </span>
              <span className="text-xl font-semibold leading-tight pb-1" style={{ display: 'inline-block' }}>Popular Blogs</span>
            </div>
            <InteractiveHoverButton
              text="Show More"
              onClick={() => { navigate('/blogs'); window.scrollTo(0, 0); }}
              className="w-20 px-3 py-1.5 text-xs flex items-center gap-1 rounded-full md:w-48 md:px-6 md:py-2 md:text-lg"
            >
              <ArrowRight className="h-4 w-4" />
            </InteractiveHoverButton>
          </div>
          <ScrollArea className="w-full whitespace-nowrap scroll-smooth">
            <div className="flex space-x-4 sm:space-x-8 pb-4">
              {blogLinks.slice(0, 5).map((blog, idx) => (
                <button
                  key={blog.url}
                  type="button"
                  onClick={() => setOpenBlogIndex(idx)}
                  className="group cursor-pointer flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] xl:w-[460px] bg-white rounded-2xl shadow-lg overflow-hidden border-none p-0 text-left"
                  style={{ outline: 'none' }}
                >
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={blog.image || '/public/placeholder.svg'} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {/* Mini modal for Blog */}
          {openBlogIndex !== null && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
              <div className="relative bg-white rounded-2xl shadow-2xl w-[99vw] max-w-7xl h-[80vh] flex flex-col overflow-hidden mt-24 mb-8">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white z-10">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Favicon */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(
                        blogLinks[openBlogIndex].url
                      )}&sz=32`}
                      alt="Favicon"
                      className="w-6 h-6 rounded"
                    />
                    {/* Blog Title */}
                    <span className="font-semibold text-lg text-gray-900 truncate max-w-[200px] md:max-w-[400px]" title={blogLinks[openBlogIndex].title}>
                      {blogLinks[openBlogIndex].title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Open in new tab */}
                    <a
                      href={blogLinks[openBlogIndex].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition"
                    >
                      Read in New Tab
                    </a>
                    {/* Close button */}
                    <button
                      className="ml-2 text-gray-600 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => setOpenBlogIndex(null)}
                      aria-label="Close"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
                {/* Blog iframe with improved fallback UI */}
                <div className="flex-1 min-h-0">
                  <BlogIframeWithFallback url={blogLinks[openBlogIndex].url} title={blogLinks[openBlogIndex].title} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrendingContent;

function BlogIframeWithFallback({ url, title }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" /></svg>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to display this blog here</h2>
        <p className="text-gray-600 mb-6 text-center">This blog does not allow embedding for security reasons. You can still read it in a new tab.</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Open Blog in New Tab
        </a>
      </div>
    );
  }
  return (
    <iframe
      src={url}
      title={title}
      allowFullScreen
      className="w-full h-full rounded-xl border-0 flex-1"
      style={{ background: 'white', minHeight: 0 }}
      onError={() => setError(true)}
    />
  );
}