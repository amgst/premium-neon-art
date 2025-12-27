
import React, { useState } from 'react';
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
  X
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
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    isNew: true
  });

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
    setNewProduct({ name: '', price: '', category: '', image: '', isNew: true });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    try {
      setLoading(true);
      if (editingId) {
        await productService.updateProduct(editingId, {
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          category: newProduct.category || 'Uncategorized',
          image: newProduct.image || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
          isNew: newProduct.isNew
        });
        handleCancelEdit();
      } else {
        await productService.addProduct({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          category: newProduct.category || 'Uncategorized',
          image: newProduct.image || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
          isNew: newProduct.isNew,
          tags: []
        });
        setNewProduct({ name: '', price: '', category: '', image: '', isNew: true });
      }
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
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Database</p>
              <p className="text-sm font-bold text-white uppercase">{signs.length} Active Records</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: System Control */}
        <div className="lg:col-span-4 space-y-10">
          <div className="glass-panel rounded-[2.5rem] p-10 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30 blur-sm"></div>
            <h3 className="font-orbitron text-xl font-black mb-8 flex items-center gap-3">
              <Settings className="w-5 h-5 text-emerald-400" /> SYSTEM OVERRIDE
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Uplink Identity</label>
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

          <div className="glass-panel rounded-[2.5rem] p-10 border border-emerald-500/10">
            <h3 className="font-orbitron text-xl font-black mb-8 flex items-center gap-3">
              {editingId ? (
                <>
                  <Edit className="w-5 h-5 text-emerald-400" /> UPDATE ARTIFACT
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 text-emerald-400" /> FABRICATE ASSET
                </>
              )}
            </h3>
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="space-y-2">
                <input
                  required
                  placeholder="Artifact Name"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-400/50 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Price (USD)"
                  type="number"
                  value={newProduct.price}
                  onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-400/50 outline-none transition-all font-mono"
                />
                <input
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-400/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <input
                  placeholder="Image Neural Link (URL)"
                  value={newProduct.image}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-400/50 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={newProduct.isNew}
                  onChange={e => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500"
                />
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mark as New Arrival</label>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-4 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-white hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] transition-all flex items-center justify-center gap-2">
                  {editingId ? (
                    <><RefreshCw className="w-4 h-4" /> UPDATE RECORD</>
                  ) : (
                    <><Zap className="w-4 h-4" /> INJECT RECORD</>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-14 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Inventory Management */}
        <div className="lg:col-span-8">
          <div className="glass-panel rounded-[3rem] border border-white/10 overflow-hidden">
            <div className="p-10 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <h3 className="font-orbitron text-2xl font-black flex items-center gap-4">
                <Database className="w-6 h-6 text-emerald-400" /> INVENTORY MANIFEST
              </h3>
              <button onClick={() => window.location.reload()} className="p-3 text-slate-500 hover:text-emerald-400 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-950/50 border-b border-white/5">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Artifact</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Valuation</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {signs.map(sign => (
                    <tr key={sign.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 border border-white/5">
                            <img src={sign.image} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white uppercase">{sign.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono">ID: {sign.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sign.category}</span>
                      </td>
                      <td className="px-8 py-6">
                        {sign.isNew ? (
                          <span className="px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 rounded-full text-[8px] font-black uppercase">New Release</span>
                        ) : (
                          <span className="px-3 py-1 bg-slate-800 text-slate-500 border border-white/5 rounded-full text-[8px] font-black uppercase">Legacy</span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-orbitron text-sm font-black text-white">${sign.price}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(sign)}
                            className="p-3 text-slate-600 hover:text-emerald-400 transition-all hover:bg-emerald-400/10 rounded-xl"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(sign.id)}
                            className="p-3 text-slate-600 hover:text-red-400 transition-all hover:bg-red-400/10 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {signs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <XCircle className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                        <p className="font-orbitron text-slate-600 font-bold uppercase">No records found in local memory</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
