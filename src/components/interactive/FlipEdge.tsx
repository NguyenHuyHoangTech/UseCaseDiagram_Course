import { useState, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function FlipEdge({ data, status, onComplete }: any) {
  const [direction, setDirection] = useState<'left-to-right' | 'right-to-left'>(data.initialDirection || 'left-to-right');

  useEffect(() => {
    setDirection(data.initialDirection || 'left-to-right');
  }, [data]);

  const handleFlip = () => {
    if (status === 'correct' || status === 'showing_answer') return;
    
    const newDir = direction === 'left-to-right' ? 'right-to-left' : 'left-to-right';
    setDirection(newDir);

    if (newDir === data.correctDirection) {
      setTimeout(() => {
        onComplete({ isCorrect: true, hasAttempted: true });
      }, 500);
    }
  };

  const isLeftToRight = direction === 'left-to-right';

  return (
    <div className="w-full flex flex-col items-center mt-6 animate-in fade-in zoom-in-95 duration-500 gap-8">
      
      <div className="text-neutral-400 mb-4 font-medium italic flex items-center gap-2">
        <ArrowLeftRight size={18} className="text-yellow-400" /> Chạm vào mũi tên để đảo chiều.
      </div>

      <div className="w-full max-w-4xl flex items-center justify-center p-8 min-h-[300px] bg-[#111] rounded-3xl border-2 border-neutral-800 shadow-inner">
        
        <div className="flex items-center justify-between w-full max-w-2xl relative">
          
          {/* Left Node */}
          <div className="w-40 md:w-56 h-24 flex items-center justify-center rounded-[50%] border-4 border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg text-center p-4 z-20">
             <span className="font-bold text-sm md:text-base leading-tight">{data.nodes[0].label}</span>
          </div>

          {/* The Flip Edge */}
          <div 
            onClick={handleFlip}
            className="flex-1 h-32 relative flex items-center justify-center z-10 px-2 cursor-pointer group"
          >
             {/* Hitbox */}
             <div className="absolute w-full h-16 top-1/2 -translate-y-1/2 z-20"></div>

             <div className={`w-full flex items-center justify-center relative transition-all duration-500
               ${(status === 'correct' || status === 'showing_answer') ? 'text-green-500' : 'text-yellow-500 group-hover:text-yellow-400 group-hover:scale-105'}
             `}>
                
                {/* Arrowhead Left */}
                <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-current absolute left-0 transition-opacity duration-300 ${!isLeftToRight ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* Dashed Line */}
                <div className="w-full h-0 border-t-4 border-dashed border-current mx-1"></div>
                
                {/* Arrowhead Right */}
                <div className={`w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-current absolute right-0 transition-opacity duration-300 ${isLeftToRight ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* Label */}
                <div className="absolute -top-8 px-3 py-1 bg-[#111] border border-current rounded text-current font-black text-xs tracking-widest transition-transform duration-500">
                   {data.edgeLabel || '<<extend>>'}
                </div>
             </div>

             {/* Hover indicator */}
             <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-neutral-500 flex items-center gap-1">
                <ArrowLeftRight size={14} /> Flip
             </div>
          </div>

          {/* Right Node */}
          <div className="w-40 md:w-56 h-24 flex items-center justify-center rounded-[50%] border-4 border-neutral-600 bg-[#1A1A1A] text-neutral-300 shadow-lg text-center p-4 z-20">
             <span className="font-bold text-sm md:text-base leading-tight">{data.nodes[1].label}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
