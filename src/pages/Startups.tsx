import React, { useState, useMemo } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/startups/HeroSection';
import SidebarFilters from '../components/startups/SidebarFilters';
import StartupSummary from '../components/startups/StartupSummary';
import FeaturedStartups from '../components/startups/FeaturedStartups';

import AllStartups from '../components/startups/AllStartups';
import CreateStartupModal from '../components/CreateStartupModal';
import StartupDetailsModal from '../components/startups/StartupDetailsModal';

const initialStartups = [
  {
    id: 2,
    name: 'Nirvaha',
    domain: 'Healthcare',
    stage: 'MVP',
    foundedYear: 2024,
    teamSize: 20,
    location: 'Hyderabad, India',
    description: 'Nirvaha is an AI-powered emotional healing and personal wellness ecosystem designed to help individuals reconnect with their inner selves through ancient wisdom, creative expression, and community-led healing.',
    founder: { name: 'Sai Eshwar', role: 'CEO & Founder', avatar: '/stage1.png' },
    openRoles: ['Mobile Developer', 'Growth Marketing', 'Business Intern'],
    views: 200,
    applications: 15,
    trending: true
  },
  {
    id: 3,
    name: 'Risk Guard Enterprise Solutions',
    domain: 'FinTech',
    stage: 'Funded',
    foundedYear: 2022,
    teamSize: 8,
    location: 'Hyderabad, India',
    description: 'We are Risk Guard Enterprise Solutions, an upcoming risk management consultancy based in Hyderabad. Our business focuses on providing specialized risk management services to small business owners, entrepreneurs, and local businesses in the area.',
    founder: { name: 'Prasad Anumula', role: 'CEO & Founder', avatar: '/prasad anumula.png' },
    openRoles: ['Operations Manager', 'UI/UX Designer'],
    views: 296,
    applications: 2,
    trending: true
  },
  {
    id: 4,
    name: 'ZerotoOne Studios',
    domain: 'Startup Agency',
    stage: 'MVP',
    foundedYear: 2025,
    teamSize: 8,
    location: 'Hyderabad, India',
    description: 'We help ambitious founders turn ideas into reality with AI-powered insights and expert execution.',
    founder: { name: 'D.Yeswanth ', role: 'CEO', avatar: '/yeswanth.png' },
    openRoles: ['Operations Manager', 'UI/UX Designer', 'Front end developer', 'backend developer'],
    views: 315,
    applications: 2,
    trending: true
  }
];

const getStats = (startups) => {
  return {
    total: startups.length,
    featured: startups.filter(s => s.trending).length,
    openRoles: startups.reduce((acc, s) => acc + (s.openRoles?.length || 0), 0),
    teamMembers: startups.reduce((acc, s) => acc + (s.teamSize || 0), 0)
  };
};

const Startups = () => {
  const [startups, setStartups] = useState(initialStartups);
  const [filters, setFilters] = useState({
    search: '',
    domains: [],
    stages: [],
    teamSizes: [],
    collabTypes: [],
    locations: [],
    foundedFrom: '',
    foundedTo: ''
  });
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState({ open: false, startup: null });

  // Filtering logic
  const filteredStartups = useMemo(() => {
    return startups.filter(s => {
      // Search
      const searchMatch =
        filters.search === '' ||
        s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        (s.domain && s.domain.toLowerCase().includes(filters.search.toLowerCase()));
      // Domain
      const domainMatch = filters.domains.length === 0 || filters.domains.includes(s.domain);
      // Stage
      const stageMatch = filters.stages.length === 0 || filters.stages.includes(s.stage);
      // Team Size
      const sizeMatch = filters.teamSizes.length === 0 || filters.teamSizes.some(size => {
        if (size === '1–5 members') return s.teamSize >= 1 && s.teamSize <= 5;
        if (size === '6–10 members') return s.teamSize >= 6 && s.teamSize <= 10;
        if (size === '11–20 members') return s.teamSize >= 11 && s.teamSize <= 20;
        if (size === '20+ members') return s.teamSize > 20;
        return false;
      });
      // Collaboration Type (not implemented in mock data)
      const collabMatch = true;
      // Location
      const locationMatch = filters.locations.length === 0 || filters.locations.includes(s.location);
      // Founded Year
      const foundedFromMatch = !filters.foundedFrom || s.foundedYear >= Number(filters.foundedFrom);
      const foundedToMatch = !filters.foundedTo || s.foundedYear <= Number(filters.foundedTo);
      return searchMatch && domainMatch && stageMatch && sizeMatch && collabMatch && locationMatch && foundedFromMatch && foundedToMatch;
    });
  }, [startups, filters]);

  // Sorting
  const sortedStartups = useMemo(() => {
    let arr = [...filteredStartups];
    if (sort === 'newest') arr.sort((a, b) => b.foundedYear - a.foundedYear);
    if (sort === 'popular') arr.sort((a, b) => b.views - a.views);
    return arr;
  }, [filteredStartups, sort]);

  // Featured
  const featuredStartups = sortedStartups.filter(s => s.trending);

  // Stats
  const stats = useMemo(() => getStats(filteredStartups), [filteredStartups]);

  const clearAll = () => setFilters({
    search: '',
    domains: [],
    stages: [],
    teamSizes: [],
    collabTypes: [],
    locations: [],
    foundedFrom: '',
    foundedTo: ''
  });

  // Handle create startup
  const handleCreateStartup = (formData) => {
    setStartups(prev => [
      {
        ...formData,
        id: prev.length + 1,
        founder: { name: formData.teamMembers?.[0]?.name || 'Unknown', role: formData.teamMembers?.[0]?.role || '', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg' },
        openRoles: formData.opportunities || [],
        views: 0,
        applications: 0,
        trending: false
      },
      ...prev
    ]);
    setShowModal(false);
  };

  return (
    <>
      <Helmet>
        <title>Startups | StudLyF – Entrepreneurial Ideas</title>
        <meta name="description" content="Explore innovative startups, entrepreneurial ideas, and opportunities. StudLyF supports student founders and startup enthusiasts." />
      </Helmet>
      {/* Contextual internal links for SEO */}
      <div className="seo-links" style={{ display: 'none' }}>
        <a href="/finance">Finance</a>
        <a href="/events">Events</a>
        <a href="/network">Network</a>
        <a href="/project-hunt">Project Hunt</a>
      </div>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <HeroSection />
        <div className="relative max-w-[90rem] mx-auto px-2 md:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-10 items-start">
            <aside className="sticky top-24 self-start z-10 w-full">
              <SidebarFilters filters={filters} setFilters={setFilters} clearAll={clearAll} />
            </aside>
            <main className="flex-1 flex flex-col gap-8 max-w-full">
              <StartupSummary stats={stats} onCreate={() => setShowModal(true)} />
              <div className="w-full">
                <AllStartups
                  startups={sortedStartups}
                  sort={sort}
                  setSort={setSort}
                  view={view}
                  setView={setView}
                  onViewDetails={startup => setDetailsModal({ open: true, startup })}
                  onApply={() => {
                    // TODO: Replace the link below with your actual Google Form link
                    window.open('https://docs.google.com/forms/d/e/1FAIpQLScKe9jhLQYgArPbL7SUNELi1hxXXl6aQgDXpive-J80cjESsQ/viewform', '_blank');
                  }}
                />
              </div>
            </main>
          </div>
          {showModal && <CreateStartupModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreateStartup} />}
          <StartupDetailsModal
            isOpen={detailsModal.open}
            onClose={() => setDetailsModal({ open: false, startup: null })}
            startup={detailsModal.startup}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Startups;
