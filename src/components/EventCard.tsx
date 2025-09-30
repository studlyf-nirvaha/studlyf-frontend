import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';

type TagColor = 'purple' | 'green' | 'pink';

interface EventCardProps {
  id?: number | string;
  type?: string; // e.g. 'Hackathon'
  tagColor?: TagColor;
  title: string;
  date: string; // human readable
  time?: string;
  location?: string;
  attendees?: number;
  description?: string;
  onJoin?: () => void;
}

const tagClasses: Record<TagColor, string> = {
  purple: 'bg-purple-600 text-white',
  green: 'bg-emerald-500 text-white',
  pink: 'bg-pink-500 text-white',
};

const EventCard: React.FC<EventCardProps> = ({
  type = 'Event',
  tagColor = 'purple',
  title,
  date,
  time,
  location,
  attendees = 0,
  description,
  onJoin,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg p-6 max-w-md mx-auto"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-full text-sm font-semibold ${tagClasses[tagColor]}`}>
          <span className="uppercase tracking-wider text-xs">{type}</span>
        </div>

        <div className="flex items-center text-sm text-gray-300 gap-2">
          <Calendar className="w-4 h-4 opacity-90" />
          <span className="font-medium">{date}</span>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400">
        {title}
      </h3>

      <div className="flex items-center gap-4 text-sm text-gray-300 mt-3">
        {time && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{time}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">{attendees} attending</span>
        </div>
      </div>

      {description && (
        <p className="mt-3 text-gray-300 text-sm leading-relaxed">{description}</p>
      )}

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-400">Starts: <span className="text-white font-medium">{date}</span></div>
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(168,85,247,0.2)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onJoin}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:brightness-105 transition"
        >
          Join
        </motion.button>
      </div>
    </motion.article>
  );
};

export default EventCard;
