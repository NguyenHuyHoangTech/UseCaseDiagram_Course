import { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';

export default function EquationBuilder({ data, status, onComplete }: any) {
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([]);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedIds(Array(data.slots || 3).fill(null));
    setErrorIndex(null);
  }, [data]);

  useEffect(() => {
    if (status === 'showing_answer') {
      setSelectedIds(data.correctOrder || []);
      setErrorIndex(null);
    }
  }, [status, data]);

  const handleSelect = (id: string) => {
    if (status !== 'idle' && status !== 'ready' && status !== 'incorrect') return;
    if (selectedIds.includes(id)) return;

    const nextEmptyIndex = selectedIds.findIndex(s => s === null);
    if (nextEmptyIndex === -1) return;

    const newSelected = [...selectedIds];
    newSelected[nextEmptyIndex] = id;
    
    // Check if correct at this step
    if (id !== data.correctOrder[nextEmptyIndex]) {
       setErrorIndex(nextEmptyIndex);
       setTimeout(() => {
          setErrorIndex(null);
          const reverted = [...newSelected];
          reverted[nextEmptyIndex] = null;
          setSelectedIds(reverted);
          onComplete(null);
       }, 600);
       onComplete({ isCorrect: false, hasAttempted: true });
    } else {
       setSelectedIds(newSelected);
       
       if (nextEmptyIndex === data.slots - 1) {
          onComplete({ isCorrect: true, hasAttempted: true });
       } else {
          onComplete(null);
       }
    }
  };

  const handleRemove = (index: number) => {
    if (status === 'correct' || status === 'showing_answer') return;
    
    // Can only remove the last added item to keep sequence strict, or any item and shift left.
    // Let's just allow removing the last item for simplicity.
    const lastFilledIndex = selectedIds.findLastIndex(s => s !== null);
    if (index !== lastFilledIndex) return;

    const newSelected = [...selectedIds];
    newSelected[index] = null;
    setSelectedIds(newSelected);
    onComplete(null);
  };

  const isCompleteSuccess = (status === 'correct' || status === 'showing_answer');

  return (
    <div className="w-full flex flex-col items-center mt-6 gap-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Equation Area */}
      <div className={`w-full max-w-4xl flex items-center justify-center gap-1 md:gap-3 min-h-[160px] p-6 rounded-3xl border-4 transition-all duration-500
        ${isCompleteSuccess ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_30px_rgba(250,204,21,0.3)]' : 'border-neutral-800 bg-[#111]'}
      `}>
         {selectedIds.map((id, index) => {
            const opt = data.options.find((o: any) => o.id === id);
            const isError = errorIndex === index;

            return (
               <div key={index} className="flex items-center gap-1 md:gap-3">
                  {/* The Slot / Block */}
                  <div 
                    onClick={() => id ? handleRemove(index) : null}
                    className={`h-16 md:h-24 flex items-center justify-center px-4 md:px-6 rounded-xl md:rounded-2xl border-4 transition-all duration-300 font-bold text-sm md:text-base text-center
                      ${!id ? 'w-24 md:w-32 border-dashed border-neutral-700 text-neutral-600 bg-transparent' : 
                        isError ? 'w-auto border-red-500 bg-red-500 text-white animate-[shakeScreen_0.2s_ease-in-out_infinite]' : 
                        isCompleteSuccess ? 'w-auto border-yellow-400 bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]' :
                        opt.type === 'operator' ? 'w-auto border-blue-500 bg-blue-500/20 text-blue-400' :
                        'w-auto border-neutral-500 bg-neutral-200 text-neutral-900 cursor-pointer hover:bg-red-400 hover:text-white hover:border-red-500'}
                    `}
                  >
                     {id ? opt?.label : '?'}
                     {isError && <AlertCircle className="ml-2 w-4 h-4 md:w-6 md:h-6" />}
                  </div>

                  {/* Lightning connector if complete, or arrow if not last slot */}
                  {index < data.slots - 1 && (
                     <div className="flex items-center justify-center w-6 md:w-10">
                        {isCompleteSuccess ? (
                           <div className="text-yellow-400 animate-pulse text-2xl md:text-3xl font-black">⚡</div>
                        ) : (
                           <ArrowRight className="text-neutral-700 w-5 h-5 md:w-8 md:h-8" />
                        )}
                     </div>
                  )}
               </div>
            );
         })}
      </div>

      {/* Available Options Area */}
      <div className="w-full max-w-3xl flex justify-center gap-4 flex-wrap">
        {data.options.map((opt: any) => {
          const isSelected = selectedIds.includes(opt.id);
          if (isSelected) return null;

          return (
            <div 
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`px-6 py-4 rounded-xl border-[3px] font-bold text-sm md:text-base cursor-pointer flex items-center transition-all duration-300 shadow-md active:scale-95 hover:-translate-y-1
                ${opt.type === 'operator' ? 'border-blue-500/50 bg-blue-500/10 text-blue-400 hover:border-blue-400' : 'border-neutral-600 bg-[#1A1A1A] text-neutral-300 hover:border-neutral-400'}
              `}
            >
              {opt.label}
            </div>
          );
        })}
      </div>

    </div>
  );
}
