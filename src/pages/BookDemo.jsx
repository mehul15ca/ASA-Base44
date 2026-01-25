import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const programs = [
  { id: 'cricket', name: 'Cricket Training', price: '$199/month' },
  { id: 'yoga', name: 'Sports Yoga', price: '$149/month' },
  { id: 'baseball', name: 'Baseball Academy', price: '$179/month' },
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

const benefits = [
  { icon: Shield, text: 'Safe & Supervised Environment' },
  { icon: Clock, text: 'Flexible Scheduling Options' },
  { icon: Sparkles, text: 'Free Trial Session Available' },
];

export default function BookDemo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    program: '',
    level: '',
    preferredSchedule: '',
    preferredCoach: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const coachName = urlParams.get('coach');
    if (coachName) {
      setFormData(prev => ({ ...prev, preferredCoach: decodeURIComponent(coachName) }));
    }
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Demo Booked!</h2>
          <p className="text-gray-300 mb-8">
            Thank you for your interest in Australasia Sports Academy. 
            We'll contact you within 24 hours to schedule your free demo session.
          </p>
          <p className="text-[#D4AF37] font-semibold">
            Check your email for confirmation details.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-8 md:py-16 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-xs md:text-sm">
              Experience Our Academy
            </span>
            <h1 className="text-2xl md:text-5xl font-bold text-white mt-3 md:mt-4 mb-3 md:mb-6">
              Book Your Free <span className="text-[#40916C]">Demo</span>
            </h1>
            <p className="text-gray-300 text-xs md:text-lg max-w-2xl mx-auto mb-4 md:mb-8">
              Free demo session with no commitment. See the difference today!
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:flex md:flex-wrap md:justify-center md:gap-6 gap-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center gap-1 md:gap-2 text-gray-300 text-xs md:text-sm">
                  <benefit.icon className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0" />
                  <span className="hidden md:inline">{benefit.text}</span>
                  <span className="md:hidden line-clamp-1">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-6 md:py-16 bg-[#0A1F0A]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-2xl md:rounded-3xl p-4 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
              {/* Personal Info */}
              <div className="space-y-3 md:space-y-6">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                  Personal Information
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-xs md:text-sm text-gray-300">First Name *</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-base h-8 md:h-10 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-xs md:text-sm text-gray-300">Last Name *</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-base h-8 md:h-10 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <Label className="text-xs md:text-sm text-gray-300">Email Address *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-base h-8 md:h-10 focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-xs md:text-sm text-gray-300">Phone *</Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-base h-8 md:h-10 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-xs md:text-sm text-gray-300">DOB *</Label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-base h-8 md:h-10 focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Program Selection */}
              <div className="space-y-3 md:space-y-6">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                  Select Program
                </h2>

                <div className="space-y-2 md:space-y-4">
                  <Label className="text-xs md:text-sm text-gray-300">Choose a Program *</Label>
                  <RadioGroup 
                    value={formData.program}
                    onValueChange={(value) => handleChange('program', value)}
                  >
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        className={`flex items-center justify-between p-2 md:p-4 rounded-lg md:rounded-xl border transition-all cursor-pointer text-xs md:text-sm ${
                          formData.program === program.id
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                            : 'border-[#2D6A4F]/50 hover:border-[#40916C]'
                        }`}
                        onClick={() => handleChange('program', program.id)}
                      >
                        <div className="flex items-center gap-2 md:gap-4">
                          <RadioGroupItem value={program.id} className="border-[#40916C]" />
                          <span className="text-white font-medium">{program.name}</span>
                        </div>
                        <span className="text-[#D4AF37] font-semibold whitespace-nowrap ml-2">{program.price}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-xs md:text-sm text-gray-300">Level *</Label>
                    <Select 
                      value={formData.level}
                      onValueChange={(value) => handleChange('level', value)}
                    >
                      <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-base h-8 md:h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                        {levels.map((level) => (
                          <SelectItem key={level} value={level.toLowerCase()}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <Label className="text-xs md:text-sm text-gray-300">Schedule *</Label>
                    <Select 
                      value={formData.preferredSchedule}
                      onValueChange={(value) => handleChange('preferredSchedule', value)}
                    >
                      <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-base h-8 md:h-10">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                        <SelectItem value="weekend">Weekend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <Label className="text-xs md:text-sm text-gray-300">Coach (Optional)</Label>
                  <Input
                    value={formData.preferredCoach}
                    onChange={(e) => handleChange('preferredCoach', e.target.value)}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-base h-8 md:h-10 focus:border-[#D4AF37]"
                    placeholder="Auto assigned"
                  />
                  {formData.preferredCoach && (
                    <p className="text-xs text-[#40916C] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {formData.preferredCoach}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-3 md:pt-6 border-t border-[#2D6A4F]/30">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-full disabled:opacity-50 px-4 md:px-8 text-xs md:text-base h-8 md:h-10 w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-[#0A1F0A]/30 border-t-[#0A1F0A] rounded-full"
                      />
                      <span className="hidden md:inline">Booking...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>Book Demo</span>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 hidden md:inline" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}