import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Package, TrendingUp, DollarSign, Edit, Trash2 } from 'lucide-react';

export default function AdminStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [products] = useState([
    {
      id: 1,
      name: 'Cricket Bat - Professional',
      category: 'Equipment',
      price: 4500,
      stock: 12,
      sold: 45,
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Football - Match Quality',
      category: 'Equipment',
      price: 1200,
      stock: 28,
      sold: 78,
      image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Academy T-Shirt',
      category: 'Apparel',
      price: 599,
      stock: 45,
      sold: 120,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Tennis Racket - Beginner',
      category: 'Equipment',
      price: 2500,
      stock: 15,
      sold: 32,
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=300&h=300&fit=crop'
    }
  ]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sold), 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0);

  return (
    <AdminLayout currentPageName="AdminStore">
      <div className="p-4 md:p-8 space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Store Management</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Manage academy merchandise and equipment</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A] hover:opacity-90 w-full md:w-auto text-sm md:text-base">
                <Plus className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0D2818] border-[#2D6A4F] p-4 md:p-6 max-w-sm md:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white text-base md:text-lg">Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 md:space-y-4 mt-4">
                <div>
                  <Label className="text-xs md:text-sm text-gray-400">Product Name</Label>
                  <Input placeholder="Enter product name" className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                </div>
                <div>
                  <Label className="text-xs md:text-sm text-gray-400">Category</Label>
                  <Input placeholder="Equipment, Apparel, etc." className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div>
                    <Label className="text-xs md:text-sm text-gray-400">Price</Label>
                    <Input type="number" placeholder="0" className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs md:text-sm text-gray-400">Stock Quantity</Label>
                    <Input type="number" placeholder="0" className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs md:text-sm text-gray-400">Image URL</Label>
                  <Input placeholder="https://..." className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                </div>
                <div>
                  <Label className="text-xs md:text-sm text-gray-400">Description</Label>
                  <Textarea rows={3} placeholder="Product description" className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="border-[#40916C] text-gray-300" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">Add Product</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                <Package className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">Total Products</span>
                <span className="md:hidden">Total</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
              <p className="text-xl md:text-3xl font-bold text-white">{products.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">Total Revenue</span>
                <span className="md:hidden">Revenue</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
              <p className="text-lg md:text-3xl font-bold text-white">₹{(totalRevenue / 100000).toFixed(0)}L</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">Items Sold</span>
                <span className="md:hidden">Sold</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
              <p className="text-xl md:text-3xl font-bold text-white">{totalSold}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-1 md:gap-2">
                <Package className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">Total Stock</span>
                <span className="md:hidden">Stock</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0 md:pt-0">
              <p className="text-xl md:text-3xl font-bold text-white">{totalStock}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-[#1A4D2E] to-[#0D2818] border-[#2D6A4F]/50">
          <CardHeader className="p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#0A1F0A] border-[#2D6A4F] text-white"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden bg-[#0D2818] border-[#2D6A4F]/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 md:h-48 object-cover"
                  />
                  <CardContent className="p-2 md:p-4">
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2">{product.name}</h3>
                        <Badge variant="outline" className="mt-1 text-xs border-[#40916C] text-gray-300">{product.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg md:text-2xl font-bold text-[#D4AF37]">₹{product.price}</span>
                        <div className="text-xs md:text-sm text-gray-400">
                          <span className={product.stock < 10 ? 'text-red-400 font-medium' : 'font-medium text-gray-300'}>{product.stock}</span>
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-gray-400">
                        Sold: <span className="font-medium text-white">{product.sold}</span>
                      </div>
                      <div className="flex gap-1 md:gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-[#40916C] text-gray-300 h-8 md:h-9 text-xs md:text-sm"
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Edit className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                              <span className="hidden md:inline">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-[#0D2818] border-[#2D6A4F] p-4 md:p-6 max-w-sm md:max-w-lg max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-white text-base md:text-lg">Edit Product</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 md:space-y-4 mt-4">
                              <div>
                                <Label className="text-xs md:text-sm text-gray-400">Product Name</Label>
                                <Input defaultValue={product.name} className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                              </div>
                              <div>
                                <Label className="text-xs md:text-sm text-gray-400">Category</Label>
                                <Input defaultValue={product.category} className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                              </div>
                              <div className="grid grid-cols-2 gap-2 md:gap-4">
                                <div>
                                  <Label className="text-xs md:text-sm text-gray-400">Price (₹)</Label>
                                  <Input type="number" defaultValue={product.price} className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                                </div>
                                <div>
                                  <Label className="text-xs md:text-sm text-gray-400">Stock</Label>
                                  <Input type="number" defaultValue={product.stock} className="mt-1 bg-[#0A1F0A] border-[#2D6A4F] text-white text-sm" />
                                </div>
                              </div>
                              <div className="flex justify-end gap-3">
                                <Button variant="outline" className="border-[#40916C] text-gray-300">Cancel</Button>
                                <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1F0A]">Save Changes</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 h-8 md:h-9">
                          <Trash2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}