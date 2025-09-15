
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Virtual',
      attendees: 250,
      status: 'registered',
      type: 'Workshop'
    },
    {
      id: 2,
      title: 'Tech Career Fair 2024',
      date: '2024-02-20',
      time: '9:00 AM',
      location: 'Tech Hub, Chennai',
      attendees: 500,
      status: 'attended',
      type: 'Career Fair'
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
          My Events
        </h2>
        <Button className="bg-gradient-to-r from-brand-purple to-brand-pink">
          Browse Events
        </Button>
      </motion.div>

      <div className="grid gap-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-none">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      <Badge className={`${event.status === 'attended' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} text-white border-none`}>
                        {event.status === 'attended' ? 'Attended' : 'Registered'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.attendees} attendees
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {event.status === 'attended' ? 'View Details' : 'Join Event'}
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

export default EventsSection;
