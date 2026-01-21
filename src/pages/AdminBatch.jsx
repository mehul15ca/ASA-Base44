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
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const batches = [
  { id: 1, name: 'Cricket Batch A', sport: 'Cricket', coach: 'James Anderson', ground: 'Ground A', students: 45, schedule: 'Mon/Wed/Fri 6:00 AM - 7:30 AM', status: 'Active', capacity: 50, fee: 250 },
  { id: 2, name: 'Football Batch B', sport: 'Football', coach: 'Sarah Miller', ground: 'Ground B', students: 38, schedule: 'Tue/Thu/Sat 5:30 AM - 7:00 AM', status: 'Active', capacity: 45, fee: 300 },
  { id: 3, name: 'Basketball Batch C', sport: 'Basketball', coach: 'David Lee', ground: 'Indoor Court', students: 30, schedule: 'Mon/Wed/Fri 4:00 PM - 5:30 PM', status: 'Active', capacity: 30, fee: 280 },
  { id: 4, name: 'Tennis Batch D', sport: 'Tennis', coach: 'Emma Davis', ground: 'Ground C', students: 22, schedule: 'Tue/Thu 3:00 PM - 4:30 PM', status: 'Inactive', capacity: 25, fee: 320 },
  { id: 5, name: 'Badminton Batch E', sport: 'Badminton', coach: 'Michael Brown', ground: 'Indoor Court', students: 28, schedule: 'Sat/Sun 8:00 AM - 9:30 AM', status: 'Active', capacity: 30, fee: 250 },
];

export default function AdminBatch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: 'Total Batches', value: batches.length },
    { label: 'Total Students', value: batches.reduce((sum, b) => sum + b.students, 0) },
    { label: 'Active Batches', value: batches.filter(b => b.status === 'Active').length },
    { label: 'Avg Capacity', value: Math.round(batches.reduce((sum, b) => sum + (b.students / b.capacity * 100), 0) / batches.length) + '%' },
  ];

  const openEdit = (batch) => {
    setEditingBatch(batch);
    setShowAddBatch(true);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(batches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBatches = batches.slice(startIndex, endIndex);

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Batch Management</h1>
          <p className="text-gray-400">Manage batches, schedules, and student groups</p>
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
                placeholder="Search batches..."
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
          <Button 
            onClick={() => { setEditingBatch(null); setShowAddBatch(true); }}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Batch
          </Button>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1A4D2E] border-b border-[#2D6A4F]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Batch Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Sport</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Coach</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ground</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Students</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Schedule</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBatches.map((batch, index) => (
                    <motion.tr
                      key={batch.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#1A4D2E]/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white font-medium">{batch.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50">
                          {batch.sport}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{batch.coach}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{batch.ground}</td>
                      <td className="px-6 py-4 text-sm text-white">{batch.students}/{batch.capacity}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{batch.schedule}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className={batch.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-gray-500/20 text-gray-400 border-gray-500/50'}>
                          {batch.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEdit(batch)}
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
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex justify-between items-center border-t border-[#2D6A4F]/30">
              <p className="text-sm text-gray-400">
                Showing {startIndex + 1} to {Math.min(endIndex, batches.length)} of {batches.length} batches
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Add/Edit Batch Modal */}
      <Dialog open={showAddBatch} onOpenChange={setShowAddBatch}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{editingBatch ? 'Edit Batch' : 'Add New Batch'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Batch Name</Label>
              <Input 
                defaultValue={editingBatch?.name}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Sport</Label>
              <Select defaultValue={editingBatch?.sport.toLowerCase()}>
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
              <Label className="text-gray-300">Coach</Label>
              <Select>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Select coach" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
                  <SelectItem value="james">James Anderson</SelectItem>
                  <SelectItem value="sarah">Sarah Miller</SelectItem>
                  <SelectItem value="david">David Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Ground</Label>
              <Select>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Select ground" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
                  <SelectItem value="grounda">Ground A</SelectItem>
                  <SelectItem value="groundb">Ground B</SelectItem>
                  <SelectItem value="groundc">Ground C</SelectItem>
                  <SelectItem value="indoor">Indoor Court</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Schedule</Label>
              <Input 
                defaultValue={editingBatch?.schedule}
                placeholder="Mon/Wed/Fri 6:00 AM - 7:30 AM"
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Capacity</Label>
              <Input 
                type="number"
                defaultValue={editingBatch?.capacity}
                placeholder="50"
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Fee Amount</Label>
              <Input 
                type="number"
                defaultValue={editingBatch?.fee}
                placeholder="250"
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Status</Label>
              <Select defaultValue={editingBatch?.status.toLowerCase() || 'active'}>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => { setShowAddBatch(false); setEditingBatch(null); }}
              className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => { setShowAddBatch(false); setEditingBatch(null); }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
            >
              Save Batch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}