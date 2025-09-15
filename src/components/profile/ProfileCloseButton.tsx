import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const ProfileCloseButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
      initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        onClick={() => navigate('/home')}
        variant="ghost"
        size="icon"
        className="w-12 h-12 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm hover:from-white/30 hover:to-white/20 border-2 border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        aria-label="Close Profile"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-pink/20 rounded-full"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          animate={{
            rotate: isHovered ? 90 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10"
        >
          <X className="w-6 h-6 text-white drop-shadow-md" />
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default ProfileCloseButton;
