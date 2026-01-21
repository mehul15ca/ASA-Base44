import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock, FileText, Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import CoachLayout from '../components/coach/CoachLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';

const mockPayments = [
  { id: 'RCP-000001', period: '2026-01-01 to 2026-01-15', sessions: 12, rate: 75, amount: 900, generatedOn: '2026-01-16 01:00 AM', status: 'Paid' },
  { id: 'RCP-000002', period: '2025-12-16 to 2025-12-31', sessions: 14, rate: 75, amount: 1050, generatedOn: '2026-01-01 01:00 AM', status: 'Paid' },
  { id: 'RCP-000003', period: '2025-12-01 to 2025-12-15', sessions: 13, rate: 75, amount: 975, generatedOn: '2025-12-16 01:00 AM', status: 'Paid' },
  { id: 'RCP-000004', period: '2025-11-16 to 2025-11-30', sessions: 11, rate: 75, amount: 825, generatedOn: '2025-12-01 01:00 AM', status: 'Paid' },
  { id: 'RCP-000005', period: '2025-11-01 to 2025-11-15', sessions: 10, rate: 75, amount: 750, generatedOn: '2025-11-16 01:00 AM', status: 'Unpaid' },
];

export default function CoachSalary() {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalEarned = mockPayments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const expectedPay = 12 * 75;
  const pendingPayment = mockPayments.filter(p => p.status === 'Unpaid').reduce((sum, p) => sum + p.amount, 0);
  const ratePerSession = 75;

  const totalPages = Math.ceil(mockPayments.length / itemsPerPage);
  const paginatedPayments = mockPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownloadPDF = () => {
    toast.success('Receipt downloaded as PDF');
  };

  return (
    <CoachLayout>
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Total Earned (YTD)</p>
              </div>
              <p className="text-3xl font-bold text-white">${totalEarned}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Expected Pay</p>
              </div>
              <p className="text-3xl font-bold text-white">${expectedPay}</p>
              <p className="text-gray-400 text-xs mt-1">12 sessions completed</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <p className="text-gray-400 text-sm">Pending Payment</p>
              </div>
              <p className="text-3xl font-bold text-white">${pendingPayment}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-[#40916C]" />
                <p className="text-gray-400 text-sm">Rate Per Session</p>
              </div>
              <p className="text-3xl font-bold text-white">${ratePerSession}</p>
            </Card>
          </motion.div>
        </div>

        {/* Pay Schedule */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Bi-weekly Pay Schedule</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                <h3 className="text-[#D4AF37] font-semibold mb-2">Period 1</h3>
                <p className="text-white">1st – 15th of month</p>
                <p className="text-gray-400 text-sm mt-2">Receipt generated on 16th at 1:00 AM</p>
              </div>
              <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                <h3 className="text-[#D4AF37] font-semibold mb-2">Period 2</h3>
                <p className="text-white">16th – Last day of month</p>
                <p className="text-gray-400 text-sm mt-2">Receipt generated on 1st at 1:00 AM</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Payment History */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Pay Period</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Sessions</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Generated On</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPayments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30"
                    >
                      <td className="px-6 py-4">
                        <p className="text-white font-medium">{payment.period}</p>
                      </td>
                      <td className="px-6 py-4 text-white">{payment.sessions}</td>
                      <td className="px-6 py-4 text-white">${payment.rate}</td>
                      <td className="px-6 py-4 text-white font-semibold">${payment.amount}</td>
                      <td className="px-6 py-4 text-gray-300">{payment.generatedOn}</td>
                      <td className="px-6 py-4">
                        <Badge className={payment.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button onClick={() => setSelectedReceipt(payment)} size="sm" variant="outline" className="border-[#40916C] text-[#40916C]">
                          <Eye className="w-4 h-4 mr-1" />
                          View Receipt
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, mockPayments.length)} of {mockPayments.length} records
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="border-[#40916C] text-gray-300">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="border-[#40916C] text-gray-300">
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Receipt Modal */}
        <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Payment Receipt</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-[#0A1F0A]/50 rounded-lg p-6 text-center">
                <h3 className="text-white text-xl font-bold mb-2">ASA Sports Academy</h3>
                <p className="text-[#D4AF37] text-lg font-semibold mb-4">Payment Receipt</p>
                <div className="border-t border-b border-[#2D6A4F] py-3 mb-3">
                  <p className="text-gray-400 text-sm">Receipt ID</p>
                  <p className="text-white font-bold text-xl">{selectedReceipt?.id}</p>
                </div>
                <p className="text-gray-400 text-sm">Generated On: {selectedReceipt?.generatedOn}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-gray-400 text-sm">Coach Name</p><p className="text-white">John Doe</p></div>
                <div><p className="text-gray-400 text-sm">Coach ID</p><p className="text-white">COACH-001</p></div>
              </div>

              <div className="bg-[#1A4D2E] rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Pay Period</p>
                <p className="text-white font-semibold">{selectedReceipt?.period}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-gray-400">Sessions Completed</span><span className="text-white">{selectedReceipt?.sessions}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Rate Per Session</span><span className="text-white">${selectedReceipt?.rate}</span></div>
                <div className="border-t border-[#2D6A4F] pt-2 flex justify-between">
                  <span className="text-[#D4AF37] font-semibold">Total Amount</span>
                  <span className="text-[#D4AF37] font-bold text-xl">${selectedReceipt?.amount}</span>
                </div>
              </div>

              <div className="bg-[#0A1F0A]/50 rounded p-3">
                <Badge className={selectedReceipt?.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                  Payment Status: {selectedReceipt?.status}
                </Badge>
              </div>

              <p className="text-gray-400 text-xs text-center">This is an auto-generated receipt. No signature required.</p>

              <div className="flex gap-3">
                <Button onClick={handleDownloadPDF} className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={() => setSelectedReceipt(null)} variant="outline" className="flex-1 border-[#40916C] text-gray-300">Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </CoachLayout>
  );
}