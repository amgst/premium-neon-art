
import React, { useState, useEffect } from 'react';
import { NeonSign, SystemConfig } from '../types';
import {
  Plus,
  Trash2,
  Settings,
  Terminal,
  Database,
  Save,
  Image as ImageIcon,
  Zap,
  LayoutDashboard,
  Cpu,
  RefreshCw,
  XCircle,
  Edit,
  X,
  Search,
  Filter,
  Package,
  Tag,
  DollarSign,
  Calendar,
  Eye,
  EyeOff,
  Upload,
  AlertCircle
} from 'lucide-react';

import { productService } from '../services/productService';

interface AdminProps {
  signs: NeonSign[];
  setSigns: React.Dispatch<React.SetStateAction<NeonSign[]>>;
  config: SystemConfig;
  setConfig: React.Dispatch<React.SetStateAction<SystemConfig>>;
}

const Admin: React.FC<AdminProps> = ({ signs, setSigns, config, setConfig }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    tags: '',
    isNew: true,
    featured: false
  });
  
  // Get unique categories for filter dropdown
  const categories = ['all', ...Array.from(new Set(signs.map(s => s.category)))];

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this artifact?')) {
      try {
        setLoading(true);
        await productService.deleteProduct(id);
        if (editingId === id) {
          handleCancelEdit();
        }
      } catch (error) {
        alert('Failed to delete product');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (sign: NeonSign) => {
    setEditingId(sign.id);
    setNewProduct({
      name: sign.name,
      price: sign.price.toString(),
      category: sign.category,
      image: sign.image,
      isNew: sign.isNew || false
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewProduct({ 
      name: '', 
      price: '', 
      category: '', 
      image: '', 
      description: '',
      tags: '',
      isNew: true,
      featured: false
    });
    setShowForm(false);
  };
  
  const filteredProducts = signs.filter(sign => {
    const matchesSearch = sign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sign.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || sign.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    try {
      setLoading(true);
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category || 'Uncategorized',
        image: newProduct.image || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
        description: newProduct.description || '',
        isNew: newProduct.isNew,
        featured: newProduct.featured,
        tags: newProduct.tags ? newProduct.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
      };
      
      if (editingId) {
        await productService.updateProduct(editingId, productData);
      } else {
        await productService.addProduct(productData);
      }
      handleCancelEdit();
    } catch (error) {
      console.error(error);
      alert('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleSaleMode = () => {
    setConfig(prev => ({ ...prev, saleMode: !prev.saleMode }));
  };

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 text-emerald-400 mb-4 animate-pulse">
            <Terminal className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">Root Access Granted</span>
          </div>
          <h1 className="font-orbitron text-6xl md:text-8xl font-black">NEURAL <span className="text-glow-cyan">ADMIN</span></h1>
        </div>

        <div className="flex gap-4">
          <div className="px-6 py-4 glass-panel border border-emerald-500/20 rounded-2xl flex items-center gap-4">
            <Package className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Products</p>
              <p className="text-sm font-bold text-white uppercase">{signs.length} Items</p>
            </div>
          </div>
          <div className="px-6 py-4 glass-panel border border-emerald-500/20 rounded-2xl flex items-center gap-4">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Database Status</p>
              <p className="text-sm font-bold text-emerald-400 uppercase">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-10 flex gap-2 bg-slate-950/50 p-2 rounded-2xl border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'products' 
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.3)]' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <Database className="w-4 h-4" /> Products
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'settings' 
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.3)]' 
              : 'text-slate-500 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4" /> Settings
        </button>
      </div>

      {activeTab === 'settings' ? (
        /* Settings Tab Content */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-[2.5rem] p-10 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30 blur-sm"></div>
              <h3 className="font-orbitron text-xl font-black mb-8 flex items-center gap-3">
                <Settings className="w-5 h-5 text-emerald-400" /> SYSTEM CONFIGURATION
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Store Name</label>
                  <input
                    type="text"
                    value={config.storeName}
                    onChange={(e) => setConfig(prev => ({ ...prev, storeName: e.target.value }))}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-400/50 outline-none transition-all"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase mb-1">Emergency Sale Mode</h4>
                    <p className="text-[10px] text-slate-500 uppercase">Apply emerald glow to all prices</p>
                  </div>
                  <button
                    onClick={toggleSaleMode}
                    className={`w-12 h-6 rounded-full p-1 transition-all ${config.saleMode ? 'bg-emerald-500' : 'bg-slate-800'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${config.saleMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950/50 border border-white/5 opacity-50 cursor-not-allowed flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase mb-1">Maintenance Protocol</h4>
                    <p className="text-[10px] text-slate-500 uppercase">Lock public access node</p>
                  </div>
                  <div className="w-12 h-6 rounded-full bg-slate-800 p-1">
                    <div className="w-4 h-4 rounded-full bg-slate-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="glass-panel rounded-[2.5rem] p-8 border border-white/10">
              <h3 className="font-orbitron text-lg font-black mb-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" /> SYSTEM STATUS
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-slate-400">Database Connection</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">ONLINE</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-slate-400">Storage Capacity</span>
                  <span className="text-sm text-white">{signs.length}/1000 items</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-slate-400">Last Sync</span>
                  <span className="text-sm text-slate-500">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Products Tab Content */
        <div className="space-y-8">
          {/* Search and Filter Bar */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-950/50 border border-white/10 rounded-xl text-sm focus:border-emerald-400/50 outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-12 pr-8 py-3 bg-slate-950/50 border border-white/10 rounded-xl text-sm focus:border-emerald-400/50 outline-none appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-slate-900">
                    {(cat as string).charAt(0).toUpperCase() + (cat as string).slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] transition-all"
            >
              <Plus className="w-4 h-4" />
              {showForm ? 'Cancel' : 'Add Product'}
            </button>
          </div>

          {/* Add/Edit Product Form */}
          {(showForm || editingId) && (
            <div className="glass-panel rounded-[2.5rem] p-8 border border-emerald-500/10 animate-in slide-in-from-top-4 duration-300">
              <h3 className="font-orbitron text-xl font-black mb-6 flex items-center gap-3">
                {editingId ? (
                  <><Edit className="w-5 h-5 text-emerald-400" /> UPDATE PRODUCT</>
                ) : (
                  <><Plus className="w-5 h-5 text-emerald-400" /> ADD NEW PRODUCT</>
                )}
              </h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product Name *</label>
                  <input
                    required
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-400/50 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Price (USD) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      required
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/50 border border-white/10 rounded-xl text-sm focus:border-emerald-400/50 outline-none transition-all font-mono"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                  <input
                    placeholder="e.g., Love, Tropical, Quotes"
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-400/50 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tags</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      placeholder="comma, separated, tags"
                      value={newProduct.tags || ''}
                      onChange={e => setNewProduct({ ...newProduct, tags: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/50 border border-white/10 rounded-xl text-sm focus:border-emerald-400/50 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Description</label>
                  <textarea
                    placeholder="Product description..."
                    value={newProduct.description || ''}
                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-400/50 outline-none transition-all resize-none"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Image URL</label>
                  <div className="relative">
                    <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      placeholder="https://example.com/image.jpg"
                      value={newProduct.image || ''}
                      onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/50 border border-white/10 rounded-xl text-sm focus:border-emerald-400/50 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4 md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProduct.isNew}
                      onChange={e => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                      className="w-5 h-5 accent-emerald-500 rounded"
                    />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Mark as New Arrival</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newProduct.featured}
                      onChange={e => setNewProduct({ ...newProduct, featured: e.target.checked })}
                      className="w-5 h-5 accent-emerald-500 rounded"
                    />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Featured Product</span>
                  </label>
                </div>
                
                <div className="flex gap-3 pt-4 md:col-span-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 py-4 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-white hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> PROCESSING...</>
                    ) : editingId ? (
                      <><RefreshCw className="w-4 h-4" /> UPDATE PRODUCT</>
                    ) : (
                      <><Zap className="w-4 h-4" /> CREATE PRODUCT</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-4 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Grid */}
          <div className="glass-panel rounded-[3rem] border border-white/10 overflow-hidden">
            <div className="p-8 border-b border-white/5 bg-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h3 className="font-orbitron text-2xl font-black flex items-center gap-3">
                  <Database className="w-6 h-6 text-emerald-400" /> PRODUCT INVENTORY
                </h3>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold">
                  {filteredProducts.length} items
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.location.reload()} 
                  className="p-3 text-slate-500 hover:text-emerald-400 transition-colors rounded-xl hover:bg-white/5"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <XCircle className="w-16 h-16 text-slate-800 mx-auto mb-6" />
                  <p className="font-orbitron text-xl text-slate-600 font-bold uppercase mb-2">No Products Found</p>
                  <p className="text-slate-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(sign => (
                    <div key={sign.id} className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all group">
                      <div className="relative mb-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 border border-white/5 mb-4">
                          <img 
                            src={sign.image} 
                            alt={sign.name} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                        
                        <div className="absolute top-4 right-4 flex gap-2">
                          {sign.isNew && (
                            <span className="px-2 py-1 bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 rounded-full text-[8px] font-black uppercase">
                              NEW
                            </span>
                          )}
                          {sign.featured && (
                            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[8px] font-black uppercase">
                              FEATURED
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-bold text-white text-lg group-hover:text-emerald-400 transition-colors">
                          {sign.name}
                        </h4>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded-lg font-mono">
                            {sign.category || 'Uncategorized'}
                          </span>
                          <span className="font-orbitron font-black text-emerald-400 text-lg">
                            ${sign.price}
                          </span>
                        </div>
                        
                        {sign.description && (
                          <p className="text-slate-500 text-sm line-clamp-2">
                            {sign.description.substring(0, 80)}...
                          </p>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleEdit(sign)}
                            className="flex-1 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(sign.id)}
                            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-slate-950 transition-all flex items-center gap-2 text-sm font-bold"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
