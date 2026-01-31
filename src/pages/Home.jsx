import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WhatToExpect from '../components/home/WhatToExpect';
import ProgramsPreview from '../components/home/ProgramsPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <WhatToExpect />
      <ProgramsPreview />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}