
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Briefcase, Calendar, TrendingUp } from 'lucide-react';

const OverviewCards = () => {
  const cards = [
    {
      title: 'Courses in Progress',
      value: '5 Active',
      subtitle: '12 Completed',
      progress: 68,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Internships Applied',
      value: '8 Total',
      subtitle: '3 Accepted',
      progress: 37,
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Upcoming Events',
      value: '3 Events',
      subtitle: 'Next: AI Workshop',
      progress: 100,
      icon: Calendar,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Skill Growth',
      value: '8 Skills',
      subtitle: '+2 This Month',
      progress: 82,
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="glass-card border-none h-full group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <motion.div
                    className={`p-3 rounded-full bg-gradient-to-r ${card.color}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-right">
                    <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-pink transition-all duration-300">
                      {card.value}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className="font-semibold text-white/90 mb-2">{card.title}</h3>
                <p className="text-sm text-white/60 mb-3">{card.subtitle}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Progress</span>
                    <span>{card.progress}%</span>
                  </div>
                  <Progress value={card.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OverviewCards;
