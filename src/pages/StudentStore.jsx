import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Truck, CheckCircle, Eye, Plus, Minus } from 'lucide-react';
import StudentLayout from '../components/student/StudentLayout';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const mockProducts = [
  { id: 1, name: 'Cricket Bat', category: 'Equipment', price: 2500, stock: 'In Stock', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400' },
  { id: 2, name: 'Cricket Ball (Set of 6)', category: 'Equipment', price: 800, stock: 'In Stock', image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400' },
  { id: 3, name: 'Training Jersey', category: 'Apparel', price: 600, stock: 'In Stock', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { id: 4, name: 'Cricket Helmet', category: 'Safety', price: 1500, stock: 'Out of Stock', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { id: 5, name: 'Batting Gloves', category: 'Equipment', price: 900, stock: 'In Stock', image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400' },
  { id: 6, name: 'Cricket Shoes', category: 'Footwear', price: 2000, stock: 'In Stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
];

const mockOrders = [
  { id: 'ORD-001', items: 'Cricket Bat, Training Jersey', total: 3100, status: 'Delivered', date: '2026-01-10' },
  { id: 'ORD-002', items: 'Cricket Ball Set', total: 800, status: 'In Transit', date: '2026-01-18' },
  { id: 'ORD-003', items: 'Batting Gloves', total: 900, status: 'Pending', date: '2026-01-20' },
];

export default function StudentStore() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = mockOrders.filter(o => o.status === 'Delivered').length;

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <StudentLayout>
      <div className="p-4 md:p-8">
        {/* Overview Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-3 max-w-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-gray-400 text-xs">Total</p>
              </div>
              <p className="text-xl font-bold text-white">{totalOrders}</p>
            </div>
            <div className="h-px bg-[#2D6A4F]/50 my-2"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-yellow-400" />
                <p className="text-gray-400 text-xs">Pending</p>
              </div>
              <p className="text-xl font-bold text-white">{pendingOrders}</p>
            </div>
            <div className="h-px bg-[#2D6A4F]/50 my-2"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <p className="text-gray-400 text-xs">Delivered</p>
              </div>
              <p className="text-xl font-bold text-white">{deliveredOrders}</p>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="bg-[#0D2818] border border-[#2D6A4F]/50 mb-4 md:mb-6 w-full md:w-auto">
            <TabsTrigger value="products" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              Product Catalog
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#0A1F0A]">
              My Orders
            </TabsTrigger>
          </TabsList>

          {/* Product Catalog Tab */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {mockProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-40 md:h-48 object-cover" />
                    <div className="p-3 md:p-4">
                      <h3 className="text-white font-semibold text-base md:text-lg mb-2">{product.name}</h3>
                      <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs mb-3">{product.category}</Badge>
                      <div className="flex justify-between items-center mb-3 md:mb-4">
                        <span className="text-xl md:text-2xl font-bold text-white">₹{product.price.toLocaleString()}</span>
                        <Badge className={`${product.stock === 'In Stock' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} text-xs`}>
                          {product.stock}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => {
                          if (product.stock === 'In Stock') {
                            setSelectedProduct(product);
                          }
                        }}
                        disabled={product.stock !== 'In Stock'}
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] disabled:opacity-50 text-sm"
                      >
                        Order
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">My Orders</h2>
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0D2818] border-b border-[#2D6A4F]/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Order #</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Items</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-[#2D6A4F]/30"
                      >
                        <td className="px-6 py-4 text-sm text-[#D4AF37] font-semibold">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{order.items}</td>
                        <td className="px-6 py-4 text-sm text-white">₹{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <Badge className={
                            order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{order.date}</td>
                        <td className="px-6 py-4">
                          <Button
                            onClick={() => setSelectedOrder(order)}
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
                {mockOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#0A1F0A]/50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[#D4AF37] font-semibold text-sm">{order.id}</p>
                        <p className="text-gray-400 text-xs mt-1">{order.date}</p>
                      </div>
                      <Badge className={`${
                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      } text-xs`}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{order.items}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-white font-semibold text-lg">₹{order.total.toLocaleString()}</p>
                      <Button
                        onClick={() => setSelectedOrder(order)}
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
            </Card>
          </TabsContent>
        </Tabs>

        {/* Order Product Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => {
          setSelectedProduct(null);
          setQuantity(1);
        }}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-lg">Order Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 md:space-y-4">
              <div className="flex gap-3 md:gap-4">
                <img src={selectedProduct?.image} alt={selectedProduct?.name} className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base md:text-lg">{selectedProduct?.name}</h3>
                  <p className="text-gray-400 text-xs md:text-sm">{selectedProduct?.category}</p>
                  <p className="text-[#D4AF37] text-lg md:text-xl font-bold mt-1 md:mt-2">₹{selectedProduct?.price.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-300 mb-2 text-sm md:text-base">Quantity</p>
                <div className="flex items-center gap-2 md:gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-[#40916C] text-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 md:w-20 text-center bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-[#40916C] text-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-[#0A1F0A]/50 rounded-lg p-3 md:p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm md:text-base">Total Price</span>
                  <span className="text-[#D4AF37] text-xl md:text-2xl font-bold">
                    ₹{((selectedProduct?.price || 0) * quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter className="flex-col md:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedProduct(null);
                  setQuantity(1);
                }}
                className="border-[#40916C] text-gray-300 w-full md:w-auto text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePlaceOrder}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] w-full md:w-auto text-sm"
              >
                Place Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Order Details Modal */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-base md:text-lg">Order Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-[#0A1F0A]/50 rounded-lg p-3 md:p-4">
                <h3 className="text-[#D4AF37] text-lg md:text-xl font-bold mb-2">{selectedOrder?.id}</h3>
                <p className="text-gray-400 text-xs md:text-sm">Placed on {selectedOrder?.date}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs md:text-sm mb-2">Items</p>
                <div className="bg-[#0A1F0A]/50 rounded p-3">
                  <p className="text-white text-sm md:text-base">{selectedOrder?.items}</p>
                </div>
              </div>
              <div className="flex justify-between bg-[#1A4D2E] rounded-lg p-3 md:p-4">
                <span className="text-white font-semibold text-sm md:text-base">Total</span>
                <span className="text-[#D4AF37] text-lg md:text-xl font-bold">₹{selectedOrder?.total.toLocaleString()}</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs md:text-sm mb-2">Status</p>
                <div className="flex items-center gap-2">
                  {selectedOrder?.status === 'Delivered' && <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-400" />}
                  {selectedOrder?.status === 'In Transit' && <Truck className="w-4 md:w-5 h-4 md:h-5 text-blue-400" />}
                  {selectedOrder?.status === 'Pending' && <Package className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />}
                  <Badge className={`${
                    selectedOrder?.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                    selectedOrder?.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  } text-xs md:text-sm`}>
                    {selectedOrder?.status}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => setSelectedOrder(null)}
                variant="outline"
                className="w-full border-[#40916C] text-gray-300 text-sm"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </StudentLayout>
  );
}