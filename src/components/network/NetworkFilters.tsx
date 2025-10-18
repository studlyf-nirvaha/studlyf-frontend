
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Heart, Briefcase, CheckCircle2, Users, MapPin, School } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NetworkFiltersProps {
  onSearchChange: (search: string) => void;
  onInterestChange: (interest: string) => void;
  onSkillChange?: (skills: string[]) => void;
  onStatusChange?: (statuses: string[]) => void;
  onSchoolChange?: (schools: string[]) => void;
  searchValue: string;
  selectedInterest: string;
  selectedSkills?: string[];
  selectedStatuses?: string[];
  selectedSchools?: string[];
  onClearAll?: () => void;
}

const interests = [
  "Web Development",
  "AI/ML",
  "Startups",
  "Data Science",
  "Finance",
  "Photography",
  "Blockchain",
  "Entrepreneurship",
  "Gaming",
  "UX Design",
  "Marketing",
  "Travel",
  "Mobile Development",
  "IoT",
  "Music",
  "Content Writing",
  "Social Media",
  "Fitness"
];

const skills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "UI/UX Design",
  "Product Management",
  "Data Analysis",
  "Machine Learning",
  "Digital Marketing",
  "Content Creation",
  "Project Management",
  "Agile Methodology"
];

const statuses = [
  "Connected",
  "Pending",
  "Not Connected"
];

const locations = [
  "Remote",
  "New York",
  "San Francisco",
  "London",
  "Berlin",
  "Tokyo",
  "Sydney",
  "Toronto",
  "Singapore",
  "Bangalore"
];


const filterGroups = [
  { label: 'Interests', items: interests, key: 'interests', icon: <Heart className="w-4 h-4 text-pink-400" /> },
  { label: 'Skills', items: skills, key: 'skills', icon: <Briefcase className="w-4 h-4 text-blue-400" /> },
  { label: 'Connection Status', items: statuses, key: 'statuses', icon: <CheckCircle2 className="w-4 h-4 text-green-400" /> },
];

const NetworkFilters = ({
  onSearchChange,
  onInterestChange,
  onSkillChange = () => { },
  onStatusChange = () => { },
  searchValue,
  selectedInterest,
  selectedSkills = [],
  selectedStatuses = [],
  onClearAll = () => { }
}: NetworkFiltersProps) => {
  const [open, setOpen] = useState({
    interests: false,
    skills: false,
    statuses: false,
  });

  const toggle = (key: string) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      onInterestChange(interest);
    } else {
      onInterestChange("All Interests");
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    const updatedSkills = checked
      ? [...selectedSkills, skill]
      : selectedSkills.filter(s => s !== skill);
    onSkillChange(updatedSkills);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const updatedStatuses = checked
      ? [...selectedStatuses, status]
      : selectedStatuses.filter(s => s !== status);
    onStatusChange(updatedStatuses);
  };





  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-3 w-3 sm:h-4 sm:w-4" />
          <Input
            type="text"
            placeholder="Search by name..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 sm:pl-10 rounded-full py-2 border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition w-full text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Filter Groups */}
      {filterGroups.map(group => (
        <div key={group.key} className="mb-3 sm:mb-4 transition-all">
          <button
            type="button"
            className="flex items-center justify-between w-full font-semibold mb-2 focus:outline-none text-white text-sm sm:text-base"
            onClick={() => toggle(group.key)}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4">{group.icon}</div>
              <span>{group.label}</span>
            </div>
            <span className={`transform transition-transform text-xs sm:text-sm ${open[group.key] ? 'rotate-90' : 'rotate-0'}`}>▶</span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${open[group.key] ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-1 sm:space-y-2 pl-2">
              {group.key === 'interests' ? (
                <div className="flex flex-wrap gap-1 sm:gap-2 py-2">
                  {interests.map(interest => (
                    <Badge
                      key={interest}
                      className={`cursor-pointer text-xs ${selectedInterest === interest
                        ? 'bg-brand-purple/20 text-brand-purple border border-brand-purple/40'
                        : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'}`}
                      onClick={() => handleInterestChange(interest, selectedInterest !== interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              ) : (
                group.items.map(item => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={
                        group.key === 'skills' ? selectedSkills.includes(item) :
                          group.key === 'statuses' ? selectedStatuses.includes(item) : false
                      }
                      onChange={e => {
                        if (group.key === 'skills') handleSkillChange(item, e.target.checked);
                        else if (group.key === 'statuses') handleStatusChange(item, e.target.checked);
                      }}
                      className="form-checkbox accent-purple-500 w-3 h-3 sm:w-4 sm:h-4 rounded-full transition"
                    />
                    <span className="text-white/90 text-xs sm:text-sm">{item}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Selected Filters */}
      {(selectedInterest !== "All Interests" || selectedSkills.length > 0 || selectedStatuses.length > 0) && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-white/70">Selected Filters:</span>
              <button
                className="text-xs text-brand-purple hover:underline"
                onClick={onClearAll}
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {selectedInterest !== "All Interests" && (
                <Badge className="bg-brand-purple/20 text-brand-purple border border-brand-purple/40 text-xs">
                  {selectedInterest}
                  <button
                    className="ml-1 hover:text-white"
                    onClick={() => onInterestChange("All Interests")}
                  >
                    ×
                  </button>
                </Badge>
              )}

              {selectedSkills.map(skill => (
                <Badge
                  key={skill}
                  className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs"
                >
                  {skill}
                  <button
                    className="ml-1 hover:text-white"
                    onClick={() => handleSkillChange(skill, false)}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {selectedStatuses.map(status => (
                <Badge
                  key={status}
                  className="bg-green-500/20 text-green-300 border border-green-500/40 text-xs"
                >
                  {status}
                  <button
                    className="ml-1 hover:text-white"
                    onClick={() => handleStatusChange(status, false)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

      <button
        type="button"
        className="w-full rounded-full border border-purple-500 py-2 font-semibold text-purple-200 hover:bg-purple-500/20 transition shadow focus:outline-none focus:ring-2 focus:ring-purple-500 mt-4 sm:mt-6 text-sm sm:text-base"
        onClick={onClearAll}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default NetworkFilters;