
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Star, Trophy, Zap } from 'lucide-react';

const ProfileHeader = () => {
  const badges = [
    { label: 'Top Learner', color: 'from-yellow-500 to-orange-500', icon: Star },
    { label: 'Contributor', color: 'from-green-500 to-blue-500', icon: Trophy },
    { label: 'Streak Master', color: 'from-purple-500 to-pink-500', icon: Zap },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 md:p-8 mb-8"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Picture */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-gradient-to-r from-brand-purple to-brand-pink">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-pink">
              JS
            </AvatarFallback>
          </Avatar>
          <motion.div
            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-brand-purple to-brand-pink rounded-full p-2"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Edit className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink mb-2"
          >
            John Smith
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/70 mb-4"
          >
            B.Tech Student, CSE - VIT Chennai
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center md:justify-start gap-2 mb-4"
          >
            {badges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge className={`bg-gradient-to-r ${badge.color} text-white border-none px-3 py-1 flex items-center gap-1`}>
                    <IconComponent className="w-3 h-3" />
                    {badge.label}
                  </Badge>
                </motion.div>
              );
            })}
          </motion.div>

          {/* XP Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center md:justify-start gap-4 mb-4"
          >
            <div className="bg-gradient-to-r from-brand-purple to-brand-pink rounded-full px-4 py-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-white" />
              <span className="font-bold text-white">2,450 XP</span>
            </div>
            <div className="text-white/70">
              Level 12 • Next: 550 XP
            </div>
          </motion.div>

          {/* Edit Profile Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 rounded-full px-6">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
