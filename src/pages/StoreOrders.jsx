import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StoreLayout from '../components/store/StoreLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Eye, X, FileText, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const initialOrders = [
  {
    id: 'ORD-1234',
    student: { name: 'John Smith', id: 'STU-0045', email: 'john@example.com', phone: '+1234567890' },
    items: [
      { name: 'Training Jersey', qty: 2, price: 45.00 },
      { name: 'Sports Bag', qty: 1, price: 35.50 }
    ],
    subtotal: 125.50,
    shipping: 10.00,
    tax: 13.55,
    total: 149.05,
    payment: 'Paid',
    status: 'Pending',
    date: '2026-01-22 10:30',
    shippingMethod: 'Express Delivery',
    trackingNumber: '',
    address: '123 Main St, City, State 12345',
    timeline: [
      { status: 'Order Placed', date: '2026-01-22 10:30', completed: true },
      { status: 'Payment Confirmed', date: '2026-01-22 10:31', completed: true },
      { status: 'Processing', date: '', completed: false },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-1235',
    student: { name: 'Emma Wilson', id: 'STU-0067', email: 'emma@example.com', phone: '+1234567891' },
    items: [{ name: 'Football Boots', qty: 1, price: 79.99 }],
    subtotal: 79.99,
    shipping: 8.00,
    tax: 8.80,
    total: 96.79,
    payment: 'Paid',
    status: 'Processing',
    date: '2026-01-22 09:15',
    shippingMethod: 'Standard Delivery',
    trackingNumber: 'TRK123456789',
    address: '456 Oak Ave, City, State 12346',
    timeline: [
      { status: 'Order Placed', date: '2026-01-22 09:15', completed: true },
      { status: 'Payment Confirmed', date: '2026-01-22 09:16', completed: true },
      { status: 'Processing', date: '2026-01-22 09:30', completed: true },
      { status: 'Shipped', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-1236',
    student: { name: 'Michael Brown', id: 'STU-0089', email: 'michael@example.com', phone: '+1234567892' },
    items: [{ name: 'Cricket Bat', qty: 1, price: 125.00 }, { name: 'Water Bottle', qty: 2, price: 15.00 }],
    subtotal: 155.00,
    shipping: 12.00,
    tax: 16.70,
    total: 183.70,
    payment: 'Paid',
    status: 'Shipped',
    date: '2026-01-21 14:20',
    shippingMethod: 'Express Delivery',
    trackingNumber: 'TRK987654321',
    address: '789 Pine Rd, City, State 12347',
    timeline: [
      { status: 'Order Placed', date: '2026-01-21 14:20', completed: true },
      { status: 'Payment Confirmed', date: '2026-01-21 14:21', completed: true },
      { status: 'Processing', date: '2026-01-21 15:00', completed: true },
      { status: 'Shipped', date: '2026-01-22 08:00', completed: true },
      { status: 'Delivered', date: '', completed: false }
    ]
  },
  {
    id: 'ORD-1237',
    student: { name: 'Sarah Davis', id: 'STU-0102', email: 'sarah@example.com', phone: '+1234567893' },
    items: [{ name: 'Training Jersey', qty: 1, price: 45.00 }],
    subtotal: 45.00,
    shipping: 8.00,
    tax: 5.30,
    total: 58.30,
    payment: 'Paid',
    status: 'Delivered',
    date: '2026-01-20 11:00',
    shippingMethod: 'Standard Delivery',
    trackingNumber: 'TRK456789123',
    address: '321 Elm St, City, State 12348',
    timeline: [
      { status: 'Order Placed', date: '2026-01-20 11:00', completed: true },
      { status: 'Payment Confirmed', date: '2026-01-20 11:01', completed: true },
      { status: 'Processing', date: '2026-01-20 12:00', completed: true },
      { status: 'Shipped', date: '2026-01-21 09:00', completed: true },
      { status: 'Delivered', date: '2026-01-22 10:00', completed: true }
    ]
  },
  {
    id: 'ORD-1238',
    student: { name: 'James Johnson', id: 'STU-0115', email: 'james@example.com', phone: '+1234567894' },
    items: [{ name: 'Sports Bag', qty: 1, price: 35.50 }],
    subtotal: 35.50,
    shipping: 8.00,
    tax: 4.35,
    total: 47.85,
    payment: 'Pending',
    status: 'Cancelled',
    date: '2026-01-19 16:45',
    shippingMethod: 'Standard Delivery',
    trackingNumber: '',
    address: '654 Maple Dr, City, State 12349',
    timeline: [
      { status: 'Order Placed', date: '2026-01-19 16:45', completed: true },
      { status: 'Cancelled', date: '2026-01-19 17:00', completed: true }
    ]
  },
];

const statusColors = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  Processing: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  Shipped: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  Delivered: 'bg-green-500/20 text-green-400 border-green-500/50',
  Cancelled: 'bg-red-500/20 text-red-400 border-red-500/50',
};

const paymentColors = {
  Paid: 'bg-green-500/20 text-green-400 border-green-500/50',
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
};

export default function StoreOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || 
                         order.student.name.toLowerCase().includes(search.toLowerCase()) ||
                         order.student.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCancelOrder = () => {
    if (cancelReason.trim()) {
      setOrders(orders.map(o => o.id === cancelOrder.id ? { ...o, status: 'Cancelled' } : o));
      toast.success('Order cancelled successfully');
      setCancelOrder(null);
      setCancelReason('');
    }
  };

  return (
    <StoreLayout>
      <div className="p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-8">Orders Management</h1>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by order ID, student name, or student ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#0D2818] border-[#2D6A4F] text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={statusFilter === status ? 'bg-[#D4AF37] text-[#0A1F0A]' : 'border-[#40916C] text-gray-300'}
              >
                {status}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#2D6A4F]">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-semibold">Order ID</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Student</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Items</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Total</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Payment</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Order Date</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10"
                      >
                        <td className="p-4 text-white font-semibold">{order.id}</td>
                        <td className="p-4">
                          <div>
                            <p className="text-white font-medium">{order.student.name}</p>
                            <p className="text-gray-400 text-sm">{order.student.id}</p>
                          </div>
                        </td>
                        <td className="p-4 text-gray-300">{order.items.length}</td>
                        <td className="p-4 text-white font-semibold">${order.total.toFixed(2)}</td>
                        <td className="p-4">
                          <Badge className={paymentColors[order.payment]}>{order.payment}</Badge>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">{order.date}</td>
                        <td className="p-4">
                          <Badge className={statusColors[order.status]}>{order.status}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)} className="border-[#40916C] text-[#D4AF37]">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                              <Button size="sm" variant="outline" onClick={() => setCancelOrder(order)} className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="text-white font-bold text-xl">{selectedOrder.id}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={statusColors[selectedOrder.status]}>{selectedOrder.status}</Badge>
                  <Badge className={paymentColors[selectedOrder.payment]}>{selectedOrder.payment}</Badge>
                </div>
              </div>

              {/* Customer */}
              <div className="p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                <h3 className="text-white font-semibold mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300"><span className="text-gray-500">Name:</span> {selectedOrder.student.name}</p>
                  <p className="text-gray-300"><span className="text-gray-500">Student ID:</span> {selectedOrder.student.id}</p>
                  <p className="text-gray-300"><span className="text-gray-500">Email:</span> {selectedOrder.student.email}</p>
                  <p className="text-gray-300"><span className="text-gray-500">Phone:</span> {selectedOrder.student.phone}</p>
                </div>
              </div>

              {/* Items */}
              <div className="p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                <h3 className="text-white font-semibold mb-3">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.name} × {item.qty}</span>
                      <span className="text-white font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                <h3 className="text-white font-semibold mb-3">Order Total</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">${selectedOrder.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-white">${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#2D6A4F] pt-2 mt-2"></div>
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">Grand Total</span>
                    <span className="text-[#D4AF37] font-bold text-lg">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                <h3 className="text-white font-semibold mb-3">Shipping Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300"><span className="text-gray-500">Method:</span> {selectedOrder.shippingMethod}</p>
                  {selectedOrder.trackingNumber && (
                    <p className="text-gray-300"><span className="text-gray-500">Tracking:</span> {selectedOrder.trackingNumber}</p>
                  )}
                  <p className="text-gray-300"><span className="text-gray-500">Address:</span> {selectedOrder.address}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                <h3 className="text-white font-semibold mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  {selectedOrder.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {event.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-medium ${event.completed ? 'text-white' : 'text-gray-500'}`}>{event.status}</p>
                        {event.date && <p className="text-xs text-gray-600">{event.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedOrder(null)} className="border-[#40916C] text-gray-300">
              Close
            </Button>
            <Button onClick={() => toast.info('Coming soon')} className="bg-[#2D6A4F] hover:bg-[#40916C]">
              <FileText className="w-4 h-4 mr-2" />
              Print/Download Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Modal */}
      <Dialog open={!!cancelOrder} onOpenChange={() => { setCancelOrder(null); setCancelReason(''); }}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
          <DialogHeader>
            <DialogTitle className="text-white">Cancel Order</DialogTitle>
          </DialogHeader>
          {cancelOrder && (
            <div className="space-y-4">
              <p className="text-gray-300">Are you sure you want to cancel order <span className="text-white font-semibold">{cancelOrder.id}</span>?</p>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Cancellation Reason</label>
                <Textarea
                  placeholder="Enter the reason for cancelling this order..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white min-h-[100px]"
                  required
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setCancelOrder(null); setCancelReason(''); }} className="border-[#40916C] text-gray-300">
              Back
            </Button>
            <Button 
              onClick={handleCancelOrder}
              disabled={!cancelReason.trim()}
              className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Confirm Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StoreLayout>
  );
}