import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, Wallet, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createPageUrl } from '../utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceTrendData = [
  { week: 'Week 1', attendance: 85 },
  { week: 'Week 2', attendance: 90 },
  { week: 'Week 3', attendance: 88 },
  { week: 'Week 4', attendance: 92 },
  { week: 'Week 5', attendance: 87 },
  { week: 'Week 6', attendance: 95 },
  { week: 'Week 7', attendance: 93 },
  { week: 'Week 8', attendance: 96 },
];

const upcomingSessions = [
  { id: 1, date: 'Jan 22, 2026', time: '06:00 AM - 07:30 AM', ground: 'Ground A', coach: 'Coach John Doe', status: 'Upcoming' },
  { id: 2, date: 'Jan 22, 2026', time: '05:00 PM - 06:30 PM', ground: 'Ground B', coach: 'Coach Sarah Smith', status: 'Upcoming' },
  { id: 3, date: 'Jan 23, 2026', time: '06:00 AM - 07:30 AM', ground: 'Ground A', coach: 'Coach John Doe', status: 'Upcoming' },
];

const recentActivities = [
  { action: 'Attendance marked for Cricket Batch A', time: '2 hours ago' },
  { action: 'Evaluation received from Coach John Doe', time: '1 day ago' },
  { action: 'Fee invoice #INV-001 generated', time: '2 days ago' },
  { action: 'New announcement posted', time: '3 days ago' },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <StudentLayout>
      <div className="p-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Student Name 👋</h1>
          <p className="text-gray-300">Here's a snapshot of your training progress</p>
          <p className="text-gray-400 text-sm mt-1">{today}</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Sessions Attended</p>
              </div>
              <p className="text-3xl font-bold text-white">24</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Attendance Rate</p>
              </div>
              <p className="text-3xl font-bold text-white">93%</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-[#40916C]" />
                <p className="text-gray-400 text-sm">Upcoming Sessions</p>
              </div>
              <p className="text-3xl font-bold text-white">6</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-5 h-5 text-[#F4D03F]" />
                <p className="text-gray-400 text-sm">Wallet Balance</p>
              </div>
              <p className="text-3xl font-bold text-white">₹2,500</p>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Attendance Trend Graph */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Attendance Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="week" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }}
                      labelStyle={{ color: '#D4AF37' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#40916C" 
                      strokeWidth={3}
                      dot={{ fill: '#D4AF37', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Sessions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Upcoming Sessions</h2>
              <Button
                onClick={() => navigate(createPageUrl('StudentSchedule'))}
                variant="outline"
                size="sm"
                className="border-[#D4AF37] text-[#D4AF37]"
              >
                View Full Schedule
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0A1F0A]/50 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-semibold">{session.date}</p>
                      <p className="text-gray-400 text-sm">{session.time}</p>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400">{session.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Ground</p>
                      <p className="text-white">{session.ground}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Coach</p>
                      <p className="text-white">{session.coach}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </StudentLayout>
  );
}