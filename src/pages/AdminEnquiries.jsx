import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Phone, Mail, MessageSquare, Clock, CheckCircle, XCircle, Calendar, User } from 'lucide-react';

export default function AdminEnquiries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [demoBookings] = useState([
    {
      id: 1,
      firstName: 'Rajesh',
      lastName: 'Verma',
      phone: '+91 98765 43210',
      email: 'rajesh.verma@email.com',
      dateOfBirth: '2014-05-15',
      program: 'Cricket Training',
      level: 'Beginner',
      preferredSchedule: 'Morning (6AM - 12PM)',
      preferredCoach: '',
      date: '2026-01-22',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 2,
      firstName: 'Sneha',
      lastName: 'Reddy',
      phone: '+91 87654 32109',
      email: 'sneha.reddy@email.com',
      dateOfBirth: '2012-08-20',
      program: 'Baseball Academy',
      level: 'Intermediate',
      preferredSchedule: 'Evening (5PM - 9PM)',
      preferredCoach: 'Sarah Johnson',
      date: '2026-01-21',
      status: 'Contacted',
      priority: 'Medium'
    },
    {
      id: 3,
      firstName: 'Arun',
      lastName: 'Kumar',
      phone: '+91 76543 21098',
      email: 'arun.k@email.com',
      dateOfBirth: '2015-03-10',
      program: 'Sports Yoga',
      level: 'Beginner',
      preferredSchedule: 'Weekend Only',
      preferredCoach: '',
      date: '2026-01-20',
      status: 'Converted',
      priority: 'Low'
    }
  ]);

  const [contactForms] = useState([
    {
      id: 1,
      name: 'Meera Patel',
      phone: '+91 65432 10987',
      email: 'meera.patel@email.com',
      subject: 'Programs Info',
      message: 'Interested in badminton coaching. Can I visit the academy tomorrow?',
      date: '2026-01-22',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 2,
      name: 'David Wong',
      phone: '+1 (647) 555-7890',
      email: 'david.wong@email.com',
      subject: 'General Inquiry',
      message: 'What are the age requirements for your programs? My son is 5 years old.',
      date: '2026-01-21',
      status: 'Contacted',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Priya Shah',
      phone: '+91 55443 32211',
      email: 'priya.shah@email.com',
      subject: 'Registration',
      message: 'I would like to register my daughter for tennis lessons. Please send me more details.',
      date: '2026-01-20',
      status: 'Converted',
      priority: 'High'
    }
  ]);

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.sport.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    Pending: enquiries.filter(e => e.status === 'Pending').length,
    Contacted: enquiries.filter(e => e.status === 'Contacted').length,
    Converted: enquiries.filter(e => e.status === 'Converted').length
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-500';
      case 'Contacted': return 'bg-blue-500';
      case 'Converted': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <AdminLayout currentPageName="AdminEnquiries">
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Enquiries</h1>
            <p className="text-gray-400 mt-1">Manage admission enquiries and leads</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Total Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{enquiries.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">{statusCounts.Pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contacted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">{statusCounts.Contacted}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Converted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{statusCounts.Converted}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search enquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['All', 'Pending', 'Contacted', 'Converted'].map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={filterStatus === status ? 'default' : 'outline'}
                    onClick={() => setFilterStatus(status)}
                    className={filterStatus === status ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]' : 'border-[#40916C] text-gray-300'}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="border border-[#2D6A4F]/50 bg-[#0A1F0A] rounded-lg p-4 hover:bg-[#2D6A4F]/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-semibold text-white">{enquiry.name}</h3>
                        <Badge className={getStatusColor(enquiry.status)}>{enquiry.status}</Badge>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(enquiry.priority)} border-[#2D6A4F]`}>
                          {enquiry.priority} Priority
                        </Badge>
                      </div>
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Phone className="w-3 h-3" />
                          <span>{enquiry.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Mail className="w-3 h-3" />
                          <span>{enquiry.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MessageSquare className="w-3 h-3" />
                          <span className="font-medium">Sport: {enquiry.sport}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 bg-[#0D2818] p-3 rounded-lg border border-[#2D6A4F]/30">{enquiry.message}</p>
                      <div className="mt-3 text-xs text-gray-500">{enquiry.date}</div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90 ml-4"
                          onClick={() => setSelectedEnquiry(enquiry)}
                        >
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
                        <DialogHeader>
                          <DialogTitle className="text-white">Manage Enquiry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium text-gray-400">Name</label>
                            <p className="text-sm text-white mt-1">{enquiry.name}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-400">Phone</label>
                              <p className="text-sm text-white mt-1">{enquiry.phone}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-400">Email</label>
                              <p className="text-sm text-white mt-1">{enquiry.email}</p>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-400">Sport Interest</label>
                            <p className="text-sm text-white mt-1">{enquiry.sport}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-400">Message</label>
                            <p className="text-sm text-gray-300 mt-1 p-3 bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg">{enquiry.message}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-400 mb-2 block">Update Status</label>
                            <div className="flex gap-2 flex-wrap">
                              <Button size="sm" variant="outline" className="flex-1 border-[#40916C] text-gray-300">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 border-[#40916C] text-gray-300">
                                <Phone className="w-3 h-3 mr-1" />
                                Contacted
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 border-[#40916C] text-gray-300">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Converted
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-400 mb-2 block">Add Notes</label>
                            <Textarea
                              placeholder="Add follow-up notes..."
                              rows={3}
                              className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                            />
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button variant="outline" className="border-[#40916C] text-gray-300">Close</Button>
                            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}