import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, GripVertical } from 'lucide-react';

export interface DnDItem {
  id: string;
  label: string;
  correctZone: 'inside' | 'outside';
  mapType?: 'actor' | 'component' | 'useCase';
}

interface GridDnDMapProps {
  items: DnDItem[];
  systemName: string;
  status: 'idle' | 'ready' | 'running' | 'correct' | 'incorrect' | 'showing_answer' | 'skill_check_transition' | 'skill_check' | 'skill_check_incorrect';
  onStateChange: (state: { allDragged: boolean; allCorrect: boolean }) => void;
}

export default function GridDnDMap({ items, systemName, status, onStateChange }: GridDnDMapProps) {
  const [itemPositions, setItemPositions] = useState<Record<string, 'tray' | 'inside' | 'outside'>>(() => {
    const initial: Record<string, 'tray' | 'inside' | 'outside'> = {};
    items.forEach(item => initial[item.id] = 'tray');
    return initial;
  });

  // Reset when items change (e.g. new level)
  useEffect(() => {
    const initial: Record<string, 'tray' | 'inside' | 'outside'> = {};
    items.forEach(item => initial[item.id] = 'tray');
    setItemPositions(initial);
  }, [items]);

  useEffect(() => {
    let allDragged = true;
    let allCorrect = true;

    items.forEach(item => {
      const pos = itemPositions[item.id] || 'tray';
      if (pos === 'tray') allDragged = false;
      if (pos !== item.correctZone) allCorrect = false;
    });

    onStateChange({ allDragged, allCorrect });
  }, [itemPositions, items]);

  // Auto-move items to their correct zones when "Show Answer" is triggered
  useEffect(() => {
    if (status === 'showing_answer') {
      const correctPositions: Record<string, 'tray' | 'inside' | 'outside'> = {};
      items.forEach(item => {
        correctPositions[item.id] = item.correctZone;
      });
      setItemPositions(correctPositions);
    }
  }, [status, items]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    if (status === 'correct' || status === 'showing_answer') return;
    e.dataTransfer.setData('itemId', id);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDrop = (e: React.DragEvent, zone: 'tray' | 'inside' | 'outside') => {
    e.preventDefault();
    e.stopPropagation();
    if (status === 'correct' || status === 'showing_answer') return;
    
    const itemId = e.dataTransfer.getData('itemId');
    if (!itemId) return;

    setItemPositions(prev => ({ ...prev, [itemId]: zone }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const renderItem = (item: DnDItem, currentZone: string) => {
    const isFailed = (status === 'incorrect' || status === 'skill_check_incorrect') && itemPositions[item.id] !== item.correctZone && currentZone !== 'tray';
    const isCorrect = (status === 'correct' || status === 'showing_answer') && itemPositions[item.id] === item.correctZone && currentZone !== 'tray';
    
    let icon = null;
    if (item.mapType === 'actor') icon = '👤';
    else if (item.mapType === 'useCase') icon = '🟢';
    else icon = '⚙️';

    return (
      <div
        key={item.id}
        draggable={status !== 'correct' && status !== 'showing_answer'}
        onDragStart={(e) => handleDragStart(e, item.id)}
        onDragEnd={handleDragEnd}
        className={`flex items-center gap-3 p-3 mb-3 rounded-xl border-2 cursor-grab active:cursor-grabbing transition-all bg-[#222] shadow-md
          ${isFailed ? 'border-red-500 bg-red-950/30' : (isCorrect ? 'border-green-500 bg-green-950/30' : 'border-neutral-700 hover:border-neutral-500')}
        `}
      >
        <GripVertical size={16} className="text-neutral-500 shrink-0" />
        <div className="w-8 h-8 flex items-center justify-center bg-black rounded-lg text-lg border border-neutral-700 shrink-0 shadow-inner">
          {icon}
        </div>
        <span className="font-bold text-sm text-neutral-200 leading-tight">{item.label}</span>
        
        {isFailed && <AlertCircle size={18} className="text-red-500 ml-auto shrink-0" />}
        {isCorrect && <CheckCircle2 size={18} className="text-green-500 ml-auto shrink-0" />}
      </div>
    );
  };

  const trayItems = items.filter(item => itemPositions[item.id] === 'tray');
  const insideItems = items.filter(item => itemPositions[item.id] === 'inside');
  const outsideItems = items.filter(item => itemPositions[item.id] === 'outside');

  return (
    <div className="w-full h-[550px] shrink-0 flex overflow-hidden rounded-3xl border-4 border-neutral-800 bg-[#0a0a0a] shadow-2xl relative">
      
      {/* TRAY */}
      <div 
        className="w-[280px] bg-[#111] border-r border-neutral-800 flex flex-col z-10 shrink-0 shadow-2xl"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'tray')}
      >
        <div className="p-4 border-b border-neutral-800 bg-[#161616]">
          <h3 className="font-black text-neutral-400 uppercase tracking-widest text-center text-sm">Kho linh kiện</h3>
          <p className="text-xs text-neutral-500 mt-1 text-center font-medium">Kéo thả khối sang phải</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {trayItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-50 border-2 border-dashed border-neutral-800 rounded-xl p-6">
              <span className="text-neutral-500 font-medium text-sm text-center">Đã xếp hết linh kiện</span>
            </div>
          ) : (
            trayItems.map(item => renderItem(item, 'tray'))
          )}
        </div>
      </div>

      {/* MAP AREA */}
      <div 
        className="flex-1 flex flex-col bg-[#09090b] relative isolate p-8"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'outside')} // The entire area outside the boundary is 'outside' zone
      >
        
        {/* Label for outside zone */}
        <div className="absolute top-4 left-6 text-xs font-black text-neutral-600 uppercase tracking-widest pointer-events-none">
          Môi trường ngoài hệ thống (External)
        </div>
        
        <div className="flex-1 w-full flex flex-row items-stretch justify-center gap-8 pt-6">
          
          {/* Left Outside Column */}
          <div className="w-[280px] flex flex-col gap-4">
             {outsideItems.filter((_, idx) => idx % 2 === 0).map(item => (
                <div key={item.id} className="w-full pointer-events-auto shrink-0">
                   {renderItem(item, 'outside')}
                </div>
             ))}
          </div>

          {/* INSIDE ZONE (System Boundary) */}
          <div 
            className="relative z-10 flex-1 max-w-[500px] min-h-[400px] bg-blue-950/10 border-4 border-blue-500/30 border-dashed rounded-3xl flex flex-col shadow-2xl backdrop-blur-sm transition-all"
            onDragOver={handleDragOver}
            onDrop={(e) => { e.stopPropagation(); handleDrop(e, 'inside'); }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0a0a0a] px-6 py-1 border-2 border-blue-500/50 rounded-full font-black text-blue-400 whitespace-nowrap shadow-xl">
               {systemName}
            </div>
            
            <div className="flex-1 w-full p-8 pt-10 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
               {insideItems.length === 0 ? (
                 <div className="w-full h-full flex items-center justify-center opacity-30 pointer-events-none">
                   <span className="text-blue-500 font-bold uppercase tracking-widest text-center">Thả linh kiện<br/>vào đây</span>
                 </div>
               ) : (
                 insideItems.map(item => renderItem(item, 'inside'))
               )}
            </div>
          </div>

          {/* Right Outside Column */}
          <div className="w-[280px] flex flex-col gap-4">
             {outsideItems.filter((_, idx) => idx % 2 !== 0).map(item => (
                <div key={item.id} className="w-full pointer-events-auto shrink-0">
                   {renderItem(item, 'outside')}
                </div>
             ))}
          </div>

        </div>
      </div>

      {/* Overlay to block interaction on success */}
      {(status === 'correct' || status === 'showing_answer') && (
        <div className="absolute inset-0 z-50 bg-green-500/5 pointer-events-none border-4 border-green-500 rounded-2xl"></div>
      )}
    </div>
  );
}
