import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Trophy, TrendingUp, Calendar, Mail, Phone, Eye } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockStudents = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.j@email.com',
    phone: '+1 234 567 8901',
    batch: 'Cricket Batch A',
    joinDate: '2025-09-15',
    attendance: 95,
    performance: 'Excellent',
    recentAchievements: 'Top scorer in last tournament',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    phone: '+1 234 567 8902',
    batch: 'Cricket Batch A',
    joinDate: '2025-08-20',
    attendance: 88,
    performance: 'Good',
    recentAchievements: 'Best fielder award',
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.c@email.com',
    phone: '+1 234 567 8903',
    batch: 'Cricket Batch B',
    joinDate: '2025-10-05',
    attendance: 92,
    performance: 'Very Good',
    recentAchievements: 'Improved bowling technique',
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.d@email.com',
    phone: '+1 234 567 8904',
    batch: 'Cricket Batch A',
    joinDate: '2025-07-12',
    attendance: 78,
    performance: 'Average',
    recentAchievements: 'Consistent improvement',
  },
  {
    id: 5,
    name: 'Ryan Martinez',
    email: 'ryan.m@email.com',
    phone: '+1 234 567 8905',
    batch: 'Cricket Batch B',
    joinDate: '2025-11-01',
    attendance: 90,
    performance: 'Good',
    recentAchievements: 'Fast learner, great attitude',
  },
];

export default function CoachStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredStudents = mockStudents.filter(
    student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent': return 'bg-green-500/20 text-green-400';
      case 'Very Good': return 'bg-blue-500/20 text-blue-400';
      case 'Good': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return 'text-green-400';
    if (attendance >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  return (
    <CoachLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1">My Students</h2>
          <p className="text-gray-400 text-xs md:text-sm">View and manage students in your batches</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] flex-shrink-0" />
                <p className="text-gray-400 text-xs md:text-sm">Total Students</p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">{mockStudents.length}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#40916C] flex-shrink-0" />
                <p className="text-gray-400 text-xs md:text-sm">Avg Attendance</p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">88.6%</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-[#F4D03F] flex-shrink-0" />
                <p className="text-gray-400 text-xs md:text-sm">Top Performers</p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">3</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                <p className="text-gray-400 text-xs md:text-sm">Active Batches</p>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">2</p>
            </Card>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-6"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <Input
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 md:pl-12 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm h-8 md:h-10"
              />
            </div>
          </Card>
        </motion.div>

        {/* Students List */}
        <div className="space-y-3 md:space-y-4">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center text-[#0A1F0A] font-bold text-sm md:text-base flex-shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm md:text-lg">{student.name}</h3>
                        <p className="text-gray-400 text-xs md:text-sm">{student.batch}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm mb-2 md:mb-3">
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 truncate">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <Phone className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 truncate">{student.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-1 md:col-span-1">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 text-xs md:text-sm">Joined {new Date(student.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <Badge className={`text-xs md:text-sm ${getPerformanceColor(student.performance)}`}>
                        {student.performance}
                      </Badge>
                      <Badge className="bg-[#0A1F0A] text-gray-300 text-xs md:text-sm">
                        Attendance: <span className={getAttendanceColor(student.attendance)}>{student.attendance}%</span>
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewStudentDetails(student)}
                    className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10 text-xs md:text-sm h-8 md:h-10 w-full md:w-auto"
                  >
                    <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    View
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6 md:p-12">
            <div className="text-center">
              <Users className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
              <h3 className="text-white text-base md:text-lg font-semibold mb-1 md:mb-2">No students found</h3>
              <p className="text-gray-400 text-xs md:text-sm">Try adjusting your search criteria</p>
            </div>
          </Card>
        )}

        {/* Student Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl p-4 md:p-6">
            <DialogHeader>
              <DialogTitle className="text-white text-lg md:text-xl">Student Details</DialogTitle>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-3 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center text-[#0A1F0A] font-bold text-lg md:text-xl flex-shrink-0">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base md:text-xl">{selectedStudent.name}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">{selectedStudent.batch}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  <div className="bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Email</p>
                    <p className="text-white text-xs md:text-sm break-words">{selectedStudent.email}</p>
                  </div>
                  <div className="bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Phone</p>
                    <p className="text-white text-xs md:text-sm">{selectedStudent.phone}</p>
                  </div>
                  <div className="bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Join Date</p>
                    <p className="text-white text-xs md:text-sm">{new Date(selectedStudent.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Attendance</p>
                    <p className={`font-bold text-sm md:text-base ${getAttendanceColor(selectedStudent.attendance)}`}>
                      {selectedStudent.attendance}%
                    </p>
                  </div>
                </div>

                <div className="bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                  <p className="text-gray-400 text-xs md:text-sm mb-2">Performance</p>
                  <Badge className={`text-xs md:text-sm ${getPerformanceColor(selectedStudent.performance)}`}>
                    {selectedStudent.performance}
                  </Badge>
                </div>

                <div className="bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                  <p className="text-gray-400 text-xs md:text-sm mb-2">Recent Achievements</p>
                  <p className="text-white text-xs md:text-sm">{selectedStudent.recentAchievements}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}