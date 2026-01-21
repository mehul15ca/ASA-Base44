import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const mockAttendanceHistory = [
  { id: 1, date: '2026-01-21', session: 'Cricket Batch A', ground: 'Ground A', status: 'Present', timeIn: '06:05 AM' },
  { id: 2, date: '2026-01-21', session: 'Cricket Batch B', ground: 'Ground B', status: 'Present', timeIn: '05:02 PM' },
  { id: 3, date: '2026-01-20', session: 'Cricket Batch A', ground: 'Ground A', status: 'Present', timeIn: '06:00 AM' },
  { id: 4, date: '2026-01-20', session: 'Cricket Batch B', ground: 'Ground B', status: 'Late', timeIn: '05:15 PM' },
  { id: 5, date: '2026-01-19', session: 'Cricket Batch A', ground: 'Ground A', status: 'Absent', timeIn: '-' },
  { id: 6, date: '2026-01-19', session: 'Cricket Batch B', ground: 'Ground B', status: 'Present', timeIn: '05:00 PM' },
  { id: 7, date: '2026-01-18', session: 'Cricket Batch A', ground: 'Ground A', status: 'Present', timeIn: '06:03 AM' },
  { id: 8, date: '2026-01-18', session: 'Cricket Batch B', ground: 'Ground B', status: 'Present', timeIn: '05:05 PM' },
  { id: 9, date: '2026-01-17', session: 'Cricket Batch A', ground: 'Ground A', status: 'Present', timeIn: '06:00 AM' },
  { id: 10, date: '2026-01-17', session: 'Cricket Batch B', ground: 'Ground B', status: 'Late', timeIn: '05:20 PM' },
];

export default function StudentAttendance() {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredData, setFilteredData] = useState(mockAttendanceHistory);
  const itemsPerPage = 8;

  const totalSessions = mockAttendanceHistory.length;
  const presentCount = mockAttendanceHistory.filter(a => a.status === 'Present').length;
  const absentCount = mockAttendanceHistory.filter(a => a.status === 'Absent').length;
  const attendanceRate = Math.round((presentCount / totalSessions) * 100);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const applyFilter = () => {
    let filtered = [...mockAttendanceHistory];

    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status.toLowerCase() === statusFilter);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  return (
    <StudentLayout>
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-gray-400 text-sm">Total Sessions</p>
              </div>
              <p className="text-3xl font-bold text-white">{totalSessions}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Present</p>
              </div>
              <p className="text-3xl font-bold text-white">{presentCount}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <p className="text-gray-400 text-sm">Absent</p>
              </div>
              <p className="text-3xl font-bold text-white">{absentCount}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-gray-400 text-sm">Attendance %</p>
              </div>
              <p className="text-3xl font-bold text-white">{attendanceRate}%</p>
            </Card>
          </motion.div>
        </div>

        {/* Filter Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Filter Attendance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-gray-300">Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">End Date</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={applyFilter}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
                >
                  Apply Filter
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Attendance History Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Attendance History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Session</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ground</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Time In</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30"
                    >
                      <td className="px-6 py-4 text-sm text-white">{record.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{record.session}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{record.ground}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {record.status === 'Present' && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {record.status === 'Absent' && <XCircle className="w-4 h-4 text-red-400" />}
                          {record.status === 'Late' && <Clock className="w-4 h-4 text-yellow-400" />}
                          <Badge className={
                            record.status === 'Present' ? 'bg-green-500/20 text-green-400' :
                            record.status === 'Absent' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }>
                            {record.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{record.timeIn}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
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
          </Card>
        </motion.div>
      </div>
    </StudentLayout>
  );
}