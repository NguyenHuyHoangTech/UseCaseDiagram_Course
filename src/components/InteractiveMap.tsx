import { useState, useRef, useEffect } from 'react';
import { Play, Square, Plus, Link as LinkIcon, Settings, Database, Server, Minus, Trash2, Edit3, Save, Upload, AlertTriangle, MoveDiagonal } from 'lucide-react';

const GRID_SIZE = 20; 
const MIN_GAP = 20; 

const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

function getPerimeterPoint(node: any, angle: number) {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;
  
  if (node.type === 'useCase') {
    const a = node.w / 2;
    const b = node.h / 2;
    const radius = (a * b) / Math.sqrt(Math.pow(b * Math.cos(angle), 2) + Math.pow(a * Math.sin(angle), 2));
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  } 
  else {
    const w = node.w / 2; 
    const h = node.h / 2;
    const tanTheta = Math.tan(angle);
    let px, py;

    if (Math.abs(Math.cos(angle)) < 0.0001) {
         px = 0;
         py = Math.sign(Math.sin(angle)) * h;
    } else if (Math.abs(tanTheta) < h / w) {
      px = Math.sign(Math.cos(angle)) * w;
      py = px * tanTheta;
    } else {
      py = Math.sign(Math.sin(angle)) * h;
      px = py / tanTheta;
    }
    
    return { x: cx + px, y: cy + py };
  }
}

function getSmartConnection(source: any, target: any) {
  if (!source || !target) return { sx: 0, sy: 0, tx: 0, ty: 0 };
  const cx1 = source.x + source.w / 2;
  const cy1 = source.y + source.h / 2;
  const cx2 = target.x + target.w / 2;
  const cy2 = target.y + target.h / 2;

  const angleST = Math.atan2(cy2 - cy1, cx2 - cx1);
  const angleTS = Math.atan2(cy1 - cy2, cx1 - cx2);

  const sPoint = getPerimeterPoint(source, angleST);
  const tPoint = getPerimeterPoint(target, angleTS);

  return { sx: sPoint.x, sy: sPoint.y, tx: tPoint.x, ty: tPoint.y };
}

interface InteractiveMapProps {
  initialNodes: any[];
  initialEdges: any[];
  onChange?: (nodes: any[], edges: any[]) => void;
  allowCreate?: boolean;
}

export default function InteractiveMap({ initialNodes, initialEdges, onChange, allowCreate = true }: InteractiveMapProps) {
  const [nodes, setNodes] = useState<any[]>(initialNodes);
  const [edges, setEdges] = useState<any[]>(initialEdges);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const [scale, setScale] = useState(1);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState<any>(null); 
  const [isColliding, setIsColliding] = useState(false);

  const [isPanning, setIsPanning] = useState(false);
  const [resizingBoundaryId, setResizingBoundaryId] = useState<string | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const [newNodeType, setNewNodeType] = useState('useCase');
  const [newNodeLabel, setNewNodeLabel] = useState('Chức năng mới');
  const [newEdgeSource, setNewEdgeSource] = useState('');
  const [newEdgeTarget, setNewEdgeTarget] = useState('');
  const [newEdgeType, setNewEdgeType] = useState('association');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    if (onChange) {
      onChange(nodes, edges);
    }
  }, [nodes, edges]);

  // When initial props change (like when user clicks Try Again), reset the map state
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setDraggingId(null);
    setSelectedEdgeId(null);
    setSelectedNodeId(null);
  }, [initialNodes, initialEdges]);

  const getScaledMousePos = (e: React.PointerEvent) => {
    const container = document.getElementById('map-container');
    if (!container) return { x: 0, y: 0 };
    const rect = container.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left + container.scrollLeft) / scale,
      y: (e.clientY - rect.top + container.scrollTop) / scale
    };
  };

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    if (editingNodeId) return; 
    e.stopPropagation();
    
    const node = nodes.find(n => n.id === id);
    if (node?.type === 'boundary' && !resizingBoundaryId) return; 
    
    if (!allowCreate && selectedNodeId && selectedNodeId !== id) {
      // Connect selectedNodeId to id
      const sNode = nodes.find(n => n.id === selectedNodeId);
      const tNode = node;
      if (sNode && tNode) {
        let defaultType = 'association';
        if (sNode.type === 'useCase' && tNode.type === 'useCase') defaultType = 'include';
        if (sNode.type === 'actor' && tNode.type === 'actor') defaultType = 'generalization';
        
        // Avoid duplicate edges
        const edgeExists = edges.some(edge => 
           (edge.source === sNode.id && edge.target === tNode.id) || 
           (edge.source === tNode.id && edge.target === sNode.id && defaultType === 'association')
        );
        if (!edgeExists) {
            const newEdge = { id: 'e_' + Date.now(), source: sNode.id, target: tNode.id, type: defaultType };
            setEdges([...edges, newEdge]);
        }
      }
      setSelectedNodeId(null); // Deselect after connecting
      return; 
    }

    if (selectedNodeId !== id) setSelectedNodeId(id); 
    setSelectedEdgeId(null); 
    
    const mousePos = getScaledMousePos(e);
    setDraggingId(id);
    setDragStartPos({ x: node.x, y: node.y });
    setOffset({ x: mousePos.x - node.x, y: mousePos.y - node.y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      const container = document.getElementById('map-container');
      if (container) {
        container.scrollLeft -= e.movementX;
        container.scrollTop -= e.movementY;
      }
      return;
    }

    if (resizingBoundaryId) {
      const mousePos = getScaledMousePos(e);
      setNodes(prev => prev.map(n => {
        if (n.id === resizingBoundaryId) {
          return { ...n, w: Math.max(300, snapToGrid(mousePos.x - n.x + 10)), h: Math.max(300, snapToGrid(mousePos.y - n.y + 10)) };
        }
        return n;
      }));
      return;
    }

    if (!draggingId) return;
    const mousePos = getScaledMousePos(e);
    const draggedNode = nodes.find(n => n.id === draggingId);
    
    const rawX = mousePos.x - offset.x;
    const rawY = mousePos.y - offset.y;
    const snappedX = snapToGrid(rawX);
    const snappedY = snapToGrid(rawY);

    const collisionDetected = nodes.some(n => {
      if (n.id === draggingId) return false;
      if (n.type === 'boundary') {
        const isActorOrExternal = draggedNode.type === 'actor' || (draggedNode.type === 'component' && !draggedNode.data.isInternal);
        if (isActorOrExternal) {
          const overlapsBoundary = (snappedX < n.x + n.w && snappedX + draggedNode.w > n.x && snappedY < n.y + n.h && snappedY + draggedNode.h > n.y);
          if (overlapsBoundary) return true;
        } else {
          const isOutsideBoundary = (snappedX < n.x + MIN_GAP || snappedX + draggedNode.w > n.x + n.w - MIN_GAP || snappedY < n.y + 60 || snappedY + draggedNode.h > n.y + n.h - MIN_GAP);
          if (isOutsideBoundary) return true;
        }
        return false;
      }
      return (snappedX < n.x + n.w + MIN_GAP && snappedX + draggedNode.w > n.x - MIN_GAP && snappedY < n.y + n.h + MIN_GAP && snappedY + draggedNode.h > n.y - MIN_GAP);
    });

    setIsColliding(collisionDetected);
    setNodes(prev => prev.map(n => n.id === draggingId ? { ...n, x: snappedX, y: snappedY } : n));
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    setResizingBoundaryId(null);
    if (draggingId) {
      if (isColliding && dragStartPos) {
        setNodes(prev => prev.map(n => n.id === draggingId ? { ...n, x: dragStartPos.x, y: dragStartPos.y } : n));
      }
      setDraggingId(null);
      setIsColliding(false);
      setDragStartPos(null);
    }
  };

  const checkUMLRules = (sNode: any, tNode: any, type: string) => {
    if (sNode.type === 'note' || tNode.type === 'note') return null; 

    const isActor = (n: any) => n.type === 'actor' || n.type === 'component';
    
    if (isActor(sNode) && isActor(tNode)) {
      if (type !== 'generalization') return "Lỗi chuẩn UML: Giữa 2 Actor (hoặc External System) chỉ được phép dùng quan hệ Kế thừa (Generalization).";
    }
    
    if ((isActor(sNode) && tNode.type === 'useCase') || (sNode.type === 'useCase' && isActor(tNode))) {
      if (type === 'include' || type === 'extend') return "Lỗi chuẩn UML: Không được dùng Include/Extend để nối Actor với Use Case. Phải dùng Association.";
    }

    if (sNode.type === 'useCase' && tNode.type === 'useCase') {
      if (type === 'association') return "Lỗi chuẩn UML: Giữa 2 Use Case không dùng Association. Hãy dùng Include, Extend hoặc Kế thừa.";
    }

    return null; 
  };

  const handleAddNode = () => {
    const id = 'n_' + Date.now();
    let w = 160, h = 80; 
    let isInternal = newNodeType === 'useCase';
    
    if (newNodeType === 'actor') { w = 80; h = 120; isInternal = false; }
    if (newNodeType === 'component') { w = 200; h = 100; isInternal = false; } 
    if (newNodeType === 'note') { w = 160; h = 80; isInternal = true; }
    
    const boundary = nodes.find(n => n.type === 'boundary') || { x: 280, y: 40, w: 540, h: 700 };
    let spawnX = 0, spawnY = 0;

    if (!isInternal) {
      spawnX = snapToGrid(boundary.x - w - 60);
      spawnY = snapToGrid(boundary.y + 100);
    } else {
      spawnX = snapToGrid(boundary.x + 60);
      spawnY = snapToGrid(boundary.y + 100);
    }

    while(nodes.some(n => n.id !== id && Math.abs(n.x - spawnX) < 20 && Math.abs(n.y - spawnY) < 20)) spawnY += 60;

    setNodes([...nodes, { id, type: newNodeType, x: spawnX, y: spawnY, w, h, data: { label: newNodeLabel, isPrimary: true, isInternal: isInternal, stereotype: newNodeType === 'component' ? 'Background Task' : '' } }]);
  };

  const handleAddEdge = () => {
    if(!newEdgeSource || !newEdgeTarget || newEdgeSource === newEdgeTarget) return;
    
    const sNode = nodes.find(n => n.id === newEdgeSource);
    const tNode = nodes.find(n => n.id === newEdgeTarget);
    
    const errorMsg = checkUMLRules(sNode, tNode, newEdgeType);
    if (errorMsg) {
       showToast(errorMsg);
       return;
    }

    const id = 'e_' + Date.now();
    setEdges([...edges, { id, source: newEdgeSource, target: newEdgeTarget, type: newEdgeType }]);
  };

  const handleDeleteEdge = (edgeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEdges(edges.filter(edge => edge.id !== edgeId));
    setSelectedEdgeId(null);
  };

  const handleDeleteNode = (nodeId: string, e: React.MouseEvent) => {
    if (!allowCreate) return;
    e.stopPropagation();
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNodeId(null);
  };

  const handleDoubleClickNode = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedNodeId(id);
    setSelectedEdgeId(null);
    setEditingNodeId(null);
  };

  const saveNodeName = (id: string, newName: string) => {
    if (newName.trim() === '') return setEditingNodeId(null);
    setNodes(nodes.map(n => n.id === id ? { ...n, data: { ...n.data, label: newName } } : n));
    setEditingNodeId(null);
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, edges }));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "usecase-map.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast("Đã lưu tệp JSON thành công!");
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = event => {
        try {
          const content = JSON.parse(event.target?.result as string);
          if (content.nodes && content.edges) {
            setNodes(content.nodes);
            setEdges(content.edges);
            showToast("Đã tải bản đồ thành công!");
          }
        } catch (err) {
          showToast("Tệp không hợp lệ!");
        }
      };
    }
  };

  const clearCanvas = () => {
    setNodes(nodes.filter(n => n.type === 'boundary')); 
    setEdges([]);
    showToast("Đã làm sạch bản đồ.");
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#09090b] text-white font-sans overflow-hidden relative">
      <div className="flex flex-1 overflow-hidden w-full h-full">
        {/* SIDEBAR */}
        {allowCreate && (
        <div className="w-80 bg-[#111] border-r border-neutral-800 flex flex-col z-50 shadow-2xl relative shrink-0">
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
             <h1 className="text-xl font-black text-white flex items-center gap-3">
               <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Settings size={20} /></div>
               UML Lab
             </h1>
          </div>

          <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6 custom-scrollbar">
             
             <div className="grid grid-cols-2 gap-2">
               <button onClick={exportJSON} className="flex flex-col items-center justify-center gap-1 bg-neutral-900 hover:bg-neutral-800 p-3 rounded-xl border border-neutral-800 transition-colors text-xs font-bold text-neutral-300">
                  <Save size={16} className="text-green-400"/> Lưu (JSON)
               </button>
               <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center gap-1 bg-neutral-900 hover:bg-neutral-800 p-3 rounded-xl border border-neutral-800 transition-colors text-xs font-bold text-neutral-300">
                  <Upload size={16} className="text-blue-400"/> Tải lên
                  <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={importJSON} />
               </button>
               <button onClick={clearCanvas} className="col-span-2 flex items-center justify-center gap-2 bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 p-2 rounded-xl transition-colors text-xs font-bold">
                  <Trash2 size={14}/> Xóa trắng bản đồ
               </button>
             </div>

             <div className="flex flex-col gap-3">
               <button onClick={() => setIsSimulating(!isSimulating)}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm transition-all shadow-lg active:scale-95 ${isSimulating ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-green-500 text-black hover:bg-green-400'}`}>
                  {isSimulating ? <><Square fill="currentColor" size={16} /> Dừng luồng dữ liệu</> : <><Play fill="currentColor" size={16} /> Chạy luồng dữ liệu</>}
               </button>
             </div>

             <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex flex-col gap-4">
                <h3 className="font-bold text-neutral-300 flex items-center gap-2 text-sm"><Plus size={16}/> Sinh Đối tượng</h3>
                <select className="w-full bg-black border border-neutral-700 p-3 rounded-lg outline-none font-medium text-sm" value={newNodeType} onChange={e=>setNewNodeType(e.target.value)}>
                   <option value="useCase">Oval - Use Case</option>
                   <option value="actor">Stick - Actor</option>
                   <option value="component">Box - External/Background</option>
                   <option value="note">Paper - Note (Ghi chú)</option>
                </select>
                <input type="text" className="w-full bg-black border border-neutral-700 p-3 rounded-lg outline-none focus:border-blue-500 text-sm" value={newNodeLabel} onChange={e=>setNewNodeLabel(e.target.value)} />
                <button onClick={handleAddNode} className="w-full bg-neutral-800 hover:bg-neutral-700 p-3 rounded-lg font-bold text-sm">Thêm vào Bản đồ</button>
             </div>

             <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex flex-col gap-4">
                <h3 className="font-bold text-neutral-300 flex items-center gap-2 text-sm"><LinkIcon size={16}/> Liên kết</h3>
                <select className="w-full bg-black border border-neutral-700 p-3 rounded-lg outline-none text-sm" value={newEdgeSource} onChange={e=>setNewEdgeSource(e.target.value)}>
                   <option value="">-- Từ --</option>
                   {nodes.filter(n=>n.type!=='boundary').map(n => <option key={n.id} value={n.id}>{n.data.label}</option>)}
                </select>
                <select className="w-full bg-black border border-neutral-700 p-3 rounded-lg outline-none text-sm" value={newEdgeTarget} onChange={e=>setNewEdgeTarget(e.target.value)}>
                   <option value="">-- Đến --</option>
                   {nodes.filter(n=>n.type!=='boundary').map(n => <option key={n.id} value={n.id}>{n.data.label}</option>)}
                </select>
                <select className="w-full bg-black border border-neutral-700 p-3 rounded-lg outline-none text-sm" value={newEdgeType} onChange={e=>setNewEdgeType(e.target.value)}>
                   <option value="association">Association (Đường liền)</option>
                   <option value="include">&lt;&lt;include&gt;&gt; (Nét đứt)</option>
                   <option value="extend">&lt;&lt;extend&gt;&gt; (Nét đứt)</option>
                   <option value="generalization">Generalization (Kế thừa)</option>
                   <option value="dashed">Dashed (Nối ghi chú)</option>
                </select>
                <button onClick={handleAddEdge} className="w-full bg-neutral-800 hover:bg-neutral-700 p-3 rounded-lg font-bold text-sm">Kiểm tra Rules & Nối dây</button>
             </div>
          </div>
        </div>
        )}

        {/* MAP CANVAS */}
        <div className="flex-1 relative bg-[#09090b] overflow-hidden">
            
          {toast && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[200] bg-red-900 border-2 border-red-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
              <AlertTriangle size={24} className="text-yellow-300" />
              <span className="font-bold text-sm">{toast}</span>
            </div>
          )}

           <div className="absolute bottom-6 right-6 flex items-center bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-[100]">
             {!allowCreate && (
                <button onClick={() => {
                   setNodes(initialNodes);
                   setEdges(initialEdges);
                   setSelectedEdgeId(null);
                   setSelectedNodeId(null);
                   setToast("Đã khôi phục sơ đồ gốc");
                   setTimeout(() => setToast(null), 2000);
                }} className="px-4 py-3 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors border-r border-neutral-800 font-bold text-sm">
                   Làm lại
                </button>
             )}
             <button onClick={() => setScale(s => Math.max(0.3, s - 0.1))} className="p-3 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                <Minus size={18} strokeWidth={3} />
             </button>
             <div className="px-3 font-mono text-xs font-bold w-16 text-center border-x border-neutral-800 select-none">
                {Math.round(scale * 100)}%
             </div>
             <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-3 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                <Plus size={18} strokeWidth={3} />
             </button>
          </div>

          <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 border border-neutral-800 rounded-lg text-neutral-500 text-xs font-medium z-10 pointer-events-none flex items-center gap-2">
             <MoveDiagonal size={14}/> {allowCreate ? 'Kéo chuột ở khoảng trống để di chuyển Camera' : 'Kéo chuột vùng trống để di chuyển - Phóng to/Thu nhỏ'}
          </div>

          <div id="map-container" 
               className={`w-full h-full ${allowCreate ? 'overflow-auto' : 'overflow-hidden'} select-none ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
               onPointerDown={(e: any) => { 
                 if(e.target.id === 'map-container' || e.target.id === 'map-bg') {
                   setIsPanning(true); 
                   setSelectedEdgeId(null); 
                   setSelectedNodeId(null); 
                   setEditingNodeId(null);
                 }
               }}
               onPointerMove={handlePointerMove} 
               onPointerUp={handlePointerUp} 
               onPointerLeave={handlePointerUp}>
            
            <div id="map-bg"
                 style={{ 
                 width: '3000px', height: '3000px',
                 transform: `scale(${scale})`,
                 transformOrigin: '0 0',
                 backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
                 backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                 backgroundPosition: '-1px -1px' 
               }} 
               className="relative">
              
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                  <marker id="triangle" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <polygon points="1,1 11,6 1,11" fill="#09090b" stroke="#a3a3a3" strokeWidth="1.5" strokeLinejoin="round"/>
                  </marker>
                  <marker id="arrow-selected" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                  <marker id="triangle-selected" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                    <polygon points="1,1 11,6 1,11" fill="#09090b" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round"/>
                  </marker>
                </defs>

                {edges.map(e => {
                  const sourceNode = nodes.find(n => n.id === e.source);
                  const targetNode = nodes.find(n => n.id === e.target);
                  const isTargetEdge = !targetNode && edges.find(ed => ed.id === e.target);
                  
                  if (!sourceNode || (!targetNode && !isTargetEdge)) return null;
                  
                  let pts;
                  if (isTargetEdge) {
                    const s2 = nodes.find(n => n.id === isTargetEdge.source);
                    const t2 = nodes.find(n => n.id === isTargetEdge.target);
                    const c2 = getSmartConnection(s2, t2);
                    const midX = (c2.sx + c2.tx) / 2;
                    const midY = (c2.sy + c2.ty) / 2;
                    pts = getSmartConnection(sourceNode, { x: midX, y: midY, w: 0, h: 0 });
                  } else {
                    pts = getSmartConnection(sourceNode, targetNode);
                  }

                  const isDashed = e.type === 'include' || e.type === 'extend' || e.type === 'dashed';
                  const isGen = e.type === 'generalization';
                  const isSelected = selectedEdgeId === e.id;
                  
                  const markerId = e.type === 'dashed' ? "" : (isGen ? (isSelected ? "url(#triangle-selected)" : "url(#triangle)") : (isDashed ? (isSelected ? "url(#arrow-selected)" : "url(#arrow)") : ""));
                  const edgeColor = isSelected ? "#ef4444" : "#888";
                  const edgeWidth = isSelected ? "3" : "2.5";
                  
                  return (
                    <g key={e.id} className="pointer-events-auto cursor-pointer" onPointerDown={(ev) => { ev.stopPropagation(); setSelectedEdgeId(e.id); setSelectedNodeId(null); setEditingNodeId(null); }}>
                      <path d={`M ${pts.sx} ${pts.sy} L ${pts.tx} ${pts.ty}`} stroke="transparent" strokeWidth="25" fill="none" />
                      
                      <path d={`M ${pts.sx} ${pts.sy} L ${pts.tx} ${pts.ty}`} 
                            stroke={edgeColor} strokeWidth={edgeWidth} 
                            strokeDasharray={isDashed ? "8,8" : "none"} 
                            markerEnd={markerId} 
                            strokeLinecap="round" 
                            className="transition-colors duration-200" />
                      
                      {(e.type === 'include' || e.type === 'extend') && (
                        <g transform={`translate(${(pts.sx + pts.tx) / 2}, ${(pts.sy + pts.ty) / 2})`}>
                          <rect x="-42" y="-12" width="84" height="24" fill="#09090b" rx="4" stroke={isSelected ? '#ef4444' : 'transparent'} />
                          <text y="4" fill={isSelected ? '#ef4444' : '#d4d4d4'} fontSize="12" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                            &laquo;{e.type}&raquo;
                          </text>
                        </g>
                      )}

                      {isSelected && (
                         <g transform={`translate(${(pts.sx + pts.tx) / 2}, ${(pts.sy + pts.ty) / 2})`} 
                            onClick={(ev) => handleDeleteEdge(e.id, ev)} 
                            className="cursor-pointer hover:opacity-80 drop-shadow-xl" style={{ pointerEvents: 'all' }}>
                            <circle r="14" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                            <path d="M -5 -5 L 5 5 M 5 -5 L -5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                         </g>
                      )}

                      {isSimulating && e.type !== 'dashed' && (
                        <circle r="5" fill={isDashed ? "#A855F7" : (isGen ? "#FACC15" : "#4ADE80")} className={`drop-shadow-[0_0_10px_${isDashed ? 'rgba(168,85,247,1)' : 'rgba(74,222,128,1)'}]`}>
                          <animate attributeName="cx" values={e.type === 'extend' ? `${pts.tx};${pts.sx}` : `${pts.sx};${pts.tx}`} dur={isDashed ? "2.5s" : "1.5s"} repeatCount="indefinite" />
                          <animate attributeName="cy" values={e.type === 'extend' ? `${pts.ty};${pts.sy}` : `${pts.sy};${pts.ty}`} dur={isDashed ? "2.5s" : "1.5s"} repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {nodes.map(node => {
                if (node.type === 'boundary') {
                   return (
                     <div key={node.id} className="absolute border-4 border-neutral-700 border-dashed rounded-3xl box-border" 
                          style={{ left: node.x, top: node.y, width: node.w, height: node.h, zIndex: 0 }}>
                       <div className="w-full bg-black/80 p-4 rounded-t-2xl border-b border-neutral-800 flex justify-between items-center backdrop-blur-md">
                         
                         {editingNodeId === node.id ? (
                            <input autoFocus defaultValue={node.data.label} 
                                   onBlur={(e) => saveNodeName(node.id, e.target.value)}
                                   onKeyDown={(e) => { if(e.key === 'Enter') e.currentTarget.blur(); }}
                                   className="bg-neutral-800 text-white font-black text-xl w-64 outline-none border-b-2 border-blue-500 rounded px-2" />
                         ) : (
                            <span className="font-black text-white text-xl tracking-wide cursor-text" onDoubleClick={() => setEditingNodeId(node.id)}>
                              {node.data.label}
                            </span>
                         )}

                         <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-700">System Boundary</span>
                       </div>
                       
                       <div className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize flex items-end justify-end p-1 text-neutral-500 hover:text-white bg-gradient-to-tl from-neutral-800 to-transparent rounded-br-2xl"
                            onPointerDown={(e) => { e.stopPropagation(); setResizingBoundaryId(node.id); }}>
                          <MoveDiagonal size={16} />
                       </div>
                     </div>
                   );
                }

                const isWarning = draggingId === node.id && isColliding;
                const isSelected = selectedNodeId === node.id;

                const renderControls = () => {
                  if (!isSelected || !allowCreate) return null;
                  return (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2 bg-white p-1 rounded-lg shadow-xl z-[100]" onPointerDown={(e) => e.stopPropagation()}>
                      <button onClick={(e) => handleDeleteNode(node.id, e)} className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded flex items-center justify-center transition-colors">
                        <Trash2 size={16} strokeWidth={2.5}/>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setEditingNodeId(node.id); setSelectedNodeId(null); }} className="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-500 rounded flex items-center justify-center transition-colors">
                        <Edit3 size={16} strokeWidth={2.5}/>
                      </button>
                    </div>
                  );
                };

                const renderLabel = (defaultClass: string) => {
                   if (editingNodeId === node.id) {
                      return <input autoFocus defaultValue={node.data.label} 
                                    onBlur={(e) => saveNodeName(node.id, e.target.value)}
                                    onKeyDown={(e) => { if(e.key === 'Enter') e.currentTarget.blur(); }}
                                    className={`outline-none text-center bg-blue-100 text-blue-900 px-1 py-0.5 rounded w-[110%] ${defaultClass}`} />
                   }
                   return <span className={`break-words ${defaultClass}`}>{node.data.label}</span>
                };

                if (node.type === 'actor') {
                   return (
                     <div key={node.id} onPointerDown={(e) => handlePointerDown(e, node.id)} onDoubleClick={(e) => handleDoubleClickNode(e, node.id)}
                          className={`absolute flex flex-col items-center justify-center box-border transition-transform
                                     ${draggingId === node.id ? 'cursor-grabbing opacity-90 scale-105' : 'cursor-grab'}
                                     ${isWarning ? 'drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : (isSelected ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]' : '')}`} 
                          style={{ left: node.x, top: node.y, width: node.w, height: node.h, zIndex: draggingId === node.id ? 50 : 20 }}>
                       
                       {isWarning && <div className="absolute inset-0 border-2 border-red-500 bg-red-500/20 rounded-lg animate-pulse z-[-1]"></div>}
                       {renderControls()}

                       <svg viewBox="0 0 40 80" className={`w-12 h-20 drop-shadow-lg ${isWarning ? 'stroke-red-400' : (node.data.isPrimary ? 'stroke-white' : 'stroke-neutral-400')}`} fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="20" cy="15" r="9" />
                          <path d="M 20 24 L 20 50 M 5 35 L 35 35 M 20 50 L 5 75 M 20 50 L 35 75" />
                       </svg>
                       <div className={`mt-2 flex items-center justify-center min-w-full px-2 py-0.5 rounded border 
                                        ${isWarning ? 'bg-red-900/50 text-white border-red-500' : 'bg-black/80 border-neutral-800'}`}>
                          {renderLabel("text-[13px] font-bold text-center")}
                       </div>
                     </div>
                   );
                }

                if (node.type === 'useCase') {
                   return (
                     <div key={node.id} onPointerDown={(e) => handlePointerDown(e, node.id)} onDoubleClick={(e) => handleDoubleClickNode(e, node.id)}
                          className={`absolute border-[3px] rounded-[50%] flex items-center justify-center text-center shadow-2xl px-6 py-2 box-border select-none transition-transform
                                     ${draggingId === node.id ? 'cursor-grabbing scale-105' : 'cursor-grab'}
                                     ${isWarning ? 'border-red-500 bg-red-950/60 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 
                                       (isSelected ? 'border-blue-500 bg-blue-900/60 shadow-[0_0_20px_rgba(59,130,246,0.5)] text-white' :
                                       (draggingId === node.id ? 'border-blue-400 bg-blue-900/40' : 'border-neutral-300 bg-[#18181b] hover:border-white'))}`} 
                          style={{ left: node.x, top: node.y, width: node.w, height: node.h, zIndex: draggingId === node.id ? 50 : 20 }}>
                        
                        {renderControls()}
                        {renderLabel("font-bold text-[14px] leading-tight w-full")}
                     </div>
                   );
                }

                if (node.type === 'component') {
                   return (
                     <div key={node.id} onPointerDown={(e) => handlePointerDown(e, node.id)} onDoubleClick={(e) => handleDoubleClickNode(e, node.id)}
                          className={`absolute border-[3px] flex flex-col items-center justify-center p-3 rounded-2xl shadow-xl box-border select-none transition-transform
                                     ${draggingId === node.id ? 'cursor-grabbing opacity-90 scale-105' : 'cursor-grab'}
                                     ${isWarning ? 'border-red-500 bg-red-950/60 shadow-[0_0_20px_rgba(239,68,68,0.5)]' :
                                       (isSelected ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] ' + (node.data.isInternal ? 'bg-purple-900/60' : 'bg-orange-900/60') :
                                       (node.data.isInternal ? 'border-purple-500 bg-purple-950/40' : 'border-orange-500 bg-orange-950/40'))}`} 
                          style={{ left: node.x, top: node.y, width: node.w, height: node.h, zIndex: draggingId === node.id ? 50 : 20 }}>
                        
                        {renderControls()}
                        <span className={`text-[10px] font-mono font-bold mb-1 ${isWarning ? 'text-red-300' : (node.data.isInternal ? 'text-purple-300' : 'text-orange-300')}`}>&laquo;{node.data.stereotype}&raquo;</span>
                        
                        <div className="w-full bg-black/60 px-3 py-1.5 rounded-lg border border-black/50 flex items-center justify-center min-h-[36px]">
                           {renderLabel("font-black text-sm text-center leading-snug w-full")}
                        </div>
                        
                        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 bg-black ${isWarning ? 'text-red-500 border-red-500' : ''}`} 
                             style={{ color: isWarning ? '' : (node.data.isInternal ? '#A855F7' : '#F97316'), borderColor: isWarning ? '' : 'currentColor' }}>
                           {node.data.isInternal ? <Database size={14} /> : <Server size={14} />}
                        </div>
                     </div>
                   );
                }

                if (node.type === 'note') {
                   return (
                     <div key={node.id} onPointerDown={(e) => handlePointerDown(e, node.id)} onDoubleClick={(e) => handleDoubleClickNode(e, node.id)}
                          className={`absolute box-border select-none transition-transform
                                     ${draggingId === node.id ? 'cursor-grabbing scale-105' : 'cursor-grab'}
                                     ${isSelected ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'shadow-xl'}`} 
                          style={{ left: node.x, top: node.y, width: node.w, height: node.h, zIndex: draggingId === node.id ? 50 : 20 }}>
                        
                        {renderControls()}
                        <svg width="100%" height="100%" className="absolute inset-0 z-[-1]">
                           <polygon points={`0,0 ${node.w - 20},0 ${node.w},20 ${node.w},${node.h} 0,${node.h}`} fill="#fef08a" stroke={isSelected ? "#3b82f6" : "#ca8a04"} strokeWidth="2" />
                           <polyline points={`${node.w - 20},0 ${node.w - 20},20 ${node.w},20`} fill="#fde047" stroke={isSelected ? "#3b82f6" : "#ca8a04"} strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                        <div className="p-3 w-full h-full flex items-center justify-center text-yellow-900 font-mono text-xs">
                            {renderLabel("font-medium text-center w-full leading-relaxed")}
                        </div>
                     </div>
                   );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }`}</style>
    </div>
  );
}
