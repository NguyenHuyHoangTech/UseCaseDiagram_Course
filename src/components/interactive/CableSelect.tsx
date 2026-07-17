import { useState, useEffect } from 'react';
import { User, Cog, ArrowRight } from 'lucide-react';

export default function CableSelect({ data, status, onComplete }: any) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedId(null);
  }, [data]);

  const handleSelect = (id: string) => {
    if (status === 'correct' || status === 'showing_answer') return;
    
    setSelectedId(id);
    const opt = data.options.find((o: any) => o.id === id);
    onComplete({ isCorrect: opt?.isCorrect, id, hasAttempted: true });
  };

  const selectedOpt = data.options.find((o: any) => o.id === selectedId);
  const isError = (status === 'incorrect' || status === 'skill_check_incorrect');

  return (
    <div className="w-full flex flex-col items-center mt-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Sandbox Visual Area */}
      <div className="w-full max-w-2xl flex items-center justify-center p-8 min-h-[250px] mb-8 bg-[#111] rounded-3xl border-2 border-neutral-800 shadow-inner">
        
        <div className="flex items-center justify-between w-full max-w-lg relative">
          {/* Left Node */}
          <div className="flex flex-col items-center gap-2 z-20">
            <div className="w-24 h-24 flex items-center justify-center rounded-2xl border-4 border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg">
              {data.leftNode.type === 'actor' ? <User size={40} /> : <Cog size={40} />}
            </div>
            <span className="font-bold text-sm text-neutral-300">{data.leftNode.label}</span>
          </div>

          {/* Cable Area */}
          <div className="flex-1 h-24 relative flex items-center justify-center z-10 px-4">
             {!selectedId ? (
               <div className="w-full h-2 border-b-4 border-dashed border-neutral-700"></div>
             ) : (
               <div className={`w-full relative flex items-center justify-center transition-all
                 ${isError ? 'animate-[shakeScreen_0.2s_ease-in-out_infinite] text-red-500' : 
                   (status === 'correct' || status === 'showing_answer') ? 'text-green-500' : 'text-blue-500'}
               `}>
                 {/* The line */}
                 <div className={`absolute w-full h-1.5 
                   ${isError ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 
                     (status === 'correct' || status === 'showing_answer') ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-blue-500'}
                 `}></div>
                 
                 {/* The arrow if not basic association */}
                 {selectedId !== 'assoc' && (
                    <div className="absolute right-0 translate-x-1/2 bg-[#111] pl-1">
                       <ArrowRight size={32} className={isError ? 'text-red-500' : 'text-blue-500'} />
                    </div>
                 )}
                 
                 {/* The label */}
                 {selectedId !== 'assoc' && (
                    <div className={`absolute -top-8 px-3 py-1 text-xs font-black tracking-widest rounded-full bg-[#111] border-2
                      ${isError ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-400'}
                    `}>
                      {selectedOpt?.label}
                    </div>
                 )}

                 {isError && (
                    <div className="absolute top-8 text-2xl animate-[ping_0.5s_ease-out_infinite]">⚡</div>
                 )}
               </div>
             )}
          </div>

          {/* Right Node */}
          <div className="flex flex-col items-center gap-2 z-20">
            <div className="w-32 h-24 flex items-center justify-center rounded-[50%] border-4 border-yellow-500 bg-yellow-500/10 text-yellow-400 shadow-lg p-2 text-center">
              <span className="font-bold text-sm leading-tight">{data.rightNode.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Options Panel */}
      <div className="w-full max-w-3xl flex justify-center gap-4 flex-wrap">
        {data.options.map((opt: any) => {
          const isSelected = selectedId === opt.id;
          
          let btnClass = "px-6 py-4 rounded-2xl font-bold border-4 transition-all active:scale-95 text-sm md:text-base cursor-pointer ";
          
          if (isSelected) {
             if (status === 'correct' || status === 'showing_answer') btnClass += "border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]";
             else if (isError) btnClass += "border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]";
             else btnClass += "border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]";
          } else {
             btnClass += "border-neutral-700 bg-[#1A1A1A] text-neutral-400 hover:border-neutral-500 hover:text-white";
          }

          return (
            <button key={opt.id} onClick={() => handleSelect(opt.id)} className={btnClass}>
               {opt.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}
