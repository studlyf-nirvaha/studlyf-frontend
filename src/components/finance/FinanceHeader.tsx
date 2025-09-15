
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign } from "lucide-react";

interface FinanceHeaderProps {
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
}

const FinanceHeader = ({ showAdvanced, setShowAdvanced }: FinanceHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mb-12 overflow-hidden rounded-xl p-8 bg-gradient-to-r from-brand-purple to-brand-pink"
    >
      <motion.div 
        className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 pointer-events-none" />
      <motion.div 
        className="absolute right-0 bottom-0 w-40 h-40 md:w-64 md:h-64 text-white/10"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <DollarSign strokeWidth={0.5} className="w-full h-full" />
      </motion.div>
      <div className="relative">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Master Your Money
        </motion.h1>
        <motion.p 
          className="text-lg mb-6 text-white/80 max-w-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          From SIPs to stocks – smart finance for students
        </motion.p>
        <motion.div 
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" className="bg-white text-brand-purple hover:bg-white/90 shadow-lg">
              <DollarSign className="mr-2 h-4 w-4" /> Get Started
            </Button>
          </motion.div>
          <div className="flex items-center space-x-2">
            <Switch
              id="advanced-mode"
              checked={showAdvanced}
              onCheckedChange={setShowAdvanced}
            />
            <label htmlFor="advanced-mode" className="text-sm font-medium text-white cursor-pointer">
              Advanced Mode
            </label>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FinanceHeader;
