import React, { useState, useEffect } from "react";

interface Ad {
  id: number;
  image: string;
  link: string;
}

interface AdGridProps {
  userEmail?: string;
}

const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];
const isAdminFlag = (email?: string) => (email ? adminEmails.includes(email) : false);

const AdGrid: React.FC<AdGridProps> = ({ userEmail }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState("");

  useEffect(() => {
    setIsAdmin(isAdminFlag(userEmail));
    fetchAds();
  }, [userEmail]);

  const fetchAds = async () => {
    const res = await fetch("http://127.0.0.1:5001/ads");
    const data = await res.json();
    setAds(data.ads || []);
  };

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
    <section className="w-full py-16 bg-black text-white flex flex-col items-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent uppercase">
        Advertisement Section
      </h2>

      {isAdmin && (
        <form onSubmit={handleAddAd} className="flex flex-col sm:flex-row gap-3 mb-10">
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
            className="bg-brand-purple text-white px-5 py-2 rounded font-semibold"
          >
            Add Ad
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="relative bg-white/10 rounded-lg overflow-hidden hover:shadow-lg"
          >
            {isAdmin && (
              <button
                onClick={() => handleDeleteAd(ad.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 text-xs"
              >
                ✕
              </button>
            )}
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                src={`http://127.0.0.1:5001${ad.image}`}
                alt="Ad"
                className="object-cover w-full aspect-square"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdGrid;
