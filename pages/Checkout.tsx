
import React, { useState, useMemo } from 'react';
import { CreditCard, Truck, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Loader2, PackageCheck, Banknote, MapPin } from 'lucide-react';
import { CartItem, PageType } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onComplete: () => void;
  onNavigate: (page: PageType) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, onComplete, onNavigate }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing' | 'success'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const isPakistan = useMemo(() => 
    formData.country.toLowerCase().includes('pakistan'), 
  [formData.country]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 25 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('processing');
      // Mock processing delay
      setTimeout(() => {
        setStep('success');
        onComplete();
      }, 3000);
    }
  };

  if (step === 'success') {
    return (
      <div className="pt-40 pb-20 px-6 max-w-2xl mx-auto text-center animate-in zoom-in duration-500">
        <div className="glass-panel rounded-[4rem] p-16 border border-emerald-500/20 shadow-[0_0_80px_rgba(52,211,153,0.1)]">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-10 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
            <PackageCheck className="w-12 h-12" />
          </div>
          <h2 className="font-orbitron text-5xl font-black text-white mb-6 uppercase tracking-tight">
            {paymentMethod === 'cod' ? 'BOOKING SECURED' : 'MISSION SUCCESS'}
          </h2>
          <p className="text-slate-400 text-lg mb-12">
            {paymentMethod === 'cod' 
              ? `Your order for ${formData.city} has been logged. Our logistics team will contact you for a verification handshake before dispatch.`
              : 'Your neon artifact has been secured and is entering our fabrication queue. A confirmation transmission has been sent to your terminal.'
            }
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => onNavigate('home')}
              className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(52,211,153,0.4)]"
            >
              RETURN TO BASE
            </button>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest pt-4">
              Estimated Delivery: {isPakistan ? '3-5 Local Cycles' : '7-10 Business Cycles'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="relative mb-12">
          <Loader2 className="w-24 h-24 text-cyan-400 animate-spin" />
          <div className="absolute inset-0 bg-cyan-400/20 blur-3xl animate-pulse"></div>
        </div>
        <h2 className="font-orbitron text-4xl font-black text-white mb-4 animate-pulse uppercase tracking-widest">
          {paymentMethod === 'cod' ? 'VERIFYING COORDINATES' : 'AUTHORIZING ENCRYPTION'}
        </h2>
        <p className="text-slate-500 font-mono text-sm max-w-sm">
          {paymentMethod === 'cod' 
            ? 'Validating delivery route through local nodes...' 
            : 'Establishing secure handshake with the neon-mesh network...'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="font-orbitron text-6xl md:text-7xl font-black mb-4 uppercase">CHECKOUT</h1>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors ${step === 'shipping' ? 'text-cyan-400' : 'text-slate-600'}`}>
            <Truck className="w-4 h-4" /> 01. Shipping
          </div>
          <div className="h-px w-12 bg-white/5"></div>
          <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors ${step === 'payment' ? 'text-fuchsia-400' : 'text-slate-600'}`}>
            <CreditCard className="w-4 h-4" /> 02. Payment
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <form onSubmit={handleNext} className="space-y-10">
            {step === 'shipping' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                {isPakistan && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-4 mb-8">
                    <MapPin className="text-emerald-400 w-6 h-6 animate-bounce" />
                    <div>
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Pakistan Node Detected</p>
                      <p className="text-xs text-slate-300">Localized Cash on Delivery (COD) is now available for your region.</p>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-slate-900/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all text-sm" placeholder="e.g. Ali Khan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Email Uplink</label>
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-slate-900/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all text-sm" placeholder="ali@neon.pk" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Shipment Coordinates (Address)</label>
                  <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full bg-slate-900/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all text-sm" placeholder="Street, Sector/Area Name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Sector (City)</label>
                    <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-slate-900/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all text-sm" placeholder="Karachi, Lahore, Islamabad..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Territory (Country)</label>
                    <input required name="country" value={formData.country} onChange={handleInputChange} type="text" className="w-full bg-slate-900/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all text-sm" placeholder="Type 'Pakistan' for COD" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Payment Method Selector */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-3 ${
                      paymentMethod === 'card' 
                        ? 'bg-fuchsia-500/10 border-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.2)]' 
                        : 'glass-panel border-white/5 hover:border-white/20 opacity-60'
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-fuchsia-400' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Cyber-Card</span>
                  </button>

                  <button
                    type="button"
                    disabled={!isPakistan}
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
                      paymentMethod === 'cod' 
                        ? 'bg-emerald-500/10 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]' 
                        : isPakistan ? 'glass-panel border-white/5 hover:border-white/20 opacity-60' : 'bg-slate-950/50 border-white/5 cursor-not-allowed opacity-30'
                    }`}
                  >
                    <Banknote className={`w-8 h-8 ${paymentMethod === 'cod' ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Neural COD</span>
                    {!isPakistan && (
                      <span className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-[8px] font-black text-fuchsia-400 uppercase">Pakistan Only</span>
                    )}
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="glass-panel p-10 rounded-[2.5rem] border border-fuchsia-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 text-fuchsia-500/10">
                      <CreditCard className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Card Signature Number</label>
                        <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-fuchsia-400/50 transition-all text-sm font-mono tracking-widest" placeholder="XXXX XXXX XXXX XXXX" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Expiration</label>
                          <input required name="expiry" value={formData.expiry} onChange={handleInputChange} type="text" className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-fuchsia-400/50 transition-all text-sm font-mono" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">CVV</label>
                          <input required name="cvv" value={formData.cvv} onChange={handleInputChange} type="text" className="w-full bg-slate-950/60 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-fuchsia-400/50 transition-all text-sm font-mono" placeholder="XXX" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="glass-panel p-10 rounded-[2.5rem] border border-emerald-500/20 animate-in slide-in-from-top-4">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-orbitron text-xl font-black text-white uppercase">Neural COD Protocol</h4>
                        <p className="text-xs text-slate-500">Secure delivery for the Pakistan Cluster</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5 text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">
                        • Pay ${total} cash upon delivery to the Luminal Logistics agent.
                      </div>
                      <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5 text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">
                        • Order verification call required before fabrication.
                      </div>
                      <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5 text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">
                        • Standard delivery within 3-5 business cycles.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {step === 'payment' && (
                <button 
                  type="button" 
                  onClick={() => setStep('shipping')}
                  className="px-10 py-5 rounded-2xl glass-panel border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
                >
                  Back to Shipping
                </button>
              )}
              <button 
                type="submit"
                className={`flex-grow py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 ${
                  step === 'shipping' 
                    ? 'bg-cyan-400 text-slate-950 hover:bg-white hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]' 
                    : paymentMethod === 'card'
                      ? 'bg-fuchsia-500 text-white hover:bg-white hover:text-slate-950 hover:shadow-[0_0_40px_rgba(217,70,239,0.5)]'
                      : 'bg-emerald-500 text-white hover:bg-white hover:text-slate-950 hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]'
                }`}
              >
                {step === 'shipping' ? (
                  <>NEXT PHASE <ArrowRight className="w-4 h-4" /></>
                ) : (
                  <>
                    {paymentMethod === 'cod' ? 'CONFIRM ORDER' : 'AUTHORIZE PAYMENT'} 
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="glass-panel rounded-[3rem] p-10 border border-white/10 sticky top-40">
            <h3 className="font-orbitron text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-8">PAYMENT SUMMARY</h3>
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xs font-black text-white uppercase">{item.name}</h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">QTY: {item.quantity}</span>
                  </div>
                  <span className="font-orbitron text-xs font-black text-white">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5 mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>Subtotal</span>
                <span className="text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>Logistics Fee</span>
                <span className="text-white">${shipping}</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${paymentMethod === 'cod' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                    TOTAL INVESTMENT
                  </span>
                  <span className="font-orbitron text-4xl font-black text-white text-glow-cyan">${total}</span>
                </div>
                <Sparkles className={`w-6 h-6 animate-pulse ${paymentMethod === 'cod' ? 'text-emerald-400' : 'text-cyan-400'}`} />
              </div>
            </div>

            <div className={`p-6 rounded-2xl border flex gap-4 transition-colors ${paymentMethod === 'cod' ? 'bg-emerald-400/5 border-emerald-400/20' : 'bg-cyan-400/5 border-cyan-400/20'}`}>
              <ShieldCheck className={`w-6 h-6 flex-shrink-0 ${paymentMethod === 'cod' ? 'text-emerald-400' : 'text-cyan-400'}`} />
              <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed tracking-tighter">
                {paymentMethod === 'cod' 
                  ? 'Your identity coordinates are protected by end-to-end verification logic. Payment will be collected in person.'
                  : 'Your payment data is processed through quantum-secure encryption. We never store raw financial metadata.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
