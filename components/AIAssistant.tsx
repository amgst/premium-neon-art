
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hey there! ✨ I am your LuminalSign consultant. Ready to find the perfect glow for your space?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await sendMessageToGemini(input, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'The light is flickering... check your connection.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative group p-4 rounded-full shadow-2xl transition-all duration-500 transform ${
          isOpen ? 'rotate-90 bg-slate-900 scale-90' : 'bg-white hover:scale-110'
        }`}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-400 to-cyan-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        {isOpen ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <MessageSquare className="w-6 h-6 text-slate-950 relative z-10" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] max-h-[500px] flex flex-col glass-panel rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-fuchsia-500/20 rounded-full flex items-center justify-center text-fuchsia-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black font-orbitron tracking-tight text-white">LUMINA</h3>
                <span className="text-[10px] text-fuchsia-400 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse"></span>
                  ILLUMINATED
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/20"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-white text-slate-950 font-medium shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-slate-900/80 text-slate-200 border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900/80 p-3 rounded-2xl text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message Lumina..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-fuchsia-400/50 transition-all pr-12"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 p-1.5 bg-fuchsia-500 text-white rounded-full hover:bg-white hover:text-fuchsia-500 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
