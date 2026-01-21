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

const mockGrounds = [
  { id: 1, name: 'Ground A', location: 'North Campus', capacity: 150, status: 'Active' },
  { id: 2, name: 'Ground B', location: 'South Campus', capacity: 120, status: 'Active' },
  { id: 3, name: 'Ground C', location: 'East Wing', capacity: 100, status: 'Active' },
  { id: 4, name: 'Indoor Court', location: 'Sports Complex', capacity: 80, status: 'Active' },
  { id: 5, name: 'Main Stadium', location: 'Central Campus', capacity: 250, status: 'Active' },
  { id: 6, name: 'Practice Field', location: 'West Wing', capacity: 60, status: 'Inactive' },
];

export default function AdminGrounds() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddGroundModal, setShowAddGroundModal] = useState(false);
  const [editingGround, setEditingGround] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = [
    { label: 'Total Grounds', value: mockGrounds.length.toString() },
    { label: 'Active Grounds', value: mockGrounds.filter(g => g.status === 'Active').length.toString() },
    { label: 'Inactive Grounds', value: mockGrounds.filter(g => g.status === 'Inactive').length.toString() },
    { label: 'Total Capacity', value: mockGrounds.reduce((sum, g) => sum + g.capacity, 0).toString() },
  ];

  const filteredGrounds = mockGrounds.filter(ground => {
    const matchesSearch = ground.name.toLowerCase().includes(search.toLowerCase()) || ground.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ground.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredGrounds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGrounds = filteredGrounds.slice(startIndex, endIndex);

  const handleEditGround = (ground) => {
    setEditingGround(ground);
    setShowAddGroundModal(true);
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A] min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Ground Management</h1>
          <p className="text-gray-400">Manage grounds, locations, and capacity</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl p-6"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search grounds..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-[#0A1F0A] border-[#2D6A4F] text-white">
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
                setEditingGround(null);
                setShowAddGroundModal(true);
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Ground
            </Button>
          </div>
        </motion.div>

        {/* Grounds Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ground Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Capacity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGrounds.map((ground, index) => (
                  <motion.tr
                    key={ground.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-white font-medium">{ground.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{ground.location}</td>
                    <td className="px-6 py-4 text-sm text-[#D4AF37] font-semibold">{ground.capacity}</td>
                    <td className="px-6 py-4">
                      <Badge className={ground.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                        {ground.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditGround(ground)}
                          className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
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
          <div className="px-6 py-4 border-t border-[#2D6A4F]/50 flex justify-between items-center">
            <p className="text-sm text-gray-400">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredGrounds.length)} of {filteredGrounds.length} grounds
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="border-[#40916C] text-gray-300"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="border-[#40916C] text-gray-300"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Add/Edit Ground Modal */}
        <Dialog open={showAddGroundModal} onOpenChange={setShowAddGroundModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                {editingGround ? 'Edit Ground' : 'Add New Ground'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Ground Name *</Label>
                <Input 
                  defaultValue={editingGround?.name}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Location *</Label>
                <Input 
                  defaultValue={editingGround?.location}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Capacity *</Label>
                <Input 
                  type="number"
                  defaultValue={editingGround?.capacity}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Status *</Label>
                <Select defaultValue={editingGround?.status?.toLowerCase() || 'active'}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
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
                  setShowAddGroundModal(false);
                  setEditingGround(null);
                }}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowAddGroundModal(false);
                  setEditingGround(null);
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Save Ground
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}