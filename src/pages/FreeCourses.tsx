// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// // import { Badge, Button, Input } from "@/components/ui";
// import { Search } from "lucide-react";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search } from "lucide-react";
const knownLanguages = ["Hindi", "English", "Telugu"];
const MODES = ["Coursera", "Admin Panel"];

const FreeCourses = () => {
  const [mode, setMode] = useState("Coursera"); // "Coursera" or "Admin Panel"
  const [courses, setCourses] = useState([]);
  const [adminCourses, setAdminCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Admin panel form
  const [form, setForm] = useState({
    heading: "",
    tags: "",
    src_link: "",
    description: ""
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => setIsAdmin(data.role === "admin"))
      .catch(() => setIsAdmin(false));
  }, []);

  useEffect(() => {
    if (mode === "Coursera") {
      fetch("http://127.0.0.1:5001/free-courses")
        .then((res) => res.json())
        .then((data) => setCourses(data.courses || []));
    } else {
      fetch("http://127.0.0.1:5001/admin-courses")
        .then(res => res.json())
        .then(data => setAdminCourses(data.courses || []));
    }
  }, [mode]);

  // Coursera filter tags
  const languageTags = Array.from(new Set(courses.flatMap(c => c.tags?.filter(tag => knownLanguages.includes(tag)) || [])));
  const otherTags = Array.from(new Set(courses.flatMap(c => c.tags?.filter(tag => !knownLanguages.includes(tag)) || []))).sort();

  const filteredCourses = (mode === "Coursera" ? courses : adminCourses).filter((course) => {
    const matchesSearch =
      (course.name || course.heading || "")
        .toLowerCase().includes(search.toLowerCase()) ||
      (course.description || course.desc || "").toLowerCase().includes(search.toLowerCase());
    if (mode === "Coursera") {
      const matchesTag = selectedTag === "all" || (course.tags && course.tags.includes(selectedTag));
      const matchesLanguage = selectedLanguage === "all" || (course.tags && course.tags.includes(selectedLanguage));
      return matchesSearch && matchesTag && matchesLanguage;
    }
    return matchesSearch;
  });

  // Admin login
  const handleLoginChange = e => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleLoginSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData)
    });
    const data = await res.json();
    if (res.ok && data.role === "admin") {
      setIsAdmin(true); setShowLoginForm(false); alert("Logged in as admin!");
    } else { alert("Login failed or you are not an admin."); }
  };
  const handleLogout = async () => {
    await fetch("http://127.0.0.1:5001/logout", { method: "POST", credentials: "include" });
    setIsAdmin(false);
    alert("Logged out successfully");
  };

  // Admin add custom course
  const handleAdminCourseAdd = async (e) => {
    e.preventDefault();
    if (!form.heading || !form.src_link) return;
    const res = await fetch("http://127.0.0.1:5001/admin-courses", {
      method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
      body: JSON.stringify({ ...form, tags: form.tags.split(",").map(t=>t.trim()).filter(Boolean) }),
    });
    if (res.ok) {
      setForm({ heading: "", tags: "", src_link: "", description: "" });
      fetch("http://127.0.0.1:5001/admin-courses").then(res => res.json()).then(data => setAdminCourses(data.courses || []));
    } else alert("Failed to add course.");
  };

  // Admin remove
  const handleAdminCourseRemove = async (id) => {
    const res = await fetch(`http://127.0.0.1:5001/admin-courses/${id}`, {
      method: "DELETE", credentials: "include"
    });
    if (res.ok) setAdminCourses(adminCourses.filter(c => c.id !== id));
    else alert("Failed to remove course.");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        {/* Mode Switch */}
        <div className="flex justify-center mb-10 gap-2">
          {MODES.map((m) => (
            <Button
              key={m}
              onClick={() => setMode(m)}
              className={mode === m
                ? "bg-green-600 text-white px-4"
                : "bg-white/20 text-white px-4"}
            >
              {m}
            </Button>
          ))}
          {mode === "Admin Panel" && (
            isAdmin ?
              (<Button onClick={handleLogout} className="bg-red-600 px-4 ml-4">Logout</Button>) :
              (<Button onClick={() => setShowLoginForm(true)} className="bg-green-800 px-4 ml-4">Admin Login</Button>)
          )}
        </div>
        {/* Login modal */}
        {showLoginForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-black rounded-xl p-6 w-full max-w-sm border border-white/10 text-white relative">
              <button onClick={() => setShowLoginForm(false)} className="absolute top-3 right-3">X</button>
              <h2 className="text-xl font-bold mb-4">Admin Login</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input name="username" placeholder="Username" value={loginData.username} onChange={handleLoginChange} required className="rounded px-4 py-2 text-black w-full"/>
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required className="rounded px-4 py-2 text-black w-full"/>
                <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded font-semibold">Login</button>
              </form>
            </div>
          </div>
        )}

        {/* Search and Filters (Coursera only) */}
        {mode === "Coursera" && (
          <div className="space-y-6 md:space-y-8 w-full overflow-x-hidden mb-10">
            {/* Your existing search bar and tag filters here */}
          </div>
        )}

        {/* Admin add panel (Admin Panel mode, admin only) */}
        {mode === "Admin Panel" && isAdmin && (
          <form className="bg-white/10 rounded-xl p-5 max-w-2xl mx-auto mb-8" onSubmit={handleAdminCourseAdd}>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Heading" value={form.heading} onChange={e => setForm({...form, heading: e.target.value})} className="rounded px-3 py-2 text-black"/>
              <input type="text" placeholder="Comma separated tags" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="rounded px-3 py-2 text-black"/>
            </div>
            <input type="text" placeholder="YouTube Embed Link (src)" value={form.src_link} onChange={e => setForm({...form, src_link: e.target.value})} className="rounded px-3 py-2 text-black w-full my-2"/>
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="rounded px-3 py-2 text-black w-full my-2"/>
            <button type="submit" className="bg-green-600 px-3 py-2 rounded text-white">Add Course</button>
          </form>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length === 0
            ? <div className="col-span-3 text-center text-lg text-gray-400 py-12">No courses found.</div>
            : filteredCourses.map((course, idx) => (
              <div key={course.id || course.name || idx} className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-xl border-2 border-gray-700 p-5 flex flex-col group">
                {/* Title */}
                <div className="flex items-center gap-3 mb-3 z-10">
                  <span className="text-xl font-bold text-white line-clamp-1">{course.name || course.heading || course.title}</span>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2 z-10">
                  {Array.isArray(course.tags) 
                    ? course.tags.map(tag => <Badge key={tag} className="bg-gray-600/20 text-gray-400 border font-medium text-xs">{tag}</Badge>)
                    : (course.tags || "").split(",").map(tag => tag && <Badge key={tag} className="bg-gray-600/20 text-gray-400 border font-medium text-xs">{tag.trim()}</Badge>)
                  }
                </div>
                {/* Video/Embed */}
                {mode === "Coursera"
                  ? course.image && <img src={course.image} alt={course.name} className="w-full h-40 object-cover rounded-xl mb-3 border border-white/10" />
                  : course.src_link && <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg mb-3 border border-white/10 z-10"><iframe width="100%" height="215" src={course.src_link} title={course.heading} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                }
                {/* Description */}
                <p className="text-white/80 text-sm mb-4 min-h-[48px] z-10">{course.description || course.desc}</p>
                {/* Button & Delete */}
                <div className="flex gap-2">
                  <Button asChild className="w-full mt-auto text-lg font-bold py-3 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 border-0 z-10">
                    <a href={course.url || course.src_link} target="_blank" rel="noopener noreferrer">Watch Now</a>
                  </Button>
                  {mode === "Admin Panel" && isAdmin && (
                    <Button type="button" onClick={() => handleAdminCourseRemove(course.id)} className="bg-red-700 ml-2">Delete</Button>
                  )}
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FreeCourses;
