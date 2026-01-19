import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: 'Michael Thompson',
    role: 'Parent',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'The coaching at Australasia Sports Academy has transformed my son\'s cricket game. His confidence and technique have improved dramatically.',
    rating: 5
  },
  {
    name: 'Sarah Williams',
    role: 'Adult Trainee',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: 'The yoga program has been incredible for my flexibility and mental focus. The coaches are professional and genuinely care about progress.',
    rating: 5
  },
  {
    name: 'David Chen',
    role: 'Junior Cricketer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    quote: 'I\'ve learned so much in just a few months. The facilities are amazing and the coaches make training fun while pushing us to excel.',
    rating: 5
  },
  {
    name: 'Priya Patel',
    role: 'Parent',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'Best sports academy in Brampton! My daughter loves coming here and has made great friends while improving her skills.',
    rating: 5
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#40916C]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#40916C]/30 to-transparent" />

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
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            What Our <span className="text-[#40916C]">Athletes Say</span>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#1A4D2E]/40 to-[#0D2818]/60 backdrop-blur-sm border border-[#2D6A4F]/30 rounded-3xl p-8 md:p-12"
              >
                {/* Quote icon */}
                <Quote className="w-12 h-12 text-[#D4AF37]/30 mb-6" />

                {/* Quote text */}
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-[#40916C]">{testimonials[currentIndex].role}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-[#40916C] text-[#40916C] hover:bg-[#40916C] hover:text-white rounded-full w-12 h-12"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-8 bg-[#D4AF37]' 
                        : 'bg-[#40916C]/50 hover:bg-[#40916C]'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-[#40916C] text-[#40916C] hover:bg-[#40916C] hover:text-white rounded-full w-12 h-12"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}