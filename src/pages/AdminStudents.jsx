import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Plus, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";

const mockStudents = [
  { id: 'STU0001', name: 'John Smith', batch: 'Cricket Batch A', phone: '+1 234-567-8901', fee: 199, status: 'Active', joinDate: '2025-09-15' },
  { id: 'STU0002', name: 'Sarah Johnson', batch: 'Cricket Batch B', phone: '+1 234-567-8902', fee: 199, status: 'Active', joinDate: '2025-10-20' },
  { id: 'STU0003', name: 'Mike Wilson', batch: 'Football Batch', phone: '+1 234-567-8903', fee: 179, status: 'Active', joinDate: '2025-11-05' },
  { id: 'STU0004', name: 'Emma Davis', batch: 'Cricket Batch A', phone: '+1 234-567-8904', fee: 199, status: 'Inactive', joinDate: '2025-08-12' },
  { id: 'STU0005', name: 'Tom Brown', batch: 'Tennis Batch', phone: '+1 234-567-8905', fee: 149, status: 'Active', joinDate: '2025-12-01' },
];

const attendanceData = [
  { month: 'Sep', rate: 92 },
  { month: 'Oct', rate: 88 },
  { month: 'Nov', rate: 95 },
  { month: 'Dec', rate: 90 },
  { month: 'Jan', rate: 93 },
];

const attendanceRecords = [
  { date: '2026-01-21', status: 'Present' },
  { date: '2026-01-20', status: 'Present' },
  { date: '2026-01-19', status: 'Late' },
  { date: '2026-01-18', status: 'Present' },
  { date: '2026-01-17', status: 'Absent' },
];

const paymentHistory = [
  { date: '2026-01-01', amount: 199, method: 'Bank Transfer', status: 'Paid' },
  { date: '2025-12-01', amount: 199, method: 'Cash', status: 'Paid' },
  { date: '2025-11-01', amount: 199, method: 'Card', status: 'Paid' },
];

export default function AdminStudents() {
  const [search, setSearch] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || student.id.toLowerCase().includes(search.toLowerCase());
    const matchesBatch = batchFilter === 'all' || student.batch === batchFilter;
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesBatch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
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
          <h1 className="text-3xl font-bold text-white mb-2">Student Management</h1>
          <p className="text-gray-400">Manage students, attendance, fees, and performance</p>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
              />
            </div>
            <Select value={batchFilter} onValueChange={setBatchFilter}>
              <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="Cricket Batch A">Cricket Batch A</SelectItem>
                <SelectItem value="Cricket Batch B">Cricket Batch B</SelectItem>
                <SelectItem value="Football Batch">Football Batch</SelectItem>
                <SelectItem value="Tennis Batch">Tennis Batch</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="fee">Fee Amount</SelectItem>
                <SelectItem value="joinDate">Join Date</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                className="flex-1 min-w-[120px] border-[#40916C] text-gray-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={() => setShowAddStudentModal(true)}
                className="flex-1 min-w-[120px] bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Student ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Batch</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Monthly Fee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">{student.id}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{student.batch}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{student.phone}</td>
                    <td className="px-6 py-4 text-sm text-[#D4AF37] font-semibold">${student.fee}</td>
                    <td className="px-6 py-4">
                      <Badge className={student.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{student.joinDate}</td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewStudent(student)}
                        className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-[#2D6A4F]/50 flex justify-between items-center">
            <p className="text-sm text-gray-400">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
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
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 
                    ? 'bg-[#D4AF37] text-[#0A1F0A]' 
                    : 'border-[#40916C] text-gray-300'}
                >
                  {i + 1}
                </Button>
              ))}
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

        {/* Student Details Modal */}
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl flex items-center justify-between">
                <span>{selectedStudent?.name}</span>
                <span className="text-[#D4AF37] text-sm">{selectedStudent?.id}</span>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-[#0A1F0A] border border-[#2D6A4F]/50">
                <TabsTrigger value="overview" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="attendance" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
                  Attendance
                </TabsTrigger>
                <TabsTrigger value="fees" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
                  Fees
                </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
                  Performance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-4">
                    <p className="text-gray-400 text-sm mb-1">Batch</p>
                    <p className="text-white font-semibold">{selectedStudent?.batch}</p>
                  </Card>
                  <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-4">
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <p className="text-white font-semibold">{selectedStudent?.phone}</p>
                  </Card>
                  <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-4">
                    <p className="text-gray-400 text-sm mb-1">Monthly Fee</p>
                    <p className="text-[#D4AF37] font-bold text-lg">${selectedStudent?.fee}</p>
                  </Card>
                  <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-4">
                    <p className="text-gray-400 text-sm mb-1">Status</p>
                    <Badge className={selectedStudent?.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                      {selectedStudent?.status}
                    </Badge>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4 mt-4">
                <div className="bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-4">Attendance Trend</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }}
                      />
                      <Line type="monotone" dataKey="rate" stroke="#D4AF37" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Recent Records</h3>
                  <div className="space-y-2">
                    {attendanceRecords.slice(0, 3).map((record, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-[#2D6A4F]/30 last:border-0">
                        <span className="text-gray-300 text-sm">{record.date}</span>
                        <Badge className={
                          record.status === 'Present' ? 'bg-green-500/20 text-green-400' :
                          record.status === 'Late' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }>
                          {record.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1 border-[#40916C] text-gray-300">
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-[#40916C] text-gray-300">
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="fees" className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-4">
                    <p className="text-gray-400 text-sm mb-1">Monthly Fee</p>
                    <p className="text-[#D4AF37] font-bold text-lg">${selectedStudent?.fee}</p>
                  </Card>
                  <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-4">
                    <p className="text-gray-400 text-sm mb-1">Next Due Date</p>
                    <p className="text-white font-semibold">Feb 1, 2026</p>
                  </Card>
                  <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-4">
                    <p className="text-gray-400 text-sm mb-1">Wallet Balance</p>
                    <p className="text-green-400 font-bold text-lg">$50</p>
                  </Card>
                </div>
                <div className="bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Payment History</h3>
                  <div className="space-y-2">
                    {paymentHistory.map((payment, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-[#2D6A4F]/30 last:border-0">
                        <div>
                          <p className="text-white text-sm">{payment.date}</p>
                          <p className="text-gray-400 text-xs">{payment.method}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#D4AF37] font-bold">${payment.amount}</p>
                          <Badge className="bg-green-500/20 text-green-400">{payment.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4 mt-4">
                <div className="bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Evaluations</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-sm">Batting Skills</p>
                        <div className="flex gap-1 mt-1">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i <= 4 ? 'bg-[#D4AF37]' : 'bg-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[#D4AF37] font-bold">4.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-sm">Fielding</p>
                        <div className="flex gap-1 mt-1">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i <= 3 ? 'bg-[#D4AF37]' : 'bg-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[#D4AF37] font-bold">3.5</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-3">Injury Reports</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <p className="text-white text-sm">Ankle Sprain</p>
                        <p className="text-gray-400 text-xs">2025-12-15</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Recovered</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Add Student Modal */}
        <Dialog open={showAddStudentModal} onOpenChange={setShowAddStudentModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Student ID</Label>
                <Input
                  value="STU0006"
                  disabled
                  className="bg-[#0A1F0A]/50 border-[#2D6A4F] text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated upon creation</p>
              </div>
              <div>
                <Label className="text-gray-300">Full Name *</Label>
                <Input className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
              <div>
                <Label className="text-gray-300">Email *</Label>
                <Input type="email" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
              <div>
                <Label className="text-gray-300">Batch *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="cricket_a">Cricket Batch A</SelectItem>
                    <SelectItem value="cricket_b">Cricket Batch B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Monthly Fee Amount *</Label>
                <Input type="number" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddStudentModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowAddStudentModal(false)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Add Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}