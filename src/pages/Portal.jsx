import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Mock credentials for testing
const MOCK_CREDENTIALS = {
  admin: { username: 'admin', password: 'admin123', role: 'Admin', redirect: 'AdminDashboard' },
  coach: { username: 'coach', password: 'coach123', role: 'Coach', redirect: 'CoachDashboard' },
  student: { username: 'student', password: 'student123', role: 'Student', redirect: 'StudentDashboard' },
  superadmin: { username: 'superadmin', password: 'super123', role: 'SuperAdmin', redirect: 'SuperAdminDashboard' },
};

export default function Portal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    const user = Object.values(MOCK_CREDENTIALS).find(
      cred => cred.username === formData.username && cred.password === formData.password
    );
    
    if (user) {
      // Store user info in sessionStorage for persistence
      sessionStorage.setItem('currentUser', JSON.stringify({
        username: user.username,
        role: user.role
      }));
      
      // Redirect to appropriate dashboard
      navigate(createPageUrl(user.redirect));
    } else {
      setError('Invalid username or password');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#1A4D2E] flex items-center justify-center py-12 px-6 relative">
      {/* Attendance Portal Button - Bottom right */}
      <Link to={createPageUrl('AttendancePortal')} className="absolute bottom-6 right-6">
        <Button variant="outline" className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10 rounded-full">
          Attendance Portal
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </Link>

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

          {/* Test Credentials Info */}
          <div className="mb-6 p-4 bg-[#40916C]/10 border border-[#40916C]/30 rounded-lg">
            <h3 className="text-sm font-semibold text-[#D4AF37] mb-2">Test Credentials:</h3>
            <div className="space-y-1 text-xs text-gray-300">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Coach:</strong> coach / coach123</p>
              <p><strong>Student:</strong> student / student123</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500">{error}</span>
              </motion.div>
            )}

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
              <Link to={createPageUrl('ForgotPassword')}>
                <button
                  type="button"
                  className="text-sm text-[#40916C] hover:text-[#D4AF37] transition-colors"
                >
                  Forgot password?
                </button>
              </Link>
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