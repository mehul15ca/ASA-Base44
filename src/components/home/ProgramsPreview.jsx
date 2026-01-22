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
    <section className="py-24 bg-[#0A1F0A] relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #40916C 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
            Training Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Path To <span className="text-[#40916C]">Excellence</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose from our comprehensive training programs designed to develop 
            well-rounded athletes ready for competitive success.
          </p>
        </motion.div>

        {/* Programs grid */}
        <div className="grid lg:grid-cols-3 gap-8">
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
              <div className="bg-gradient-to-b from-[#1A4D2E]/30 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#2D6A4F]/20">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${program.color} to-transparent opacity-60`} />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#0A1F0A] px-4 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-300">
                        <CircleDot className="w-4 h-4 text-[#40916C] mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to={createPageUrl('Programs')}>
                    <Button 
                      className="w-full bg-transparent border border-[#40916C] text-[#40916C] hover:bg-[#40916C] hover:text-white transition-all duration-300 rounded-full py-6"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
          className="text-center mt-12"
        >
          <Link to={createPageUrl('Programs')}>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold px-10 py-6 text-lg rounded-full shadow-lg shadow-[#D4AF37]/30"
            >
              View All Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}