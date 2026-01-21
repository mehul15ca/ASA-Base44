import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Database, Mail, Lock, Globe, Save } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

export default function SuperAdminSettings() {
  const [settings, setSettings] = useState({
    // General
    siteName: 'Sports Academy',
    siteUrl: 'https://academy.example.com',
    maintenanceMode: false,
    
    // Security
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    maxLoginAttempts: '5',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    
    // Database
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: '30',
    
    // Email
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'notifications@academy.com',
    emailFrom: 'Sports Academy <no-reply@academy.com>',
  });

  const handleSave = (section) => {
    toast.success(`${section} settings saved successfully`);
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SuperAdminLayout currentPageName="SuperAdminSettings">
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
          <p className="text-gray-400">Configure system-wide settings and preferences</p>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="w-full justify-start bg-[#0A1F0A] border-b border-[#2D6A4F]/50 rounded-none p-0">
                <TabsTrigger value="general" className="data-[state=active]:bg-[#2D6A4F]/50">
                  <Globe className="w-4 h-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-[#2D6A4F]/50">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-[#2D6A4F]/50">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="database" className="data-[state=active]:bg-[#2D6A4F]/50">
                  <Database className="w-4 h-4 mr-2" />
                  Database
                </TabsTrigger>
                <TabsTrigger value="email" className="data-[state=active]:bg-[#2D6A4F]/50">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Site Name</Label>
                    <Input
                      value={settings.siteName}
                      onChange={(e) => handleChange('siteName', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Site URL</Label>
                    <Input
                      value={settings.siteUrl}
                      onChange={(e) => handleChange('siteUrl', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Maintenance Mode</Label>
                      <p className="text-sm text-gray-500 mt-1">Temporarily disable site for maintenance</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleChange('maintenanceMode', checked)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('General')} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500 mt-1">Require 2FA for all admin users</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleChange('twoFactorAuth', checked)}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Password Expiry (days)</Label>
                    <Input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => handleChange('passwordExpiry', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Max Login Attempts</Label>
                    <Input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleChange('maxLoginAttempts', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('Security')} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications" className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Email Notifications</Label>
                      <p className="text-sm text-gray-500 mt-1">Send system notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleChange('emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">SMS Notifications</Label>
                      <p className="text-sm text-gray-500 mt-1">Send system notifications via SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => handleChange('smsNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Push Notifications</Label>
                      <p className="text-sm text-gray-500 mt-1">Send push notifications to mobile devices</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleChange('pushNotifications', checked)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('Notifications')} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </TabsContent>

              {/* Database Settings */}
              <TabsContent value="database" className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Automatic Backups</Label>
                      <p className="text-sm text-gray-500 mt-1">Enable scheduled database backups</p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleChange('autoBackup', checked)}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Backup Frequency</Label>
                    <Input
                      value={settings.backupFrequency}
                      onChange={(e) => handleChange('backupFrequency', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                      placeholder="e.g., daily, weekly"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Retention Period (days)</Label>
                    <Input
                      type="number"
                      value={settings.retentionDays}
                      onChange={(e) => handleChange('retentionDays', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('Database')} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </TabsContent>

              {/* Email Settings */}
              <TabsContent value="email" className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">SMTP Host</Label>
                    <Input
                      value={settings.smtpHost}
                      onChange={(e) => handleChange('smtpHost', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">SMTP Port</Label>
                    <Input
                      value={settings.smtpPort}
                      onChange={(e) => handleChange('smtpPort', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">SMTP Username</Label>
                    <Input
                      value={settings.smtpUser}
                      onChange={(e) => handleChange('smtpUser', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Email From Address</Label>
                    <Input
                      value={settings.emailFrom}
                      onChange={(e) => handleChange('emailFrom', e.target.value)}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('Email')} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </SuperAdminLayout>
  );
}