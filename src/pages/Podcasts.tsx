import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Play } from 'lucide-react';
import { SplitText } from "@/components/ui/split-text";

const Podcasts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Career', 'Entrepreneurship', 'Finance', 'Personal Growth', 'Technology'];

  const allPodcasts = [
    {
      id: 1,
      title: "Navigating College and Career Decisions",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
      duration: "15:24",
      host: "Career Connect",
      category: "Career"
    },
    {
      id: 2,
      title: "Student Entrepreneurs: Success Stories",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa",
      duration: "22:10",
      host: "Startup Stories",
      category: "Entrepreneurship"
    },
    {
      id: 3,
      title: "Decoding Financial Independence",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
      duration: "18:45",
      host: "Money Matters",
      category: "Finance"
    },
    {
      id: 4,
      title: "Building Mental Resilience",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
      duration: "28:15",
      host: "Mind Matters",
      category: "Personal Growth"
    },
    {
      id: 5,
      title: "The Future of Work",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      duration: "19:30",
      host: "Future Focus",
      category: "Technology"
    },
    {
      id: 6,
      title: "Investment Strategies for Beginners",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
      duration: "25:45",
      host: "Finance First",
      category: "Finance"
    },
    {
      id: 7,
      title: "Leadership Lessons from Young CEOs",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
      duration: "32:20",
      host: "Leadership Lab",
      category: "Entrepreneurship"
    },
    {
      id: 8,
      title: "Tech Trends Shaping Tomorrow",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
      duration: "21:15",
      host: "Tech Talk",
      category: "Technology"
    }
  ];

  const filteredPodcasts = allPodcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         podcast.host.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || podcast.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <SplitText
              text="Podcast Library"
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white mb-8">
              Listen to insightful conversations and expert advice
            </p>
          </motion.div>

          {/* Search and Filter - Updated to match Finance page style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 md:space-y-8 w-full overflow-x-hidden mb-8"
          >
            {/* Search Bar - Prominent */}
            <div className="relative max-w-2xl mx-auto px-4 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl md:rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 shadow-lg border border-purple-500/30 w-full">
                <div className="relative w-full">
                  <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <Input
                    placeholder="Search podcasts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 w-full text-white focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-700/50 mx-4 w-[calc(100%-2rem)] max-w-none">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Filter className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0" />
                <span className="font-semibold text-white text-sm md:text-base">Categories</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 
                      "bg-gradient-to-r from-brand-purple to-brand-pink text-white" : 
                      "border-gray-600 text-gray-300 hover:border-purple-400 transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm min-h-[44px] w-full bg-gray-800/50 hover:bg-gray-700/50"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Podcasts Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredPodcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card border-none overflow-hidden group cursor-pointer rounded-2xl">
                  <div className="relative">
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <Button size="sm" className="bg-white text-purple-600 hover:bg-white/90 mr-2">
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                      <span className="text-white text-sm">{podcast.duration}</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs py-1 px-2 rounded">
                      {podcast.category}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-pink transition-all duration-300 line-clamp-2 mb-2">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-white">{podcast.host}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPodcasts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white text-lg">No podcasts found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Podcasts;
