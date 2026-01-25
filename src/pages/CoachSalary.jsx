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
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Salary & Payments</h2>
          <p className="text-gray-400 text-xs md:text-sm">Track your earnings and payment history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <DollarSign className="w-4 md:w-5 h-4 md:h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-xs md:text-sm">Current Month</p>
              </div>
              <p className="text-lg md:text-3xl font-bold text-white">${mockSalaryData.currentMonth.netSalary.toLocaleString()}</p>
              <Badge className="mt-2 bg-yellow-500/20 text-yellow-400 text-xs">
                {mockSalaryData.currentMonth.status}
              </Badge>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
                <p className="text-gray-400 text-xs md:text-sm">Total Earnings</p>
              </div>
              <p className="text-lg md:text-3xl font-bold text-white">${mockSalaryData.totalEarnings.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <Calendar className="w-4 md:w-5 h-4 md:h-5 text-[#F4D03F]" />
                <p className="text-gray-400 text-xs md:text-sm">Average Monthly</p>
              </div>
              <p className="text-lg md:text-3xl font-bold text-white">${mockSalaryData.avgMonthlySalary.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <FileText className="w-4 md:w-5 h-4 md:h-5 text-blue-400" />
                <p className="text-gray-400 text-xs md:text-sm">Last Payment</p>
              </div>
              <p className="text-lg md:text-3xl font-bold text-white">${mockSalaryData.lastPayment.amount.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-1">{new Date(mockSalaryData.lastPayment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </Card>
          </motion.div>
        </div>

        {/* Current Month Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-white">{mockSalaryData.currentMonth.month} Breakdown</h3>
              <Button className="bg-[#40916C] hover:bg-[#2D6A4F] text-white text-sm w-full md:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Download Slip
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              <div className="bg-[#0A1F0A]/50 p-3 rounded-lg">
                <p className="text-gray-400 text-xs md:text-sm mb-1">Base Salary</p>
                <p className="text-lg md:text-2xl font-bold text-white">${mockSalaryData.currentMonth.baseSalary.toLocaleString()}</p>
              </div>
              <div className="bg-[#0A1F0A]/50 p-3 rounded-lg">
                <p className="text-gray-400 text-xs md:text-sm mb-1">Session Bonus</p>
                <p className="text-lg md:text-2xl font-bold text-green-400">+${mockSalaryData.currentMonth.sessionBonus.toLocaleString()}</p>
              </div>
              <div className="bg-[#0A1F0A]/50 p-3 rounded-lg">
                <p className="text-gray-400 text-xs md:text-sm mb-1">Performance Bonus</p>
                <p className="text-lg md:text-2xl font-bold text-green-400">+${mockSalaryData.currentMonth.performanceBonus.toLocaleString()}</p>
              </div>
              <div className="bg-[#0A1F0A]/50 p-3 rounded-lg">
                <p className="text-gray-400 text-xs md:text-sm mb-1">Deductions</p>
                <p className="text-lg md:text-2xl font-bold text-red-400">-${mockSalaryData.currentMonth.deductions.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] p-3 rounded-lg col-span-1 md:col-span-2">
                <p className="text-[#0A1F0A] text-xs md:text-sm mb-1 font-semibold">Net Salary</p>
                <p className="text-2xl md:text-3xl font-bold text-[#0A1F0A]">${mockSalaryData.currentMonth.netSalary.toLocaleString()}</p>
                <p className="text-[#0A1F0A] text-xs mt-1">Payment Date: {new Date(mockSalaryData.currentMonth.paymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Payment History */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">Payment History</h3>
          <div className="space-y-3 md:space-y-4">
            {mockPaymentHistory.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:justify-between gap-3 md:gap-0">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                        <Calendar className="w-4 md:w-5 h-4 md:h-5 text-[#D4AF37]" />
                        <h4 className="text-white font-bold text-base md:text-lg">{payment.month}</h4>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">{payment.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                        <div>
                          <p className="text-gray-400 text-xs md:text-sm">Base Salary</p>
                          <p className="text-white font-medium text-sm md:text-base">${payment.baseSalary.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs md:text-sm">Bonuses</p>
                          <p className="text-green-400 font-medium text-sm md:text-base">+${(payment.sessionBonus + payment.performanceBonus).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs md:text-sm">Deductions</p>
                          <p className="text-red-400 font-medium text-sm md:text-base">-${payment.deductions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs md:text-sm">Net Salary</p>
                          <p className="text-white font-bold text-sm md:text-lg">${payment.netSalary.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs md:text-sm mt-2">
                        Paid on: {new Date(payment.paymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewPaymentDetails(payment)}
                        className="border-[#40916C] text-[#40916C] hover:bg-[#40916C]/10 flex-1 md:flex-none text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1 md:mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 flex-1 md:flex-none text-xs"
                      >
                        <Download className="w-3 h-3 mr-1 md:mr-2" />
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
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-lg md:text-xl">Payment Details</DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <Calendar className="w-5 md:w-6 h-5 md:h-6 text-[#D4AF37]" />
                  <div>
                    <h3 className="text-white font-bold text-base md:text-xl">{selectedPayment.month}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">Payment Date: {new Date(selectedPayment.paymentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                    <span className="text-gray-400 text-xs md:text-sm">Base Salary</span>
                    <span className="text-white font-semibold text-sm md:text-base">${selectedPayment.baseSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                    <span className="text-gray-400 text-xs md:text-sm">Session Bonus</span>
                    <span className="text-green-400 font-semibold text-sm md:text-base">+${selectedPayment.sessionBonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                    <span className="text-gray-400 text-xs md:text-sm">Performance Bonus</span>
                    <span className="text-green-400 font-semibold text-sm md:text-base">+${selectedPayment.performanceBonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#0A1F0A]/50 p-3 md:p-4 rounded-lg">
                    <span className="text-gray-400 text-xs md:text-sm">Deductions</span>
                    <span className="text-red-400 font-semibold text-sm md:text-base">-${selectedPayment.deductions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] p-3 md:p-4 rounded-lg">
                    <span className="text-[#0A1F0A] font-bold text-sm md:text-base">Net Salary</span>
                    <span className="text-[#0A1F0A] font-bold text-lg md:text-2xl">${selectedPayment.netSalary.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row md:justify-end gap-2 md:gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(false)}
                    className="border-[#40916C] text-gray-300 text-sm"
                  >
                    Close
                  </Button>
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-sm w-full md:w-auto">
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