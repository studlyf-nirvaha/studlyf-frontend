
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, PiggyBank, Calculator } from "lucide-react";

const QuickActionButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-wrap justify-center gap-4 mt-8"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button variant="outline" className="bg-gradient-to-r from-brand-purple/5 to-brand-pink/5 border-brand-purple/20">
          <Zap className="mr-2 h-4 w-4 text-brand-purple" /> Free Resources
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button variant="outline" className="bg-gradient-to-r from-brand-purple/5 to-brand-pink/5 border-brand-purple/20">
          <PiggyBank className="mr-2 h-4 w-4 text-brand-purple" /> Start Investing
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button className="bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-md">
          <Calculator className="mr-2 h-4 w-4" /> Personalized Plan
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default QuickActionButtons;
