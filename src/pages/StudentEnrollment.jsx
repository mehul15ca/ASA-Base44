import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const generateStudentId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = 'ASA-';
  for (let i = 0; i < 9; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

export default function StudentEnrollment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    nationality: '',
    studentId: '',
    profilePhoto: null,
    email: 'student@email.com',
    mobile: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    primarySport: '',
    experience: '',
    previousClub: '',
    batch: 'Summer 2026',
    jerseySize: '',
    shoeSize: '',
    hasMedical: '',
    medicalDetails: '',
    hasInjuries: '',
    allergies: '',
    bloodGroup: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    consentEmergency: false,
    consentRules: false,
    consentMedia: false,
    waiverRisk: false,
    waiverMedical: '',
    waiverLiability: false,
    waiverMediaConsent: '',
    waiverGuardianName: '',
    waiverDate: new Date().toISOString().split('T')[0],
    waiverPhone: '',
    waiverEmail: '',
    waiverSignature: '',
    waiverFinalAgreement: false,
  });

  const [photoFileName, setPhotoFileName] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    setFormData(prev => ({ ...prev, studentId: generateStudentId() }));
  }, []);

  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFileName(file.name);
      setFormData(prev => ({ ...prev, profilePhoto: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please check and try again.');
      return;
    }
    alert('Enrollment form submitted successfully! Check console for details.');
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-[#0D2818] to-[#1A4D2E] rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="w-32 h-20 bg-[#D4AF37] rounded-lg flex items-center justify-center">
            <span className="text-[#0A1F0A] font-bold text-2xl">ASA</span>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-white">Australasia Sports Academy</h1>
            <p className="text-gray-300 mt-1">Student Enrollment Form</p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* A) Basic Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">A. Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <Input type="date" value={formData.dob} onChange={(e) => handleChange('dob', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)} required>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <Select value={formData.nationality} onValueChange={(value) => handleChange('nationality', value)} required>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select Nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Australian">Australian</SelectItem>
                    <SelectItem value="Canadian">Canadian</SelectItem>
                    <SelectItem value="American">American</SelectItem>
                    <SelectItem value="British">British</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Student ID (Auto-generated)</label>
                <Input value={formData.studentId} disabled className="border-[#2D6A4F] bg-gray-100" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Profile Photo (Optional)</label>
                <Input type="file" accept="image/*" onChange={handleFileChange} className="border-[#2D6A4F]" />
                {photoFileName && <p className="text-sm text-[#2D6A4F] mt-1">Selected: {photoFileName}</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* B) Contact Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">B. Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address (Pre-filled)</label>
                <Input type="email" value={formData.email} disabled className="border-[#2D6A4F] bg-gray-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <Input type="tel" placeholder="+61 123 456 789" value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Password <span className="text-red-500">*</span>
                </label>
                <Input type="password" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Re-Enter Password <span className="text-red-500">*</span>
                </label>
                <Input type="password" value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} required className="border-[#2D6A4F]" />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Residential Address <span className="text-red-500">*</span>
                </label>
                <Input value={formData.address} onChange={(e) => handleChange('address', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  City <span className="text-red-500">*</span>
                </label>
                <Input value={formData.city} onChange={(e) => handleChange('city', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Province <span className="text-red-500">*</span>
                </label>
                <Input value={formData.province} onChange={(e) => handleChange('province', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <Input value={formData.postalCode} onChange={(e) => handleChange('postalCode', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* C) Emergency Contact */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">C. Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Emergency Contact Name <span className="text-red-500">*</span>
                </label>
                <Input value={formData.emergencyName} onChange={(e) => handleChange('emergencyName', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Relationship to Student <span className="text-red-500">*</span>
                </label>
                <Select value={formData.emergencyRelation} onValueChange={(value) => handleChange('emergencyRelation', value)} required>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select Relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Guardian">Guardian</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Emergency Contact Phone Number <span className="text-red-500">*</span>
                </label>
                <Input type="tel" placeholder="+61 123 456 789" value={formData.emergencyPhone} onChange={(e) => handleChange('emergencyPhone', e.target.value)} required className="border-[#2D6A4F]" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* D) Sports Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">D. Sports Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Primary Sport <span className="text-red-500">*</span>
                </label>
                <Select value={formData.primarySport} onValueChange={(value) => handleChange('primarySport', value)} required>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select Sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Football/Soccer">Football/Soccer</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                    <SelectItem value="Cricket">Cricket</SelectItem>
                    <SelectItem value="Rugby">Rugby</SelectItem>
                    <SelectItem value="Tennis">Tennis</SelectItem>
                    <SelectItem value="Swimming">Swimming</SelectItem>
                    <SelectItem value="Athletics">Athletics</SelectItem>
                    <SelectItem value="Badminton">Badminton</SelectItem>
                    <SelectItem value="Volleyball">Volleyball</SelectItem>
                    <SelectItem value="Hockey">Hockey</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Playing Experience <span className="text-red-500">*</span>
                </label>
                <Select value={formData.experience} onValueChange={(value) => handleChange('experience', value)} required>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Previous Academy / Club (if any)</label>
                <Input placeholder="Enter previous academy or club name" value={formData.previousClub} onChange={(e) => handleChange('previousClub', e.target.value)} className="border-[#2D6A4F]" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* E) Academy Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">E. Academy Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Batch (Pre-filled)</label>
                <Input value={formData.batch} disabled className="border-[#2D6A4F] bg-gray-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Jersey Size <span className="text-red-500">*</span>
                </label>
                <Select value={formData.jerseySize} onValueChange={(value) => handleChange('jerseySize', value)} required>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select Jersey Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS (Extra Small)</SelectItem>
                    <SelectItem value="S">S (Small)</SelectItem>
                    <SelectItem value="M">M (Medium)</SelectItem>
                    <SelectItem value="L">L (Large)</SelectItem>
                    <SelectItem value="XL">XL (Extra Large)</SelectItem>
                    <SelectItem value="XXL">XXL (Double Extra Large)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Shoe Size <span className="text-red-500">*</span>
                </label>
                <Select value={formData.shoeSize} onValueChange={(value) => handleChange('shoeSize', value)} required>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select Shoe Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US 6 / EU 38">US 6 / EU 38</SelectItem>
                    <SelectItem value="US 7 / EU 39">US 7 / EU 39</SelectItem>
                    <SelectItem value="US 8 / EU 40">US 8 / EU 40</SelectItem>
                    <SelectItem value="US 9 / EU 42">US 9 / EU 42</SelectItem>
                    <SelectItem value="US 10 / EU 43">US 10 / EU 43</SelectItem>
                    <SelectItem value="US 11 / EU 44">US 11 / EU 44</SelectItem>
                    <SelectItem value="US 12 / EU 45">US 12 / EU 45</SelectItem>
                    <SelectItem value="US 13 / EU 46">US 13 / EU 46</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* F) Medical & Safety */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">F. Medical & Safety</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Any Medical Conditions? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="hasMedical" value="Yes" checked={formData.hasMedical === 'Yes'} onChange={(e) => handleChange('hasMedical', e.target.value)} required className="w-4 h-4" />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="hasMedical" value="No" checked={formData.hasMedical === 'No'} onChange={(e) => handleChange('hasMedical', e.target.value)} required className="w-4 h-4" />
                    <span className="text-gray-700">No</span>
                  </label>
                </div>
              </div>
              {formData.hasMedical === 'Yes' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    If Yes, specify details <span className="text-red-500">*</span>
                  </label>
                  <Textarea placeholder="Please provide details about medical conditions" value={formData.medicalDetails} onChange={(e) => handleChange('medicalDetails', e.target.value)} required className="border-[#2D6A4F]" />
                </motion.div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Any Past Injuries? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="hasInjuries" value="Yes" checked={formData.hasInjuries === 'Yes'} onChange={(e) => handleChange('hasInjuries', e.target.value)} required className="w-4 h-4" />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="hasInjuries" value="No" checked={formData.hasInjuries === 'No'} onChange={(e) => handleChange('hasInjuries', e.target.value)} required className="w-4 h-4" />
                    <span className="text-gray-700">No</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Allergy Information (Optional)</label>
                <Textarea placeholder="List any allergies (e.g., food, medication, environmental)" value={formData.allergies} onChange={(e) => handleChange('allergies', e.target.value)} className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Blood Group (Optional)</label>
                <Select value={formData.bloodGroup} onValueChange={(value) => handleChange('bloodGroup', value)}>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* G) Parent / Guardian Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">G. Parent / Guardian Information (if minor)</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Parent/Guardian Name</label>
                <Input value={formData.parentName} onChange={(e) => handleChange('parentName', e.target.value)} className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Parent/Guardian Phone</label>
                <Input type="tel" placeholder="+61 123 456 789" value={formData.parentPhone} onChange={(e) => handleChange('parentPhone', e.target.value)} className="border-[#2D6A4F]" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Parent/Guardian Email</label>
                <Input type="email" value={formData.parentEmail} onChange={(e) => handleChange('parentEmail', e.target.value)} className="border-[#2D6A4F]" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* H) Declarations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">H. Declarations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <Checkbox checked={formData.consentEmergency} onCheckedChange={(checked) => handleChange('consentEmergency', checked)} required className="mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Consent for Emergency Medical Treatment <span className="text-red-500">*</span></p>
                  <p className="text-sm text-gray-600 mt-1">I authorize the academy to seek emergency medical treatment for my child if necessary.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <Checkbox checked={formData.consentRules} onCheckedChange={(checked) => handleChange('consentRules', checked)} required className="mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Agreement to Academy Rules & Code of Conduct <span className="text-red-500">*</span></p>
                  <p className="text-sm text-gray-600 mt-1">I agree to abide by the academy's rules, policies, and code of conduct.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <Checkbox checked={formData.consentMedia} onCheckedChange={(checked) => handleChange('consentMedia', checked)} required className="mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Media Consent (Photos/Videos) <span className="text-red-500">*</span></p>
                  <p className="text-sm text-gray-600 mt-1">I consent to the use of photos/videos for promotional purposes.</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-gray-700"><span className="font-semibold">Note:</span> All fields marked with <span className="text-red-500">*</span> are mandatory and must be completed before submission.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* I) Parental Consent & Liability Waiver */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader className="bg-gradient-to-r from-[#0D2818] to-[#1A4D2E] text-white rounded-t-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Australasia Sports Academy</h2>
                <p className="text-gray-300">(Ontario, Canada)</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <p className="text-gray-700">
                This consent form must be completed by a parent or legal guardian for all participants under 18 years of age. By signing this form, you acknowledge and agree to the terms and conditions outlined below for participation in the Australasia Sports Academy programs.
              </p>

              {/* Section 1: Participant Details */}
              <div className="p-4 rounded-lg bg-[#F0F4F0] border border-[#2D6A4F]">
                <h3 className="font-bold text-[#0A1F0A] mb-3">Section 1: Participant Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Child's Full Name:</span> {formData.firstName} {formData.lastName || 'Not provided'}</p>
                  <p><span className="font-medium">Date of Birth:</span> {formData.dob || 'Not provided'}</p>
                  <p><span className="font-medium">Program / Sport:</span> {formData.primarySport || 'Not specified'}</p>
                </div>
              </div>

              {/* Section 2: Consent & Assumption of Risk */}
              <div>
                <h3 className="font-bold text-[#0A1F0A] mb-3">Section 2: Consent & Assumption of Risk</h3>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <Checkbox checked={formData.waiverRisk} onCheckedChange={(checked) => handleChange('waiverRisk', checked)} required className="mt-1" />
                  <div>
                    <p className="text-sm text-gray-700">
                      I acknowledge and accept the risks involved in sports activities, including but not limited to physical injury, and I consent to my child's participation in the academy's programs. <span className="text-red-500">*</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Medical Authorization */}
              <div>
                <h3 className="font-bold text-[#0A1F0A] mb-3">Section 3: Medical Authorization</h3>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Known medical conditions / allergies (if any):</label>
                <Textarea placeholder="List any medical conditions or allergies (or type 'None')" value={formData.waiverMedical} onChange={(e) => handleChange('waiverMedical', e.target.value)} className="border-[#2D6A4F]" />
              </div>

              {/* Section 4: Release of Liability */}
              <div>
                <h3 className="font-bold text-[#0A1F0A] mb-3">Section 4: Release of Liability</h3>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <Checkbox checked={formData.waiverLiability} onCheckedChange={(checked) => handleChange('waiverLiability', checked)} required className="mt-1" />
                  <div>
                    <p className="text-sm text-gray-700">
                      I agree to the Release of Liability and waive any claims against Australasia Sports Academy, its staff, coaches, and volunteers for any injuries or damages that may occur during participation in academy activities. <span className="text-red-500">*</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Media Consent */}
              <div>
                <h3 className="font-bold text-[#0A1F0A] mb-3">Section 5: Media Consent (Optional)</h3>
                <p className="text-sm text-gray-700 mb-2">Do you consent to photographs or videos of your child being used for promotional purposes?</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="waiverMediaConsent" value="Yes" checked={formData.waiverMediaConsent === 'Yes'} onChange={(e) => handleChange('waiverMediaConsent', e.target.value)} className="w-4 h-4" />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="waiverMediaConsent" value="No" checked={formData.waiverMediaConsent === 'No'} onChange={(e) => handleChange('waiverMediaConsent', e.target.value)} className="w-4 h-4" />
                    <span className="text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {/* Section 6: Acknowledgment (Signature) */}
              <div>
                <h3 className="font-bold text-[#0A1F0A] mb-3">Section 6: Acknowledgment</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Parent / Guardian Name <span className="text-red-500">*</span>
                    </label>
                    <Input value={formData.waiverGuardianName} onChange={(e) => handleChange('waiverGuardianName', e.target.value)} required className="border-[#2D6A4F]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <Input type="date" value={formData.waiverDate} onChange={(e) => handleChange('waiverDate', e.target.value)} required className="border-[#2D6A4F]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Input type="tel" placeholder="+1 123 456 7890" value={formData.waiverPhone} onChange={(e) => handleChange('waiverPhone', e.target.value)} required className="border-[#2D6A4F]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input type="email" value={formData.waiverEmail} onChange={(e) => handleChange('waiverEmail', e.target.value)} required className="border-[#2D6A4F]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Digital Signature (Type your full name) <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      placeholder="Type your full name as signature" 
                      value={formData.waiverSignature} 
                      onChange={(e) => handleChange('waiverSignature', e.target.value)} 
                      required 
                      className="border-[#2D6A4F] font-['Brush_Script_MT',_cursive] text-xl"
                      style={{ fontFamily: 'cursive' }}
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#F0F4F0] border border-[#2D6A4F] mt-4">
                  <Checkbox checked={formData.waiverFinalAgreement} onCheckedChange={(checked) => handleChange('waiverFinalAgreement', checked)} required className="mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      I certify that I have read, understood, and agree to all the terms and conditions outlined in this Parental Consent & Liability Waiver form. <span className="text-red-500">*</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          <Button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] hover:from-[#F4D03F] hover:to-[#D4AF37] text-[#0A1F0A] text-lg py-6 font-bold">
            Submit Enrollment Form
          </Button>
        </motion.div>
      </form>

      {/* Footer */}
      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="max-w-4xl mx-auto mt-12 text-center text-gray-600 pb-8">
        <p className="mb-2">© 2026 Australasia Sports Academy. All rights reserved.</p>
        <p>For assistance, please contact: <span className="text-[#2D6A4F] underline cursor-pointer">admissions@australasiasports.edu</span></p>
      </motion.footer>
    </div>
  );
}