import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">Password Reset Successful</h2>
            <p className="text-gray-300 mb-8">
              Your password has been successfully reset. You can now login with your new password.
            </p>
            <Link to={createPageUrl('Portal')}>
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:from-[#F4D03F] hover:to-[#D4AF37] font-semibold px-8 rounded-full">
                Go to Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] flex items-center justify-center py-12 px-6">
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
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create New Password</h1>
            <p className="text-gray-400">Enter your new password below</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                New Password
              </Label>
              <Input
                type="password"
                value={formData.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </Label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white focus:border-[#D4AF37]"
                placeholder="Confirm new password"
                required
              />
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
                  Resetting...
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  Reset Password
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link 
              to={createPageUrl('Portal')}
              className="text-sm text-[#40916C] hover:text-[#D4AF37] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}