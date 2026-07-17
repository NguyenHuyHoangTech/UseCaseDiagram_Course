import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Ordering({ data, status, onComplete }: any) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [errorId, setErrorId] = useState<string | null>(null);

  // Shuffle options initially
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  useEffect(() => {
    // Basic shuffle based on ID to keep it deterministic if we want, or just random
    const shuffled = [...(data.options || [])].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setSelectedIds([]);
    setErrorId(null);
  }, [data]);

  useEffect(() => {
    if (status === 'showing_answer') {
      setSelectedIds(data.correctOrder || []);
    }
  }, [status, data]);

  const handleSelect = (id: string) => {
    if (status !== 'idle' && status !== 'ready' && status !== 'incorrect') return;
    if (selectedIds.includes(id)) return;

    const nextIndex = selectedIds.length;
    const expectedId = data.correctOrder[nextIndex];

    if (id === expectedId) {
      const newSelected = [...selectedIds, id];
      setSelectedIds(newSelected);
      
      if (newSelected.length === data.correctOrder.length) {
        onComplete({ isCorrect: true });
      } else {
        onComplete(null); // just to set ready/idle or clear previous errors
      }
    } else {
      // Wrong selection
      setErrorId(id);
      setTimeout(() => {
        setErrorId(null);
        setSelectedIds([]); // Reset on error as per "bắt làm lại"
        onComplete(null);
      }, 800);
      onComplete({ isCorrect: false });
    }
  };

  const handleRemove = (id: string) => {
    if (status === 'correct' || status === 'showing_answer') return;
    const newSelected = selectedIds.filter(item => item !== id);
    setSelectedIds(newSelected);
    onComplete(null);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 gap-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Selected Sequence Area */}
      <div className="w-full max-w-2xl flex flex-col gap-3 min-h-[200px] p-6 border-[3px] border-dashed border-neutral-700 rounded-3xl bg-[#111]">
        <h3 className="text-neutral-500 font-bold uppercase tracking-widest text-xs text-center mb-2">Thứ tự đúng</h3>
        
        {selectedIds.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-neutral-600 font-medium">
            Chạm vào các thẻ bên dưới để sắp xếp
          </div>
        )}

        {selectedIds.map((id, index) => {
          const opt = data.options.find((o: any) => o.id === id);
          return (
            <div 
              key={id}
              onClick={() => handleRemove(id)}
              className={`w-full p-4 rounded-xl border-2 font-bold text-lg cursor-pointer flex items-center gap-4 transition-all duration-300 shadow-md active:scale-95
                ${(status === 'correct' || status === 'showing_answer') ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-[#222] border-blue-500 text-blue-300'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${(status === 'correct' || status === 'showing_answer') ? 'bg-green-500 text-black' : 'bg-blue-500 text-black'}`}>
                {index + 1}
              </div>
              <span>{opt?.label}</span>
              {(status === 'correct' || status === 'showing_answer') && <CheckCircle2 className="ml-auto text-green-500" />}
            </div>
          );
        })}
      </div>

      {/* Available Options Area */}
      <div className="w-full max-w-2xl flex flex-col gap-3">
        {shuffledOptions.map((opt: any) => {
          const isSelected = selectedIds.includes(opt.id);
          const isError = errorId === opt.id;
          
          if (isSelected && !isError) return null; // Hide selected items (unless it's errored and we are showing it briefly)

          return (
            <div 
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`w-full p-4 rounded-xl border-2 font-bold text-lg cursor-pointer flex items-center gap-4 transition-all duration-300 shadow-md active:scale-95
                ${isError ? 'bg-red-500 text-white border-red-500 animate-[shakeScreen_0.3s_ease-in-out]' : 'bg-[#1A1A1A] border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:bg-[#222]'}`}
            >
              <div className="flex-1">{opt.label}</div>
              {isError && <AlertCircle className="text-white" />}
            </div>
          );
        })}
      </div>

    </div>
  );
}
