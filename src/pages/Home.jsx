import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WhatToExpect from '../components/home/WhatToExpect';
import ProgramsPreview from '../components/home/ProgramsPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import ScrollingBackground3D from '../components/home/ScrollingBackground3D';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ScrollingBackground3D />
      <div className="relative z-10">
        <HeroSection />
        <WhatToExpect />
        <ProgramsPreview />
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
}