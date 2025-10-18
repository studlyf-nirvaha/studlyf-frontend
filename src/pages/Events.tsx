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

interface EventsProps {
  userEmail?: string;
}

const TARGET_IMAGE_WIDTH = 600;    // px, for balanced left-side image sizing
const TARGET_IMAGE_HEIGHT = 320;   // px, for event card aesthetic
const TARGET_IMAGE_QUALITY = 0.8;  // JPEG quality (0–1)

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
  const [imageFile, setImageFile] = useState<File | null>(null);

 
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(",").map(email => email.trim()) || [];
const isAdmin = userEmail ? adminEmails.includes(userEmail) : false;

  // const isAdmin = userEmail ? ADMIN_EMAILS.includes(userEmail) : false;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setFetchedEvents(data.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (val: string) => {
    setFormData({ ...formData, type: val });
  };

  // IMAGE RESIZE/COMPRESS HANDLER
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only process images
    if (!file.type.startsWith("image/")) {
      setImageFile(null);
      return;
    }

    // Resize/compress using canvas
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = TARGET_IMAGE_WIDTH;
        canvas.height = TARGET_IMAGE_HEIGHT;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, TARGET_IMAGE_WIDTH, TARGET_IMAGE_HEIGHT);

        // Compress image to JPEG
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create new File object with compressed image
              const compressedFile = new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              setImageFile(compressedFile);
            }
          },
          "image/jpeg",
          TARGET_IMAGE_QUALITY
        );
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, String(v)));
    if (imageFile) fd.append("image", imageFile);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setFetchedEvents([data, ...fetchedEvents]);
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
        setImageFile(null);
      } else {
        alert(data.error || "Failed to add event");
      }
    } catch (err) {
      alert("Error adding event");
    }
  };

  const handleRemove = async (id: number) => {
    if (!window.confirm("Delete this event?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setFetchedEvents(prev => prev.filter(e => e.id !== id));
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
          {/* <h2 className="text-xl text-center text-white mb-2">
            Logged in as: <b>{userEmail || "Guest"}</b>
          </h2> */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
            Next-Gen Events
          </h1>
          {isAdmin && (
            <Button
              onClick={() => setShowHostForm(true)}
              className="bg-gradient-to-r from-brand-purple to-brand-pink mb-4"
            >
              <Plus className="mr-2 h-4 w-4" /> Host Event
            </Button>
          )}
          {showHostForm && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-lg text-white relative">
                <button
                  onClick={() => setShowHostForm(false)}
                  className="absolute top-3 right-3"
                >
                  <X />
                </button>
                <h2 className="text-xl font-bold mb-4">Host Your Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input name="title" placeholder="Event title" value={formData.title} onChange={handleChange} required />
                  <Input type="date" name="event_date" value={formData.event_date} onChange={handleChange} required />
                  <Input type="date" name="registration_end_date" value={formData.registration_end_date} onChange={handleChange} required />
                  <Input type="time" name="time" value={formData.time} onChange={handleChange} />
                  <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                  <Select value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hackathon">Hackathon</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Ideathon">Ideathon</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                  <Input name="registration_link" placeholder="Registration link" value={formData.registration_link} onChange={handleChange} />
                  <Input type="number" name="attendees" placeholder="Attendees" value={formData.attendees} onChange={handleChange} />
                  <Input type="file" accept="image/*" onChange={handleImageChange} />
                  <Button type="submit" className="w-full bg-gradient-to-r from-brand-purple to-brand-pink">
                    Submit Event
                  </Button>
                </form>
              </div>
            </div>
          )}
          <Tabs defaultValue="list" className="mt-8">
            <TabsList>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-6">
              {loading ? (
                <p>Loading...</p>
              ) : fetchedEvents.length === 0 ? (
                <p>No events found.</p>
              ) : (
                fetchedEvents.map((e) => (
                  <div key={e.id} className="flex p-4 mb-4 bg-white/10 rounded-lg relative text-white items-center space-x-6">
                    {e.image_url && (
                      <img
                        src={`http://127.0.0.1:5001${e.image_url}`}
                        alt="Event"
                        className="w-60 h-40 object-cover rounded-lg flex-shrink-0"
                        style={{ background: "#181818" }}
                      />
                    )}
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold">{e.title}</h3>
                      <p>{e.description}</p>
                      <p>📍 {e.location} | 🗓 {e.event_date} | ⏰ {e.time}</p>
                      <p>🏷 {e.type} | Registration ends: {e.registration_end_date}</p>
                      <a
                        href={e.registration_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                      >
                        Register
                      </a>
                    </div>
                    {isAdmin && (
                      <Button size="sm" className="absolute top-2 right-2 bg-red-600" onClick={() => handleRemove(e.id)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="calendar"><p>Calendar view coming soon!</p></TabsContent>
          </Tabs>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Events;