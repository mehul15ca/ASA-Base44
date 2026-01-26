import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StoreLayout from '../components/store/StoreLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Package, TrendingUp, AlertTriangle, DollarSign, Eye } from 'lucide-react';

const kpiData = [
  { label: 'Total Products', value: '247', subtext: '+12 this month', icon: Package },
  { label: 'Active Products', value: '189', subtext: '76% of total', icon: TrendingUp },
  { label: 'Orders Today', value: '23', subtext: '+5 from yesterday', icon: DollarSign },
  { label: 'Pending Shipments', value: '8', subtext: 'Awaiting dispatch', icon: Package },
  { label: 'Low Stock Items', value: '14', subtext: 'Needs attention', icon: AlertTriangle },
  { label: 'Revenue (Month)', value: '$12,450', subtext: '+18% vs last month', icon: DollarSign },
];

const recentOrders = [
  { id: 'ORD-1234', student: 'John Smith', studentId: 'STU-0045', items: 3, total: '$125.00', status: 'Pending', date: '2026-01-22 10:30' },
  { id: 'ORD-1235', student: 'Emma Wilson', studentId: 'STU-0067', items: 1, total: '$45.00', status: 'Processing', date: '2026-01-22 09:15' },
  { id: 'ORD-1236', student: 'Michael Brown', studentId: 'STU-0089', items: 2, total: '$89.50', status: 'Shipped', date: '2026-01-22 08:45' },
  { id: 'ORD-1237', student: 'Sarah Davis', studentId: 'STU-0102', items: 4, total: '$156.00', status: 'Delivered', date: '2026-01-21 16:20' },
  { id: 'ORD-1238', student: 'James Johnson', studentId: 'STU-0115', items: 1, total: '$32.00', status: 'Cancelled', date: '2026-01-21 14:10' },
];

const inventoryAlerts = [
  { product: 'Training Jersey', variant: 'Size M', current: 3, threshold: 10, status: 'Low Stock' },
  { product: 'Football Boots', variant: 'Size 9', current: 0, threshold: 5, status: 'Out of Stock' },
  { product: 'Cricket Bat', variant: 'Standard', current: 2, threshold: 8, status: 'Low Stock' },
  { product: 'Water Bottle', variant: '750ml', current: 1, threshold: 15, status: 'Low Stock' },
];

const shippingStatus = [
  { label: 'Pending', count: 8, color: 'bg-yellow-500', percentage: 25 },
  { label: 'In Transit', count: 15, color: 'bg-blue-500', percentage: 47 },
  { label: 'Delivered', count: 7, color: 'bg-green-500', percentage: 22 },
  { label: 'Failed / Issues', count: 2, color: 'bg-red-500', percentage: 6 },
];

const statusColors = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  Processing: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  Shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  Delivered: 'bg-green-500/20 text-green-400 border-green-500/50',
  Cancelled: 'bg-red-500/20 text-red-400 border-red-500/50',
};

export default function StoreDashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [restockItem, setRestockItem] = useState(null);

  return (
    <StoreLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Store Dashboard</h1>
          <p className="text-gray-400 mb-8">Overview of store activity</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
                    <p className="text-3xl font-bold text-white mb-2">{kpi.value}</p>
                    <p className="text-xs text-gray-500">{kpi.subtext}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
              <CardHeader>
                <CardTitle className="text-white">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-semibold">{order.id}</p>
                          <p className="text-sm text-gray-400">{order.student} • {order.studentId}</p>
                        </div>
                        <Badge className={statusColors[order.status]}>{order.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{order.items} items • {order.total}</span>
                        <Button size="sm" variant="outline" className="border-[#40916C] text-[#D4AF37]" onClick={() => setSelectedOrder(order)}>
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{order.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Inventory Alerts */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
            <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
              <CardHeader>
                <CardTitle className="text-white">Inventory Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inventoryAlerts.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-semibold">{item.product}</p>
                          <p className="text-sm text-gray-400">{item.variant}</p>
                        </div>
                        <Badge className={item.status === 'Out of Stock' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Stock: {item.current} / {item.threshold}</p>
                        <Button size="sm" className="bg-[#2D6A4F] hover:bg-[#40916C]" onClick={() => setRestockItem(item)}>
                          Restock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Shipping Status Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-6">
          <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
            <CardHeader>
              <CardTitle className="text-white">Shipping Status Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shippingStatus.map((status) => (
                  <div key={status.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">{status.label}</span>
                      <span className="text-white font-semibold">{status.count} orders ({status.percentage}%)</span>
                    </div>
                    <Progress value={status.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
          <DialogHeader>
            <DialogTitle className="text-white">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 text-gray-300">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="text-white font-semibold">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="text-white">{selectedOrder.student} ({selectedOrder.studentId})</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Items</p>
                <p className="text-white">{selectedOrder.items} items</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-white font-semibold text-xl">{selectedOrder.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge className={statusColors[selectedOrder.status]}>{selectedOrder.status}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Restock Modal */}
      <Dialog open={!!restockItem} onOpenChange={() => setRestockItem(null)}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
          <DialogHeader>
            <DialogTitle className="text-white">Restock Item</DialogTitle>
          </DialogHeader>
          {restockItem && (
            <div className="space-y-4">
              <p className="text-gray-300">{restockItem.product} - {restockItem.variant}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-[#0A1F0A]">
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="text-white font-bold text-lg">{restockItem.current}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-[#0A1F0A]">
                  <p className="text-xs text-gray-500">Reserved</p>
                  <p className="text-white font-bold text-lg">0</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-[#0A1F0A]">
                  <p className="text-xs text-gray-500">Available</p>
                  <p className="text-white font-bold text-lg">{restockItem.current}</p>
                </div>
              </div>
              <Button className="w-full bg-[#2D6A4F] hover:bg-[#40916C]" onClick={() => setRestockItem(null)}>
                Confirm Restock
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </StoreLayout>
  );
}