import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Users, Star, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";

const coaches = [
  {
    name: 'Rajesh Kumar',
    role: 'Head Cricket Coach',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    experience: '15+ years',
    specialization: 'Batting & Leadership',
    certifications: ['Level 3 Cricket Coach', 'Sports Psychology'],
    bio: 'Former first-class cricketer with extensive coaching experience. Has trained multiple players who went on to represent at provincial and national levels.',
    achievements: ['Ontario Cricket Champion Coach 2022', 'Trained 50+ representative players'],
  },
  {
    name: 'Sarah Thompson',
    role: 'Yoga & Fitness Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    experience: '12+ years',
    specialization: 'Sports Yoga & Rehabilitation',
    certifications: ['RYT-500', 'Sports Rehabilitation Specialist'],
    bio: 'Internationally certified yoga instructor specializing in athletic performance enhancement. Works with professional athletes across multiple sports.',
    achievements: ['Certified by Yoga Alliance International', 'Featured in Sports Canada Magazine'],
  },
  {
    name: 'Michael Chen',
    role: 'Baseball Head Coach',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    experience: '10+ years',
    specialization: 'Pitching & Strategy',
    certifications: ['Baseball Canada Level 3', 'Strength & Conditioning'],
    bio: 'Former semi-professional baseball player with a passion for developing young talent. Brings modern training techniques combined with traditional fundamentals.',
    achievements: ['Provincial Championship Winner 2021', 'Youth Development Award 2020'],
  },
  {
    name: 'Priya Patel',
    role: 'Bowling Coach',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    experience: '8+ years',
    specialization: 'Spin Bowling & Analysis',
    certifications: ['Level 2 Cricket Coach', 'Video Analysis Expert'],
    bio: 'Expert in spin bowling techniques with a background in performance analysis. Uses technology to help bowlers understand and improve their game.',
    achievements: ['Produced 5 provincial level spin bowlers', 'Performance Analysis Certification'],
  },
  {
    name: 'David Williams',
    role: 'Fielding Specialist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    experience: '10+ years',
    specialization: 'Fielding & Athleticism',
    certifications: ['Level 2 Cricket Coach', 'Athletic Training'],
    bio: 'Dynamic coach known for innovative fielding drills and agility training. Emphasizes the importance of fielding in modern cricket.',
    achievements: ['Best Fielding Coach Award 2023', 'Athletic Excellence Award'],
  },
  {
    name: 'Amanda Roberts',
    role: 'Junior Development Coach',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    experience: '6+ years',
    specialization: 'Youth Development',
    certifications: ['Level 1 Cricket Coach', 'Child Psychology'],
    bio: 'Passionate about introducing young children to sports. Creates fun, engaging training environments that build foundational skills and love for the game.',
    achievements: ['Youth Coach of the Year 2022', 'Developed junior program curriculum'],
  },
];

export default function Coaches() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #40916C 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
              Expert Team
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Meet Our
              <span className="block text-[#40916C]">World-Class Coaches</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our certified coaches bring decades of combined experience and 
              a passion for developing athletes at every level.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { icon: Award, value: '60+', label: 'Years Combined Experience' },
              { icon: Users, value: '500+', label: 'Athletes Coached' },
              { icon: Trophy, value: '25+', label: 'Championships Won' },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4">
                <stat.icon className="w-8 h-8 text-[#D4AF37]" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="py-24 bg-[#0A1F0A]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-b from-[#1A4D2E]/30 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={coach.image}
                      alt={coach.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F0A] via-transparent to-transparent" />
                    
                    {/* Experience badge */}
                    <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#0A1F0A] px-3 py-1 rounded-full text-sm font-semibold">
                      {coach.experience}
                    </div>

                    {/* Social links */}
                    <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {[Linkedin, Twitter, Mail].map((Icon, i) => (
                        <button
                          key={i}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0A1F0A] transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-[#40916C] font-medium">{coach.role}</p>
                    <p className="text-gray-400 text-sm mt-1">{coach.specialization}</p>

                    {/* Bio */}
                    <p className="text-gray-400 text-sm mt-4 line-clamp-3">
                      {coach.bio}
                    </p>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {coach.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#1A4D2E] text-[#40916C] rounded-full text-xs"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div className="mt-4 pt-4 border-t border-[#2D6A4F]/30">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Key Achievements</p>
                      {coach.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <Star className="w-3 h-3 text-[#D4AF37]" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1A4D2E] via-[#2D6A4F] to-[#1A4D2E]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Train with the Best?
            </h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Join our academy and learn from experienced coaches who are dedicated 
              to helping you achieve your athletic potential.
            </p>
            <Button 
              size="lg"
              className="bg-[#D4AF37] text-[#0A1F0A] hover:bg-[#F4D03F] font-semibold px-8 rounded-full"
            >
              Start Your Journey Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}