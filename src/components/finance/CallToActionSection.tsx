
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, DollarSign, Target, MessageCircle } from "lucide-react";

const CallToActionSection = () => {
  const ctaButtons = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Start Investing Now",
      description: "Begin your investment journey today",
      variant: "outline" as const,
      className: "border-green-500/20 hover:bg-green-500/5"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl"></div>
      </div>
    </motion.div>
  );
};

export default CallToActionSection;
