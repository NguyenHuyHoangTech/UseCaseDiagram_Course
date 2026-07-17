import { useState, useEffect } from 'react';
import { Play, XCircle, AlertTriangle } from 'lucide-react';

export default function MapRunner({ data, onComplete }: any) {
  const [runState, setRunState] = useState<'idle' | 'running' | 'failed'>('idle');

  useEffect(() => {
    setRunState('idle');
  }, [data]);

  const handleRun = () => {
    if (runState !== 'idle') return;
    
    setRunState('running');

    // Simulate running the flow
    setTimeout(() => {
      setRunState('failed');
      setTimeout(() => {
        onComplete({ isCorrect: true, hasAttempted: true }); // It's a discovery sandbox, so we mark complete after they run it
      }, 2000);
    }, 1500); // Time for packet to travel
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 gap-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Visual Sandbox */}
      <div className="relative w-full max-w-4xl flex items-center justify-center min-h-[300px] bg-[#111] border-2 border-neutral-800 rounded-3xl overflow-hidden shadow-inner p-8">
         
         <div className="flex items-center justify-between w-full max-w-2xl relative">
            
            {/* Left Node (Base Case) */}
            <div className={`w-40 md:w-48 h-24 flex items-center justify-center rounded-[50%] border-4 shadow-lg text-center p-4 transition-all duration-500 z-20 relative
              ${runState === 'failed' ? 'border-red-500 bg-red-500/20 text-red-500 animate-[shakeScreen_0.4s_ease-in-out]' : 
                runState === 'running' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 
                'border-neutral-700 bg-[#1A1A1A] text-neutral-300'}
            `}>
               <span className="font-bold text-sm md:text-base leading-tight">{data.nodes[0].label}</span>
               {runState === 'failed' && (
                 <AlertTriangle className="absolute -top-6 text-red-500 animate-bounce" size={24} />
               )}
            </div>

            {/* Path and Packet */}
            <div className="flex-1 h-32 relative flex items-center justify-center z-10 px-4">
                {/* The dashed line with arrow */}
                <div className="absolute w-full flex items-center">
                   <div className="w-full h-1 border-b-4 border-dashed border-neutral-600"></div>
                   <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[12px] border-l-neutral-600 -ml-1"></div>
                </div>

                <div className="absolute -top-6 px-3 py-1 text-xs font-black tracking-widest text-neutral-400 bg-[#111]">
                   &lt;&lt;{data.connectionType}&gt;&gt;
                </div>

                {/* The traveling packet */}
                {runState !== 'idle' && (
                   <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)] z-30 transition-all duration-[1.5s] ease-linear
                     ${runState === 'running' ? 'left-[95%]' : 'left-[95%] hidden'}
                   `}></div>
                )}
            </div>

            {/* Right Node (Included Case) */}
            <div className={`w-40 md:w-48 h-24 flex items-center justify-center rounded-[50%] border-4 shadow-lg text-center p-4 transition-all duration-500 z-20 relative
              ${runState === 'failed' ? 'border-red-500 bg-red-500/20 text-red-500' : 
                'border-neutral-700 bg-[#1A1A1A] text-neutral-300'}
            `}>
               <span className="font-bold text-sm md:text-base leading-tight">{data.nodes[1].label}</span>
               
               {/* Explosion / Failure mark */}
               {runState === 'failed' && (
                 <div className="absolute inset-0 flex items-center justify-center bg-red-500/80 rounded-[50%] animate-in zoom-in-0 duration-300">
                    <XCircle className="text-white" size={48} />
                 </div>
               )}
            </div>

         </div>

      </div>

      {/* Control Panel */}
      <div className="flex flex-col items-center gap-4">
         <button 
           onClick={handleRun}
           disabled={runState !== 'idle'}
           className={`flex items-center gap-2 px-8 py-4 rounded-full font-black text-xl tracking-widest uppercase transition-all
             ${runState !== 'idle' ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed border-4 border-neutral-700' : 
               'bg-blue-600 hover:bg-blue-500 text-white border-4 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95'}
           `}
         >
           <Play size={24} fill="currentColor" />
           {runState === 'running' ? 'Running...' : runState === 'failed' ? 'System Failed' : 'RUN'}
         </button>
      </div>

    </div>
  );
}
