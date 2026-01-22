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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
            <p className="text-gray-500 mt-1">Manage academy merchandise and equipment</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Product Name</Label>
                  <Input placeholder="Enter product name" className="mt-1" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input placeholder="Equipment, Apparel, etc." className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price (₹)</Label>
                    <Input type="number" placeholder="0" className="mt-1" />
                  </div>
                  <div>
                    <Label>Stock Quantity</Label>
                    <Input type="number" placeholder="0" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input placeholder="https://..." className="mt-1" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea rows={3} placeholder="Product description" className="mt-1" />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">Add Product</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Items Sold
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{totalSold}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Total Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <Badge variant="outline" className="mt-1 text-xs">{product.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#1A4D2E]">₹{product.price}</span>
                        <div className="text-sm text-gray-500">
                          Stock: <span className={product.stock < 10 ? 'text-red-500 font-medium' : 'font-medium'}>{product.stock}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Total Sold: <span className="font-medium text-gray-900">{product.sold}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => setSelectedProduct(product)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div>
                                <Label>Product Name</Label>
                                <Input defaultValue={product.name} className="mt-1" />
                              </div>
                              <div>
                                <Label>Category</Label>
                                <Input defaultValue={product.category} className="mt-1" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Price (₹)</Label>
                                  <Input type="number" defaultValue={product.price} className="mt-1" />
                                </div>
                                <div>
                                  <Label>Stock Quantity</Label>
                                  <Input type="number" defaultValue={product.stock} className="mt-1" />
                                </div>
                              </div>
                              <div className="flex justify-end gap-3">
                                <Button variant="outline">Cancel</Button>
                                <Button className="bg-[#1A4D2E] hover:bg-[#2D6A4F]">Save Changes</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-3 h-3" />
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