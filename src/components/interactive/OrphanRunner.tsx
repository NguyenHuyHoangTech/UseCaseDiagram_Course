import { useState, useEffect } from 'react';
import { Play, XCircle, CheckCircle2 } from 'lucide-react';

export default function OrphanRunner({ data, onComplete }: any) {
  const [runState, setRunState] = useState<'idle' | 'running' | 'completed'>('idle');

  useEffect(() => {
    setRunState('idle');
  }, [data]);

  const handleRun = () => {
    if (runState !== 'idle') return;
    setRunState('running');
    
    // Simulate packet traveling to the first node
    setTimeout(() => {
      setRunState('completed');
      setTimeout(() => {
         onComplete({ id: 'orphan_runner_result', isCorrect: true, hasAttempted: true });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 gap-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Visual Sandbox */}
      <div className="relative w-full max-w-4xl flex items-center justify-center min-h-[350px] bg-[#111] border-2 border-neutral-800 rounded-3xl overflow-hidden shadow-inner p-8">
         
         <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl relative gap-12 md:gap-0">
            
            <div className="flex items-center w-full md:w-2/3 relative justify-between">
              {/* Actor */}
              <div className="flex flex-col items-center z-20">
                <div className="w-16 h-16 bg-neutral-800 rounded-full border-2 border-neutral-600 flex items-center justify-center mb-2">
                   <span className="text-3xl">👤</span>
                </div>
                <span className="font-bold text-neutral-300">Quản trị viên</span>
              </div>

              {/* Path and Packet */}
              <div className="flex-1 h-32 relative flex items-center justify-center z-10 px-2">
                  <div className="absolute w-full flex items-center">
                     <div className="w-full h-1 border-b-4 border-solid border-neutral-500"></div>
                  </div>

                  {runState !== 'idle' && (
                     <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)] z-30 transition-all duration-[1.5s] ease-linear
                       ${runState === 'running' ? 'left-[100%]' : 'left-[100%] hidden'}
                     `}></div>
                  )}
              </div>

              {/* Valid Use Case */}
              <div className={`w-36 h-20 flex items-center justify-center rounded-[50%] border-4 shadow-lg text-center p-2 transition-all duration-500 z-20 relative
                ${runState === 'completed' ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-neutral-500 bg-[#1A1A1A] text-neutral-300'}
              `}>
                 <span className="font-bold text-sm leading-tight">Lên lịch sự kiện</span>
                 {runState === 'completed' && <CheckCircle2 className="absolute -top-4 -right-4 text-green-400 animate-bounce" size={24} />}
              </div>
            </div>

            {/* Orphaned Use Case */}
            <div className={`w-40 h-24 flex flex-col items-center justify-center rounded-[50%] border-4 shadow-lg text-center p-2 transition-all duration-500 z-20 relative ml-0 md:ml-12 mt-12 md:mt-0
              ${runState === 'completed' ? 'border-red-500 bg-[#222] text-red-500 animate-[shakeScreen_0.4s_ease-in-out]' : 'border-neutral-700 bg-[#1A1A1A] text-neutral-500'}
            `}>
               <span className="font-bold text-sm leading-tight line-through opacity-70">Gửi thông báo SMS</span>
               {runState === 'completed' && (
                 <div className="absolute -top-8 flex flex-col items-center animate-in zoom-in">
                    <XCircle className="text-red-500 mb-1" size={28} />
                    <span className="text-xs font-bold text-red-500 bg-red-500/20 px-2 py-1 rounded-full whitespace-nowrap">Không thể chạm tới!</span>
                 </div>
               )}
            </div>

         </div>

      </div>

      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={handleRun}
          disabled={runState !== 'idle'}
          className={`flex items-center gap-2 px-8 py-4 rounded-full font-black text-xl transition-all duration-300 shadow-xl
            ${runState === 'idle' 
              ? 'bg-blue-600 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] text-white' 
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
            }
          `}
        >
          {runState === 'idle' ? <><Play fill="currentColor" /> RUN SYSTEM</> : 
           runState === 'running' ? 'EXECUTING...' : 'COMPLETED'}
        </button>
      </div>

    </div>
  );
}
