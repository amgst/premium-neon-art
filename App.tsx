
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import MouseGlow from './components/MouseGlow';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Customizer from './pages/Customizer';
import TheCraft from './pages/TheCraft';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import { PageType, CartItem, NeonSign, SystemConfig } from './types';

const DEFAULT_SIGNS: NeonSign[] = [
  { 
    id: '1', 
    name: 'Aura Heart', 
    price: 189, 
    category: 'Love', 
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
    description: 'A radiant heart-shaped neon sign that brings a warm, romantic glow to any bedroom or living space.',
    tags: ['bedroom', 'romance'],
    isNew: true
  },
  { 
    id: '2', 
    name: 'Pacific Palm', 
    price: 245, 
    category: 'Tropical', 
    image: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=800',
    description: 'Bring the beach vibes home with this electric palm tree.',
    tags: ['lounge', 'summer']
  },
  { 
    id: '3', 
    name: 'Wild Soul', 
    price: 155, 
    category: 'Quotes', 
    image: 'https://images.unsplash.com/photo-1554147090-e11d1335a73c?auto=format&fit=crop&q=80&w=800',
    description: 'A bold, cursive "Wild Soul" script.',
    tags: ['office', 'quote'],
    isNew: true
  },
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [signs, setSigns] = useState<NeonSign[]>(DEFAULT_SIGNS);
  const [config, setConfig] = useState<SystemConfig>({
    storeName: 'LUMINAL SIGN',
    saleMode: false,
    maintenanceMode: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const addToCart = (product: NeonSign) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, tags: product.tags || [] }];
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'shop': return (
        <Shop 
          signs={signs}
          config={config}
          onAddToCart={addToCart} 
          wishlist={wishlist} 
          onToggleWishlist={toggleWishlist} 
        />
      );
      case 'custom': return <Customizer />;
      case 'craft': return <TheCraft />;
      case 'cart': return (
        <Cart 
          items={cart} 
          onUpdateQuantity={updateQuantity} 
          onRemove={removeFromCart}
          onNavigate={setCurrentPage}
        />
      );
      case 'checkout': return (
        <Checkout 
          cart={cart} 
          onComplete={clearCart} 
          onNavigate={setCurrentPage} 
        />
      );
      case 'admin': return (
        <Admin 
          signs={signs} 
          setSigns={setSigns} 
          config={config} 
          setConfig={setConfig} 
        />
      );
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 relative selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
      <MouseGlow />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full mix-blend-screen filter blur-[150px] animate-blob"></div>
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/15 rounded-full mix-blend-screen filter blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[10%] w-[1000px] h-[1000px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[150px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          isScrolled={scrolled} 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
          storeName={config.storeName}
        />
        
        <main className="flex-grow animate-in fade-in duration-500">
          {renderPage()}
        </main>

        <Footer onNavigate={setCurrentPage} storeName={config.storeName} />
        <AIAssistant />
      </div>
    </div>
  );
};

export default App;
