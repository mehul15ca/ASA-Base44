import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StoreLayout from '../components/store/StoreLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package } from 'lucide-react';
import { toast } from 'sonner';

const initialInventory = [
  { id: 1, product: 'Training Jersey', variant: 'Size S', sku: 'ACA-APP-001-S', current: 23, reserved: 5, available: 18, status: 'In Stock' },
  { id: 2, product: 'Training Jersey', variant: 'Size M', sku: 'ACA-APP-001-M', current: 3, reserved: 0, available: 3, status: 'Low Stock' },
  { id: 3, product: 'Training Jersey', variant: 'Size L', sku: 'ACA-APP-001-L', current: 15, reserved: 3, available: 12, status: 'In Stock' },
  { id: 4, product: 'Football Boots', variant: 'Size 8', sku: 'ACA-FOT-012-8', current: 8, reserved: 2, available: 6, status: 'Low Stock' },
  { id: 5, product: 'Football Boots', variant: 'Size 9', sku: 'ACA-FOT-012-9', current: 0, reserved: 0, available: 0, status: 'Out of Stock' },
  { id: 6, product: 'Cricket Bat', variant: 'Standard', sku: 'ACA-EQP-045', current: 15, reserved: 1, available: 14, status: 'In Stock' },
  { id: 7, product: 'Sports Bag', variant: 'Large', sku: 'ACA-ACC-089-L', current: 25, reserved: 3, available: 22, status: 'In Stock' },
  { id: 8, product: 'Water Bottle', variant: '750ml', sku: 'ACA-ACC-101', current: 5, reserved: 4, available: 1, status: 'Low Stock' },
];

const statusColors = {
  'In Stock': 'bg-green-500/20 text-green-400 border-green-500/50',
  'Low Stock': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  'Out of Stock': 'bg-red-500/20 text-red-400 border-red-500/50',
};

export default function StoreInventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [restockItem, setRestockItem] = useState(null);
  const [restockQty, setRestockQty] = useState('');
  const [restockNote, setRestockNote] = useState('');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openRestockModal = (item) => {
    setRestockItem(item);
    setRestockQty('');
    setRestockNote('');
  };

  const handleRestock = () => {
    const qty = parseInt(restockQty);
    if (qty > 0) {
      setInventory(inventory.map(item => 
        item.id === restockItem.id 
          ? { ...item, current: item.current + qty, available: item.available + qty }
          : item
      ));
      toast.success(`Restocked ${restockItem.product} with ${qty} units`);
      setRestockItem(null);
      setRestockQty('');
      setRestockNote('');
    }
  };

  return (
    <StoreLayout>
      <div className="p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-8">Inventory</h1>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by product or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#0D2818] border-[#2D6A4F] text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px] bg-[#0D2818] border-[#2D6A4F] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Inventory Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#2D6A4F]">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-semibold">Product Name</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Size/Variant</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">SKU</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Current Stock</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Reserved</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Available</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10"
                      >
                        <td className="p-4 text-white font-medium">{item.product}</td>
                        <td className="p-4 text-gray-300">{item.variant}</td>
                        <td className="p-4 text-gray-400">{item.sku}</td>
                        <td className="p-4 text-white font-semibold">{item.current}</td>
                        <td className="p-4 text-yellow-400">{item.reserved}</td>
                        <td className="p-4 text-green-400">{item.available}</td>
                        <td className="p-4">
                          <Badge className={statusColors[item.status]}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button size="sm" onClick={() => openRestockModal(item)} className="bg-[#2D6A4F] hover:bg-[#40916C]">
                            <Package className="w-3 h-3 mr-1" />
                            Restock
                          </Button>
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

      {/* Restock Modal */}
      <Dialog open={!!restockItem} onOpenChange={() => setRestockItem(null)}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F]">
          <DialogHeader>
            <DialogTitle className="text-white">Restock Item</DialogTitle>
            {restockItem && (
              <p className="text-gray-400">{restockItem.product} - {restockItem.variant}</p>
            )}
          </DialogHeader>
          {restockItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                  <p className="text-xs text-gray-500 mb-1">Current Stock</p>
                  <p className="text-white font-bold text-xl">{restockItem.current}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                  <p className="text-xs text-gray-500 mb-1">Reserved</p>
                  <p className="text-yellow-400 font-bold text-xl">{restockItem.reserved}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-[#0A1F0A] border border-[#2D6A4F]/50">
                  <p className="text-xs text-gray-500 mb-1">Available</p>
                  <p className="text-green-400 font-bold text-xl">{restockItem.available}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Restock Quantity</label>
                <Input
                  type="number"
                  min="1"
                  autoFocus
                  placeholder="Enter quantity"
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>

              {restockQty && parseInt(restockQty) > 0 && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-[#2D6A4F]/20 border border-[#2D6A4F]">
                  <p className="text-sm text-gray-400 mb-1">New Stock Level</p>
                  <p className="text-white font-bold text-2xl">
                    {restockItem.current + parseInt(restockQty)}
                  </p>
                </motion.div>
              )}

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Note (Optional)</label>
                <Textarea
                  placeholder="Add a note about this restock..."
                  value={restockNote}
                  onChange={(e) => setRestockNote(e.target.value)}
                  className="bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setRestockItem(null)} className="border-[#40916C] text-gray-300">
              Cancel
            </Button>
            <Button 
              onClick={handleRestock} 
              disabled={!restockQty || parseInt(restockQty) < 1}
              className="bg-[#D4AF37] hover:bg-[#F4D03F] text-[#0A1F0A] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Restock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StoreLayout>
  );
}