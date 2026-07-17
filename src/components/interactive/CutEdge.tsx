import { useState, useEffect } from 'react';
import { User, Scissors } from 'lucide-react';

export default function CutEdge({ data, status, onComplete }: any) {
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [errorEdge, setErrorEdge] = useState<string | null>(null);

  useEffect(() => {
    setSelectedEdge(null);
    setErrorEdge(null);
  }, [data]);

  const handleEdgeClick = (edgeId: string) => {
    if (status === 'correct' || status === 'showing_answer') return;
    
    const edge = data.edges.find((e: any) => e.id === edgeId);
    if (!edge) return;

    if (edge.isCorrect) {
      setSelectedEdge(edgeId);
      onComplete({ isCorrect: true, hasAttempted: true });
    } else {
      setErrorEdge(edgeId);
      setTimeout(() => {
        setErrorEdge(null);
        onComplete(null);
      }, 1000);
      onComplete({ isCorrect: false, hasAttempted: true });
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="text-neutral-400 mb-8 font-medium italic flex items-center gap-2">
        <Scissors size={18} className="text-red-400" /> Chạm vào đường cáp nối sai quy tắc để cắt đứt nó.
      </div>

      <div className="w-full max-w-4xl flex items-center justify-center p-4 min-h-[300px]">
        
        {/* We assume a linear layout from left to right: Node1 -> Edge1 -> Node2 -> Edge2 -> Node3 */}
        <div className="flex items-center justify-center gap-2 md:gap-4 w-full">
          {data.nodes.map((node: any) => {
            const nextEdge = data.edges.find((e: any) => e.from === node.id);
            
            return (
              <div key={node.id} className="flex items-center">
                
                {/* Node */}
                <div className={`flex items-center justify-center shadow-lg border-4 transition-all p-4
                  ${node.type === 'actor' ? 'w-24 h-24 md:w-32 md:h-32 flex-col rounded-2xl' : 'w-32 h-24 md:w-48 md:h-32 rounded-[50%] text-center'}
                  border-neutral-600 bg-[#1A1A1A] text-neutral-300
                `}>
                  {node.type === 'actor' && <User size={40} className="mb-2" />}
                  <span className="font-bold text-sm md:text-base leading-tight">{node.label}</span>
                </div>

                {/* Next Edge */}
                {nextEdge && (
                  <div className="flex items-center justify-center relative w-16 md:w-24 group cursor-pointer" onClick={() => handleEdgeClick(nextEdge.id)}>
                    <div className="absolute w-full h-12 -translate-y-1/2 top-1/2 z-20"></div> {/* Hitbox */}
                    
                    {/* The Line */}
                    <div className={`transition-all duration-300 w-full relative z-10 flex items-center
                      ${selectedEdge === nextEdge.id ? 'opacity-0' : 'opacity-100'}
                    `}>
                      {(nextEdge.type === 'include' || nextEdge.type === 'extend') ? (
                         <div className={`w-full flex items-center ${errorEdge === nextEdge.id ? 'text-red-500' : 'text-blue-500 group-hover:text-red-400'}`}>
                            <div className="w-full h-0 border-t-4 border-dashed border-current"></div>
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-current -ml-1"></div>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black tracking-widest whitespace-nowrap bg-[#111] px-1 border-current">
                               &lt;&lt;{nextEdge.type}&gt;&gt;
                            </div>
                         </div>
                      ) : nextEdge.type === 'generalization' ? (
                         <div className={`w-full flex items-center ${errorEdge === nextEdge.id ? 'text-red-500' : 'text-blue-500 group-hover:text-red-400'}`}>
                            <div className="w-full h-1.5 bg-current"></div>
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-current relative -ml-1">
                               <div className="absolute top-1/2 -translate-y-1/2 -left-[14px] w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#111]"></div>
                            </div>
                         </div>
                      ) : (
                         <div className={`w-full h-1.5 rounded-full ${errorEdge === nextEdge.id ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-blue-500 group-hover:bg-red-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_15px_rgba(248,113,113,0.8)]'}`}></div>
                      )}
                      
                      {/* Break effect */}
                      {selectedEdge === nextEdge.id && (
                        <>
                           <div className="absolute left-0 top-0 w-[40%] h-1.5 bg-neutral-600 rotate-12 origin-left scale-y-50"></div>
                           <div className="absolute right-0 top-0 w-[40%] h-1.5 bg-neutral-600 -rotate-12 origin-right scale-y-50"></div>
                           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-red-500 text-2xl animate-[ping_0.5s_ease-out_forwards]">💥</div>
                        </>
                      )}
                    </div>

                    {/* Hover scissors icon */}
                    {selectedEdge !== nextEdge.id && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                         <Scissors size={24} className="text-red-400 -rotate-90 animate-pulse" />
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
