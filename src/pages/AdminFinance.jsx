import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Download, CreditCard, TrendingUp, AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const mockInvoices = [
  { id: 'INV-001', student: 'John Smith', batch: 'Cricket A', amount: 5000, paid: 5000, status: 'Paid', dueDate: '2026-01-15', paidDate: '2026-01-14', method: 'UPI' },
  { id: 'INV-002', student: 'Sarah Johnson', batch: 'Cricket B', amount: 4500, paid: 4500, status: 'Paid', dueDate: '2026-01-15', paidDate: '2026-01-15', method: 'Card' },
  { id: 'INV-003', student: 'Mike Wilson', batch: 'Football', amount: 4000, paid: 2000, status: 'Partial', dueDate: '2026-01-20', paidDate: '2026-01-10', method: 'Cash' },
  { id: 'INV-004', student: 'Emma Davis', batch: 'Tennis', amount: 3500, paid: 0, status: 'Pending', dueDate: '2026-01-25', paidDate: '-', method: '-' },
  { id: 'INV-005', student: 'Tom Brown', batch: 'Basketball', amount: 4200, paid: 0, status: 'Overdue', dueDate: '2026-01-10', paidDate: '-', method: '-' },
];

const mockFeeStructures = [
  { id: 1, batch: 'Cricket Batch A', sport: 'Cricket', monthlyFee: 5000, registrationFee: 1000, equipmentFee: 500, status: 'Active' },
  { id: 2, batch: 'Cricket Batch B', sport: 'Cricket', monthlyFee: 4500, registrationFee: 1000, equipmentFee: 500, status: 'Active' },
  { id: 3, batch: 'Football Batch', sport: 'Football', monthlyFee: 4000, registrationFee: 800, equipmentFee: 400, status: 'Active' },
  { id: 4, batch: 'Tennis Batch', sport: 'Tennis', monthlyFee: 3500, registrationFee: 1200, equipmentFee: 600, status: 'Active' },
];

const revenueData = [
  { month: 'Aug', revenue: 450000, expenses: 280000 },
  { month: 'Sep', revenue: 520000, expenses: 290000 },
  { month: 'Oct', revenue: 580000, expenses: 310000 },
  { month: 'Nov', revenue: 610000, expenses: 320000 },
  { month: 'Dec', revenue: 590000, expenses: 300000 },
  { month: 'Jan', revenue: 640000, expenses: 330000 },
];

const paymentMethodData = [
  { method: 'UPI', count: 450 },
  { method: 'Card', count: 320 },
  { method: 'Cash', count: 180 },
  { method: 'Bank Transfer', count: 140 },
];

export default function AdminFinance() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchInvoice, setSearchInvoice] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showGenerateInvoiceModal, setShowGenerateInvoiceModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showFeeStructureModal, setShowFeeStructureModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedFeeStructure, setSelectedFeeStructure] = useState(null);

  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.paid, 0);
  const pendingAmount = mockInvoices.filter(inv => inv.status !== 'Paid').reduce((sum, inv) => sum + (inv.amount - inv.paid), 0);
  const paidInvoices = mockInvoices.filter(inv => inv.status === 'Paid').length;
  const overdueInvoices = mockInvoices.filter(inv => inv.status === 'Overdue').length;

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchInvoice.toLowerCase()) || 
                         invoice.student.toLowerCase().includes(searchInvoice.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const generateInvoice = () => {
    toast.success('Invoice generated successfully!');
    setShowGenerateInvoiceModal(false);
  };

  const recordPayment = () => {
    toast.success('Payment recorded successfully!');
    setShowRecordPaymentModal(false);
  };

  const processRefund = () => {
    toast.success('Refund processed successfully!');
    setShowRefundModal(false);
  };

  const saveFeeStructure = () => {
    toast.success('Fee structure saved successfully!');
    setShowFeeStructureModal(false);
  };

  const downloadInvoice = (invoiceId) => {
    toast.success(`Invoice ${invoiceId} downloaded as PDF`);
  };

  const sendInvoiceEmail = (invoiceId) => {
    toast.success(`Invoice ${invoiceId} sent via email`);
  };

  return (
    <AdminLayout>
      <div className="p-3 md:p-6 lg:p-8 bg-gradient-to-br from-[#0A1F0A] via-[#0D2818] to-[#0A1F0A] min-h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8"
        >
          <h1 className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-2">Finance Management</h1>
          <p className="text-gray-400 text-xs md:text-base hidden md:block">Manage fees, invoices, payments, and financial reports</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <TrendingUp className="w-3 md:w-5 h-3 md:h-5 text-green-400" />
              <p className="text-gray-400 text-xs md:text-sm">Revenue</p>
            </div>
            <p className="text-lg md:text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
            <p className="text-green-400 text-[10px] md:text-sm mt-0.5 md:mt-1">+12.5%</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <Clock className="w-3 md:w-5 h-3 md:h-5 text-yellow-400" />
              <p className="text-gray-400 text-xs md:text-sm">Pending</p>
            </div>
            <p className="text-lg md:text-3xl font-bold text-white">${pendingAmount.toLocaleString()}</p>
            <p className="text-yellow-400 text-[10px] md:text-sm mt-0.5 md:mt-1">{mockInvoices.length - paidInvoices} unpaid</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <CheckCircle className="w-3 md:w-5 h-3 md:h-5 text-green-400" />
              <p className="text-gray-400 text-xs md:text-sm">Paid</p>
            </div>
            <p className="text-lg md:text-3xl font-bold text-white">{paidInvoices}</p>
            <p className="text-gray-400 text-[10px] md:text-sm mt-0.5 md:mt-1">of {mockInvoices.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
              <AlertCircle className="w-3 md:w-5 h-3 md:h-5 text-red-400" />
              <p className="text-gray-400 text-xs md:text-sm">Overdue</p>
            </div>
            <p className="text-lg md:text-3xl font-bold text-white">{overdueInvoices}</p>
            <p className="text-red-400 text-[10px] md:text-sm mt-0.5 md:mt-1 hidden md:block">Action required</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#0D2818] border border-[#2D6A4F]/50 mb-3 md:mb-6 text-xs md:text-sm grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="fee-structures" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Fee Structures
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
                <h3 className="text-white text-sm md:text-lg font-semibold mb-2 md:mb-4">Revenue vs Expenses</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="month" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" />
                    <Tooltip contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#40916C" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#F4D03F" strokeWidth={2} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Payment Methods */}
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
                <h3 className="text-white text-sm md:text-lg font-semibold mb-2 md:mb-4">Payment Methods Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={paymentMethodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D6A4F" />
                    <XAxis dataKey="method" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" />
                    <Tooltip contentStyle={{ backgroundColor: '#0D2818', border: '1px solid #2D6A4F' }} />
                    <Bar dataKey="count" fill="#D4AF37" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Recent Transactions */}
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6 lg:col-span-2">
                <h3 className="text-white text-sm md:text-lg font-semibold mb-2 md:mb-4">Recent Transactions</h3>
                <div className="space-y-2 md:space-y-3">
                  {mockInvoices.slice(0, 5).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between bg-[#0A1F0A]/50 rounded-lg p-2 md:p-4">
                      <div className="flex items-center gap-2 md:gap-4">
                        <CreditCard className="w-3 md:w-5 h-3 md:h-5 text-[#D4AF37]" />
                        <div>
                          <p className="text-white font-medium text-xs md:text-base">{invoice.student}</p>
                          <p className="text-gray-400 text-[10px] md:text-sm">{invoice.id} • {invoice.batch}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold text-xs md:text-base">${invoice.paid.toLocaleString()}</p>
                        <Badge className={`text-[10px] md:text-xs ${
                          invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                          invoice.status === 'Partial' ? 'bg-yellow-500/20 text-yellow-400' :
                          invoice.status === 'Overdue' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border border-[#2D6A4F]/50 rounded-lg md:rounded-xl p-3 md:p-6 mb-3 md:mb-6"
            >
              <div className="flex flex-wrap gap-2 md:gap-4">
                <div className="relative flex-1 min-w-[120px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 md:w-4 h-3 md:h-4" />
                  <Input
                    placeholder="Search..."
                    value={searchInvoice}
                    onChange={(e) => setSearchInvoice(e.target.value)}
                    className="pl-9 md:pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-28 md:w-48 bg-[#0A1F0A] border-[#2D6A4F] text-white text-xs md:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setShowGenerateInvoiceModal(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-xs md:text-sm"
                >
                  <Plus className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Generate</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </div>
            </motion.div>

            {/* Invoices Table */}
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 overflow-hidden">
              <div className="overflow-x-auto -mx-3 md:mx-0">
                <table className="w-full">
                  <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                    <tr>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">ID</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Student</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden lg:table-cell">Batch</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Amount</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden md:table-cell">Paid</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300 hidden lg:table-cell">Due</th>
                      <th className="px-3 md:px-6 py-2 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice, index) => (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                      >
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-[#D4AF37] font-semibold">{invoice.id}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-white font-medium">{invoice.student}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300 hidden lg:table-cell">{invoice.batch}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-white">${invoice.amount.toLocaleString()}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-white hidden md:table-cell">${invoice.paid.toLocaleString()}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4">
                          <Badge className={`text-[10px] md:text-xs ${
                            invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                            invoice.status === 'Partial' ? 'bg-yellow-500/20 text-yellow-400' :
                            invoice.status === 'Overdue' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-300 hidden lg:table-cell">{invoice.dueDate}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4">
                          <div className="flex gap-1 md:gap-2">
                            {invoice.status !== 'Paid' && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedInvoice(invoice);
                                  setShowRecordPaymentModal(true);
                                }}
                                className="bg-[#40916C] hover:bg-[#2D6A4F] text-white text-[10px] md:text-xs h-6 md:h-8"
                              >
                                Pay
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadInvoice(invoice.id)}
                              className="border-[#40916C] text-[#40916C] h-6 w-6 md:h-8 md:w-8 p-0"
                            >
                              <Download className="w-3 md:w-4 h-3 md:h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Fee Structures Tab */}
          <TabsContent value="fee-structures">
            <div className="flex justify-end mb-6">
              <Button
                onClick={() => {
                  setSelectedFeeStructure(null);
                  setShowFeeStructureModal(true);
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Fee Structure
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              {mockFeeStructures.map((structure, index) => (
                <motion.div
                  key={structure.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white text-lg font-semibold">{structure.batch}</h3>
                        <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] mt-2">{structure.sport}</Badge>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">{structure.status}</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Fee</span>
                        <span className="text-white font-semibold">${structure.monthlyFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Registration Fee</span>
                        <span className="text-white font-semibold">${structure.registrationFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Equipment Fee</span>
                        <span className="text-white font-semibold">${structure.equipmentFee.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-[#2D6A4F]/50">
                        <div className="flex justify-between">
                          <span className="text-[#D4AF37]">Total (First Month)</span>
                          <span className="text-[#D4AF37] font-bold">
                            ${(structure.monthlyFee + structure.registrationFee + structure.equipmentFee).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedFeeStructure(structure);
                        setShowFeeStructureModal(true);
                      }}
                      variant="outline"
                      className="w-full mt-4 border-[#40916C] text-[#40916C]"
                    >
                      Edit Structure
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Monthly Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">$640,000</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Expenses</p>
                    <p className="text-2xl font-bold text-white">$330,000</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Net Profit</p>
                    <p className="text-2xl font-bold text-green-400">$310,000</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Outstanding Fees</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Total Outstanding</p>
                    <p className="text-2xl font-bold text-yellow-400">${pendingAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Overdue Amount</p>
                    <p className="text-2xl font-bold text-red-400">$42,000</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Partial Payments</p>
                    <p className="text-2xl font-bold text-white">$20,000</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <h3 className="text-white text-lg font-semibold mb-4">Payment Analytics</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Total Transactions</p>
                    <p className="text-2xl font-bold text-white">1,090</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Avg Transaction</p>
                    <p className="text-2xl font-bold text-white">$4,587</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Success Rate</p>
                    <p className="text-2xl font-bold text-green-400">98.2%</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Generate Invoice Modal */}
        <Dialog open={showGenerateInvoiceModal} onOpenChange={setShowGenerateInvoiceModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-sm md:max-w-2xl p-4 md:p-6 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-xl">Generate Invoice</DialogTitle>
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
                <Label className="text-gray-300">Batch *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="cricket_a">Cricket Batch A - $5,000/month</SelectItem>
                    <SelectItem value="football">Football Batch - $4,000/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Invoice Date *</Label>
                  <Input type="date" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
                <div>
                  <Label className="text-gray-300">Due Date *</Label>
                  <Input type="date" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Monthly Fee</Label>
                  <Input type="number" defaultValue="5000" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
                <div>
                  <Label className="text-gray-300">Additional Charges</Label>
                  <Input type="number" defaultValue="0" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Notes (Optional)</Label>
                <Textarea 
                  placeholder="Add any notes for this invoice..."
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
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
                onClick={generateInvoice}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Generate & Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Record Payment Modal */}
        <Dialog open={showRecordPaymentModal} onOpenChange={setShowRecordPaymentModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] p-4 md:p-6 max-w-sm md:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-xl">Record Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Invoice</p>
                <p className="text-white font-semibold">{selectedInvoice?.id}</p>
                <p className="text-gray-400 text-sm mt-2">Student</p>
                <p className="text-white">{selectedInvoice?.student}</p>
                <p className="text-gray-400 text-sm mt-2">Amount Due</p>
                <p className="text-[#D4AF37] text-xl font-bold">
                  ${(selectedInvoice?.amount - selectedInvoice?.paid || 0).toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-gray-300">Payment Amount *</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedInvoice?.amount - selectedInvoice?.paid}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Payment Method *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Transaction ID (Optional)</Label>
                <Input className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
              <div>
                <Label className="text-gray-300">Payment Date *</Label>
                <Input type="date" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
              <div>
                <Label className="text-gray-300">Notes (Optional)</Label>
                <Textarea className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRecordPaymentModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={recordPayment}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Record Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Refund Modal */}
        <Dialog open={showRefundModal} onOpenChange={setShowRefundModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] p-4 md:p-6 max-w-sm md:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-xl">Process Refund</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Invoice</p>
                <p className="text-white font-semibold">{selectedInvoice?.id}</p>
                <p className="text-gray-400 text-sm mt-2">Student</p>
                <p className="text-white">{selectedInvoice?.student}</p>
                <p className="text-gray-400 text-sm mt-2">Paid Amount</p>
                <p className="text-white text-xl font-bold">${selectedInvoice?.paid.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-gray-300">Refund Amount *</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedInvoice?.paid}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Refund Reason *</Label>
                <Select>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="student_left">Student Left Academy</SelectItem>
                    <SelectItem value="medical">Medical Reasons</SelectItem>
                    <SelectItem value="duplicate">Duplicate Payment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Refund Method *</Label>
                <Select defaultValue={selectedInvoice?.method?.toLowerCase()}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="original">Original Payment Method</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Additional Notes</Label>
                <Textarea 
                  placeholder="Provide additional details for the refund..."
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRefundModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={processRefund}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Process Refund
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Fee Structure Modal */}
        <Dialog open={showFeeStructureModal} onOpenChange={setShowFeeStructureModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] p-4 md:p-6 max-w-sm md:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-xl">
                {selectedFeeStructure ? 'Edit Fee Structure' : 'Add Fee Structure'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Batch *</Label>
                <Select defaultValue={selectedFeeStructure?.batch}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="cricket_a">Cricket Batch A</SelectItem>
                    <SelectItem value="football">Football Batch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Monthly Fee *</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedFeeStructure?.monthlyFee}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Registration Fee *</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedFeeStructure?.registrationFee}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Equipment Fee *</Label>
                <Input 
                  type="number" 
                  defaultValue={selectedFeeStructure?.equipmentFee}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white" 
                />
              </div>
              <div>
                <Label className="text-gray-300">Status *</Label>
                <Select defaultValue={selectedFeeStructure?.status?.toLowerCase() || 'active'}>
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
                onClick={() => setShowFeeStructureModal(false)}
                className="border-[#40916C] text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={saveFeeStructure}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                Save Structure
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}