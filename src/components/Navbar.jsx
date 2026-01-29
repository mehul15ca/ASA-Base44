import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AnimatedLogo from './AnimatedLogo';

const navItems = [
  { name: 'Home', page: 'Home' },
  { name: 'About Us', page: 'About' },
  { name: 'Programs', page: 'Programs' },
  { name: 'Coaches', page: 'Coaches' },
  { name: 'Gallery', page: 'Gallery' },
  { name: 'Contact', page: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-xl' 
            : 'bg-white/90 backdrop-blur-sm shadow-md'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <AnimatedLogo size="sm" />
            </Link>

            {/* Center - Academy Name */}
            <div className="hidden md:block text-center">
              <h1 className="text-[#1B5E20] font-bold text-xl leading-tight">Auustralasia</h1>
              <p className="text-[#D4AF37] text-sm">Spports Academy</p>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = location.pathname === createPageUrl(item.page);
                return (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={createPageUrl(item.page)}
                      className={`px-4 py-2 transition-colors flex items-center gap-1 text-sm font-medium ${
                        isActive 
                          ? 'text-[#4CAF50] border-b-2 border-[#4CAF50]' 
                          : 'text-[#2E7D32] hover:text-[#4CAF50]'
                      }`}
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown className="w-4 h-4" />}
                    </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-48 bg-white border border-[#C8E6C9] rounded-xl shadow-xl overflow-hidden"
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={createPageUrl(subItem.page)}
                            className="block px-4 py-3 text-[#2E7D32] hover:text-[#4CAF50] hover:bg-[#E8F5E9] transition-colors text-sm"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to={createPageUrl('Portal')}>
                <Button variant="outline" className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9] rounded-full">
                  Login
                </Button>
              </Link>
              <Link to={createPageUrl('BookDemo')}>
                <Button className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white hover:from-[#66BB6A] hover:to-[#4CAF50] font-semibold px-6 rounded-full">
                  Book Demo
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#1B5E20] p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
              <div className="pt-24 px-6 pb-8">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === createPageUrl(item.page);
                  return (
                    <div key={index} className="mb-2">
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setMobileDropdown(mobileDropdown === index ? null : index)}
                            className={`flex items-center justify-between w-full py-3 transition-colors text-lg font-medium border-b border-[#E8F5E9] ${
                              isActive ? 'text-[#4CAF50]' : 'text-[#2E7D32] hover:text-[#4CAF50]'
                            }`}
                          >
                            {item.name}
                            <ChevronDown className={`w-5 h-5 transition-transform ${mobileDropdown === index ? 'rotate-180' : ''}`} />
                          </button>
                        <AnimatePresence>
                          {mobileDropdown === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4"
                            >
                              {item.dropdown.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  to={createPageUrl(subItem.page)}
                                  className="block py-2 text-[#2E7D32] hover:text-[#4CAF50] transition-colors text-sm"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      ) : (
                        <Link
                          to={createPageUrl(item.page)}
                          className={`block py-3 transition-colors text-lg font-medium border-b border-[#E8F5E9] ${
                            isActive ? 'text-[#4CAF50]' : 'text-[#2E7D32] hover:text-[#4CAF50]'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  );
                })}

                <div className="mt-8 space-y-3">
                  <Link to={createPageUrl('Portal')} className="block">
                    <Button variant="outline" className="w-full border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9] rounded-full py-6">
                      Login
                    </Button>
                  </Link>
                  <Link to={createPageUrl('BookDemo')} className="block">
                    <Button className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white font-semibold py-6 rounded-full">
                      Book Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}