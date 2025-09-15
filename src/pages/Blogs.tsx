import { motion } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, TrendingUp, Calendar } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

const blogs = [
  {
    id: 1,
    title: "How I Built My First Startup in College",
    author: "Priya Sharma",
    authorType: "Student",
    date: "2024-06-10",
    readTime: "5 min read",
    category: "Entrepreneurship",
    excerpt: "My journey from idea to execution, and the lessons learned along the way.",
    views: 1250,
    isPopular: true
  },
  {
    id: 2,
    title: "The Future of AI in Education",
    author: "Dr. Rajesh Kumar",
    authorType: "Expert",
    date: "2024-06-08",
    readTime: "8 min read",
    category: "Technology",
    excerpt: "Exploring how artificial intelligence is reshaping the educational landscape.",
    views: 2100,
    isPopular: true
  },
  {
    id: 3,
    title: "Fundraising Tips for Student Entrepreneurs",
    author: "Amit Patel",
    authorType: "Founder",
    date: "2024-06-12",
    readTime: "6 min read",
    category: "Finance",
    excerpt: "Practical advice on raising funds for your startup while still in college.",
    views: 850,
    isPopular: false
  },
  {
    id: 4,
    title: "Balancing Studies and Side Projects",
    author: "Sneha Gupta",
    authorType: "Student",
    date: "2024-06-14",
    readTime: "4 min read",
    category: "Productivity",
    excerpt: "Time management strategies that actually work for busy students.",
    views: 1100,
    isPopular: false
  }
];

const Blogs = () => {
  // Restore activeTab and sortedBlogs logic
  const [activeTab, setActiveTab] = useState("newest");

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (activeTab === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.views - a.views;
    }
  });

  const getAuthorTypeColor = (type: string) => {
    switch (type) {
      case "Student":
        return "bg-blue-500/20 text-blue-400";
      case "Founder":
        return "bg-brand-purple/20 text-brand-purple";
      case "Expert":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO: Update title and description here for Blogs page */}
      <Helmet>
        <title>Blogs | StudLyF – Insights & Inspiration</title>
        <meta name="description" content="Read insightful blogs and articles on entrepreneurship, technology, and student life. StudLyF brings inspiration and knowledge to your journey." />
      </Helmet>
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
              text="Blogs"
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover insights, tips, and stories from students, entrepreneurs, and industry experts.
            </p>
          </motion.div>

          {/* Blog Links Row (same as home page) */}
          <div className="w-full overflow-x-auto mb-8">
            <div className="flex space-x-2 sm:space-x-3 pb-4">
              {[
                { url: "https://blog.google/technology/ai/google-ai-updates-june-2025/", title: "Google for Education Blog (Official)", image: "/blog4.png" },
                { url: "https://theknowledgereviewmagazine.in/the-rise-of-skill-based-education-in-india/", title: "Microsoft Education Blog (Official)", image: "/blog5.png" },
                { url: "https://blog.google/outreach-initiatives/entrepreneurs/ai-for-education-cohort/", title: "Khan Academy Blog (Official)", image: "/blog3.png" },
                { url: "https://blog.google/products/gemini/google-gemini-learning-features/", title: "Edutopia: Education & Student Success Blog", image: "/blog2.png" },
                { url: "https://blog.google/outreach-initiatives/google-org/google-cybersecurity-investments-june-2024/", title: "NY Times Learning Blog", image: "/blog1.png" },
              ].map((blog) => (
                <a
                  key={blog.url}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] bg-white rounded-2xl shadow-lg overflow-hidden border-none p-0 text-left transition-transform hover:scale-105"
                  style={{ outline: 'none', textDecoration: 'none' }}
                >
                  <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Filters */}
          {/* Filters/tabs removed as requested */}

          {/* Blogs Grid */}
          {/* Blog cards removed as requested */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;