import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Building, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [academySettings, setAcademySettings] = useState({
    name: 'Sports Excellence Academy',
    email: 'info@sportsexcellence.com',
    phone: '+91 98765 43210',
    address: '123 Sports Avenue, City, State - 123456',
    website: 'www.sportsexcellence.com'
  });

  const handleSaveAcademySettings = () => {
    toast.success('Academy settings saved successfully');
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

        <Tabs defaultValue="academy" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-1 gap-2 bg-[#1A4D2E] border-[#2D6A4F]">
            <TabsTrigger value="academy" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#F4D03F] data-[state=active]:text-[#0A1F0A] text-gray-300">
              <Building className="w-4 h-4" />
              Academy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academy">
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
              <CardHeader>
                <CardTitle className="text-white">Academy Information</CardTitle>
                <CardDescription className="text-gray-400">Update your academy details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="academyName" className="text-gray-300">Academy Name</Label>
                  <Input
                    id="academyName"
                    value={academySettings.name}
                    onChange={(e) => setAcademySettings({...academySettings, name: e.target.value})}
                    className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={academySettings.email}
                      onChange={(e) => setAcademySettings({...academySettings, email: e.target.value})}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                    <Input
                      id="phone"
                      value={academySettings.phone}
                      onChange={(e) => setAcademySettings({...academySettings, phone: e.target.value})}
                      className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-gray-300">Address</Label>
                  <Textarea
                    id="address"
                    value={academySettings.address}
                    onChange={(e) => setAcademySettings({...academySettings, address: e.target.value})}
                    className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="website" className="text-gray-300">Website</Label>
                  <Input
                    id="website"
                    value={academySettings.website}
                    onChange={(e) => setAcademySettings({...academySettings, website: e.target.value})}
                    className="mt-2 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveAcademySettings} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
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