import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CircleDot, 
  ArrowRight, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle2,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ProgramFinder from '../components/programs/ProgramFinder';

const programs = [
  {
    id: 'cricket',
    title: 'Cricket Training',
    subtitle: 'Complete Cricket Development Program',
    description: 'Comprehensive cricket coaching covering all aspects of the game - batting, bowling, fielding, and match strategy. Our experienced coaches work with players of all ages and skill levels.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=500&fit=crop',
    color: 'from-[#2D6A4F]',
    duration: '46 weeks/year',
    groupSize: '8-12 players',
    schedule: 'Tue, Thu, Sat',
    price: 'From $199/month',
    features: [
      'Batting technique & footwork',
      'Bowling mechanics & variations',
      'Fielding drills & positioning',
      'Match strategy & game awareness',
      'Fitness & conditioning',
      'Video analysis sessions',
      'Net practice sessions',
      'Match simulation',
    ],
    levels: ['Beginners', 'Intermediate', 'Advanced', 'Elite'],
  },
  {
    id: 'yoga',
    title: 'Sports Yoga & Fitness',
    subtitle: 'Athletic Performance Enhancement',
    description: 'Specialized yoga and fitness programs designed specifically for athletes. Improve flexibility, core strength, mental focus, and recovery for peak performance.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
    color: 'from-[#D4AF37]',
    duration: 'Year-round',
    groupSize: '10-15 athletes',
    schedule: 'Mon, Wed, Fri',
    price: 'From $149/month',
    features: [
      'Athletic flexibility training',
      'Core strength development',
      'Mental focus & meditation',
      'Injury prevention techniques',
      'Recovery & rejuvenation',
      'Breathing exercises',
      'Balance & coordination',
      'Stress management',
    ],
    levels: ['All Levels Welcome'],
  },
  {
    id: 'baseball',
    title: 'Baseball Academy',
    subtitle: 'Professional Baseball Training',
    description: 'Complete baseball training program covering pitching, hitting, fielding, and base running. Develop skills needed to excel at competitive levels.',
    image: 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800&h=500&fit=crop',
    color: 'from-[#40916C]',
    duration: '40 weeks/year',
    groupSize: '8-10 players',
    schedule: 'Wed, Fri, Sun',
    price: 'From $179/month',
    features: [
      'Pitching mechanics & speed',
      'Batting stance & swing',
      'Fielding fundamentals',
      'Base running strategy',
      'Catching techniques',
      'Team play & positioning',
      'Strength training',
      'Game simulations',
    ],
    levels: ['Youth', 'Junior', 'Senior'],
  },
  {
    id: 'stem',
    title: 'STEM Program',
    subtitle: 'Science, Technology, Engineering & Math',
    description: 'Innovative STEM education combining hands-on learning with sports science. Explore the intersection of technology, engineering, and athletics while developing critical thinking skills.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
    color: 'from-[#1A4D2E]',
    duration: '40 weeks/year',
    groupSize: '6-10 students',
    schedule: 'Mon, Wed, Sat',
    price: 'From $189/month',
    features: [
      'Sports biomechanics & physics',
      'Data analysis & statistics',
      'Technology in athletics',
      'Equipment engineering',
      'Nutrition science',
      'Video analysis technology',
      'Performance tracking systems',
      'Robotics & automation',
    ],
    levels: ['Ages 8-12', 'Ages 13-16', 'Ages 17+'],
  },
];

const specialPrograms = [
  {
    title: 'Summer Camp 2025',
    description: 'Intensive summer training program for aspiring athletes',
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1529119368496-2dfda6ec2571?w=400&h=250&fit=crop',
  },
  {
    title: 'Winter Training',
    description: 'Indoor training programs during winter months',
    duration: 'Nov - Mar',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop',
  },
  {
    title: 'One-on-One Coaching',
    description: 'Personalized training sessions with expert coaches',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=250&fit=crop',
  },
];

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState('cricket');
  const currentProgram = programs.find(p => p.id === selectedProgram);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#D4AF37] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
              Training Programs
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
              Choose Your Path To
              <span className="block text-[#40916C]">Excellence</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our comprehensive training programs designed to develop 
              well-rounded athletes ready for competitive success at any level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Tabs */}
      <section className="py-16 bg-[#0A1F0A]">
        <div className="container mx-auto px-6">
          {/* Tab selector */}
          <div className="flex justify-center mb-12">
            <Tabs value={selectedProgram} onValueChange={setSelectedProgram}>
              <TabsList className="bg-[#1A4D2E]/50 p-1 rounded-full">
                {programs.map((program) => (
                  <TabsTrigger
                    key={program.id}
                    value={program.id}
                    className="px-6 py-3 rounded-full data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A] text-gray-300"
                  >
                    {program.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Program Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProgram.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden h-[400px] lg:h-[500px]">
                <img
                  src={currentProgram.image}
                  alt={currentProgram.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${currentProgram.color} to-transparent opacity-40`} />
                
                {/* Floating info cards */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-4 flex-wrap">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-white text-sm">{currentProgram.duration}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-white text-sm">{currentProgram.groupSize}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-white text-sm">{currentProgram.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-[#D4AF37] font-semibold">{currentProgram.subtitle}</span>
                <h2 className="text-4xl font-bold text-white mt-2 mb-4">{currentProgram.title}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">{currentProgram.description}</p>

                {/* Levels */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProgram.levels.map((level, index) => (
                    <span
                      key={index}
                      className="px-4 py-1 bg-[#1A4D2E] text-[#40916C] rounded-full text-sm"
                    >
                      {level}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {currentProgram.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#40916C] flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Starting at</p>
                    <p className="text-2xl font-bold text-[#D4AF37]">{currentProgram.price}</p>
                  </div>
                  <Link to={createPageUrl('Registration')}>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold px-8 rounded-full"
                    >
                      Enroll Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Program Finder */}
      <section className="py-24 bg-[#0A1F0A]">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
              Not Sure Which Program?
            </span>
            <h2 className="text-4xl font-bold text-white mt-4">
              Let Us <span className="text-[#40916C]">Help You Choose</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ProgramFinder />
          </motion.div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-24 bg-gradient-to-b from-[#0A1F0A] to-[#0D2818]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
              Seasonal Offerings
            </span>
            <h2 className="text-4xl font-bold text-white mt-4">
              Special <span className="text-[#40916C]">Programs</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-[#1A4D2E]/30 border border-[#2D6A4F]/30 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#0A1F0A] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {program.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                    <p className="text-gray-400">{program.description}</p>
                    <Link to={createPageUrl('Registration')}>
                      <Button 
                        variant="link" 
                        className="text-[#40916C] p-0 mt-4 hover:text-[#D4AF37]"
                      >
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}