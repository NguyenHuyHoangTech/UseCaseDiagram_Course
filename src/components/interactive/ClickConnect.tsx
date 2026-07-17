import { useState, useEffect, useRef } from 'react';
import { User, Cog } from 'lucide-react';

export default function ClickConnect({ data, status, onComplete }: any) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [connections, setConnections] = useState<Array<{left: string, right: string}>>([]);
  const [errorConnection, setErrorConnection] = useState<{left: string, right: string} | null>(null);

  // For drawing lines
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number, y: number }>>({});

  const updatePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPos: Record<string, { x: number, y: number }> = {};
    
    // Left items
    data.left.forEach((item: any) => {
      const el = document.getElementById(`connect-left-${item.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        newPos[item.id] = {
          x: rect.right - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2
        };
      }
    });

    // Right items
    data.right.forEach((item: any) => {
      const el = document.getElementById(`connect-right-${item.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        newPos[item.id] = {
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top + rect.height / 2
        };
      }
    });

    setPositions(newPos);
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [data]);

  useEffect(() => {
    // When elements mount, we might need a slight delay to get exact positions if fonts load
    const t = setTimeout(updatePositions, 100);
    return () => clearTimeout(t);
  }, [data]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      // Check if this connection is correct
      const isCorrect = data.connections.some((c: any) => c.left === selectedLeft && c.right === selectedRight);
      
      if (isCorrect) {
        const newConns = [...connections, { left: selectedLeft, right: selectedRight }];
        setConnections(newConns);
        setSelectedLeft(null);
        setSelectedRight(null);
        
        // Check complete
        if (newConns.length === data.connections.length) {
          onComplete({ isCorrect: true, hasAttempted: true });
        } else {
          onComplete(null);
        }
      } else {
        // Wrong connection
        const badConn = { left: selectedLeft, right: selectedRight };
        setErrorConnection(badConn);
        setSelectedLeft(null);
        setSelectedRight(null);
        
        setTimeout(() => {
          setErrorConnection(null);
          onComplete(null);
        }, 1000);
        onComplete({ isCorrect: false, hasAttempted: true });
      }
    }
  }, [selectedLeft, selectedRight, connections, data.connections, onComplete]);

  const handleLeftClick = (id: string) => {
    if (status === 'correct' || status === 'showing_answer') return;
    if (connections.some(c => c.left === id)) return; // Already connected
    setSelectedLeft(selectedLeft === id ? null : id);
  };

  const handleRightClick = (id: string) => {
    if (status === 'correct' || status === 'showing_answer') return;
    if (connections.some(c => c.right === id)) return; // Already connected
    setSelectedRight(selectedRight === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="text-neutral-400 mb-8 font-medium italic">
        Chạm một đối tượng bên trái, sau đó chạm chức năng bên phải để nối cáp.
      </div>

      <div ref={containerRef} className="relative w-full max-w-3xl flex justify-between p-4 min-h-[300px]">
        
        {/* SVG for drawing lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#4ADE80" />
            </marker>
            <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
            </marker>
            <marker id="arrowhead-generalization-green" markerWidth="12" markerHeight="10" refX="11" refY="5" orient="auto">
              <polygon points="0 0, 12 5, 0 10" fill="transparent" stroke="#4ADE80" strokeWidth="2" />
            </marker>
            <marker id="arrowhead-generalization-red" markerWidth="12" markerHeight="10" refX="11" refY="5" orient="auto">
              <polygon points="0 0, 12 5, 0 10" fill="transparent" stroke="#EF4444" strokeWidth="2" />
            </marker>
          </defs>
          {/* Confirmed connections */}
          {connections.map((c, i) => {
            const p1 = positions[c.left];
            const p2 = positions[c.right];
            if (!p1 || !p2) return null;
            return (
              <g key={i}>
                <line 
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} 
                  stroke="#4ADE80" strokeWidth="6" strokeLinecap="round" 
                  strokeDasharray={(data.connectionType === 'include' || data.connectionType === 'extend') ? "10 10" : "none"}
                  markerEnd={data.connectionType === 'generalization' ? "url(#arrowhead-generalization-green)" : data.connectionType ? "url(#arrowhead-green)" : "none"}
                  className="animate-[drawLine_0.5s_ease-out_forwards] shadow-[0_0_10px_rgba(74,222,128,0.8)]" 
                />
                {(data.connectionType === 'include' || data.connectionType === 'extend') && (
                  <text x={(p1.x + p2.x)/2} y={(p1.y + p2.y)/2 - 15} fill="#4ADE80" fontSize="14" fontWeight="bold" textAnchor="middle">
                    &lt;&lt;{data.connectionType}&gt;&gt;
                  </text>
                )}
                <circle cx={p1.x} cy={p1.y} r="5" fill="#4ADE80" />
                <circle cx={p2.x} cy={p2.y} r="5" fill="#4ADE80" />
              </g>
            );
          })}
          
          {/* Error connection */}
          {errorConnection && positions[errorConnection.left] && positions[errorConnection.right] && (
            <g className="animate-[shakeScreen_0.2s_ease-in-out_infinite]">
              <line 
                x1={positions[errorConnection.left].x} 
                y1={positions[errorConnection.left].y} 
                x2={positions[errorConnection.right].x} 
                y2={positions[errorConnection.right].y} 
                stroke="#EF4444" 
                strokeWidth="6" 
                strokeDasharray={(data.connectionType === 'include' || data.connectionType === 'extend') ? "10 10" : "none"}
                strokeLinecap="round"
                markerEnd={data.connectionType === 'generalization' ? "url(#arrowhead-generalization-red)" : data.connectionType ? "url(#arrowhead-red)" : "none"}
              />
              {(data.connectionType === 'include' || data.connectionType === 'extend') && (
                <text x={(positions[errorConnection.left].x + positions[errorConnection.right].x)/2} y={(positions[errorConnection.left].y + positions[errorConnection.right].y)/2 - 15} fill="#EF4444" fontSize="14" fontWeight="bold" textAnchor="middle">
                  &lt;&lt;{data.connectionType}&gt;&gt;
                </text>
              )}
            </g>
          )}

          {/* Active drawing line (pseudo) */}
          {selectedLeft && positions[selectedLeft] && !selectedRight && (
            <circle cx={positions[selectedLeft].x} cy={positions[selectedLeft].y} r="8" fill="#3B82F6" className="animate-ping" />
          )}
          {selectedRight && positions[selectedRight] && !selectedLeft && (
            <circle cx={positions[selectedRight].x} cy={positions[selectedRight].y} r="8" fill="#3B82F6" className="animate-ping" />
          )}
        </svg>

        {/* Left Column (Actors) */}
        <div className="flex flex-col justify-around z-20 gap-12">
          {data.left.map((item: any) => {
            const isConnected = connections.some(c => c.left === item.id);
            const isSelected = selectedLeft === item.id;
            const isError = errorConnection?.left === item.id;
            
            return (
              <div 
                key={item.id}
                id={`connect-left-${item.id}`}
                onClick={() => handleLeftClick(item.id)}
                className={`flex flex-col items-center gap-2 cursor-pointer transition-all active:scale-95 w-24 md:w-32
                  ${isConnected ? 'opacity-50' : 'hover:scale-105'}
                `}
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl border-4 transition-colors shadow-lg
                  ${isConnected ? 'border-green-500 bg-green-500/10 text-green-400' : 
                    isError ? 'border-red-500 bg-red-500/10 text-red-500' :
                    isSelected ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 
                    'border-neutral-700 bg-[#1A1A1A] text-neutral-400 hover:border-neutral-500 hover:text-white'}
                `}>
                  {item.type === 'actor' ? <User size={32} /> : <Cog size={32} />}
                </div>
                <span className={`text-center font-bold text-sm ${isSelected ? 'text-blue-400' : 'text-neutral-300'}`}>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Right Column (Use Cases) */}
        <div className="flex flex-col justify-around z-20 gap-12">
          {data.right.map((item: any) => {
            const isConnected = connections.some(c => c.right === item.id);
            const isSelected = selectedRight === item.id;
            const isError = errorConnection?.right === item.id;
            
            return (
              <div 
                key={item.id}
                id={`connect-right-${item.id}`}
                onClick={() => handleRightClick(item.id)}
                className={`flex items-center justify-center cursor-pointer transition-all active:scale-95 w-40 md:w-56 h-24 rounded-[50%] border-4 shadow-lg text-center p-4
                  ${isConnected ? 'border-green-500 bg-green-500/10 text-green-400' : 
                    isError ? 'border-red-500 bg-red-500/10 text-red-500' :
                    isSelected ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 
                    'border-neutral-700 bg-[#1A1A1A] text-neutral-300 hover:border-neutral-500 hover:text-white'}
                  ${isConnected ? 'opacity-50' : 'hover:scale-105'}
                `}
              >
                <span className="font-bold text-sm md:text-base leading-tight">{item.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
