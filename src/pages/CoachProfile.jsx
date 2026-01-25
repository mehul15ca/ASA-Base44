import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Award, Edit, Camera } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const mockProfile = {
  name: 'John Doe',
  email: 'john.doe@academy.com',
  phone: '+1 234 567 8900',
  address: {
    street: '123 Sports Avenue',
    city: 'Cricket City',
    province: 'Ontario',
    postalCode: 'M5V 3A8',
  },
  joinDate: '2024-01-15',
  specialization: 'Cricket Coach',
  experience: '8 years',
  certifications: ['Level 3 Cricket Coach', 'First Aid Certified', 'Sports Psychology'],
  financial: {
    institutionName: 'Royal Bank of Canada',
    transitNumber: '12345',
    institutionNumber: '002',
    accountNumber: '123456789',
    interacID: 'john.doe@academy.com',
  },
  achievements: [
    'Coached state-level team to championship in 2025',
    'Trained 15+ students who went on to represent district teams',
    'Awarded Best Coach of the Year 2024',
  ],
};

export default function CoachProfile() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: mockProfile.name,
    email: mockProfile.email,
    phone: mockProfile.phone,
    address: mockProfile.address,
    financial: mockProfile.financial,
  });

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully');
    setShowEditDialog(false);
  };

  return (
    <CoachLayout>
      <div className="p-4 md:p-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <div className="relative">
                <div className="w-24 md:w-32 h-24 md:h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center text-[#0A1F0A] text-2xl md:text-4xl font-bold">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 w-8 md:w-10 h-8 md:h-10 bg-[#40916C] rounded-full flex items-center justify-center hover:bg-[#2D6A4F] transition-colors">
                  <Camera className="w-4 md:w-5 h-4 md:h-5 text-white" />
                </button>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3 md:mb-4">
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{mockProfile.name}</h1>
                    <p className="text-gray-300 text-base md:text-lg mb-2">{mockProfile.specialization}</p>
                    <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start text-xs md:text-sm">
                      <Calendar className="w-3 md:w-4 h-3 md:h-4" />
                      <span>Joined {new Date(mockProfile.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowEditDialog(true)}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] w-full md:w-auto text-sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>

              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Contact Information</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-[#0A1F0A] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 md:w-5 h-4 md:h-5 text-[#D4AF37]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs md:text-sm">Email</p>
                    <p className="text-white text-xs md:text-sm break-all">{mockProfile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-[#0A1F0A] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 md:w-5 h-4 md:h-5 text-[#40916C]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs md:text-sm">Phone</p>
                    <p className="text-white text-xs md:text-sm">{mockProfile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-[#0A1F0A] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 md:w-5 h-4 md:h-5 text-[#F4D03F]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs md:text-sm">Address</p>
                    <p className="text-white text-xs md:text-sm">{mockProfile.address.street}, {mockProfile.address.city}, {mockProfile.address.province} {mockProfile.address.postalCode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-[#0A1F0A] flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-400 text-xs md:text-sm">Experience</p>
                    <p className="text-white text-xs md:text-sm">{mockProfile.experience}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6 mt-3 md:mt-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Achievements</h2>
              <div className="space-y-2 md:space-y-3">
                {mockProfile.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 md:gap-3 bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg"
                  >
                    <Award className="w-4 md:w-5 h-4 md:h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-xs md:text-sm">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Certifications</h2>
              <div className="space-y-2 md:space-y-3">
                {mockProfile.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge className="bg-[#40916C]/20 text-[#40916C] px-3 py-2 text-xs md:text-sm w-full justify-center">
                      {cert}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Statistics */}
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6 mt-3 md:mt-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Statistics</h2>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-2">
                    <span className="text-gray-400">Sessions Completed</span>
                    <span className="text-white font-semibold">245</span>
                  </div>
                  <div className="w-full bg-[#0A1F0A] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-2">
                    <span className="text-gray-400">Attendance Rate</span>
                    <span className="text-white font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-[#0A1F0A] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#40916C] to-[#2D6A4F] h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-2">
                    <span className="text-gray-400">Student Satisfaction</span>
                    <span className="text-white font-semibold">4.8/5</span>
                  </div>
                  <div className="w-full bg-[#0A1F0A] rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-lg md:text-xl">Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 md:space-y-4">
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                />
              </div>

              <div>
                <h3 className="text-white text-sm font-semibold mb-3 mt-2">Address Information</h3>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Street Address</Label>
                <Input
                  value={formData.address.street}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">City</Label>
                  <Input
                    value={formData.address.city}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Province</Label>
                  <Input
                    value={formData.address.province}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, province: e.target.value } })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Postal Code</Label>
                <Input
                  value={formData.address.postalCode}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, postalCode: e.target.value } })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                />
              </div>

              <div>
                <h3 className="text-white text-sm font-semibold mb-3 mt-4">Financial Information</h3>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Institution Name</Label>
                <Input
                  value={formData.financial.institutionName}
                  onChange={(e) => setFormData({ ...formData, financial: { ...formData.financial, institutionName: e.target.value } })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Transit Number</Label>
                  <Input
                    value={formData.financial.transitNumber}
                    onChange={(e) => setFormData({ ...formData, financial: { ...formData.financial, transitNumber: e.target.value } })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Institution Number</Label>
                  <Input
                    value={formData.financial.institutionNumber}
                    onChange={(e) => setFormData({ ...formData, financial: { ...formData.financial, institutionNumber: e.target.value } })}
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Account Number</Label>
                <Input
                  value={formData.financial.accountNumber}
                  onChange={(e) => setFormData({ ...formData, financial: { ...formData.financial, accountNumber: e.target.value } })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                />
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Interac ID</Label>
                <Input
                  value={formData.financial.interacID}
                  onChange={(e) => setFormData({ ...formData, financial: { ...formData.financial, interacID: e.target.value } })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs"
                />
              </div>

              </div>
            <DialogFooter className="flex-col-reverse md:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
                className="border-[#40916C] text-gray-300 text-xs w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProfile}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-xs w-full md:w-auto"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}