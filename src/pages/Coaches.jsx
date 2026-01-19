import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Users, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CoachCard from '../components/coaches/CoachCard';

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
    athletesTrained: 120,
    championships: 8,
    videoUrl: 'https://example.com/rajesh-intro',
    philosophy: 'Cricket is as much a mental game as it is physical. I believe in building confidence through consistent practice and positive reinforcement. My coaching philosophy centers on understanding each player\'s unique strengths and developing a personalized training plan that maximizes their potential while fostering a love for the game. Discipline, dedication, and self-belief are the cornerstones of success.',
    notablePlayers: [
      { name: 'Arjun Patel', achievement: 'Ontario U-19 Captain', year: '2023' },
      { name: 'Marcus Chen', achievement: 'Provincial Team Batsman', year: '2022' },
      { name: 'Samira Khan', achievement: 'Canada U-17 Squad', year: '2024' },
      { name: 'David Thompson', achievement: 'Toronto Premier League MVP', year: '2021' },
    ],
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
    athletesTrained: 200,
    championships: 5,
    videoUrl: 'https://example.com/sarah-intro',
    philosophy: 'Yoga is the bridge between body and mind. In sports, peak performance comes from the perfect harmony of physical capability and mental clarity. I integrate traditional yoga principles with modern sports science to create customized programs that prevent injuries, accelerate recovery, and enhance overall athletic performance. Every athlete\'s journey is unique, and yoga provides the tools to unlock their full potential.',
    notablePlayers: [
      { name: 'Emma Rodriguez', achievement: 'Olympic Gymnast - Injury Recovery', year: '2023' },
      { name: 'James Mitchell', achievement: 'Professional Soccer Player', year: '2022' },
      { name: 'Priya Sharma', achievement: 'National Swimming Team', year: '2024' },
      { name: 'Alex Wong', achievement: 'MMA Fighter - Flexibility Specialist', year: '2023' },
    ],
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
    athletesTrained: 95,
    championships: 6,
    videoUrl: 'https://example.com/michael-intro',
    philosophy: 'Baseball is a game of precision, timing, and strategy. My approach combines biomechanical analysis with traditional skill development to help players understand not just how to perform, but why. I emphasize the importance of mental toughness and situational awareness. Whether you\'re learning to pitch or perfecting your swing, every repetition should have purpose and intent.',
    notablePlayers: [
      { name: 'Tyler Johnson', achievement: 'College Baseball Scholarship (UCLA)', year: '2023' },
      { name: 'Kevin Park', achievement: 'Ontario AAA All-Star Pitcher', year: '2024' },
      { name: 'Sofia Martinez', achievement: 'Women\'s National Team Prospect', year: '2022' },
      { name: 'Brandon Lee', achievement: 'Junior League Home Run Leader', year: '2023' },
    ],
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
    athletesTrained: 75,
    championships: 4,
    videoUrl: 'https://example.com/priya-intro',
    philosophy: 'Spin bowling is an art form that requires patience, precision, and creativity. Through detailed video analysis and biomechanical assessment, I help bowlers understand the physics behind spin and develop variations that suit their natural action. Technology is a tool, but the human element - reading batsmen, adapting to conditions - is what separates good bowlers from great ones.',
    notablePlayers: [
      { name: 'Ravi Sharma', achievement: 'U-19 Provincial Spin Bowler', year: '2024' },
      { name: 'Melissa Zhang', achievement: 'Women\'s League Leading Wicket-Taker', year: '2023' },
      { name: 'Ahmed Hassan', achievement: 'Toronto League Best Bowler', year: '2022' },
    ],
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
    athletesTrained: 110,
    championships: 7,
    videoUrl: 'https://example.com/david-intro',
    philosophy: 'Matches are won in the field. Great fielding creates pressure, saves runs, and changes momentum. My training philosophy focuses on explosive athleticism, sharp reflexes, and intelligent positioning. Every player, regardless of their primary skill, should be a dynamic fielder. Through progressive drills and game-situation training, I transform ordinary fielders into match-winners.',
    notablePlayers: [
      { name: 'Jason Smith', achievement: 'Best Fielder Award - Provincial U-17', year: '2023' },
      { name: 'Nina Patel', achievement: 'Wicket-Keeper Ontario Team', year: '2024' },
      { name: 'Chris Anderson', achievement: 'Outstanding Fielding Award', year: '2022' },
    ],
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
    athletesTrained: 150,
    championships: 3,
    videoUrl: 'https://example.com/amanda-intro',
    philosophy: 'Young athletes learn best when they\'re having fun. My approach centers on creating a positive, encouraging environment where children can explore, experiment, and develop a genuine love for sport. Through age-appropriate games and activities, I teach fundamental skills while building confidence, teamwork, and sportsmanship. Every child deserves the opportunity to discover their potential in a nurturing setting.',
    notablePlayers: [
      { name: 'Lily Thompson', achievement: 'Advanced to Provincial Development Program', year: '2024' },
      { name: 'Ethan Kumar', achievement: 'Youth Player of the Year', year: '2023' },
      { name: 'Sophie Chen', achievement: 'Youngest Team Captain (Age 10)', year: '2024' },
    ],
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
              <CoachCard key={index} coach={coach} index={index} />
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