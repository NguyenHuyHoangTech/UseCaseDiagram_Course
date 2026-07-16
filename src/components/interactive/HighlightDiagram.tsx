import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function HighlightDiagramInteractive({ data, status, onComplete }: any) {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  useEffect(() => {
    if (!data?.nodes) return;
    
    // We update onComplete whenever selection changes so LessonPlayer knows we are "ready" to check
    // We consider it "ready" if at least one node is selected
    if (selectedNodes.length > 0) {
      const correctIds = data.nodes.filter((n: any) => n.isCorrect).map((n: any) => n.id);
      
      const isCorrect = selectedNodes.length === correctIds.length && 
                        selectedNodes.every(id => correctIds.includes(id));
      
      onComplete({
        id: 'highlight_diagram_result',
        isCorrect: isCorrect,
        hint: isCorrect ? '' : data.hint || 'Bạn chưa chọn đúng tất cả các Actor. Hãy nhìn kỹ những gì nằm bên ngoài Hệ thống nhé!'
      });
    } else {
      onComplete(null);
    }
  }, [selectedNodes, data]);

  // Reset state when data changes
  useEffect(() => {
    setSelectedNodes([]);
  }, [data]);

  const handleToggle = (nodeId: string) => {
    if (status === 'correct' || status === 'showing_answer') return;
    
    setSelectedNodes(prev => {
      if (prev.includes(nodeId)) return prev.filter(id => id !== nodeId);
      return [...prev, nodeId];
    });
  };

  if (!data?.nodes) return null;

  const getNodeClass = (node: any) => {
    const isSelected = selectedNodes.includes(node.id);
    
    if (status === 'correct' || status === 'showing_answer') {
      const isCorrectNode = node.isCorrect;
      if (status === 'showing_answer') {
        return isCorrectNode ? 'border-green-500 bg-green-500/20 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'border-neutral-700 bg-[#222] opacity-50';
      }
      return isSelected && isCorrectNode ? 'border-green-500 bg-green-500/20 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'border-neutral-700 bg-[#222] opacity-50';
    }
    
    if (status === 'incorrect' || status === 'skill_check_incorrect') {
      if (isSelected) {
         if (node.isCorrect) return 'border-green-500 bg-green-500/20 text-white';
         return 'border-red-500 bg-red-500/20 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse';
      }
      return 'border-neutral-700 bg-[#222]';
    }

    if (isSelected) return 'border-yellow-500 bg-yellow-500/20 text-white shadow-[0_0_20px_rgba(234,179,8,0.4)]';
    return 'border-neutral-600 bg-[#222] hover:bg-[#333] hover:border-neutral-400 text-neutral-200';
  };

  // We simulate a diagram layout using flex and absolute positioning for simplicity
  // Assuming 1 central system node, and others are external
  
  const systemNode = data.nodes.find((n: any) => n.isSystem);
  const otherNodes = data.nodes.filter((n: any) => !n.isSystem);

  return (
    <div className="w-full flex flex-col items-center justify-center h-full relative p-4 gap-6 select-none animate-in fade-in zoom-in-95 duration-500">
       <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
          
          {/* SVG Connections (simplified star topology) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             {otherNodes.map((_: any, i: number) => {
                const angle = (i * (2 * Math.PI)) / otherNodes.length;
                const radius = 35; // %
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                   <line key={i} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke="#444" strokeWidth="3" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
                );
             })}
          </svg>

          {/* Central System Node */}
          {systemNode && (
             <div className="z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <button 
                  onClick={() => handleToggle(systemNode.id)}
                  className={`w-32 h-32 rounded-3xl border-4 flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${getNodeClass(systemNode)}`}
                >
                   <span className="text-3xl mb-1">{systemNode.icon || '💻'}</span>
                   <span className="font-bold text-center leading-tight">{systemNode.label}</span>
                </button>
             </div>
          )}

          {/* External Nodes (Orbiting) */}
          {otherNodes.map((node: any, i: number) => {
             const angle = (i * (2 * Math.PI)) / otherNodes.length;
             // calculate percentage position
             const radiusX = 40;
             const radiusY = 40;
             const x = 50 + radiusX * Math.cos(angle);
             const y = 50 + radiusY * Math.sin(angle);
             
             return (
                <div key={node.id} className="z-10 absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                   <button 
                     onClick={() => handleToggle(node.id)}
                     className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${getNodeClass(node)}`}
                   >
                      <span className="text-3xl mb-1">{node.icon || '👤'}</span>
                      <span className="font-bold text-sm text-center leading-tight">{node.label}</span>
                      
                      {(status === 'correct' || status === 'showing_answer') && node.isCorrect && selectedNodes.includes(node.id) && (
                         <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"><CheckCircle2 size={16} /></div>
                      )}
                   </button>
                </div>
             );
          })}
       </div>
    </div>
  );
}
