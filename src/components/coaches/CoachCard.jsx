import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Users, ChevronDown, ChevronUp, Calendar, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CoachCard({ coach, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-gradient-to-b from-[#1A4D2E]/30 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500">
        {/* Header with Image */}
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

          {/* Video Play Button */}
          {coach.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-16 h-16 bg-[#D4AF37]/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-[#0A1F0A] ml-1" />
              </button>
            </div>
          )}

          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-3">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-white text-sm">{coach.athletesTrained}+ Athletes</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <Trophy className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-white text-sm">{coach.championships} Titles</span>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
            {coach.name}
          </h3>
          <p className="text-[#40916C] font-medium">{coach.role}</p>
          <p className="text-gray-400 text-sm mt-1">{coach.specialization}</p>

          {/* Bio */}
          <p className="text-gray-400 text-sm mt-4 line-clamp-2">
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

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-6 flex items-center justify-center gap-2 text-[#40916C] hover:text-[#D4AF37] transition-colors py-3 border-t border-[#2D6A4F]/30"
          >
            <span className="font-medium">{isExpanded ? 'Show Less' : 'View Full Profile'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-[#2D6A4F]/30"
            >
              <div className="p-6 space-y-6">
                {/* Training Philosophy */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#D4AF37]" />
                    Training Philosophy
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {coach.philosophy}
                  </p>
                </div>

                {/* Notable Players */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#D4AF37]" />
                    Notable Athletes Trained
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {coach.notablePlayers.map((player, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-[#0A1F0A] rounded-lg border border-[#2D6A4F]/30"
                      >
                        <div>
                          <p className="text-white font-medium">{player.name}</p>
                          <p className="text-gray-400 text-sm">{player.achievement}</p>
                        </div>
                        {player.year && (
                          <span className="text-[#D4AF37] text-sm font-semibold">
                            {player.year}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                  {coach.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Star className="w-3 h-3 text-[#D4AF37]" />
                      {achievement}
                    </div>
                  ))}
                </div>

                {/* Book Session CTA */}
                <div className="pt-4 flex gap-3">
                  <Link 
                    to={`${createPageUrl('Registration')}?coach=${encodeURIComponent(coach.name)}`}
                    className="flex-1"
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] rounded-full"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book a Session with {coach.name.split(' ')[0]}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}