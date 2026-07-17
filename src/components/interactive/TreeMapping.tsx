import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

export default function TreeMapping({ data, status, onComplete }: any) {
  const [slot1, setSlot1] = useState<string | null>(null);
  const [slot2, setSlot2] = useState<string | null>(null);
  const [slot3, setSlot3] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [errorSlot, setErrorSlot] = useState<string | null>(null);

  useEffect(() => {
    setSlot1(null);
    setSlot2(null);
    setSlot3(null);
    setErrorSlot(null);
  }, [data]);

  useEffect(() => {
    if (status === 'showing_answer') {
      setSlot1(data.parentSlot.correctId);
      setSlot2(data.childSlots[0].correctIds[0]);
      setSlot3(data.childSlots[1].correctIds[0]); // assuming at least 2 distinct correct ids
      setErrorSlot(null);
    }
  }, [status, data]);

  useEffect(() => {
    if (slot1 && slot2 && slot3 && status !== 'correct') {
      const isS1Correct = slot1 === data.parentSlot.correctId;
      const isS2Correct = data.childSlots[0].correctIds.includes(slot2);
      const isS3Correct = data.childSlots[1].correctIds.includes(slot3);
      
      // Additional check to ensure s2 and s3 are different options
      const areChildrenValid = isS2Correct && isS3Correct && slot2 !== slot3;

      if (isS1Correct && areChildrenValid) {
        onComplete({ isCorrect: true, hasAttempted: true });
      } else {
        if (!isS1Correct) setErrorSlot('s1');
        else if (!isS2Correct || slot2 === slot3) setErrorSlot('s2');
        else setErrorSlot('s3');

        setTimeout(() => {
          setErrorSlot(null);
          if (!isS1Correct) setSlot1(null);
          if (!isS2Correct || slot2 === slot3) setSlot2(null);
          if (!isS3Correct || slot2 === slot3) setSlot3(null);
          onComplete(null);
        }, 1000);
        
        onComplete({ isCorrect: false, hasAttempted: true });
      }
    }
  }, [slot1, slot2, slot3]);

  const handleDrop = (slotId: string) => {
    if (!draggedItem) return;
    if (slotId === 's1') setSlot1(draggedItem);
    if (slotId === 's2') setSlot2(draggedItem);
    if (slotId === 's3') setSlot3(draggedItem);
    setDraggedItem(null);
  };

  const getOptionLabel = (id: string | null) => {
    if (!id) return '';
    const opt = data.options.find((o: any) => o.id === id);
    return opt ? opt.label : '';
  };

  const availableOptions = data.options.filter((o: any) => 
    o.id !== slot1 && o.id !== slot2 && o.id !== slot3
  );

  return (
    <div className="w-full flex flex-col items-center mt-6 animate-in fade-in zoom-in-95 duration-500 gap-8">
      
      {/* Sandbox Visual Area */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center p-8 min-h-[400px] bg-[#111] rounded-3xl border-2 border-neutral-800 shadow-inner overflow-hidden relative">
        
        {/* Left Actor -> Parent */}
        <div className="flex items-center justify-center gap-6 w-full mb-8">
           <div className="flex flex-col items-center justify-center shadow-lg border-4 w-24 h-24 md:w-28 md:h-28 rounded-2xl border-neutral-600 bg-[#1A1A1A] text-neutral-300">
             <User size={40} className="mb-2" />
             <span className="font-bold text-sm leading-tight text-center">Khách hàng</span>
           </div>

           <div className="w-16 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

           {/* SLOT 1 (Parent) */}
           <div 
             className={`w-40 md:w-56 h-24 flex items-center justify-center rounded-[50%] border-4 border-dashed transition-all
               ${slot1 ? 'border-blue-500 bg-blue-500/10 text-blue-400 border-solid' : 'border-neutral-600 bg-[#1A1A1A] text-neutral-500'}
               ${errorSlot === 's1' ? 'border-red-500 bg-red-500/20 text-red-500 animate-[shakeScreen_0.2s_ease-in-out_2]' : ''}
               ${(status === 'correct' || status === 'showing_answer') ? 'border-green-500 text-green-400 bg-green-500/10' : ''}
             `}
             onDragOver={(e) => e.preventDefault()}
             onDrop={() => handleDrop('s1')}
           >
             <span className="font-bold text-sm md:text-base leading-tight text-center">{slot1 ? getOptionLabel(slot1) : '?'}</span>
           </div>
        </div>

        {/* The Tree Branches */}
        <div className="w-full flex justify-center mb-8 relative">
           <div className="absolute top-0 w-64 h-16 border-l-2 border-r-2 border-t-2 border-blue-500 border-solid translate-y-[-100%] rounded-tl-xl rounded-tr-xl z-0"></div>
           {/* The Generalization Arrowhead pointing UP to Slot 1 */}
           <div className="absolute top-0 -translate-y-[100%] z-10 w-0 h-0 border-b-[12px] border-b-[#111] border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent filter drop-shadow-[0_-2px_0_#3B82F6]"></div>
        </div>

        {/* Children Row */}
        <div className="flex justify-center gap-16 md:gap-32 w-full z-10">
           
           {/* SLOT 2 */}
           <div 
             className={`w-40 md:w-56 h-24 flex items-center justify-center rounded-[50%] border-4 border-dashed transition-all
               ${slot2 ? 'border-blue-500 bg-blue-500/10 text-blue-400 border-solid' : 'border-neutral-600 bg-[#1A1A1A] text-neutral-500'}
               ${errorSlot === 's2' ? 'border-red-500 bg-red-500/20 text-red-500 animate-[shakeScreen_0.2s_ease-in-out_2]' : ''}
               ${(status === 'correct' || status === 'showing_answer') ? 'border-green-500 text-green-400 bg-green-500/10' : ''}
             `}
             onDragOver={(e) => e.preventDefault()}
             onDrop={() => handleDrop('s2')}
           >
             <span className="font-bold text-sm md:text-base leading-tight text-center">{slot2 ? getOptionLabel(slot2) : '?'}</span>
           </div>

           {/* SLOT 3 */}
           <div 
             className={`w-40 md:w-56 h-24 flex items-center justify-center rounded-[50%] border-4 border-dashed transition-all
               ${slot3 ? 'border-blue-500 bg-blue-500/10 text-blue-400 border-solid' : 'border-neutral-600 bg-[#1A1A1A] text-neutral-500'}
               ${errorSlot === 's3' ? 'border-red-500 bg-red-500/20 text-red-500 animate-[shakeScreen_0.2s_ease-in-out_2]' : ''}
               ${(status === 'correct' || status === 'showing_answer') ? 'border-green-500 text-green-400 bg-green-500/10' : ''}
             `}
             onDragOver={(e) => e.preventDefault()}
             onDrop={() => handleDrop('s3')}
           >
             <span className="font-bold text-sm md:text-base leading-tight text-center">{slot3 ? getOptionLabel(slot3) : '?'}</span>
           </div>

        </div>

      </div>

      {/* Options Bank */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-3xl">
         {availableOptions.map((opt: any) => (
            <div
              key={opt.id}
              draggable={status !== 'correct' && status !== 'showing_answer'}
              onDragStart={() => setDraggedItem(opt.id)}
              className="px-6 py-3 rounded-full border-2 border-neutral-700 bg-neutral-900 text-neutral-300 font-medium cursor-grab active:cursor-grabbing hover:border-neutral-500 hover:bg-neutral-800 transition-colors shadow-lg"
            >
              {opt.label}
            </div>
         ))}
         {availableOptions.length === 0 && status !== 'correct' && (
           <div className="px-6 py-3 rounded-full border-2 border-dashed border-neutral-800 text-neutral-600 font-medium italic">
             Đã kéo hết các thẻ
           </div>
         )}
      </div>
      
    </div>
  );
}
