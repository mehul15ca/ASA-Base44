import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Building, Save, Download, Lock, Phone, Mail, Activity, Database } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [adminData, setAdminData] = useState({
    email: 'admin@sportsexcellence.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = () => {
    if (adminData.newPassword !== adminData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password changed successfully');
    setAdminData({ ...adminData, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEmailUpdate = () => {
    toast.success('Email updated successfully');
  };

  const handlePhoneUpdate = () => {
    toast.success('Phone number updated successfully');
  };

  const handleBackupDownload = () => {
    toast.success('Database backup download started');
  };

  return (
    <AdminLayout currentPageName="AdminSettings">
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 mt-1">Manage academy settings and preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* System Health Status */}
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Activity className="w-5 h-5 text-green-400" />
                System Health Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#0A1F0A]/50 rounded-lg">
                <span className="text-gray-300">Database Status</span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-medium">Healthy</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0A1F0A]/50 rounded-lg">
                <span className="text-gray-300">Server Status</span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-medium">Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0A1F0A]/50 rounded-lg">
                <span className="text-gray-300">Last Backup</span>
                <span className="text-gray-400 text-sm">2026-01-25 09:30 AM</span>
              </div>
            </CardContent>
          </Card>

          {/* Database Backup */}
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="w-5 h-5" />
                Database Backup
              </CardTitle>
              <CardDescription className="text-gray-400">Download a backup of your database</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleBackupDownload} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] w-full md:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Download Backup
              </Button>
            </CardContent>
          </Card>

          {/* Update Email */}
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="w-5 h-5" />
                Update Email Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adminEmail" className="text-gray-300">Email Address</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                  className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleEmailUpdate} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Save className="w-4 h-4 mr-2" />
                  Update Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Update Phone */}
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Phone className="w-5 h-5" />
                Update Mobile Number
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adminPhone" className="text-gray-300">Mobile Number</Label>
                <Input
                  id="adminPhone"
                  type="tel"
                  value={adminData.phone}
                  onChange={(e) => setAdminData({...adminData, phone: e.target.value})}
                  className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handlePhoneUpdate} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Save className="w-4 h-4 mr-2" />
                  Update Phone
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Lock className="w-5 h-5" />
                Change Password
              </CardTitle>
              <CardDescription className="text-gray-400">Update your admin password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-gray-300">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={adminData.currentPassword}
                  onChange={(e) => setAdminData({...adminData, currentPassword: e.target.value})}
                  className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-gray-300">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={adminData.newPassword}
                  onChange={(e) => setAdminData({...adminData, newPassword: e.target.value})}
                  className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={adminData.confirmPassword}
                  onChange={(e) => setAdminData({...adminData, confirmPassword: e.target.value})}
                  className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handlePasswordChange} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}