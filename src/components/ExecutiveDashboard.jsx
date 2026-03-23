import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Share, Search, FileText, BarChart2, MessageSquare, ExternalLink } from 'lucide-react';

export default function ExecutiveDashboard() {
  const [stream, setStream] = useState([
    { id: 1, text: "Are you testing the water daily?", time: "10:02am", category: "Water" },
    { id: 2, text: "What happens to our property values?", time: "10:04am", category: "Econ" },
    { id: 3, text: "I heard the generators run all night. True?", time: "10:05am", category: "Noise" },
    { id: 4, text: "Will there be local hiring?", time: "10:06am", category: "Jobs" },
    { id: 5, text: "Can we see the DEQ permits?", time: "10:07am", category: "Regulatory" },
  ]);

  // Auto-add new question for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setStream(prev => [{ id: Date.now(), text: "How loud is it going to be?", time: "10:08am", category: "Noise" }, ...prev]);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    
    if (search.toLowerCase().includes('water') || search.toLowerCase().includes('aquifer')) {
      setSearchResults([
        { title: '2025 Hydrogeologic Survey', snippet: '...water levels are within standard operating thresholds...', page: 12 },
        { title: 'DEQ Aquifer Protection Plan', snippet: '...monthly testing required at 4 perimeter wells...', page: 4 }
      ]);
    } else if (search.toLowerCase().includes('noise') || search.toLowerCase().includes('decibel')) {
      setSearchResults([
        { title: '2025 Perimeter Acoustic Assessment', snippet: '...Decibel levels at the property line are capped at 55dB...', page: 4 }
      ]);
    } else {
      setSearchResults([
        { title: 'General Operations Manual', snippet: '...site operates under standard DEQ variance protocols...', page: 1 }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-carbon text-gray-100 p-6 flex flex-col overflow-hidden relative">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-smokyTeal/5 blur-[120px] rounded-full pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyanGlow/5 blur-[120px] rounded-full pointer-events-none" />
       
       <header className="z-10 flex justify-between items-end mb-6 border-b border-smokyTeal/30 pb-4">
         <div className="flex items-center gap-4">
           <Link to="/" className="text-sm border border-smokyTeal/30 px-3 py-1 rounded-full text-smokyTeal hover:bg-smokyTeal hover:text-carbon transition-colors">
              &larr; Home
           </Link>
           <div>
             <h1 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
               Executive <span className="text-smokyTeal font-medium">Command</span>
               <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded animate-pulse border border-red-500/30 flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> LIVE
               </span>
             </h1>
             <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest">Bonner Pilot - Town Hall Mode</p>
           </div>
         </div>
         <button className="bg-burntOrange hover:bg-[#ff991a] text-carbon font-semibold px-5 py-2 rounded-xl text-sm transition-colors shadow-lg shadow-burntOrange/20 flex items-center gap-2 hover:scale-105 transform">
           <Share className="w-4 h-4" />
           Generate Digital Digest
         </button>
       </header>
       
       <main className="flex-1 z-10 flex gap-6 h-[calc(100vh-140px)]">
          {/* Panel 1: Stream of Consciousness */}
          <div className="w-1/3 glass-morphism rounded-2xl p-5 border border-smokyTeal/20 flex flex-col relative overflow-hidden">
            <h2 className="text-sm font-medium text-cyanGlow uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Stream of Consciousness
            </h2>
            <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar flex flex-col gap-3">
               {stream.map((msg, i) => (
                 <div key={msg.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-smokyTeal/30 transition-colors animate-in fade-in slide-in-from-top-4">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-xs text-smokyTeal font-medium px-2 py-0.5 rounded-md bg-smokyTeal/10">{msg.category}</span>
                     <span className="text-xs text-gray-500">{msg.time}</span>
                   </div>
                   <p className="text-sm text-gray-200">{msg.text}</p>
                 </div>
               ))}
            </div>
            {/* Fade out bottom */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-carbon to-transparent pointer-events-none" />
          </div>
          
          {/* Panel 2: The Heatmap */}
          <div className="w-1/3 glass-morphism rounded-2xl p-5 border border-smokyTeal/20 flex flex-col">
            <h2 className="text-sm font-medium text-cyanGlow uppercase tracking-wider mb-4 flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> The Heatmap
            </h2>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="w-full space-y-6">
                <div className="group">
                  <div className="flex justify-between text-sm mb-1 text-gray-300 group-hover:text-white transition-colors"><span>Water Quality</span> <span>45%</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-smokyTeal h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex justify-between text-sm mb-1 text-gray-300 group-hover:text-white transition-colors"><span>Noise Pollution</span> <span>30%</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-cyanGlow h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex justify-between text-sm mb-1 text-gray-300 group-hover:text-white transition-colors"><span>Local Jobs</span> <span>15%</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-burntOrange h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex justify-between text-sm mb-1 text-gray-300 group-hover:text-white transition-colors"><span>Property Values</span> <span>10%</span></div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gray-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-8 italic text-center">Auto-categorized from audience SMS queries in real-time.</p>
            </div>
          </div>
          
          {/* Panel 3: Expert Retrieval */}
          <div className="w-1/3 glass-morphism rounded-2xl p-5 border border-smokyTeal/20 flex flex-col bg-gradient-to-b from-transparent to-smokyTeal/5">
            <h2 className="text-sm font-medium text-cyanGlow uppercase tracking-wider mb-4 flex items-center gap-2">
              <Search className="w-4 h-4" /> Expert Retrieval
            </h2>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative border border-smokyTeal/30 rounded-lg overflow-hidden focus-within:border-cyanGlow transition-colors shadow-inner">
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Fast-search DEQ reports..." 
                  className="w-full bg-black/40 px-4 py-3 pl-10 text-sm text-white focus:outline-none"
                />
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                <button type="submit" className="absolute right-2 top-2 bg-smokyTeal text-carbon px-3 py-1.5 text-xs font-medium rounded hover:bg-cyanGlow transition-colors">
                  Pull
                </button>
              </div>
            </form>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {!searchResults ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-3">
                  <FileText className="w-8 h-8 opacity-20" />
                  <p className="text-xs text-center max-w-[200px]">Search the knowledge base to instantly pull reference material during the meeting.</p>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in">
                  <p className="text-xs text-smokyTeal mb-2">{searchResults.length} verified matching sources</p>
                  {searchResults.map((res, i) => (
                    <div key={i} className="bg-white/5 border border-smokyTeal/20 rounded-xl p-4 hover:border-cyanGlow/40 transition-colors cursor-pointer group shadow-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-white group-hover:text-cyanGlow transition-colors leading-tight pr-2">{res.title}</h4>
                        <span className="text-xs bg-carbon px-2 py-0.5 rounded border border-white/10 truncate">Pg. {res.page}</span>
                      </div>
                      <p className="text-xs text-gray-400 italic mb-3">"{res.snippet}"</p>
                      <button className="text-xs flex items-center gap-1 text-smokyTeal hover:text-cyanGlow transition-colors font-medium">
                        Open Document <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
       </main>
    </div>
  );
}
