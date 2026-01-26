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
import { Search, Plus, Edit, Eye, EyeOff, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

const initialProducts = [
  { id: 1, name: 'Training Jersey', category: 'Apparel', price: 45.00, discountPrice: null, stock: 67, sku: 'ACA-APP-001', visible: true, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
  { id: 2, name: 'Football Boots', category: 'Footwear', price: 89.99, discountPrice: 79.99, stock: 23, sku: 'ACA-FOT-012', visible: true, image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=100' },
  { id: 3, name: 'Cricket Bat', category: 'Equipment', price: 125.00, discountPrice: null, stock: 15, sku: 'ACA-EQP-045', visible: true, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=100' },
  { id: 4, name: 'Sports Bag', category: 'Accessories', price: 35.50, discountPrice: 29.99, stock: 42, sku: 'ACA-ACC-089', visible: true, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100' },
  { id: 5, name: 'Training Shorts', category: 'Apparel', price: 28.00, discountPrice: null, stock: 0, sku: 'ACA-APP-002', visible: false, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100' },
];

export default function StoreProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: 'Apparel', description: '', price: '', discountPrice: '', sku: '', visible: true
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: 'Apparel', description: '', price: '', discountPrice: '', sku: '', visible: true });
    setShowProductModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description || '',
      price: product.price.toString(),
      discountPrice: product.discountPrice?.toString() || '',
      sku: product.sku,
      visible: product.visible
    });
    setShowProductModal(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData, price: parseFloat(formData.price), discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null } : p));
      toast.success('Product updated successfully');
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'
      };
      setProducts([...products, newProduct]);
      toast.success('Product added successfully');
    }
    setShowProductModal(false);
  };

  const toggleVisibility = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
    toast.success('Visibility updated');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  return (
    <StoreLayout>
      <div className="p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-8">Products</h1>
        </motion.div>

        {/* Top Actions */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#0D2818] border-[#2D6A4F] text-white"
            />
          </div>
          <Button onClick={openAddModal} className="bg-[#D4AF37] hover:bg-[#F4D03F] text-[#0A1F0A]">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </motion.div>

        {/* Products Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-[#0D2818] to-[#1A4D2E] border-[#2D6A4F]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#2D6A4F]">
                    <tr>
                      <th className="text-left p-4 text-gray-400 font-semibold">Product</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Category</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Price</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Stock</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">SKU</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                      <th className="text-left p-4 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-[#2D6A4F]/30 hover:bg-[#2D6A4F]/10"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                            <span className="text-white font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-300">{product.category}</td>
                        <td className="p-4">
                          {product.discountPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="text-white font-semibold">${product.discountPrice.toFixed(2)}</span>
                              <span className="text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-white font-semibold">${product.price.toFixed(2)}</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-300">{product.stock}</td>
                        <td className="p-4 text-gray-400">{product.sku}</td>
                        <td className="p-4">
                          <Badge className={product.visible ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                            {product.visible ? 'Active' : 'Hidden'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" onClick={() => openEditModal(product)} className="text-gray-400 hover:text-[#D4AF37]">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => toggleVisibility(product.id)} className="text-gray-400 hover:text-[#D4AF37]">
                              {product.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => deleteProduct(product.id)} className="text-gray-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
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

      {/* Add/Edit Product Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="bg-[#0D2818] border-[#2D6A4F] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Product Name</label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Category</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-[#0A1F0A] border-[#2D6A4F] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0D2818] border-[#2D6A4F]">
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Footwear">Footwear</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Description</label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Product description" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Price</label>
                <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Discount Price (Optional)</label>
                <Input type="number" step="0.01" value={formData.discountPrice} onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })} className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">SKU / Product Code</label>
              <Input value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} placeholder="ACA-XXX-###" className="bg-[#0A1F0A] border-[#2D6A4F] text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Product Images (Up to 5)</label>
              <div className="border-2 border-dashed border-[#2D6A4F] rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400 mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-600 text-sm">PNG, JPG up to 5MB</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Visibility</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input type="radio" checked={formData.visible} onChange={() => setFormData({ ...formData, visible: true })} className="w-4 h-4" />
                  Active
                </label>
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input type="radio" checked={!formData.visible} onChange={() => setFormData({ ...formData, visible: false })} className="w-4 h-4" />
                  Hidden
                </label>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowProductModal(false)} className="border-[#40916C] text-gray-300">
              Cancel
            </Button>
            <Button variant="outline" className="border-[#40916C] text-gray-300">
              Save Draft
            </Button>
            <Button onClick={handleSave} className="bg-[#D4AF37] hover:bg-[#F4D03F] text-[#0A1F0A]">
              {editingProduct ? 'Update Product' : 'Publish Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StoreLayout>
  );
}