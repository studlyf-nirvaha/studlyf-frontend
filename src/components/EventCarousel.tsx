import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Lightbulb, TrendingUp, Users, Clock, BookOpen, Target } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const EventCarousel = ({ events: propEvents }) => {
  const [eventIndex, setEventIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [isEventsHovered, setIsEventsHovered] = useState(false);
  const [isTipsHovered, setIsTipsHovered] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const defaultEvents = [
    {
      id: 1,
      title: "Tech Hackathon 2024",
      date: "June 15-17, 2024",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Join the biggest student hackathon with amazing prizes and networking opportunities.",
      participants: "500+ Students",
      prize: "₹5 Lakhs",
      category: "Technology"
    },
    {
      id: 2,
      title: "Financial Literacy Workshop",
      date: "July 5, 2024",
      location: "Online",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      description: "Learn the basics of financial planning, investing, and budgeting for students.",
      participants: "1000+ Students",
      prize: "Free Certificate",
      category: "Finance"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "July 20, 2024",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=400&h=300&fit=crop",
      description: "Pitch your startup idea to investors and win funding opportunities.",
      participants: "200+ Startups",
      prize: "₹10 Lakhs Funding",
      category: "Business"
    },
    {
      id: 4,
      title: "AI/ML Workshop Series",
      date: "August 10-12, 2024",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      description: "Hands-on workshop on Artificial Intelligence and Machine Learning for beginners.",
      participants: "300+ Students",
      prize: "Industry Certificate",
      category: "Technology"
    },
    {
      id: 5,
      title: "Design Thinking Bootcamp",
      date: "August 25, 2024",
      location: "Pune",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      description: "Learn design thinking methodology and create innovative solutions.",
      participants: "150+ Students",
      prize: "Design Portfolio",
      category: "Design"
    }
  ];
  const events = propEvents || defaultEvents;

  const tips = [
    {
      id: 1,
      title: "Start an SIP Early",
      description: "Even small investments can grow significantly over time due to compound interest. Start with as little as ₹500 per month.",
      icon: "💰",
      category: "Investment",
      readTime: "2 min read",
      impact: "High"
    },
    {
      id: 2,
      title: "Track Your Expenses",
      description: "Use expense tracking apps to understand where your money goes each month. Knowledge is the first step to financial freedom.",
      icon: "📊",
      category: "Budgeting",
      readTime: "3 min read",
      impact: "Medium"
    },
    {
      id: 3,
      title: "Build Emergency Fund",
      description: "Save at least 3-6 months of expenses in an easily accessible account. This is your financial safety net.",
      icon: "💰",
      category: "Savings",
      readTime: "4 min read",
      impact: "High"
    },
    {
      id: 4,
      title: "Understand Credit Score",
      description: "Your credit score affects loan approvals and interest rates. Monitor it regularly and maintain good credit habits.",
      icon: "📈",
      category: "Credit",
      readTime: "5 min read",
      impact: "High"
    },
    {
      id: 5,
      title: "Diversify Investments",
      description: "Don't put all your money in one place. Spread investments across different asset classes to reduce risk.",
      icon: "🎯",
      category: "Investment",
      readTime: "3 min read",
      impact: "Medium"
    },
    {
      id: 6,
      title: "Learn About Taxes",
      description: "Understanding tax deductions and exemptions can save you thousands. Start learning about tax planning early.",
      icon: "📋",
      category: "Tax Planning",
      readTime: "6 min read",
      impact: "High"
    }
  ];

  // Auto-scroll for events
  useEffect(() => {
    if (isEventsHovered) return;

    const interval = setInterval(() => {
      setEventIndex((current) => (current + 1) % events.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isEventsHovered, events.length]);

  // Auto-scroll for tips
  useEffect(() => {
    if (isTipsHovered) return;

    const interval = setInterval(() => {
      setTipIndex((current) => (current + 1) % tips.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isTipsHovered, tips.length]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full blur-3xl opacity-20"
          animate={{
            background: [
              "radial-gradient(circle, rgba(142, 68, 173, 0.3), transparent)",
              "radial-gradient(circle, rgba(240, 98, 146, 0.3), transparent)",
              "radial-gradient(circle, rgba(142, 68, 173, 0.3), transparent)",
            ],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-64 h-64 rounded-full blur-3xl opacity-20"
          animate={{
            background: [
              "radial-gradient(circle, rgba(240, 98, 146, 0.3), transparent)",
              "radial-gradient(circle, rgba(142, 68, 173, 0.3), transparent)",
              "radial-gradient(circle, rgba(240, 98, 146, 0.3), transparent)",
            ],
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4"
          >
            <TrendingUp className="w-8 h-8 text-brand-purple" />
            <motion.h2
              className="text-3xl md:text-5xl font-bold"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                background: "linear-gradient(90deg, #ffffff, #8E44AD, #F06292, #ffffff)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Events & Daily Tips
            </motion.h2>
            <Lightbulb className="w-8 h-8 text-brand-pink" />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Stay updated with upcoming events and learn something new every day to boost your career
          </motion.p>
        </motion.div>

        {/* Side by Side Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
        >
          {/* Events Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
            onMouseEnter={() => setIsEventsHovered(true)}
            onMouseLeave={() => setIsEventsHovered(false)}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-purple/20 rounded-lg">
                <Calendar className="w-6 h-6 text-brand-purple" />
              </div>
              <h3 className="text-2xl font-bold text-white">Upcoming Events</h3>
            </div>

            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={eventIndex}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Card className="h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 hover:border-brand-purple/30 transition-all duration-500 overflow-hidden group relative">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={events[eventIndex].image}
                        alt={events[eventIndex].title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <motion.div
                        className="absolute top-4 left-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Badge className="bg-brand-purple/90 text-white border-0">
                          {events[eventIndex].category}
                        </Badge>
                      </motion.div>
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                          {events[eventIndex].prize}
                        </Badge>
                      </motion.div>
                      {/* Info Button */}
                      <button
                        className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-brand-purple rounded-full p-2 shadow-lg transition-all z-20"
                        onClick={() => setShowEventModal(true)}
                        aria-label="Show event info"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9.75h.008v.008h-.008V9.75zm0 3.75h.008v.008h-.008V13.5zm.75 6.75a9 9 0 100-18 9 9 0 000 18zm0-13.5v.008h.008V6.75h-.008zm0 3.75v.008h.008V10.5h-.008zm0 3.75v.008h.008V14.25h-.008z" />
                        </svg>
                      </button>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <motion.h4
                        className="text-xl font-bold text-white group-hover:text-brand-purple transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {events[eventIndex].title}
                      </motion.h4>

                      <motion.p
                        className="text-white/80 text-sm leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {events[eventIndex].description}
                      </motion.p>

                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center text-white/70 text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-brand-purple" />
                          <span>{events[eventIndex].date}</span>
                        </div>
                        <div className="flex items-center text-white/70 text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-brand-pink" />
                          <span>{events[eventIndex].location}</span>
                        </div>
                        <div className="flex items-center text-white/70 text-sm">
                          <Users className="w-4 h-4 mr-2 text-brand-purple" />
                          <span>{events[eventIndex].participants}</span>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Button
                          className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all duration-300"
                          size="sm"
                        >
                          Register Now
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Event Indicators */}
            <div className="flex justify-center gap-2">
              {events.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setEventIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${eventIndex === i
                    ? "w-8 bg-gradient-to-r from-brand-purple to-brand-pink"
                    : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Daily Tips Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
            onMouseEnter={() => setIsTipsHovered(true)}
            onMouseLeave={() => setIsTipsHovered(false)}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-pink/20 rounded-lg">
                <Lightbulb className="w-6 h-6 text-brand-pink" />
              </div>
              <h3 className="text-2xl font-bold text-white">Daily Financial Tips</h3>
            </div>

            <div className="relative h-[400px] overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tipIndex}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Card className="h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 hover:border-brand-pink/30 transition-all duration-500 overflow-hidden group relative">
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(142, 68, 173, 0.1), transparent)",
                          "linear-gradient(45deg, rgba(240, 98, 146, 0.1), transparent)",
                          "linear-gradient(45deg, rgba(142, 68, 173, 0.1), transparent)",
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <CardContent className="p-8 h-full flex flex-col justify-center text-center relative z-10">
                      <motion.div
                        className="text-6xl mb-6"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -10, 10, 0]
                        }}
                      >
                        {tips[tipIndex].icon}
                      </motion.div>

                      <motion.div
                        className="mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Badge className="bg-brand-pink/20 text-brand-pink border-brand-pink/30">
                          DAILY TIP
                        </Badge>
                      </motion.div>

                      <motion.h4
                        className="text-2xl font-bold text-white mb-4 group-hover:text-brand-pink transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {tips[tipIndex].title}
                      </motion.h4>

                      <motion.p
                        className="text-white/80 leading-relaxed mb-6 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {tips[tipIndex].description}
                      </motion.p>

                      <motion.div
                        className="flex items-center justify-center gap-4 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge variant="outline" className="border-brand-purple/30 text-brand-purple bg-brand-purple/10 text-xs">
                          {tips[tipIndex].category}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white/70 bg-white/5 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {tips[tipIndex].readTime}
                        </Badge>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Badge
                          className={`${tips[tipIndex].impact === 'High'
                            ? 'bg-green-500/20 text-green-300 border-green-400/30'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
                            }`}
                        >
                          <Target className="w-3 h-3 mr-1" />
                          {tips[tipIndex].impact} Impact
                        </Badge>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Tip Indicators */}
            <div className="flex justify-center gap-2">
              {tips.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setTipIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${tipIndex === i
                    ? "w-8 bg-gradient-to-r from-brand-pink to-brand-purple"
                    : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Event Info Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="max-w-lg w-full p-6 bg-black/95 rounded-2xl shadow-2xl text-white">
          <DialogTitle className="text-2xl font-bold mb-2">{events[eventIndex].title}</DialogTitle>
          <img src={events[eventIndex].image} alt={events[eventIndex].title} className="w-full h-48 object-cover rounded-xl mb-4" />
          <div className="mb-2 text-lg text-white/80">{events[eventIndex].description}</div>
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <Calendar className="w-5 h-5 text-brand-purple" />
            <span>{events[eventIndex].date}</span>
          </div>
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <MapPin className="w-5 h-5 text-brand-pink" />
            <span>{events[eventIndex].location}</span>
          </div>
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <Users className="w-5 h-5 text-brand-purple" />
            <span>{events[eventIndex].participants}</span>
          </div>
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <Badge className="bg-brand-purple/90 text-white border-0">{events[eventIndex].category}</Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30">{events[eventIndex].prize}</Badge>
          </div>
          <Button className="w-full mt-4 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all duration-300" onClick={() => setShowEventModal(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EventCarousel;