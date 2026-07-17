import { useState, useEffect } from 'react';
import { AlertTriangle, Server } from 'lucide-react';

export default function SliderExtend({ data, status, onComplete }: any) {
  const [load, setLoad] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    setLoad(0);
    setHasTriggered(false);
  }, [data]);

  const handleChange = (e: any) => {
    if (status === 'correct' || status === 'showing_answer') return;
    
    const val = parseInt(e.target.value);
    setLoad(val);

    if (val >= 80 && !hasTriggered) {
      setHasTriggered(true);
      setTimeout(() => {
        onComplete({ isCorrect: true, hasAttempted: true });
      }, 1500);
    }
  };

  const isOverload = load >= 80;

  return (
    <div className="w-full flex flex-col items-center mt-6 animate-in fade-in zoom-in-95 duration-500 gap-8">
      
      {/* Sandbox Visual Area */}
      <div className="w-full max-w-3xl flex flex-col items-center justify-center p-8 min-h-[350px] bg-[#111] rounded-3xl border-2 border-neutral-800 shadow-inner relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {/* Cảnh báo nhấp nháy khi Overload */}
        {isOverload && (
          <div className="absolute inset-0 bg-red-500/10 animate-[pulse_0.5s_ease-in-out_infinite] z-0"></div>
        )}

        <div className="flex flex-col items-center justify-center gap-6 relative z-10 w-full">
           
           {/* Khối Ngoại Lệ (Extend) */}
           <div className={`w-56 h-24 flex items-center justify-center rounded-[50%] border-4 shadow-lg text-center p-4 transition-all duration-700
             ${isOverload ? 'border-red-500 bg-red-500/20 text-red-500 opacity-100 scale-100' : 'border-neutral-700 bg-transparent text-neutral-600 opacity-30 scale-90'}
           `}>
              <span className="font-bold text-base leading-tight">{data.extendNode?.label || 'Hiển thị Lỗi Server'}</span>
              {isOverload && <AlertTriangle className="absolute -top-6 text-red-500 animate-bounce" size={24} />}
           </div>

           {/* Cáp nối <<extend>> (Từ trên cắm xuống) */}
           <div className="h-16 w-full flex flex-col items-center justify-center relative">
              <div className={`w-0 h-full border-l-4 transition-all duration-500 ${isOverload ? 'border-red-500 border-dashed' : 'border-neutral-800'}`}></div>
              
              {isOverload && (
                 <>
                   {/* Arrowhead pointing down */}
                   <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-red-500 absolute bottom-0 translate-y-1/2"></div>
                   
                   {/* Label */}
                   <div className="absolute top-1/2 -translate-y-1/2 ml-24 px-2 py-1 bg-[#111] border border-red-500 rounded text-red-500 font-black text-xs tracking-widest animate-in fade-in slide-in-from-top-2">
                     &lt;&lt;extend&gt;&gt;
                   </div>
                 </>
              )}
           </div>

           {/* Khối Gốc (Base Case) */}
           <div className="w-56 h-24 flex items-center justify-center rounded-[50%] border-4 border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] text-center p-4">
              <span className="font-bold text-base leading-tight">{data.baseNode?.label || 'Checkout'}</span>
           </div>

        </div>
      </div>

      {/* The Slider Control */}
      <div className="w-full max-w-2xl px-8 flex flex-col gap-4">
         <div className="flex justify-between items-center text-neutral-400 text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2"><Server size={16}/> Tải nhẹ (Load 0%)</div>
            <div className={`flex items-center gap-2 transition-colors ${isOverload ? 'text-red-500' : ''}`}>Quá Tải (Load &gt; 80%) <AlertTriangle size={16}/></div>
         </div>
         
         <div className="relative">
            <input 
               type="range" 
               min="0" 
               max="100" 
               value={load} 
               onChange={handleChange}
               className={`w-full h-6 bg-neutral-800 rounded-full outline-none appearance-none cursor-pointer transition-all border-2
                 ${isOverload ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'border-neutral-700'}
                 ${(status === 'correct' || status === 'showing_answer') ? 'pointer-events-none opacity-50' : ''}
               `}
               style={{
                 background: `linear-gradient(to right, ${isOverload ? '#EF4444' : '#EAB308'} ${load}%, #262626 ${load}%)`
               }}
            />
            {/* The 80% Threshold Mark */}
            <div className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 left-[80%] rounded-full shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
         </div>
      </div>

    </div>
  );
}
