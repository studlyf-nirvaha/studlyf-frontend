
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, BookOpen, Download, Upload } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

const materials = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    type: "PDF",
    category: "B.Tech",
    subject: "Computer Science",
    size: "2.4 MB",
    downloads: 1250,
    uploadedBy: "Prof. Sharma",
    date: "2024-06-10"
  },
  {
    id: 2,
    title: "Marketing Management Video Lectures",
    type: "Video",
    category: "MBA",
    subject: "Marketing",
    size: "145 MB",
    downloads: 890,
    uploadedBy: "Dr. Patel",
    date: "2024-06-08"
  },
  {
    id: 3,
    title: "JEE Advanced Physics Notes",
    type: "PDF",
    category: "Competitive Exams",
    subject: "Physics",
    size: "5.2 MB",
    downloads: 2100,
    uploadedBy: "Coaching Institute",
    date: "2024-06-12"
  },
  {
    id: 4,
    title: "Financial Accounting Basics",
    type: "Notes",
    category: "B.Com",
    subject: "Accounting",
    size: "1.8 MB",
    downloads: 750,
    uploadedBy: "Student Community",
    date: "2024-06-14"
  }
];

const CourseMaterials = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredMaterials = materials.filter(material => {
    return (selectedCategory === "all" || material.category === selectedCategory) &&
           (selectedType === "all" || material.type === selectedType);
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5" />;
      case "Video":
        return <Video className="h-5 w-5" />;
      case "Notes":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-red-500/20 text-red-400";
      case "Video":
        return "bg-blue-500/20 text-blue-400";
      case "Notes":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SplitText
              text="Course Materials"
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Access curated study materials, notes, and resources for various courses and competitive exams.
            </p>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90">
              <Upload className="h-4 w-4 mr-2" />
              Upload Material
            </Button>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-8 justify-center"
          >
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20 text-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="B.Tech">B.Tech</SelectItem>
                <SelectItem value="MBA">MBA</SelectItem>
                <SelectItem value="B.Com">B.Com</SelectItem>
                <SelectItem value="Competitive Exams">Competitive Exams</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20 text-white">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Notes">Notes</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Materials Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeColor(material.type)}`}>
                      {getTypeIcon(material.type)}
                      {material.type}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-brand-purple/20 text-brand-purple">
                      {material.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold text-white">{material.title}</CardTitle>
                  <CardDescription className="text-white/70">
                    {material.subject} • {material.size}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-white/60 mb-4">
                    <div>Uploaded by: {material.uploadedBy}</div>
                    <div>Date: {material.date}</div>
                    <div>{material.downloads} downloads</div>
                  </div>
                  <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseMaterials;
