import { useMemo } from 'react';
import InteractiveMap from '../InteractiveMap';

export default function BuildDiagramInteractive({ data, status, onComplete }: any) {
  
  // Initialize map nodes based on data.items
  const initialNodes = useMemo(() => {
    if (!data?.items) return [];
    
    const nodes: any[] = [];
    
    // Boundary Node
    nodes.push({
      id: 'sysBoundary',
      type: 'boundary',
      x: 350, y: 50, w: 450, h: 500,
      data: { label: data.systemName || 'Hệ thống' }
    });

    // Spawn points for items
    let actorSpawnY = 100;
    let componentSpawnY = 100;

    data.items.forEach((item: any) => {
      const isActor = item.mapType === 'actor';
      const type = item.mapType || 'component';
      
      let w = 200, h = 100;
      if (type === 'actor') { w = 80; h = 120; }
      if (type === 'useCase') { w = 160; h = 80; }
      
      const x = 50; 
      const y = isActor ? actorSpawnY : componentSpawnY;
      
      if (isActor) actorSpawnY += 150;
      else componentSpawnY += 130;

      nodes.push({
        id: item.id,
        type: type,
        x: x, y: y, w, h,
        data: { label: item.label, isPrimary: true, stereotype: type === 'component' ? 'Device/System' : '' }
      });
    });

    return nodes;
  }, [data]);

  const handleMapChange = (newNodes: any[]) => {
    const boundary = newNodes.find((n: any) => n.id === 'sysBoundary');
    if (!boundary) return;

    let allCorrect = true;

    // To be inside, center of node must be inside boundary
    data.items.forEach((item: any) => {
      const node = newNodes.find((n: any) => n.id === item.id);
      if (!node) return;
      
      const cx = node.x + node.w / 2;
      const cy = node.y + node.h / 2;
      
      const isInside = (
         cx >= boundary.x && cx <= boundary.x + boundary.w &&
         cy >= boundary.y && cy <= boundary.y + boundary.h
      );
      
      const expectedInside = item.correctZone === 'inside';
      
      if (isInside !== expectedInside) {
        allCorrect = false;
      }
    });

    // Report up. We report true/false whenever they move.
    // LessonPlayer will enable "Check" button because onComplete sets selectedOption (status becomes ready)
    onComplete({
      id: 'build_diagram_result',
      isCorrect: allCorrect,
      hint: allCorrect ? '' : data.hint || 'Hãy kiểm tra lại! Những Actor (tác nhân bên ngoài) phải nằm ngoài khung đứt nét.'
    });
  };

  if (!data?.items) return null;

  return (
    <div className={`w-full h-full flex flex-col relative animate-in fade-in zoom-in-95 duration-500 rounded-3xl overflow-hidden border-4 transition-colors
      ${status === 'correct' || status === 'showing_answer' ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : ''}
      ${status === 'incorrect' || status === 'skill_check_incorrect' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-neutral-800'}
    `}>
       
       {/* Instruction Overlay */}
       <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] bg-[#1A1A1A] border border-neutral-700 px-6 py-3 rounded-full shadow-2xl pointer-events-none whitespace-nowrap">
          <p className="font-bold text-sm text-neutral-300">
             <span className="text-yellow-400">Kéo thả</span> các khối vào ĐÚNG vị trí (Trong hoặc Ngoài hệ thống)
          </p>
       </div>

       {/* Interactive Map */}
       <div className="flex-1 w-full bg-black relative">
          <InteractiveMap 
             initialNodes={initialNodes}
             initialEdges={[]}
             onChange={(n) => handleMapChange(n)}
             allowCreate={false}
          />
          {/* Overlay to disable interaction when checking */}
          {(status === 'correct' || status === 'showing_answer') && (
            <div className="absolute inset-0 z-50 bg-green-500/10 pointer-events-none"></div>
          )}
       </div>
    </div>
  );
}
