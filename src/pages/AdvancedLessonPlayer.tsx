// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { X, Zap, Sparkles, CheckCircle2, AlertCircle, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play } from 'lucide-react';

import { Link, useParams, useNavigate } from 'react-router-dom';
import Mascot from '../components/Mascot';
import LessonBottomBar from '../components/LessonBottomBar';
import InteractiveMap from '../components/InteractiveMap';
import { ALL_LESSONS } from '../data/lessons';


export default function AdvancedLessonPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const LESSON_DATA = id && ALL_LESSONS[id] ? ALL_LESSONS[id] : [];

  const [globalPhase, setGlobalPhase] = useState('lesson'); // intro, lesson, skill_check_splash, skill_check, complete
  const [stepIndex, setStepIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [hasTried, setHasTried] = useState(false);
  const [xpAddedAnim, setXpAddedAnim] = useState<number | null>(null);
  const [isStreakPopupOpen, setIsStreakPopupOpen] = useState(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Interactive States
  const [status, setStatus] = useState('idle'); // idle, ready, running, correct, incorrect, showing_answer, skill_check_incorrect
  const [hint, setHint] = useState('');
  
  // Modals & Navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState(0);
  const [hasViewedExplanation, setHasViewedExplanation] = useState(false);

  // Interaction Specific States
  const [selectedOpt, setSelectedOpt] = useState<any>(null);
  const [sliderVal, setSliderVal] = useState(20);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [mappingSlots, setMappingSlots] = useState<any[]>([null, null, null]);
  const [eqSlots, setEqSlots] = useState<any[]>([null, null, null]);
  
  // New States for Bins, Highlights, Connects, Runner
  const [binItems, setBinItems] = useState<any>({}); // { itemId: binId }
  const [activeToken, setActiveToken] = useState<any>(null); // for dragging/tapping
  
  const [selectedText, setSelectedText] = useState<any[]>([]);
  
  const [activeConnectNode, setActiveConnectNode] = useState<any>(null);
  const [connections, setConnections] = useState<any[]>([]); // [{from, to}]
  
  const [runnerSelection, setRunnerSelection] = useState<any[]>([null, null, null]);

  const [mapNodes, setMapNodes] = useState<any[]>([]);
  const [mapEdges, setMapEdges] = useState<any[]>([]);
  
  // Track reset count to force InteractiveMap to remount or use initial state
  const [mapResetKey, setMapResetKey] = useState(0);

  const currentData = LESSON_DATA[stepIndex];
  const progressPercent = (stepIndex / LESSON_DATA.length) * 100;

  useEffect(() => {
    if (!LESSON_DATA || LESSON_DATA.length === 0) {
      navigate('/');
      return;
    }
    
    // Auto-advance if globalPhase is intro
    if (globalPhase === 'intro') {
      setTimeout(() => setGlobalPhase('lesson'), 2500);
    } else if (globalPhase === 'skill_check_splash') {
      setTimeout(() => setGlobalPhase('skill_check'), 2500);
    }

    if (currentData?.interactionType === 'ordering') {
      const shuffled = [...currentData.options].sort(() => Math.random() - 0.5);
      setOrderItems(shuffled);
    }
  }, [globalPhase, stepIndex, currentData]);

  const handleCheck = () => {
    let isCorrect = false;
    let currentHint = 'Thử lại nhé!';
    const type = currentData.interactionType;

    if (type === 'true_false' || type === 'mcq') {
      isCorrect = selectedOpt?.isCorrect;
      currentHint = selectedOpt?.hint || 'Suy luận này chưa chính xác. Hãy nhớ lại định nghĩa cơ bản.';
    } else if (type === 'slider_exploratory') {
      if (sliderVal > 80) isCorrect = true;
      currentHint = 'Kéo thả thanh trượt trên 80% để server báo tải nặng.';
    } else if (type === 'ordering') {
      isCorrect = orderItems.every((item, idx) => item.correctOrder === idx + 1);
      currentHint = 'Sai thứ tự. Bạn cần xác định Boundary trước, sau đó đến Actor, Use Case, rồi mới tới Relations.';
    } else if (type === 'block_mapping') {
      const userIds = mappingSlots.map(s => s?.id);
      isCorrect = JSON.stringify(userIds) === JSON.stringify(currentData.correctSequence);
      currentHint = 'Sai rồi! Luồng đúng: Actor -> Nối kết -> Use Case.';
    } else if (type === 'equation_builder') {
      const userIds = eqSlots.map(s => s?.id);
      isCorrect = JSON.stringify(userIds) === JSON.stringify(currentData.correctSequence);
      currentHint = 'Logic sai. Cú pháp chuẩn: Base Case -> <<include>> -> Included Case.';
    } else if (type === 'drag_to_bins') {
      isCorrect = currentData.options.every(opt => binItems[opt.id] === opt.correctBin);
      currentHint = 'Một vài đối tượng phân loại sai. Actor là thực thể bên ngoài, Use Case là hành động!';
    } else if (type === 'text_highlight') {
      const correctIds = currentData.textChunks.filter(c => c.isCorrect).map(c => c.id).sort();
      const userIds = [...selectedText].sort();
      isCorrect = JSON.stringify(correctIds) === JSON.stringify(userIds);
      currentHint = 'Bạn chọn thiếu hoặc thừa rồi. Tìm đúng các cụm từ thể hiện "Hành động của người dùng".';
    } else if (type === 'map_interaction') {
      if (currentData.correctCondition) {
        isCorrect = currentData.correctCondition(mapNodes, mapEdges);
        currentHint = 'Bạn vẽ đường nối chưa chính xác. Vui lòng kiểm tra lại loại đường nối và hướng kết nối.';
      }
    }

    if (isCorrect) {
      setStatus('correct');
      let earned = 0;
      if (!hasTried && globalPhase === 'lesson') earned = 15;
      if (globalPhase === 'skill_check') earned = 25;
      
      if (earned > 0) {
        setXp(p => p + earned);
        setXpAddedAnim(earned);
        setTimeout(() => setXpAddedAnim(null), 1500);
      }
    } else {
      setStatus(globalPhase === 'skill_check' ? 'skill_check_incorrect' : 'incorrect');
      setHint(currentHint);
      setHasTried(true);
    }
  };

  const handleNext = () => {
    setIsModalOpen(false);
    setModalPage(0);
    setStatus('idle');
    setHasTried(false);
    
    // Reset all interaction states
    setSelectedOpt(null);
    setSliderVal(20);
    setMappingSlots([null, null, null]);
    setEqSlots([null, null, null]);
    setBinItems({});
    setActiveToken(null);
    setSelectedText([]);
    setActiveConnectNode(null);
    setConnections([]);
    setRunnerSelection([null, null, null]);
    setMapNodes([]);
    setMapEdges([]);
    setMapResetKey(prev => prev + 1);
    
    setHasViewedExplanation(false); 

    if (stepIndex < LESSON_DATA.length - 1) {
      const nextData = LESSON_DATA[stepIndex + 1];
      if (nextData.phase === 'skill_check' && currentData.phase === 'learning') {
        setGlobalPhase('skill_check_splash');
      } else {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 1000);
      }
      setStepIndex(p => p + 1);
    } else {
      setGlobalPhase('complete');
    }
  };

  const getMascotState = () => {
    if (globalPhase === 'skill_check_splash') return 'skill_check';
    if (globalPhase === 'complete') return 'lesson_complete';
    if (isTransitioning) return 'entry';
    
    if (status === 'correct') return 'correct';
    if (status === 'incorrect' || status === 'skill_check_incorrect') return 'shocked';
    if (status === 'showing_answer') return 'explaining';
    return 'path_idle';
  };

  const renderInteraction = () => {
    const type = currentData.interactionType;

    // 1. Selection Types (True/False, MCQ)
    if (type === 'true_false' || type === 'mcq') {
      return (
        <div className="w-full flex flex-col gap-4 mt-6">
          {currentData.options.map(opt => {
            const isSelected = selectedOpt?.id === opt.id;
            let btnClass = "w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all active:scale-[0.98] cursor-pointer bg-[#1A1A1A] font-bold text-lg ";
            
            if (status === 'idle' || status === 'ready') {
              btnClass += isSelected ? "border-white bg-[#222]" : "border-neutral-700 hover:border-neutral-500";
            } else if (globalPhase === 'skill_check') {
              // Dual-highlight for Skill Check
              if (isSelected && status === 'correct') btnClass += "border-green-500 bg-green-500/10";
              else if (status === 'skill_check_incorrect') {
                if (isSelected) btnClass += "border-red-500 bg-red-500/10"; // User's wrong choice
                else if (opt.isCorrect) btnClass += "border-green-500 bg-green-500/10"; // Right answer highlighted
                else btnClass += "border-neutral-700 opacity-50";
              }
              else btnClass += "border-neutral-700 opacity-50";
            } else {
              // Learning Phase Highlight
              if (isSelected && status === 'correct') btnClass += "border-green-500 bg-green-500/10";
              else if (isSelected && status === 'incorrect') btnClass += "border-yellow-500 bg-yellow-500/10";
              else if (status === 'showing_answer' && opt.isCorrect) btnClass += "border-white bg-white/10";
              else btnClass += "border-neutral-700 opacity-50";
            }

            return (
              <button key={opt.id} onClick={() => { setSelectedOpt(opt); setStatus('ready'); }} disabled={status !== 'idle' && status !== 'ready' && status !== 'incorrect'} className={btnClass}>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? 'border-white' : 'border-neutral-500'}
                  ${(status === 'correct' || status === 'showing_answer' || (status === 'skill_check_incorrect' && opt.isCorrect)) && opt.isCorrect ? 'border-green-500 bg-green-500' : ''}
                  ${status === 'skill_check_incorrect' && isSelected && !opt.isCorrect ? 'border-red-500 bg-red-500' : ''}
                `}>
                   {((status === 'correct' || status === 'showing_answer' || (status === 'skill_check_incorrect' && opt.isCorrect)) && opt.isCorrect) && <CheckCircle2 size={16} className="text-black" />}
                   {(status === 'skill_check_incorrect' && isSelected && !opt.isCorrect) && <X size={16} className="text-black" />}
                </div>
                <span className="flex-1 text-left">{opt.label}</span>
              </button>
            )
          })}
        </div>
      );
    }

    // 2. Drag to Bins (Tap to Select -> Tap Bin)
    if (type === 'drag_to_bins') {
      const handleTokenTap = (opt) => {
        if(status !== 'idle' && status !== 'ready' && status !== 'incorrect') return;
        setActiveToken(opt.id === activeToken ? null : opt.id); // toggle
      };
      
      const handleBinTap = (binId) => {
        if (!activeToken || (status !== 'idle' && status !== 'ready' && status !== 'incorrect')) return;
        const newBins = { ...binItems, [activeToken]: binId };
        setBinItems(newBins);
        setActiveToken(null);
        if (Object.keys(newBins).length === currentData.options.length) setStatus('ready');
      };

      const unassignedOptions = currentData.options.filter(o => !binItems[o.id]);

      return (
        <div className="w-full flex flex-col items-center mt-6 gap-8">
           {/* Unassigned Tokens */}
           <div className="flex flex-wrap justify-center gap-3 min-h-[60px] p-4 bg-[#1A1A1A] rounded-2xl border border-neutral-800 w-full">
             {unassignedOptions.length === 0 && <span className="text-neutral-600 font-bold">Đã phân loại hết!</span>}
             {unassignedOptions.map(opt => (
               <button key={opt.id} onClick={() => handleTokenTap(opt)} 
                 className={`px-4 py-2 font-bold rounded-full border-2 transition-all 
                   ${activeToken === opt.id ? 'border-white bg-white text-black scale-105' : 'border-neutral-600 bg-[#222] text-neutral-300 hover:border-neutral-400'}`}>
                 {opt.label}
               </button>
             ))}
           </div>

           {/* Bins */}
           <div className="flex gap-4 w-full">
             {currentData.bins.map(bin => {
               const itemsInBin = currentData.options.filter(o => binItems[o.id] === bin.id);
               return (
                 <div key={bin.id} onClick={() => handleBinTap(bin.id)} className={`flex-1 min-h-[200px] border-4 rounded-3xl p-4 flex flex-col gap-3 transition-colors cursor-pointer
                   ${activeToken ? 'border-white/50 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-neutral-800 bg-[#111]'}
                   ${(status === 'correct' || status === 'showing_answer') ? 'border-green-900 bg-green-900/10' : ''}`}>
                   <h3 className="text-center font-black text-neutral-400 uppercase tracking-widest text-sm mb-2">{bin.label}</h3>
                   {itemsInBin.map(opt => (
                      <div key={opt.id} onClick={(e) => { e.stopPropagation(); if(status === 'idle' || status === 'ready' || status === 'incorrect') { const newB={...binItems}; delete newB[opt.id]; setBinItems(newB); setStatus('idle'); } }} 
                         className={`px-4 py-3 font-bold rounded-xl border-2 text-center text-sm shadow-sm
                           ${status === 'incorrect' && opt.correctBin !== bin.id ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500' : 
                             (status === 'correct' || status === 'showing_answer') ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-neutral-600 bg-[#222] hover:border-white'}`}>
                        {opt.label}
                      </div>
                   ))}
                 </div>
               )
             })}
           </div>
        </div>
      )
    }

    // 3. Text Highlighting
    if (type === 'text_highlight') {
      const toggleChunk = (id) => {
        if(status !== 'idle' && status !== 'ready' && status !== 'incorrect') return;
        const newSel = selectedText.includes(id) ? selectedText.filter(i => i !== id) : [...selectedText, id];
        setSelectedText(newSel);
        setStatus(newSel.length > 0 ? 'ready' : 'idle');
      };

      return (
        <div className="w-full mt-6 bg-[#1A1A1A] p-8 rounded-3xl border border-neutral-800 text-lg leading-loose font-medium text-neutral-400">
           {currentData.textChunks.map(chunk => {
             const isSelected = selectedText.includes(chunk.id);
             let chunkClass = "px-1.5 py-1 mx-0.5 rounded-lg transition-colors cursor-pointer ";
             
             if (status === 'idle' || status === 'ready') {
               chunkClass += isSelected ? "bg-white text-black font-bold shadow-[0_2px_10px_rgba(255,255,255,0.3)]" : "hover:bg-neutral-800 hover:text-neutral-200";
             } else {
               if (status === 'showing_answer' || status === 'correct') {
                 chunkClass += chunk.isCorrect ? "bg-green-500 text-black font-bold" : "opacity-40";
               } else if (status === 'incorrect') {
                 if (isSelected && !chunk.isCorrect) chunkClass += "bg-yellow-500 text-black font-bold";
                 else if (isSelected && chunk.isCorrect) chunkClass += "bg-green-500 text-black font-bold"; // partial right
                 else chunkClass += "opacity-40";
               }
             }

             return (
               <span key={chunk.id} onClick={() => toggleChunk(chunk.id)} className={chunkClass}>
                 {chunk.text}
               </span>
             )
           })}
        </div>
      )
    }

    // 4. Click Connect (Draw SVG Lines)
    if (type === 'click_connect') {
      const handleNodeClick = (id, side) => {
        if(status !== 'idle' && status !== 'ready' && status !== 'incorrect') return;
        
        if (!activeConnectNode) {
          setActiveConnectNode({id, side});
        } else {
          // If clicking same side, just switch active. If opposite, connect.
          if (activeConnectNode.side === side) {
             setActiveConnectNode({id, side});
          } else {
             const from = activeConnectNode.side === 'left' ? activeConnectNode.id : id;
             const to = activeConnectNode.side === 'left' ? id : activeConnectNode.id;
             
             // Check if connection exists
             const exists = connections.find(c => c.from === from && c.to === to);
             let newConns;
             if (exists) newConns = connections.filter(c => !(c.from === from && c.to === to)); // remove
             else newConns = [...connections, {from, to}]; // add
             
             setConnections(newConns);
             setActiveConnectNode(null);
             setStatus(newConns.length > 0 ? 'ready' : 'idle');
          }
        }
      };

      // Relative Layout: 2 nodes on left, 2 nodes on right -> Top is 25%, Bottom is 75%
      const getY = (idx) => idx === 0 ? '25%' : '75%';

      return (
        <div className="w-full mt-6 relative h-64 bg-[#1A1A1A] rounded-3xl border border-neutral-800">
           {/* SVG Overlay for Lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
             {connections.map((conn, i) => {
               const leftIdx = currentData.leftNodes.findIndex(n => n.id === conn.from);
               const rightIdx = currentData.rightNodes.findIndex(n => n.id === conn.to);
               
               let strokeColor = "#666";
               if (status === 'correct' || status === 'showing_answer') strokeColor = "#22C55E";
               else if (status === 'incorrect') strokeColor = "#EAB308";

               return (
                 <line key={i} x1="20%" y1={getY(leftIdx)} x2="80%" y2={getY(rightIdx)} 
                   stroke={strokeColor} strokeWidth="4" strokeLinecap="round" className="animate-in fade-in" />
               )
             })}
             
             {/* Show Answer Lines */}
             {status === 'showing_answer' && currentData.correctPairs.map((cp, i) => {
               const leftIdx = currentData.leftNodes.findIndex(n => n.id === cp.from);
               const rightIdx = currentData.rightNodes.findIndex(n => n.id === cp.to);
               return (
                 <line key={`ans-${i}`} x1="20%" y1={getY(leftIdx)} x2="80%" y2={getY(rightIdx)} 
                   stroke="#22C55E" strokeWidth="4" strokeLinecap="round" opacity="0.5" strokeDasharray="8 8" />
               )
             })}
           </svg>

           {/* HTML Nodes Overlay */}
           {currentData.leftNodes.map((n, i) => (
             <div key={n.id} onClick={() => handleNodeClick(n.id, 'left')} 
               className={`absolute w-[30%] -translate-y-1/2 left-[5%] p-3 text-center font-bold rounded-xl border-2 transition-all cursor-pointer z-20
                 ${activeConnectNode?.id === n.id ? 'border-white bg-white text-black scale-105 shadow-lg' : 'border-neutral-600 bg-[#222] hover:border-neutral-400'}`}
               style={{ top: getY(i) }}>
               {n.label}
             </div>
           ))}
           {currentData.rightNodes.map((n, i) => (
             <div key={n.id} onClick={() => handleNodeClick(n.id, 'right')} 
               className={`absolute w-[30%] -translate-y-1/2 right-[5%] p-3 text-center font-bold rounded-[50%] border-2 transition-all cursor-pointer z-20
                 ${activeConnectNode?.id === n.id ? 'border-white bg-white text-black scale-105 shadow-lg' : 'border-neutral-600 bg-[#222] hover:border-neutral-400'}`}
               style={{ top: getY(i) }}>
               {n.label}
             </div>
           ))}
        </div>
      )
    }

    // 5. Sandbox Runner (Simulate Logic)
    if (type === 'map_runner') {
      const selectPart = (stepIdx, opt) => {
        if(status !== 'idle' && status !== 'ready' && status !== 'incorrect') return;
        const newSel = [...runnerSelection];
        newSel[stepIdx] = opt;
        setRunnerSelection(newSel);
        if (newSel.every(s => s !== null)) setStatus('ready');
      };

      const S1 = currentData.options.step1;
      const S2 = currentData.options.step2;
      const S3 = currentData.options.step3;

      return (
        <div className="w-full mt-6 bg-[#1A1A1A] p-8 rounded-3xl border border-neutral-800 flex flex-col items-center gap-10 overflow-hidden">
           {/* Visual Editor/Runner Canvas */}
           <div className="relative w-full h-40 flex items-center justify-between z-10 px-4">
              
              {/* Node 1 */}
              <div className="flex flex-col items-center z-20">
                 <div className={`w-16 h-16 border-2 flex items-center justify-center rounded-xl bg-[#0A0A0A] transition-all
                    ${runnerSelection[0] ? 'border-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-dashed border-neutral-700'}`}>
                    {runnerSelection[0] && <div className="w-10 h-10 grayscale"><Mascot state="path_idle" size="scale-75" /></div>}
                 </div>
                 <span className="mt-2 text-sm font-bold text-neutral-400">{runnerSelection[0]?.label || 'Actor'}</span>
              </div>

              {/* Connection Line */}
              <div className="flex-1 mx-4 relative flex items-center justify-center h-10">
                 <div className={`absolute w-full h-1 transition-colors
                    ${runnerSelection[1] ? 'bg-neutral-500' : 'bg-neutral-800 border border-dashed border-neutral-700'}
                    ${status === 'incorrect' ? 'bg-red-500' : ''}
                    ${status === 'correct' ? 'bg-green-500' : ''}`}>
                 </div>
                 
                 {/* Moving Signal (Animation) */}
                 {status === 'running' && (
                    <div className="absolute left-0 w-4 h-4 bg-white rounded-full drop-shadow-[0_0_10px_white] z-30
                       animate-[slideRight_2s_ease-in-out_forwards]">
                    </div>
                 )}
                 {status === 'incorrect' && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 text-red-500 animate-in zoom-in-50 flex items-center justify-center bg-black rounded-full z-30">
                      <X strokeWidth={4} />
                    </div>
                 )}

                 <div className="absolute -top-6 bg-[#1A1A1A] px-2 text-xs font-mono font-bold text-neutral-300 border border-neutral-700 rounded z-20">
                    {runnerSelection[1]?.label || 'Relation'}
                 </div>
              </div>

              {/* Node 3 */}
              <div className="flex flex-col items-center z-20">
                 <div className={`w-24 h-16 border-2 flex items-center justify-center rounded-[50%] bg-[#0A0A0A] transition-all
                    ${runnerSelection[2] ? 'border-white' : 'border-dashed border-neutral-700'}
                    ${status === 'correct' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : ''}`}>
                    <span className="text-sm font-bold">{runnerSelection[2]?.label || 'Use Case'}</span>
                 </div>
              </div>
           </div>

           {/* Controls Bank */}
           <div className="flex w-full gap-4 opacity-100 transition-opacity">
              <div className="flex-1 flex flex-col gap-2">
                <span className="text-xs font-black uppercase text-neutral-600 tracking-widest text-center">Step 1</span>
                {S1.map(o => (
                  <button key={o.id} onClick={()=>selectPart(0, o)} className={`p-2 rounded-lg border-2 text-sm font-bold transition-colors ${runnerSelection[0]?.id===o.id?'border-white bg-[#333]':'border-neutral-700 hover:border-neutral-500'}`}>{o.label}</button>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="text-xs font-black uppercase text-neutral-600 tracking-widest text-center">Step 2</span>
                {S2.map(o => (
                  <button key={o.id} onClick={()=>selectPart(1, o)} className={`p-2 rounded-lg border-2 text-sm font-bold transition-colors ${runnerSelection[1]?.id===o.id?'border-white bg-[#333]':'border-neutral-700 hover:border-neutral-500'}`}>{o.label}</button>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <span className="text-xs font-black uppercase text-neutral-600 tracking-widest text-center">Step 3</span>
                {S3.map(o => (
                  <button key={o.id} onClick={()=>selectPart(2, o)} className={`p-2 rounded-lg border-2 text-sm font-bold transition-colors ${runnerSelection[2]?.id===o.id?'border-white bg-[#333]':'border-neutral-700 hover:border-neutral-500'}`}>{o.label}</button>
                ))}
              </div>
           </div>
        </div>
      )
    }

    // 6. Slider Exploratory
    if (type === 'slider_exploratory') {
      const handleSliderChange = (e) => {
        setSliderVal(parseInt(e.target.value));
        if (status !== 'incorrect' && status !== 'correct') {
          setStatus('ready');
        }
      };

      const isOverloaded = sliderVal > 80;

      return (
        <div className="w-full mt-6 flex flex-col items-center gap-6 relative">
           
           <div className="w-full h-[400px] border-2 border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
              {isOverloaded && <div className="absolute inset-0 bg-red-500/10 blur-3xl transition-opacity duration-1000 pointer-events-none z-10"></div>}
              <InteractiveMap 
                 key={`map_${stepIndex}_${mapResetKey}`}
                 initialNodes={isOverloaded ? currentData.overloadNodes : currentData.normalNodes} 
                 initialEdges={isOverloaded ? currentData.overloadEdges : currentData.normalEdges}
                 allowCreate={false}
                 onChange={(nodes, edges) => {
                   setMapNodes(nodes);
                   setMapEdges(edges);
                 }}
              />
           </div>

           {/* Server Load Indicator */}
           <div className="w-full flex flex-col items-center gap-4 mt-2 max-w-md z-10 bg-[#1A1A1A] p-6 rounded-3xl border border-neutral-800 shadow-xl">
              <div className="flex justify-between w-full text-sm font-black tracking-widest uppercase transition-colors">
                 <span className={isOverloaded ? "text-neutral-500" : "text-green-500"}>Normal</span>
                 <span className={isOverloaded ? 'text-red-500 animate-pulse' : 'text-neutral-400'}>{sliderVal}% Load</span>
                 <span className={isOverloaded ? "text-red-500" : "text-neutral-500"}>Overload</span>
              </div>
              <div className="w-full relative">
                 <input 
                    type="range" min="0" max="100" value={sliderVal} onChange={handleSliderChange}
                    className="w-full h-4 bg-neutral-800 rounded-full appearance-none cursor-pointer outline-none overflow-hidden relative z-20"
                    style={{ background: `linear-gradient(to right, ${isOverloaded ? '#EF4444' : '#22C55E'} ${sliderVal}%, #262626 ${sliderVal}%)` }}
                    disabled={status === 'correct' || status === 'showing_answer'}
                 />
                 {/* 80% Threshold Marker */}
                 <div className="absolute top-0 bottom-0 w-1 bg-white z-30 pointer-events-none" style={{ left: '80%' }}></div>
              </div>
              
              <style dangerouslySetInnerHTML={{__html: `
                input[type=range]::-webkit-slider-thumb {
                  appearance: none; width: 24px; height: 24px; border-radius: 50%; background: white; cursor: pointer; box-shadow: 0 0 10px rgba(0,0,0,0.5);
                }
              `}} />
           </div>
        </div>
      );
    }

    // 7. Ordering 
    if (type === 'ordering') {
      const moveItem = (idx, dir) => {
        if(status === 'correct' || status === 'showing_answer') return;
        const newItems = [...orderItems];
        if (dir === -1 && idx > 0) {
          [newItems[idx], newItems[idx-1]] = [newItems[idx-1], newItems[idx]];
        } else if (dir === 1 && idx < newItems.length - 1) {
          [newItems[idx], newItems[idx+1]] = [newItems[idx+1], newItems[idx]];
        }
        setOrderItems(newItems);
        setStatus('ready');
      };

      return (
        <div className="w-full flex flex-col gap-3 mt-6">
          {orderItems.map((item, idx) => (
            <div key={item.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-colors
               ${(status === 'correct' || status === 'showing_answer') ? (item.correctOrder === idx + 1 ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-neutral-700 bg-[#1A1A1A] hover:border-neutral-500'}
            `}>
              <div className="flex items-center gap-5">
                 <span className="w-8 h-8 rounded bg-[#333] flex items-center justify-center font-black text-white">{idx + 1}</span>
                 <span className="font-bold text-lg">{item.label}</span>
              </div>
              <div className="flex flex-col gap-1">
                 <button onClick={() => moveItem(idx, -1)} disabled={idx === 0 || status === 'correct' || status === 'showing_answer'} className="p-1 hover:bg-white/20 rounded-md transition-colors disabled:opacity-20"><ChevronUp size={22}/></button>
                 <button onClick={() => moveItem(idx, 1)} disabled={idx === orderItems.length - 1 || status === 'correct' || status === 'showing_answer'} className="p-1 hover:bg-white/20 rounded-md transition-colors disabled:opacity-20"><ChevronDown size={22}/></button>
              </div>
            </div>
          ))}
        </div>
      )
    }

    // 8. Block Mapping (Assembly)
    if (type === 'block_mapping') {
      const selectSlot = (opt) => {
        if(status === 'correct' || status === 'showing_answer') return;
        const emptyIdx = mappingSlots.findIndex(s => s === null);
        if(emptyIdx !== -1 && !mappingSlots.find(s => s?.id === opt.id)) {
          const newS = [...mappingSlots];
          newS[emptyIdx] = opt;
          setMappingSlots(newS);
          if (newS.filter(s=>s!==null).length === 3) setStatus('ready');
        }
      };
      const clearSlot = (idx) => {
        if(status === 'correct' || status === 'showing_answer') return;
        const newS = [...mappingSlots];
        newS[idx] = null;
        setMappingSlots(newS);
        setStatus('idle');
      };

      const avail = currentData.options.filter(o => !mappingSlots.find(s=>s?.id === o.id));

      return (
        <div className="w-full flex flex-col items-center gap-12 mt-6 p-8 bg-[#1A1A1A] rounded-3xl border border-neutral-800">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
             {mappingSlots.map((slot, i) => (
                <div key={i} onClick={() => clearSlot(i)} className={`h-16 flex-1 w-full max-w-[180px] border-2 rounded-xl flex items-center justify-center font-bold cursor-pointer transition-colors text-center px-4
                   ${slot ? 'bg-white text-black border-white hover:bg-neutral-200 shadow-md scale-105' : 'border-dashed border-neutral-600 bg-[#222] text-neutral-500'}
                   ${status === 'incorrect' && slot ? 'border-red-500 bg-red-500/20 text-red-500' : ''}
                   ${(status === 'correct' || status === 'showing_answer') && slot ? 'border-green-500 bg-green-500/20 text-green-500' : ''}
                `}>
                   {slot ? slot.label : (i === 0 ? 'Step 1' : i === 1 ? 'Step 2' : 'Step 3')}
                </div>
             ))}
          </div>
          
          <div className="flex gap-4 flex-wrap justify-center w-full p-4 rounded-2xl bg-[#0A0A0A]">
             {avail.length === 0 && <span className="text-neutral-500 italic">Nhấn Kiểm tra để chạy thử...</span>}
             {avail.map(opt => (
                <button key={opt.id} onClick={()=>selectSlot(opt)} className="px-6 py-3 border-2 border-neutral-700 bg-[#222] rounded-full font-bold hover:border-white transition-colors active:scale-95">
                  {opt.label}
                </button>
             ))}
          </div>
        </div>
      )
    }

    // 9. Equation Builder (Skill Check)
    if (type === 'equation_builder') {
      const addToken = (tok) => {
        const idx = eqSlots.findIndex(s => s === null);
        if(idx !== -1) {
          const newSlots = [...eqSlots];
          newSlots[idx] = tok;
          setEqSlots(newSlots);
          if(newSlots.filter(s=>s!==null).length === 3) setStatus('ready');
        }
      };
      const removeToken = (idx) => {
        if(status !== 'idle' && status !== 'ready' && status !== 'skill_check_incorrect') return;
        const newSlots = [...eqSlots];
        newSlots[idx] = null;
        setEqSlots(newSlots);
        setStatus('idle');
      };

      const availableTokens = currentData.options.filter(opt => !eqSlots.find(s => s?.id === opt.id));

      return (
        <div className="w-full flex flex-col items-center mt-10 gap-12">
          <div className="flex gap-4 items-center justify-center w-full">
            {eqSlots.map((slot, i) => (
               <div key={i} onClick={() => removeToken(i)} className={`h-16 flex-1 max-w-[140px] border-2 rounded-xl flex items-center justify-center text-center px-2 font-bold transition-all
                  ${slot ? 'bg-white text-black border-white cursor-pointer hover:bg-neutral-200' : 'border-dashed border-neutral-700 bg-neutral-900/50'}
                  ${status === 'skill_check_incorrect' && slot ? 'border-red-500 bg-red-500/20 text-red-400' : ''}
                  ${status === 'correct' && slot ? 'border-green-500 bg-green-500/20 text-green-400' : ''}
               `}>
                 {slot ? slot.label : ''}
               </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center w-full">
             {availableTokens.map(opt => (
                <button key={opt.id} onClick={() => addToken(opt)} disabled={status !== 'idle' && status !== 'ready' && status !== 'skill_check_incorrect'} 
                   className="px-6 py-3 border-2 border-neutral-600 rounded-full font-bold text-neutral-300 hover:border-white hover:text-white transition-colors disabled:opacity-20">
                   {opt.label}
                </button>
             ))}
          </div>
          
           {status === 'skill_check_incorrect' && (
             <div className="w-full p-4 border border-green-500/30 bg-green-900/20 rounded-xl flex flex-col items-center justify-center gap-2 text-green-400 font-bold animate-in fade-in mt-4">
                <span className="text-sm uppercase tracking-widest text-green-500">Correct Sequence</span>
                <span className="text-lg">{currentData.correctSequence?.map(id => currentData.options?.find(o=>o.id===id)?.label).join(' ➔ ')}</span>
             </div>
          )}
        </div>
      )
    }

    if (type === 'map_interaction') {
      return (
        <div className="w-full h-[550px] mt-6 border-2 border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
           <InteractiveMap 
             key={`map_${stepIndex}_${mapResetKey}`}
             initialNodes={currentData.initialNodes} 
             initialEdges={currentData.initialEdges}
             allowCreate={false}
             onChange={(nodes, edges) => {
               setMapNodes(nodes);
               setMapEdges(edges);
               if (status === 'idle' || status === 'incorrect') {
                 setStatus('ready');
               }
             }}
           />
        </div>
      );
    }

    // Fallback block mapping...
    return <div className="text-neutral-500 mt-10 italic">Interaction Type `{type}` rendering is simplified.</div>;
  };

  const renderBottomBar = () => {
    return (
      <LessonBottomBar
        phase={globalPhase}
        status={status}
        isTheory={false}
        hasExplanation={!!currentData?.explanation}
        hint={hint}
        isModalOpen={isModalOpen}
        hasViewedExplanation={hasViewedExplanation}
        isLastStep={stepIndex === LESSON_DATA.length - 1}
        mascotState={getMascotState()}
        onCheck={handleCheck}
        onNext={handleNext}
        onTryAgain={() => { setStatus('idle'); setHasTried(true); }}
        onSeeAnswer={() => setStatus('showing_answer')}
        onOpenModal={() => { setIsModalOpen(true); if (status === 'showing_answer' || status === 'skill_check_incorrect') setHasViewedExplanation(true); }}
      />
    );
  };

  const styles = `
    body { background-color: #0A0A0A; color: white; margin: 0; }
    @keyframes dropIn { 0% { transform: translateY(-100vh); opacity: 0; } 30% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
    @keyframes splashUp { 0% { transform: translateY(100vh) scale(0.5); opacity: 0; } 20% { transform: translateY(0) scale(1); opacity: 1; } 80% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
    @keyframes slideRight { 0% { left: 0; opacity: 1; } 50% { left: 50%; opacity: 1; } 100% { left: 100%; opacity: 0; } }
    @keyframes floatDownFadeXP { 0% { opacity: 0; transform: translateY(-10px) scale(0.8); } 20% { opacity: 1; transform: translateY(5px) scale(1.1); } 80% { opacity: 1; transform: translateY(15px) scale(1); } 100% { opacity: 0; transform: translateY(25px) scale(0.9); } }
    @keyframes shakeScreen { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-5px); } 40%, 80% { transform: translateX(5px); } }
  `;

  return (
    <div className="h-screen bg-[#000] text-white font-sans overflow-hidden flex flex-col relative selection:bg-green-500/30 p-2 md:p-3">
      <style>{styles}</style>
      {/* Intro Overlay */}
      {globalPhase === 'intro' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
          <div className="flex flex-col items-center animate-[dropIn_2.5s_ease-in-out_forwards]">
             <div className="w-16 h-64 bg-gradient-to-t from-green-500/40 to-transparent blur-md -mb-16 rounded-t-full"></div>
             <div className="z-10"><Mascot state="entry" size="scale-100" /></div>
          </div>
        </div>
      )}

      {/* Skill Check Splash */}
      {globalPhase === 'skill_check_splash' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] backdrop-blur-sm">
          <div className="flex flex-col items-center animate-[splashUp_2.5s_ease-in-out_forwards]">
             <Mascot state="skill_check" size="scale-125" />
             <h2 className="text-2xl font-bold mt-6 tracking-wide text-white drop-shadow-md z-10">Skill check</h2>
          </div>
        </div>
      )}

      {/* Top Navigation Bar (NOW OUTSIDE FRAME) */}
      {(globalPhase === 'lesson' || globalPhase === 'skill_check') && (
        <header className="flex items-center justify-center px-4 py-4 z-40 relative w-full shrink-0">
          <button onClick={() => setIsQuitModalOpen(true)} className="absolute left-6 text-neutral-500 hover:text-white transition-colors"><X size={26} strokeWidth={3} /></button>
          
          <div className="flex-1 mx-16 max-w-xl flex items-center h-3 bg-neutral-800 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-[#4ADE80] transition-all duration-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ width: `${progressPercent}%` }}></div>
            {LESSON_DATA.map((_, i) => <div key={i} className="flex-1 border-r-[4px] border-[#0a0a0a] h-full z-10 last:border-r-0"></div>)}
          </div>

          <div className="absolute right-6 flex items-center gap-5 font-bold text-lg text-neutral-300">
            {/* XP Sparkles */}
            <div className="flex items-center gap-1.5 relative">
               <span className="animate-in slide-in-from-bottom-1 fade-in text-blue-100/90" key={xp}>{xp}</span>
               <Sparkles size={22} className="text-green-400" fill="currentColor" />
               
               {xpAddedAnim !== null && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 text-green-400 font-black text-xl pointer-events-none drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] z-50 flex items-center whitespace-nowrap" style={{ animation: 'floatDownFadeXP 1.5s ease-out forwards' }}>
                     +{xpAddedAnim}
                  </div>
               )}
            </div>

            {/* Streak Lightning */}
            <div className="relative">
               <button onClick={() => setIsStreakPopupOpen(!isStreakPopupOpen)} className="flex items-center hover:scale-110 active:scale-95 transition-transform">
                  <Zap size={24} className="text-[#D9F93F]" fill="currentColor" stroke="none" />
               </button>
               
               {isStreakPopupOpen && (
                  <div className="absolute top-12 right-0 w-64 bg-[#222] border border-neutral-700 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 animate-in fade-in slide-in-from-top-2">
                     <div className="absolute -top-2 right-2 w-4 h-4 rotate-45 bg-[#222] border-t border-l border-neutral-700"></div>
                     <h3 className="text-xl font-bold text-white text-center mb-1">Nice work today!</h3>
                     <p className="text-neutral-400 text-center mb-5 text-sm">Keep it up.</p>
                     <div className="flex justify-center gap-2">
                        <div className="bg-[#D9F93F] text-black px-1.5 py-1 rounded-sm"><Zap size={20} fill="currentColor" stroke="none" /></div>
                        <div className="bg-[#D9F93F] text-black px-1.5 py-1 rounded-sm"><Zap size={20} fill="currentColor" stroke="none" /></div>
                     </div>
                  </div>
               )}
            </div>
          </div>
        </header>
      )}

      {/* FRAME */}
      <div className={`flex-1 rounded-[2rem] border-2 flex flex-col relative transition-all duration-300 bg-[#0a0a0a] mx-2 md:mx-6 mt-2 md:mt-4 mb-4 md:mb-8
          ${(status === 'incorrect' || status === 'skill_check_incorrect') ? 'border-[#ca8a04] animate-[shakeScreen_0.4s_ease-in-out]' : ''}
          ${status === 'correct' ? 'border-[#4ADE80] shadow-[0_0_40px_rgba(74,222,128,0.15)]' : ''}
          ${(status === 'idle' || status === 'ready' || status === 'showing_answer') ? 'border-neutral-800' : ''}
      `}>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative max-w-3xl mx-auto w-full px-6 pt-10 md:pt-14 pb-40 z-10 overflow-y-auto custom-scrollbar">
        
        {/* Completion Screen */}
        {globalPhase === 'complete' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
             <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                <div className="absolute -top-32 w-[200%] h-64 bg-gradient-to-b from-white/20 to-transparent blur-2xl clip-path-polygon-[20%_0,80%_0,100%_100%,0_100%]"></div>
                <div className="absolute top-10 animate-bounce z-10"><Mascot state="course_complete" size="scale-100" /></div>
             </div>
             <h1 className="text-4xl font-black mb-2">Lesson complete!</h1>
             <p className="text-neutral-400 text-sm font-bold tracking-widest uppercase mb-1 mt-6">Total XP</p>
             <div className="flex items-center gap-2 text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {xp} <Zap size={44} className="text-yellow-500" fill="currentColor" />
             </div>
          </div>
        )}

        {(globalPhase === 'lesson' || globalPhase === 'skill_check') && currentData && (
          <div className="flex-1 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pt-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center leading-relaxed">{currentData.title}</h1>
            {currentData.question && <p className="text-neutral-400 text-center mb-8">{currentData.question}</p>}
            {renderInteraction()}
          </div>
        )}
      </main>

      {(globalPhase === 'lesson' || globalPhase === 'skill_check' || globalPhase === 'complete') && renderBottomBar()}
      </div>

      {/* Explanation Modal */}
      {isModalOpen && currentData?.explanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#18181b] w-full max-w-lg rounded-[2rem] border border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 pb-2">
              <h3 className="text-xl font-bold">Giải thích chi tiết</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white p-1 rounded-full hover:bg-neutral-800"><X size={24} /></button>
            </div>
            
            <div className="p-8 pt-4 flex-1 min-h-[150px] flex items-center">
              <p className="text-neutral-200 leading-relaxed text-lg text-center w-full">{currentData.explanation[modalPage].text}</p>
            </div>

            {currentData.explanation.length > 1 && (
              <div className="flex items-center justify-between p-4 bg-black/20 border-t border-neutral-800">
                <button onClick={() => setModalPage(p => Math.max(0, p - 1))} className={`p-2 rounded-full hover:bg-neutral-800 ${modalPage === 0 ? 'opacity-30 cursor-not-allowed' : ''}`} disabled={modalPage === 0}><ChevronLeft size={24} /></button>
                <div className="flex gap-2">{currentData.explanation.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === modalPage ? 'bg-white' : 'bg-neutral-700'}`}></div>)}</div>
                <button onClick={() => setModalPage(p => Math.min(currentData.explanation.length - 1, p + 1))} className={`p-2 rounded-full hover:bg-neutral-800 ${modalPage === currentData.explanation.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`} disabled={modalPage === currentData.explanation.length - 1}><ChevronRight size={24} /></button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quit Modal */}
      {isQuitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1f1f1f] w-full max-w-[400px] rounded-[2rem] p-8 pb-6 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-200 border border-neutral-800">
             <h3 className="text-2xl font-black text-white tracking-wide mb-2">Are you sure?</h3>
             <p className="text-neutral-300 font-medium text-center mb-8">If you quit, you will lose your progress and XP.</p>
             <button onClick={() => setIsQuitModalOpen(false)} className="w-full bg-[#E5E5E5] hover:bg-white text-black font-bold text-[17px] py-4 rounded-2xl mb-4 transition-colors shadow-[0_4px_0_#b3b3b3] active:translate-y-1 active:shadow-[0_0_0_#b3b3b3]">Keep learning</button>
             <Link to="/dashboard" className="text-[#ff5b5b] font-bold text-lg hover:text-red-400 transition-colors uppercase tracking-widest pt-2">Quit</Link>
          </div>
        </div>
      )}
      
    </div>
  );
}