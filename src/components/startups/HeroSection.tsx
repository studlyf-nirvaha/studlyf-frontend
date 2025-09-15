import React from 'react';
import { BGPattern } from '@/components/ui/bg-pattern';
import { SplitText } from "@/components/ui/split-text";

const HeroSection = () => (
  <section className="relative w-full py-16 md:py-20 flex flex-col items-center justify-center text-center bg-black overflow-hidden">
    {/* BGPattern grid background with fade-edges mask */}
    <BGPattern variant="grid" mask="fade-edges" className="absolute inset-0 z-0 w-full h-full" />
    <div className="relative z-10">
      <SplitText
        text="Startup Showcase"
        className="text-4xl md:text-6xl font-bold mb-4"
        delay={50}
        animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        easing="easeOutCubic"
        threshold={0.3}
        rootMargin="-100px"
      />
      <p className="text-lg md:text-2xl max-w-2xl text-white/80">
        Discover innovative startups and find your next opportunity
      </p>
    </div>
  </section>
);

export default HeroSection; 