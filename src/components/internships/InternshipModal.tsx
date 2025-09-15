
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, DollarSign, Clock, Bookmark, Share2 } from "lucide-react";
import { useEffect } from "react";

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

interface InternshipModalProps {
  internship: Internship;
  isOpen: boolean;
  onClose: () => void;
}

const InternshipModal = ({ internship, isOpen, onClose }: InternshipModalProps) => {
  // Lock body scroll and hide navbar when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Hide navbar by adding a class
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = 'none';
      }
    } else {
      document.body.style.overflow = 'unset';
      // Show navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = 'block';
      }
    }
    
    // Cleanup function to restore scroll and navbar on unmount
    return () => {
      document.body.style.overflow = 'unset';
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, [isOpen]);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with lock - clicking closes modal */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content - 70% of screen size */}
          <motion.div
            className="relative w-full max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <motion.div 
                className="flex items-start space-x-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-4xl">{internship.logo}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{internship.title}</h2>
                      <p className="text-lg text-white/80">{internship.company}</p>
                    </div>
                    <Badge className={`${getTypeColor(internship.type)}`}>
                      {internship.type}
                    </Badge>
                  </div>
                </div>
              </motion.div>

              {/* Quick Info */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <DollarSign className="w-5 h-5 text-brand-purple mx-auto mb-1" />
                  <p className="text-sm text-white/70">Stipend</p>
                  <p className="font-semibold text-white text-sm">{internship.stipend}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <Clock className="w-5 h-5 text-brand-purple mx-auto mb-1" />
                  <p className="text-sm text-white/70">Duration</p>
                  <p className="font-semibold text-white text-sm">{internship.duration}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <MapPin className="w-5 h-5 text-brand-purple mx-auto mb-1" />
                  <p className="text-sm text-white/70">Location</p>
                  <p className="font-semibold text-white text-sm">{internship.location}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5">
                  <Calendar className="w-5 h-5 text-brand-purple mx-auto mb-1" />
                  <p className="text-sm text-white/70">Deadline</p>
                  <p className={`font-semibold text-sm ${daysLeft <= 7 ? "text-red-400" : "text-white"}`}>
                    {daysLeft > 0 ? `${daysLeft} days` : "Expired"}
                  </p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">About This Internship</h3>
                <p className="text-white/80 leading-relaxed">{internship.description}</p>
              </motion.div>

              {/* Requirements */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {internship.requirements.map((req) => (
                    <Badge
                      key={req}
                      variant="outline"
                      className="border-brand-purple/30 text-brand-purple bg-brand-purple/10"
                    >
                      {req}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">Skills You'll Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-brand-pink/30 text-brand-pink bg-brand-pink/10"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {internship.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-white/80">
                      <span className="w-2 h-2 bg-brand-purple rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button
                  className="flex-1 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all duration-300 font-medium py-3"
                  disabled={daysLeft <= 0}
                >
                  {daysLeft <= 0 ? "Application Closed" : "Apply Now"}
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InternshipModal;
