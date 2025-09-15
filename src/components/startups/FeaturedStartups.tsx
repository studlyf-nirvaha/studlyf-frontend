import React from 'react';
import StartupCard from './StartupCard';

const FeaturedStartups = ({ startups, onViewAll, onViewDetails, onApply }) => (
  <section className="mb-16">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Featured Startups</h2>
        <p className="text-base opacity-80">Trending ventures with exciting opportunities</p>
      </div>
      <button className="rounded-full px-5 py-2 font-semibold border border-purple-500 bg-white/10 hover:bg-purple-500/20 transition shadow mt-2 md:mt-0" onClick={onViewAll}>View All Trending</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {startups.map((startup, i) => (
        <div key={startup.id} style={{ animationDelay: `${i * 0.09}s` }} className="animated">
          <StartupCard startup={startup} onViewDetails={onViewDetails} onApply={onApply} featured />
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedStartups; 