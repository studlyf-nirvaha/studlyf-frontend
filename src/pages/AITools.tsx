import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import "./AITools.css";

function AITools() {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = {
    "All": [],
    "Productivity & Workflow": [
      "Productivity", "Workflows", "Task automation", "Meeting notes",
      "To Do lists", "Client proposals", "System design interviews",
      "Project management", "Lesson plans", "Mind maps", "Gantt charts"
    ],
    "Marketing & Sales": [
      "Marketing", "Marketing strategies", "Sales", "Sales prospecting",
      "Email marketing", "Influencer marketing", "Reddit marketing",
      "Local SEO", "PPC optimization", "Content calendar"
    ],
    "Content Creation & Media": [
      "Content", "Content creation", "Blogging", "SEO content",
      "Video translation", "Videos", "Podcasts", "Audiobooks",
      "Document writing", "Memoirs writing", "Copywriting",
      "Educational videos", "Image editing", "Image captions",
      "Character creation"
    ],
    "AI & ML Tools / Analysis": [
      "AI inference", "AI integration", "AI model comparison",
      "AI tools search", "Local inference", "Code reviews",
      "System design interviews", "Gpt development assistance"
    ],
    "Customer Support & Business Operations": [
      "Customer support", "Tech support", "Email outreach",
      "Business growth", "Business analysis", "Process automations",
      "Reputation management", "Compliance", "Website compliance"
    ],
    "Design & Creative Tools": [
      "Interior design", "UI design", "UX testing", "Cartoon Generation",
      "Fantasy images", "Pattern images", "Signature design", "Logo design",
      "Alternative image text", "Creative discovery"
    ],
    "Finance & Accounting": [
      "Accounting", "Financial analysis", "Investment portfolios",
      "Investment analysis", "Procurement", "Invoices",
      "Contract drafts", "SaaS management"
    ],
    "Education & Learning": [
      "Studying", "Teaching", "Interactive learning", "Montessori activities",
      "School lessons", "Interview preparation", "System design interviews",
      "Courses", "Jupyter notebooks"
    ],
    "Legal & Compliance": [
      "Legal advice", "Compliance", "Website compliance", "Contract drafts",
      "Proof of concept"
    ],
    "Health & Lifestyle": [
      "Physiotherapy", "Sleep relaxation content", "Emotional support", "Bible advice"
    ],
    "Tech & Development": [
      "Coding", "Code testing", "API testing", "UI code generation",
      "Swiftui coding", "Flutter-s guidance", "3D printing",
      "Data analysis", "Database design"
    ],
    "Fun, Creativity & Miscellaneous": [
      "Tarot card readings", "Tattoos", "Coloring pages", "Vibe coding",
      "AI content detection", "Action figures", "Alternative image text"
    ]
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5001/api/ai-tools')
      .then((res) => {
        setTools(res.data);
        setFilteredTools(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tools:", err);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredTools(tools);
    } else {
      const categoryTags = categories[category];
      const filtered = tools.filter(
        (tool) =>
          tool.tags && tool.tags.some((tag) => categoryTags.includes(tag))
      );
      setFilteredTools(filtered);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 pt-20 pb-24 relative">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-center mb-6 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent drop-shadow-lg uppercase">
          AI Tools Explorer
        </h1>
        <p className="mb-6 text-lg text-white/70 text-center">
          Total Tools Found: {filteredTools.length}
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition-colors mb-2 ${
                selectedCategory === cat
                  ? "bg-brand-purple text-white"
                  : "bg-white/10 text-white/70 hover:bg-brand-pink"
              }`}
            >
              {cat}
            </button>
          ))}
          <button className="px-5 py-2 rounded-full font-semibold bg-white/10 text-white/70 hover:bg-brand-pink mb-2">
            + Show more
          </button>
        </div>
        <div className="w-full text-center mb-6">
          <span className="text-2xl font-bold text-brand-purple">
            {selectedCategory}
          </span>
        </div>
        {loading ? (
          <h2 className="text-center text-xl text-white/60 my-12">Loading AI Tools...</h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mb-12">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white/5 rounded-lg p-6 flex flex-col justify-between border border-white/10 shadow-lg"
              >
                <h3 className="font-semibold text-lg text-brand-purple mb-2">{tool.name}</h3>
                <p className="text-base text-white/80 mb-1">{tool.short_description || "No description available"}</p>
                {tool.tags && tool.tags.length > 0 && (
                  <p className="text-xs text-white/60 mb-2">
                    <span className="font-semibold text-white/70">Tags:</span> {tool.tags.join(", ")}
                  </p>
                )}
                <a
                  href={tool.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 px-4 py-2 rounded bg-brand-purple text-white font-bold hover:bg-brand-pink transition-all"
                >
                  🔗 Visit Tool
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default AITools;