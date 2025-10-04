import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { AnimatePresence } from "framer-motion";
import { Folder, Users, Zap, MapPin, Handshake } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";
import { motion } from "framer-motion";

const roleOptions = [
  { value: "any", label: "Any" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "pm", label: "Product Manager" },
  { value: "ai", label: "AI Engineer" },
  { value: "mobile", label: "Mobile Dev" },
  { value: "content", label: "Content Creator" },
  { value: "fullstack", label: "Fullstack" },
  { value: "backend", label: "Backend" },
  { value: "product", label: "Product Manager" },
  { value: "smartcontract", label: "Smart Contract Dev" },
  { value: "uiux", label: "UI/UX Designer" },
  { value: "datascientist", label: "Data Scientist" },
];

const categoryOptions = [
  { value: "all", label: "All" },
  { value: "ai", label: "AI" },
  { value: "blockchain", label: "Blockchain" },
  { value: "webdev", label: "Web Development" },
  { value: "uiux", label: "UI/UX" },
  { value: "sustainability", label: "Sustainability" },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "recruiting", label: "Recruiting" },
  { value: "closed", label: "Closed" },
];

const collabOptions = [
  { value: "any", label: "Any" },
  { value: "remote", label: "Remote" },
  { value: "inperson", label: "In-Person" },
];

const QUICK_CHIPS = ["Web Dev", "AI", "Blockchain", "UI/UX", "Sustainability"];

const ProjectHunt: React.FC = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [category, setCategory] = useState("all");
  const [role, setRole] = useState("any");
  const [techStack, setTechStack] = useState("");
  const [status, setStatus] = useState("all");
  const [collab, setCollab] = useState("any");
  const [college, setCollege] = useState("");
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [savedProjects, setSavedProjects] = useState<Record<string, boolean>>({});
  const [likedCounts, setLikedCounts] = useState<Record<string, number>>({});
  const [likedSet, setLikedSet] = useState<Record<string, boolean>>({});
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  // Fetch projects from backend on mount and when a project is posted
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5001/project-hunt")
      .then((res) => setProjects(res.data.projects || []))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Filter logic (same as your rich UI)
  const filteredProjects = projects.filter((proj) => {
    // role is stored as comma separated in backend, so convert to array as needed
    const projRoles =
      typeof proj.roles === "string"
        ? proj.roles.split(",").map((r: string) => r.trim().toLowerCase().replace(/ /g, ""))
        : Array.isArray(proj.roles)
        ? proj.roles.map((r: string) => r.trim().toLowerCase().replace(/ /g, ""))
        : [];
    const matchCategory = category === "all" || (proj.category && proj.category === category);
    const matchRole = role === "any" || projRoles.includes(role);
    const matchTech =
      !techStack ||
      (proj.tech_stack &&
        proj.tech_stack.toLowerCase().includes(techStack.toLowerCase()));
    const matchStatus = status === "all" || (proj.status && proj.status.toLowerCase() === status);
    const matchCollab = collab === "any" || (proj.collaboration && proj.collaboration === collab);
    const matchCollege = !college || (proj.college && proj.college.toLowerCase().includes(college.toLowerCase()));
    const matchChips =
      activeChips.length === 0 ||
      activeChips.some(
        (ch) =>
          (proj.tech_stack ?? "")
            .toLowerCase()
            .includes(ch.toLowerCase()) ||
          (projRoles ?? []).join(" ").includes(ch.toLowerCase()) ||
          (proj.title ?? "").toLowerCase().includes(ch.toLowerCase())
      );
    return matchCategory && matchRole && matchTech && matchStatus && matchCollab && matchCollege && matchChips;
  });

  // Save/like toggle logic
  const toggleSave = (title: string) => {
    setSavedProjects((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleLike = (title: string) => {
    setLikedSet((prev) => {
      const next = !prev[title];
      setLikedCounts((counts) => {
        const prevCount = counts[title] || 0;
        return { ...counts, [title]: next ? prevCount + 1 : Math.max(0, prevCount - 1) };
      });
      return { ...prev, [title]: next };
    });
  };

  const toggleExpand = (title: string) => {
    setExpandedMap((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleChip = (chip: string) => {
    setActiveChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  // Handle post new project
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newProject = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      tech_stack: formData.get("techStack") as string,
      roles: formData.get("roles") as string,
      duration: formData.get("duration") as string,
      last_date: formData.get("lastDate") as string,
      links: formData.get("links") as string,
    };

    try {
      const res = await axios.post("http://127.0.0.1:5001/project-hunt", newProject);
      setProjects((prev) => [res.data, ...prev]);
      setShowPostModal(false);
      form.reset();
    } catch (err) {
      console.error("Error posting project:", err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Project Hunt | StudLyF – Build & Collaborate</title>
      </Helmet>
      <div className="min-h-screen flex flex-col text-white relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at top left, #181818 0%, #0D0D0D 80%)",
        }}
      >

       
        <Navbar />
        {/* Filter Section */}
        <section className="w-full max-w-5xl mx-auto px-4 py-8 z-10 relative">
          <NetworkBackground compact className="p-6">
            <Card className="relative overflow-hidden rounded-2xl shadow-xl bg-[#18181c] border border-purple-900/20 text-white">
              <div aria-hidden className="absolute inset-0 -z-10 bg-black/70 backdrop-blur-md border border-purple-500/10 rounded-2xl" />
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold" style={{ color: '#C084FC' }}>Find Projects</CardTitle>
                <CardDescription className="text-gray-400">Filter and search for projects that match your interests and skills.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium flex flex-col md:flex-row md:items-center gap-2 text-gray-200">
                      <Folder className="w-4 h-4 md:mr-1" aria-hidden />
                      <span>Category/Domain</span>
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-[#23232a] border border-gray-700 text-white placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                        <span>{categoryOptions.find(opt => opt.value === category)?.label}</span>
                      </SelectTrigger>
                      <SelectContent className="bg-[#23232a] text-white border border-gray-700 shadow-lg">
                        {categoryOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium flex flex-col md:flex-row md:items-center gap-2 text-gray-200">
                      <Users className="w-4 h-4 md:mr-1" aria-hidden />
                      <span>Required Roles</span>
                    </label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="bg-[#23232a] border border-gray-700 text-white placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                        <span>{roleOptions.find(opt => opt.value === role)?.label}</span>
                      </SelectTrigger>
                      <SelectContent className="bg-[#23232a] text-white border border-gray-700 shadow-lg">
                        {roleOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium flex flex-col md:flex-row md:items-center gap-2 text-gray-200">
                      <Zap className="w-4 h-4 md:mr-1" aria-hidden />
                      <span>Tech Stack</span>
                    </label>
                    <Input
                      value={techStack}
                      onChange={e => setTechStack(e.target.value)}
                      placeholder="e.g. React, Node"
                      className="bg-[#23232a] border border-gray-700 text-white placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium flex flex-col md:flex-row md:items-center gap-2 text-gray-200">
                      <MapPin className="w-4 h-4 md:mr-1" aria-hidden />
                      <span>Status</span>
                    </label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="bg-[#23232a] border border-gray-700 text-white placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                        <span>{statusOptions.find(opt => opt.value === status)?.label}</span>
                      </SelectTrigger>
                      <SelectContent className="bg-[#23232a] text-white border border-gray-700 shadow-lg">
                        {statusOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium flex flex-col md:flex-row md:items-center gap-2 text-gray-200">
                      <Handshake className="w-4 h-4 md:mr-1" aria-hidden />
                      <span>Collaboration</span>
                    </label>
                    <Select value={collab} onValueChange={setCollab}>
                      <SelectTrigger className="bg-[#23232a] border border-gray-700 text-white placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/30">
                        <span>{collabOptions.find(opt => opt.value === collab)?.label}</span>
                      </SelectTrigger>
                      <SelectContent className="bg-[#23232a] text-white border border-gray-700 shadow-lg">
                        {collabOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-200">College</label>
                    <Input
                      value={college}
                      onChange={e => setCollege(e.target.value)}
                      placeholder="Search college..."
                      className="bg-[#23232a] border border-gray-700 text-white placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />
                  </div>
                </form>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_CHIPS.map(ch => (
                    <button
                      key={ch}
                      onClick={() => toggleChip(ch)}
                      className={`text-xs px-3 py-1 rounded-full transition ${activeChips.includes(ch) ? 'bg-gradient-to-r from-brand-purple to-brand-pink text-white' : 'bg-[#23232a] text-gray-200 hover:bg-[#282830]'}`}
                      aria-pressed={activeChips.includes(ch)}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </NetworkBackground>
        </section>

        {/* Projects Feed */}
        <section className="w-full max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#C084FC' }}>Live Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length === 0 ? (
              <p className="col-span-full text-gray-400">No projects found.</p>
            ) : (
              filteredProjects.map((proj, idx) => {
                const statusLabel = (proj.status || "Open").toString();
                const likes = likedCounts[proj.title] ?? 12;
                const isExpanded = !!expandedMap[proj.title];
                let daysLeft = null;
                if (proj.last_date) {
                  const d = Math.ceil((new Date(proj.last_date).getTime() - Date.now()) / (1000*60*60*24));
                  daysLeft = d;
                }
                const visibleSkills = proj.tech_stack?.split(",").map((s: string) => s.trim()).slice(0,3) ?? [];
                const extraSkills = Math.max(0, (proj.tech_stack?.split(",").length ?? 0) - visibleSkills.length);

                return (
                  <Card key={idx} className="transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl border border-gray-800 rounded-2xl bg-[#18181c] p-5 text-white">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusLabel.toLowerCase().includes("open") ? "bg-green-900 text-green-200" : statusLabel.toLowerCase().includes("progress") ? "bg-yellow-900 text-yellow-200" : "bg-red-900 text-red-200"}`}>{statusLabel}</span>
                        <h3 className="text-lg font-semibold truncate" style={{ color: "#fff" }}>{proj.title}</h3>
                      </div>
                      <button
                        onClick={() => toggleSave(proj.title)}
                        className={`text-sm px-3 py-1 rounded-md ${savedProjects[proj.title] ? 'bg-purple-700 text-white' : 'bg-[#23232a] border border-gray-700 text-gray-200'}`}
                        aria-pressed={!!savedProjects[proj.title]}
                        title={savedProjects[proj.title] ? "Saved" : "★ Save"}
                      >
                        {savedProjects[proj.title] ? "★ Saved" : "★ Save"}
                      </button>
                    </div>
                    {daysLeft !== null && (
                      <div className="mt-2 mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>Deadline: {new Date(proj.last_date).toLocaleDateString()}</span>
                          <span>{daysLeft > 0 ? `${daysLeft} days left` : "Closed"}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded overflow-hidden">
                          <div
                            className="h-2 bg-gradient-to-r from-brand-purple to-brand-pink"
                            style={{ width: `${Math.min(100, Math.max(5, ((30 - Math.max(0, daysLeft))/30)*100))}%` }}
                            aria-hidden
                          />
                        </div>
                      </div>
                    )}
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {isExpanded ? proj.description : (proj.description.length > 150 ? proj.description.slice(0, 150) + "…" : proj.description)}
                    </p>
                    {proj.description.length > 150 && (
                      <button onClick={() => toggleExpand(proj.title)} className="text-sm text-purple-400 hover:underline mb-3">
                        {isExpanded ? "Show Less" : "... Read More"}
                      </button>
                    )}
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      {visibleSkills.map((s: string) => <span key={s} className="text-xs px-2 py-1 rounded-full bg-purple-900 text-purple-200">{s}</span>)}
                      {extraSkills > 0 && <span className="text-xs px-2 py-1 rounded-full bg-purple-900 text-purple-200">+{extraSkills} more</span>}
                      {/* {projRoles.map((r: string) => <span key={r} className="text-xs px-2 py-1 rounded-full bg-[#23232a] text-gray-200 border border-gray-700">{r}</span>)} */}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <a
                        href={proj.links}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                        style={{ fontSize: "0.95em" }}
                      >
                        Project Link
                      </a>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </section>

        {/* Post Project Modal */}
        <AnimatePresence>
          {showPostModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPostModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#18181c] border border-gray-700 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto text-white"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: '#C084FC' }}>Post a New Project</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowPostModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </Button>
                </div>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Title</label>
                    <Input name="title" placeholder="Project Title" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <Input name="description" placeholder="Short Description" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                    <Input name="techStack" placeholder="e.g. React, Node, Solidity" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Required Roles (comma separated)</label>
                    <Input name="roles" placeholder="e.g. Frontend, Backend, Designer" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Expected Duration</label>
                    <Input name="duration" placeholder="e.g. 3 months" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Date to Contribute</label>
                    <Input name="lastDate" type="date" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Optional: Media/Links</label>
                    <Input name="links" placeholder="GitHub, Figma, etc." />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-brand-purple to-brand-pink mt-2 text-white">Submit Project</Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Footer />
      </div>
      <Button size="lg" className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-xl" onClick={() => setShowPostModal(true)}>🚀 Post Your Project</Button>
    </>
  );
};

export default ProjectHunt;