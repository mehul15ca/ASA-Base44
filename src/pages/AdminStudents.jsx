import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Download, Plus, Eye, ChevronLeft, ChevronRight,
  TrendingUp, Phone, Mail, Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const students = Array.from({ length: 50 }, (_, i) => ({
  id: `STU${String(i + 1).padStart(4, '0')}`,
  name: ['John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis', 'James Johnson'][i % 5],
  batch: ['Cricket Batch A', 'Football Batch B', 'Basketball Batch C'][i % 3],
  phone: '+1 234-567-8900',
  monthlyFee: 250 + (i % 3) * 50,
  status: i % 4 === 0 ? 'Inactive' : 'Active',
  joinDate: '2025-01-15',
  email: 'student@email.com',
  walletBalance: Math.floor(Math.random() * 500),
}));

const attendanceData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 95 },
  { month: 'Apr', attendance: 90 },
  { month: 'May', attendance: 93 },
  { month: 'Jun', attendance: 96 },
];

const attendanceRecords = [
  { date: '2026-01-20', status: 'Present' },
  { date: '2026-01-19', status: 'Present' },
  { date: '2026-01-18', status: 'Absent' },
  { date: '2026-01-17', status: 'Present' },
  { date: '2026-01-16', status: 'Late' },
];

const paymentHistory = [
  { date: '2026-01-01', amount: 250, method: 'Bank Transfer', status: 'Paid' },
  { date: '2025-12-01', amount: 250, method: 'Cash', status: 'Paid' },
  { date: '2025-11-01', amount: 250, method: 'Credit Card', status: 'Paid' },
];

const evaluations = [
  { skill: 'Technique', rating: 4.5 },
  { skill: 'Fitness', rating: 4.0 },
  { skill: 'Teamwork', rating: 4.8 },
];

const injuries = [
  { type: 'Ankle Sprain', status: 'Recovered', date: '2025-12-15' },
  { type: 'Minor Bruise', status: 'Recovered', date: '2025-11-20' },
];

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsTab, setDetailsTab] = useState('overview');
  const [attendancePage, setAttendancePage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = students.slice(startIndex, endIndex);

  const viewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
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
          <h1 className="text-4xl font-bold text-white mb-2">Student Management</h1>
          <p className="text-gray-400">Manage students, attendance, fees, and performance</p>
        </motion.div>

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
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0D2818] border-[#2D6A4F] text-white pl-10"
              />
            </div>
          </div>
          <Select value={batchFilter} onValueChange={setBatchFilter}>
            <SelectTrigger className="bg-[#0D2818] border-[#2D6A4F] text-white w-48">
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
              <SelectItem value="all">All Batches</SelectItem>
              <SelectItem value="cricket">Cricket Batch A</SelectItem>
              <SelectItem value="football">Football Batch B</SelectItem>
              <SelectItem value="basketball">Basketball Batch C</SelectItem>
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
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-[#0D2818] border-[#2D6A4F] text-white w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="fee">Fee Amount</SelectItem>
              <SelectItem value="date">Join Date</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#1A4D2E] hover:bg-[#2D6A4F] border border-[#2D6A4F]">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button 
            onClick={() => setShowAddStudent(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Student
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Student ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Batch</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Monthly Fee</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Join Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#1A4D2E]/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white font-mono">{student.id}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{student.batch}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{student.phone}</td>
                      <td className="px-6 py-4 text-sm text-[#D4AF37] font-semibold">CAD {student.monthlyFee}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className={student.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-gray-500/20 text-gray-400 border-gray-500/50'}>
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{student.joinDate}</td>
                      <td className="px-6 py-4 text-sm">
                        <Button 
                          size="sm" 
                          onClick={() => viewDetails(student)}
                          className="bg-[#40916C] hover:bg-[#2D6A4F]"
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
            <div className="px-6 py-4 flex justify-between items-center border-t border-[#2D6A4F]/30">
              <p className="text-sm text-gray-400">
                Showing {startIndex + 1} to {Math.min(endIndex, students.length)} of {students.length} students
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
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                  <Button
                    key={i + 1}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? 'bg-[#40916C]' : 'bg-[#1A4D2E] hover:bg-[#2D6A4F]'}
                  >
                    {i + 1}
                  </Button>
                ))}
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

      {/* Student Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex justify-between items-center">
              <span>{selectedStudent?.name}</span>
              <span className="text-sm text-gray-400 font-mono">{selectedStudent?.id}</span>
            </DialogTitle>
          </DialogHeader>

          <Tabs value={detailsTab} onValueChange={setDetailsTab} className="w-full">
            <TabsList className="bg-[#1A4D2E] border border-[#2D6A4F]">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#40916C]">Overview</TabsTrigger>
              <TabsTrigger value="attendance" className="data-[state=active]:bg-[#40916C]">Attendance</TabsTrigger>
              <TabsTrigger value="fees" className="data-[state=active]:bg-[#40916C]">Fees</TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-[#40916C]">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                  <p className="text-gray-400 text-sm mb-1">Batch</p>
                  <p className="text-white font-semibold">{selectedStudent?.batch}</p>
                </Card>
                <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                  <p className="text-gray-400 text-sm mb-1">Phone</p>
                  <p className="text-white font-semibold">{selectedStudent?.phone}</p>
                </Card>
                <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                  <p className="text-gray-400 text-sm mb-1">Monthly Fee</p>
                  <p className="text-[#D4AF37] font-bold text-lg">CAD {selectedStudent?.monthlyFee}</p>
                </Card>
                <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <Badge className={selectedStudent?.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                    {selectedStudent?.status}
                  </Badge>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4 mt-4">
              <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                <h3 className="text-white font-semibold mb-4">Attendance Chart</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="attendance" stroke="#40916C" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                <h3 className="text-white font-semibold mb-4">Attendance Records</h3>
                <div className="space-y-2">
                  {attendanceRecords.slice((attendancePage - 1) * 3, attendancePage * 3).map((record, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-[#0D2818] rounded-lg">
                      <span className="text-white">{record.date}</span>
                      <Badge className={
                        record.status === 'Present' ? 'bg-green-500/20 text-green-400' :
                        record.status === 'Absent' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }>
                        {record.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <Button 
                    size="sm" 
                    onClick={() => setAttendancePage(prev => Math.max(1, prev - 1))}
                    className="bg-[#1A4D2E] hover:bg-[#2D6A4F]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setAttendancePage(prev => prev + 1)}
                    className="bg-[#1A4D2E] hover:bg-[#2D6A4F]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                  <p className="text-gray-400 text-sm mb-1">Monthly Fee</p>
                  <p className="text-[#D4AF37] font-bold text-xl">CAD {selectedStudent?.monthlyFee}</p>
                </Card>
                <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                  <p className="text-gray-400 text-sm mb-1">Next Due Date</p>
                  <p className="text-white font-semibold">Feb 1, 2026</p>
                </Card>
                <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                  <p className="text-gray-400 text-sm mb-1">Wallet Balance</p>
                  <p className="text-green-400 font-bold text-xl">CAD {selectedStudent?.walletBalance}</p>
                </Card>
              </div>

              <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                <h3 className="text-white font-semibold mb-4">Payment History</h3>
                <div className="space-y-2">
                  {paymentHistory.map((payment, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-[#0D2818] rounded-lg">
                      <div>
                        <p className="text-white">{payment.date}</p>
                        <p className="text-sm text-gray-400">{payment.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#D4AF37] font-bold">CAD {payment.amount}</p>
                        <Badge className="bg-green-500/20 text-green-400">{payment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 mt-4">
              <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                <h3 className="text-white font-semibold mb-4">Evaluations</h3>
                <div className="space-y-3">
                  {evaluations.map((eval, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-white">{eval.skill}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <div 
                              key={i} 
                              className={`w-3 h-3 rounded-full ${i < eval.rating ? 'bg-[#D4AF37]' : 'bg-gray-600'}`}
                            />
                          ))}
                        </div>
                        <span className="text-[#D4AF37] font-bold">{eval.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#1A4D2E]/50 border-[#2D6A4F]/30 p-4">
                <h3 className="text-white font-semibold mb-4">Injury Reports</h3>
                <div className="space-y-2">
                  {injuries.map((injury, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-[#0D2818] rounded-lg">
                      <div>
                        <p className="text-white">{injury.type}</p>
                        <p className="text-sm text-gray-400">{injury.date}</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">{injury.status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Add Student Modal */}
      <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Student ID</Label>
              <Input 
                disabled 
                value="STU0001" 
                className="bg-[#1A4D2E]/50 border-[#2D6A4F] text-gray-400" 
              />
              <p className="text-xs text-gray-400 mt-1">Auto-generated upon creation</p>
            </div>
            <div>
              <Label className="text-gray-300">Full Name</Label>
              <Input className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input type="email" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <Label className="text-gray-300">Batch</Label>
              <Select>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
                  <SelectItem value="cricket-a">Cricket Batch A</SelectItem>
                  <SelectItem value="football-b">Football Batch B</SelectItem>
                  <SelectItem value="basketball-c">Basketball Batch C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Monthly Fee Amount</Label>
              <Input type="number" placeholder="250" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddStudent(false)}
              className="border-[#2D6A4F] text-white hover:bg-[#1A4D2E]"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setShowAddStudent(false)}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90"
            >
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}