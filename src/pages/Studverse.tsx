import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Studverse: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent drop-shadow-lg uppercase">Studverse</h1>
        <p className="text-2xl sm:text-3xl font-bold text-center mb-4">Coming Soon</p>
        <p className="text-lg sm:text-xl text-white/80 text-center max-w-xl">We’re building something amazing for students. Stay tuned for the launch of Studverse – your next-gen student universe!</p>
      </main>
      <Footer />
    </div>
  );
};

export default Studverse; 