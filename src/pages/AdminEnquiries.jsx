import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Phone, Mail, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function AdminEnquiries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [enquiries] = useState([
    {
      id: 1,
      name: 'Rajesh Verma',
      phone: '+91 98765 43210',
      email: 'rajesh.verma@email.com',
      sport: 'Cricket',
      message: 'Interested in cricket coaching for my 10-year-old son. What are the batch timings?',
      date: '2026-01-22',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Sneha Reddy',
      phone: '+91 87654 32109',
      email: 'sneha.reddy@email.com',
      sport: 'Football',
      message: 'Looking for weekend football sessions. Do you have any available slots?',
      date: '2026-01-21',
      status: 'Contacted',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Arun Kumar',
      phone: '+91 76543 21098',
      email: 'arun.k@email.com',
      sport: 'Tennis',
      message: 'Want to enroll my daughter in tennis coaching. Please share fee details.',
      date: '2026-01-20',
      status: 'Converted',
      priority: 'Low'
    },
    {
      id: 4,
      name: 'Meera Patel',
      phone: '+91 65432 10987',
      email: 'meera.patel@email.com',
      sport: 'Badminton',
      message: 'Interested in badminton coaching. Can I visit the academy tomorrow?',
      date: '2026-01-22',
      status: 'Pending',
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
                          className="bg-[#1A4D2E] hover:bg-[#2D6A4F] ml-4"
                          onClick={() => setSelectedEnquiry(enquiry)}
                        >
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Manage Enquiry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Name</label>
                            <p className="text-sm text-gray-900 mt-1">{enquiry.name}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700">Phone</label>
                              <p className="text-sm text-gray-900 mt-1">{enquiry.phone}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700">Email</label>
                              <p className="text-sm text-gray-900 mt-1">{enquiry.email}</p>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Sport Interest</label>
                            <p className="text-sm text-gray-900 mt-1">{enquiry.sport}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Message</label>
                            <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{enquiry.message}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Update Status</label>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1">
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Phone className="w-3 h-3 mr-1" />
                                Contacted
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Converted
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Add Notes</label>
                            <Textarea
                              placeholder="Add follow-up notes..."
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button variant="outline">Close</Button>
                            <Button className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">
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