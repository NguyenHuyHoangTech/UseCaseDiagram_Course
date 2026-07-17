import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function BlockMapping({ data, status, onComplete }: any) {
  const [activeToken, setActiveToken] = useState<string | null>(null);
  
  // Mapping of slot index to option id
  const [slotItems, setSlotItems] = useState<(string | null)[]>([]);

  useEffect(() => {
    setActiveToken(null);
    setSlotItems(Array(data.slots?.length || 3).fill(null).map((_, i) => data.slots[i]?.isStatic ? 'STATIC' : null));
  }, [data]);

  useEffect(() => {
    if (status === 'showing_answer') {
      const correctSlots = [...slotItems];
      data.correctMapping.forEach((expected: any, idx: number) => {
        if (expected !== null) {
           correctSlots[idx] = Array.isArray(expected) ? expected[0] : expected;
        }
      });
      setSlotItems(correctSlots);
      setActiveToken(null);
    }
  }, [status, data]);

  const handleTokenTap = (opt: any) => {
    if (status !== 'idle' && status !== 'ready' && status !== 'incorrect') return;
    setActiveToken(opt.id === activeToken ? null : opt.id);
  };
  
  const handleSlotTap = (slotIndex: number) => {
    if (!activeToken || (status !== 'idle' && status !== 'ready' && status !== 'incorrect')) return;
    if (data.slots[slotIndex]?.isStatic) return;
    
    const newSlots = [...slotItems];
    
    // If the token was already in another slot, remove it from there
    const existingIndex = newSlots.findIndex(id => id === activeToken);
    if (existingIndex !== -1) {
      newSlots[existingIndex] = null;
    }
    
    // If the slot is occupied, move that occupant back to unassigned
    newSlots[slotIndex] = activeToken;
    
    setSlotItems(newSlots);
    setActiveToken(null);
    
    // Check completion
    if (newSlots.every(id => id !== null)) {
      let isCorrect = true;
      for (let i = 0; i < data.correctMapping.length; i++) {
        const expected = data.correctMapping[i];
        if (expected === null) continue; // Skip static or explicitly null
        
        if (Array.isArray(expected)) {
          if (!expected.includes(newSlots[i])) {
            isCorrect = false;
            break;
          }
        } else {
          if (newSlots[i] !== expected) {
            isCorrect = false;
            break;
          }
        }
      }
      onComplete({ id: 'block_mapping', isCorrect, hasAttempted: true });
    } else {
      onComplete(null);
    }
  };

  const removeTokenFromSlot = (slotIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'idle' || status === 'ready' || status === 'incorrect') {
      if (data.slots[slotIndex]?.isStatic) return;
      const newSlots = [...slotItems];
      newSlots[slotIndex] = null;
      setSlotItems(newSlots);
      onComplete(null);
    }
  };

  const unassignedOptions = data.options?.filter((o: any) => !slotItems.includes(o.id)) || [];

  return (
    <div className="w-full flex flex-col items-center mt-6 gap-12 animate-in fade-in zoom-in-95 duration-500">
       
       {/* Bins / Slots representing a sequence */}
       <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
         {data.slots?.map((slot: any, idx: number) => {
           const occupantId = slotItems[idx];
           const occupant = data.options.find((o: any) => o.id === occupantId);
           
           return (
              <div key={slot.id || idx} className="flex flex-col md:flex-row items-center gap-4 relative">
                {slot.isStatic ? (
                   <div className="w-40 min-h-[100px] border-[3px] rounded-2xl p-3 flex flex-col items-center justify-center border-blue-500 bg-blue-500/10 shadow-lg">
                      <span className="text-[10px] uppercase font-black tracking-widest text-blue-400 mb-2">{slot.label}</span>
                      <div className={`w-full py-3 px-2 font-bold text-center text-sm shadow-md transition-all border-2 border-blue-500 bg-blue-900 text-white ${slot.staticType === 'usecase' ? 'rounded-full' : 'rounded-xl'}`}>
                         {slot.staticLabel}
                      </div>
                   </div>
                ) : (
                <div 
                  onClick={() => handleSlotTap(idx)} 
                  className={`w-40 min-h-[100px] border-[3px] rounded-2xl p-3 flex flex-col items-center justify-center transition-all cursor-pointer shadow-lg
                    ${activeToken && !occupant ? 'border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-pulse' : 'border-neutral-700 bg-[#1A1A1A] hover:border-neutral-500'}
                    ${(status === 'correct' || status === 'showing_answer') ? 'border-green-500 bg-green-500/10' : ''}
                    ${status === 'incorrect' ? 'border-red-500/50' : ''}
                  `}
                >
                  <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500 mb-2">{slot.label}</span>
                  
                  {occupant ? (
                    <div 
                      onClick={(e) => removeTokenFromSlot(idx, e)}
                      className={`w-full py-3 px-2 font-bold rounded-xl border-2 text-center text-sm shadow-md active:scale-95 transition-all
                        ${status === 'incorrect' && (Array.isArray(data.correctMapping[idx]) ? !data.correctMapping[idx].includes(occupantId) : occupantId !== data.correctMapping[idx]) ? 'border-red-500 bg-red-500 text-white animate-[shakeScreen_0.3s_ease-in-out]' : 
                          (status === 'correct' || status === 'showing_answer') ? 'border-green-500 bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'border-neutral-500 bg-[#333] hover:border-red-400 hover:text-red-400'}
                      `}
                    >  {occupant.label}
                    </div>
                  ) : (
                    <div className="text-sm font-medium text-neutral-600 border-2 border-dashed border-neutral-700 w-full rounded-lg py-2 text-center">Trống</div>
                  )}
                </div>
                )}
                
                {idx < data.slots.length - 1 && (
                  <ArrowRight size={32} className={`rotate-90 md:rotate-0 text-neutral-600 ${(status === 'correct' || status === 'showing_answer') ? 'text-green-500' : ''}`} />
                )}
             </div>
           );
         })}
       </div>

       {/* Unassigned Tokens */}
       <div className="flex flex-col w-full max-w-2xl bg-[#1A1A1A] p-6 rounded-3xl border-2 border-neutral-800 shadow-xl relative z-10">
         <h4 className="text-center font-bold text-neutral-400 mb-4 tracking-widest uppercase text-xs">Các khối chức năng</h4>
         <div className="flex flex-wrap justify-center gap-4 min-h-[60px]">
           {unassignedOptions.length === 0 && <span className="text-neutral-600 font-bold italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4">Đã đặt hết!</span>}
           {unassignedOptions.map((opt: any) => (
             <button key={opt.id} onClick={() => handleTokenTap(opt)} 
               className={`px-5 py-3 font-bold rounded-xl border-2 transition-all shadow-md active:scale-95
                 ${activeToken === opt.id ? 'border-yellow-500 bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.5)] -translate-y-1' : 'border-neutral-600 bg-[#222] text-neutral-300 hover:border-neutral-400 hover:bg-[#333]'}`}>
               {opt.label}
             </button>
           ))}
         </div>
       </div>

    </div>
  );
}
