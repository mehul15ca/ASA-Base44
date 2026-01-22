import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedLogo from './AnimatedLogo';

const quickLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'About Us', page: 'About' },
  { name: 'Programs', page: 'Programs' },
  { name: 'Coaches', page: 'Coaches' },
  { name: 'Gallery', page: 'Gallery' },
  { name: 'Contact', page: 'Contact' },
];

const programs = [
  { name: 'Cricket Training', page: 'Programs' },
  { name: 'Yoga & Fitness', page: 'Programs' },
  { name: 'Baseball Academy', page: 'Programs' },
  { name: 'Summer Camps', page: 'Registration' },
];

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1F0A] pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <AnimatedLogo size="md" />
              <div>
                <h3 className="text-white font-bold text-lg">Auustralasia</h3>
                <p className="text-[#40916C] text-sm">Spports Academy</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering athletes of all ages to reach their full potential through 
              world-class coaching and facilities.
            </p>
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-[#1A4D2E] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#D4AF37] hover:text-[#0A1F0A] transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={createPageUrl(link.page)}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Programs</h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <Link 
                    to={createPageUrl(program.page)}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email"
                className="bg-[#1A4D2E] border-[#2D6A4F] text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
              />
              <Button className="bg-[#D4AF37] text-[#0A1F0A] hover:bg-[#F4D03F]">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-[#40916C]" />
                <span>+1 (647) 555-0123</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-[#40916C]" />
                <span>info@australasiasports.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-[#40916C]" />
                <span>Brampton, Ontario</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1A4D2E] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Auustralasia Spports Academy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}