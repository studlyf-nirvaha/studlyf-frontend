import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Heart, User, MessageCircle, Filter, TrendingUp, Calendar, Clock, Award } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

const Community = () => {
  const [activePost, setActivePost] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const posts = [
    {
      id: 1,
      author: "Meera Kapoor",
      avatar: "MK",
      timeAgo: "2 hours ago",
      content: "Just completed my first investment through SIP! Any tips for a beginner? Looking for safe mutual funds with moderate returns.",
      likes: 24,
      comments: 18,
      category: "Finance"
    },
    {
      id: 2,
      author: "Rahul Sharma",
      avatar: "RS",
      timeAgo: "1 day ago",
      content: "I'm working on a new AI project for my college's tech fest. Looking for team members with experience in Python and machine learning. DM if interested!",
      likes: 45,
      comments: 32,
      category: "Startups"
    },
    {
      id: 3,
      author: "Anjali Desai",
      avatar: "AD",
      timeAgo: "3 days ago",
      content: "Nervous about my upcoming job interviews. Any resources for tech interview preparation specifically for freshers? Would appreciate any advice from recent graduates.",
      likes: 36,
      comments: 27,
      category: "Career & Education"
    },
    {
      id: 4,
      author: "Vihaan Mehta",
      avatar: "VM",
      timeAgo: "1 week ago",
      content: "I've been practicing meditation for the past month and it's significantly improved my focus during exam preparation. Anyone else experienced similar benefits?",
      likes: 89,
      comments: 41,
      category: "Personal Growth"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent" />
        
        {/* Animated floating particles */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-brand-purple rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 pt-24 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SplitText
              text="Join the Conversation"
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white mb-10">
              Connect with fellow students, share ideas, and get advice from the community.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <motion.div 
              className="flex-grow order-2 md:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Create Post */}
              <motion.div 
                className="mb-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 hover:border-brand-purple/30 transition-all duration-300"
                whileHover={{ boxShadow: "0 0 20px rgba(142, 68, 173, 0.2)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      placeholder="Start a new thread..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-brand-purple transition-all duration-300 placeholder-white/50"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-white">Share your thoughts, ask questions, or post updates</div>
                  <Button 
                    size="sm" 
                    className="relative overflow-hidden group bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all"
                  >
                    <span className="relative z-10">Post</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  </Button>
                </div>
              </motion.div>

              {/* Tabs for sorting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Tabs defaultValue="popular" className="mb-6">
                  <TabsList className="bg-white/5 border border-white/10">
                    <TabsTrigger 
                      value="newest" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white"
                    >
                      <Clock size={14} className="mr-2" />
                      Newest
                    </TabsTrigger>
                    <TabsTrigger 
                      value="popular" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white"
                    >
                      <TrendingUp size={14} className="mr-2" />
                      Most Popular
                    </TabsTrigger>
                    <TabsTrigger 
                      value="unanswered" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white"
                    >
                      <MessageCircle size={14} className="mr-2" />
                      Unanswered
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="newest">
                    <PostList posts={posts.sort((a, b) => b.id - a.id)} activePost={activePost} setActivePost={setActivePost} />
                  </TabsContent>
                  <TabsContent value="popular">
                    <PostList posts={posts.sort((a, b) => b.likes - a.likes)} activePost={activePost} setActivePost={setActivePost} />
                  </TabsContent>
                  <TabsContent value="unanswered">
                    <PostList posts={posts.filter(post => post.comments < 5)} activePost={activePost} setActivePost={setActivePost} />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="w-full md:w-64 flex-shrink-0 order-1 md:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <motion.div 
                  className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 hover:border-brand-purple/30 transition-all duration-300"
                  whileHover={{ boxShadow: "0 0 20px rgba(142, 68, 173, 0.2)" }}
                >
                  <h3 className="font-medium mb-3 flex items-center gap-2 text-white">
                    <Filter size={16} className="text-brand-purple" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {["All", "Finance", "Startups", "Career & Education", "Personal Growth"].map((category) => (
                      <motion.button
                        key={category}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-300 ${
                          category === "All" 
                            ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white" 
                            : "hover:bg-white/10 text-white hover:text-white"
                        }`}
                        whileHover={{ x: 3 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Community Stats */}
                <motion.div 
                  className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 hover:border-brand-purple/30 transition-all duration-300"
                  whileHover={{ boxShadow: "0 0 20px rgba(142, 68, 173, 0.2)" }}
                >
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Award size={16} className="text-brand-purple" />
                    Community Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                      <span className="text-white">Members</span>
                      <span className="font-medium text-white">15,240</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                      <span className="text-white">Posts</span>
                      <span className="font-medium text-white">32,861</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                      <span className="text-white">Online Now</span>
                      <motion.span 
                        className="font-medium text-brand-purple"
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        213
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Trending Topics */}
                <motion.div 
                  className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 hover:border-brand-purple/30 transition-all duration-300"
                  whileHover={{ boxShadow: "0 0 20px rgba(142, 68, 173, 0.2)" }}
                >
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <TrendingUp size={16} className="text-brand-purple" />
                    Trending Topics
                  </h3>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-white/5 text-sm">
                      <p className="font-medium">#CareerGrowth</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-sm">
                      <p className="font-medium">#StockMarketTips</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-sm">
                      <p className="font-medium">#AIStartups</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

interface PostListProps {
  posts: any[];
  activePost: number | null;
  setActivePost: (id: number | null) => void;
}

const PostList = ({ posts, activePost, setActivePost }: PostListProps) => {
  return (
    <motion.div 
      className="space-y-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
    >
      {posts.map(post => (
        <motion.div 
          key={post.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 }}
          }}
          whileHover={{ scale: 1.01 }}
          className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 hover:border-brand-purple/30 transition-all duration-300"
          onClick={() => setActivePost(activePost === post.id ? null : post.id)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center text-white">
              {post.avatar}
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-white">{post.timeAgo}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple">{post.category}</span>
              </div>
            </div>
          </div>
          <p className="mb-4 leading-relaxed">{post.content}</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-sm text-white hover:text-brand-pink transition-colors">
              <Heart size={16} className="text-brand-pink" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-white hover:text-brand-purple transition-colors">
              <MessageSquare size={16} />
              <span>{post.comments} comments</span>
            </button>
            <Button variant="ghost" size="sm" className="ml-auto text-white hover:text-white hover:bg-white/10">
              <MessageCircle size={16} className="mr-1" />
              Reply
            </Button>
          </div>
          
          <AnimatePresence>
            {activePost === post.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-purple/70 to-brand-pink/70 flex items-center justify-center text-white text-xs">
                    ME
                  </div>
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      placeholder="Write your reply..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand-purple transition-all duration-300 placeholder-white/50"
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        size="sm" 
                        className="relative overflow-hidden group bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all"
                      >
                        <span className="relative z-10">Reply</span>
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Community;
