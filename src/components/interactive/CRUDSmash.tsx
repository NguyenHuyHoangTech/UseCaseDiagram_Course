import { useState, useEffect } from 'react';
import { User, CheckCircle2 } from 'lucide-react';

export default function CRUDSmash({ data, onComplete }: any) {
  const [smashed, setSmashed] = useState<string[]>([]);
  const [animating, setAnimating] = useState<string | null>(null);

  const actorName = data?.actorName || 'Giảng viên';
  const targetLabel = data?.targetLabel || 'Quản lý Bộ bài';
  const nodes = data?.crudNodes || [
    { id: 'c', label: 'Thêm Bộ bài', color: 'border-green-500 text-green-400', pos: 'top-4 left-4' },
    { id: 'r', label: 'Xem Bộ bài', color: 'border-blue-500 text-blue-400', pos: 'top-4 right-4' },
    { id: 'u', label: 'Sửa Bộ bài', color: 'border-yellow-500 text-yellow-400', pos: 'top-32 left-4' },
    { id: 'd', label: 'Xóa Bộ bài', color: 'border-red-500 text-red-400', pos: 'top-32 right-4' },
  ];

  useEffect(() => {
    if (smashed.length === nodes.length) {
      setTimeout(() => {
        onComplete({ id: 'crud_smash_result', isCorrect: true });
      }, 500);
    }
  }, [smashed, nodes.length, onComplete]);

  const handleSmash = (id: string) => {
    if (smashed.includes(id) || animating) return;
    setAnimating(id);
    
    // Simulate animation duration
    setTimeout(() => {
      setSmashed(prev => [...prev, id]);
      setAnimating(null);
    }, 500);
  };

  // nodes defined above

  return (
    <div className="w-full flex flex-col items-center justify-center h-full relative p-4 min-h-[400px] select-none">
      
      {/* Central Actor */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <div className="w-16 h-16 bg-neutral-800 rounded-full border-2 border-neutral-600 flex items-center justify-center mb-2">
          <User size={32} className="text-neutral-300" />
        </div>
        <span className="font-bold text-neutral-300">{actorName}</span>
      </div>

      {/* Target Node (Bottom Center) */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 z-20 ${smashed.length === nodes.length ? 'scale-125' : 'opacity-40 scale-100'}`}>
        <div className={`px-6 py-4 rounded-full border-4 flex items-center justify-center transition-colors shadow-2xl ${smashed.length === nodes.length ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.4)]' : 'bg-[#222] border-neutral-600 text-neutral-500'}`}>
           <span className="font-black text-lg">{targetLabel}</span>
           {smashed.length === nodes.length && <CheckCircle2 className="ml-3 text-green-400" size={24} />}
        </div>
      </div>

      {/* Lines to CRUD nodes if not smashed */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {nodes.map((node: any) => {
          if (smashed.includes(node.id)) return null;
          const isLeft = node.pos.includes('left');
          const isTop = node.pos.includes('top-4');
          
          const x1 = '50%';
          const y1 = '30%';
          const x2 = isLeft ? '25%' : '75%';
          const y2 = isTop ? '20%' : '50%';
          
          return (
            <line key={`line-${node.id}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#444" strokeWidth="2" strokeDasharray="4,4" className={animating === node.id ? "opacity-0 transition-opacity" : ""} />
          );
        })}
        
        {/* Line to Target Node (only visible when smashed) */}
        {smashed.length === nodes.length && (
          <line x1="50%" y1="30%" x2="50%" y2="75%" stroke="#4ADE80" strokeWidth="4" strokeDasharray="8,8" className="animate-[dash_1s_linear_infinite]" />
        )}
      </svg>

      {/* CRUD Nodes */}
      {nodes.map((node: any) => {
        const isSmashed = smashed.includes(node.id);
        const isAnimating = animating === node.id;
        
        return (
          <button
            key={node.id}
            onClick={() => handleSmash(node.id)}
            disabled={isSmashed || animating !== null}
            className={`absolute px-4 py-3 rounded-full border-2 transition-all duration-500 z-30 shadow-lg font-bold
              ${isSmashed ? 'opacity-0 scale-50 top-[80%] left-1/2 -translate-x-1/2 pointer-events-none' : 
                isAnimating ? 'top-[80%] left-1/2 -translate-x-1/2 scale-50 opacity-0 bg-white border-white text-black' : 
                `${node.pos} bg-[#1A1A1A] ${node.color} hover:bg-[#333] hover:scale-110 active:scale-95`
              }
            `}
          >
            {node.label}
          </button>
        );
      })}

    </div>
  );
}
