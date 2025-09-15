import React from 'react';
import StartupCard from './StartupCard';

const AllStartups = ({ startups, sort, setSort, view, setView, onViewDetails, onApply }) => (
  <section>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
      <h2 className="text-xl font-bold">All Startups <span className="text-purple-400">({startups.length})</span></h2>
      <div className="flex flex-wrap items-center gap-2">
        <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-full px-3 py-1 border border-purple-500 bg-black text-white transition focus:ring-2 focus:ring-purple-500">
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </select>
        <button className={`rounded-full px-3 py-1 border border-purple-500 bg-white/10 transition ${view === 'grid' ? 'font-bold shadow' : ''}`} onClick={() => setView('grid')}>Grid</button>
        <button className={`rounded-full px-3 py-1 border border-purple-500 bg-white/10 transition ${view === 'list' ? 'font-bold shadow' : ''}`} onClick={() => setView('list')}>List</button>
      </div>
    </div>
    <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 transition-all duration-500' : 'flex flex-col gap-6 transition-all duration-500'}>
      {startups.map((startup, i) => (
        <div key={startup.id} style={{ animationDelay: `${i * 0.07}s` }} className="animated">
          <StartupCard startup={startup} onViewDetails={onViewDetails} onApply={onApply} featured={false} />
        </div>
      ))}
    </div>
  </section>
);

export default AllStartups; 