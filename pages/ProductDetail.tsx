import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Share2, Star, Zap, Ruler, Palette, Lightbulb, Shield, Truck, RotateCcw, MessageCircle, ChevronLeft, ChevronRight, Maximize2, Minus, Plus } from 'lucide-react';
import { NeonSign, PageType } from '../types';

interface ProductDetailProps {
  product: NeonSign;
  onNavigate: (page: PageType) => void;
  onAddToCart: (product: NeonSign) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  relatedProducts: NeonSign[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  relatedProducts
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    onAddToCart(productWithQuantity);
    onNavigate('cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing neon sign: ${product.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % 3);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + 3) % 3);
  };

  const features = [
    { icon: <Lightbulb className="w-5 h-5" />, title: 'Energy Efficient LED', desc: 'Low power consumption with brilliant illumination' },
    { icon: <Shield className="w-5 h-5" />, title: 'Weather Resistant', desc: 'Designed for indoor and outdoor use' },
    { icon: <Palette className="w-5 h-5" />, title: 'Custom Colors', desc: 'Choose from our vibrant color palette' },
    { icon: <Truck className="w-5 h-5" />, title: 'Fast Shipping', desc: 'Free shipping on orders over $200' },
    { icon: <RotateCcw className="w-5 h-5" />, title: '2-Year Warranty', desc: 'Complete satisfaction guaranteed' },
    { icon: <Zap className="w-5 h-5" />, title: 'Plug & Play', desc: 'Easy installation with included mounting kit' }
  ];

  const specs = [
    { label: 'Dimensions', value: '24" x 12" (custom sizes available)' },
    { label: 'Material', value: 'Premium acrylic & LED strips' },
    { label: 'Power Consumption', value: '15W (equivalent to a standard bulb)' },
    { label: 'Voltage', value: '110-240V (Universal adapter included)' },
    { label: 'Brightness', value: '5000 lumens' },
    { label: 'Color Temperature', value: '6500K (Cool White)' },
    { label: 'IP Rating', value: 'IP65 (Water resistant)' },
    { label: 'Weight', value: '3.2 lbs' }
  ];

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('shop')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Shop</span>
      </button>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="relative glass-panel rounded-3xl p-6 border border-white/10">
            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-110"
                onClick={() => setZoomedImage(product.image)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <button
                onClick={() => setZoomedImage(product.image)}
                className="absolute top-4 right-4 p-3 glass-panel rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-slate-950"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-3 mt-6">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImageIndex === index ? 'border-fuchsia-400' : 'border-white/10 hover:border-white/30'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between">
            <button
              onClick={prevImage}
              className="p-4 glass-panel rounded-2xl border border-white/10 hover:bg-white/5 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="p-4 glass-panel rounded-2xl border border-white/10 hover:bg-white/5 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-fuchsia-400 font-bold tracking-[0.3em] uppercase text-xs mb-2 block text-glow-fuchsia">
                  {product.category}
                </span>
                <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white mb-4">
                  {product.name}
                </h1>
              </div>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-4 glass-panel rounded-2xl border transition-all hover:scale-110 ${
                  isWishlisted
                    ? 'border-fuchsia-400/50 bg-fuchsia-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)]'
                    : 'border-white/10 text-slate-400 hover:text-fuchsia-400 hover:border-fuchsia-400/30'
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {product.description || 'A stunning neon artwork that brings contemporary elegance to any space. Handcrafted with precision and illuminated with energy-efficient LED technology.'}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-slate-400 text-sm">(128 reviews)</span>
            </div>

            <div className="text-5xl font-orbitron font-black text-white mb-8">
              ${product.price}
              <span className="text-lg text-slate-400 ml-2">USD</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Quantity:</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 glass-panel rounded-xl border border-white/10 hover:bg-white/5 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-orbitron text-xl font-black text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 glass-panel rounded-xl border border-white/10 hover:bg-white/5 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95 flex items-center justify-center gap-3 hover-glow"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleShare}
              className="px-8 py-5 glass-panel border border-white/10 rounded-2xl text-white font-bold text-sm hover:bg-white/5 transition-all flex items-center gap-2 neon-glow-cyan"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
            {features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 glass-panel rounded-xl border border-white/5">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-32">
        <div className="flex border-b border-white/10 mb-12">
          {(['details', 'specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-8 font-bold uppercase tracking-widest text-sm transition-all relative ${
                activeTab === tab
                  ? 'text-fuchsia-400 text-glow-fuchsia'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'details' && 'Product Details'}
              {tab === 'specs' && 'Specifications'}
              {tab === 'reviews' && 'Reviews'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-fuchsia-400 subtle-glow"></div>
              )}
            </button>
          ))}
        </div>

        <div className="glass-panel rounded-3xl p-12 border border-white/5">
          {activeTab === 'details' && (
            <div className="prose prose-invert max-w-none">
              <h3 className="font-orbitron text-2xl font-black text-white mb-6">About This Piece</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Each neon sign is meticulously handcrafted by our master artisans using premium materials and cutting-edge LED technology. 
                The {product.name.toLowerCase()} combines artistic vision with functional brilliance, creating a statement piece that transforms any environment.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                Our proprietary manufacturing process ensures consistent quality and longevity. Every piece undergoes rigorous testing for brightness, 
                durability, and safety before leaving our facility.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div>
                  <h4 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-cyan-400" />
                    Dimensions & Fit
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Custom sizing available upon request</li>
                    <li>• Includes mounting hardware for easy installation</li>
                    <li>• Lightweight design for hassle-free handling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-fuchsia-400" />
                    Color Options
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Vibrant RGB color mixing capability</li>
                    <li>• Static color options available</li>
                    <li>• Remote control included for color adjustment</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div>
              <h3 className="font-orbitron text-2xl font-black text-white mb-8">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specs.map((spec, index) => (
                  <div key={index} className="flex justify-between py-4 border-b border-white/5">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                      {spec.label}
                    </span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="font-orbitron text-2xl font-black text-white mb-8">Customer Reviews</h3>
              <div className="space-y-8">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="glass-panel rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        U{review}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">User {review}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300">
                      Absolutely stunning piece! The quality exceeded my expectations and the shipping was incredibly fast. 
                      Will definitely be ordering more pieces for my collection.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mb-32">
          <h2 className="font-orbitron text-3xl font-black text-white mb-12 text-center">
            Related <span className="text-fuchsia-400 text-glow-fuchsia subtle-glow">Creations</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.slice(0, 3).map((related) => (
              <div
                key={related.id}
                className="group relative glass-panel rounded-2xl p-6 border border-white/5 hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="aspect-square bg-slate-900/50 rounded-xl mb-6 relative overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {related.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">{related.category}</p>
                <div className="flex justify-between items-center">
                  <span className="font-orbitron text-lg font-black text-white">${related.price}</span>
                  <button className="px-4 py-2 glass-panel border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-lg"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={zoomedImage}
              alt="Zoomed product"
              className="w-full h-auto rounded-2xl"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 p-3 glass-panel rounded-full border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;