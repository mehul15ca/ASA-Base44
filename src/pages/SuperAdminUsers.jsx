import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, UserPlus, Shield, Mail, Calendar, MoreVertical } from 'lucide-react';
import SuperAdminLayout from '../components/superadmin/SuperAdminLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

const mockUsers = [
  { id: 1, name: 'John Smith', email: 'john@academy.com', role: 'Admin', status: 'Active', lastLogin: '2026-01-21 10:30', registeredDate: '2025-06-15' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@academy.com', role: 'Coach', status: 'Active', lastLogin: '2026-01-21 09:15', registeredDate: '2025-07-20' },
  { id: 3, name: 'Mike Williams', email: 'mike@academy.com', role: 'Student', status: 'Active', lastLogin: '2026-01-20 18:45', registeredDate: '2025-08-10' },
  { id: 4, name: 'Emily Brown', email: 'emily@academy.com', role: 'Student', status: 'Suspended', lastLogin: '2026-01-15 14:20', registeredDate: '2025-09-05' },
  { id: 5, name: 'David Lee', email: 'david@academy.com', role: 'Coach', status: 'Active', lastLogin: '2026-01-21 11:00', registeredDate: '2025-07-30' },
  { id: 6, name: 'Lisa Garcia', email: 'lisa@academy.com', role: 'Admin', status: 'Active', lastLogin: '2026-01-21 08:30', registeredDate: '2025-06-01' },
];

export default function SuperAdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student' });

  const stats = [
    { label: 'Total Users', value: '2,847' },
    { label: 'Active Users', value: '2,632' },
    { label: 'Admins', value: '12' },
    { label: 'New This Month', value: '143' },
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    toast.success(`User ${newUser.name} added successfully`);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', role: 'Student' });
  };

  const handleResetPassword = (userId) => {
    toast.success('Password reset email sent');
  };

  const handleSuspendUser = (userId) => {
    toast.warning('User suspended');
  };

  const handleDeleteUser = (userId) => {
    toast.error('User deleted');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin': return <Badge className="bg-purple-500/20 text-purple-400">Admin</Badge>;
      case 'Coach': return <Badge className="bg-blue-500/20 text-blue-400">Coach</Badge>;
      case 'Student': return <Badge className="bg-green-500/20 text-green-400">Student</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400">{role}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <Badge className="bg-green-500/20 text-green-400">Active</Badge>;
      case 'Suspended': return <Badge className="bg-red-500/20 text-red-400">Suspended</Badge>;
      case 'Inactive': return <Badge className="bg-gray-500/20 text-gray-400">Inactive</Badge>;
      default: return <Badge className="bg-gray-500/20 text-gray-400">{status}</Badge>;
    }
  };

  return (
    <SuperAdminLayout>
      <div>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage all system users and permissions</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters and Actions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-40 bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                  <SelectItem value="All">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Coach">Coach</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40 bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => setShowAddUserModal(true)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Users Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Last Login</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Registered</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                      <td className="px-6 py-4 text-gray-300">{user.lastLogin}</td>
                      <td className="px-6 py-4 text-gray-300">{user.registeredDate}</td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-gray-400">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-[#0D2818] border-[#2D6A4F]">
                            <DropdownMenuItem 
                              className="text-gray-300 hover:bg-[#2D6A4F]/20"
                              onClick={() => handleResetPassword(user.id)}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-gray-300 hover:bg-[#2D6A4F]/20"
                              onClick={() => handleSuspendUser(user.id)}
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-400 hover:bg-red-500/20"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Users className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Add User Modal */}
        <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Name</label>
                <Input
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Role</label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Coach">Coach</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddUserModal(false)} className="border-[#2D6A4F] text-gray-300">
                Cancel
              </Button>
              <Button onClick={handleAddUser} className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SuperAdminLayout>
  );
}