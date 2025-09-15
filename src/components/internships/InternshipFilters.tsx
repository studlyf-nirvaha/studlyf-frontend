
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface InternshipFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedDomain: string;
  setSelectedDomain: (domain: string) => void;
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
}

const InternshipFilters = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedDomain,
  setSelectedDomain,
  selectedDuration,
  setSelectedDuration
}: InternshipFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const types = [
    { value: "all", label: "All Types" },
    { value: "remote", label: "Remote" },
    { value: "in-office", label: "In-Office" },
    { value: "hybrid", label: "Hybrid" }
  ];

  const domains = [
    { value: "all", label: "All Domains" },
    { value: "tech", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "content", label: "Content Writing" },
    { value: "sales", label: "Sales" }
  ];

  const durations = [
    { value: "all", label: "Any Duration" },
    { value: "1-3", label: "1-3 Months" },
    { value: "3-6", label: "3-6 Months" },
    { value: "6+", label: "6+ Months" }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search internships, companies, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-3 md:py-4 text-base md:text-lg bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-brand-purple/50 focus:ring-brand-purple/20 rounded-xl"
        />
      </div>

      {/* Filter Toggle for Mobile */}
      <div className="flex justify-center md:hidden">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Filter Options */}
      <motion.div
        className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showFilters ? 1 : 0, 
          height: showFilters ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-white font-medium text-sm md:text-base">Work Type</label>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {types.map((type) => (
              <Button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                variant={selectedType === type.value ? "default" : "outline"}
                className={`text-sm h-10 ${
                  selectedType === type.value
                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Domain Filter */}
        <div className="space-y-2">
          <label className="text-white font-medium text-sm md:text-base">Domain</label>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {domains.map((domain) => (
              <Button
                key={domain.value}
                onClick={() => setSelectedDomain(domain.value)}
                variant={selectedDomain === domain.value ? "default" : "outline"}
                className={`text-sm h-10 ${
                  selectedDomain === domain.value
                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {domain.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="space-y-2">
          <label className="text-white font-medium text-sm md:text-base">Duration</label>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {durations.map((duration) => (
              <Button
                key={duration.value}
                onClick={() => setSelectedDuration(duration.value)}
                variant={selectedDuration === duration.value ? "default" : "outline"}
                className={`text-sm h-10 ${
                  selectedDuration === duration.value
                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {duration.label}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InternshipFilters;
