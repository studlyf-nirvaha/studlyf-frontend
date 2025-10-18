import React, { useState, useEffect, Suspense } from "react";
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
  SelectItem,
} from "@/components/ui/select";

const API_URL = "http://127.0.0.1:5001/events";

const ADMIN_EMAILS = [
  "sreejajnvkoppula@gmail.com",
  "admin2@example.com",
  "admin3@example.com",
];

interface EventsProps {
  userEmail?: string;
}

const Events: React.FC<EventsProps> = ({ userEmail }) => {
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
  const [image, setImage] = useState<File | null>(null);

  const isAdmin = userEmail ? ADMIN_EMAILS.includes(userEmail) : false;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(API_URL, { credentials: "include" });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === "number" ? Number(value) : value });
  };

  const handleTypeChange = (val: string) => {
    setFormData({ ...formData, type: val });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      alert("Image must be under 500KB");
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image && image.size > 500 * 1024) {
      alert("Image must be less than 500 KB!");
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value.toString())
    );
    if (image) {
      payload.append("image", image);
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        body: payload,
      });
      if (res.ok) {
        const newEvent = await res.json();
        setFetchedEvents((prev) => [newEvent, ...prev]);
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
        setImage(null);
      } else {
        alert("Failed to add event. Only admins can add events.");
      }
    } catch (error) {
      alert("Error adding event. Please try again.");
      console.error("Error adding event:", error);
    }
  };

  const handleRemoveEvent = async (eventId: number) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`${API_URL}/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setFetchedEvents((prev) => prev.filter((e) => e.id !== eventId));
        alert("Event removed!");
      } else {
        alert("Failed to remove event.");
      }
    } catch (error) {
      alert("Error removing event.");
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
          <h2 className="text-xl text-center text-white font-bold mb-2">
            Logged in as:{" "}
            <span className="font-semibold">{userEmail || "Guest"}</span>
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
            Next-Gen Events
          </h1>

          {isAdmin && (
            <div className="flex gap-4 mb-4">
              <Button
                onClick={() => setShowHostForm(true)}
                className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity gap-2"
              >
                <Plus size={18} />
                Host Event
              </Button>
            </div>
          )}

          {showHostForm && isAdmin && (
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
                  <Input name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required />
                  <Input type="date" name="event_date" value={formData.event_date} onChange={handleChange} required />
                  <Input type="date" name="registration_end_date" value={formData.registration_end_date} onChange={handleChange} required />
                  <Input type="time" name="time" value={formData.time} onChange={handleChange} />
                  <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />

                  {/* Image upload below */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-white"
                    required
                  />
                  {image && (
                    <div className="text-xs text-green-400">
                      Selected: {image.name} ({Math.round(image.size/1024)} KB)
                    </div>
                  )}

                  <Select value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hackathon">Hackathon</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Ideathon">Ideathon</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                  <Input name="registration_link" placeholder="Registration Link" value={formData.registration_link} onChange={handleChange} />
                  <Input type="number" name="attendees" placeholder="Attendees" value={formData.attendees} onChange={handleChange} min={0} />
                  <Button type="submit" className="w-full bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                    Submit Event
                  </Button>
                </form>
              </div>
            </div>
          )}

          <Tabs defaultValue="list" className="mt-8">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-6">
              {loading ? (
                <p>Loading events...</p>
              ) : (
                fetchedEvents.map((event) => (
                  <div key={event.id} className="p-4 mb-4 border rounded-lg bg-white/10 text-white relative">
                    {/* Show event image if present */}
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="mb-2 rounded max-h-32 w-auto"
                      />
                    )}
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
                    {isAdmin && (
                      <Button
                        size="sm"
                        className="absolute top-2 right-2 bg-red-600"
                        onClick={() => handleRemoveEvent(event.id)}
                      >
                        Remove
                      </Button>
                    )}
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