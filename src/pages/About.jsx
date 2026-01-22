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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] overflow-hidden" style={{ perspective: '1200px' }}>
        {/* 3D Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-64 h-64 bg-[#40916C] rounded-full blur-3xl"
            style={{ perspective: '1000px' }}
          />
        </div>
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{ rotateX: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"
            style={{ perspective: '1000px' }}
          />
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #40916C 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              style={{ perspective: '1000px' }}
            >
              <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                Building Champions
                <span className="block text-[#40916C]">Since 2014</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Auustralasia Spports Academy is a Brampton (Ontario) based sports academy 
                offering year-round coaching in cricket, yoga, and baseball in an enjoyable, 
                safe and friendly environment.
              </p>
              <p className="text-gray-400 leading-relaxed">
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
              className="flex justify-center"
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
      <section className="py-24 bg-[#0A1F0A]" style={{ perspective: '1200px' }}>
       <div className="container mx-auto px-6">
         <div className="grid md:grid-cols-2 gap-8">
           {/* Mission */}
           <motion.div
             initial={{ opacity: 0, y: 30, rotateX: -20 }}
             whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             whileHover={{ rotateX: 10, y: -15 }}
             className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl p-10 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
             style={{
               perspective: '1000px',
               transformStyle: 'preserve-3d'
             }}
           >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#0A1F0A]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
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
              className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl p-10 transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(64,145,108,0.2)]"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
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
      <section className="py-24 bg-gradient-to-b from-[#0A1F0A] to-[#0D2818]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              History & <span className="text-[#40916C]">Milestones</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#D4AF37] via-[#40916C] to-[#2D6A4F] hidden md:block" />

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                 index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ perspective: '1000px' }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ y: -10 }}
                      className={`bg-[#1A4D2E]/50 border border-[#2D6A4F]/30 rounded-2xl p-6 inline-block shadow-lg hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] transition-all ${
                        index % 2 === 0 ? 'md:ml-auto' : ''
                      }`}
                    >
                      <span className="text-[#D4AF37] font-bold text-2xl">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-white mt-2">{milestone.title}</h3>
                      <p className="text-gray-400 mt-2">{milestone.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-[#0A1F0A] z-10 hidden md:block" />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 bg-[#0A1F0A]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
              Recognition
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Awards & <span className="text-[#40916C]">Achievements</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-2xl p-8 text-center hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <award.icon className="w-8 h-8 text-[#0A1F0A]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{award.title}</h3>
                <p className="text-[#40916C] font-semibold">{award.year}</p>
                <p className="text-gray-400 text-sm mt-2">{award.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-[#1A4D2E] via-[#2D6A4F] to-[#1A4D2E]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                <stat.icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                <div className="text-4xl md:text-5xl font-bold text-white">{stat.value}</div>
                <p className="text-gray-200 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}