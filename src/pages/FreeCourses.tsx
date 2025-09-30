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

const FreeCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5001/free-courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
      })
      .catch(console.error);
  }, []);

  const languageTags = Array.from(
    new Set(courses.flatMap((c) => c.tags?.filter((tag) => knownLanguages.includes(tag))) || [])
  );
  const otherTags = Array.from(
    new Set(courses.flatMap((c) => c.tags?.filter((tag) => !knownLanguages.includes(tag))) || [])
  ).sort();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      (course.name || course.title || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (course.description || course.desc || "").toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "all" || (course.tags && course.tags.includes(selectedTag));
    const matchesLanguage =
      selectedLanguage === "all" || (course.tags && course.tags.includes(selectedLanguage));
    return matchesSearch && matchesTag && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
            Free Courses
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Access quality education at no cost with our free course offerings.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="space-y-6 md:space-y-8 w-full overflow-x-hidden mb-10">
          <div className="relative max-w-2xl mx-auto px-4 w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-2xl p-1 shadow-xl border border-green-500/40 w-full">
              <div className="relative w-full">
                <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Type to search free courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-14 pr-6 py-4 text-lg bg-transparent border-0 focus:ring-0 placeholder:text-green-300 w-full text-white focus:border-green-500 rounded-xl shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/60 mx-4 w-[calc(100%-2rem)] max-w-none justify-center mt-10">
            <div className="flex-1 max-w-[500px]">
              <Select value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v)}>
                <SelectTrigger className="w-full px-5 py-4 text-base rounded-xl shadow-md border-2 border-green-500/40 bg-gradient-to-r from-green-900/40 to-blue-900/40 focus:border-green-400 focus:ring-2 focus:ring-green-500">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-lg bg-gray-900 border border-green-500/30 p-2">
                  <SelectItem value="all" className="px-5 py-3 text-base rounded-lg">
                    All Languages
                  </SelectItem>
                  {languageTags.map((lang) => (
                    <SelectItem
                      key={lang}
                      value={lang}
                      className="px-5 py-3 text-base rounded-lg hover:bg-green-800/40 transition-colors duration-150"
                    >
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 max-w-[500px]">
              <Select value={selectedTag} onValueChange={(v) => setSelectedTag(v)}>
                <SelectTrigger className="w-full px-5 py-4 text-base rounded-xl shadow-md border-2 border-blue-500/40 bg-gradient-to-r from-blue-900/40 to-green-900/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-lg bg-gray-900 border border-blue-500/30 p-2">
                  <SelectItem value="all" className="px-5 py-3 text-base rounded-lg">
                    All
                  </SelectItem>
                  {otherTags.map((tag) => (
                    <SelectItem
                      key={tag}
                      value={tag}
                      className="px-5 py-3 text-base rounded-lg hover:bg-blue-800/40 transition-colors duration-150"
                    >
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCourses.length === 0 ? (
            <div className="col-span-3 text-center text-lg text-gray-400 py-12">No courses found.</div>
          ) : (
            filteredCourses.map((course, idx) => (
              <motion.div
                key={course.name || idx}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-xl border-2 ${
                  course.border || "border-gray-500"
                } p-5 flex flex-col transition-all duration-300 group`}
              >
                {/* Corner Glows */}
                <div
                  className={`absolute -top-2 -left-2 w-8 h-8 rounded-full blur-xl opacity-60 pointer-events-none z-0 ${
                    course.border ? course.border.replace("border-", "bg-") : "bg-gray-600"
                  }`}
                />
                <div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full blur-xl opacity-60 pointer-events-none z-0 ${
                    course.border ? course.border.replace("border-", "bg-") : "bg-gray-600"
                  }`}
                />
                {/* Title and icon */}
                <div className="flex items-center gap-3 mb-3 z-10">
                  {course.icon}
                  <span className="text-xl font-bold text-white line-clamp-1">{course.name || course.title}</span>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2 z-10">
                  {course.tags?.map((tag) => (
                    <Badge key={tag} className={`${course.badgeColor || "bg-gray-600/20 text-gray-400"} border font-medium text-xs`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* Course Image */}
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.name || course.title}
                    className="w-full h-40 object-cover rounded-xl mb-3 border border-white/10"
                    style={{ objectFit: "cover" }}
                  />
                )}
                {/* Video iframe */}
                {course.video && (
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg mb-3 border border-white/10 z-10">
                    <iframe
                      width="100%"
                      height="215"
                      src={course.src}
                      title={course.name || course.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {/* Description */}
                <p className="text-white/80 text-sm mb-4 min-h-[48px] z-10">{course.description || course.desc}</p>
                {/* Button */}
                <Button
                  asChild
                  className="w-full mt-auto text-lg font-bold py-3 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 border-0 z-10"
                >
                  <a href={course.url || course.src} target="_blank" rel="noopener noreferrer">
                    Watch Now
                  </a>
                </Button>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default FreeCourses;
