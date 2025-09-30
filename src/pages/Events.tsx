import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin, Users, FilterIcon, Sparkles, Plus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { SplitText } from "@/components/ui/split-text";
import Spline from '@splinetool/react-spline';
import EventCarousel from "@/components/EventCarousel";
import WhystudlyfImg from "../Whystudlyf.jpeg";

const Events = () => {
  const [city, setCity] = useState<string>("all");
  const [eventType, setEventType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [showHostForm, setShowHostForm] = useState(false);
  const [hostedEvents, setHostedEvents] = useState([]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "Demux 2.0",
      date: "29th August, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "BVRIT ,Narsapur",
      type: "Hackathon",
      attendees: 350,
      daysLeft: 42,
      description: "DEMUX 2.0 is the second edition of B V Raju Institute of Technology's flagship national-level 24-hour hackathon — a high-energy innovation sprint that brings together bright minds from across the country.",
      image: "/demux.png",
      registrationLink: "https://bvrit.ac.in/Demux2.0/index.html",
      info: {
        about: "DEMUX 2.0 is a 24-hour national-level hackathon at BVRIT Narsapur, focusing on real-world problem solving, innovation, and collaboration. Participants work in teams to build tech solutions and present them to industry experts.",
        skills: ["Problem Solving", "Teamwork", "Coding (any language)", "UI/UX Design", "Presentation Skills", "API Integration", "Rapid Prototyping"]
      }
    },
    {
      id: 2,
      title: "Entrepreneurship Hackathon by STPI x Techniche, IIT Guwahati",
      date: "August 29-32, 2025",
      time: "12:00 PM - 11:59 PM",
      location: "IIT Guwahati",
      type: "Entrepreneurship Hackathon",
      attendees: 120,
      daysLeft: 42,
      description: "Techniche, the annual techno-management festival of IIT Guwahati, in collaboration with STPI (Software Technology Parks of India), is proud to present a high-impact Entrepreneurship Hackathon aimed at fostering innovative and scalable ventures in India’s fast-growing tech space.",
      image: "/IITguahati.png",
      registrationLink: "https://unstop.com/competitions/entrepreneurship-hackathon-by-stpi-x-techniche-iit-guwahati-iit-guwahati-1509001",
      info: {
        about: "A hackathon focused on entrepreneurship and startup ideas, encouraging teams to develop business models and tech solutions for real-world challenges. Mentorship and networking opportunities included.",
        skills: ["Business Model Canvas", "Pitching", "Market Research", "Coding", "Teamwork", "Creativity", "Presentation"]
      }
    },
    {
      id: 3,
      title: "AI Masterclass : Build Smarter ML with Cloud",
      date: "July 8-10, 2025",
      time: "8:30 PM IST ",
      location: "Online",
      type: "Workshop",
      attendees: 500,
      daysLeft: 8,
      description: "This session shows you how to use cloud platforms to build and scale powerful ML solutions — without needing advanced tech setups.You’ll learn how to turn your ML models into real-time solutions.Get hands-on with popular AWS tools like Rekognition, Comprehend, and Textract through live demos — and see what real AI looks like in action.",
      image: "public/SarasAI.png",
      registrationLink: "https://unstop.com/workshops-webinars/ai-masterclass-build-smarter-ml-with-cloud-saras-ai-institute-1522670",
      info: {
        about: "A hands-on masterclass on building smarter machine learning solutions using cloud platforms. Learn to deploy, scale, and optimize ML models with AWS tools and real-world demos.",
        skills: ["Machine Learning Basics", "Cloud Computing", "AWS Services (Rekognition, Comprehend, Textract)", "Python Programming", "Data Preprocessing", "Model Deployment", "Problem Solving"]
      }
    },
    {
      id: 4,
      title: "DRISHTI – Idea Pitching Event",
      date: "July 30, 2025",
      time: "11:00 aM - 3:30 PM",
      location: "BVRIT ,Narsapur",
      type: "Ideathon",
      attendees: 250,
      daysLeft: 15,
      description: "Drishti is TechSurge 2K25’s signature idea pitching competition, inspired by Shark Tank, where aspiring innovators and entrepreneurs bring their game-changing concepts to life in front of a panel of industry experts, mentors, and potential investors.",
      image: "/drishti.png",
      registrationLink: "https://unstop.com/workshops-webinars/drishti-idea-pitching-event-bv-raju-institute-of-technology-narsapur-bvrit-n-1513723",
      info: {
        about: "DRISHTI is an idea pitching event where participants present innovative solutions to real-world problems before a panel of judges. The event encourages creativity, clarity, and entrepreneurial thinking.",
        skills: ["Idea Validation", "Pitching", "Presentation Skills", "Creativity", "Market Research", "Problem Identification", "Q&A Handling"]
      }
    }
  ];

  const allEvents = [...upcomingEvents, ...hostedEvents];
  // Filter out events whose last registration date has passed (today > lastRegistrationDate)
  const today = new Date();
  const filteredEvents = allEvents.filter(event => {
    // Filter out by registration date if present
    if (event.lastRegistrationDate) {
      const regDate = new Date(event.lastRegistrationDate);
      regDate.setHours(23, 59, 59, 999);
      if (today > regDate) return false;
    }

    // City filter
    if (!(city === "all" || event.location === city || (city === "online" && event.location === "Online"))) return false;

    // Event type dropdown filter
    if (!(eventType === "all" || event.type === eventType)) return false;

    // Search query (name or keywords in description)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const inTitle = event.title.toLowerCase().includes(q);
      const inDesc = (event.description || "").toLowerCase().includes(q) || (event.info?.about || "").toLowerCase().includes(q);
      if (!inTitle && !inDesc) return false;
    }

    // Chip filters (tags)
    if (activeChips.length > 0) {
      const matchesChip = activeChips.some(chip => event.type?.toLowerCase().includes(chip.toLowerCase()) || (event.info?.skills || []).some((s: string) => s.toLowerCase().includes(chip.toLowerCase())));
      if (!matchesChip) return false;
    }

    return true;
  });

  const handleHostEvent = (formData: any) => {
    // Assign a new id and parse date/time fields
    const newEvent = {
      ...formData,
      id: Date.now(),
      attendees: 0,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop", // Placeholder or allow upload
      daysLeft: Math.max(0, Math.ceil((new Date(formData.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
      type: formData.type,
      registrationLink: formData.registrationLink,
      lastRegistrationDate: formData.lastRegistrationDate,
    };
    setHostedEvents(prev => [...prev, newEvent]);
    setShowHostForm(false);
  };

  // Info modal state
  const [infoModal, setInfoModal] = useState<{ open: boolean, event: any }>({ open: false, event: null });

  return (
    <>
      {/* Hero Banner Section */}
      <div className="relative h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-pink-500 to-blue-500 overflow-hidden">
        {/* Large Hero Image */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <img
            src={WhystudlyfImg}
            alt="Events Hero"
            className="w-full h-full object-cover opacity-60"
            style={{ maxHeight: "500px" }}
          />
        </div>
        {/* Subtle silhouette blobs */}
        <svg className="pointer-events-none absolute -left-10 top-8 w-80 h-80 z-5 blur-3xl opacity-30 mix-blend-screen" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path fill="url(#g1)" d="M44.8,-23.5C55.9,-8.7,58.6,14.1,49.8,30.3C41.1,46.6,20.6,56.2,0.6,55.4C-19.3,54.6,-38.7,43.3,-49.7,27.3C-60.6,11.2,-63.1,-10.7,-52.6,-25.7C-42.1,-40.7,-18.6,-48.9,3.9,-50.2C26.3,-51.5,52.8,-45.5,44.8,-23.5Z" transform="translate(100 100)" />
        </svg>
        <svg className="pointer-events-none absolute right-6 -bottom-8 w-72 h-72 z-5 blur-2xl opacity-25 mix-blend-screen" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path fill="url(#g2)" d="M37.6,-20.8C49.3,-2.1,55.8,21.7,47.9,37.7C40,53.7,17.7,61.8,-2.3,63.3C-22.3,64.8,-44.6,59.6,-60.4,45.5C-76.2,31.4,-85.5,8.5,-79.1,-8.9C-72.7,-26.3,-50.6,-36.9,-30.1,-47C-9.6,-57.1,8.6,-66.6,27.8,-64.1C46.9,-61.6,65.9,-47.6,37.6,-20.8Z" transform="translate(100 100)" />
        </svg>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
              Ignite Your Potential
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-medium">
              Discover cutting-edge events, workshops, and networking opportunities that<br />
              will transform your future.
            </p>
            <a
              href="#events-list"
              className="inline-block px-8 py-4 rounded-full bg-pink-500 text-white font-bold text-lg shadow-lg hover:bg-pink-600 transition"
            >
              Explore Events
            </a>
            {/* chooser removed */}
          </div>
        </div>
        {/* Optional: Add animated confetti or particles here */}
        {/* dynamic hero element removed */}
      </div>

      <Helmet>
        <title>Events | StudLyF – Learn & Network</title>
        <meta name="description" content="Join events, workshops, and networking opportunities. StudLyF helps you learn, connect, and grow through curated events." />
      </Helmet>
      {/* Contextual internal links for SEO */}
      <div className="seo-links" style={{ display: 'none' }}>
        <a href="/finance">Finance</a>
        <a href="/network">Network</a>
        <a href="/project-hunt">Project Hunt</a>
        <a href="/startups">Startups</a>
      </div>

      {/* Spline Animation Background */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline
            scene="https://prod.spline.design/xfc5Llyw8cW1FBp7/scene.splinecode"
          />
        </Suspense>
        {/* Dark overlay to reduce brightness */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Rectangle overlay to cover Spline watermark (bottom right) */}
        <div
          className="absolute"
          style={{
            right: 0,
            bottom: 0,
            width: '260px', // Increased width for full coverage
            height: '60px', // Increased height for full coverage
            background: '#000', // Solid black for complete coverage
            zIndex: 20,
            borderTopLeftRadius: '18px',
            pointerEvents: 'none', // Prevent blocking UI
          }}
        />
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
      </div>

      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        id="events-list"
        className="container mx-auto px-4 pt-24 pb-16 relative text-base md:text-lg"
        style={{ fontFamily: 'Inter, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', lineHeight: 1.65 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <div>
                <SplitText
                  text="Events" // changed from "Next-Gen Events"
                  className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
                  delay={50}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                  easing="easeOutCubic"
                  threshold={0.3}
                  rootMargin="-100px"
                />
                <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-2xl">
                  Browse upcoming events, workshops and networking opportunities.
                </p>
              </div>
              <Button
                onClick={() => setShowHostForm(true)}
                className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity gap-2"
              >
                <Plus size={18} />
                Host Event
              </Button>
            </div>
            {/* Search + Filters */}
            <div className="bg-black/50 border border-white/5 rounded-xl p-4 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Quick search events by name or keyword..."
                      className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-400"
                    />
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-300 hover:text-white"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Hackathon','AI','Cloud','Workshop','Entrepreneurship'].map(chip => (
                      <button
                        key={chip}
                        onClick={() => setActiveChips(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${activeChips.includes(chip) ? 'bg-white/10 text-white' : 'bg-white/3 text-gray-200'}`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdvancedOpen(v => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white"
                  >
                    <FilterIcon className="w-4 h-4" />
                    Advanced
                  </button>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveChips([]); setCity('all'); setEventType('all'); }}
                    className="px-3 py-2 rounded-lg bg-red-600 text-white hover:opacity-90"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {/* Collapsible advanced filters */}
              {advancedOpen && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 inline-block">City</label>
                    <Select onValueChange={(v) => setCity(v)} defaultValue={city}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="BVRIT">BVRIT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-1 inline-block">Event Type</label>
                    <Select onValueChange={(v) => setEventType(v)} defaultValue={eventType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Hackathon">Hackathon</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-1 inline-block">When</label>
                    <Select onValueChange={() => {}} defaultValue="upcoming">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Upcoming" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="past">Past</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Host Event Form Modal */}
          <AnimatePresence>
            {showHostForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowHostForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-black/80 border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Host New Event</h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowHostForm(false)}>
                      <X size={20} />
                    </Button>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    handleHostEvent(Object.fromEntries(formData));
                  }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Title</label>
                      <Input name="title" placeholder="Enter event title" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <Input name="date" type="date" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Time</label>
                        <Input name="time" type="time" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Last Date of Registration</label>
                      <Input name="lastRegistrationDate" type="date" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Input name="location" placeholder="City or 'Online'" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Event Type</label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white border border-white/10">
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Registration Link</label>
                      <Input name="registrationLink" placeholder="Paste registration link" type="url" required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <Textarea name="description" placeholder="Describe your event" rows={3} required />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-brand-purple to-brand-pink">
                      Create Event
                    </Button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-lg bg-background/30 border border-white/10 rounded-xl p-4 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2 text-foreground/70">
                <FilterIcon size={18} className="text-brand-purple" />
                <span className="text-sm">Filter events:</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/80 backdrop-blur-md border-white/10">
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/80 backdrop-blur-md border-white/10">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* View Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Tabs defaultValue="list" className="mb-8">
              <TabsList className="bg-background/30 backdrop-blur-sm border border-white/10">
                <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white">List View</TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white">Calendar View</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-6">
                <motion.div
                  className="space-y-6"
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
                  {filteredEvents.map(event => (
                    <motion.div
                      key={event.id}
                      layout
                      whileHover={{ scale: 1.02 }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                      className="rounded-xl overflow-hidden bg-background/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div
                          className="md:w-1/4 h-40 md:h-auto bg-cover bg-center relative"
                          style={{ backgroundImage: `url(${event.image})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>

                        <div className="flex-1 p-6">
                          <div className="flex flex-wrap justify-between gap-4">
                            <div>
                              <div className="flex items-center mb-2">
                                <div className="mr-2 px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs font-medium rounded-full uppercase tracking-wider flex items-center">
                                  <Sparkles size={12} className="mr-1" />
                                  {event.type}
                                </div>
                                <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                                  {event.daysLeft} days left
                                </div>
                              </div>

                              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-brand-purple transition-colors flex items-center gap-2">
                                {event.title}
                                {event.info && (
                                  <Button size="icon" variant="outline" className="ml-2" onClick={() => setInfoModal({ open: true, event })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M12 8h.01M12 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                  </Button>
                                )}
                              </h3>

                              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-foreground/70 mb-3">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon size={14} className="text-brand-purple" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} className="text-brand-purple" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} className="text-brand-purple" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users size={14} className="text-brand-purple" />
                                  <span>{event.attendees} attending</span>
                                </div>
                              </div>

                              <p className="text-foreground/80">{event.description}</p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <a
                                href={event.registrationLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all h-9 px-3"
                              >
                                <span className="relative z-10">Join Event</span>
                                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {filteredEvents.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold mb-2">No events found</h3>
                      <p className="text-foreground/70">Try adjusting your filters</p>
                    </motion.div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-background/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden"
                >
                  <div className="p-8 flex flex-col items-center">
                    <Calendar
                      mode="single"
                      selected={null}
                      modifiers={{
                        event: allEvents.map(e => new Date(e.date.split(',')[1] ? e.date.split(',')[1] + ',' + e.date.split(',')[0] : e.date)),
                      }}
                      modifiersClassNames={{
                        event: "bg-brand-purple/20 text-brand-purple font-bold border border-brand-purple/40",
                      }}
                      onDayClick={date => {
                        const event = allEvents.find(e => {
                          const eventDate = new Date(e.date.split(',')[1] ? e.date.split(',')[1] + ',' + e.date.split(',')[0] : e.date);
                          return eventDate.toDateString() === date.toDateString();
                        });
                        if (event) {
                          setActiveEvent(event.id);
                        }
                      }}
                    />
                    <div className="text-center mt-8">
                      <p className="text-sm text-foreground/70">
                        Click on a highlighted date to view event details below.
                      </p>
                    </div>
                    {activeEvent && (
                      <div className="mt-8 w-full max-w-lg bg-background/80 border border-brand-purple/30 rounded-xl p-6 shadow-lg">
                        {(() => {
                          const event = allEvents.find(e => e.id === activeEvent);
                          if (!event) return null;
                          return (
                            <>
                              <h3 className="text-2xl font-bold mb-2 text-brand-purple">{event.title}</h3>
                              <div className="flex flex-wrap gap-4 text-sm mb-2">
                                <span className="flex items-center gap-1"><CalendarIcon size={16} className="text-brand-purple" />{event.date}</span>
                                <span className="flex items-center gap-1"><Clock size={16} className="text-brand-purple" />{event.time}</span>
                                <span className="flex items-center gap-1"><MapPin size={16} className="text-brand-purple" />{event.location}</span>
                                <span className="flex items-center gap-1"><Users size={16} className="text-brand-purple" />{event.attendees} attending</span>
                              </div>
                              <p className="mb-2 text-foreground/80">{event.description}</p>
                              <a
                                href={event.registrationLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 mt-2 h-9 px-3"
                              >
                                Join Event
                              </a>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
      <Footer />

      {/* Info Modal */}
      {infoModal.open && infoModal.event && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white text-black rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeInUp">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-purple-700 text-2xl font-bold"
              onClick={() => setInfoModal({ open: false, event: null })}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-brand-purple">{infoModal.event.title} Info</h2>
            <div className="mb-4">
              <strong>About:</strong>
              <p>{infoModal.event.info?.about}</p>
            </div>
            <div>
              <strong>Essential Skills:</strong>
              <ul className="list-disc list-inside">
                {infoModal.event.info?.skills?.map((skill: string, idx: number) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
