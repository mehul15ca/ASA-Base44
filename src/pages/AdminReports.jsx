import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, Send, BarChart3, PieChart, TrendingUp, FileText, Mail } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const COLORS = ['#D4AF37', '#40916C', '#2D6A4F', '#F4D03F', '#1A4D2E'];

const reportTypes = [
  { id: 'student_demographics', name: 'Student Demographics', icon: BarChart3 },
  { id: 'fee_collection', name: 'Fee Collection by Batch', icon: TrendingUp },
  { id: 'attendance_summary', name: 'Attendance Summary', icon: Calendar },
  { id: 'coach_performance', name: 'Coach Performance', icon: PieChart },
  { id: 'revenue_analysis', name: 'Revenue Analysis', icon: TrendingUp },
  { id: 'enrollment_trends', name: 'Enrollment Trends', icon: BarChart3 },
];

const dataPoints = {
  student_demographics: ['Age Distribution', 'Gender Ratio', 'Sport Preference', 'Location Distribution', 'Experience Level'],
  fee_collection: ['Total Collection', 'Outstanding Fees', 'Payment Method Distribution', 'Batch-wise Revenue', 'Monthly Trends'],
  attendance_summary: ['Overall Attendance Rate', 'Ground-wise Attendance', 'Batch-wise Attendance', 'Late Arrivals', 'Absent Students'],
  coach_performance: ['Student Ratings', 'Batch Sizes', 'Attendance Rate', 'Revenue Generated', 'Experience Years'],
  revenue_analysis: ['Total Revenue', 'Revenue by Sport', 'Revenue by Batch', 'Payment Status', 'Monthly Comparison'],
  enrollment_trends: ['New Enrollments', 'Dropouts', 'Active Students', 'Sport-wise Growth', 'Month-over-Month Change'],
};

const mockStudentDemographics = {
  ageDistribution: [
    { range: '5-10', count: 120 },
    { range: '11-15', count: 350 },
    { range: '16-20', count: 280 },
    { range: '21-25', count: 150 },
    { range: '26+', count: 80 },
  ],
  sportPreference: [
    { name: 'Cricket', value: 450 },
    { name: 'Football', value: 280 },
    { name: 'Basketball', value: 220 },
    { name: 'Tennis', value: 180 },
    { name: 'Others', value: 120 },
  ],
};

const mockFeeCollection = {
  batchRevenue: [
    { batch: 'Cricket A', collected: 45000, outstanding: 5000 },
    { batch: 'Cricket B', collected: 38000, outstanding: 7000 },
    { batch: 'Football', collected: 35000, outstanding: 3000 },
    { batch: 'Tennis', collected: 28000, outstanding: 2000 },
    { batch: 'Basketball', collected: 32000, outstanding: 4000 },
  ],
  monthlyTrends: [
    { month: 'Aug', revenue: 125000 },
    { month: 'Sep', revenue: 138000 },
    { month: 'Oct', revenue: 145000 },
    { month: 'Nov', revenue: 152000 },
    { month: 'Dec', revenue: 148000 },
    { month: 'Jan', revenue: 160000 },
  ],
};

const mockAttendanceSummary = {
  batchWise: [
    { batch: 'Cricket A', rate: 92 },
    { batch: 'Cricket B', rate: 88 },
    { batch: 'Football', rate: 95 },
    { batch: 'Tennis', rate: 90 },
    { batch: 'Basketball', rate: 85 },
  ],
  groundWise: [
    { ground: 'Ground A', present: 145, absent: 12 },
    { ground: 'Ground B', present: 128, absent: 8 },
    { ground: 'Ground C', present: 98, absent: 15 },
    { ground: 'Indoor Court', present: 75, absent: 5 },
  ],
};

export default function AdminReports() {
  const [selectedReportType, setSelectedReportType] = useState('student_demographics');
  const [dateFrom, setDateFrom] = useState('2025-08-01');
  const [dateTo, setDateTo] = useState('2026-01-21');
  const [selectedDataPoints, setSelectedDataPoints] = useState(['Age Distribution', 'Sport Preference']);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');
  const [scheduleEmail, setScheduleEmail] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleDataPointToggle = (point) => {
    setSelectedDataPoints(prev => 
      prev.includes(point) ? prev.filter(p => p !== point) : [...prev, point]
    );
  };

  const generateReport = () => {
    setReportGenerated(true);
    toast.success('Report generated successfully!');
  };

  const exportCSV = () => {
    toast.success('Report exported as CSV');
  };

  const exportPDF = () => {
    toast.success('Report exported as PDF');
  };

  const scheduleReport = () => {
    toast.success(`Report scheduled ${scheduleFrequency} to ${scheduleEmail}`);
    setShowScheduleModal(false);
  };

  const renderCharts = () => {
    if (!reportGenerated) return null;

    switch (selectedReportType) {
      case 'student_demographics':
        return (
          <div className="space-y-6">
            {selectedDataPoints.includes('Age Distribution') && (
              <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Age Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockStudentDemographics.ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="range" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" />
                    <Tooltip contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }} />
                    <Bar dataKey="count" fill="#D4AF37" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}
            {selectedDataPoints.includes('Sport Preference') && (
              <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Sport Preference</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={mockStudentDemographics.sportPreference}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockStudentDemographics.sportPreference.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }} />
                  </RePieChart>
                </ResponsiveContainer>
              </Card>
            )}
          </div>
        );

      case 'fee_collection':
        return (
          <div className="space-y-6">
            {selectedDataPoints.includes('Batch-wise Revenue') && (
              <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Batch-wise Fee Collection</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockFeeCollection.batchRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="batch" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" />
                    <Tooltip contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }} />
                    <Legend />
                    <Bar dataKey="collected" fill="#40916C" name="Collected" />
                    <Bar dataKey="outstanding" fill="#F4D03F" name="Outstanding" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}
            {selectedDataPoints.includes('Monthly Trends') && (
              <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Monthly Revenue Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockFeeCollection.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="month" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" />
                    <Tooltip contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }} />
                    <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            )}
          </div>
        );

      case 'attendance_summary':
        return (
          <div className="space-y-6">
            {selectedDataPoints.includes('Batch-wise Attendance') && (
              <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Batch-wise Attendance Rate (%)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAttendanceSummary.batchWise}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="batch" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }} />
                    <Bar dataKey="rate" fill="#40916C" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}
            {selectedDataPoints.includes('Ground-wise Attendance') && (
              <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Ground-wise Attendance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAttendanceSummary.groundWise}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="ground" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" />
                    <Tooltip contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }} />
                    <Legend />
                    <Bar dataKey="present" fill="#40916C" name="Present" />
                    <Bar dataKey="absent" fill="#F4D03F" name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
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
          <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-gray-400">Generate custom reports with interactive visualizations</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Configuration */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-xl p-6 sticky top-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Report Configuration</h2>

              {/* Report Type */}
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-3 block">Report Type *</Label>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      {reportTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div>
                  <Label className="text-gray-300 mb-3 block">Date Range *</Label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                    />
                  </div>
                </div>

                {/* Data Points */}
                <div>
                  <Label className="text-gray-300 mb-3 block">Data Points to Include</Label>
                  <div className="bg-[#0A1F0A] border border-[#2D6A4F]/50 rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                    {dataPoints[selectedReportType]?.map(point => (
                      <div key={point} className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedDataPoints.includes(point)}
                          onCheckedChange={() => handleDataPointToggle(point)}
                          className="border-[#40916C]"
                        />
                        <span className="text-white text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <Label className="text-gray-300 mb-3 block">Filters (Optional)</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="all">All Batches</SelectItem>
                      <SelectItem value="cricket_a">Cricket Batch A</SelectItem>
                      <SelectItem value="cricket_b">Cricket Batch B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4">
                  <Button
                    onClick={generateReport}
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>

                  {reportGenerated && (
                    <>
                      <div className="flex gap-2">
                        <Button
                          onClick={exportCSV}
                          variant="outline"
                          className="flex-1 border-[#40916C] text-[#40916C]"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          CSV
                        </Button>
                        <Button
                          onClick={exportPDF}
                          variant="outline"
                          className="flex-1 border-[#40916C] text-[#40916C]"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                      <Button
                        onClick={() => setShowScheduleModal(true)}
                        variant="outline"
                        className="w-full border-[#D4AF37] text-[#D4AF37]"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Schedule Report
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Report Visualization */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {!reportGenerated ? (
                <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-12 text-center">
                  <BarChart3 className="w-24 h-24 mx-auto text-gray-600 mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">No Report Generated</h3>
                  <p className="text-gray-400">Configure your report settings and click "Generate Report" to view analytics</p>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Report Header */}
                  <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {reportTypes.find(r => r.id === selectedReportType)?.name}
                        </h2>
                        <p className="text-gray-400">
                          Generated on {new Date().toLocaleDateString()} | Period: {dateFrom} to {dateTo}
                        </p>
                      </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Total Records</p>
                        <p className="text-2xl font-bold text-white">1,234</p>
                      </div>
                      <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Active</p>
                        <p className="text-2xl font-bold text-green-400">1,142</p>
                      </div>
                      <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Growth</p>
                        <p className="text-2xl font-bold text-[#D4AF37]">+12.5%</p>
                      </div>
                      <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Revenue</p>
                        <p className="text-2xl font-bold text-white">₹1.6M</p>
                      </div>
                    </div>
                  </Card>

                  {/* Charts */}
                  {renderCharts()}

                  {/* Data Table Preview */}
                  <Card className="bg-[#0A1F0A] border-[#2D6A4F]/50 p-6">
                    <h3 className="text-white text-lg font-semibold mb-4">Raw Data Preview</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Value</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#2D6A4F]/30">
                            <td className="px-4 py-3 text-sm text-white">Total Students</td>
                            <td className="px-4 py-3 text-sm text-white">1,234</td>
                            <td className="px-4 py-3 text-sm text-green-400">+8.2%</td>
                          </tr>
                          <tr className="border-b border-[#2D6A4F]/30">
                            <td className="px-4 py-3 text-sm text-white">Active Batches</td>
                            <td className="px-4 py-3 text-sm text-white">12</td>
                            <td className="px-4 py-3 text-sm text-green-400">+2</td>
                          </tr>
                          <tr className="border-b border-[#2D6A4F]/30">
                            <td className="px-4 py-3 text-sm text-white">Revenue (Monthly)</td>
                            <td className="px-4 py-3 text-sm text-white">₹160,000</td>
                            <td className="px-4 py-3 text-sm text-green-400">+8.1%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Schedule Report Modal */}
        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Schedule Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Report Name *</Label>
                <Input
                  placeholder="e.g., Weekly Student Report"
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Frequency *</Label>
                <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {scheduleFrequency === 'weekly' && (
                <div>
                  <Label className="text-gray-300">Day of Week *</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div>
                <Label className="text-gray-300">Email Recipients *</Label>
                <Input
                  type="email"
                  placeholder="admin@academy.com"
                  value={scheduleEmail}
                  onChange={(e) => setScheduleEmail(e.target.value)}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
                <p className="text-gray-500 text-xs mt-1">Separate multiple emails with commas</p>
              </div>
              <div>
                <Label className="text-gray-300">Format *</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="both">Both (PDF & CSV)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowScheduleModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={scheduleReport}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                <Mail className="w-4 h-4 mr-2" />
                Schedule Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}