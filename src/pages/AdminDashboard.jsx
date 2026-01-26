import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserCheck, 
  DollarSign, 
  ClipboardCheck,
  Calendar,
  FileText,
  Wallet,
  Bell,
  Activity
} from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { createPageUrl } from '../utils';
import { useNavigate } from 'react-router-dom';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const groundAttendanceData = [
  { ground: 'Ground A', attendance: 145 },
  { ground: 'Ground B', attendance: 132 },
  { ground: 'Ground C', attendance: 98 },
  { ground: 'Indoor Court', attendance: 67 },
  { ground: 'Main Stadium', attendance: 189 },
];

const batchDistributionData = [
  { name: 'Cricket Batch A', value: 35, color: '#D4AF37' },
  { name: 'Cricket Batch B', value: 28, color: '#40916C' },
  { name: 'Football Batch', value: 22, color: '#2D6A4F' },
  { name: 'Tennis Batch', value: 15, color: '#F4D03F' },
];

const paymentAlerts = [
  { student: 'John Smith', studentId: 'STU0023', amount: 199, daysOverdue: 15 },
  { student: 'Sarah Johnson', studentId: 'STU0045', amount: 179, daysOverdue: 8 },
  { student: 'Mike Wilson', studentId: 'STU0067', amount: 199, daysOverdue: 3 },
];

const coachSalary = [
  { coach: 'David Miller', amount: 4500, status: 'due' },
  { coach: 'Emma Watson', amount: 4200, status: 'paid' },
  { coach: 'Tom Brown', amount: 3800, status: 'due' },
];

const recentActivity = [
  { type: 'payment', text: 'John Smith paid $199 fee', time: '2 hours ago' },
  { type: 'attendance', text: 'Attendance marked for Batch A', time: '3 hours ago' },
  { type: 'enrollment', text: 'New student enrolled: Sarah Miller', time: '5 hours ago' },
  { type: 'payment', text: 'Mike Wilson paid $179 fee', time: '1 day ago' },
];

const upcomingEvents = [
  { title: 'Cricket Tournament Finals', date: '2026-01-25', time: '10:00 AM' },
  { title: 'Coach Training Workshop', date: '2026-01-28', time: '2:00 PM' },
  { title: 'Parent-Teacher Meeting', date: '2026-02-01', time: '4:00 PM' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('this_month');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showGenerateInvoiceModal, setShowGenerateInvoiceModal] = useState(false);
  const [showCustomDateModal, setShowCustomDateModal] = useState(false);
  const [studentForm, setStudentForm] = useState({
    fullName: '',
    email: '',
    batch: '',
    monthlyFee: ''
  });

  const stats = [
    { icon: Users, label: 'Total Students', value: '1,234', trend: '+12%', up: true },
    { icon: UserCheck, label: 'Active Coaches', value: '48', trend: '+8%', up: true },
    { icon: DollarSign, label: 'Monthly Revenue', value: '$67,000', trend: '+15%', up: true },
    { icon: ClipboardCheck, label: 'Attendance Rate', value: '92%', trend: '-2%', up: false },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <AdminLayout>
      <div className="p-3 md:p-6 lg:p-8 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A] min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 md:mb-6 gap-2 md:gap-3">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-2">Dashboard</h1>
              <p className="text-gray-400 text-xs md:text-base hidden md:block">Monitor academy performance and manage operations</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[#D4AF37] text-xs md:text-sm font-medium">Today</p>
              <p className="text-gray-300 text-xs md:text-sm">{currentDate}</p>
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex gap-3">
            <Select value={dateFilter} onValueChange={(val) => {
              if (val === 'custom') setShowCustomDateModal(true);
              else setDateFilter(val);
            }}>
              <SelectTrigger className="w-full md:w-48 bg-[#0D2818] border-[#2D6A4F] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-4 md:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-2 md:p-6"
            >
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <div className="w-8 md:w-12 h-8 md:h-12 bg-[#D4AF37]/10 rounded-md md:rounded-lg flex items-center justify-center">
                  <stat.icon className="w-4 md:w-6 h-4 md:h-6 text-[#D4AF37]" />
                </div>
                <div className={`flex items-center gap-0.5 md:gap-1 text-xs md:text-sm ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.up ? <TrendingUp className="w-2.5 md:w-4 h-2.5 md:h-4" /> : <TrendingDown className="w-2.5 md:w-4 h-2.5 md:h-4" />}
                  <span className="text-[10px] md:text-xs">{stat.trend}</span>
                </div>
              </div>
              <h3 className="text-base md:text-2xl font-bold text-white mb-0.5 md:mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-[10px] md:text-sm leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Overview Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6 mb-4 md:mb-8"
        >
          <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-6">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 md:mb-8"
        >
          <h2 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddStudentModal(true)}
              className="bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] rounded-lg md:rounded-xl p-3 md:p-6 text-left"
            >
              <Users className="w-5 md:w-8 h-5 md:h-8 mb-1 md:mb-3" />
              <h3 className="font-bold text-xs md:text-lg leading-tight">Add Student</h3>
              <p className="text-xs md:text-sm opacity-80 hidden md:block">Enroll new student</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(createPageUrl('AdminAttendance'))}
              className="bg-gradient-to-br from-[#40916C] to-[#2D6A4F] text-white rounded-lg md:rounded-xl p-3 md:p-6 text-left"
            >
              <ClipboardCheck className="w-5 md:w-8 h-5 md:h-8 mb-1 md:mb-3" />
              <h3 className="font-bold text-xs md:text-lg leading-tight">Attendance</h3>
              <p className="text-xs md:text-sm opacity-80 hidden md:block">Check today's records</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(createPageUrl('AdminFinance'))}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] text-white border border-[#2D6A4F] rounded-lg md:rounded-xl p-3 md:p-6 text-left"
            >
              <Wallet className="w-5 md:w-8 h-5 md:h-8 mb-1 md:mb-3" />
              <h3 className="font-bold text-xs md:text-lg leading-tight">Manage Fees</h3>
              <p className="text-xs md:text-sm opacity-80 hidden md:block">Process payments</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(createPageUrl('AdminReports'))}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] text-white border border-[#2D6A4F] rounded-lg md:rounded-xl p-3 md:p-6 text-left"
            >
              <FileText className="w-5 md:w-8 h-5 md:h-8 mb-1 md:mb-3" />
              <h3 className="font-bold text-xs md:text-lg leading-tight">Reports</h3>
              <p className="text-xs md:text-sm opacity-80 hidden md:block">View analytics</p>
            </motion.button>
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 lg:gap-8 mb-4 md:mb-8">
          {/* Ground-wise Attendance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-6">Ground-wise Attendance</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={groundAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                <XAxis dataKey="ground" stroke="#9CA3AF" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F', borderRadius: '8px' }}
                />
                <Bar dataKey="attendance" fill="#40916C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Batch Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <h2 className="text-base md:text-xl font-bold text-white mb-3 md:mb-6">Batch Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={batchDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {batchDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom Row Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6">
          {/* Payment Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-4">
              <Bell className="w-3.5 md:w-5 h-3.5 md:h-5 text-[#D4AF37]" />
              <h2 className="text-sm md:text-lg font-bold text-white">Payment Alerts</h2>
            </div>
            <div className="space-y-3">
              {paymentAlerts.map((alert, index) => (
                <div key={index} className="bg-[#0A1F0A]/50 rounded-lg p-3 border border-[#2D6A4F]/30">
                  <p className="text-white font-medium text-sm">{alert.student}</p>
                  <p className="text-gray-400 text-xs mb-2">{alert.studentId}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#D4AF37] font-bold">${alert.amount}</span>
                    <span className="text-red-400 text-xs">{alert.daysOverdue} days overdue</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Coach Salary Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <h2 className="text-sm md:text-lg font-bold text-white mb-2 md:mb-4">Coach Salary Overview</h2>
            <div className="space-y-3">
              {coachSalary.map((coach, index) => (
                <div key={index} className="bg-[#0A1F0A]/50 rounded-lg p-3 border border-[#2D6A4F]/30">
                  <p className="text-white font-medium text-sm mb-2">{coach.coach}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#D4AF37] font-bold">${coach.amount}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      coach.status === 'paid' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {coach.status === 'paid' ? 'Paid' : 'Due'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-4">
              <Activity className="w-3.5 md:w-5 h-3.5 md:h-5 text-[#D4AF37]" />
              <h2 className="text-sm md:text-lg font-bold text-white">Recent Activity</h2>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-2 h-2 bg-[#40916C] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm">{activity.text}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-4">
              <Calendar className="w-3.5 md:w-5 h-3.5 md:h-5 text-[#D4AF37]" />
              <h2 className="text-sm md:text-lg font-bold text-white">Upcoming Events</h2>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-[#0A1F0A]/50 rounded-lg p-3 border border-[#2D6A4F]/30">
                  <p className="text-white font-medium text-sm mb-1">{event.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

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
                  value="STU0001"
                  disabled
                  className="bg-[#0A1F0A]/50 border-[#2D6A4F] text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated upon creation</p>
              </div>
              <div>
                <Label className="text-gray-300">Full Name *</Label>
                <Input
                  value={studentForm.fullName}
                  onChange={(e) => setStudentForm({...studentForm, fullName: e.target.value})}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Email *</Label>
                <Input
                  type="email"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Batch *</Label>
                <Select value={studentForm.batch} onValueChange={(val) => setStudentForm({...studentForm, batch: val})}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="cricket_a">Cricket Batch A</SelectItem>
                    <SelectItem value="cricket_b">Cricket Batch B</SelectItem>
                    <SelectItem value="football">Football Batch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Monthly Fee Amount *</Label>
                <Input
                  type="number"
                  value={studentForm.monthlyFee}
                  onChange={(e) => setStudentForm({...studentForm, monthlyFee: e.target.value})}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
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

        {/* Generate Invoice Modal */}
        <Dialog open={showGenerateInvoiceModal} onOpenChange={setShowGenerateInvoiceModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Generate Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Student Name *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="student1">John Smith</SelectItem>
                    <SelectItem value="student2">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Amount *</Label>
                <Input
                  type="number"
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  placeholder="Enter invoice description..."
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowGenerateInvoiceModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowGenerateInvoiceModal(false)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Generate Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Custom Date Range Modal */}
        <Dialog open={showCustomDateModal} onOpenChange={setShowCustomDateModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Custom Date Range</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">From</Label>
                <Input
                  type="date"
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">To</Label>
                <Input
                  type="date"
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCustomDateModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setDateFilter('custom');
                  setShowCustomDateModal(false);
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Apply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}