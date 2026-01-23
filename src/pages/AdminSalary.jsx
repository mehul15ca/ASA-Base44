import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, DollarSign, TrendingUp, Calendar, CheckCircle, Clock, Download } from 'lucide-react';

export default function AdminSalary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMonth, setFilterMonth] = useState('January 2026');
  const [salaries] = useState([
    {
      id: 1,
      employeeName: 'Rahul Sharma',
      role: 'Senior Coach',
      employeeId: 'EMP001',
      baseSalary: 45000,
      allowances: 5000,
      deductions: 2000,
      netSalary: 48000,
      month: 'January 2026',
      status: 'Paid',
      paidDate: '2026-01-05'
    },
    {
      id: 2,
      employeeName: 'Priya Patel',
      role: 'Coach',
      employeeId: 'EMP002',
      baseSalary: 35000,
      allowances: 3000,
      deductions: 1500,
      netSalary: 36500,
      month: 'January 2026',
      status: 'Paid',
      paidDate: '2026-01-05'
    },
    {
      id: 3,
      employeeName: 'Amit Kumar',
      role: 'Admin Staff',
      employeeId: 'EMP003',
      baseSalary: 30000,
      allowances: 2000,
      deductions: 1000,
      netSalary: 31000,
      month: 'January 2026',
      status: 'Pending',
      paidDate: null
    },
    {
      id: 4,
      employeeName: 'Sneha Reddy',
      role: 'Assistant Coach',
      employeeId: 'EMP004',
      baseSalary: 28000,
      allowances: 2500,
      deductions: 1200,
      netSalary: 29300,
      month: 'January 2026',
      status: 'Pending',
      paidDate: null
    }
  ]);

  const filteredSalaries = salaries.filter(s =>
    s.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPayroll = salaries.reduce((sum, s) => sum + s.netSalary, 0);
  const paidCount = salaries.filter(s => s.status === 'Paid').length;
  const pendingCount = salaries.filter(s => s.status === 'Pending').length;

  return (
    <AdminLayout currentPageName="AdminSalary">
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Salary Management</h1>
            <p className="text-gray-400 mt-1">Manage employee salaries and payroll</p>
          </div>
          <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Export Payroll
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Payroll
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">${totalPayroll.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{salaries.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{paidCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">{pendingCount}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="px-3 py-2 border border-[#2D6A4F] bg-[#0A1F0A] text-white rounded-md text-sm"
                >
                  <option>January 2026</option>
                  <option>December 2025</option>
                  <option>November 2025</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2D6A4F]/50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Employee</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Role</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Base Salary</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Allowances</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Deductions</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Net Salary</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr key={salary.id} className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-white">{salary.employeeName}</div>
                          <div className="text-xs text-gray-400">{salary.employeeId}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{salary.role}</td>
                      <td className="py-3 px-4 text-right text-sm text-gray-300">${salary.baseSalary.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-sm text-green-500">+${salary.allowances.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-sm text-red-500">-${salary.deductions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#D4AF37]">${salary.netSalary.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={salary.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {salary.status}
                        </Badge>
                        {salary.paidDate && (
                          <div className="text-xs text-gray-500 mt-1">{salary.paidDate}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="border-[#40916C] text-gray-300">
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
                            <DialogHeader>
                              <DialogTitle className="text-white">Salary Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-gray-400">Employee Name</Label>
                                  <p className="font-medium text-white mt-1">{salary.employeeName}</p>
                                </div>
                                <div>
                                  <Label className="text-gray-400">Employee ID</Label>
                                  <p className="font-medium text-white mt-1">{salary.employeeId}</p>
                                </div>
                              </div>
                              <div>
                                <Label className="text-gray-400">Role</Label>
                                <p className="font-medium text-white mt-1">{salary.role}</p>
                              </div>
                              <div className="border-t border-[#2D6A4F]/50 pt-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Base Salary</span>
                                    <span className="font-medium text-white">${salary.baseSalary.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-green-500">Allowances</span>
                                    <span className="font-medium text-green-500">+${salary.allowances.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-red-500">Deductions</span>
                                    <span className="font-medium text-red-500">-${salary.deductions.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between border-t border-[#2D6A4F]/50 pt-2">
                                    <span className="font-semibold text-white">Net Salary</span>
                                    <span className="font-bold text-lg text-[#D4AF37]">${salary.netSalary.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end gap-3 pt-4">
                                <Button variant="outline" className="border-[#40916C] text-gray-300">Download Slip</Button>
                                {salary.status === 'Pending' && (
                                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                                    Mark as Paid
                                  </Button>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}