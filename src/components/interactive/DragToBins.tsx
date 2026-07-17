import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function DragToBins({ data, status, onComplete }: any) {
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [binItems, setBinItems] = useState<Record<string, string>>({});

  // Normalize data formats
  const normalizedItems = data.options || data.items || [];
  const getCorrectBin = (itemId: string) => {
    if (data.options) {
      const opt = data.options.find((o: any) => o.id === itemId);
      return opt ? opt.correctBin : null;
    }
    if (data.bins) {
      const bin = data.bins.find((b: any) => b.accepts && b.accepts.includes(itemId));
      return bin ? bin.id : null;
    }
    return null;
  };

  useEffect(() => {
    // Reset state if data changes
    setActiveToken(null);
    setBinItems({});
  }, [data]);

  useEffect(() => {
    // Auto-move items to correct bins when showing answer
    if (status === 'showing_answer') {
      const correctBins: Record<string, string> = {};
      normalizedItems.forEach((item: any) => {
        const correct = getCorrectBin(item.id);
        if (correct) correctBins[item.id] = correct;
      });
      setBinItems(correctBins);
      setActiveToken(null);
    }
  }, [status, data]);

  const handleTokenTap = (opt: any) => {
    if (status !== 'idle' && status !== 'ready' && status !== 'incorrect') return;
    setActiveToken(opt.id === activeToken ? null : opt.id); // toggle
  };
  
  const handleBinTap = (binId: string) => {
    if (!activeToken || (status !== 'idle' && status !== 'ready' && status !== 'incorrect')) return;
    
    const newBins = { ...binItems, [activeToken]: binId };
    setBinItems(newBins);
    setActiveToken(null);
    
    if (Object.keys(newBins).length === normalizedItems.length) {
      // Check correctness
      let allCorrect = true;
      for (const item of normalizedItems) {
        if (newBins[item.id] !== getCorrectBin(item.id)) {
          allCorrect = false;
          break;
        }
      }
      onComplete({ id: 'drag_to_bins', isCorrect: allCorrect, hasAttempted: true });
    } else {
      onComplete(null);
    }
  };

  const removeToken = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'idle' || status === 'ready' || status === 'incorrect') {
      const newB = { ...binItems };
      delete newB[optId];
      setBinItems(newB);
      onComplete(null);
    }
  };

  const unassignedOptions = normalizedItems.filter((o: any) => !binItems[o.id]);

  return (
    <div className="w-full flex flex-col items-center mt-6 gap-8 animate-in fade-in zoom-in-95 duration-500">
       {/* Unassigned Tokens */}
       <div className="flex flex-wrap justify-center gap-3 min-h-[70px] p-4 bg-[#1A1A1A] rounded-2xl border-2 border-neutral-800 w-full shadow-inner relative">
         {unassignedOptions.length === 0 && <span className="text-neutral-600 font-bold italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Đã phân loại hết!</span>}
         {unassignedOptions.map((opt: any) => (
           <button key={opt.id} onClick={() => handleTokenTap(opt)} 
             className={`px-4 py-3 font-bold rounded-xl border-2 transition-all shadow-md
               ${activeToken === opt.id ? 'border-yellow-500 bg-yellow-500 text-black scale-105 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'border-neutral-600 bg-[#222] text-neutral-300 hover:border-neutral-400 hover:bg-[#333]'}`}>
             {opt.label}
           </button>
         ))}
       </div>

       {/* Bins */}
       <div className="flex flex-col md:flex-row gap-6 w-full">
         {data.bins?.map((bin: any) => {
           const itemsInBin = normalizedItems.filter((o: any) => binItems[o.id] === bin.id);
           return (
             <div key={bin.id} onClick={() => handleBinTap(bin.id)} className={`flex-1 min-h-[220px] border-4 rounded-3xl p-5 flex flex-col gap-3 transition-colors cursor-pointer shadow-xl
               ${activeToken ? 'border-yellow-500/50 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'border-neutral-800 bg-[#111] hover:border-neutral-700'}
               ${(status === 'correct' || status === 'showing_answer') ? 'border-green-900 bg-green-900/10' : ''}`}>
               <h3 className="text-center font-black text-neutral-400 uppercase tracking-widest text-sm mb-4 border-b-2 border-neutral-800 pb-2">{bin.label}</h3>
               {itemsInBin.map((opt: any) => {
                  const isWrong = status === 'incorrect' && getCorrectBin(opt.id) !== bin.id;
                  const isCorrectlyPlaced = (status === 'correct' || status === 'showing_answer') && getCorrectBin(opt.id) === bin.id;
                  
                  return (
                    <div key={opt.id} onClick={(e) => removeToken(opt.id, e)} 
                       className={`px-4 py-3 font-bold rounded-xl border-2 text-center text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2
                         ${isWrong ? 'border-red-500 bg-red-500/20 text-red-400 animate-pulse' : 
                           isCorrectlyPlaced ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-neutral-600 bg-[#333] hover:border-red-500 hover:text-red-400 text-white'}`}>
                      {opt.label}
                      {isCorrectlyPlaced && <CheckCircle2 size={16} />}
                      {isWrong && <AlertCircle size={16} />}
                    </div>
                  );
               })}
             </div>
           );
         })}
       </div>
    </div>
  );
}
