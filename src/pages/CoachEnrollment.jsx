import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Upload, X, CheckCircle2, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const nationalities = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentine", "Armenian", "Australian", "Austrian",
  "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese",
  "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese", "Burundian", "Cambodian",
  "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese",
  "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Dutch", "East Timorese",
  "Ecuadorean", "Egyptian", "Emirian", "English", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino",
  "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan",
  "Guinea-Bissauan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelander", "Indian", "Indonesian", "Iranian",
  "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan",
  "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian",
  "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan", "Malian", "Maltese", "Marshallese", "Mauritanian"
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function CoachEnrollment() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    coachId: 'ASA-COACH-2026-001',
    email: 'coach@australasiasports.com',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    gender: '',
    nationality: '',
    governmentId: '',
    profilePhoto: null,
    mobile: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    primarySport: '',
    coachingRole: '',
    coachingExperience: '',
    firstAidCertified: '',
    certifications: [],
    availableDays: [],
    preferredTime: '',
    bankName: '',
    transitNumber: '',
    institutionNumber: '',
    accountNumber: '',
    interacId: '',
    agreePolicy: false,
    agreeConfidentiality: false,
    agreeConduct: false,
  });

  const [errors, setErrors] = useState({});
  const [profilePhotoName, setProfilePhotoName] = useState('');
  const [certFileNames, setCertFileNames] = useState([]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoName(file.name);
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      setErrors(prev => ({ ...prev, profilePhoto: '' }));
    }
  };

  const removeProfilePhoto = () => {
    setProfilePhotoName('');
    setFormData(prev => ({ ...prev, profilePhoto: null }));
  };

  const handleCertificationsUpload = (e) => {
    const files = Array.from(e.target.files);
    setCertFileNames(prev => [...prev, ...files.map(f => f.name)]);
    setFormData(prev => ({ ...prev, certifications: [...prev.certifications, ...files] }));
  };

  const removeCertification = (index) => {
    setCertFileNames(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));
  };

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
    setErrors(prev => ({ ...prev, availableDays: '' }));
  };

  const validate = () => {
    const newErrors = {};

    // Password validation
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    // Personal Information
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.governmentId) newErrors.governmentId = 'Government ID is required';
    if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo is required';

    // Contact Information
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.province) newErrors.province = 'Province is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';

    // Professional Details
    if (!formData.primarySport) newErrors.primarySport = 'Primary sport is required';
    if (!formData.coachingRole) newErrors.coachingRole = 'Coaching role is required';
    if (!formData.coachingExperience) newErrors.coachingExperience = 'Coaching experience is required';
    if (!formData.firstAidCertified) newErrors.firstAidCertified = 'This field is required';

    // Availability
    if (formData.availableDays.length === 0) newErrors.availableDays = 'Please select at least one available day';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time slots is required';

    // Financial Information
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.transitNumber) newErrors.transitNumber = 'Transit number is required';
    if (!formData.institutionNumber) newErrors.institutionNumber = 'Institution number is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!formData.interacId) newErrors.interacId = 'Interac ID is required';

    // Agreements
    if (!formData.agreePolicy || !formData.agreeConfidentiality || !formData.agreeConduct) {
      newErrors.agreements = 'All agreements must be accepted to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Data:', {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : null,
        availableDays: formData.availableDays,
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstError = document.querySelector('.text-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      coachId: 'ASA-COACH-2026-001',
      email: 'coach@australasiasports.com',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      gender: '',
      nationality: '',
      governmentId: '',
      profilePhoto: null,
      mobile: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      primarySport: '',
      coachingRole: '',
      coachingExperience: '',
      firstAidCertified: '',
      certifications: [],
      availableDays: [],
      preferredTime: '',
      bankName: '',
      transitNumber: '',
      institutionNumber: '',
      accountNumber: '',
      interacId: '',
      agreePolicy: false,
      agreeConfidentiality: false,
      agreeConduct: false,
    });
    setErrors({});
    setProfilePhotoName('');
    setCertFileNames([]);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-white border-[#2D6A4F] shadow-2xl">
            <CardContent className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </motion.div>
              <h2 className="text-3xl font-bold text-[#0A1F0A] mb-4">Your profile has been successfully created.</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Thank you for applying to join Australasia Sports Academy. We appreciate your interest in becoming part of our coaching team. 
                We will review your application and get back to you within 3–5 business days.
              </p>
              <Button onClick={resetForm} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] hover:from-[#F4D03F] hover:to-[#D4AF37] text-[#0A1F0A] text-lg px-8 py-6">
                Submit Another Application
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-6 flex justify-center items-center"
      >
        <div className="w-48 h-32 flex items-center justify-center overflow-hidden">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696e66398d7900c2acfeec9e/b31bf63c7_ChatGPTImageJan13202607_16_18PM.png" 
            alt="ASA Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* Authentication */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">Authentication</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Coach ID <span className="text-red-500">*</span></label>
                <Input value={formData.coachId} disabled className="border-[#2D6A4F] bg-gray-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address <span className="text-red-500">*</span></label>
                <Input type="email" value={formData.email} disabled className="border-[#2D6A4F] bg-gray-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Password <span className="text-red-500">*</span></label>
                <Input type="password" placeholder="Enter password" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} className="border-[#2D6A4F]" />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Re-Enter Password <span className="text-red-500">*</span></label>
                <Input type="password" placeholder="Re-enter password" value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} className="border-[#2D6A4F]" />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* A. Personal Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">A. Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">First Name <span className="text-red-500">*</span></label>
                <Input placeholder="Enter first name" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className="border-[#2D6A4F]" />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name <span className="text-red-500">*</span></label>
                <Input placeholder="Enter last name" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} className="border-[#2D6A4F]" />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date of Birth <span className="text-red-500">*</span></label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal border-[#2D6A4F]">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? format(formData.dateOfBirth, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={formData.dateOfBirth} onSelect={(date) => handleChange('dateOfBirth', date)} initialFocus />
                  </PopoverContent>
                </Popover>
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Gender <span className="text-red-500">*</span></label>
                <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Nationality <span className="text-red-500">*</span></label>
                <Select value={formData.nationality} onValueChange={(value) => handleChange('nationality', value)}>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {nationalities.map(nat => (
                      <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Government Issued ID Number <span className="text-red-500">*</span></label>
                <Input placeholder="Enter ID number" value={formData.governmentId} onChange={(e) => handleChange('governmentId', e.target.value)} className="border-[#2D6A4F]" />
                {errors.governmentId && <p className="text-red-500 text-sm mt-1">{errors.governmentId}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Profile Photo <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-[#2D6A4F] rounded-lg p-8 text-center hover:border-[#40916C] transition-colors cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleProfilePhotoUpload} className="hidden" id="profilePhoto" />
                  <label htmlFor="profilePhoto" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-[#2D6A4F] mx-auto mb-3" />
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                  </label>
                </div>
                {profilePhotoName && (
                  <div className="mt-3 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{profilePhotoName}</span>
                    <Button type="button" size="icon" variant="ghost" onClick={removeProfilePhoto} className="text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {profilePhotoName && <p className="text-sm text-[#2D6A4F] mt-2">1 file(s) selected</p>}
                {errors.profilePhoto && <p className="text-red-500 text-sm mt-1">{errors.profilePhoto}</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* B. Contact Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">B. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Mobile Number <span className="text-red-500">*</span></label>
                <Input type="tel" placeholder="+1 XXX XXX XXXX" value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value)} className="border-[#2D6A4F]" />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Current Address <span className="text-red-500">*</span></label>
                <Input placeholder="Street address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className="border-[#2D6A4F]" />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">City <span className="text-red-500">*</span></label>
                <Input placeholder="City" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className="border-[#2D6A4F]" />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Province <span className="text-red-500">*</span></label>
                <Input placeholder="Province/State" value={formData.province} onChange={(e) => handleChange('province', e.target.value)} className="border-[#2D6A4F]" />
                {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Postal Code <span className="text-red-500">*</span></label>
                <Input placeholder="Postal code" value={formData.postalCode} onChange={(e) => handleChange('postalCode', e.target.value)} className="border-[#2D6A4F]" />
                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* C. Professional Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">C. Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Primary Sport <span className="text-red-500">*</span></label>
                <Select value={formData.primarySport} onValueChange={(value) => handleChange('primarySport', value)}>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Football/Soccer">Football/Soccer</SelectItem>
                    <SelectItem value="Rugby">Rugby</SelectItem>
                    <SelectItem value="Cricket">Cricket</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                    <SelectItem value="Tennis">Tennis</SelectItem>
                    <SelectItem value="Swimming">Swimming</SelectItem>
                    <SelectItem value="Athletics">Athletics</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.primarySport && <p className="text-red-500 text-sm mt-1">{errors.primarySport}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Coaching Role <span className="text-red-500">*</span></label>
                <Select value={formData.coachingRole} onValueChange={(value) => handleChange('coachingRole', value)}>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Head Coach">Head Coach</SelectItem>
                    <SelectItem value="Assistant Coach">Assistant Coach</SelectItem>
                    <SelectItem value="Fitness Coach">Fitness Coach</SelectItem>
                    <SelectItem value="Specialist Coach">Specialist Coach</SelectItem>
                  </SelectContent>
                </Select>
                {errors.coachingRole && <p className="text-red-500 text-sm mt-1">{errors.coachingRole}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Coaching Experience (Years) <span className="text-red-500">*</span></label>
                <Input type="number" min="0" placeholder="0" value={formData.coachingExperience} onChange={(e) => handleChange('coachingExperience', e.target.value)} className="border-[#2D6A4F]" />
                {errors.coachingExperience && <p className="text-red-500 text-sm mt-1">{errors.coachingExperience}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">First Aid / CPR Certified? <span className="text-red-500">*</span></label>
                <Select value={formData.firstAidCertified} onValueChange={(value) => handleChange('firstAidCertified', value)}>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.firstAidCertified && <p className="text-red-500 text-sm mt-1">{errors.firstAidCertified}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Coaching Certifications (Optional)</label>
                <div className="border-2 border-dashed border-[#2D6A4F] rounded-lg p-8 text-center hover:border-[#40916C] transition-colors cursor-pointer">
                  <input type="file" accept=".pdf,.doc,.docx" multiple onChange={handleCertificationsUpload} className="hidden" id="certifications" />
                  <label htmlFor="certifications" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-[#2D6A4F] mx-auto mb-3" />
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                  </label>
                </div>
                {certFileNames.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {certFileNames.map((name, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{name}</span>
                        <Button type="button" size="icon" variant="ghost" onClick={() => removeCertification(index)} className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {certFileNames.length > 0 && <p className="text-sm text-[#2D6A4F] mt-2">{certFileNames.length} file(s) selected</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* D. Availability & Work Preference */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">D. Availability & Work Preference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Available Days <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {days.map(day => (
                    <Button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      variant={formData.availableDays.includes(day) ? 'default' : 'outline'}
                      className={formData.availableDays.includes(day) 
                        ? 'bg-[#D4AF37] hover:bg-[#F4D03F] text-[#0A1F0A] border-[#D4AF37]' 
                        : 'border-[#2D6A4F] text-gray-700 hover:bg-gray-100'
                      }
                    >
                      {day.substring(0, 3)}
                    </Button>
                  ))}
                </div>
                {errors.availableDays && <p className="text-red-500 text-sm mt-2">{errors.availableDays}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Time Slots <span className="text-red-500">*</span></label>
                <Select value={formData.preferredTime} onValueChange={(value) => handleChange('preferredTime', value)}>
                  <SelectTrigger className="border-[#2D6A4F]">
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning (6 AM - 12 PM)">Morning (6 AM - 12 PM)</SelectItem>
                    <SelectItem value="Afternoon (12 PM - 6 PM)">Afternoon (12 PM - 6 PM)</SelectItem>
                    <SelectItem value="Evening (6 PM - 10 PM)">Evening (6 PM - 10 PM)</SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* E. Financial Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">E. Financial Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Bank Name <span className="text-red-500">*</span></label>
                <Input placeholder="Bank name" value={formData.bankName} onChange={(e) => handleChange('bankName', e.target.value)} className="border-[#2D6A4F]" />
                {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Transit Number <span className="text-red-500">*</span></label>
                <Input placeholder="XXXXX" value={formData.transitNumber} onChange={(e) => handleChange('transitNumber', e.target.value)} className="border-[#2D6A4F]" />
                {errors.transitNumber && <p className="text-red-500 text-sm mt-1">{errors.transitNumber}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Institution Number <span className="text-red-500">*</span></label>
                <Input placeholder="XXX" value={formData.institutionNumber} onChange={(e) => handleChange('institutionNumber', e.target.value)} className="border-[#2D6A4F]" />
                {errors.institutionNumber && <p className="text-red-500 text-sm mt-1">{errors.institutionNumber}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Account Number <span className="text-red-500">*</span></label>
                <Input placeholder="XXXXXXXXXXXX" value={formData.accountNumber} onChange={(e) => handleChange('accountNumber', e.target.value)} className="border-[#2D6A4F]" />
                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Interac ID <span className="text-red-500">*</span></label>
                <Input placeholder="email@example.com or phone number" value={formData.interacId} onChange={(e) => handleChange('interacId', e.target.value)} className="border-[#2D6A4F]" />
                {errors.interacId && <p className="text-red-500 text-sm mt-1">{errors.interacId}</p>}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* F. Agreements & Consent Forms */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-white border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-[#0A1F0A]">F. Agreements & Consent Forms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Agreement 1 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3">Academy Policy Agreement (Coach)</h3>
                <div className="bg-gray-50 rounded p-4 max-h-40 overflow-y-auto mb-3 text-sm text-gray-700">
                  <p className="mb-2">
                    As a coach at Australasia Sports Academy, you are expected to maintain the highest standards of professionalism, integrity, and dedication. 
                    This includes adhering to all academy policies, including but not limited to punctuality, professional conduct, dress code, and communication protocols.
                  </p>
                  <p>
                    You acknowledge that you will participate in required training sessions, maintain accurate records of student progress, and contribute to the overall 
                    development and success of the academy's programs. Violation of academy policies may result in disciplinary action or termination of employment.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox checked={formData.agreePolicy} onCheckedChange={(checked) => handleChange('agreePolicy', checked)} className="mt-1" />
                  <label className="text-sm text-gray-700 cursor-pointer">
                    <span className="text-red-500">*</span> I have read and agree to the Academy Policy Agreement
                  </label>
                </div>
              </div>

              {/* Agreement 2 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3">Confidentiality & Privacy Agreement (Coach)</h3>
                <div className="bg-gray-50 rounded p-4 max-h-40 overflow-y-auto mb-3 text-sm text-gray-700">
                  <p className="mb-2">
                    You agree to maintain strict confidentiality regarding all student information, including personal details, academic records, medical information, 
                    and performance evaluations. This information must not be shared with unauthorized parties or used for any purpose other than your coaching duties.
                  </p>
                  <p>
                    You acknowledge that all academy materials, training methods, and proprietary information are confidential and may not be reproduced, shared, or 
                    used outside of your employment with the academy. Breach of this confidentiality agreement may result in legal action and immediate termination.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox checked={formData.agreeConfidentiality} onCheckedChange={(checked) => handleChange('agreeConfidentiality', checked)} className="mt-1" />
                  <label className="text-sm text-gray-700 cursor-pointer">
                    <span className="text-red-500">*</span> I have read and accept the Confidentiality & Privacy Agreement
                  </label>
                </div>
              </div>

              {/* Agreement 3 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3">Code of Conduct Agreement (Coach)</h3>
                <div className="bg-gray-50 rounded p-4 max-h-40 overflow-y-auto mb-3 text-sm text-gray-700">
                  <p className="mb-2">
                    As a representative of Australasia Sports Academy, you agree to conduct yourself in a manner that reflects positively on the institution at all times. 
                    This includes treating all students, parents, colleagues, and visitors with respect, maintaining professional boundaries, and avoiding any behavior 
                    that could be considered inappropriate, discriminatory, or harmful.
                  </p>
                  <p>
                    You commit to creating a safe, inclusive, and supportive environment for all students. This includes zero tolerance for bullying, harassment, 
                    discrimination, or any form of abuse. You agree to report any concerns regarding student safety or wellbeing to the appropriate authorities immediately.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox checked={formData.agreeConduct} onCheckedChange={(checked) => handleChange('agreeConduct', checked)} className="mt-1" />
                  <label className="text-sm text-gray-700 cursor-pointer">
                    <span className="text-red-500">*</span> I have read and accept the Code of Conduct Agreement
                  </label>
                </div>
              </div>

              {errors.agreements && <p className="text-red-500 text-sm">{errors.agreements}</p>}
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex justify-end">
          <Button type="submit" className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] hover:from-[#F4D03F] hover:to-[#D4AF37] text-[#0A1F0A] text-lg px-12 py-6 font-bold">
            Submit Enrollment
          </Button>
        </motion.div>
      </form>
    </div>
  );
}