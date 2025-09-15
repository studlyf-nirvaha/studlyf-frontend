import React from 'react';
import { Eye, Mail, Flame } from 'lucide-react';

const StartupCard = ({ startup, onViewDetails, onApply, featured }) => (
  <div
    className={`w-full max-w-md min-w-[260px] rounded-2xl shadow-xl p-4 flex flex-col gap-3 bg-gradient-to-br from-black via-gray-900 to-purple-900 border-2 border-purple-500 backdrop-blur-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:border-white cursor-pointer group mx-auto` + (featured ? ' border-4' : '')}
    style={{ minWidth: 260 }}
  >
    {/* Company Name as Heading */}
    <div className="flex items-center gap-3 mb-2">
      <span className="font-bold text-2xl text-purple-700 line-clamp-1">{startup.name}</span>
      {featured && (
        <span className="rounded-full px-3 py-1 text-xs font-semibold border border-yellow-400 bg-yellow-100/20 text-yellow-700 animate-pulse">Featured</span>
      )}
    </div>
    {/* Theme/Domain and Stage */}
    <div className="flex flex-wrap gap-2 mb-1">
      <span className="rounded-full px-3 py-1 text-xs font-semibold border border-purple-400 bg-gradient-to-r from-purple-200/60 via-white/60 to-purple-100/60 text-purple-800 shadow-sm">{startup.domain}</span>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold border shadow-sm ${startup.stage === 'Idea Stage' ? 'border-yellow-400 bg-gradient-to-r from-yellow-200/70 via-white/60 to-yellow-100/70 text-yellow-800' : startup.stage === 'MVP' ? 'border-blue-400 bg-gradient-to-r from-blue-200/70 via-white/60 to-blue-100/70 text-blue-800' : 'border-green-400 bg-gradient-to-r from-green-200/70 via-white/60 to-green-100/70 text-green-800'}`}>{startup.stage}</span>
    </div>
    {/* Founder */}
    <div className="flex items-center gap-3 mb-1">
      <img src={startup.founder.avatar} alt={startup.founder.name} className="w-10 h-10 rounded-full border-2 border-purple-200" />
      <div className="flex flex-col">
        <span
          className="font-semibold text-base px-2 py-0.5 rounded-md bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent line-clamp-1 shadow-sm"
          style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
        >
          {startup.founder.name}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded bg-gradient-to-r from-white/80 via-purple-100/60 to-white/80 bg-clip-text text-transparent line-clamp-1"
          style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
        >
          {startup.founder.role}
        </span>
      </div>
    </div>
    {/* Open Roles */}
    <div className="flex flex-wrap gap-2 mb-1">
      {startup.openRoles && startup.openRoles.length > 0 ? (
        startup.openRoles.map(role => (
          <span key={role} className="rounded-full px-3 py-1 text-xs font-semibold border border-purple-400 bg-purple-400/10 group-hover:bg-purple-500/20 group-hover:border-purple-500 transition-all hover:scale-105">{role}</span>
        ))
      ) : (
        <span className="text-xs text-gray-500 italic">No open roles</span>
      )}
    </div>
    {/* Description */}
    <div className="text-base mb-2 line-clamp-3 opacity-90">{startup.description}</div>
    {/* Details section removed as per request */}
    {/* Buttons */}
    <div className="flex gap-3 mt-auto">
      <button
        className="rounded-full px-5 py-2 border font-semibold border-white bg-gradient-to-r from-white via-white/80 to-white/60 hover:from-gray-100 hover:to-gray-200 transition shadow text-black hover:text-purple-700"
        onClick={() => onViewDetails(startup)}
      >
        View Details
      </button>
      <button
        className="rounded-full px-5 py-2 border font-semibold border-purple-500 bg-white hover:bg-purple-700 transition shadow text-black hover:text-white"
        onClick={() => onApply(startup)}
      >
        Apply Now
      </button>
    </div>
    {/* Stats section removed as per request */}
  </div>
);

export default StartupCard; 