import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, ChevronDown, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResidentPortal() {
  const [context, setContext] = useState('Bonner Site Specific');
  const [isContextOpen, setIsContextOpen] = useState(false);
  const contexts = ['Industry Standards', 'Krambu Global', 'Bonner Site Specific'];

  const [messages, setMessages] = useState([
    { role: 'system', text: 'Hello. I am your site liaison. Ask me anything about the Bonner site operations, water usage, or noise regulations.' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    // Mock RAG response logic with guardrails
    setTimeout(() => {
        let responseText = "Detail not in current filing. Flagged for Executive response.";
        let source = null;
        
        if (currentInput.toLowerCase().includes('water')) {
            responseText = "The recent hydrology report indicates water levels are within standard operating thresholds. No adverse aquifer impact detected.";
            source = "[Source: 2025 Hydrogeologic Survey, pg. 12]";
        } else if (currentInput.toLowerCase().includes('noise')) {
            responseText = "Acoustic baffling has been installed on the primary generators. Decibel levels at the property line are capped at 55dB during night operations.";
            source = "[Source: 2025 Perimeter Acoustic Assessment, pg. 4]";
        } else if (currentInput.toLowerCase().includes('jobs')) {
            responseText = "The facility is projected to add 45 high-paying specialized tech jobs in Q3.";
            source = "[Source: Local Economic Impact Report, pg. 2]";
        }

        setMessages(prev => [...prev, { role: 'system', text: responseText, source }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-carbon text-gray-100 p-4 pb-20 flex flex-col max-w-lg mx-auto relative overflow-x-hidden">
      {/* Dynamic Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[150%] h-64 bg-smokyTeal/5 blur-[100px] rounded-full pointer-events-none" />
      
      <header className="z-10 py-4 mb-4 flex items-center justify-between">
        <Link to="/" className="text-sm border border-smokyTeal/30 px-3 py-1 rounded-full text-smokyTeal hover:bg-smokyTeal hover:text-carbon transition-colors">
          &larr; Home
        </Link>
        <h1 className="text-xl font-light tracking-tight text-white">
          Resident <span className="text-smokyTeal font-medium">Portal</span>
        </h1>
      </header>

      {/* Context Switcher */}
      <div className="z-10 relative mb-6">
        <button 
          onClick={() => setIsContextOpen(!isContextOpen)}
          className="w-full glass-morphism flex items-center justify-between px-4 py-3 rounded-xl border border-smokyTeal/40 text-sm text-gray-300 transition-colors hover:bg-white/5"
        >
          <span className="opacity-60 mr-2">Context:</span> 
          <span className="flex-1 text-left font-medium text-cyanGlow">{context}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isContextOpen ? 'rotate-180' : ''}`} />
        </button>
        {isContextOpen && (
          <div className="absolute top-full left-0 w-full mt-2 glass-morphism rounded-xl border border-smokyTeal/30 overflow-hidden z-20">
            {contexts.map(c => (
              <button 
                key={c}
                className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-smokyTeal/20 hover:text-white transition-colors border-b border-white/5 last:border-0"
                onClick={() => { setContext(c); setIsContextOpen(false); }}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* The Liaison Chat */}
      <div className="flex-1 z-10 flex flex-col glass-morphism rounded-2xl border border-smokyTeal/20 overflow-hidden mb-6 h-[400px]">
        <div className="bg-carbon/80 p-3 border-b border-smokyTeal/20 text-xs font-semibold tracking-wider text-center uppercase text-gray-400">
          The Liaison
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 hide-scrollbar">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col max-w-[85%] ${m.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
               <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-smokyTeal/80 text-white rounded-tr-sm' : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'}`}>
                 {m.text}
               </div>
               {m.source && (
                 <div className="text-[10px] text-cyanGlow mt-1.5 opacity-80 flex items-center gap-1 bg-cyanGlow/10 px-2 py-0.5 rounded-full border border-cyanGlow/20">
                    <FileText className="w-3 h-3" />
                    {m.source}
                 </div>
               )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="p-3 bg-carbon/60 border-t border-smokyTeal/20 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about water, noise, etc..." 
            className="flex-1 bg-black/40 border border-smokyTeal/30 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-cyanGlow transition-colors"
          />
          <button type="submit" disabled={!input.trim()} className="bg-smokyTeal hover:bg-cyanGlow disabled:opacity-50 disabled:hover:bg-smokyTeal text-carbon p-2 rounded-full transition-colors flex items-center justify-center min-w-[40px]">
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>

      {/* Proof Feed */}
      <div className="z-10 mb-8">
         <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest pl-2 mb-3">Verified Documents</h2>
         <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[120px] h-[160px] glass-morphism rounded-xl border border-smokyTeal/20 flex flex-col items-center justify-center p-3 hover:border-cyanGlow/50 transition-colors cursor-pointer group">
                  <FileText className="w-8 h-8 text-smokyTeal mb-2 group-hover:text-cyanGlow transition-colors" />
                  <span className="text-xs text-center text-gray-400 group-hover:text-gray-200">2025 Filing 00{i}.pdf</span>
              </div>
            ))}
         </div>
      </div>

      {/* Digital Digest CTA */}
      <div className="z-10 glass-morphism rounded-2xl p-6 border-b-4 border-b-burntOrange text-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-burntOrange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
         <Bell className="w-8 h-8 text-burntOrange mx-auto mb-3" />
         <h3 className="text-lg font-medium text-white mb-2">Sign up for Meeting Summary</h3>
         <p className="text-sm text-gray-400 mb-4">Get the digital digest via SMS or Email after the town hall concludes.</p>
         <button className="bg-burntOrange hover:bg-[#ff991a] text-carbon font-semibold px-6 py-2.5 rounded-full text-sm transition-colors shadow-lg shadow-burntOrange/20 w-full sm:w-auto hover:scale-105 transform">
           Subscribe Now
         </button>
      </div>

    </div>
  );
}
