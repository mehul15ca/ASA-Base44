import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#1A4D2E]/60 via-[#2D6A4F]/60 to-[#1A4D2E]/60 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) =>
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }} />

        )}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready To Start Your
              <span className="block text-[#D4AF37]">Athletic Journey?</span>
            </h2>
            <p className="text-lg text-gray-200/80 mb-8">
              Join hundreds of athletes who have transformed their game at 
              Australasia Sports Academy. Take the first step towards excellence today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl('Registration')}>
                <Button
                  size="lg"
                  className="bg-[#D4AF37] text-[#0A1F0A] hover:bg-[#F4D03F] font-semibold px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105">

                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <Button
                  size="lg"
                  variant="outline" className="bg-lime-900 text-white px-8 py-6 text-lg font-semibold rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:text-accent-foreground h-10 border-2 border-white hover:bg-white/10 transition-all duration-300">


                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right - Contact info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4">

            {[
            { icon: Phone, label: 'Call Us', value: '+1 (647) 555-0123' },
            { icon: Mail, label: 'Email Us', value: 'info@australasiasports.com' },
            { icon: MapPin, label: 'Visit Us', value: 'Brampton, Ontario, Canada' }].
            map((item, index) =>
            <motion.div
              key={index}
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">

                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#0A1F0A]" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">{item.label}</p>
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>);

}