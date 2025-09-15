
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, DollarSign, Clock } from "lucide-react";

interface Internship {
  id: string;
  title: string;
  company: string;
  logo: string;
  stipend: string;
  duration: string;
  type: string;
  domain: string;
  location: string;
  deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
}

interface InternshipCardProps {
  internship: Internship;
  onClick: () => void;
}

const InternshipCard = ({ internship, onClick }: InternshipCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "remote": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "hybrid": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "in-office": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getDaysLeft = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysLeft = getDaysLeft(internship.deadline);

  return (
    <motion.div
      className="group p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-brand-purple/50 transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl md:text-3xl">{internship.logo}</div>
          <div>
            <h3 className="font-semibold text-white text-base md:text-lg group-hover:text-brand-purple transition-colors">
              {internship.title}
            </h3>
            <p className="text-white/70 text-sm">{internship.company}</p>
          </div>
        </div>
        <Badge className={`text-xs ${getTypeColor(internship.type)}`}>
          {internship.type}
        </Badge>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-white/70 text-sm">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>{internship.stipend}</span>
        </div>
        <div className="flex items-center text-white/70 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center text-white/70 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{internship.location}</span>
        </div>
        <div className="flex items-center text-white/70 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span className={daysLeft <= 7 ? "text-red-400 font-medium" : ""}>
            {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mb-4">
        {internship.skills.slice(0, 3).map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="text-xs border-white/20 text-white/80"
          >
            {skill}
          </Badge>
        ))}
        {internship.skills.length > 3 && (
          <Badge
            variant="outline"
            className="text-xs border-white/20 text-white/80"
          >
            +{internship.skills.length - 3}
          </Badge>
        )}
      </div>

      {/* Description Preview */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2">
        {internship.description}
      </p>

      {/* Apply Button */}
      <Button
        className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all duration-300 text-sm md:text-base font-medium"
        onClick={(e) => {
          e.stopPropagation();
          // Handle apply action
        }}
      >
        Apply Now
      </Button>
    </motion.div>
  );
};

export default InternshipCard;
