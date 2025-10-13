import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function getYouTubeId(url) {
  const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}
function getYouTubeThumbnail(id) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

const Studverse = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(0);
  const [videoLists, setVideoLists] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => setIsAdmin(data.role === "admin"))
      .catch(() => setIsAdmin(false));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/studverse/categories")
      .then(res => res.json())
      .then(data => setCategories(data.categories || []));
  }, []);

  useEffect(() => {
    if (categories[selected]) {
      fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(categories[selected])}`)
        .then(res => res.json())
        .then(data => {
          videoLists[selected] = data.videos || [];
          setVideoLists([...videoLists]);
        });
    }
  }, [selected, categories]);

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData)
    });
    const data = await res.json();
    if (res.ok && data.role === "admin") {
      setIsAdmin(true);
      setShowLoginForm(false);
      alert("Logged in as admin!");
    } else {
      alert("Login failed or you are not an admin.");
    }
  };

  const handleLogout = async () => {
    await fetch("http://127.0.0.1:5001/logout", { method: "POST", credentials: "include" });
    setIsAdmin(false);
    alert("Logged out successfully");
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;
    const res = await fetch("http://127.0.0.1:5001/studverse/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: newCategory })
    });
    if (res.ok) {
      setNewCategory("");
      fetch("http://127.0.0.1:5001/studverse/categories")
        .then(res => res.json())
        .then(data => setCategories(data.categories || []));
    } else {
      alert("Failed to add category or already exists.");
    }
  };

  const handleRemoveCategory = async (name) => {
    if (!window.confirm(`Delete category "${name}" and all its videos?`)) return;
    const res = await fetch(`http://127.0.0.1:5001/studverse/categories/${encodeURIComponent(name)}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (res.ok) {
      fetch("http://127.0.0.1:5001/studverse/categories")
        .then(res => res.json())
        .then(data => setCategories(data.categories || []));
      setSelected(0);
    } else {
      alert("Failed to remove category.");
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    const cat = categories[selected];
    if (!newUrl || !cat) return;
    const res = await fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(cat)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ url: newUrl })
    });
    if (res.ok) {
      setNewUrl("");
      fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(cat)}`)
        .then(res => res.json())
        .then(data => {
          videoLists[selected] = data.videos || [];
          setVideoLists([...videoLists]);
        });
    } else {
      alert("Failed to add video.");
    }
  };

  const handleRemoveVideo = async (url) => {
    const cat = categories[selected];
    const res = await fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(cat)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ url })
    });
    if (res.ok) {
      fetch(`http://127.0.0.1:5001/studverse/videos/${encodeURIComponent(cat)}`)
        .then(res => res.json())
        .then(data => {
          videoLists[selected] = data.videos || [];
          setVideoLists([...videoLists]);
        });
    } else {
      alert("Failed to remove video.");
    }
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
                onChange={e => setNewCategory(e.target.value)}
                className="rounded px-2 py-1 text-black w-32 mr-2"
              />
              <button type="submit" className="px-3 py-1 bg-brand-purple text-white rounded">Add</button>
            </form>
          )}
          <button className="px-5 py-2 rounded-full font-semibold bg-white/10 text-white/70 hover:bg-brand-pink">+ Show more</button>
        </div>
        <div className="w-full text-center mb-6">
          <span className="text-2xl font-bold text-brand-purple">
            {categories[selected] || "No Category Selected"}
          </span>
        </div>
        {isAdmin ? (
          <button
            onClick={async () => {
              await fetch("http://127.0.0.1:5001/logout", {
                method: "POST",
                credentials: "include",
              });
              setIsAdmin(false);
              alert("Logged out successfully");
            }}
            className="mb-4 px-6 py-2 rounded bg-red-600 text-white font-semibold"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setShowLoginForm(true)}
            className="mb-6 px-6 py-2 rounded bg-brand-purple text-white text-lg font-semibold"
          >
            Admin Login
          </button>
        )}
        {showLoginForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-black rounded-xl p-6 w-full max-w-sm border border-white/10 text-white relative">
              <button onClick={() => setShowLoginForm(false)} className="absolute top-3 right-3">X</button>
              <h2 className="text-xl font-bold mb-4">Admin Login</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input name="username" placeholder="Username" value={loginData.username} onChange={handleLoginChange} required className="rounded px-4 py-2 text-black w-full"/>
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required className="rounded px-4 py-2 text-black w-full"/>
                <button type="submit" className="w-full bg-brand-purple text-white px-4 py-2 rounded font-semibold">Login</button>
              </form>
            </div>
          </div>
        )}
        {isAdmin && categories[selected] && (
          <form className="mb-8 flex gap-2 w-full justify-center" onSubmit={handleAddVideo}>
            <input
              type="text"
              placeholder="Paste YouTube URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="rounded px-4 py-2 text-black w-80"
            />
            <button type="submit" className="px-5 py-2 rounded bg-brand-purple text-white font-semibold">
              Add Video
            </button>
          </form>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mb-12">
          {(videoLists[selected] || []).map((url, i) => {
            const vid = getYouTubeId(url);
            return vid ? (
              <div key={vid + i} className="relative group bg-white/5 rounded-lg hover:shadow-lg flex flex-col">
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
