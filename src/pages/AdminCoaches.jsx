import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Plus, Eye, Edit, Trash2, Star, Phone, Mail, Users
} from 'lucide-react';

const coaches = [
  { id: 1, name: 'James Anderson', sport: 'Cricket', phone: '+1 234-567-8901', email: 'james@asa.com', status: 'Active', batches: ['Cricket Batch A', 'Cricket Batch B'], rating: 4.8, totalEarned: 12500, paid: 9000, pending: 3500 },
  { id: 2, name: 'Sarah Miller', sport: 'Football', phone: '+1 234-567-8902', email: 'sarah@asa.com', status: 'Active', batches: ['Football Batch A'], rating: 4.5, totalEarned: 10000, paid: 10000, pending: 0 },
  { id: 3, name: 'David Lee', sport: 'Basketball', phone: '+1 234-567-8903', email: 'david@asa.com', status: 'Active', batches: ['Basketball Batch A', 'Basketball Batch B', 'Basketball Batch C'], rating: 4.9, totalEarned: 15000, paid: 11000, pending: 4000 },
  { id: 4, name: 'Emma Davis', sport: 'Tennis', phone: '+1 234-567-8904', email: 'emma@asa.com', status: 'Inactive', batches: ['Tennis Batch A'], rating: 4.6, totalEarned: 8000, paid: 8000, pending: 0 },
  { id: 5, name: 'Michael Brown', sport: 'Badminton', phone: '+1 234-567-8905', email: 'michael@asa.com', status: 'Active', batches: ['Badminton Batch A', 'Badminton Batch B'], rating: 4.7, totalEarned: 11000, paid: 7500, pending: 3500 },
];

const paymentHistory = [
  { date: '2026-01-15', amount: 3500, status: 'Paid' },
  { date: '2025-12-15', amount: 3500, status: 'Paid' },
  { date: '2025-11-15', amount: 3500, status: 'Paid' },
];

export default function AdminCoaches() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mode, setMode] = useState('info'); // 'info' or 'salary'
  const [showAddCoach, setShowAddCoach] = useState(false);
  const [showSalaryDetails, setShowSalaryDetails] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [editingCoach, setEditingCoach] = useState(null);

  const stats = [
    { label: 'Total Coaches', value: coaches.length },
    { label: 'Active Coaches', value: coaches.filter(c => c.status === 'Active').length },
    { label: 'Batches Covered', value: coaches.reduce((sum, c) => sum + c.batches.length, 0) },
    { label: 'Avg Rating', value: (coaches.reduce((sum, c) => sum + c.rating, 0) / coaches.length).toFixed(1) },
  ];

  const openEdit = (coach) => {
    setEditingCoach(coach);
    setShowAddCoach(true);
  };

  const viewSalary = (coach) => {
    setSelectedCoach(coach);
    setShowSalaryDetails(true);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Coach Management</h1>
          <p className="text-gray-400">Manage coaches, assignments, and salary information</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6">
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Row */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap gap-4"
        >
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search coaches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0D2818] border-[#2D6A4F] text-white pl-10"
              />
            </div>
          </div>
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="bg-[#0D2818] border-[#2D6A4F] text-white w-48">
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="cricket">Cricket</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
              <SelectItem value="badminton">Badminton</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-[#0D2818] border-[#2D6A4F] text-white w-48">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => { setEditingCoach(null); setShowAddCoach(true); }}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Coach
          </Button>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex gap-2"
        >
          <Button
            onClick={() => setMode('info')}
            className={mode === 'info' ? 'bg-[#40916C]' : 'bg-[#1A4D2E] hover:bg-[#2D6A4F]'}
          >
            Coach Info
          </Button>
          <Button
            onClick={() => setMode('salary')}
            className={mode === 'salary' ? 'bg-[#40916C]' : 'bg-[#1A4D2E] hover:bg-[#2D6A4F]'}
          >
            Salary Mode
          </Button>
        </motion.div>

        {/* Coach Info Mode */}
        {mode === 'info' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coaches.map((coach, index) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 p-6 hover:border-[#40916C] transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#40916C] to-[#2D6A4F] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{coach.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">{coach.name}</h3>
                      <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50">
                        {coach.sport}
                      </Badge>
                      <Badge className={`ml-2 ${coach.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {coach.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < coach.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'}`}
                      />
                    ))}
                    <span className="text-white ml-2 font-semibold">{coach.rating}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{coach.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{coach.email}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Batches Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {coach.batches.map((batch, i) => (
                        <Badge key={i} variant="outline" className="border-[#2D6A4F] text-white">
                          {batch}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => viewSalary(coach)}
                      className="flex-1 bg-[#40916C] hover:bg-[#2D6A4F]"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Salary
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openEdit(coach)}
                      className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[#2D6A4F] text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Salary Mode */}
        {mode === 'salary' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1A4D2E] border-b border-[#2D6A4F]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Coach Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total Earned</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Paid</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Pending</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coaches.map((coach, index) => (
                      <motion.tr
                        key={coach.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-[#2D6A4F]/30 hover:bg-[#1A4D2E]/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-white font-medium">{coach.name}</td>
                        <td className="px-6 py-4 text-sm text-white">CAD {coach.totalEarned.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-green-400">CAD {coach.paid.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-yellow-400">CAD {coach.pending.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <Badge className={coach.pending > 0 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}>
                            {coach.pending > 0 ? 'Pending' : 'Paid'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Button 
                            size="sm" 
                            onClick={() => viewSalary(coach)}
                            className="bg-[#40916C] hover:bg-[#2D6A4F]"
                          >
                            View Details
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Coach Modal */}
      <Dialog open={showAddCoach} onOpenChange={setShowAddCoach}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{editingCoach ? 'Edit Coach' : 'Add New Coach'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Coach Name</Label>
              <Input 
                defaultValue={editingCoach?.name}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Sport</Label>
              <Select defaultValue={editingCoach?.sport.toLowerCase()}>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
                  <SelectItem value="cricket">Cricket</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="badminton">Badminton</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Phone</Label>
              <Input 
                type="tel"
                defaultValue={editingCoach?.phone}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input 
                type="email"
                defaultValue={editingCoach?.email}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Status</Label>
              <Select defaultValue={editingCoach?.status.toLowerCase()}>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Batches Covered</Label>
              <Input 
                placeholder="Cricket Batch A, Cricket Batch B"
                defaultValue={editingCoach?.batches.join(', ')}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Rating (0-5)</Label>
              <Input 
                type="number"
                step="0.1"
                min="0"
                max="5"
                defaultValue={editingCoach?.rating}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => { setShowAddCoach(false); setEditingCoach(null); }}
              className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => { setShowAddCoach(false); setEditingCoach(null); }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
            >
              Save Coach
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Salary Details Modal */}
      <Dialog open={showSalaryDetails} onOpenChange={setShowSalaryDetails}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Salary Details</DialogTitle>
            <p className="text-gray-400">{selectedCoach?.name} • {selectedCoach?.email}</p>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
              <p className="text-gray-400 text-sm mb-1">Total Earned</p>
              <p className="text-white font-bold text-2xl">CAD {selectedCoach?.totalEarned.toLocaleString()}</p>
            </Card>
            <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
              <p className="text-gray-400 text-sm mb-1">Total Paid</p>
              <p className="text-green-400 font-bold text-2xl">CAD {selectedCoach?.paid.toLocaleString()}</p>
            </Card>
            <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
              <p className="text-gray-400 text-sm mb-1">Pending</p>
              <p className="text-yellow-400 font-bold text-2xl">CAD {selectedCoach?.pending.toLocaleString()}</p>
            </Card>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Payment History</h3>
            <div className="space-y-2">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-[#1A4D2E]/50 rounded-lg border border-[#2D6A4F]/30">
                  <div>
                    <p className="text-white">{payment.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-[#D4AF37] font-bold">CAD {payment.amount}</p>
                    <Badge className="bg-green-500/20 text-green-400">{payment.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2 mt-6">
            <Button 
              variant="outline"
              onClick={() => setShowSalaryDetails(false)}
              className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
            >
              Close
            </Button>
            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90">
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}