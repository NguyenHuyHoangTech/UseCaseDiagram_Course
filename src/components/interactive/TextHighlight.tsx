import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function TextHighlight({ data, status, onComplete }: any) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'showing_answer') {
      setSelectedWords(data.correctIds ? data.correctIds : [data.correctId]);
    }
  }, [status, data]);

  // Parse text into tokens: "Some text [highlightable] more text"
  const parseText = (text: string) => {
    if (!text) return [];
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, idx) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const word = part.slice(1, -1);
        return { id: word, label: word, isHighlightable: true, key: idx };
      }
      return { id: `text_${idx}`, label: part, isHighlightable: false, key: idx };
    });
  };

  const tokens = parseText(data.text);

  const handleSelect = (wordId: string) => {
    if (status === 'correct' || status === 'showing_answer') return;
    
    if (data.correctIds) {
      // Multiple selection mode
      setSelectedWords(prev => 
        prev.includes(wordId) ? prev.filter(w => w !== wordId) : [...prev, wordId]
      );
    } else {
      // Single selection mode
      setSelectedWords([wordId]);
      onComplete({
        id: 'text_highlight',
        isCorrect: wordId === data.correctId,
        hasAttempted: true
      });
    }
  };

  const handleSubmit = () => {
    const isCorrect = selectedWords.length === data.correctIds.length && 
                      selectedWords.every(w => data.correctIds.includes(w));
    onComplete({
      id: 'text_highlight',
      isCorrect,
      hasAttempted: true
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-8 gap-8 px-4 animate-in fade-in zoom-in-95 duration-500">
       <div className="bg-[#1A1A1A] p-8 md:p-12 rounded-3xl border border-neutral-800 shadow-2xl leading-loose text-xl md:text-2xl text-neutral-300 font-medium text-center">
          {tokens.map((token) => {
            if (!token.isHighlightable) {
              return <span key={token.key}>{token.label}</span>;
            }

            const isSelected = selectedWords.includes(token.id);
            const isCorrectAnswer = data.correctIds ? data.correctIds.includes(token.id) : token.id === data.correctId;
            
            let btnClass = "inline-flex items-center mx-1 px-3 py-1 rounded-xl cursor-pointer font-bold border-b-4 transition-all active:translate-y-1 relative top-[2px] ";
            
            if (status === 'idle' || status === 'ready') {
              btnClass += isSelected ? "bg-yellow-500/20 text-yellow-400 border-yellow-500 shadow-md" : "bg-neutral-800 text-white border-neutral-600 hover:bg-neutral-700 hover:border-neutral-500 border-dashed";
            } else {
              if (isSelected && status === 'correct') btnClass += "bg-green-500/20 text-green-400 border-green-500 shadow-md";
              else if (isSelected && status === 'incorrect') btnClass += "bg-red-500/20 text-red-400 border-red-500 animate-pulse";
              else if (status === 'showing_answer' && isCorrectAnswer) btnClass += "bg-green-500/20 text-green-400 border-green-500 shadow-md";
              else btnClass += "bg-neutral-800 text-neutral-500 border-neutral-800 opacity-50 cursor-not-allowed";
            }

            return (
              <span 
                key={token.key} 
                onClick={() => handleSelect(token.id)} 
                className={btnClass}
              >
                {token.label}
                {isSelected && (status === 'correct' || status === 'showing_answer') && <CheckCircle2 size={24} className="ml-2 text-green-500" />}
                {isSelected && status === 'incorrect' && <AlertCircle size={24} className="ml-2 text-red-500" />}
              </span>
            );
          })}
       </div>
       
       {data.correctIds && (status === 'idle' || status === 'ready' || status === 'incorrect') && selectedWords.length > 0 && (
         <button 
            onClick={handleSubmit}
            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-full shadow-lg transition-transform active:scale-95"
         >
            KIỂM TRA
         </button>
       )}
    </div>
  );
}
