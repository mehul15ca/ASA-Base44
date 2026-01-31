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
    <footer className="bg-[#0A1F0A] border-t border-[#2D6A4F] py-8 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main grid - hidden on mobile, shown on md+ */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AnimatedLogo size="md" />
              <div>
                <h3 className="text-[#6B5A46] font-bold text-sm">Auustralasia</h3>
                <p className="text-[#D4AF37] text-xs">Spports Academy</p>
              </div>
            </div>
            <p className="text-[#616161] mb-4 leading-relaxed text-xs">
              Empowering athletes to reach their full potential.
            </p>
            <div className="flex gap-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 bg-[#F5E6D3] rounded-full flex items-center justify-center text-[#D4A574] hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#6B5A46] font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={createPageUrl(link.page)}
                    className="text-[#8B7355] hover:text-[#D4AF37] transition-colors flex items-center gap-2 group text-xs"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-[#6B5A46] font-semibold text-sm mb-4">Programs</h4>
            <ul className="space-y-2">
              {programs.map((program, index) => (
                <li key={index}>
                  <Link 
                    to={createPageUrl(program.page)}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 group text-xs"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-[#6B5A46] font-semibold text-sm mb-4">Stay Updated</h4>
            <p className="text-[#8B7355] mb-3 text-xs">Subscribe for updates and offers.</p>
            <div className="flex gap-1 mb-4">
              <Input 
                type="email" 
                placeholder="Email"
                className="bg-white border-[#EDD5B3] text-[#6B5A46] placeholder:text-gray-500 focus:border-[#D4AF37] text-xs"
              />
              <Button className="bg-[#D4AF37] text-white hover:bg-[#F4D03F] px-2">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Contact info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#8B7355] text-xs">
                <Phone className="w-3 h-3 text-[#D4A574]" />
                <span>+1 (647) 555-0123</span>
              </div>
              <div className="flex items-center gap-2 text-[#8B7355] text-xs">
                <Mail className="w-3 h-3 text-[#D4A574]" />
                <span>info@australasiasports.com</span>
              </div>
              <div className="flex items-center gap-2 text-[#8B7355] text-xs">
                <MapPin className="w-3 h-3 text-[#D4A574]" />
                <span>Brampton, Ontario</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile footer - compact version */}
        <div className="md:hidden mb-6">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#F5E6D3]">
            <AnimatedLogo size="sm" />
            <div>
              <h3 className="text-[#6B5A46] font-bold text-sm">Auustralasia</h3>
              <p className="text-[#D4AF37] text-xs">Spports Academy</p>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 bg-[#F5E6D3] rounded-full flex items-center justify-center text-[#D4A574] hover:bg-[#D4AF37] hover:text-white transition-all"
              >
                <social.icon className="w-3 h-3" />
              </a>
            ))}
          </div>
          <div className="space-y-2 text-xs text-[#8B7355] mb-4">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-[#D4A574]" />
              <span>+1 (647) 555-0123</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-[#D4A574]" />
              <span>info@australasiasports.com</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F5E6D3] pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} Auustralasia Spports Academy. All rights reserved.
            </p>
            <div className="flex gap-3 sm:gap-6 text-xs">
              <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}