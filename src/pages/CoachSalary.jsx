import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, TrendingUp, FileText, Download, Eye } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockSalaryData = {
  currentMonth: {
    month: 'January 2026',
    baseSalary: 25000,
    sessionBonus: 3500,
    performanceBonus: 2000,
    deductions: 500,
    netSalary: 30000,
    status: 'Pending',
    paymentDate: '2026-01-31',
  },
  totalEarnings: 180000,
  avgMonthlySalary: 30000,
  lastPayment: {
    amount: 28500,
    date: '2025-12-31',
  },
};

const mockPaymentHistory = [
  {
    id: 1,
    month: 'December 2025',
    baseSalary: 25000,
    sessionBonus: 3000,
    performanceBonus: 1500,
    deductions: 1000,
    netSalary: 28500,
    status: 'Paid',
    paymentDate: '2025-12-31',
  },
  {
    id: 2,
    month: 'November 2025',
    baseSalary: 25000,
    sessionBonus: 3200,
    performanceBonus: 1800,
    deductions: 500,
    netSalary: 29500,
    status: 'Paid',
    paymentDate: '2025-11-30',
  },
  {
    id: 3,
    month: 'October 2025',
    baseSalary: 25000,
    sessionBonus: 2800,
    performanceBonus: 2200,
    deductions: 0,
    netSalary: 30000,
    status: 'Paid',
    paymentDate: '2025-10-31',
  },
  {
    id: 4,
    month: 'September 2025',
    baseSalary: 25000,
    sessionBonus: 3500,
    performanceBonus: 1000,
    deductions: 500,
    netSalary: 29000,
    status: 'Paid',
    paymentDate: '2025-09-30',
  },
];

export default function CoachSalary() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const viewPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setShowDetails(true);
  };

  return (
    <CoachLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Salary & Payments</h2>
          <p className="text-gray-400">Track your earnings and payment history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Current Month</p>
              </div>
              <p className="text-3xl font-bold text-white">${mockSalaryData.currentMonth.netSalary.toLocaleString()}</p>
              <Badge className="mt-2 bg-yellow-500/20 text-yellow-400">
                {mockSalaryData.currentMonth.status}
              </Badge>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Total Earnings</p>
              </div>
              <p className="text-3xl font-bold text-white">${mockSalaryData.totalEarnings.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#F4D03F]" />
                <p className="text-gray-400 text-sm">Average Monthly</p>
              </div>
              <p className="text-3xl font-bold text-white">${mockSalaryData.avgMonthlySalary.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <p className="text-gray-400 text-sm">Last Payment</p>
              </div>
              <p className="text-3xl font-bold text-white">${mockSalaryData.lastPayment.amount.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-1">{new Date(mockSalaryData.lastPayment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </Card>
          </motion.div>
        </div>

        {/* Current Month Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{mockSalaryData.currentMonth.month} Breakdown</h3>
              <Button className="bg-[#40916C] hover:bg-[#2D6A4F] text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Slip
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Base Salary</p>
                <p className="text-2xl font-bold text-white">${mockSalaryData.currentMonth.baseSalary.toLocaleString()}</p>
              </div>
              <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Session Bonus</p>
                <p className="text-2xl font-bold text-green-400">+${mockSalaryData.currentMonth.sessionBonus.toLocaleString()}</p>
              </div>
              <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Performance Bonus</p>
                <p className="text-2xl font-bold text-green-400">+${mockSalaryData.currentMonth.performanceBonus.toLocaleString()}</p>
              </div>
              <div className="bg-[#0A1F0A]/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Deductions</p>
                <p className="text-2xl font-bold text-red-400">-${mockSalaryData.currentMonth.deductions.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] p-4 rounded-lg col-span-2">
                <p className="text-[#0A1F0A] text-sm mb-1 font-semibold">Net Salary</p>
                <p className="text-3xl font-bold text-[#0A1F0A]">${mockSalaryData.currentMonth.netSalary.toLocaleString()}</p>
                <p className="text-[#0A1F0A] text-xs mt-1">Payment Date: {new Date(mockSalaryData.currentMonth.paymentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Payment History */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Payment History</h3>
          <div className="space-y-4">
            {mockPaymentHistory.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-[#D4AF37]" />
                        <h4 className="text-white font-bold text-lg">{payment.month}</h4>
                        <Badge className="bg-green-500/20 text-green-400">{payment.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Base Salary</p>
                          <p className="text-white font-medium">${payment.baseSalary.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Bonuses</p>
                          <p className="text-green-400 font-medium">+${(payment.sessionBonus + payment.performanceBonus).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Deductions</p>
                          <p className="text-red-400 font-medium">-${payment.deductions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Net Salary</p>
                          <p className="text-white font-bold text-lg">${payment.netSalary.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mt-3">
                        Paid on: {new Date(payment.paymentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewPaymentDetails(payment)}
                        className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Payment Details</DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  <div>
                    <h3 className="text-white font-bold text-xl">{selectedPayment.month}</h3>
                    <p className="text-gray-400">Payment Date: {new Date(selectedPayment.paymentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-[#0A1F0A]/50 p-4 rounded-lg">
                    <span className="text-gray-400">Base Salary</span>
                    <span className="text-white font-semibold">${selectedPayment.baseSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0A1F0A]/50 p-4 rounded-lg">
                    <span className="text-gray-400">Session Bonus</span>
                    <span className="text-green-400 font-semibold">+${selectedPayment.sessionBonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0A1F0A]/50 p-4 rounded-lg">
                    <span className="text-gray-400">Performance Bonus</span>
                    <span className="text-green-400 font-semibold">+${selectedPayment.performanceBonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0A1F0A]/50 p-4 rounded-lg">
                    <span className="text-gray-400">Deductions</span>
                    <span className="text-red-400 font-semibold">-${selectedPayment.deductions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] p-4 rounded-lg">
                    <span className="text-[#0A1F0A] font-bold">Net Salary</span>
                    <span className="text-[#0A1F0A] font-bold text-2xl">${selectedPayment.netSalary.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(false)}
                    className="border-[#40916C] text-gray-300"
                  >
                    Close
                  </Button>
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                    <Download className="w-4 h-4 mr-2" />
                    Download Slip
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}