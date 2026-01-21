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

const grounds = [
  { id: 1, name: 'Ground A', location: 'Main Campus - North Wing', capacity: 50, status: 'Active' },
  { id: 2, name: 'Ground B', location: 'Main Campus - South Wing', capacity: 45, status: 'Active' },
  { id: 3, name: 'Ground C', location: 'Secondary Campus', capacity: 40, status: 'Active' },
  { id: 4, name: 'Indoor Court', location: 'Sports Complex - Floor 2', capacity: 30, status: 'Active' },
  { id: 5, name: 'Main Stadium', location: 'Stadium Building', capacity: 100, status: 'Active' },
  { id: 6, name: 'Practice Field', location: 'Main Campus - East', capacity: 35, status: 'Inactive' },
];

export default function AdminGrounds() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddGround, setShowAddGround] = useState(false);
  const [editingGround, setEditingGround] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: 'Total Grounds', value: grounds.length },
    { label: 'Active Grounds', value: grounds.filter(g => g.status === 'Active').length },
    { label: 'Inactive Grounds', value: grounds.filter(g => g.status === 'Inactive').length },
    { label: 'Total Capacity', value: grounds.reduce((sum, g) => sum + g.capacity, 0) },
  ];

  const openEdit = (ground) => {
    setEditingGround(ground);
    setShowAddGround(true);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(grounds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGrounds = grounds.slice(startIndex, endIndex);

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Ground Management</h1>
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
                placeholder="Search grounds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0D2818] border-[#2D6A4F] text-white pl-10"
              />
            </div>
          </div>
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
            onClick={() => { setEditingGround(null); setShowAddGround(true); }}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Ground
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Ground Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Capacity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGrounds.map((ground, index) => (
                    <motion.tr
                      key={ground.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#1A4D2E]/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white font-medium">{ground.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{ground.location}</td>
                      <td className="px-6 py-4 text-sm text-white">{ground.capacity} students</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className={ground.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-gray-500/20 text-gray-400 border-gray-500/50'}>
                          {ground.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEdit(ground)}
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
                Showing {startIndex + 1} to {Math.min(endIndex, grounds.length)} of {grounds.length} grounds
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

      {/* Add/Edit Ground Modal */}
      <Dialog open={showAddGround} onOpenChange={setShowAddGround}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{editingGround ? 'Edit Ground' : 'Add New Ground'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Ground Name</Label>
              <Input 
                defaultValue={editingGround?.name}
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Location</Label>
              <Input 
                defaultValue={editingGround?.location}
                placeholder="e.g. Main Campus - North Wing"
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Capacity</Label>
              <Input 
                type="number"
                defaultValue={editingGround?.capacity}
                placeholder="50"
                className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
              />
            </div>
            <div>
              <Label className="text-gray-300">Status</Label>
              <Select defaultValue={editingGround?.status.toLowerCase() || 'active'}>
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
              onClick={() => { setShowAddGround(false); setEditingGround(null); }}
              className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => { setShowAddGround(false); setEditingGround(null); }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
            >
              Save Ground
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}