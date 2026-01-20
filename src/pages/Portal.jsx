import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Portal() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] flex items-center justify-center py-12 px-6 relative">
      {/* Attendance Portal Button - Subtle in corner */}
      <a
        href="#"
        className="absolute top-6 right-6 text-xs text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-1 opacity-60 hover:opacity-100"
      >
        Attendance Portal
        <ExternalLink className="w-3 h-3" />
      </a>

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1A4D2E]/50 to-[#0D2818]/50 border border-[#2D6A4F]/30 rounded-3xl p-8 md:p-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Member Login</h1>
            <p className="text-gray-400">Access your academy account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </Label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#40916C] hover:text-[#D4AF37] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold py-6 rounded-full disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-[#0A1F0A]/30 border-t-[#0A1F0A] rounded-full"
                  />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Support Contact */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Having trouble?
            </p>
            <a
              href="mailto:support@australasiasportsacademy.com"
              className="text-sm text-[#40916C] hover:text-[#D4AF37] transition-colors"
            >
              Contact support@australasiasportsacademy.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}