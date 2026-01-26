import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function Registration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Step 2: Program Selection
    program: '',
    level: '',
    preferredSchedule: '',
    preferredCoach: '',
    
    // Step 3: Additional Info
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    previousExperience: '',
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill coach name if coming from coach profile
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

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

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
          <h2 className="text-3xl font-bold text-white mb-4">Registration Complete!</h2>
          <p className="text-gray-300 mb-8">
            Thank you for registering with Australasia Sports Academy. 
            We'll contact you within 24 hours to confirm your enrollment and schedule your first session.
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
              Join Our Academy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Start Your <span className="text-[#40916C]">Journey</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Complete the registration form below to enroll in our world-class 
              training programs. We can't wait to help you achieve your athletic goals!
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

      {/* Registration Form */}
      <section className="py-16 bg-[#0A1F0A]">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#1A4D2E]" />
            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{
                    backgroundColor: step >= s ? '#D4AF37' : '#1A4D2E',
                    scale: step === s ? 1.1 : 1,
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </motion.div>
                <span className={`text-sm mt-2 ${step >= s ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                  {s === 1 ? 'Personal Info' : s === 2 ? 'Program' : 'Additional'}
                </span>
              </div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Info */}
              {step === 1 && (
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
              )}

              {/* Step 2: Program Selection */}
              {step === 2 && (
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
              )}

              {/* Step 3: Additional Info */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-[#D4AF37]" />
                    Additional Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Emergency Contact Name *</Label>
                      <Input
                        value={formData.emergencyContact}
                        onChange={(e) => handleChange('emergencyContact', e.target.value)}
                        className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Emergency Phone *</Label>
                      <Input
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                        className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Medical Conditions or Allergies</Label>
                    <Textarea
                      value={formData.medicalConditions}
                      onChange={(e) => handleChange('medicalConditions', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37] min-h-[100px]"
                      placeholder="Please list any medical conditions, allergies, or special requirements..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Previous Sports Experience</Label>
                    <Textarea
                      value={formData.previousExperience}
                      onChange={(e) => handleChange('previousExperience', e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37] min-h-[100px]"
                      placeholder="Tell us about your sports background..."
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#0A1F0A] rounded-xl border border-[#2D6A4F]/30">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleChange('agreeTerms', checked)}
                      className="border-[#40916C] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]"
                    />
                    <label htmlFor="terms" className="text-gray-300 text-sm leading-relaxed cursor-pointer">
                      I agree to the terms and conditions, and acknowledge that I have read and 
                      understood the academy's policies regarding training, safety, and liability.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-[#2D6A4F]/30">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10 rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-full"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.agreeTerms}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-full disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-[#0A1F0A]/30 border-t-[#0A1F0A] rounded-full"
                        />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Complete Registration
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}