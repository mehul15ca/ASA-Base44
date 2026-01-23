import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Wallet, Clock, CheckCircle, Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

const mockInvoices = [
  { id: 'INV-001', amount: 5000, dueDate: '2026-01-31', status: 'Paid', items: [{ name: 'Monthly Fee', amount: 5000 }] },
  { id: 'INV-002', amount: 5000, dueDate: '2026-02-28', status: 'Pending', items: [{ name: 'Monthly Fee', amount: 5000 }] },
  { id: 'INV-003', amount: 5000, dueDate: '2025-12-31', status: 'Paid', items: [{ name: 'Monthly Fee', amount: 5000 }] },
  { id: 'INV-004', amount: 6500, dueDate: '2025-11-30', status: 'Paid', items: [{ name: 'Monthly Fee', amount: 5000 }, { name: 'Equipment Fee', amount: 1500 }] },
];

const mockWalletTransactions = [
  { id: 1, date: '2026-01-15', description: 'Fee Payment', type: 'Debit', amount: 5000, balance: 2500 },
  { id: 2, date: '2026-01-10', description: 'Wallet Recharge', type: 'Credit', amount: 7500, balance: 7500 },
  { id: 3, date: '2025-12-20', description: 'Fee Payment', type: 'Debit', amount: 5000, balance: 0 },
  { id: 4, date: '2025-12-15', description: 'Wallet Recharge', type: 'Credit', amount: 5000, balance: 5000 },
  { id: 5, date: '2025-11-25', description: 'Fee Payment', type: 'Debit', amount: 6500, balance: 0 },
];

export default function StudentFees() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [currentInvoicePage, setCurrentInvoicePage] = useState(1);
  const [currentWalletPage, setCurrentWalletPage] = useState(1);
  const itemsPerPage = 5;

  const totalFeesDue = mockInvoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = mockInvoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = totalFeesDue;
  const walletBalance = 2500;

  const totalInvoicePages = Math.ceil(mockInvoices.length / itemsPerPage);
  const paginatedInvoices = mockInvoices.slice((currentInvoicePage - 1) * itemsPerPage, currentInvoicePage * itemsPerPage);

  const totalWalletPages = Math.ceil(mockWalletTransactions.length / itemsPerPage);
  const paginatedWallet = mockWalletTransactions.slice((currentWalletPage - 1) * itemsPerPage, currentWalletPage * itemsPerPage);

  const handleDownloadPDF = (invoiceId) => {
    toast.success(`Invoice ${invoiceId} downloaded as PDF`);
  };

  return (
    <StudentLayout>
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-red-400" />
                <p className="text-gray-400 text-sm">Total Fees Due</p>
              </div>
              <p className="text-3xl font-bold text-white">${totalFeesDue.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-gray-400 text-sm">Total Paid</p>
              </div>
              <p className="text-3xl font-bold text-white">${totalPaid.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <p className="text-gray-400 text-sm">Pending Amount</p>
              </div>
              <p className="text-3xl font-bold text-white">${pendingAmount.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-5 h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-sm">Wallet Balance</p>
              </div>
              <p className="text-3xl font-bold text-white">${walletBalance.toLocaleString()}</p>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="invoices" className="w-full">
          <TabsList className="bg-[#0D2818] border border-[#2D6A4F]/50 mb-6">
            <TabsTrigger value="invoices" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Wallet Transactions
            </TabsTrigger>
          </TabsList>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Invoices</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Invoice ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Due Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedInvoices.map((invoice, index) => (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-[#2D6A4F]/30"
                      >
                        <td className="px-6 py-4 text-sm text-[#D4AF37] font-semibold">{invoice.id}</td>
                        <td className="px-6 py-4 text-sm text-white">${invoice.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{invoice.dueDate}</td>
                        <td className="px-6 py-4">
                          <Badge className={invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            onClick={() => setSelectedInvoice(invoice)}
                            size="sm"
                            variant="outline"
                            className="border-[#40916C] text-[#40916C]"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-gray-400 text-sm">
                  Showing {(currentInvoicePage - 1) * itemsPerPage + 1} to {Math.min(currentInvoicePage * itemsPerPage, mockInvoices.length)} of {mockInvoices.length} invoices
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentInvoicePage === 1}
                    onClick={() => setCurrentInvoicePage(currentInvoicePage - 1)}
                    className="border-[#40916C] text-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentInvoicePage === totalInvoicePages}
                    onClick={() => setCurrentInvoicePage(currentInvoicePage + 1)}
                    className="border-[#40916C] text-gray-300"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Wallet Transactions Tab */}
          <TabsContent value="wallet">
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Wallet Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedWallet.map((txn, index) => (
                      <motion.tr
                        key={txn.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-[#2D6A4F]/30"
                      >
                        <td className="px-6 py-4 text-sm text-white">{txn.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{txn.description}</td>
                        <td className="px-6 py-4">
                          <Badge className={txn.type === 'Credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                            {txn.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">${txn.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-[#D4AF37] font-semibold">${txn.balance.toLocaleString()}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-gray-400 text-sm">
                  Showing {(currentWalletPage - 1) * itemsPerPage + 1} to {Math.min(currentWalletPage * itemsPerPage, mockWalletTransactions.length)} of {mockWalletTransactions.length} transactions
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentWalletPage === 1}
                    onClick={() => setCurrentWalletPage(currentWalletPage - 1)}
                    className="border-[#40916C] text-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentWalletPage === totalWalletPages}
                    onClick={() => setCurrentWalletPage(currentWalletPage + 1)}
                    className="border-[#40916C] text-gray-300"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Invoice Details Modal */}
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
            <DialogHeader>
              <DialogTitle className="text-white">Invoice Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-[#0A1F0A]/50 rounded-lg p-4">
                <h3 className="text-[#D4AF37] text-xl font-bold mb-2">{selectedInvoice?.id}</h3>
                <p className="text-gray-400 text-sm">Generated for Student Name</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Items</p>
                <div className="space-y-2">
                  {selectedInvoice?.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between bg-[#0A1F0A]/50 rounded p-3">
                      <span className="text-white">{item.name}</span>
                      <span className="text-white font-semibold">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between bg-[#1A4D2E] rounded-lg p-4">
                <span className="text-white font-semibold">Total</span>
                <span className="text-[#D4AF37] text-xl font-bold">${selectedInvoice?.amount.toLocaleString()}</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <Badge className={selectedInvoice?.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                  {selectedInvoice?.status}
                </Badge>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleDownloadPDF(selectedInvoice?.id)}
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  onClick={() => setSelectedInvoice(null)}
                  variant="outline"
                  className="flex-1 border-[#40916C] text-gray-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </StudentLayout>
  );
}