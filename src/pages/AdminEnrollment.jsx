import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminEnrollment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'Admin',
    profilePhoto: null,
    profilePhotoPreview: null,
    email: 'admin@australasiasports.com',
    password: '',
    confirmPassword: '',
    useSameEmail: true,
    alternateEmail: '',
    mobileNumber: '',
    accessLevel: 'full',
    ndaConsent: '',
    dataPrivacyConsent: '',
    systemUsageConsent: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: file,
          profilePhotoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Enrollment submitted successfully.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 md:py-12 px-3 md:px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-4 md:mb-8"
      >
        <Card className="bg-gradient-to-r from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
          <CardContent className="text-center py-4 md:py-8">
            <div className="w-32 md:w-48 h-24 md:h-32 flex items-center justify-center mx-auto mb-2 md:mb-4 overflow-hidden">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696e66398d7900c2acfeec9e/b31bf63c7_ChatGPTImageJan13202607_16_18PM.png" 
                alt="ASA Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">Admin Enrollment Form</h1>
            <p className="text-xs md:text-sm text-gray-300">Auustralasia Spports Academy</p>
          </CardContent>
        </Card>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-3 md:space-y-6">
        {/* A) Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-[#0A1F0A] text-base md:text-lg">A. Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="text-xs md:text-sm font-medium text-gray-700 mb-1 block">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    required
                    className="border-[#2D6A4F] text-xs md:text-sm h-8 md:h-10"
                  />
                </div>
                <div>
                  <label className="text-xs md:text-sm font-medium text-gray-700 mb-1 block">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    required
                    className="border-[#2D6A4F] text-xs md:text-sm h-8 md:h-10"
                  />
                </div>
                <div>
                  <label className="text-xs md:text-sm font-medium text-gray-700 mb-1 block">Role</label>
                  <Input
                    value={formData.role}
                    disabled
                    className="border-[#2D6A4F] bg-gray-100 text-gray-600 text-xs md:text-sm h-8 md:h-10"
                  />
                </div>
              </div>

              {/* Upload Profile Photo */}
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-700 mb-2 block">Upload Profile Photo</label>
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                  <div className="w-20 md:w-24 h-20 md:h-24 rounded-full bg-gray-200 border-4 border-[#2D6A4F] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {formData.profilePhotoPreview ? (
                      <img
                        src={formData.profilePhotoPreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 md:w-12 h-8 md:h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="w-full md:w-auto">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="profilePhotoUpload"
                    />
                    <label htmlFor="profilePhotoUpload">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#2D6A4F] text-[#0A1F0A] hover:bg-[#F0F4F0] text-xs md:text-sm h-8 md:h-10 w-full md:w-auto"
                        onClick={() => document.getElementById('profilePhotoUpload').click()}
                      >
                        Choose File
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* B) Login & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-[#0A1F0A] text-base md:text-lg">B. Login & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  disabled
                  className="border-[#2D6A4F] bg-gray-100 text-gray-600 text-xs md:text-sm h-8 md:h-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="text-xs md:text-sm font-medium text-gray-700 mb-1 block">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    className="border-[#2D6A4F] text-xs md:text-sm h-8 md:h-10"
                  />
                </div>
                <div>
                  <label className="text-xs md:text-sm font-medium text-gray-700 mb-1 block">
                    Re-Enter Password <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                    className="border-[#2D6A4F] text-xs md:text-sm h-8 md:h-10"
                  />
                </div>
              </div>

              {/* Report Email Toggle */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <Checkbox
                    checked={formData.useSameEmail}
                    onCheckedChange={(checked) => handleChange('useSameEmail', checked)}
                  />
                  <label className="text-xs md:text-sm text-gray-700 cursor-pointer">
                    Use same email for all reports
                  </label>
                </div>

                {/* Conditional Alternate Email */}
                 {!formData.useSameEmail && (
                   <motion.div
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                   >
                     <label className="text-xs md:text-sm font-medium text-gray-700 mb-1 block">
                       Alternate Email
                     </label>
                     <Input
                       type="email"
                       placeholder="Enter alternate email"
                       value={formData.alternateEmail}
                       onChange={(e) => handleChange('alternateEmail', e.target.value)}
                       className="border-[#2D6A4F] text-xs md:text-sm h-8 md:h-10"
                     />
                   </motion.div>
                 )}
                </div>

                <div>
                 <label className="text-xs md:text-sm font-medium text-gray-700 mb-1 block">
                   Mobile Number <span className="text-red-500">*</span>
                 </label>
                 <Input
                   type="tel"
                   placeholder="Enter mobile number"
                   value={formData.mobileNumber}
                   onChange={(e) => handleChange('mobileNumber', e.target.value)}
                   required
                   className="border-[#2D6A4F] text-xs md:text-sm h-8 md:h-10"
                 />
                </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* C) Permissions & Access Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-[#0A1F0A] text-base md:text-lg">C. Permissions & Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <label className="text-xs md:text-sm font-medium text-gray-700 mb-2 block">
                Access Level <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2 md:space-y-3">
                {/* Full Access Option */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.accessLevel === 'full'
                      ? 'border-[#2D6A4F] bg-[#F0F4F0]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => handleChange('accessLevel', 'full')}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <input
                      type="radio"
                      name="accessLevel"
                      value="full"
                      checked={formData.accessLevel === 'full'}
                      onChange={(e) => handleChange('accessLevel', e.target.value)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-xs md:text-sm">Full Access</p>
                      <p className="text-xs text-gray-600">Complete access to all system features and settings</p>
                    </div>
                  </div>
                </motion.div>

                {/* Read-Only Option */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.accessLevel === 'readonly'
                      ? 'border-[#2D6A4F] bg-[#F0F4F0]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => handleChange('accessLevel', 'readonly')}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <input
                      type="radio"
                      name="accessLevel"
                      value="readonly"
                      checked={formData.accessLevel === 'readonly'}
                      onChange={(e) => handleChange('accessLevel', e.target.value)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-xs md:text-sm">Read-Only</p>
                      <p className="text-xs text-gray-600">View-only access without modification permissions</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* E) Compliance & Declarations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-[#0A1F0A] text-base md:text-lg">E. Compliance & Declarations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              {/* 1) Non-Disclosure Agreement */}
              <div className="space-y-2 md:space-y-3">
                <h3 className="font-semibold text-gray-900 text-xs md:text-sm">
                  <span className="text-red-500">*</span> Non-Disclosure Agreement (NDA) Consent
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-gray-700">
                    As an administrator, you will have access to confidential information about students, staff, and academy operations. 
                    You agree to maintain strict confidentiality and not disclose any sensitive information to unauthorized parties. 
                    Violation of this agreement may result in immediate termination and potential legal action.
                  </p>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ndaConsent"
                      value="yes"
                      checked={formData.ndaConsent === 'yes'}
                      onChange={(e) => handleChange('ndaConsent', e.target.value)}
                      required
                      className="w-4 h-4"
                    />
                    <span className="text-xs md:text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ndaConsent"
                      value="no"
                      checked={formData.ndaConsent === 'no'}
                      onChange={(e) => handleChange('ndaConsent', e.target.value)}
                      required
                      className="w-4 h-4"
                    />
                    <span className="text-xs md:text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* 2) Data Privacy Agreement */}
              <div className="space-y-2 md:space-y-3">
                <h3 className="font-semibold text-gray-900 text-xs md:text-sm">
                  <span className="text-red-500">*</span> Data Privacy Agreement Consent
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-gray-700">
                    You acknowledge that you will handle all personal data in accordance with applicable data protection laws and academy policies. 
                    This includes respecting user privacy, implementing appropriate security measures, and only accessing data necessary for your administrative duties. 
                    You agree to report any data breaches or security concerns immediately.
                  </p>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dataPrivacyConsent"
                      value="yes"
                      checked={formData.dataPrivacyConsent === 'yes'}
                      onChange={(e) => handleChange('dataPrivacyConsent', e.target.value)}
                      required
                      className="w-4 h-4"
                    />
                    <span className="text-xs md:text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="dataPrivacyConsent"
                      value="no"
                      checked={formData.dataPrivacyConsent === 'no'}
                      onChange={(e) => handleChange('dataPrivacyConsent', e.target.value)}
                      required
                      className="w-4 h-4"
                    />
                    <span className="text-xs md:text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* 3) System Usage Policy */}
              <div className="space-y-2 md:space-y-3">
                <h3 className="font-semibold text-gray-900 text-xs md:text-sm">
                  <span className="text-red-500">*</span> System Usage Policy Consent
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-gray-700">
                    You agree to use the academy's systems and resources responsibly and only for authorized purposes. 
                    This includes not sharing login credentials, not attempting to bypass security measures, and not using the system for personal gain. 
                    All system activities may be monitored and logged. Misuse of system resources may result in disciplinary action.
                  </p>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="systemUsageConsent"
                      value="yes"
                      checked={formData.systemUsageConsent === 'yes'}
                      onChange={(e) => handleChange('systemUsageConsent', e.target.value)}
                      required
                      className="w-4 h-4"
                    />
                    <span className="text-xs md:text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="systemUsageConsent"
                      value="no"
                      checked={formData.systemUsageConsent === 'no'}
                      onChange={(e) => handleChange('systemUsageConsent', e.target.value)}
                      required
                      className="w-4 h-4"
                    />
                    <span className="text-xs md:text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] hover:from-[#F4D03F] hover:to-[#D4AF37] text-[#0A1F0A] text-sm md:text-lg px-6 md:px-12 py-3 md:py-6 font-bold w-full md:w-auto"
          >
            Submit Enrollment
          </Button>
        </motion.div>
      </form>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto mt-8 md:mt-12 text-center text-gray-600 pb-4 md:pb-8"
      >
        <p className="text-xs md:text-sm">© 2026 Auustralasia Spports Academy. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}