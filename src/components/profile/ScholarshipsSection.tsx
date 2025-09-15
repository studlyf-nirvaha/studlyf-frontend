
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, DollarSign, Calendar, FileText } from 'lucide-react';

const ScholarshipsSection = () => {
  const scholarships = [
    {
      id: 1,
      title: 'Tech Excellence Scholarship',
      amount: '$5,000',
      deadline: '2024-03-15',
      status: 'applied',
      provider: 'Tech Foundation'
    },
    {
      id: 2,
      title: 'Merit-Based Grant',
      amount: '$3,000',
      deadline: '2024-02-28',
      status: 'recommended',
      provider: 'Education Board'
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
          Scholarships & Resources
        </h2>
        <Button className="bg-gradient-to-r from-brand-purple to-brand-pink">
          Find More
        </Button>
      </motion.div>

      <div className="grid gap-4">
        {scholarships.map((scholarship, index) => (
          <motion.div
            key={scholarship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-none">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-5 h-5 text-white/70" />
                      <h3 className="text-xl font-bold text-white">{scholarship.title}</h3>
                      <Badge className={`${scholarship.status === 'applied' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'} text-white border-none`}>
                        {scholarship.status === 'applied' ? 'Applied' : 'Recommended'}
                      </Badge>
                    </div>
                    <p className="text-white/70 mb-3">by {scholarship.provider}</p>
                    <div className="flex items-center gap-4 text-white/60">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {scholarship.amount}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <FileText className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipsSection;
