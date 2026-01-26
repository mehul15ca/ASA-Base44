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

  const filteredDemoBookings = demoBookings.filter(e => {
    const matchesSearch = e.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.program.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredContactForms = contactForms.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const demoStatusCounts = {
    Pending: demoBookings.filter(e => e.status === 'Pending').length,
    Contacted: demoBookings.filter(e => e.status === 'Contacted').length,
    Converted: demoBookings.filter(e => e.status === 'Converted').length
  };

  const contactStatusCounts = {
    Pending: contactForms.filter(e => e.status === 'Pending').length,
    Contacted: contactForms.filter(e => e.status === 'Contacted').length,
    Converted: contactForms.filter(e => e.status === 'Converted').length
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
      <div className="p-4 md:p-8 space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Enquiries</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">Manage demo bookings and contact forms</p>
        </div>

        <Tabs defaultValue="demo" className="space-y-4 md:space-y-6">
          <TabsList className="bg-[#0D2818] border border-[#2D6A4F]/50 w-full">
            <TabsTrigger value="demo" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#F4D03F] data-[state=active]:text-[#0A1F0A] text-xs md:text-sm flex-1">
              <Calendar className="w-2.5 h-2.5 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Demo Class Bookings</span>
              <span className="md:hidden">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#F4D03F] data-[state=active]:text-[#0A1F0A] text-xs md:text-sm flex-1">
              <MessageSquare className="w-2.5 h-2.5 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Contact Us Forms</span>
              <span className="md:hidden">Forms</span>
            </TabsTrigger>
          </TabsList>

          {/* Demo Class Bookings Tab */}
          <TabsContent value="demo" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden md:inline">Total Bookings</span>
                    <span className="md:hidden">Total</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                  <p className="text-xl md:text-3xl font-bold text-white">{demoBookings.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                  <p className="text-xl md:text-3xl font-bold text-yellow-500">{demoStatusCounts.Pending}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                    <Phone className="w-3 h-3 md:w-4 md:h-4" />
                    Contacted
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                  <p className="text-xl md:text-3xl font-bold text-blue-500">{demoStatusCounts.Contacted}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                    Converted
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                  <p className="text-xl md:text-3xl font-bold text-green-500">{demoStatusCounts.Converted}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search bookings..."
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
              <CardContent className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {filteredDemoBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-[#2D6A4F]/50 bg-[#0A1F0A] rounded-lg p-3 md:p-4 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                            <h3 className="font-semibold text-white text-sm md:text-base">{booking.firstName} {booking.lastName}</h3>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(booking.priority)} border-[#2D6A4F]`}>
                              {booking.priority} Priority
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-6 gap-y-1 mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Phone className="w-3 h-3" />
                              <span>{booking.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Mail className="w-3 h-3" />
                              <span>{booking.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <User className="w-3 h-3" />
                              <span className="font-medium">DOB: {booking.dateOfBirth}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span className="font-medium">Program: {booking.program}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <span className="font-medium">Level: {booking.level}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>{booking.preferredSchedule}</span>
                            </div>
                            {booking.preferredCoach && (
                              <div className="flex items-center gap-2 text-sm text-gray-400 col-span-2">
                                <span className="font-medium">Preferred Coach: {booking.preferredCoach}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-3 text-xs text-gray-500">{booking.date}</div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90 flex-shrink-0 h-8 md:h-9 text-xs md:text-sm"
                              onClick={() => setSelectedEnquiry(booking)}
                            >
                              Manage
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] p-4 md:p-6 max-w-sm md:max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-white">Manage Demo Booking</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 md:space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">First Name</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{booking.firstName}</p>
                                </div>
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">Last Name</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{booking.lastName}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">Phone</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{booking.phone}</p>
                                </div>
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">Email</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{booking.email}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">DOB</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{booking.dateOfBirth}</p>
                                </div>
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">Program</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{booking.program}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">Level</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{booking.level}</p>
                                </div>
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">Schedule</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{booking.preferredSchedule}</p>
                                </div>
                              </div>
                              {booking.preferredCoach && (
                                <div>
                                  <label className="text-sm font-medium text-gray-400">Preferred Coach</label>
                                  <p className="text-sm text-white mt-1">{booking.preferredCoach}</p>
                                </div>
                              )}
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
          </TabsContent>

          {/* Contact Us Forms Tab */}
          <TabsContent value="contact" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                    <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden md:inline">Total Forms</span>
                    <span className="md:hidden">Total</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                  <p className="text-xl md:text-3xl font-bold text-white">{contactForms.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                  <p className="text-xl md:text-3xl font-bold text-yellow-500">{contactStatusCounts.Pending}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                    <Phone className="w-3 h-3 md:w-4 md:h-4" />
                    Contacted
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                  <p className="text-xl md:text-3xl font-bold text-blue-500">{contactStatusCounts.Contacted}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
                <CardHeader className="p-3 md:p-6">
                  <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                    Converted
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
                  <p className="text-xl md:text-3xl font-bold text-green-500">{contactStatusCounts.Converted}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col gap-2 md:gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
                    <Input
                      placeholder="Search forms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm"
                    />
                  </div>
                  <div className="flex gap-1 md:gap-2 flex-wrap">
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
              <CardContent className="p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {filteredContactForms.map((form) => (
                    <div
                      key={form.id}
                      className="border border-[#2D6A4F]/50 bg-[#0A1F0A] rounded-lg p-3 md:p-4 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                            <h3 className="font-semibold text-white text-sm md:text-base">{form.name}</h3>
                            <Badge className={getStatusColor(form.status)}>{form.status}</Badge>
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(form.priority)} border-[#2D6A4F]`}>
                              {form.priority} Priority
                            </Badge>
                          </div>
                          <div className="space-y-1 mb-2 md:mb-3">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                              <Phone className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                              <span className="truncate">{form.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                              <Mail className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                              <span className="truncate">{form.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                              <MessageSquare className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0" />
                              <span className="font-medium line-clamp-1">Subject: {form.subject}</span>
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-gray-300 bg-[#0D2818] p-2 md:p-3 rounded-lg border border-[#2D6A4F]/30 line-clamp-2">{form.message}</p>
                          <div className="mt-3 text-xs text-gray-500">{form.date}</div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90 flex-shrink-0 h-8 md:h-9 text-xs md:text-sm"
                              onClick={() => setSelectedEnquiry(form)}
                            >
                              Manage
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] p-4 md:p-6 max-w-sm md:max-w-lg max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-white text-base md:text-lg">Manage Contact Form</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 md:space-y-4 mt-4">
                              <div>
                                <label className="text-xs md:text-sm font-medium text-gray-400">Name</label>
                                <p className="text-xs md:text-sm text-white mt-1">{form.name}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">Phone</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{form.phone}</p>
                                </div>
                                <div>
                                  <label className="text-xs md:text-sm font-medium text-gray-400">Email</label>
                                  <p className="text-xs md:text-sm text-white mt-1">{form.email}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-xs md:text-sm font-medium text-gray-400">Subject</label>
                                <p className="text-xs md:text-sm text-white mt-1">{form.subject}</p>
                              </div>
                              <div>
                                <label className="text-xs md:text-sm font-medium text-gray-400">Message</label>
                                <p className="text-xs md:text-sm text-gray-300 mt-1 p-2 md:p-3 bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg">{form.message}</p>
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
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}