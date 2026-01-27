import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['+1 (365) 281-3968'],
    action: 'tel:+13652813968',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['support@australasiasportsacademy.ca', 'info@australasiasportsacademy.ca'],
    action: 'mailto:support@australasiasportsacademy.ca',
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['6461 Mayfield Rd', 'Brampton, ON L6P 0H9'],
    action: 'https://maps.google.com/?q=6461+Mayfield+Rd+Brampton+ON+L6P+0H9',
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: 9:00 AM - 5:00 PM'],
  },
];

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/share/17yZYNtZEN/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/australasiasportsacademy?igsh=eHAxMnl5eGdrNHpm', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.link/f4vv0f', label: 'WhatsApp' },
  { icon: Youtube, href: 'https://www.youtube.com/channel/UC-cJaXpFBj_aj6r2sJo6iLw', label: 'Youtube' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E]">
         <div className="container mx-auto px-4 sm:px-6 text-center">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
             <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-xs sm:text-sm">
               Get In Touch
             </span>
             <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
               Contact <span className="text-[#40916C]">Us</span>
             </h1>
             <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
               Have questions about our programs? Want to schedule a visit? 
               We'd love to hear from you. Reach out through any of the methods below.
             </p>
           </motion.div>
         </div>
       </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0A1F0A]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="w-6 sm:w-8 h-6 sm:h-8 text-[#D4AF37]" />
                  <h2 className="text-lg sm:text-2xl font-bold text-white">Send Us a Message</h2>
                </div>

                {isSubmitted ? (
                  <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center py-8 sm:py-12"
                  >
                   <div className="w-14 sm:w-16 h-14 sm:h-16 bg-[#40916C] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                     <Send className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
                   </div>
                   <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Message Sent!</h3>
                   <p className="text-gray-400 text-sm sm:text-base">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300 text-sm">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-[#0A1F0A] border-[#2D6A4F] text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300 text-sm">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-[#0A1F0A] border-[#2D6A4F] text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300 text-sm">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-[#0A1F0A] border-[#2D6A4F] text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                          placeholder="+1 (___) ___-____"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-300 text-sm">Subject</Label>
                        <Select 
                          value={formData.subject} 
                          onValueChange={(value) => setFormData({...formData, subject: value})}
                        >
                          <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="registration">Registration</SelectItem>
                            <SelectItem value="programs">Programs Info</SelectItem>
                            <SelectItem value="trial">Book a Trial</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300 text-sm">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-[#0A1F0A] border-[#2D6A4F] text-white placeholder:text-gray-500 focus:border-[#D4AF37] min-h-[120px] sm:min-h-[150px]"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold py-4 sm:py-6 rounded-full text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-[#0A1F0A]/30 border-t-[#0A1F0A] rounded-full"
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
              >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1A4D2E]/30 border border-[#2D6A4F]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-[#D4AF37]/50 transition-all group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#0A1F0A]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-400 text-sm sm:text-base">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <div className="bg-[#1A4D2E]/30 border border-[#2D6A4F]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Follow Us</h3>
                <div className="flex gap-3 sm:gap-4">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 sm:w-12 h-10 sm:h-12 bg-[#0A1F0A] rounded-lg sm:rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#D4AF37] hover:text-[#0A1F0A] transition-all"
                    >
                      <social.icon className="w-4 sm:w-5 h-4 sm:h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-[#1A4D2E]/30 border border-[#2D6A4F]/30 rounded-xl sm:rounded-2xl p-2 h-48 sm:h-64 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179.9822442958713!2d-79.74960732318087!3d43.799507697003534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3d6979e93735%3A0xcb71e1f891e39f88!2sSSANJAY%20JOSHI%20Real%20Estate%20Group!5e0!3m2!1sen!2sca!4v1769472348468!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Academy Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}