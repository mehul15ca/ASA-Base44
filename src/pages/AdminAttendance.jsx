import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockAttendance = [
  { id: 1, student: 'John Smith', ground: 'Ground A', date: '2026-01-21', status: 'Present', timeIn: '06:15 AM' },
  { id: 2, student: 'Sarah Johnson', ground: 'Ground A', date: '2026-01-21', status: 'Present', timeIn: '06:10 AM' },
  { id: 3, student: 'Mike Wilson', ground: 'Ground C', date: '2026-01-21', status: 'Late', timeIn: '05:20 PM' },
  { id: 4, student: 'Emma Davis', ground: 'Ground B', date: '2026-01-21', status: 'Absent', timeIn: '-' },
  { id: 5, student: 'Tom Brown', ground: 'Indoor Court', date: '2026-01-21', status: 'Present', timeIn: '04:05 PM' },
];

const mockCards = [
  { id: 1, cardId: 'NFC-001', student: 'John Smith', status: 'Active', issuedDate: '2025-09-15', lastUsed: '2026-01-21 06:15 AM' },
  { id: 2, cardId: 'NFC-002', student: 'Sarah Johnson', status: 'Active', issuedDate: '2025-10-20', lastUsed: '2026-01-21 06:10 AM' },
  { id: 3, cardId: 'NFC-003', student: 'Mike Wilson', status: 'Active', issuedDate: '2025-11-05', lastUsed: '2026-01-20 05:15 PM' },
  { id: 4, cardId: 'NFC-004', student: 'Emma Davis', status: 'Inactive', issuedDate: '2025-08-12', lastUsed: '2026-01-15 06:00 AM' },
];

export default function AdminAttendance() {
  const [search, setSearch] = useState('');
  const [groundFilter, setGroundFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2026-01-21');
  const [showMarkAttendanceModal, setShowMarkAttendanceModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCardPage, setCurrentCardPage] = useState(1);
  const itemsPerPage = 10;

  const stats = [
    { label: 'Total Students', value: '1,234' },
    { label: 'Present Today', value: '1,142' },
    { label: 'Absent Today', value: '92' },
    { label: 'Total Cards Issued', value: '1,234' },
  ];

  const filteredAttendance = mockAttendance.filter(record => {
    const matchesSearch = record.student.toLowerCase().includes(search.toLowerCase());
    const matchesGround = groundFilter === 'all' || record.ground === groundFilter;
    return matchesSearch && matchesGround;
  });

  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAttendance = filteredAttendance.slice(startIndex, startIndex + itemsPerPage);

  const totalCardPages = Math.ceil(mockCards.length / itemsPerPage);
  const cardStartIndex = (currentCardPage - 1) * itemsPerPage;
  const paginatedCards = mockCards.slice(cardStartIndex, cardStartIndex + itemsPerPage);

  return (
    <AdminLayout>
      <div className="p-3 md:p-6 lg:p-8 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A] min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8"
        >
          <h1 className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-2">Attendance Portal</h1>
          <p className="text-gray-400 text-xs md:text-base hidden md:block">Mark attendance and manage NFC/RFID cards</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mb-4 md:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-2 md:p-6"
            >
              <p className="text-gray-400 text-[10px] md:text-sm mb-1 md:mb-2 leading-tight">{stat.label}</p>
              <p className="text-base md:text-3xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="bg-[#0D2818] border border-[#2D6A4F]/50 mb-3 md:mb-6 w-full md:w-auto">
            <TabsTrigger value="attendance" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A] text-xs md:text-sm flex-1 md:flex-none">
              Attendance
            </TabsTrigger>
            <TabsTrigger value="nfc" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A] text-xs md:text-sm flex-1 md:flex-none">
              NFC Cards
            </TabsTrigger>
          </TabsList>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6 mb-3 md:mb-6"
            >
              <div className="flex flex-wrap gap-2 md:gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search student name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
                <Select value={groundFilter} onValueChange={setGroundFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="all">All Grounds</SelectItem>
                    <SelectItem value="Ground A">Ground A</SelectItem>
                    <SelectItem value="Ground B">Ground B</SelectItem>
                    <SelectItem value="Ground C">Ground C</SelectItem>
                    <SelectItem value="Indoor Court">Indoor Court</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full md:w-48 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm"
                />
                <Button
                  onClick={() => setShowMarkAttendanceModal(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] w-full md:w-auto text-xs md:text-sm"
                >
                  <Plus className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden md:inline">Mark Attendance</span>
                  <span className="md:hidden">Mark</span>
                </Button>
              </div>
            </motion.div>

            {/* Attendance Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                    <tr>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Student</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Ground</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden md:table-cell">Date</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden md:table-cell">Time In</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden md:table-cell">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAttendance.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                      >
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-white font-medium">{record.student}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300">{record.ground}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300 hidden md:table-cell">{record.date}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4">
                          <Badge className={`text-[10px] md:text-xs ${
                            record.status === 'Present' ? 'bg-green-500/20 text-green-400' :
                            record.status === 'Late' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {record.status}
                          </Badge>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300 hidden md:table-cell">{record.timeIn}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 hidden md:table-cell">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-3 md:px-6 py-3 md:py-4 border-t border-[#2D6A4F]/50 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
                <p className="text-xs md:text-sm text-gray-400">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAttendance.length)} of {filteredAttendance.length}
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
          </TabsContent>

          {/* NFC Cards Tab */}
          <TabsContent value="nfc">
            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6 mb-3 md:mb-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-2 md:gap-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search cards or students..."
                    className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
                <Button
                  onClick={() => setShowAddCardModal(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-xs md:text-sm w-full md:w-auto"
                >
                  <Plus className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden md:inline">Add New Card</span>
                  <span className="md:hidden">Add Card</span>
                </Button>
              </div>
            </motion.div>

            {/* Cards Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Card ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Student</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Issued Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Last Used</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedCards.map((card, index) => (
                      <motion.tr
                        key={card.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-[#D4AF37] font-semibold">{card.cardId}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">{card.student}</td>
                        <td className="px-6 py-4">
                          <Badge className={card.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                            {card.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{card.issuedDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{card.lastUsed}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                            >
                              Deactivate
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
                  Showing {cardStartIndex + 1}-{Math.min(cardStartIndex + itemsPerPage, mockCards.length)} of {mockCards.length} cards
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentCardPage === 1}
                    onClick={() => setCurrentCardPage(currentCardPage - 1)}
                    className="border-[#40916C] text-gray-300 text-xs md:text-sm"
                  >
                    <ChevronLeft className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                    <span className="hidden md:inline">Previous</span>
                    <span className="md:hidden">Prev</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentCardPage === totalCardPages}
                    onClick={() => setCurrentCardPage(currentCardPage + 1)}
                    className="border-[#40916C] text-gray-300 text-xs md:text-sm"
                  >
                    Next
                    <ChevronRight className="w-3 md:w-4 h-3 md:h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Mark Attendance Modal */}
        <Dialog open={showMarkAttendanceModal} onOpenChange={setShowMarkAttendanceModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Mark Attendance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Student *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Ground *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select ground" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="ground_a">Ground A</SelectItem>
                    <SelectItem value="ground_b">Ground B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Date *</Label>
                <Input 
                  type="date"
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Status *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Time In *</Label>
                <Input 
                  type="time"
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowMarkAttendanceModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowMarkAttendanceModal(false)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Mark Attendance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Card Modal */}
        <Dialog open={showAddCardModal} onOpenChange={setShowAddCardModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Add New NFC Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Card ID *</Label>
                <Input 
                  placeholder="Enter card ID"
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Student *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Status *</Label>
                <Select defaultValue="active">
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
                onClick={() => setShowAddCardModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddCardModal(false)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Add Card
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}