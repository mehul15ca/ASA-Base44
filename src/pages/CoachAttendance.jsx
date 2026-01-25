import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const mockLeaveApplications = [
  { id: 1, startDate: '2026-02-01', endDate: '2026-02-03', reason: 'Medical appointment', appliedOn: '2026-01-15', status: 'Approved' },
  { id: 2, startDate: '2026-03-10', endDate: '2026-03-12', reason: 'Family function', appliedOn: '2026-01-20', status: 'Pending' },
  { id: 3, startDate: '2025-12-20', endDate: '2025-12-22', reason: 'Personal work', appliedOn: '2025-12-10', status: 'Rejected' },
];

const mockAttendanceHistory = [
  { id: 1, date: '2026-01-21', session: 'Cricket Batch A', time: '06:00 AM', status: 'Present', notes: '-' },
  { id: 2, date: '2026-01-21', session: 'Cricket Batch B', time: '05:00 PM', status: 'Present', notes: '-' },
  { id: 3, date: '2026-01-20', session: 'Cricket Batch A', time: '06:00 AM', status: 'Present', notes: '-' },
  { id: 4, date: '2026-01-20', session: 'Cricket Batch B', time: '05:00 PM', status: 'Late', notes: 'Traffic jam' },
  { id: 5, date: '2026-01-19', session: 'Cricket Batch A', time: '06:00 AM', status: 'Absent', notes: 'Medical leave' },
  { id: 6, date: '2026-01-19', session: 'Cricket Batch B', time: '05:00 PM', status: 'Present', notes: '-' },
  { id: 7, date: '2026-01-18', session: 'Cricket Batch A', time: '06:00 AM', status: 'Present', notes: '-' },
];

export default function CoachAttendance() {
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [currentLeavePage, setCurrentLeavePage] = useState(1);
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const itemsPerPage = 5;

  const presentCount = mockAttendanceHistory.filter(a => a.status === 'Present').length;
  const absentCount = mockAttendanceHistory.filter(a => a.status === 'Absent').length;
  const lateCount = mockAttendanceHistory.filter(a => a.status === 'Late').length;
  const attendanceRate = Math.round((presentCount / mockAttendanceHistory.length) * 100);

  const getMinStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  const handleSubmitLeave = () => {
    const today = new Date();
    const selectedStart = new Date(startDate);
    const daysDiff = Math.floor((selectedStart - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 7) {
      toast.error('Leave must be applied at least 7 days in advance');
      return;
    }

    if (!reason.trim()) {
      toast.error('Reason cannot be empty');
      return;
    }

    toast.success('Leave application submitted successfully');
    setShowLeaveForm(false);
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const totalLeavePages = Math.ceil(mockLeaveApplications.length / itemsPerPage);
  const paginatedLeave = mockLeaveApplications.slice(
    (currentLeavePage - 1) * itemsPerPage,
    currentLeavePage * itemsPerPage
  );

  const totalHistoryPages = Math.ceil(mockAttendanceHistory.length / itemsPerPage);
  const paginatedHistory = mockAttendanceHistory.slice(
    (currentHistoryPage - 1) * itemsPerPage,
    currentHistoryPage * itemsPerPage
  );

  return (
    <CoachLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <div></div>
          <Button
            onClick={() => setShowLeaveForm(!showLeaveForm)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-sm md:text-base h-8 md:h-10 px-3 md:px-4"
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Apply for Leave
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Present</p>
              </div>
              <p className="text-3xl font-bold text-white">{presentCount}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <p className="text-gray-400 text-sm">Absent</p>
              </div>
              <p className="text-3xl font-bold text-white">{absentCount}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <p className="text-gray-400 text-sm">Late</p>
              </div>
              <p className="text-3xl font-bold text-white">{lateCount}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-gray-400 text-sm">Attendance Rate</p>
              </div>
              <p className="text-3xl font-bold text-white">{attendanceRate}%</p>
            </Card>
          </motion.div>
        </div>

        {/* Leave Application Form */}
        {showLeaveForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Leave Application Form</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <p className="text-yellow-400 text-sm">Leave must be applied at least 7 days in advance</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Start Date *</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={getMinStartDate()}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">End Date *</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Reason *</Label>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please provide a reason for your leave application..."
                    className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmitLeave}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
                  >
                    Submit Application
                  </Button>
                  <Button
                    onClick={() => {
                      setShowLeaveForm(false);
                      setStartDate('');
                      setEndDate('');
                      setReason('');
                    }}
                    variant="outline"
                    className="border-[#40916C] text-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Leave Applications Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Leave Applications</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Start Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">End Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Reason</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Applied On</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeave.map((leave, index) => (
                    <motion.tr
                      key={leave.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30"
                    >
                      <td className="px-6 py-4 text-sm text-white">{leave.startDate}</td>
                      <td className="px-6 py-4 text-sm text-white">{leave.endDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{leave.reason}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{leave.appliedOn}</td>
                      <td className="px-6 py-4">
                        <Badge className={
                          leave.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                          leave.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }>
                          {leave.status}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                Showing {(currentLeavePage - 1) * itemsPerPage + 1} to {Math.min(currentLeavePage * itemsPerPage, mockLeaveApplications.length)} of {mockLeaveApplications.length} applications
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentLeavePage === 1}
                  onClick={() => setCurrentLeavePage(currentLeavePage - 1)}
                  className="border-[#40916C] text-gray-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentLeavePage === totalLeavePages}
                  onClick={() => setCurrentLeavePage(currentLeavePage + 1)}
                  className="border-[#40916C] text-gray-300"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Attendance History */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Attendance History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Session</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedHistory.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30"
                    >
                      <td className="px-6 py-4 text-sm text-white">{record.date}</td>
                      <td className="px-6 py-4 text-sm text-white">{record.session}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{record.time}</td>
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
                      <td className="px-6 py-4 text-sm text-gray-300">{record.notes}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                Showing {(currentHistoryPage - 1) * itemsPerPage + 1} to {Math.min(currentHistoryPage * itemsPerPage, mockAttendanceHistory.length)} of {mockAttendanceHistory.length} records
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentHistoryPage === 1}
                  onClick={() => setCurrentHistoryPage(currentHistoryPage - 1)}
                  className="border-[#40916C] text-gray-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentHistoryPage === totalHistoryPages}
                  onClick={() => setCurrentHistoryPage(currentHistoryPage + 1)}
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
    </CoachLayout>
  );
}