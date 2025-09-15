
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, Clock, Award, BookOpen } from 'lucide-react';

const CoursesPanel = () => {
  const coursesInProgress = [
    {
      id: 1,
      title: 'Complete React Development Course',
      instructor: 'John Doe',
      progress: 75,
      totalHours: 40,
      completedHours: 30,
      nextLesson: 'Advanced Hooks',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      instructor: 'Jane Smith',
      progress: 45,
      totalHours: 60,
      completedHours: 27,
      nextLesson: 'Binary Trees',
      image: '/placeholder.svg'
    }
  ];

  const completedCourses = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      instructor: 'Mike Johnson',
      completedDate: '2024-01-15',
      certificate: true,
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'HTML & CSS Mastery',
      instructor: 'Sarah Wilson',
      completedDate: '2024-01-10',
      certificate: true,
      rating: 4,
      image: '/placeholder.svg'
    }
  ];

  const savedCourses = [
    {
      id: 1,
      title: 'Machine Learning Basics',
      instructor: 'Dr. AI Expert',
      price: '$99',
      rating: 4.8,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Cloud Computing with AWS',
      instructor: 'Cloud Master',
      price: '$149',
      rating: 4.9,
      image: '/placeholder.svg'
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
          My Courses
        </h2>
        <Button className="bg-gradient-to-r from-brand-purple to-brand-pink">
          Browse Courses
        </Button>
      </motion.div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10">
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4 mt-6">
          {coursesInProgress.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white/60" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-white/70 mb-4">by {course.instructor}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm text-white/70 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}% Complete</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-white/70">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.completedHours}/{course.totalHours} hours
                          </div>
                          <Badge variant="outline" className="text-white/70 border-white/20">
                            Next: {course.nextLesson}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="bg-gradient-to-r from-brand-purple to-brand-pink">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                      <Award className="w-12 h-12 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-white/70 mb-2">by {course.instructor}</p>
                      <p className="text-sm text-white/60 mb-4">
                        Completed on {new Date(course.completedDate).toLocaleDateString()}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < course.rating ? 'text-yellow-400' : 'text-white/20'}>
                              ★
                            </span>
                          ))}
                        </div>
                        {course.certificate && (
                          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-none">
                            <Award className="w-3 h-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        View Certificate
                      </Button>
                      <Button variant="ghost" className="text-white/70 hover:text-white">
                        Leave Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-6">
          {savedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 bg-gradient-to-br from-brand-purple/20 to-brand-pink/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white/60" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-white/70 mb-4">by {course.instructor}</p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-white/20'}>
                              ★
                            </span>
                          ))}
                          <span className="text-white/70 ml-1">({course.rating})</span>
                        </div>
                        <Badge className="bg-gradient-to-r from-brand-purple to-brand-pink text-white border-none">
                          {course.price}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="bg-gradient-to-r from-brand-purple to-brand-pink">
                        Enroll Now
                      </Button>
                      <Button variant="ghost" className="text-white/70 hover:text-white">
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPanel;
