import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const mockBatches = [
  { id: 1, name: 'Cricket Batch A', sport: 'Cricket', coach: 'David Miller', ground: 'Ground A', students: 35, schedule: 'Mon/Wed/Fri 6:00 AM - 7:30 AM', status: 'Active' },
  { id: 2, name: 'Cricket Batch B', sport: 'Cricket', coach: 'David Miller', ground: 'Ground B', students: 28, schedule: 'Tue/Thu/Sat 6:00 AM - 7:30 AM', status: 'Active' },
  { id: 3, name: 'Football Batch', sport: 'Football', coach: 'Emma Watson', ground: 'Ground C', students: 22, schedule: 'Mon/Wed/Fri 5:00 PM - 6:30 PM', status: 'Active' },
  { id: 4, name: 'Tennis Batch', sport: 'Tennis', coach: 'Tom Brown', ground: 'Indoor Court', students: 15, schedule: 'Tue/Thu/Sat 4:00 PM - 5:30 PM', status: 'Active' },
  { id: 5, name: 'Basketball Batch', sport: 'Basketball', coach: 'Lisa Johnson', ground: 'Main Stadium', students: 18, schedule: 'Weekend 9:00 AM - 11:00 AM', status: 'Inactive' },
];

export default function AdminBatches() {
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalStudents = mockBatches.reduce((sum, b) => sum + b.students, 0);
  const stats = [
    { label: 'Total Batches', value: mockBatches.length.toString() },
    { label: 'Total Students', value: totalStudents.toString() },
    { label: 'Active Batches', value: mockBatches.filter(b => b.status === 'Active').length.toString() },
    { label: 'Avg Capacity', value: Math.round(totalStudents / mockBatches.length).toString() },
  ];

  const filteredBatches = mockBatches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(search.toLowerCase()) || batch.coach.toLowerCase().includes(search.toLowerCase());
    const matchesSport = sportFilter === 'all' || batch.sport === sportFilter;
    return matchesSearch && matchesSport;
  });

  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBatches = filteredBatches.slice(startIndex, endIndex);

  const handleEditBatch = (batch) => {
    setEditingBatch(batch);
    setShowAddBatchModal(true);
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
          <h1 className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-2">Batch Management</h1>
          <p className="text-gray-400 text-xs md:text-base hidden md:block">Manage batches, schedules, and student groups</p>
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
                placeholder="Search batches..."
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
            <Button
              onClick={() => {
                setEditingBatch(null);
                setShowAddBatchModal(true);
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-xs md:text-sm"
            >
              <Plus className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
              Add
            </Button>
          </div>
        </motion.div>

        {/* Batches Table */}
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
                  <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden lg:table-cell">Sport</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden xl:table-cell">Coach</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden xl:table-cell">Ground</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Students</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden md:table-cell">Schedule</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBatches.map((batch, index) => (
                  <motion.tr
                    key={batch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                  >
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-white font-medium">{batch.name}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300 hidden lg:table-cell">{batch.sport}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300 hidden xl:table-cell">{batch.coach}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300 hidden xl:table-cell">{batch.ground}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-[#D4AF37] font-semibold">{batch.students}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300 hidden md:table-cell">{batch.schedule}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4">
                      <Badge className={`text-[10px] md:text-xs ${batch.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {batch.status}
                      </Badge>
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4">
                      <div className="flex gap-1 md:gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditBatch(batch)}
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
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-3 md:px-6 py-3 md:py-4 border-t border-[#2D6A4F]/50 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
            <p className="text-xs md:text-sm text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredBatches.length)} of {filteredBatches.length}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="border-[#40916C] text-gray-300 text-xs md:text-sm"
              >
                <ChevronLeft className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                <span className="hidden md:inline">Previous</span>
                <span className="md:hidden">Prev</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="border-[#40916C] text-gray-300 text-xs md:text-sm"
              >
                Next
                <ChevronRight className="w-3 md:w-4 h-3 md:h-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Add/Edit Batch Modal */}
        <Dialog open={showAddBatchModal} onOpenChange={setShowAddBatchModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl p-4 md:p-6">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-xl">
                {editingBatch ? 'Edit Batch' : 'Add New Batch'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 md:space-y-4">
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Batch Name *</Label>
                <Input 
                  defaultValue={editingBatch?.name}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Sport *</Label>
                  <Select defaultValue={editingBatch?.sport?.toLowerCase()}>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm">
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="cricket">Cricket</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Coach *</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm">
                      <SelectValue placeholder="Select coach" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="david">David Miller</SelectItem>
                      <SelectItem value="emma">Emma Watson</SelectItem>
                      <SelectItem value="tom">Tom Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Ground *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm">
                    <SelectValue placeholder="Select ground" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="ground_a">Ground A</SelectItem>
                    <SelectItem value="ground_b">Ground B</SelectItem>
                    <SelectItem value="ground_c">Ground C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Schedule *</Label>
                <Input 
                  placeholder="e.g., Mon/Wed/Fri 6:00 AM - 7:30 AM"
                  defaultValue={editingBatch?.schedule}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Capacity *</Label>
                  <Input 
                    type="number"
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm" 
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs md:text-sm">Fee Amount *</Label>
                  <Input 
                    type="number"
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm" 
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-xs md:text-sm">Status *</Label>
                <Select defaultValue={editingBatch?.status?.toLowerCase() || 'active'}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddBatchModal(false);
                  setEditingBatch(null);
                }}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowAddBatchModal(false);
                  setEditingBatch(null);
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Save Batch
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}