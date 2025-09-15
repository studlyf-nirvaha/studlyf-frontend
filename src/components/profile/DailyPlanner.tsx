
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Plus, CheckCircle, Clock, Target, StickyNote, CalendarDays } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DailyPlanner = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const todos = [
    { id: 1, task: 'Complete React Module 3', priority: 'high', completed: false },
    { id: 2, task: 'Apply for Google Internship', priority: 'high', completed: true },
    { id: 3, task: 'Review Data Structures', priority: 'medium', completed: false },
    { id: 4, task: 'Attend AI Workshop', priority: 'low', completed: false },
  ];

  const goals = [
    { id: 1, goal: 'Complete 10 Courses', progress: 70, target: '2024' },
    { id: 2, goal: 'Get Internship at FAANG', progress: 40, target: 'Summer 2024' },
    { id: 3, goal: 'Build 5 Projects', progress: 80, target: 'Dec 2024' },
  ];

  const notes = [
    { id: 1, note: 'Remember to update portfolio', timestamp: '2 hours ago' },
    { id: 2, note: 'Interview prep - system design', timestamp: '1 day ago' },
    { id: 3, note: 'Research ML algorithms', timestamp: '3 days ago' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card border-none h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <CalendarDays className="w-5 h-5 text-purple-400" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg w-full max-w-none"
                classNames={{
                  months: "w-full",
                  month: "w-full space-y-4",
                  caption: "flex justify-center pt-1 relative items-center w-full",
                  caption_label: "text-sm font-medium text-white",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-white/10 border-white/20 text-white p-0 opacity-70 hover:opacity-100 hover:bg-white/20 rounded-md",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex w-full",
                  head_cell: "text-white/60 rounded-md w-full font-normal text-[0.8rem] flex-1 text-center p-1",
                  row: "flex w-full mt-2",
                  cell: "h-8 w-full text-center text-sm p-0 relative flex-1 focus-within:relative focus-within:z-20",
                  day: "h-8 w-full p-0 font-normal text-white hover:bg-white/20 hover:text-white rounded-md flex items-center justify-center",
                  day_selected: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600",
                  day_today: "bg-white/20 text-white font-bold",
                  day_outside: "text-white/30 opacity-50",
                  day_disabled: "text-white/30 opacity-50",
                }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks & Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-1 xl:col-span-2"
      >
        <Card className="glass-card border-none h-full">
          <CardHeader>
            <CardTitle className="text-white">Productivity Hub</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="todos" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">To-Do</span>
                </TabsTrigger>
                <TabsTrigger value="goals" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Goals</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <StickyNote className="w-4 h-4" />
                  <span className="hidden sm:inline">Notes</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="todos" className="space-y-3 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">Today's Tasks</h3>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {todos.map((todo, index) => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 ${
                      todo.completed ? 'opacity-60' : ''
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <CheckCircle 
                        className={`w-5 h-5 cursor-pointer ${
                          todo.completed ? 'text-green-500' : 'text-white/40'
                        }`}
                      />
                    </motion.div>
                    <span className={`flex-1 ${todo.completed ? 'line-through text-white/60' : 'text-white'}`}>
                      {todo.task}
                    </span>
                    <Badge className={`bg-gradient-to-r ${getPriorityColor(todo.priority)} text-white border-none`}>
                      {todo.priority}
                    </Badge>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="goals" className="space-y-3 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">Goal Tracker</h3>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-white">{goal.goal}</span>
                      <Badge variant="outline" className="text-white/70 border-white/20">
                        {goal.target}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <span className="text-sm text-white/70">{goal.progress}%</span>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="notes" className="space-y-3 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">Quick Notes</h3>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <p className="text-white mb-1">{note.note}</p>
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      <Clock className="w-3 h-3" />
                      {note.timestamp}
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DailyPlanner;
