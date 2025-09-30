import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Spline from "@splinetool/react-spline";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

// Backend API (must match your Flask port!)
const API_URL = "http://127.0.0.1:5001/events";

const Events = () => {
  const [showHostForm, setShowHostForm] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    event_date: "",
    time: "",
    attendees: 0,
    registration_link: "",
    registration_end_date: "",
  });

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

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === "number" ? Number(value) : value });
  };

  // Handle select input
  const handleTypeChange = (val: string) => {
    setFormData({ ...formData, type: val });
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newEvent = await res.json();
        setFetchedEvents(prev => [newEvent, ...prev]);
        setShowHostForm(false);
        setFormData({
          title: "",
          description: "",
          type: "",
          location: "",
          event_date: "",
          time: "",
          attendees: 0,
          registration_link: "",
          registration_end_date: "",
        });
      } else {
        alert("Failed to add event. Please check your input.");
      }
    } catch (error) {
      alert("Error adding event. Please try again.");
      console.error("Error adding event:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Events | StudLyF</title>
      </Helmet>
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline scene="https://prod.spline.design/xfc5Llyw8cW1FBp7/scene.splinecode" />
        </Suspense>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-24 pb-16 relative"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
            Next-Gen Events
          </h1>
          <Button
            onClick={() => setShowHostForm(true)}
            className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity gap-2"
          >
            <Plus size={18} />
            Host Event
          </Button>

          {/* Host Event Modal */}
          {showHostForm && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-black rounded-xl p-6 w-full max-w-lg relative border border-white/10 text-white">
                <button
                  onClick={() => setShowHostForm(false)}
                  className="absolute top-3 right-3"
                >
                  <X />
                </button>
                <h2 className="text-xl font-bold mb-4">Host Your Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="date"
                    name="registration_end_date"
                    value={formData.registration_end_date}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                  <Input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <Select
                    value={formData.type}
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hackathon">Hackathon</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Ideathon">Ideathon</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <Input
                    name="registration_link"
                    placeholder="Registration Link"
                    value={formData.registration_link}
                    onChange={handleChange}
                  />
                  <Input
                    type="number"
                    name="attendees"
                    placeholder="Attendees"
                    value={formData.attendees}
                    onChange={handleChange}
                    min={0}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                  >
                    Submit Event
                  </Button>
                </form>
              </div>
            </div>
          )}
          {/* Events List */}
          <Tabs defaultValue="list" className="mt-8">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-6">
              {loading ? (
                <p>Loading events...</p>
              ) : (
                fetchedEvents.map(event => (
                  <div
                    key={event.id}
                    className="p-4 mb-4 border rounded-lg bg-white/10 text-white"
                  >
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p>{event.description}</p>
                    <p>
                      📍 {event.location} | 🗓 {event.event_date} | ⏰ {event.time}
                    </p>
                    <p>
                      🏷 {event.type} | Registration ends: {event.registration_end_date}
                    </p>
                    <a
                      href={event.registration_link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      Register
                    </a>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="calendar" className="mt-6">
              <p>Calendar view coming soon!</p>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Events;
