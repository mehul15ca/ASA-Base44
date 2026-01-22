import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Award, Edit, Camera } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const mockProfile = {
  name: 'John Doe',
  email: 'john.doe@academy.com',
  phone: '+1 234 567 8900',
  address: '123 Sports Avenue, Cricket City',
  joinDate: '2024-01-15',
  specialization: 'Cricket Coach',
  experience: '8 years',
  certifications: ['Level 3 Cricket Coach', 'First Aid Certified', 'Sports Psychology'],
  bio: 'Passionate cricket coach with over 8 years of experience in developing young talent. Specialized in batting techniques and mental conditioning.',
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
    bio: mockProfile.bio,
  });

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully');
    setShowEditDialog(false);
  };

  return (
    <CoachLayout>
      <div className="p-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-8">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center text-[#0A1F0A] text-4xl font-bold">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#40916C] rounded-full flex items-center justify-center hover:bg-[#2D6A4F] transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{mockProfile.name}</h1>
                    <p className="text-gray-300 text-lg mb-2">{mockProfile.specialization}</p>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(mockProfile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowEditDialog(true)}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                <p className="text-gray-300">{mockProfile.bio}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A1F0A] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{mockProfile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A1F0A] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#40916C]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">{mockProfile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A1F0A] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#F4D03F]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Address</p>
                    <p className="text-white">{mockProfile.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A1F0A] flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Experience</p>
                    <p className="text-white">{mockProfile.experience}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6 mt-6">
              <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
              <div className="space-y-3">
                {mockProfile.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-[#0A1F0A]/50 p-4 rounded-lg"
                  >
                    <Award className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                    <p className="text-gray-300">{achievement}</p>
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
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Certifications</h2>
              <div className="space-y-3">
                {mockProfile.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge className="bg-[#40916C]/20 text-[#40916C] px-3 py-2 text-sm w-full justify-center">
                      {cert}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Statistics */}
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6 mt-6">
              <h2 className="text-xl font-bold text-white mb-6">Statistics</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Sessions Completed</span>
                    <span className="text-white font-semibold">245</span>
                  </div>
                  <div className="w-full bg-[#0A1F0A] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Attendance Rate</span>
                    <span className="text-white font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-[#0A1F0A] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#40916C] to-[#2D6A4F] h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
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
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white h-24"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProfile}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
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