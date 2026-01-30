import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CircleDot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const programs = [
  {
    title: 'Cricket Training',
    description: 'Comprehensive cricket coaching covering batting, bowling, fielding, and match strategy.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop',
    features: ['Batting Techniques', 'Bowling Skills', 'Fielding Drills', 'Match Practice'],
    color: 'from-[#2D6A4F]',
  },
  {
    title: 'Yoga & Fitness',
    description: 'Enhance flexibility, strength, and mental focus through specialized sports yoga programs.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    features: ['Flexibility Training', 'Core Strength', 'Mental Focus', 'Recovery Sessions'],
    color: 'from-[#D4AF37]',
  },
  {
    title: 'Baseball Academy',
    description: 'Professional baseball training for all skill levels from beginners to advanced players.',
    image: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600&h=400&fit=crop',
    features: ['Pitching Mechanics', 'Batting Practice', 'Base Running', 'Team Strategy'],
    color: 'from-[#40916C]',
  },
];

export default function ProgramsPreview() {
  return (
    <section className="py-24 bg-[#FFF8E7] relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #D4A574 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
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
             Training Programs
           </span>
           <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#6B5A46] mt-3 sm:mt-4 mb-4 sm:mb-6">
             Path To <span className="text-[#D4A574]">Excellence</span>
           </h2>
           <p className="text-[#8B7355] max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
             Choose from our comprehensive training programs designed to develop 
             well-rounded athletes ready for competitive success.
           </p>
         </motion.div>

         {/* Programs grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{ y: -15, rotateX: 5 }}
              className="group"
              style={{ perspective: "1200px" }}
            >
              <div className="bg-white border border-[#F5E6D3] rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#D4AF37] transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20">
                {/* Image */}
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} to-transparent opacity-60`} />

                  {/* Floating badge */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-[#D4AF37] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Popular
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#6B5A46] mb-2 sm:mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-[#8B7355] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {program.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {program.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-[#6B5A46] text-sm sm:text-base">
                        <CircleDot className="w-3 sm:w-4 h-3 sm:h-4 text-[#D4A574] mr-2 sm:mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to={createPageUrl('Programs')} className="block">
                    <Button 
                      className="w-full bg-transparent border border-[#D4A574] text-[#D4A574] hover:bg-[#D4A574] hover:text-white transition-all duration-300 rounded-full py-4 sm:py-6 text-sm sm:text-base"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-3 sm:h-4 w-3 sm:w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link to={createPageUrl('Programs')} className="inline-block">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-lg rounded-full shadow-lg shadow-[#D4AF37]/30"
            >
              View All Programs
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}