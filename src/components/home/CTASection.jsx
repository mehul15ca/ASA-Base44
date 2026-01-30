import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-[#F5E6D3] via-[#EDD5B3] to-[#F5E6D3] relative overflow-hidden">
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

            <h2 className="text-4xl md:text-5xl font-bold text-[#6B5A46] mb-6">
              Ready To Start Your
              <span className="block text-[#D4AF37]">Athletic Journey?</span>
            </h2>
            <p className="text-lg text-[#8B7355] mb-8">
              Join hundreds of athletes who have transformed their game at 
              Australasia Sports Academy. Take the first step towards excellence today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl('Registration')}>
                <Button
                  size="lg"
                  className="bg-[#D4AF37] text-white hover:bg-[#F4D03F] font-semibold px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105">

                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <Button
                  size="lg"
                  variant="outline" className="bg-white text-[#D4A574] px-8 py-6 text-lg font-semibold rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:text-accent-foreground h-10 border-2 border-[#D4A574] hover:bg-[#FFF8E7] transition-all duration-300">


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
            { icon: Phone, label: 'Call Us', value: '+1 (365) 281-3968' },
            { icon: Mail, label: 'Email Us', value: 'info@australasiasportsscsdemy.com' },
            { icon: MapPin, label: 'Visit Us', value: 'Brampton, Ontario, Canada' }].
            map((item, index) =>
            <motion.div
              key={index}
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 bg-white rounded-xl p-5 border border-[#F5E6D3]">

                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#8B7355]">{item.label}</p>
                  <p className="text-lg font-semibold text-[#6B5A46]">{item.value}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>);

}