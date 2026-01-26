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
  { id: 'INV-001', amount: 500, dueDate: '2026-01-31', status: 'Paid', items: [{ name: 'Monthly Fee', amount: 500 }] },
  { id: 'INV-002', amount: 500, dueDate: '2026-02-28', status: 'Pending', items: [{ name: 'Monthly Fee', amount: 500 }] },
  { id: 'INV-003', amount: 500, dueDate: '2025-12-31', status: 'Paid', items: [{ name: 'Monthly Fee', amount: 500 }] },
  { id: 'INV-004', amount: 650, dueDate: '2025-11-30', status: 'Paid', items: [{ name: 'Monthly Fee', amount: 500 }, { name: 'Equipment Fee', amount: 150 }] },
];

const mockWalletTransactions = [
  { id: 1, date: '2026-01-15', description: 'Fee Payment', type: 'Debit', amount: 500, balance: 250 },
  { id: 2, date: '2026-01-10', description: 'Wallet Recharge', type: 'Credit', amount: 750, balance: 750 },
  { id: 3, date: '2025-12-20', description: 'Fee Payment', type: 'Debit', amount: 500, balance: 0 },
  { id: 4, date: '2025-12-15', description: 'Wallet Recharge', type: 'Credit', amount: 500, balance: 500 },
  { id: 5, date: '2025-11-25', description: 'Fee Payment', type: 'Debit', amount: 650, balance: 0 },
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
      <div className="p-4 md:p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <DollarSign className="w-4 md:w-5 h-4 md:h-5 text-red-400" />
                <p className="text-gray-400 text-xs md:text-sm">Fees Due</p>
              </div>
              <p className="text-xl md:text-3xl font-bold text-white">${totalFeesDue.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
                <p className="text-gray-400 text-xs md:text-sm">Total Paid</p>
              </div>
              <p className="text-xl md:text-3xl font-bold text-white">${totalPaid.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <Clock className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />
                <p className="text-gray-400 text-xs md:text-sm">Pending</p>
              </div>
              <p className="text-xl md:text-3xl font-bold text-white">${pendingAmount.toLocaleString()}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <Wallet className="w-4 md:w-5 h-4 md:h-5 text-[#D4AF37]" />
                <p className="text-gray-400 text-xs md:text-sm">Wallet</p>
              </div>
              <p className="text-xl md:text-3xl font-bold text-white">${walletBalance.toLocaleString()}</p>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="invoices" className="w-full">
          <TabsList className="bg-[#0D2818] border border-[#2D6A4F]/50 mb-4 md:mb-6 w-full md:w-auto">
            <TabsTrigger value="invoices" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Wallet Transactions
            </TabsTrigger>
          </TabsList>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Invoices</h2>
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
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

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {paginatedInvoices.map((invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#0A1F0A]/50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[#D4AF37] font-semibold text-sm">{invoice.id}</p>
                        <p className="text-gray-400 text-xs mt-1">{invoice.dueDate}</p>
                      </div>
                      <Badge className={`${invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'} text-xs`}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-white font-semibold text-lg">${invoice.amount.toLocaleString()}</p>
                      <Button
                        onClick={() => setSelectedInvoice(invoice)}
                        size="sm"
                        variant="outline"
                        className="border-[#40916C] text-[#40916C]"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-gray-400 text-xs md:text-sm">
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
                    <ChevronLeft className="w-4 h-4 md:mr-1" />
                    <span className="hidden md:inline">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentInvoicePage === totalInvoicePages}
                    onClick={() => setCurrentInvoicePage(currentInvoicePage + 1)}
                    className="border-[#40916C] text-gray-300"
                  >
                    <span className="hidden md:inline">Next</span>
                    <ChevronRight className="w-4 h-4 md:ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Wallet Transactions Tab */}
          <TabsContent value="wallet">
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Wallet Transactions</h2>
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
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

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {paginatedWallet.map((txn, index) => (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#0A1F0A]/50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold text-sm">{txn.description}</p>
                        <p className="text-gray-400 text-xs mt-1">{txn.date}</p>
                      </div>
                      <Badge className={`${txn.type === 'Credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} text-xs`}>
                        {txn.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#2D6A4F]/30">
                      <div>
                        <p className="text-gray-400 text-xs">Amount</p>
                        <p className="text-white font-semibold">${txn.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs">Balance</p>
                        <p className="text-[#D4AF37] font-semibold">${txn.balance.toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-gray-400 text-xs md:text-sm">
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
                    <ChevronLeft className="w-4 h-4 md:mr-1" />
                    <span className="hidden md:inline">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentWalletPage === totalWalletPages}
                    onClick={() => setCurrentWalletPage(currentWalletPage + 1)}
                    className="border-[#40916C] text-gray-300"
                  >
                    <span className="hidden md:inline">Next</span>
                    <ChevronRight className="w-4 h-4 md:ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Invoice Details Modal */}
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-lg">Invoice Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-[#0A1F0A]/50 rounded-lg p-3 md:p-4">
                <h3 className="text-[#D4AF37] text-lg md:text-xl font-bold mb-2">{selectedInvoice?.id}</h3>
                <p className="text-gray-400 text-xs md:text-sm">Generated for Student Name</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs md:text-sm mb-2">Items</p>
                <div className="space-y-2">
                  {selectedInvoice?.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between bg-[#0A1F0A]/50 rounded p-3">
                      <span className="text-white text-sm md:text-base">{item.name}</span>
                      <span className="text-white font-semibold text-sm md:text-base">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between bg-[#1A4D2E] rounded-lg p-3 md:p-4">
                <span className="text-white font-semibold text-sm md:text-base">Total</span>
                <span className="text-[#D4AF37] text-lg md:text-xl font-bold">${selectedInvoice?.amount.toLocaleString()}</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs md:text-sm">Status</p>
                <Badge className={`${selectedInvoice?.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'} text-xs md:text-sm`}>
                  {selectedInvoice?.status}
                </Badge>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  onClick={() => handleDownloadPDF(selectedInvoice?.id)}
                  className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  onClick={() => setSelectedInvoice(null)}
                  variant="outline"
                  className="flex-1 border-[#40916C] text-gray-300 text-sm"
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