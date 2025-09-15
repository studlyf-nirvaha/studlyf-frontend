import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SplitText } from "@/components/ui/split-text";
import { BookOpen, Code, TrendingUp, GraduationCap, PiggyBank, PlayCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const courses = [
  {
    title: "DSA (Data Structures & Algorithms)",
    icon: <TrendingUp className="h-7 w-7 text-yellow-400" />,
    video: true,
    tags: ["Beginner", "Playlist", "Hindi"],
    border: "border-yellow-500",
    badgeColor: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    src: "https://www.youtube.com/embed/videoseries?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ",
    desc: "Apna College: Complete DSA course in Hindi for beginners and intermediates.",
  },
  {
    title: "Python Programming",
    icon: <Code className="h-7 w-7 text-green-400" />,
    video: true,
    tags: ["Beginner", "Playlist", "Hindi"],
    border: "border-green-500",
    badgeColor: "bg-green-400/20 text-green-300 border-green-400/30",
    src: "https://www.youtube.com/embed/videoseries?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg",
    desc: "CodeWithHarry: Python tutorials in Hindi, from basics to advanced projects.",
  },
  {
    title: "Investing Tips for Students",
    icon: <PiggyBank className="h-7 w-7 text-blue-400" />,
    video: false,
    tags: ["Finance", "Practical"],
    border: "border-blue-500",
    badgeColor: "bg-blue-400/20 text-blue-300 border-blue-400/30",
    src: "https://www.youtube.com/embed/AkMTxMN7res",
    desc: "Labour Law Advisor: Practical investing and money management tips for students in India.",
  },
  {
    title: "Full Stack Project (YouTube Clone)",
    icon: <Code className="h-7 w-7 text-cyan-400" />,
    video: true,
    tags: ["Full Stack", "Project", "English"],
    border: "border-cyan-500",
    badgeColor: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
    src: "https://www.youtube.com/embed/4qyBjxPlEZo",
    desc: "Build and deploy a full stack YouTube clone using React, Node.js, Express, and MongoDB. (JavaScript, English)",
  },
  {
    title: "MERN Stack Zero to Hero",
    icon: <Code className="h-7 w-7 text-emerald-400" />,
    video: true,
    tags: ["MERN", "Stack", "Hindi"],
    border: "border-emerald-500",
    badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    src: "https://www.youtube.com/embed/F9gB5b4jgOI",
    desc: "Complete MERN stack course for beginners to advanced. Covers MongoDB, Express, React, Node.js. (Hindi)",
  },
  {
    title: "Full Stack Web Development Bootcamp",
    icon: <Code className="h-7 w-7 text-blue-400" />,
    video: true,
    tags: ["Full Stack", "Bootcamp", "Hindi"],
    border: "border-blue-500",
    badgeColor: "bg-blue-400/20 text-blue-300 border-blue-400/30",
    src: "https://www.youtube.com/embed/ZxKM3DCV2kE",
    desc: "Full stack web development bootcamp covering frontend and backend. (Hindi)",
  },
  {
    title: "Business Analyst Full Course",
    icon: <TrendingUp className="h-7 w-7 text-orange-400" />,
    video: true,
    tags: ["Business Analyst", "English"],
    border: "border-orange-500",
    badgeColor: "bg-orange-400/20 text-orange-300 border-orange-400/30",
    src: "https://www.youtube.com/embed/OY-7OcvlXpg",
    desc: "Comprehensive business analyst course: skills, tools, and real-world case studies. (English)",
  },
  {
    title: "JavaScript for Beginners",
    icon: <Code className="h-7 w-7 text-yellow-400" />,
    video: true,
    tags: ["JavaScript", "Beginner", "English"],
    border: "border-yellow-500",
    badgeColor: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    src: "https://www.youtube.com/embed/W6NZfCO5SIk",
    desc: "JavaScript tutorial for absolute beginners. Covers all basics and core concepts. (English)",
  },
  {
    title: "Vibe Coding - Lo-fi Coding Music",
    icon: <Code className="h-7 w-7 text-fuchsia-400" />,
    video: true,
    tags: ["Coding", "Music", "English"],
    border: "border-fuchsia-500",
    badgeColor: "bg-fuchsia-400/20 text-fuchsia-300 border-fuchsia-400/30",
    src: "https://www.youtube.com/embed/Rx9V3Ltiklw",
    desc: "Lo-fi coding music for focus and productivity. (No speech, English)",
  },
  {
    title: "Machine Learning Crash Course",
    icon: <TrendingUp className="h-7 w-7 text-purple-400" />,
    video: true,
    tags: ["Machine Learning", "Beginner", "English"],
    border: "border-purple-500",
    badgeColor: "bg-purple-400/20 text-purple-300 border-purple-400/30",
    src: "https://www.youtube.com/embed/JxgmHe2NyeY",
    desc: "Machine learning basics, algorithms, and hands-on projects. (English)",
  },
  {
    title: "Generative AI Explained",
    icon: <TrendingUp className="h-7 w-7 text-pink-400" />,
    video: true,
    tags: ["Gen AI", "Beginner", "English"],
    border: "border-pink-500",
    badgeColor: "bg-pink-400/20 text-pink-300 border-pink-400/30",
    src: "https://www.youtube.com/embed/mEsleV16qdo",
    desc: "Introduction to generative AI, concepts, and applications. (English)",
  },
  {
    title: "AI Automations with No Code",
    icon: <TrendingUp className="h-7 w-7 text-lime-400" />,
    video: true,
    tags: ["AI", "Automations", "English"],
    border: "border-lime-500",
    badgeColor: "bg-lime-400/20 text-lime-300 border-lime-400/30",
    src: "https://www.youtube.com/embed/T-nP8MO0BdQ",
    desc: "Learn to build AI automations without coding. (English)",
  },
  {
    title: "Data Analyst Roadmap",
    icon: <TrendingUp className="h-7 w-7 text-sky-400" />,
    video: true,
    tags: ["Data Analyst", "Beginner", "Hindi"],
    border: "border-sky-500",
    badgeColor: "bg-sky-400/20 text-sky-300 border-sky-400/30",
    src: "https://www.youtube.com/embed/wQQR60KtnFY",
    desc: "Step-by-step roadmap to become a data analyst. Tools, skills, and projects. (Hindi)",
  },
  {
    title: "LangChain Full Course",
    icon: <Code className="h-7 w-7 text-indigo-400" />,
    video: true,
    tags: ["LangChain", "AI", "English"],
    border: "border-indigo-500",
    badgeColor: "bg-indigo-400/20 text-indigo-300 border-indigo-400/30",
    src: "https://www.youtube.com/embed/swCPic00c30",
    desc: "Complete LangChain course for building LLM-powered apps. (English)",
  },
  {
    title: "MCP (Model Context Protocol) Crash Course",
    icon: <Code className="h-7 w-7 text-red-400" />,
    video: true,
    tags: ["MCP", "AI", "English"],
    border: "border-red-500",
    badgeColor: "bg-red-400/20 text-red-300 border-red-400/30",
    src: "https://www.youtube.com/embed/-UQ6OZywZ2I",
    desc: "Crash course on Model Context Protocol (MCP) for AI developers. (English)",
  },
  {
    title: "Study Skills",
    icon: <GraduationCap className="h-7 w-7 text-pink-400" />,
    video: true,
    tags: ["Productivity", "Playlist", "English"],
    border: "border-pink-500",
    badgeColor: "bg-pink-400/20 text-pink-300 border-pink-400/30",
    src: "https://www.youtube.com/embed/videoseries?list=PL8dPuuaLjXtOPRKzVLY0jJY-uHOH9KVU6",
    desc: "CrashCourse: Learn how to learn, study, and succeed in academics.",
  },
  {
    title: "Personal Finance",
    icon: <BookOpen className="h-7 w-7 text-indigo-400" />,
    video: true,
    tags: ["Finance", "Playlist", "Hindi"],
    border: "border-indigo-500",
    badgeColor: "bg-indigo-400/20 text-indigo-300 border-indigo-400/30",
    src: "https://www.youtube.com/embed/videoseries?list=PLLbfvOX935JGo7PWixihas8kneskv1uU9",
    desc: "Groww: Master the basics of personal finance, investing, and money management.",
  },
  // --- user provided links (titles/descriptions/tags sourced from YouTube oEmbed) ---
  {
    title: "But what is a neural network? — Deep learning (3Blue1Brown)",
    icon: <Code className="h-7 w-7 text-amber-400" />,
    video: true,
    tags: ["Deep Learning", "Neural Networks", "Math", "English"],
    border: "border-amber-500",
    badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    src: "https://www.youtube.com/embed/aircAruvnKk",
    desc: "3Blue1Brown’s intuitive introduction to neural networks — chapter 1 of the deep learning series.",
  },
  {
    title: "Zero to One of AI Automations — Make.com course (Cutting Edge School)",
    icon: <Code className="h-7 w-7 text-emerald-400" />,
    video: true,
    tags: ["AI", "Automations", "No-code", "English"],
    border: "border-emerald-500",
    badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    src: "https://www.youtube.com/embed/R2axpsbprpw",
    desc: "Free course on building AI automations using Make.com — practical agent workflows and examples.",
  },
  {
    title: "Learn Data Science — Full course for beginners (freeCodeCamp)",
    icon: <Code className="h-7 w-7 text-cyan-400" />,
    video: true,
    tags: ["Data Science", "Full Course", "Python", "English"],
    border: "border-cyan-500",
    badgeColor: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
    src: "https://www.youtube.com/embed/ua-CiDNNj30",
    desc: "freeCodeCamp.org’s full data science tutorial — statistics, Python, pandas and practical examples for beginners.",
  },
  {
    title: "HTML Crash Course For Absolute Beginners (Traversy Media)",
    icon: <Code className="h-7 w-7 text-sky-400" />,
    video: true,
    tags: ["HTML", "Web Development", "Beginner"],
    border: "border-sky-500",
    badgeColor: "bg-sky-400/20 text-sky-300 border-sky-400/30",
    src: "https://www.youtube.com/embed/UB1O30fR-EE",
    desc: "Traversy Media’s concise HTML crash course — structure, elements and practical examples for beginners.",
  },
  {
    title: "Java Exception Handling — Tutorial (Programming with Mosh)",
    icon: <Code className="h-7 w-7 text-rose-400" />,
    video: true,
    tags: ["Java", "Exceptions", "Intermediate"],
    border: "border-rose-500",
    badgeColor: "bg-rose-400/20 text-rose-300 border-rose-400/30",
    src: "https://www.youtube.com/embed/_nmm0nZqIIY",
    desc: "Clear explanations and examples for exception handling in Java from Programming with Mosh.",
  },
  {
    title: "React Native Tutorial — Build a React Native App (Programming with Mosh)",
    icon: <Code className="h-7 w-7 text-yellow-400" />,
    video: true,
    tags: ["React Native", "Mobile", "Beginner"],
    border: "border-yellow-500",
    badgeColor: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    src: "https://www.youtube.com/embed/0-S5a0eXPoc",
    desc: "Full React Native tutorial showing how to build and ship a mobile app using React Native.",
  },
  {
    title: "Computer Networking Course — Network Engineering (freeCodeCamp)",
    icon: <Code className="h-7 w-7 text-violet-400" />,
    video: true,
    tags: ["Networking", "Network+", "Systems", "English"],
    border: "border-violet-500",
    badgeColor: "bg-violet-400/20 text-violet-300 border-violet-400/30",
    src: "https://www.youtube.com/embed/qiQR5rTSshw",
    desc: "freeCodeCamp’s complete computer networking course — TCP/IP, routing, switching and exam prep topics.",
  },
  {
    title: "Full Ethical Hacking Course — Network Penetration Testing (freeCodeCamp)",
    icon: <Code className="h-7 w-7 text-fuchsia-400" />,
    video: true,
    tags: ["Ethical Hacking", "Security", "Penetration Testing"],
    border: "border-fuchsia-500",
    badgeColor: "bg-fuchsia-400/20 text-fuchsia-300 border-fuchsia-400/30",
    src: "https://www.youtube.com/embed/3Kq1MIfTWCE",
    desc: "freeCodeCamp’s hands-on ethical hacking course covering network pentesting basics and tools.",
  },
  {
    title: "Docker & Kubernetes — Full course (Amigoscode)",
    icon: <Code className="h-7 w-7 text-pink-400" />,
    video: true,
    tags: ["Docker", "Kubernetes", "DevOps"],
    border: "border-pink-500",
    badgeColor: "bg-pink-400/20 text-pink-300 border-pink-400/30",
    src: "https://www.youtube.com/embed/bhBSlnQcq2k",
    desc: "Complete Docker and Kubernetes tutorial — containers, orchestration and deployment patterns.",
  },
  {
    title: "DevOps Master Class — Introduction (John Savill)",
    icon: <TrendingUp className="h-7 w-7 text-lime-400" />,
    video: true,
    tags: ["DevOps", "Cloud", "CI/CD"],
    border: "border-lime-500",
    badgeColor: "bg-lime-400/20 text-lime-300 border-lime-400/30",
    src: "https://www.youtube.com/embed/R74bm8IGu2M",
    desc: "Introductory session from a DevOps master class — cloud fundamentals and deployment practices.",
  },
  {
    title: "Figma UI Design Tutorial — Get started in 24 minutes (AJ&Smart)",
    icon: <Code className="h-7 w-7 text-slate-400" />,
    video: true,
    tags: ["Figma", "UI Design", "Product"],
    border: "border-slate-500",
    badgeColor: "bg-slate-400/20 text-slate-300 border-slate-400/30",
    src: "https://www.youtube.com/embed/FTFaQWZBqQ8",
    desc: "Quick Figma primer — components, prototyping and design basics from AJ&Smart.",
  },
  {
    title: "Trying Figma variables & features (CharliMarieTV)",
    icon: <Code className="h-7 w-7 text-indigo-400" />,
    video: true,
    tags: ["Figma", "Design", "Tools"],
    border: "border-indigo-500",
    badgeColor: "bg-indigo-400/20 text-indigo-300 border-indigo-400/30",
    src: "https://www.youtube.com/embed/QXbGFDTgzKU",
    desc: "Charli Marie’s walkthrough of Figma variables and design workflow tips.",
  },
  {
    title: "Useful Free Mac Tools & Apps (Tech for Designers)",
    icon: <Code className="h-7 w-7 text-emerald-400" />,
    video: true,
    tags: ["Mac", "Tools", "Design"],
    border: "border-emerald-500",
    badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    src: "https://www.youtube.com/embed/03kvhwUjvNo",
    desc: "A curated list of useful free Mac apps and utilities for designers and creators.",
  },
  {
    title: "Digital Marketing with AI — Full course (WsCube Tech)",
    icon: <TrendingUp className="h-7 w-7 text-cyan-400" />,
    video: true,
    tags: ["Digital Marketing", "AI", "Beginners"],
    border: "border-cyan-500",
    badgeColor: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
    src: "https://www.youtube.com/embed/kunkYTKFNtI",
    desc: "WsCube Tech’s updated full course: digital marketing fundamentals enhanced with AI tools.",
  },
  {
    title: "Video Editing Course — VN App (Raj Photo Editing)",
    icon: <Code className="h-7 w-7 text-yellow-400" />,
    video: true,
    tags: ["Video Editing", "VN App", "Hindi"],
    border: "border-yellow-500",
    badgeColor: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    src: "https://www.youtube.com/embed/qQdcYdFM17k",
    desc: "Free VN App video editing course in Hindi — mobile-first editing techniques and transitions.",
  },
  {
    title: "AWS in ONE VIDEO — For Beginners (Hindi)",
    icon: <TrendingUp className="h-7 w-7 text-pink-400" />,
    video: true,
    tags: ["AWS", "Cloud", "Hindi"],
    border: "border-pink-500",
    badgeColor: "bg-pink-400/20 text-pink-300 border-pink-400/30",
    src: "https://www.youtube.com/embed/N4sJj-SxX00",
    desc: "Compact AWS beginner guide in Hindi covering core cloud concepts and services.",
  },
  {
    title: "Full Video Editing Course — Picking a Niche & Career Roadmap (Cutting Edge School)",
    icon: <Code className="h-7 w-7 text-fuchsia-400" />,
    video: true,
    tags: ["Video Editing", "Career", "English"],
    border: "border-fuchsia-500",
    badgeColor: "bg-fuchsia-400/20 text-fuchsia-300 border-fuchsia-400/30",
    src: "https://www.youtube.com/embed/gbZ6hCNlq7g",
    desc: "Episode 1 of a full video editing curriculum — choosing a niche and career roadmap for creators.",
  },
  {
    title: "Introduction to DaVinci Resolve — Full Course (Casey Faris)",
    icon: <Code className="h-7 w-7 text-purple-400" />,
    video: true,
    tags: ["DaVinci Resolve", "Video Editing", "Beginner"],
    border: "border-purple-500",
    badgeColor: "bg-purple-400/20 text-purple-300 border-purple-400/30",
    src: "https://www.youtube.com/embed/Ey18PDiaAYI",
    desc: "DaVinci Resolve full course for beginners — editing, color and export workflows.",
  },
  {
    title: "Canva Tutorial For Beginners — Free 2 hour masterclass",
    icon: <Code className="h-7 w-7 text-sky-400" />,
    video: true,
    tags: ["Canva", "Design", "Beginner"],
    border: "border-sky-500",
    badgeColor: "bg-sky-400/20 text-sky-300 border-sky-400/30",
    src: "https://www.youtube.com/embed/Llnmf5BXLBA",
    desc: "Bring Your Own Laptop’s practical Canva masterclass — templates, layouts and export tips.",
  },
  {
    title: "How to Speak So That People Want to Listen — Julian Treasure (TED)",
    icon: <GraduationCap className="h-7 w-7 text-indigo-400" />,
    video: true,
    tags: ["Communication", "Public Speaking", "English"],
    border: "border-indigo-500",
    badgeColor: "bg-indigo-400/20 text-indigo-300 border-indigo-400/30",
    src: "https://www.youtube.com/embed/eIho2S0ZahI",
    desc: "TED Talk by Julian Treasure with practical vocal exercises and communication tips.",
  },
  {
    title: "Excel Tutorial for Beginners (Hindi) — Complete Microsoft Excel",
    icon: <BookOpen className="h-7 w-7 text-emerald-400" />,
    video: true,
    tags: ["Excel", "Hindi", "Data"],
    border: "border-emerald-500",
    badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    src: "https://www.youtube.com/embed/OX-iyb-21tk",
    desc: "Rishabh Mishra’s full Excel tutorial in Hindi — formulas, pivot tables and dashboards.",
  },
  {
    title: "Power BI — Full course tutorial (LearnitTraining)",
    icon: <TrendingUp className="h-7 w-7 text-cyan-400" />,
    video: true,
    tags: ["Power BI", "Business Intelligence", "Data"],
    border: "border-cyan-500",
    badgeColor: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
    src: "https://www.youtube.com/embed/e6QD8lP-m6E",
    desc: "Comprehensive Power BI course covering data modeling, visuals and dashboards.",
  },
  {
    title: "SQL Full Course in Telugu — Complete SQL (Vamsi Bhavani)",
    icon: <Code className="h-7 w-7 text-yellow-400" />,
    video: true,
    tags: ["SQL", "Database", "Telugu"],
    border: "border-yellow-500",
    badgeColor: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    src: "https://www.youtube.com/embed/XEqTRwT9cW4",
    desc: "Vamsi Bhavani’s complete SQL course in Telugu — queries, joins and real examples.",
  },
  {
    title: "SQL Tutorial for Beginners — Full SQL course (Hindi)",
    icon: <Code className="h-7 w-7 text-pink-400" />,
    video: true,
    tags: ["SQL", "Hindi", "Database"],
    border: "border-pink-500",
    badgeColor: "bg-pink-400/20 text-pink-300 border-pink-400/30",
    src: "https://www.youtube.com/embed/On9eSN3F8w0",
    desc: "Rishabh Mishra’s Hindi full course on SQL basics and intermediate topics.",
  },
  {
    title: "Learn Excel formulas in One Hour (Telugu)",
    icon: <GraduationCap className="h-7 w-7 text-fuchsia-400" />,
    video: true,
    tags: ["Excel", "Telugu", "Formulas"],
    border: "border-fuchsia-500",
    badgeColor: "bg-fuchsia-400/20 text-fuchsia-300 border-fuchsia-400/30",
    src: "https://www.youtube.com/embed/LvqEK0Bmh-0",
    desc: "Quick Telugu guide covering the most important Excel formulas and use-cases.",
  },
  {
    title: "Python Full Course for Beginners (Programming with Mosh)",
    icon: <Code className="h-7 w-7 text-indigo-400" />,
    video: true,
    tags: ["Python", "Beginner", "Programming"],
    border: "border-indigo-500",
    badgeColor: "bg-indigo-400/20 text-indigo-300 border-indigo-400/30",
    src: "https://www.youtube.com/embed/_uQrJ0TkZlc",
    desc: "Programming with Mosh’s comprehensive Python full course for beginners.",
  },
  {
    title: "Ethical Hacking — Full course (The Cyber Mentor)",
    icon: <Code className="h-7 w-7 text-emerald-400" />,
    video: true,
    tags: ["Ethical Hacking", "Security", "Penetration Testing"],
    border: "border-emerald-500",
    badgeColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
    src: "https://www.youtube.com/embed/fNzpcB7ODxQ",
    desc: "The Cyber Mentor’s intensive ethical hacking course — techniques, tools and labs.",
  },
  {
    title: "C language — Full tutorial (Telugu)",
    icon: <Code className="h-7 w-7 text-sky-400" />,
    video: true,
    tags: ["C", "Telugu", "Programming"],
    border: "border-sky-500",
    badgeColor: "bg-sky-400/20 text-sky-300 border-sky-400/30",
    src: "https://www.youtube.com/embed/fta78-pxNTo",
    desc: "MSquare’s complete C language tutorial for beginners (Telugu).",
  },
  {
    title: "Learn Data Structures & Algorithms — Bro Code",
    icon: <TrendingUp className="h-7 w-7 text-yellow-400" />,
    video: true,
    tags: ["DSA", "Algorithms", "English"],
    border: "border-yellow-500",
    badgeColor: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    src: "https://www.youtube.com/embed/CBYHwZcbD-s",
    desc: "Bro Code’s full DSA walkthrough — core data structures and algorithm patterns.",
  },
  {
    title: "C Language Tutorial for Beginners (Apna College)",
    icon: <Code className="h-7 w-7 text-pink-400" />,
    video: true,
    tags: ["C", "Beginner", "Practice"],
    border: "border-pink-500",
    badgeColor: "bg-pink-400/20 text-pink-300 border-pink-400/30",
    src: "https://www.youtube.com/embed/irqbmMNs2Bo",
    desc: "Apna College’s C tutorial with notes and practice questions for beginners.",
  },
  {
    title: "Complete C++ in Telugu — A-Z (Vamsi Bhavani)",
    icon: <Code className="h-7 w-7 text-purple-400" />,
    video: true,
    tags: ["C++", "Telugu", "Advanced"],
    border: "border-purple-500",
    badgeColor: "bg-purple-400/20 text-purple-300 border-purple-400/30",
    src: "https://www.youtube.com/embed/KKRzUB7mWUs",
    desc: "Vamsi Bhavani’s complete C++ course in Telugu — from basics to advanced topics.",
  },
];

// Extract language tags from all courses
// Keep a small list of known languages so the language filter shows relevant language options
const knownLanguages = ["Hindi", "English", "Telugu"];
const languageTags = Array.from(new Set(courses.flatMap(c => c.tags.filter(tag => knownLanguages.includes(tag)))));
const otherTags = Array.from(new Set(courses.flatMap(c => c.tags.filter(tag => !knownLanguages.includes(tag))))).sort();

const FreeCourses = () => {
  const [search, setSearch] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState("all");
  const [selectedLanguage, setSelectedLanguage] = React.useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || course.desc.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "all" || course.tags.includes(selectedTag);
    const matchesLanguage = selectedLanguage === "all" || course.tags.includes(selectedLanguage);
    return matchesSearch && matchesTag && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Free Courses Heading and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SplitText
              text="Free Courses"
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white max-w-2xl mx-auto">
              Access quality education at no cost with our free course offerings.
            </p>
          </motion.div>
          {/* Premium Search and Filter Bar */}
          <div className="space-y-6 md:space-y-8 w-full overflow-x-hidden">
            <div className="relative max-w-2xl mx-auto px-4 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-2xl p-1 shadow-xl border border-green-500/40 w-full">
                <div className="relative w-full">
                  <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder="Type to search free courses..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-14 pr-6 py-4 text-lg bg-transparent border-0 focus:ring-0 placeholder:text-green-300 w-full text-white focus:border-green-500 rounded-xl shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700/60 mx-4 w-[calc(100%-2rem)] max-w-none justify-center mt-10">
              <div className="flex-1 max-w-[500px]">
                <Select value={selectedLanguage} onValueChange={v => setSelectedLanguage(v)}>
                  <SelectTrigger className="w-full px-5 py-4 text-base rounded-xl shadow-md border-2 border-green-500/40 bg-gradient-to-r from-green-900/40 to-blue-900/40 focus:border-green-400 focus:ring-2 focus:ring-green-500">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-lg bg-gray-900 border border-green-500/30 p-2">
                    <SelectItem value="all" className="px-5 py-3 text-base rounded-lg">All Languages</SelectItem>
                    {languageTags.map(lang => (
                      <SelectItem key={lang} value={lang} className="px-5 py-3 text-base rounded-lg hover:bg-green-800/40 transition-colors duration-150">{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 max-w-[500px]">
                <Select value={selectedTag} onValueChange={v => setSelectedTag(v)}>
                  <SelectTrigger className="w-full px-5 py-4 text-base rounded-xl shadow-md border-2 border-blue-500/40 bg-gradient-to-r from-blue-900/40 to-green-900/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-lg bg-gray-900 border border-blue-500/30 p-2">
                    <SelectItem value="all" className="px-5 py-3 text-base rounded-lg">All</SelectItem>
                    {otherTags.map(tag => (
                      <SelectItem key={tag} value={tag} className="px-5 py-3 text-base rounded-lg hover:bg-blue-800/40 transition-colors duration-150">{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
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
                  key={course.title}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className={`relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-xl border-2 ${course.border} p-5 flex flex-col transition-all duration-300 group`}
                >
                  {/* Animated colored corner glow */}
                  <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full blur-xl opacity-60 pointer-events-none z-0 ${course.border.replace('border-', 'bg-')}`}></div>
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full blur-xl opacity-60 pointer-events-none z-0 ${course.border.replace('border-', 'bg-')}`}></div>
                  <div className="flex items-center gap-3 mb-3 z-10">
                    <span>{course.icon}</span>
                    <span className="text-xl font-bold text-white line-clamp-1">{course.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 z-10">
                    {course.tags.map(tag => (
                      <Badge key={tag} className={course.badgeColor + " border font-medium text-xs"}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg mb-3 border border-white/10 z-10">
                    <iframe
                      width="100%"
                      height="215"
                      src={course.src}
                      title={course.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-white/80 text-sm mb-4 min-h-[48px] z-10">{course.desc}</p>
                  <Button
                    asChild
                    className="w-full mt-auto text-lg font-bold py-3 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 border-0 z-10"
                  >
                    <a href={course.src} target="_blank" rel="noopener noreferrer">
                      <PlayCircle className="mr-2 h-6 w-6" /> Watch Now
                    </a>
                  </Button>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FreeCourses;
