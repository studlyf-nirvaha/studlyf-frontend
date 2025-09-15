
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Award, Target, BookOpen } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      id: 1,
      title: 'First Internship',
      description: 'Successfully landed your first internship',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Course Completionist',
      description: 'Completed 10 courses',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      earned: false,
      progress: 70
    },
    {
      id: 3,
      title: 'Goal Achiever',
      description: 'Completed 5 personal goals',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      earned: true,
      date: '2024-01-20'
    },
    {
      id: 4,
      title: 'Top Performer',
      description: 'Ranked in top 10% of students',
      icon: Award,
      color: 'from-indigo-500 to-purple-500',
      earned: false,
      progress: 85
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Achievements & Badges
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className={`glass-card border-none h-full relative overflow-hidden ${
                achievement.earned ? '' : 'opacity-75'
              }`}>
                <CardContent className="p-6 text-center">
                  {achievement.earned && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div
                    className={`inline-flex p-4 rounded-full bg-gradient-to-r ${achievement.color} mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{achievement.description}</p>
                  
                  {achievement.earned ? (
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none px-3 py-1 rounded-full text-sm">
                      Earned {new Date(achievement.date!).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${achievement.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
