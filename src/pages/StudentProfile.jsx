import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Heart, Shield, Edit2, Save, X } from 'lucide-react';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

export default function StudentProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Student',
    lastName: 'Name',
    studentId: 'STU-0001',
    batch: 'Cricket Batch A',
    status: 'Active',
    gender: 'Male',
    dateOfBirth: '2005-05-15',
    bloodGroup: 'O+',
    email: 'student@email.com',
    phone: '+91 9876543210',
    streetAddress: '123 Main Street',
    city: 'Mumbai',
    province: 'Maharashtra',
    postalCode: '400001',
    emergencyContactName: 'Parent Name',
    emergencyRelationship: 'Father',
    emergencyPhone: '+91 9876543211',
    parentName: 'Parent Name',
    parentPhone: '+91 9876543211',
    medicalCondition: 'No',
    pastInjuries: 'None',
    allergyInfo: 'None'
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  return (
    <StudentLayout>
      <div className="p-8">
        {/* Edit Controls */}
        <div className="flex justify-end mb-6">
          {!isEditMode ? (
            <Button
              onClick={() => setIsEditMode(true)}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-[#40916C] text-gray-300"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center">
                <span className="text-[#0A1F0A] font-bold text-3xl">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <div className="flex items-center gap-4 text-gray-300">
                  <span>{profileData.studentId}</span>
                  <span>•</span>
                  <span>{profileData.batch}</span>
                  <Badge className="bg-green-500/20 text-green-400">{profileData.status}</Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Personal Information */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl font-bold text-white">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-300">First Name</Label>
                <Input
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  disabled={!isEditMode}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Last Name</Label>
                <Input
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  disabled={!isEditMode}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Student ID</Label>
                <Input
                  value={profileData.studentId}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Date of Birth</Label>
                <Input
                  type="date"
                  value={profileData.dateOfBirth}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Gender</Label>
                <Input
                  value={profileData.gender}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Blood Group</Label>
                <Input
                  value={profileData.bloodGroup}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl font-bold text-white">Contact Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-300">Email</Label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditMode}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Phone</Label>
                <Input
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditMode}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-gray-300">Street Address</Label>
                <Input
                  value={profileData.streetAddress}
                  onChange={(e) => setProfileData({ ...profileData, streetAddress: e.target.value })}
                  disabled={!isEditMode}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">City</Label>
                <Input
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  disabled={!isEditMode}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Province</Label>
                <Input
                  value={profileData.province}
                  onChange={(e) => setProfileData({ ...profileData, province: e.target.value })}
                  disabled={!isEditMode}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Postal Code</Label>
                <Input
                  value={profileData.postalCode}
                  onChange={(e) => setProfileData({ ...profileData, postalCode: e.target.value })}
                  disabled={!isEditMode}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl font-bold text-white">Emergency Contact</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-300">Contact Name</Label>
                <Input
                  value={profileData.emergencyContactName}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Relationship</Label>
                <Input
                  value={profileData.emergencyRelationship}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Contact Number</Label>
                <Input
                  value={profileData.emergencyPhone}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Parent Name</Label>
                <Input
                  value={profileData.parentName}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Parent Phone</Label>
                <Input
                  value={profileData.parentPhone}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Medical Information */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl font-bold text-white">Medical Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-300">Medical Condition</Label>
                <Input
                  value={profileData.medicalCondition}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Past Injuries</Label>
                <Input
                  value={profileData.pastInjuries}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <Label className="text-gray-300">Allergy Information</Label>
                <Input
                  value={profileData.allergyInfo}
                  disabled
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </StudentLayout>
  );
}