import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Trophy, Award, Users, Calendar, Shield, Heart } from 'lucide-react';
import AnimatedLogo from '../components/AnimatedLogo';

const milestones = [
  { year: '2014', title: 'Academy Founded', description: 'Started with just 10 students in Brampton' },
  { year: '2016', title: 'First Provincial Champions', description: 'Our juniors won the Ontario Cricket Championship' },
  { year: '2018', title: 'Facility Expansion', description: 'Opened new indoor training facility' },
  { year: '2020', title: 'Yoga Program Launch', description: 'Introduced comprehensive sports yoga' },
  { year: '2022', title: 'Baseball Academy', description: 'Expanded to include baseball training' },
  { year: '2024', title: '500+ Athletes', description: 'Reached milestone of training 500+ athletes' },
];

const awards = [
  { icon: Trophy, title: 'Best Cricket Academy', year: '2023', org: 'Ontario Cricket Association' },
  { icon: Award, title: 'Excellence in Coaching', year: '2022', org: 'Sports Canada' },
  { icon: Shield, title: 'Youth Development Award', year: '2021', org: 'Brampton Sports Council' },
  { icon: Heart, title: 'Community Impact Award', year: '2020', org: 'City of Brampton' },
];

export default function About() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] overflow-hidden" style={{ perspective: '1200px' }}>
        {/* 3D Background Elements - Hidden on mobile */}
        <div className="absolute inset-0 opacity-5 hidden md:block">
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-64 h-64 bg-[#40916C] rounded-full blur-3xl"
            style={{ perspective: '1000px' }}
          />
        </div>
        <div className="absolute inset-0 opacity-5 hidden md:block">
          <motion.div
            animate={{ rotateX: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"
            style={{ perspective: '1000px' }}
          />
        </div>

        <div className="absolute inset-0 opacity-10 hidden md:block">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #40916C 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              style={{ perspective: '1000px' }}
            >
              <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-xs md:text-sm">
                About Us
              </span>
              <h1 className="text-2xl md:text-5xl font-bold text-white mt-3 md:mt-4 mb-4 md:mb-6">
                Building Champions
                <span className="block text-[#40916C]">Since 2014</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
                Auustralasia Spports Academy is a Brampton (Ontario) based sports academy 
                offering year-round coaching in cricket, yoga, and baseball in an enjoyable, 
                safe and friendly environment.
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Our aim is to help athletes of any age, ability or gender to reach their 
                potential, play with confidence and enjoy their sport. We develop players 
                through education, technique correction, participation, and enjoyment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: 15, rotateZ: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, rotateZ: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ rotateY: 5, rotateZ: -5 }}
              className="flex justify-center hidden md:flex"
              style={{
                perspective: '1000px',
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))'
              }}
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <AnimatedLogo size="xl" className="w-64 h-64" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-24 bg-[#0A1F0A]" style={{ perspective: '1200px' }}>
       <div className="container mx-auto px-4 md:px-6">
         <div className="grid md:grid-cols-2 gap-6 md:gap-8">
           {/* Mission */}
           <motion.div
             initial={{ opacity: 0, y: 30, rotateX: -20 }}
             whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             whileHover={{ rotateX: 10, y: -15 }}
             className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-2xl md:rounded-3xl p-6 md:p-10 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
             style={{
               perspective: '1000px',
               transformStyle: 'preserve-3d'
             }}
           >
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <Target className="w-6 md:w-8 h-6 md:h-8 text-[#0A1F0A]" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">Our Mission</h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                To provide world-class sports training that develops not just athletic skills, 
                but also character, discipline, and leadership qualities in every athlete who 
                walks through our doors. We believe in nurturing the complete athlete - 
                physically, mentally, and emotionally.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ rotateX: 10, y: -15 }}
              className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-2xl md:rounded-3xl p-6 md:p-10 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(64,145,108,0.2)]"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <Eye className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">Our Vision</h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                To become Canada's premier multi-sport academy, recognized for producing 
                national and international level athletes while fostering a love for sports 
                in communities across the nation. We envision a future where every aspiring 
                athlete has access to quality coaching and facilities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-[#0A1F0A] to-[#0D2818]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-xs md:text-sm">
              Our Journey
            </span>
            <h2 className="text-2xl md:text-5xl font-bold text-white mt-3 md:mt-4">
              History & <span className="text-[#40916C]">Milestones</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#D4AF37] via-[#40916C] to-[#2D6A4F] hidden md:block" />

            {/* Timeline items */}
            <div className="space-y-6 md:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                 index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ perspective: '1000px' }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      className={`bg-[#1A4D2E]/50 border border-[#2D6A4F]/30 rounded-xl md:rounded-2xl p-4 md:p-6 inline-block shadow-lg hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] transition-all ${
                        index % 2 === 0 ? 'md:ml-auto' : ''
                      }`}
                    >
                      <span className="text-[#D4AF37] font-bold text-lg md:text-2xl">{milestone.year}</span>
                      <h3 className="text-base md:text-xl font-bold text-white mt-1 md:mt-2">{milestone.title}</h3>
                      <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">{milestone.description}</p>
                    </motion.div>
                  </div>

                  
                  {/* Center dot */}
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#D4AF37] rounded-full border-4 border-[#0A1F0A] z-10 hidden md:block" />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-12 md:py-24 bg-[#0A1F0A]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-xs md:text-sm">
              Recognition
            </span>
            <h2 className="text-2xl md:text-5xl font-bold text-white mt-3 md:mt-4">
              Awards & <span className="text-[#40916C]">Achievements</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15, rotateY: 10, rotateX: 5 }}
                className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-xl md:rounded-2xl p-5 md:p-8 text-center hover:border-[#D4AF37]/50 transition-all shadow-xl hover:shadow-[0_20px_60px_rgba(212,175,55,0.3)]"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <award.icon className="w-6 md:w-8 h-6 md:h-8 text-[#0A1F0A]" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-white mb-2">{award.title}</h3>
                <p className="text-[#40916C] font-semibold text-xs md:text-sm">{award.year}</p>
                <p className="text-gray-400 text-xs md:text-sm mt-2">{award.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-[#1A4D2E] via-[#2D6A4F] to-[#1A4D2E]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Users, value: '500+', label: 'Athletes Trained' },
              { icon: Trophy, value: '50+', label: 'Championships Won' },
              { icon: Calendar, value: '10+', label: 'Years Experience' },
              { icon: Award, value: '15+', label: 'Certified Coaches' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-6 md:w-8 h-6 md:h-8 text-[#D4AF37] mx-auto mb-2 md:mb-3" />
                <div className="text-2xl md:text-5xl font-bold text-white">{stat.value}</div>
                <p className="text-gray-200 text-xs md:text-base mt-1 md:mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}