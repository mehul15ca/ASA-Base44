import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Trophy, 
  Brain, 
  Heart, 
  Sparkles, 
  Target 
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Low Player-to-Coach Ratio',
    description: 'Ultimate player development with maximum coach contact time and personalized attention.'
  },
  {
    icon: Trophy,
    title: 'Proven Track Record',
    description: 'Numerous players progressing onto representative honors and professional careers.'
  },
  {
    icon: Brain,
    title: 'Mental & Physical Training',
    description: 'In-depth approach to mental preparation alongside physical conditioning for peak performance.'
  },
  {
    icon: Heart,
    title: 'Pressure Management',
    description: 'Expert guidance on handling pressure, disappointment, and success in sports.'
  },
  {
    icon: Sparkles,
    title: 'Perfect Learning Environment',
    description: 'Excellent coach-player rapport creating an inspiring and supportive atmosphere.'
  },
  {
    icon: Target,
    title: 'Ability-Based Groups',
    description: 'Players split by ability, not just age, ensuring everyone reaches their full potential.'
  },
];

export default function WhatToExpect() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0D2818] to-[#0A1F0A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#40916C] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
         {/* Section header */}
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-12 sm:mb-16"
         >
           <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-xs sm:text-sm">
             Our Promise
           </span>
           <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
             What To <span className="text-[#40916C]">Expect</span>
           </h2>
           <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
             At Australasia Sports Academy, we're committed to providing an exceptional 
             training experience that goes beyond just skill development.
           </p>
         </motion.div>

         {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
           {features.map((feature, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 40, rotateY: -20 }}
               whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
               whileHover={{ y: -12, scale: 1.04 }}
               className="group"
               style={{ perspective: "1000px" }}
             >
              <div className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 backdrop-blur-sm border border-[#2D6A4F]/30 rounded-xl sm:rounded-2xl p-5 sm:p-8 h-full transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#D4AF37]/10">
                {/* Icon */}
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-[#2D6A4F] to-[#1A4D2E] rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:from-[#D4AF37] group-hover:to-[#D4AF37]/80 transition-all duration-300">
                  <feature.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="mt-4 sm:mt-6 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#40916C] to-transparent rounded-full group-hover:w-full group-hover:from-[#D4AF37] transition-all duration-500" />
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}