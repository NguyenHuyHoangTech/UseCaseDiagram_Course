import { useState, useEffect } from 'react';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SliderExploratory({ data, status, onComplete }: any) {
  const [sliderValue, setSliderValue] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    setSliderValue(0);
    setHasCompleted(false);
  }, [data]);

  const handleChange = (e: any) => {
    if (status === 'correct' || status === 'showing_answer') return;
    
    const val = parseInt(e.target.value);
    setSliderValue(val);

    // If reached the end
    if (val >= 90 && !hasCompleted) {
      setHasCompleted(true);
      onComplete({ isCorrect: true, hasAttempted: true });
    }
  };

  const isRequest = sliderValue > 5 && sliderValue <= 50;
  const isResponse = sliderValue > 50;

  return (
    <div className="w-full flex flex-col items-center mt-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Sandbox Visual Area */}
      <div className="w-full max-w-3xl flex items-center justify-center p-8 min-h-[300px] mb-8 bg-[#111] rounded-3xl border-2 border-neutral-800 shadow-inner relative overflow-hidden">
        
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="flex items-center justify-between w-full max-w-xl relative z-10">
          
          {/* Left Node (Actor) */}
          <div className="flex flex-col items-center gap-2 z-20">
            <div className={`w-24 h-24 flex items-center justify-center rounded-2xl border-4 transition-colors shadow-lg
              ${isResponse ? 'border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 
                isRequest ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-neutral-700 bg-[#1A1A1A] text-neutral-400'}
            `}>
              <User size={48} />
            </div>
            <span className="font-bold text-sm text-neutral-300">{data.leftNode?.label || 'Actor'}</span>
          </div>

          {/* Cable & Data Flow Area */}
          <div className="flex-1 h-32 relative flex items-center justify-center z-10 px-4">
             {/* The Association Line */}
             <div className="w-full h-1.5 bg-neutral-600 rounded-full"></div>
             
             {/* Data Packet (Request) */}
             {isRequest && (
               <div 
                 className="absolute top-1/2 -translate-y-1/2 flex items-center text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                 style={{ left: `${Math.min((sliderValue / 50) * 100, 100)}%`, transform: 'translate(-50%, -50%)' }}
               >
                 <span className="font-black text-xs mr-1">REQ</span>
                 <ArrowRight size={24} />
               </div>
             )}

             {/* Data Packet (Response) */}
             {isResponse && (
               <div 
                 className="absolute top-1/2 -translate-y-1/2 flex items-center text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                 style={{ right: `${Math.min(((sliderValue - 50) / 50) * 100, 100)}%`, transform: 'translate(50%, -50%)' }}
               >
                 <ArrowLeft size={24} />
                 <span className="font-black text-xs ml-1">RES</span>
               </div>
             )}
          </div>

          {/* Right Node (Use Case) */}
          <div className="flex flex-col items-center gap-2 z-20">
            <div className={`w-36 h-24 flex items-center justify-center rounded-[50%] border-4 transition-colors shadow-lg p-2 text-center
              ${isRequest ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 
                isResponse ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-neutral-700 bg-[#1A1A1A] text-neutral-400'}
            `}>
              <span className="font-bold text-sm leading-tight">{data.rightNode?.label || 'Use Case'}</span>
            </div>
          </div>
        </div>

        {/* State Indicators */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4">
           <div className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 transition-colors ${isRequest ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-neutral-800 text-neutral-600'}`}>
              Gửi Yêu Cầu (Request)
           </div>
           <div className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 transition-colors ${isResponse ? 'border-green-500 text-green-400 bg-green-500/10' : 'border-neutral-800 text-neutral-600'}`}>
              Trả Kết Quả (Response)
           </div>
        </div>
      </div>

      {/* The Slider Control */}
      <div className="w-full max-w-2xl px-8 flex flex-col gap-4">
         <div className="flex justify-between text-neutral-400 text-xs font-bold uppercase tracking-wider">
            <span>Actor</span>
            <span>Hệ Thống</span>
            <span>Actor</span>
         </div>
         <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderValue} 
            onChange={handleChange}
            className={`w-full h-4 bg-neutral-800 rounded-full outline-none appearance-none cursor-pointer transition-all border border-neutral-700
              ${isRequest ? 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' : ''}
              ${isResponse ? 'shadow-[0_0_15px_rgba(34,197,94,0.2)]' : ''}
              ${(status === 'correct' || status === 'showing_answer') ? 'pointer-events-none opacity-50' : ''}
            `}
            style={{
              background: `linear-gradient(to right, ${isResponse ? '#4ADE80' : isRequest ? '#3B82F6' : '#EAB308'} ${sliderValue}%, #262626 ${sliderValue}%)`
            }}
         />
      </div>

    </div>
  );
}
