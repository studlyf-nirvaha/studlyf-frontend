import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getYouTubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

interface StudverseProps {
  userEmail?: string;
}

// Load admin emails from environment variable
const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(",").map(email => email.trim()) || [];
const isAdminFlag = (userEmail?: string) => userEmail ? adminEmails.includes(userEmail) : false;

const Studverse: React.FC<StudverseProps> = ({ userEmail }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const [videoLists, setVideoLists] = useState<string[][]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Set admin state based on userEmail and environment variable
  useEffect(() => {
    setIsAdmin(isAdminFlag(userEmail));
  }, [userEmail]);

  // Fetch categories initially
  useEffect(() => {
    fetch("http://127.0.0.1:5001/studverse/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  // Fetch videos for selected category
  useEffect(() => {
    if (categories[selected]) {
      fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(categories[selected])}`)
        .then((res) => res.json())
        .then((data) => {
          const newVideoLists = [...videoLists];
          newVideoLists[selected] = data.videos || [];
          setVideoLists(newVideoLists);
        });
    }
  }, [selected, categories]);

  // Handlers for categories and videos
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;
    const res = await fetch("http://127.0.0.1:5001/studverse/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: newCategory }),
    });
    if (res.ok) {
      setNewCategory("");
      fetch("http://127.0.0.1:5001/studverse/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data.categories || []));
    } else alert("Failed to add category or already exists.");
  };

  const handleRemoveCategory = async (name: string) => {
    if (!window.confirm(`Delete category "${name}" and all its videos?`)) return;
    const res = await fetch(`http://127.0.0.1:5001/studverse/categories/${encodeURIComponent(name)}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      fetch("http://127.0.0.1:5001/studverse/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data.categories || []));
      setSelected(0);
    } else alert("Failed to remove category.");
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories[selected];
    if (!newUrl || !cat) return;
    const res = await fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(cat)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ url: newUrl }),
    });
    if (res.ok) {
      setNewUrl("");
      fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(cat)}`)
        .then((res) => res.json())
        .then((data) => {
          const updatedVideoLists = [...videoLists];
          updatedVideoLists[selected] = data.videos || [];
          setVideoLists(updatedVideoLists);
        });
    } else alert("Failed to add video.");
  };

  const handleRemoveVideo = async (url: string) => {
    const cat = categories[selected];
    const res = await fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(cat)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ url }),
    });
    if (res.ok) {
      fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(cat)}`)
        .then((res) => res.json())
        .then((data) => {
          const updatedVideoLists = [...videoLists];
          updatedVideoLists[selected] = data.videos || [];
          setVideoLists(updatedVideoLists);
        });
    } else alert("Failed to remove video.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 pt-20 pb-24 relative">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-center mb-6 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent drop-shadow-lg uppercase">
          STUDVERSE
        </h1>
        <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto px-2">
          {categories.map((cat, idx) => (
            <div key={cat} className="flex items-center gap-1">
              <button
                onClick={() => setSelected(idx)}
                className={`px-5 py-2 rounded-full font-semibold transition-colors ${
                  selected === idx
                    ? "bg-brand-purple text-white"
                    : "bg-white/10 text-white/70 hover:bg-brand-pink"
                }`}
              >
                {cat}
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleRemoveCategory(cat)}
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded ml-1"
                  title="Delete category"
                >
                  x
                </button>
              )}
            </div>
          ))}
          {isAdmin && (
            <form onSubmit={handleAddCategory}>
              <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="rounded px-2 py-1 text-black w-32 mr-2"
              />
              <button type="submit" className="px-3 py-1 bg-brand-purple text-white rounded">
                Add
              </button>
            </form>
          )}
          <button className="px-5 py-2 rounded-full font-semibold bg-white/10 text-white/70 hover:bg-brand-pink">
            + Show more
          </button>
        </div>
        <div className="w-full text-center mb-6">
          <span className="text-2xl font-bold text-brand-purple">
            {categories[selected] || "No Category Selected"}
          </span>
        </div>
        {isAdmin && (
          <form className="mb-8 flex gap-2 w-full justify-center" onSubmit={handleAddVideo}>
            <input
              type="text"
              placeholder="Paste YouTube URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="rounded px-4 py-2 text-black w-80"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded bg-brand-purple text-white font-semibold"
            >
              Add Video
            </button>
          </form>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mb-12">
          {(videoLists[selected] || []).map((url, i) => {
            const vid = getYouTubeId(url);
            return vid ? (
              <div
                key={vid + i}
                className="relative group bg-white/5 rounded-lg hover:shadow-lg flex flex-col"
              >
                {isAdmin && (
                  <button
                    onClick={() => handleRemoveVideo(url)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 text-xs"
                  >
                    Remove
                  </button>
                )}
                <a href={`https://youtube.com/watch?v=${vid}`} target="_blank" rel="noopener noreferrer">
                  <img
                    src={getYouTubeThumbnail(vid)}
                    alt={`YouTube video ${i + 1}`}
                    className="rounded-t-lg object-cover aspect-video"
                  />
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-base group-hover:text-brand-purple truncate">{`Video ${i + 1}`}</h3>
                    <p className="text-xs text-white/60 truncate">{url}</p>
                  </div>
                </a>
              </div>
            ) : null;
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Studverse;