import React, { useEffect, useState } from 'react';
import { Users, Star, Briefcase, UserPlus } from 'lucide-react';
import { Button } from "../ui/button";

const statIcons = [
  <Star key="featured" className="w-6 h-6 mb-1" />,
  <Briefcase key="roles" className="w-6 h-6 mb-1" />,
  <UserPlus key="members" className="w-6 h-6 mb-1" />,
  <Users key="total" className="w-6 h-6 mb-1" />,
];

const StartupSummary = ({ stats, onCreate }) => {
  const [animatedStats, setAnimatedStats] = useState({ total: 0, featured: 0, openRoles: 0, teamMembers: 0 });

  useEffect(() => {
    const keys = Object.keys(stats);
    let frame;
    let start = 0;
    const duration = 800;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setAnimatedStats({
        total: Math.floor(stats.total * progress),
        featured: Math.floor(stats.featured * progress),
        openRoles: Math.floor(stats.openRoles * progress),
        teamMembers: Math.floor(stats.teamMembers * progress),
      });
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setAnimatedStats(stats);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [stats]);

  // Removed statList and stat cards section

  return (
    <section className="mb-8">
      <div className="mb-4"></div>
      {/* Stat cards section removed */}
      <div className="flex flex-col items-center mt-4">
        <Button
          type="button"
          variant="outline"
          className="h-12 btn-secondary hover:scale-105 transition-transform w-full max-w-xs font-semibold"
          onClick={onCreate}
        >
          + Create Startup
        </Button>
      </div>
    </section>
  );
};

export default StartupSummary; 