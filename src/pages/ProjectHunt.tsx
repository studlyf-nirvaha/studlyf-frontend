import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const roleOptions = [
  { value: "any", label: "Any" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "ai", label: "AI Engineer" },
  { value: "fullstack", label: "Fullstack" },
];

const ProjectHunt: React.FC = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [postedProjects, setPostedProjects] = useState<any[]>([]);
  const [role, setRole] = useState("any");
  const [techStack, setTechStack] = useState("");

  // Fetch projects from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5001/project-hunt")
      .then((res) => setPostedProjects(res.data.projects))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Apply filters
  const filteredProjects = postedProjects.filter((proj) => {
    const matchRole =
      role === "any" ||
      (proj.roles &&
        proj.roles.toString().toLowerCase().replace(/ /g, "").includes(role));
    const matchTech =
      !techStack ||
      (proj.tech_stack &&
        proj.tech_stack.toLowerCase().includes(techStack.toLowerCase()));
    return matchRole && matchTech;
  });

  // Handle form submit
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
      setPostedProjects((prev) => [res.data, ...prev]);
      setShowPostModal(false);
      form.reset();
    } catch (err) {
      console.error("Error posting project:", err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Project Hunt | StudLyF</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-5xl font-bold">Project Hunt</h1>
          <p className="text-lg mt-2">Discover, join, or launch projects.</p>
          <Button className="mt-6" onClick={() => setShowPostModal(true)}>
            Post Your Project
          </Button>
        </section>

        {/* Filter Section */}
        <section className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Role Filter */}
            <select
              className="bg-gray-800 p-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Tech Stack Search */}
            <Input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="Search by Tech Stack"
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-6">Live Projects</h2>
          {filteredProjects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{proj.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.tech_stack &&
                        proj.tech_stack.split(",").map((s: string) => (
                          <span
                            key={s}
                            className="px-2 py-1 bg-gray-700 rounded text-sm"
                          >
                            {s}
                          </span>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {proj.links && (
                      <a
                        href={proj.links}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                      >
                        Project Link
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Post Modal */}
        <AnimatePresence>
          {showPostModal && (
            <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <motion.div
                className="bg-gray-900 p-6 rounded-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl mb-4">Post a Project</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Input name="title" placeholder="Title" required />
                  <Input name="description" placeholder="Description" required />
                  <Input
                    name="techStack"
                    placeholder="Tech Stack (comma separated)"
                    required
                  />
                  <Input
                    name="roles"
                    placeholder="Roles (comma separated)"
                    required
                  />
                  <Input name="duration" placeholder="Duration" required />
                  <Input name="lastDate" type="date" required />
                  <Input name="links" placeholder="Links" />
                  <Button type="submit">Submit</Button>
                </form>
                <Button
                  variant="ghost"
                  className="mt-2"
                  onClick={() => setShowPostModal(false)}
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default ProjectHunt;
