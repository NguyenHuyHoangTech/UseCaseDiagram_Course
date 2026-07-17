import { useState } from 'react';
import { Play, User, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Edge {
  id: string;
  from: string;
  to: string;
  type: 'association' | 'include' | 'extend';
}

const NODES = [
  // Left Actors
  { id: 'cam', label: 'Camera AI', type: 'actor', col: 0, row: 0 },
  { id: 'cu', label: 'Cư dân', type: 'actor', col: 0, row: 1 },
  { id: 'bql', label: 'Ban quản lý', type: 'actor', col: 0, row: 3 },
  
  // Middle Use Cases
  { id: 'nd', label: 'Nhận diện biển số', type: 'usecase', col: 1, row: 0 },
  { id: 'xt', label: 'Xác thực thẻ xe', type: 'usecase', col: 1, row: 1 },
  { id: 'lt', label: 'Lưu trữ thông tin', type: 'usecase', col: 1.5, row: 1 },
  { id: 'cb', label: 'Gửi cảnh báo', type: 'usecase', col: 1, row: 2 },
  { id: 'ql', label: 'Quản lý thẻ xe', type: 'usecase', col: 1, row: 3 },
  
  // Right Actors
  { id: 'db', label: 'Database Server', type: 'actor', col: 2, row: 1 },
  { id: 'bv', label: 'Bảo vệ', type: 'actor', col: 2, row: 2 },
];

const CORRECT_EDGES = [
  { from: 'cam', to: 'nd', type: 'association' },
  { from: 'cu', to: 'xt', type: 'association' },
  { from: 'bql', to: 'ql', type: 'association' },
  { from: 'xt', to: 'lt', type: 'include' },
  { from: 'cb', to: 'xt', type: 'extend' },
  { from: 'lt', to: 'db', type: 'association' },
  { from: 'cb', to: 'bv', type: 'association' }
];

export default function FinalSandbox({ onComplete }: any) {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [pendingEdge, setPendingEdge] = useState<{from: string, to: string} | null>(null);
  const [runState, setRunState] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    if (runState !== 'idle') return;
    if (pendingEdge) return;

    if (!selectedNode) {
      setSelectedNode(id);
    } else {
      if (selectedNode === id) {
        setSelectedNode(null); // deselect
      } else {
        // Create pending edge
        const existing = edges.find(e => (e.from === selectedNode && e.to === id) || (e.from === id && e.to === selectedNode));
        if (existing) {
          // Remove existing edge
          setEdges(prev => prev.filter(e => e.id !== existing.id));
          setSelectedNode(null);
        } else {
          setPendingEdge({ from: selectedNode, to: id });
          setSelectedNode(null);
        }
      }
    }
  };

  const confirmEdge = (type: 'association' | 'include' | 'extend') => {
    if (pendingEdge) {
      setEdges([...edges, { id: `${pendingEdge.from}-${pendingEdge.to}`, from: pendingEdge.from, to: pendingEdge.to, type }]);
      setPendingEdge(null);
    }
  };

  const handleRun = () => {
    if (runState !== 'idle') return;
    setRunState('running');
    setErrorMsg(null);

    setTimeout(() => {
      // Validate edges
      let isCorrect = true;
      let msg = null;

      if (edges.length !== CORRECT_EDGES.length) {
        isCorrect = false;
        msg = "Số lượng liên kết chưa đủ hoặc bị dư thừa!";
      } else {
        for (const ce of CORRECT_EDGES) {
          const found = edges.find(e => e.from === ce.from && e.to === ce.to && e.type === ce.type);
          const reverseFound = edges.find(e => e.from === ce.to && e.to === ce.from && e.type === ce.type);
          
          if (!found && !reverseFound) {
            isCorrect = false;
            msg = "Thiếu hoặc sai hướng/loại liên kết (Ví dụ: Extend phải đâm ngược lại).";
            break;
          }
          if (ce.type !== 'association' && reverseFound && !found) {
            isCorrect = false;
            msg = "Mũi tên Include/Extend đang bị ngược chiều!";
            break;
          }
        }
      }

      if (isCorrect) {
        setRunState('success');
        setTimeout(() => {
          onComplete({ id: 'final_sandbox', isCorrect: true, hasAttempted: true });
        }, 3000);
      } else {
        setRunState('failed');
        setErrorMsg(msg);
        setTimeout(() => {
          setRunState('idle');
          setErrorMsg(null);
        }, 3000);
      }
    }, 1500);
  };

  const getNodePos = (col: number, row: number) => {
    // Basic CSS grid mapping
    const startX = 10;
    const startY = 10;
    const colWidth = 35; // %
    const rowHeight = 22; // %
    return {
      left: `${startX + col * colWidth}%`,
      top: `${startY + row * rowHeight}%`
    };
  };

  return (
    <div className="w-full flex flex-col items-center mt-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="text-neutral-400 font-medium italic mb-2">
        Click vào 2 khối để tạo liên kết. Click lại vào liên kết để xóa.
      </div>

      {/* Canvas */}
      <div className="relative w-full max-w-5xl h-[500px] md:h-[600px] bg-[#0A0A0A] border-2 border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-4">
        
        {/* SVG for Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker id="arrow-include" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6" />
            </marker>
            <marker id="arrow-extend" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#F97316" />
            </marker>
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {edges.map(edge => {
            const n1 = NODES.find(n => n.id === edge.from);
            const n2 = NODES.find(n => n.id === edge.to);
            if (!n1 || !n2) return null;

            const x1 = 10 + n1.col * 35 + 8; // +8 for center offset approx
            const y1 = 10 + n1.row * 22 + 8;
            const x2 = 10 + n2.col * 35 + 8;
            const y2 = 10 + n2.row * 22 + 8;
            
            const isAnimating = runState === 'running' || runState === 'success';
            const isError = runState === 'failed';

            let strokeColor = edge.type === 'extend' ? '#F97316' : edge.type === 'include' ? '#3B82F6' : '#525252';
            if (isError) strokeColor = '#EF4444';
            if (runState === 'success') strokeColor = '#22C55E';

            return (
              <g key={edge.id} filter={isAnimating ? 'url(#glow)' : ''}>
                <line 
                  x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                  stroke={strokeColor} 
                  strokeWidth={isAnimating ? "3" : "2"}
                  strokeDasharray={edge.type !== 'association' ? "8,6" : "none"}
                  markerEnd={edge.type === 'extend' ? "url(#arrow-extend)" : edge.type === 'include' ? "url(#arrow-include)" : "none"}
                  className={isAnimating ? "animate-[dash_1s_linear_infinite]" : ""}
                />
                {edge.type !== 'association' && (
                  <text 
                    x={`${(x1 + x2) / 2}%`} y={`${(y1 + y2) / 2 - 2}%`} 
                    fill={strokeColor} 
                    fontSize="10" 
                    fontWeight="bold"
                    textAnchor="middle"
                    className="bg-black px-1"
                  >
                    &lt;&lt;{edge.type}&gt;&gt;
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map(node => {
          const isSelected = selectedNode === node.id;
          const pos = getNodePos(node.col, node.row);
          
          return (
            <div 
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className={`absolute w-24 h-24 md:w-32 md:h-24 flex items-center justify-center p-2 text-center cursor-pointer transition-all z-20 shadow-lg border-4
                ${node.type === 'actor' ? 'rounded-xl flex-col' : 'rounded-[50%]'}
                ${isSelected ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400 scale-110 shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 
                  runState === 'success' ? 'border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]' :
                  runState === 'failed' ? 'border-red-500 bg-red-500/20 text-red-500 animate-[shakeScreen_0.4s_ease-in-out]' :
                  'border-neutral-700 bg-[#1A1A1A] text-neutral-300 hover:border-neutral-500 hover:bg-[#222]'
                }
              `}
              style={{ left: pos.left, top: pos.top }}
            >
              {node.type === 'actor' && <User size={24} className="mb-1" />}
              <span className="font-bold text-xs md:text-sm leading-tight">{node.label}</span>
            </div>
          );
        })}

        {/* System Boundary Box (Visual only) */}
        <div className="absolute left-[30%] top-[5%] w-[45%] h-[85%] border-2 border-dashed border-neutral-700 rounded-3xl z-0 flex items-start justify-center pt-2 text-neutral-600 font-black tracking-widest pointer-events-none">
          SYSTEM BOUNDARY
        </div>

      </div>

      {/* Pending Edge Popup */}
      {pendingEdge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111] border border-neutral-800 p-8 rounded-3xl flex flex-col items-center gap-6 shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white">Chọn loại Liên kết</h3>
            <div className="w-full text-center text-neutral-400 mb-4">
              Từ: <span className="font-bold text-white">{NODES.find(n => n.id === pendingEdge.from)?.label}</span><br/>
              Đến: <span className="font-bold text-white">{NODES.find(n => n.id === pendingEdge.to)?.label}</span>
            </div>
            
            <button onClick={() => confirmEdge('association')} className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-white transition-colors border border-neutral-700">
              Association (Đường thẳng)
            </button>
            <button onClick={() => confirmEdge('include')} className="w-full py-4 bg-blue-900/40 hover:bg-blue-800/60 rounded-xl font-bold text-blue-400 transition-colors border border-blue-800">
              &lt;&lt;include&gt;&gt; (Nét đứt)
            </button>
            <button onClick={() => confirmEdge('extend')} className="w-full py-4 bg-orange-900/40 hover:bg-orange-800/60 rounded-xl font-bold text-orange-400 transition-colors border border-orange-800">
              &lt;&lt;extend&gt;&gt; (Nét đứt)
            </button>
            
            <button onClick={() => setPendingEdge(null)} className="mt-4 text-neutral-500 hover:text-white font-bold">HỦY BỎ</button>
          </div>
        </div>
      )}

      {/* Run Button & Error Message */}
      <div className="flex flex-col items-center gap-4 mt-4 h-24">
        {errorMsg && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-6 py-2 rounded-full font-bold animate-in slide-in-from-bottom-2">
            <AlertTriangle size={20} /> {errorMsg}
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setEdges([]); setSelectedNode(null); setRunState('idle'); }}
            className="p-4 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-all shadow-lg"
            title="Làm mới"
          >
            <RefreshCw size={24} />
          </button>

          <button 
            onClick={handleRun}
            disabled={runState !== 'idle'}
            className={`flex items-center gap-2 px-12 py-4 rounded-full font-black text-xl tracking-widest uppercase transition-all
              ${runState !== 'idle' ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed border-4 border-neutral-700' : 
                'bg-blue-600 hover:bg-blue-500 text-white border-4 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95'}
            `}
          >
            {runState === 'success' ? <CheckCircle2 size={24} /> : <Play size={24} fill="currentColor" />}
            {runState === 'running' ? 'COMPILING...' : runState === 'success' ? 'SUCCESS' : 'RUN'}
          </button>
        </div>
      </div>

    </div>
  );
}
