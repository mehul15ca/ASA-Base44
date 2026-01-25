import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Star, Phone, Mail, Edit, Trash2, Eye } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const mockCoaches = [
  { id: 1, name: 'David Miller', sport: 'Cricket', status: 'Active', rating: 4.8, phone: '+1 234-567-8901', email: 'david@asa.com', batches: ['Cricket Batch A', 'Cricket Batch B'], totalEarned: 54000, paid: 45000, pending: 9000 },
  { id: 2, name: 'Emma Watson', sport: 'Football', status: 'Active', rating: 4.9, phone: '+1 234-567-8902', email: 'emma@asa.com', batches: ['Football Batch'], totalEarned: 48000, paid: 48000, pending: 0 },
  { id: 3, name: 'Tom Brown', sport: 'Tennis', status: 'Active', rating: 4.7, phone: '+1 234-567-8903', email: 'tom@asa.com', batches: ['Tennis Batch'], totalEarned: 42000, paid: 38000, pending: 4000 },
  { id: 4, name: 'Lisa Johnson', sport: 'Basketball', status: 'Inactive', rating: 4.6, phone: '+1 234-567-8904', email: 'lisa@asa.com', batches: [], totalEarned: 36000, paid: 36000, pending: 0 },
];

const salaryHistory = [
  { date: '2026-01-01', amount: 4500, status: 'Paid' },
  { date: '2025-12-01', amount: 4500, status: 'Paid' },
  { date: '2025-11-01', amount: 4500, status: 'Paid' },
];

export default function AdminCoaches() {
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mode, setMode] = useState('info'); // 'info' or 'salary'
  const [showAddCoachModal, setShowAddCoachModal] = useState(false);
  const [showSalaryDetailsModal, setShowSalaryDetailsModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [editingCoach, setEditingCoach] = useState(null);

  const stats = [
    { label: 'Total Coaches', value: '48' },
    { label: 'Active Coaches', value: '42' },
    { label: 'Batches Covered', value: '35' },
    { label: 'Avg Rating', value: '4.7' },
  ];

  const filteredCoaches = mockCoaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(search.toLowerCase());
    const matchesSport = sportFilter === 'all' || coach.sport === sportFilter;
    const matchesStatus = statusFilter === 'all' || coach.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesSport && matchesStatus;
  });

  const handleEditCoach = (coach) => {
    setEditingCoach(coach);
    setShowAddCoachModal(true);
  };

  const handleViewSalary = (coach) => {
    setSelectedCoach(coach);
    setShowSalaryDetailsModal(true);
  };

  return (
    <AdminLayout>
      <div className="p-3 md:p-6 lg:p-8 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A] min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8"
        >
          <h1 className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-2">Coach Management</h1>
          <p className="text-gray-400 text-xs md:text-base hidden md:block">Manage coaches, assignments, and salary information</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
            >
              <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">{stat.label}</p>
              <p className="text-xl md:text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6 mb-3 md:mb-6"
        >
          <div className="flex flex-wrap gap-2 md:gap-4">
            <div className="relative flex-1 min-w-[120px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 md:w-4 h-3 md:h-4" />
              <Input
                placeholder="Search coaches..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 md:pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm"
              />
            </div>
            <Select value={sportFilter} onValueChange={setSportFilter}>
              <SelectTrigger className="w-32 md:w-48 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 md:w-48 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setEditingCoach(null);
                setShowAddCoachModal(true);
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-xs md:text-sm"
            >
              <Plus className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
              Add
            </Button>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mt-3 md:mt-4">
            <Button
              variant={mode === 'info' ? 'default' : 'outline'}
              onClick={() => setMode('info')}
              className={`text-xs md:text-sm ${mode === 'info' 
                ? 'bg-[#D4AF37] text-[#0A1F0A]' 
                : 'border-[#40916C] text-gray-300'}`}
            >
              Coach Info
            </Button>
            <Button
              variant={mode === 'salary' ? 'default' : 'outline'}
              onClick={() => setMode('salary')}
              className={`text-xs md:text-sm ${mode === 'salary' 
                ? 'bg-[#D4AF37] text-[#0A1F0A]' 
                : 'border-[#40916C] text-gray-300'}`}
            >
              Salary Mode
            </Button>
          </div>
        </motion.div>

        {/* Coach Info Mode */}
        {mode === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredCoaches.map((coach, index) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                      <span className="text-lg md:text-2xl font-bold text-[#D4AF37]">
                        {coach.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <Badge className={`text-xs ${coach.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {coach.status}
                    </Badge>
                  </div>
                  
                  <h3 className="text-base md:text-xl font-bold text-white mb-0.5 md:mb-1">{coach.name}</h3>
                  <p className="text-[#D4AF37] text-xs md:text-sm mb-2 md:mb-3">{coach.sport}</p>
                  
                  <div className="flex items-center gap-1 mb-3 md:mb-4">
                    <Star className="w-3 md:w-4 h-3 md:h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-white font-semibold text-sm md:text-base">{coach.rating}</span>
                  </div>

                  <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                      <Phone className="w-3 md:w-4 h-3 md:h-4" />
                      <span>{coach.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                      <Mail className="w-3 md:w-4 h-3 md:h-4" />
                      <span className="truncate">{coach.email}</span>
                    </div>
                  </div>

                  <div className="mb-3 md:mb-4">
                    <p className="text-gray-400 text-[10px] md:text-xs mb-1.5 md:mb-2">Batches Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {coach.batches.length > 0 ? (
                        coach.batches.map((batch, i) => (
                          <Badge key={i} variant="outline" className="border-[#40916C] text-[#40916C] text-[10px] md:text-xs">
                            {batch}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500 text-[10px] md:text-xs">No batches assigned</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1.5 md:gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewSalary(coach)}
                      className="flex-1 border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10 text-[10px] md:text-sm"
                    >
                      Salary
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCoach(coach)}
                      className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10"
                    >
                      <Edit className="w-3 md:w-4 h-3 md:h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3 md:w-4 h-3 md:h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Salary Mode */}
        {mode === 'salary' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Name</th>
                    <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden lg:table-cell">Total Earned</th>
                    <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Paid</th>
                    <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Pending</th>
                    <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden md:table-cell">Status</th>
                    <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoaches.map((coach, index) => (
                    <motion.tr
                      key={coach.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-white font-medium">{coach.name}</td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-[#D4AF37] font-semibold hidden lg:table-cell">${coach.totalEarned.toLocaleString()}</td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-green-400">${coach.paid.toLocaleString()}</td>
                      <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-yellow-400">${coach.pending.toLocaleString()}</td>
                      <td className="px-3 md:px-6 py-2 md:py-4 hidden md:table-cell">
                        <Badge className={`text-xs ${coach.pending === 0 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {coach.pending === 0 ? 'Paid' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="px-3 md:px-6 py-2 md:py-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewSalary(coach)}
                          className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10 text-xs md:text-sm"
                        >
                          <Eye className="w-3 md:w-4 h-3 md:h-4 md:mr-1" />
                          <span className="hidden md:inline">View</span>
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Add/Edit Coach Modal */}
        <Dialog open={showAddCoachModal} onOpenChange={setShowAddCoachModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                {editingCoach ? 'Edit Coach' : 'Add New Coach'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Coach Name *</Label>
                <Input 
                  defaultValue={editingCoach?.name}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Sport *</Label>
                <Select defaultValue={editingCoach?.sport?.toLowerCase()}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="cricket">Cricket</SelectItem>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="tennis">Tennis</SelectItem>
                    <SelectItem value="badminton">Badminton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Phone *</Label>
                <Input 
                  type="tel"
                  defaultValue={editingCoach?.phone}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Email *</Label>
                <Input 
                  type="email"
                  defaultValue={editingCoach?.email}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Status *</Label>
                <Select defaultValue={editingCoach?.status?.toLowerCase() || 'active'}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Batches Covered</Label>
                <Input 
                  placeholder="Comma-separated batch names"
                  defaultValue={editingCoach?.batches?.join(', ')}
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
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddCoachModal(false);
                  setEditingCoach(null);
                }}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowAddCoachModal(false);
                  setEditingCoach(null);
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Save Coach
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Salary Details Modal */}
        <Dialog open={showSalaryDetailsModal} onOpenChange={setShowSalaryDetailsModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl p-4 md:p-6">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-xl">Salary Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 md:space-y-6">
              <div>
                <p className="text-gray-400 text-xs md:text-sm">Coach</p>
                <p className="text-white font-semibold text-base md:text-lg">{selectedCoach?.name}</p>
                <p className="text-gray-400 text-xs md:text-sm truncate">{selectedCoach?.email}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-2 md:p-4">
                  <p className="text-gray-400 text-[10px] md:text-sm mb-1">Total Earned</p>
                  <p className="text-[#D4AF37] font-bold text-sm md:text-xl">${selectedCoach?.totalEarned.toLocaleString()}</p>
                </Card>
                <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-2 md:p-4">
                  <p className="text-gray-400 text-[10px] md:text-sm mb-1">Total Paid</p>
                  <p className="text-green-400 font-bold text-sm md:text-xl">${selectedCoach?.paid.toLocaleString()}</p>
                </Card>
                <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-2 md:p-4">
                  <p className="text-gray-400 text-[10px] md:text-sm mb-1">Pending</p>
                  <p className="text-yellow-400 font-bold text-sm md:text-xl">${selectedCoach?.pending.toLocaleString()}</p>
                </Card>
              </div>

              <div className="bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-3 md:p-4">
                <h3 className="text-white font-semibold mb-2 md:mb-3 text-sm md:text-base">Payment History</h3>
                <div className="space-y-2">
                  {salaryHistory.map((payment, i) => (
                    <div key={i} className="flex justify-between items-center py-2 md:py-3 border-b border-[#2D6A4F]/30 last:border-0">
                      <div>
                        <p className="text-white text-xs md:text-sm">{payment.date}</p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <p className="text-[#D4AF37] font-bold text-xs md:text-base">${payment.amount.toLocaleString()}</p>
                        <Badge className="bg-green-500/20 text-green-400 text-[10px] md:text-xs">{payment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-sm md:text-base"
              >
                Process Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}