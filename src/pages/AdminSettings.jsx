import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Building, Bell, Shield, Mail, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [academySettings, setAcademySettings] = useState({
    name: 'Sports Excellence Academy',
    email: 'info@sportsexcellence.com',
    phone: '+91 98765 43210',
    address: '123 Sports Avenue, City, State - 123456',
    website: 'www.sportsexcellence.com'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    studentAbsenceAlert: true,
    feeReminderAlert: true,
    newEnquiryAlert: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90'
  });

  const handleSaveAcademySettings = () => {
    toast.success('Academy settings saved successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  const handleSaveSecuritySettings = () => {
    toast.success('Security settings updated');
  };

  return (
    <AdminLayout currentPageName="AdminSettings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Manage academy settings and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="academy" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 gap-2">
            <TabsTrigger value="academy" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Academy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academy">
            <Card>
              <CardHeader>
                <CardTitle>Academy Information</CardTitle>
                <CardDescription>Update your academy details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="academyName">Academy Name</Label>
                  <Input
                    id="academyName"
                    value={academySettings.name}
                    onChange={(e) => setAcademySettings({...academySettings, name: e.target.value})}
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={academySettings.email}
                      onChange={(e) => setAcademySettings({...academySettings, email: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={academySettings.phone}
                      onChange={(e) => setAcademySettings({...academySettings, phone: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={academySettings.address}
                    onChange={(e) => setAcademySettings({...academySettings, address: e.target.value})}
                    className="mt-2"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={academySettings.website}
                    onChange={(e) => setAcademySettings({...academySettings, website: e.target.value})}
                    className="mt-2"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveAcademySettings} className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotif" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500 mt-1">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotif" className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-gray-500 mt-1">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotif"
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                  />
                </div>
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Alert Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="absenceAlert" className="text-base">Student Absence Alerts</Label>
                        <p className="text-sm text-gray-500 mt-1">Get notified when students are absent</p>
                      </div>
                      <Switch
                        id="absenceAlert"
                        checked={notifications.studentAbsenceAlert}
                        onCheckedChange={(checked) => setNotifications({...notifications, studentAbsenceAlert: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="feeAlert" className="text-base">Fee Reminder Alerts</Label>
                        <p className="text-sm text-gray-500 mt-1">Get notified about pending fees</p>
                      </div>
                      <Switch
                        id="feeAlert"
                        checked={notifications.feeReminderAlert}
                        onCheckedChange={(checked) => setNotifications({...notifications, feeReminderAlert: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enquiryAlert" className="text-base">New Enquiry Alerts</Label>
                        <p className="text-sm text-gray-500 mt-1">Get notified about new enquiries</p>
                      </div>
                      <Switch
                        id="enquiryAlert"
                        checked={notifications.newEnquiryAlert}
                        onCheckedChange={(checked) => setNotifications({...notifications, newEnquiryAlert: checked})}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveNotifications} className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security and access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor" className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                    className="mt-2 max-w-xs"
                  />
                  <p className="text-sm text-gray-500 mt-2">Automatically log out after period of inactivity</p>
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                    className="mt-2 max-w-xs"
                  />
                  <p className="text-sm text-gray-500 mt-2">Require password change after specified days</p>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveSecuritySettings} className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">
                    <Save className="w-4 h-4 mr-2" />
                    Update Security
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>Configure email templates and signatures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="emailSignature">Email Signature</Label>
                  <Textarea
                    id="emailSignature"
                    placeholder="Enter your email signature..."
                    className="mt-2"
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="replyTo">Default Reply-To Email</Label>
                  <Input
                    id="replyTo"
                    type="email"
                    placeholder="reply@sportsexcellence.com"
                    className="mt-2"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">
                    <Save className="w-4 h-4 mr-2" />
                    Save Email Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}