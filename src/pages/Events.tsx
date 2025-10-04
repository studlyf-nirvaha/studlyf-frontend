import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin, Users, FilterIcon, Sparkles, Plus, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { SplitText } from "@/components/ui/split-text";
import Spline from "@splinetool/react-spline";
import WhystudlyfImg from "../Whystudlyf.jpeg";

// Backend API
const API_URL = "http://127.0.0.1:5001/events";

const Events = () => {
  const [mounted, setMounted] = useState(false);
  const [city, setCity] = useState("all");
  const [eventType, setEventType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [showHostForm, setShowHostForm] = useState(false);
  const [hostedEvents, setHostedEvents] = useState<any[]>([]);
  const [fetchedEvents, setFetchedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Info modal
  const [infoModal, setInfoModal] = useState<{ open: boolean; event: any }>({ open: false, event: null });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setFetchedEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const allEvents = [...fetchedEvents, ...hostedEvents];

  // Filtered events
  const today = new Date();
  const filteredEvents = allEvents.filter(event => {
    // Optional registration filter
    if (event.registration_end_date) {
      const regDate = new Date(event.registration_end_date);
      regDate.setHours(23, 59, 59, 999);
      if (today > regDate) return false;
    }

    if (!(city === "all" || event.location === city || (city === "online" && event.location === "Online"))) return false;
    if (!(eventType === "all" || event.type === eventType)) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const inTitle = event.title.toLowerCase().includes(q);
      const inDesc = (event.description || "").toLowerCase().includes(q) || (event.info?.about || "").toLowerCase().includes(q);
      if (!inTitle && !inDesc) return false;
    }

    if (activeChips.length > 0) {
      const matchesChip = activeChips.some(chip =>
        event.type?.toLowerCase().includes(chip.toLowerCase()) ||
        (event.info?.skills || []).some((s: string) => s.toLowerCase().includes(chip.toLowerCase()))
      );
      if (!matchesChip) return false;
    }

    return true;
  });

  // Handle hosting a new event
  const handleHostEvent = (formData: any) => {
    const newEvent = {
      ...formData,
      id: Date.now(),
      attendees: 0,
      daysLeft: Math.max(0, Math.ceil((new Date(formData.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    };
    setHostedEvents(prev => [...prev, newEvent]);
    setShowHostForm(false);
  };

  return (
    <>
      <Helmet>
        <title>Events | StudLyF – Learn & Network</title>
      </Helmet>

      {/* Hero */}
      <div className="relative h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-pink-500 to-blue-500 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <img src={WhystudlyfImg} alt="Events Hero" className="w-full h-full object-cover opacity-60" style={{ maxHeight: "500px" }} />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20 text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">Ignite Your Potential</h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-medium">
              Discover cutting-edge events, workshops, and networking opportunities that will transform your future.
            </p>
            <a href="#events-list" className="inline-block px-8 py-4 rounded-full bg-pink-500 text-white font-bold text-lg shadow-lg hover:bg-pink-600 transition">Explore Events</a>
          </div>
        </div>
      </div>

      {/* Spline background */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline scene="https://prod.spline.design/xfc5Llyw8cW1FBp7/scene.splinecode" />
        </Suspense>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Navbar />

      <motion.div id="events-list" className="container mx-auto px-4 pt-24 pb-16 relative text-base md:text-lg">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <SplitText
                text="Events"
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              />
              <Button onClick={() => setShowHostForm(true)} className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity gap-2">
                <Plus size={18} /> Host Event
              </Button>
            </div>

            {/* Search + Chips */}
            <div className="bg-black/50 border border-white/5 rounded-xl p-4 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Quick search events..." className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-400" />
                    <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-300 hover:text-white">✕</button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Hackathon','AI','Cloud','Workshop','Entrepreneurship'].map(chip => (
                      <button key={chip} onClick={() => setActiveChips(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip])}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${activeChips.includes(chip) ? 'bg-white/10 text-white' : 'bg-white/3 text-gray-200'}`}>{chip}</button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => setAdvancedOpen(v => !v)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white"><FilterIcon className="w-4 h-4" /> Advanced</button>
                  <button onClick={() => { setSearchQuery(''); setActiveChips([]); setCity('all'); setEventType('all'); }} className="px-3 py-2 rounded-lg bg-red-600 text-white hover:opacity-90">Reset Filters</button>
                </div>
              </div>

              {advancedOpen && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 inline-block">City</label>
                    <Select onValueChange={(v) => setCity(v)} defaultValue={city}>
                      <SelectTrigger className="w-full"><SelectValue placeholder="All cities" /></SelectTrigger>
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
                      <SelectTrigger className="w-full"><SelectValue placeholder="All types" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Hackathon">Hackathon</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Host Event Modal */}
          <AnimatePresence>
            {showHostForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowHostForm(false)}
              >
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-black/80 border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Host New Event</h2>
                    <Button variant="ghost" size="sm" onClick={() => setShowHostForm(false)}><X size={20} /></Button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.target as HTMLFormElement); handleHostEvent(Object.fromEntries(formData)); }} className="space-y-4">
                    <Input name="title" placeholder="Event Title" required />
                    <Input name="date" type="date" required />
                    <Input name="time" type="time" required />
                    <Input name="lastRegistrationDate" type="date" required />
                    <Input name="location" placeholder="City or 'Online'" required />
                    <Select name="type" required>
                      <SelectTrigger><SelectValue placeholder="Select event type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hackathon">Hackathon</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input name="registrationLink" placeholder="Registration link" type="url" required />
                    <Textarea name="description" placeholder="Description" rows={3} required />
                    <Button type="submit" className="w-full bg-gradient-to-r from-brand-purple to-brand-pink">Create Event</Button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event List Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <Tabs defaultValue="list" className="mb-8">
              <TabsList className="bg-background/30 backdrop-blur-sm border border-white/10">
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>

              {/* List view */}
              <TabsContent value="list" className="mt-6">
                {loading ? <p>Loading events...</p> : filteredEvents.map(event => (
                  <motion.div key={event.id} className="rounded-xl overflow-hidden bg-background/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 mb-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-40 md:h-auto bg-cover bg-center relative" style={{ backgroundImage: `url(${event.image || ''})` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-wrap justify-between gap-4">
                          <div>
                            <div className="flex items-center mb-2 gap-2">
                              <div className="px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs font-medium rounded-full flex items-center gap-1"><Sparkles size={12} />{event.type}</div>
                              <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">{event.daysLeft || 0} days left</div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-foreground/70 mb-3">
                              <span className="flex items-center gap-1"><CalendarIcon size={14} /> {event.date}</span>
                              <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                              <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                              <span className="flex items-center gap-1"><Users size={14} /> {event.attendees}</span>
                            </div>
                            <p className="line-clamp-2 mb-2">{event.description}</p>
                            <Button onClick={() => setInfoModal({ open: true, event })}>Info</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {filteredEvents.length === 0 && <p>No events found.</p>}
              </TabsContent>

              {/* Calendar view */}
              <TabsContent value="calendar" className="mt-6">
                <Calendar mode="single" selected={null} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>

      {/* Info Modal */}
      {infoModal.open && infoModal.event && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white text-black rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-purple-700 text-2xl font-bold" onClick={() => setInfoModal({ open: false, event: null })}>&times;</button>
            <h2 className="text-2xl font-bold mb-2 text-brand-purple">{infoModal.event.title}</h2>
            <p>{infoModal.event.info?.about || infoModal.event.description}</p>
            {infoModal.event.info?.skills?.length > 0 && (
              <ul className="list-disc list-inside mt-2">
                {infoModal.event.info.skills.map((skill: string, idx: number) => <li key={idx}>{skill}</li>)}
              </ul>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Events;
