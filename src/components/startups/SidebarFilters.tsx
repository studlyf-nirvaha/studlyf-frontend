import React, { useState } from 'react';

const domains = ["Technology", "Healthcare", "FinTech", "Education", "E-commerce", "Sustainability"];
const stages = ["Idea Stage", "MVP", "Funded"];
const teamSizes = ["1–5 members", "6–10 members", "11–20 members", "20+ members"];
const collabTypes = ["Internship", "Co-founder", "Advisor", "Freelance"];
const locations = ["Remote", "New York", "San Francisco", "Boston", "Austin", "Seattle"];

const filterGroups = [
  { label: 'Domain', items: domains, key: 'domains' },
  { label: 'Stage', items: stages, key: 'stages' },
  { label: 'Team Size', items: teamSizes, key: 'teamSizes' },
  { label: 'Collaboration Type', items: collabTypes, key: 'collabTypes' },
  { label: 'Location', items: locations, key: 'locations' },
];

const SidebarFilters = ({ filters, setFilters, clearAll }) => {
  const [open, setOpen] = useState({
    domains: false,
    stages: false,
    teamSizes: false,
    collabTypes: false,
    locations: false,
    founded: false,
  });

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className="sticky top-6 h-fit w-full max-w-xs p-4 space-y-6 rounded-2xl shadow-xl backdrop-blur-lg bg-white/10 border border-white/10">
      <div>
        <input type="text" placeholder="Search startups..." className="w-full rounded-full px-4 py-2 border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" value={filters.search} onChange={e => setFilters(f => ({...f, search: e.target.value}))} />
      </div>
      {filterGroups.map(group => (
        <div key={group.key} className="transition-all">
          <button type="button" className="flex items-center justify-between w-full font-semibold mb-2 focus:outline-none" onClick={() => toggle(group.key)}>
            <span>{group.label}</span>
            <span className={`transform transition-transform ${open[group.key] ? 'rotate-90' : 'rotate-0'}`}>▶</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open[group.key] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-wrap gap-2 pl-2 pt-1 pb-2">
              {group.items.map(item => {
                const selected = filters[group.key].includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all select-none
                      ${selected ? 'bg-brand-purple text-white border-brand-purple' : 'bg-white/10 text-white/80 border-white/20 hover:bg-brand-purple/20 hover:text-white'}
                    `}
                    onClick={() => setFilters(f => ({
                      ...f,
                      [group.key]: selected ? f[group.key].filter(i => i !== item) : [...f[group.key], item]
                    }))}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
      <div>
        <button type="button" className="flex items-center justify-between w-full font-semibold mb-2 focus:outline-none" onClick={() => toggle('founded')}>
          <span>Founded Year</span>
          <span className={`transform transition-transform ${open.founded ? 'rotate-90' : 'rotate-0'}`}>▶</span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${open.founded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex gap-2 pl-2">
            <input type="number" placeholder="From" className="rounded-full px-3 py-1 border border-white/20 w-1/2 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" value={filters.foundedFrom} onChange={e => setFilters(f => ({...f, foundedFrom: e.target.value}))} />
            <input type="number" placeholder="To" className="rounded-full px-3 py-1 border border-white/20 w-1/2 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" value={filters.foundedTo} onChange={e => setFilters(f => ({...f, foundedTo: e.target.value}))} />
          </div>
        </div>
      </div>
      <button type="button" className="w-full rounded-full border border-purple-500 py-2 font-semibold text-purple-200 hover:bg-purple-500/20 transition shadow focus:outline-none focus:ring-2 focus:ring-purple-500" onClick={clearAll}>
        Clear All
      </button>
    </aside>
  );
};

export default SidebarFilters; 