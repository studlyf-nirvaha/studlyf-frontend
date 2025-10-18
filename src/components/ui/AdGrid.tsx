import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Ad {
  id: number;
  image: string;
  link: string;
}

interface AdGridProps {
  userEmail?: string;
}

// Admin logic
const adminEmails =
  import.meta.env.VITE_ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];

const isAdminFlag = (email?: string) =>
  email ? adminEmails.includes(email) : false;

const AdGrid = ({ userEmail }: AdGridProps) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load ads from backend
  useEffect(() => {
    setIsAdmin(isAdminFlag(userEmail));
    fetchAds();
  }, [userEmail]);

  const fetchAds = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5001/ads");
      const data = await res.json();
      setAds(data.ads || []);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  };

  // Auto-slide effect
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [ads]);

  const startAutoSlide = () => {
    stopAutoSlide(); // clear any existing interval
    if (ads.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % ads.length);
      }, 5000);
    }
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextSlide = () => setCurrent((prev) => (prev + 1) % ads.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + ads.length) % ads.length);

  const handleAddAd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !link) return alert("Please select image and link.");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("link", link);

    const res = await fetch("http://127.0.0.1:5001/ads", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Ad added successfully!");
      setImage(null);
      setLink("");
      fetchAds();
    } else {
      alert(data.error || "Failed to add ad.");
    }
  };

  const handleDeleteAd = async (id: number) => {
    if (!window.confirm("Delete this ad?")) return;
    const res = await fetch(`http://127.0.0.1:5001/ads/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      alert("Ad deleted!");
      fetchAds();
    } else {
      alert(data.error || "Failed to delete ad.");
    }
  };

  return (
    <section className="w-full py-16 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-gradient-to-r from-purple-700 to-pink-500 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 text-white uppercase text-center">
        </h2>

        {/* Admin upload form */}
        {isAdmin && (
          <form
            onSubmit={handleAddAd}
            className="flex flex-col sm:flex-row gap-3 mb-10 justify-center"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="bg-white text-black rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Enter Ad Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="rounded px-3 py-2 text-black w-64"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded font-semibold hover:bg-gray-800 transition"
            >
              Add Ad
            </button>
          </form>
        )}

        {/* Carousel Section */}
        {ads.length > 0 ? (
          <div
            className="relative w-full overflow-hidden rounded-2xl shadow-lg"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
          >
            {/* Slide Container */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {ads.map((ad) => (
                <div key={ad.id} className="relative w-full flex-shrink-0">
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteAd(ad.id)}
                      className="absolute top-3 right-3 bg-red-600 text-white rounded px-2 py-1 text-xs z-10"
                    >
                      ✕
                    </button>
                  )}
                  <a href={ad.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`http://127.0.0.1:5001${ad.image}`}
                      alt="Ad"
                      className="w-full h-[300px] sm:h-[400px] object-cover rounded-2xl"
                    />
                  </a>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {ads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full ${
                    current === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white text-center mt-6">No ads available.</p>
        )}
      </div>
    </section>
  );
};

export default AdGrid;
