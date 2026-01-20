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
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm">
              Experience Our Academy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Book Your Free <span className="text-[#40916C]">Demo Session</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Try our world-class training programs with no commitment. 
              Book a free demo session and see the difference for yourself!
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <benefit.icon className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-[#0A1F0A]">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-[#D4AF37]" />
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">First Name *</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Last Name *</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Email Address *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Phone Number *</Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Date of Birth *</Label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Program Selection */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  Select Your Program
                </h2>

                <div className="space-y-4">
                  <Label className="text-gray-300">Choose a Program *</Label>
                  <RadioGroup 
                    value={formData.program}
                    onValueChange={(value) => handleChange('program', value)}
                  >
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                          formData.program === program.id
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                            : 'border-[#2D6A4F]/50 hover:border-[#40916C]'
                        }`}
                        onClick={() => handleChange('program', program.id)}
                      >
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value={program.id} className="border-[#40916C]" />
                          <span className="text-white font-medium">{program.name}</span>
                        </div>
                        <span className="text-[#D4AF37] font-semibold">{program.price}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Experience Level *</Label>
                    <Select 
                      value={formData.level}
                      onValueChange={(value) => handleChange('level', value)}
                    >
                      <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                        <SelectValue placeholder="Select level" />
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
                  <div className="space-y-2">
                    <Label className="text-gray-300">Preferred Schedule *</Label>
                    <Select 
                      value={formData.preferredSchedule}
                      onValueChange={(value) => handleChange('preferredSchedule', value)}
                    >
                      <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                        <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                        <SelectItem value="evening">Evening (5PM - 9PM)</SelectItem>
                        <SelectItem value="weekend">Weekend Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Preferred Coach (Optional)</Label>
                  <Input
                    value={formData.preferredCoach}
                    onChange={(e) => handleChange('preferredCoach', e.target.value)}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                    placeholder="Leave blank for automatic assignment"
                  />
                  {formData.preferredCoach && (
                    <p className="text-sm text-[#40916C] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Request to train with {formData.preferredCoach}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-[#2D6A4F]/30">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-full disabled:opacity-50 px-8"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-[#0A1F0A]/30 border-t-[#0A1F0A] rounded-full"
                      />
                      Booking...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Book Demo Session
                      <ArrowRight className="w-4 h-4" />
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