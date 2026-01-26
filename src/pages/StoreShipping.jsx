import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StoreLayout from '../components/store/StoreLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Truck, Package } from 'lucide-react';
import { toast } from 'sonner';

const initialMethods = [
  { id: 1, name: 'Express Delivery', carrier: 'FedEx', deliveryTime: '1-2 days', cost: 15.00, status: 'Active' },
  { id: 2, name: 'Standard Delivery', carrier: 'USPS', deliveryTime: '3-5 days', cost: 8.00, status: 'Active' },
  { id: 3, name: 'Economy Shipping', carrier: 'DHL', deliveryTime: '7-10 days', cost: 5.00, status: 'Inactive' },
];

const initialShipments = [
  { id: 'ORD-1234', student: 'John Smith', studentId: 'STU-0045', method: 'Express Delivery', address: '123 Main St, City, State 12345', status: 'Pending', tracking: '' },
  { id: 'ORD-1235', student: 'Emma Wilson', studentId: 'STU-0067', method: 'Standard Delivery', address: '456 Oak Ave, City, State 12346', status: 'In Transit', tracking: 'TRK123456789' },
  { id: 'ORD-1236', student: 'Michael Brown', studentId: 'STU-0089', method: 'Express Delivery', address: '789 Pine Rd, City, State 12347', status: 'Delivered', tracking: 'TRK987654321' },
];

const statusColors = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  'In Transit': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  Delivered: 'bg-green-500/20 text-green-400 border-green-500/50',
  Issue: 'bg-red-500/20 text-red-400 border-red-500/50',
};

export default function StoreShipping() {
  const [methods, setMethods] = useState(initialMethods);
  const [shipments, setShipments] = useState(initialShipments);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [showShipmentModal, setShowShipmentModal] = useState(false);
  const [processingShipment, setProcessingShipment] = useState(null);
  const [methodForm, setMethodForm] = useState({ name: '', carrier: '', deliveryTime: '', cost: '', status: 'Active' });
  const [shipmentForm, setShipmentForm] = useState({ tracking: '', carrier: '', status: 'In Transit' });

  const openAddMethod = () => {
    setEditingMethod(null);
    setMethodForm({ name: '', carrier: '', deliveryTime: '', cost: '', status: 'Active' });
    setShowMethodModal(true);
  };

  const openEditMethod = (method) => {
    setEditingMethod(method);
    setMethodForm({ ...method, cost: method.cost.toString() });
    setShowMethodModal(true);
  };

  const saveMethod = () => {
    if (editingMethod) {
      setMethods(methods.map(m => m.id === editingMethod.id ? { ...m, ...methodForm, cost: parseFloat(methodForm.cost) } : m));
      toast.success('Shipping method updated');
    } else {
      setMethods([...methods, { id: Date.now(), ...methodForm, cost: parseFloat(methodForm.cost) }]);
      toast.success('Shipping method added');
    }
    setShowMethodModal(false);
  };

  const toggleMethodStatus = (id) => {
    setMethods(methods.map(m => m.id === id ? { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' } : m));
    toast.success('Status updated');
  };

  const openProcessShipment = (shipment) => {
    setProcessingShipment(shipment);
    setShipmentForm({ tracking: shipment.tracking, carrier: '', status: shipment.status });
    setShowShipmentModal(true);
  };

  const processShipment = () => {
    setShipments(shipments.map(s => s.id === processingShipment.id ? { ...s, ...shipmentForm } : s));
    toast.success('Shipment updated');
    setShowShipmentModal(false);
  };

  return (
    <StoreLayout>
      <div className="p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-8">Shipping & Delivery</h1>
        </motion.div>

        <Tabs defaultValue="methods" className="space-y-6">
          <TabsList className="bg-[#0D2818] border border-[#2D6A4F]">
            <TabsTrigger value="methods" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Shipping Methods
            </TabsTrigger>
            <TabsTrigger value="shipments" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Processing / Shipments Queue
            </TabsTrigger>
          </TabsList>

          {/* Shipping Methods */}
          <TabsContent value="methods">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Shipping Methods</h2>
                <Button onClick={openAddMethod} className="bg-[#D4AF37] hover:bg-[#F4D03F] text-[#0A1F0A]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Shipping Method
                </Button>
              </div>

              <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-[#2D6A4F]">
                        <tr>
                          <th className="text-left p-4 text-gray-400 font-semibold">Method Name</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Carrier</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Delivery Time</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Cost</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {methods.map((method) => (
                          <tr key={method.id} className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10">
                            <td className="p-4 text-white font-medium">{method.name}</td>
                            <td className="p-4 text-gray-300">{method.carrier}</td>
                            <td className="p-4 text-gray-300">{method.deliveryTime}</td>
                            <td className="p-4 text-white font-semibold">${method.cost.toFixed(2)}</td>
                            <td className="p-4">
                              <Badge className={method.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                                {method.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" onClick={() => openEditMethod(method)} className="border-[#40916C] text-[#D4AF37]">
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" onClick={() => toggleMethodStatus(method.id)} className="bg-[#2D6A4F] hover:bg-[#40916C]">
                                  {method.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Shipments Queue */}
          <TabsContent value="shipments">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold text-white mb-6">Shipments to Process</h2>

              <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-[#2D6A4F]">
                        <tr>
                          <th className="text-left p-4 text-gray-400 font-semibold">Order ID</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Student</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Shipping Method</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Address</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                          <th className="text-left p-4 text-gray-400 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipments.map((shipment) => (
                          <tr key={shipment.id} className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10">
                            <td className="p-4 text-white font-semibold">{shipment.id}</td>
                            <td className="p-4">
                              <div>
                                <p className="text-white font-medium">{shipment.student}</p>
                                <p className="text-gray-400 text-sm">{shipment.studentId}</p>
                              </div>
                            </td>
                            <td className="p-4 text-gray-300">{shipment.method}</td>
                            <td className="p-4 text-gray-400 text-sm max-w-xs truncate">{shipment.address}</td>
                            <td className="p-4">
                              <Badge className={statusColors[shipment.status]}>{shipment.status}</Badge>
                            </td>
                            <td className="p-4">
                              <Button size="sm" onClick={() => openProcessShipment(shipment)} className="bg-[#2D6A4F] hover:bg-[#40916C]">
                                <Truck className="w-3 h-3 mr-1" />
                                Process
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Shipping Method Modal */}
      <Dialog open={showMethodModal} onOpenChange={setShowMethodModal}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
          <DialogHeader>
            <DialogTitle className="text-white">{editingMethod ? 'Edit Shipping Method' : 'Add Shipping Method'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Method Name</label>
              <Input value={methodForm.name} onChange={(e) => setMethodForm({ ...methodForm, name: e.target.value })} className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Carrier</label>
              <Input value={methodForm.carrier} onChange={(e) => setMethodForm({ ...methodForm, carrier: e.target.value })} className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Delivery Time</label>
              <Input value={methodForm.deliveryTime} onChange={(e) => setMethodForm({ ...methodForm, deliveryTime: e.target.value })} placeholder="e.g., 2-5 days" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Cost</label>
              <Input type="number" step="0.01" value={methodForm.cost} onChange={(e) => setMethodForm({ ...methodForm, cost: e.target.value })} className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Status</label>
              <Select value={methodForm.status} onValueChange={(value) => setMethodForm({ ...methodForm, status: value })}>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowMethodModal(false)} className="border-[#40916C] text-gray-300">
              Cancel
            </Button>
            <Button onClick={saveMethod} className="bg-[#D4AF37] hover:bg-[#F4D03F] text-[#0A1F0A]">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Process Shipment Modal */}
      <Dialog open={showShipmentModal} onOpenChange={setShowShipmentModal}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
          <DialogHeader>
            <DialogTitle className="text-white">Process Shipment</DialogTitle>
          </DialogHeader>
          {processingShipment && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                <h3 className="text-white font-semibold mb-2">Order Information</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300"><span className="text-gray-500">Order ID:</span> {processingShipment.id}</p>
                  <p className="text-gray-300"><span className="text-gray-500">Student:</span> {processingShipment.student} ({processingShipment.studentId})</p>
                  <p className="text-gray-300"><span className="text-gray-500">Method:</span> {processingShipment.method}</p>
                  <p className="text-gray-300"><span className="text-gray-500">Address:</span> {processingShipment.address}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Tracking Number</label>
                <Input value={shipmentForm.tracking} onChange={(e) => setShipmentForm({ ...shipmentForm, tracking: e.target.value })} placeholder="Enter tracking number" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Carrier</label>
                <Select value={shipmentForm.carrier} onValueChange={(value) => setShipmentForm({ ...shipmentForm, carrier: value })}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue placeholder="Select carrier" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="FedEx">FedEx</SelectItem>
                    <SelectItem value="USPS">USPS</SelectItem>
                    <SelectItem value="DHL">DHL</SelectItem>
                    <SelectItem value="UPS">UPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Status</label>
                <Select value={shipmentForm.status} onValueChange={(value) => setShipmentForm({ ...shipmentForm, status: value })}>
                  <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Issue">Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowShipmentModal(false)} className="border-[#40916C] text-gray-300">
              Close
            </Button>
            <Button onClick={processShipment} className="bg-[#D4AF37] hover:bg-[#F4D03F] text-[#0A1F0A]">
              <Package className="w-4 h-4 mr-2" />
              Mark as Shipped
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StoreLayout>
  );
}