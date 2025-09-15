
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Users, Trophy } from "lucide-react";

const PostInternshipCTA = () => {
  const stats = [
    { icon: Building2, label: "Companies Trust Us", value: "500+" },
    { icon: Users, label: "Students Hired", value: "2000+" },
    { icon: Trophy, label: "Success Rate", value: "85%" }
  ];

  return (
    <motion.div
      className="w-full py-8 md:py-12 px-6 md:px-8 rounded-2xl bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 border border-brand-purple/20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Are You a Company Looking to Hire?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Post your internship opportunities and connect with talented students from top colleges across India
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
            >
              <stat.icon className="w-8 h-8 text-brand-purple mx-auto mb-2" />
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all duration-300 px-8 py-3 font-semibold rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post Internship
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-3 font-semibold rounded-xl"
          >
            Learn More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostInternshipCTA;
