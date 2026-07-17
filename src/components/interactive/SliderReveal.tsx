import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export default function SliderReveal({ data, status, onComplete }: any) {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (sliderValue === 100) {
      onComplete({ id: 'slider_reveal', isCorrect: true, hasAttempted: true });
    } else {
      onComplete(null);
    }
  }, [sliderValue]);

  // Diagram logic similar to HighlightDiagram but no clickable items
  const systemNode = data.nodes?.find((n: any) => n.isSystem);
  const otherNodes = data.nodes?.filter((n: any) => !n.isSystem) || [];

  return (
    <div className="w-full flex flex-col items-center justify-center h-full relative px-2 py-0 gap-2 select-none animate-in fade-in zoom-in-95 duration-500">
       <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center mb-2 mt-0">
          
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             {otherNodes.map((_: any, i: number) => {
                const angle = (i * (2 * Math.PI)) / otherNodes.length;
                const radius = 38; // %
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                   <line key={i} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke="#444" strokeWidth="3" strokeDasharray="5,5" />
                );
             })}
          </svg>

          {/* System Boundary Box (opacity controlled by slider) */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-[6px] border-dashed border-blue-500 bg-blue-500/10 z-0 transition-opacity duration-300 pointer-events-none"
            style={{ width: '48%', height: '48%', opacity: sliderValue / 100 }}
          >
            {/* Label inside boundary */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-blue-400 font-black text-lg whitespace-nowrap bg-[#0a0a0a] px-4 py-1 rounded-full border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]" style={{ opacity: sliderValue / 100 }}>
               System Boundary
            </div>
          </div>

          {/* Central System Node */}
          {systemNode && (
             <div className="z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`w-32 h-32 rounded-3xl border-4 border-neutral-600 bg-[#222] flex flex-col items-center justify-center p-2 shadow-xl`}>
                   <span className="text-4xl mb-2">{systemNode.icon || '💻'}</span>
                   <span className="font-bold text-center leading-tight text-sm text-white">{systemNode.label}</span>
                </div>
             </div>
          )}

          {/* Other Nodes */}
          {otherNodes.map((node: any, i: number) => {
             const angle = (i * (2 * Math.PI)) / otherNodes.length;
             const radius = 38;
             const x = 50 + radius * Math.cos(angle);
             const y = 50 + radius * Math.sin(angle);
             
             return (
                <div key={node.id} className="z-10 absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                   <div className={`w-24 h-24 rounded-full border-4 border-neutral-700 bg-[#111] flex flex-col items-center justify-center p-1 shadow-lg`}>
                      <span className="text-3xl mb-1">{node.icon || '👤'}</span>
                      <span className="font-bold text-center text-[10px] leading-tight text-neutral-400">{node.label}</span>
                   </div>
                </div>
             );
          })}
       </div>

       {/* SLIDER CONTROL */}
       <div className={`w-full max-w-md bg-[#1A1A1A] p-4 rounded-3xl border-2 transition-colors shadow-2xl flex flex-col items-center gap-2 z-20 ${sliderValue === 100 ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-neutral-800'}`}>
          <label className="font-black text-white text-lg flex items-center gap-2 mb-1">
            <Shield className={sliderValue === 100 ? "text-green-500" : "text-blue-500"} size={28} /> 
            {sliderValue === 100 ? "Đã vẽ ranh giới!" : "Kéo để vẽ Ranh giới"}
          </label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            disabled={status !== 'idle' && status !== 'ready'}
            className="w-full h-4 bg-neutral-800 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
          />
       </div>
    </div>
  );
}
