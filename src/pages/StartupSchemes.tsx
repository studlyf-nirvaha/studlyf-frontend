import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Calendar, Users, DollarSign, Award } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

const schemes = [
  {
    id: 1,
    title: "Startup India Scheme",
    type: "Government",
    category: "General",
    funding: "Up to ₹10 Lakhs",
    deadline: "2024-12-31",
    eligibility: "Age 18-35, Indian citizen, innovative business idea",
    benefits: ["Tax exemptions", "IPR support", "Mentor network", "Fast-track patent"],
    description: "Government initiative to promote entrepreneurship and innovation in India."
  },
  {
    id: 2,
    title: "ATAL Innovation Mission",
    type: "Government",
    category: "Technology",
    funding: "Up to ₹20 Lakhs",
    deadline: "2025-01-15",
    eligibility: "Student entrepreneurs, age 18-30",
    benefits: ["Seed funding", "Incubation support", "Mentorship", "Market access"],
    description: "Government's flagship initiative to promote innovation and entrepreneurship."
  },
  {
    id: 3,
    title: "Venture Capital Fund",
    type: "Private",
    category: "Tech Startup",
    funding: "₹50 Lakhs - ₹5 Crores",
    deadline: "2024-11-30",
    eligibility: "Scalable business model, strong team",
    benefits: ["Investment", "Strategic guidance", "Network access", "Board support"],
    description: "Private venture capital fund focusing on early-stage tech startups."
  },
  {
    id: 4,
    title: "Women Entrepreneur Scheme",
    type: "Government",
    category: "Women-only",
    funding: "Up to ₹15 Lakhs",
    deadline: "2025-02-28",
    eligibility: "Women entrepreneurs, age 21-45",
    benefits: ["Low interest loans", "Business training", "Market linkage", "Subsidies"],
    description: "Special scheme to promote women entrepreneurship in India."
  }
];

const StartupSchemes = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSchemes = schemes.filter(scheme => {
    return (selectedType === "all" || scheme.type === selectedType) &&
           (selectedCategory === "all" || scheme.category === selectedCategory);
  });

  const getTypeColor = (type: string) => {
    return type === "Government" 
      ? "bg-green-500/20 text-green-400" 
      : "bg-brand-purple/20 text-brand-purple";
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
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
              text="Startup Schemes"
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink"
              delay={50}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.3}
              rootMargin="-100px"
            />
            <p className="text-xl text-white max-w-2xl mx-auto">
              Explore government and private schemes designed to support student entrepreneurs and startups.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-8 justify-center"
          >
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20 text-white">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Government">Government</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20 text-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Women-only">Women-only</SelectItem>
                <SelectItem value="Tech Startup">Tech Startup</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Schemes Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-white">{scheme.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(scheme.type)}`}>
                      {scheme.type}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-brand-pink/20 text-brand-pink">
                      {scheme.category}
                    </span>
                  </div>
                  <CardDescription className="text-white">
                    {scheme.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-white">
                      <DollarSign className="h-4 w-4" />
                      <span>Funding: {scheme.funding}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {scheme.deadline}</span>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <Users className="h-4 w-4 mt-0.5" />
                      <span>Eligibility: {scheme.eligibility}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Benefits:
                    </h4>
                    <ul className="space-y-1">
                      {scheme.benefits.map((benefit, index) => (
                        <li key={index} className="text-white text-sm">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 w-full">
                    Apply Now
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

export default StartupSchemes;
