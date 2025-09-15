
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Code, Database, Palette, Brain } from 'lucide-react';

const SkillAnalytics = () => {
  const skills = [
    { name: 'JavaScript', level: 85, icon: Code, color: 'from-yellow-500 to-orange-500' },
    { name: 'React', level: 80, icon: Code, color: 'from-blue-500 to-cyan-500' },
    { name: 'Python', level: 70, icon: Code, color: 'from-green-500 to-emerald-500' },
    { name: 'SQL', level: 60, icon: Database, color: 'from-purple-500 to-pink-500' },
    { name: 'UI/UX Design', level: 55, icon: Palette, color: 'from-red-500 to-pink-500' },
    { name: 'Machine Learning', level: 40, icon: Brain, color: 'from-indigo-500 to-purple-500' },
  ];

  const learningHours = [
    { month: 'Jan', hours: 45 },
    { month: 'Feb', hours: 38 },
    { month: 'Mar', hours: 52 },
    { month: 'Apr', hours: 41 },
    { month: 'May', hours: 67 },
    { month: 'Jun', hours: 55 },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Skill Analytics
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" />
                Skill Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm text-white/70">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Hours Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="text-white">Learning Hours (Monthly)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningHours.map((data, index) => (
                  <motion.div
                    key={data.month}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-8 text-white/70 font-medium">{data.month}</span>
                    <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-brand-purple to-brand-pink rounded-full flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.hours / 70) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      >
                        <span className="text-xs font-bold text-white">{data.hours}h</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillAnalytics;
