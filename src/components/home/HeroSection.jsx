import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AnimatedLogo from '../AnimatedLogo';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import HeroBats3D from './HeroBats3D';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E]">
      {/* 3D Bats Animation */}
      <HeroBats3D />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F0A]/80 via-transparent to-[#0A1F0A]/40" />
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0, 0.08, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12">
        <div className="flex flex-col items-center text-center">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 60, 
              damping: 10,
              delay: 0.3 
            }}
            className="mb-8"
          >
            <AnimatedLogo size="xl" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Welcome To{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
              Auustralasia
            </span>
            <br />
            <span className="text-[#40916C]">Spports Academy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
          >
            Empowering athletes of all ages to reach their full potential through 
            world-class coaching in Cricket, Yoga, and Baseball.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to={createPageUrl('Registration')}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-105"
              >
                Join Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Programs')}>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                View Programs
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {[
              { value: '500+', label: 'Athletes Trained' },
              { value: '15+', label: 'Expert Coaches' },
              { value: '46', label: 'Weeks/Year' },
              { value: '10+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#40916C]/50 flex justify-center pt-2">
          <div className="w-1 h-3 bg-[#40916C] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}