// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { X, Zap, CheckCircle2, AlertCircle, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play } from 'lucide-react';

import Mascot from '../components/Mascot';



const LESSON_DATA = [
  {
    id: 1,
    phase: 'learning',
    type: 'interactive',
    interactionType: 'true_false', 
    title: 'Khởi động tư duy',
    question: '"Một Actor trong Use Case Diagram luôn luôn phải là con người (nhân viên, khách hàng)."',
    options: [
      { id: 't', label: 'Đúng vậy', isCorrect: false, hint: 'Máy móc, cảm biến, hay một hệ thống phần mềm khác có tương tác với hệ thống của bạn không?' },
      { id: 'f', label: 'Không chính xác', isCorrect: true, hint: '' }
    ],
    explanation: [{ text: "Actor đại diện cho BẤT KỲ thực thể ngoại vi nào tương tác với hệ thống. Nó có thể là con người, hoặc một API máy chủ khác, cảm biến thời tiết, v.v.", img: null }]
  },
  {
    id: 2,
    phase: 'learning',
    type: 'interactive',
    interactionType: 'drag_to_bins',
    title: 'Phân loại Đối tượng',
    question: 'Chạm/Kéo thả các thành phần vào đúng giỏ phân loại của nó.',
    options: [
      { id: 't1', label: 'Khách hàng', correctBin: 'actor' },
      { id: 't2', label: 'Thanh toán đơn hàng', correctBin: 'usecase' },
      { id: 't3', label: 'Cổng thanh toán Momo', correctBin: 'actor' },
      { id: 't4', label: 'Đăng nhập', correctBin: 'usecase' }
    ],
    bins: [
      { id: 'actor', label: 'Actor (Tác nhân)' },
      { id: 'usecase', label: 'Use Case (Chức năng)' }
    ],
    explanation: [{ text: "Actor là các danh từ chỉ đối tượng giao tiếp với hệ thống (Khách hàng, Cổng Momo). Use Case là các cụm Động từ + Danh từ thể hiện chức năng hệ thống thực hiện.", img: null }]
  },
  {
    id: 3,
    phase: 'learning',
    type: 'interactive',
    interactionType: 'text_highlight',
    title: 'Phân tích Yêu cầu',
    question: 'Hãy chạm để chọn (highlight) các cụm từ thể hiện Use Case trong đoạn văn sau:',
    textChunks: [
      { id: 'c1', text: 'Hệ thống ứng dụng cho phép ', isCorrect: false },
      { id: 'c2', text: 'người dùng', isCorrect: false },
      { id: 'c3', text: ' có thể ', isCorrect: false },
      { id: 'c4', text: 'Đăng ký tài khoản', isCorrect: true },
      { id: 'c5', text: ' mới. Sau khi vào màn hình chính, họ tiến hành ', isCorrect: false },
      { id: 'c6', text: 'Tìm kiếm sản phẩm', isCorrect: true },
      { id: 'c7', text: ' theo danh mục để mua sắm.', isCorrect: false }
    ],
    explanation: [{ text: "Việc phân tích văn bản rất quan trọng. Những hành động mang lại giá trị trực tiếp cho người dùng như 'Đăng ký tài khoản' hay 'Tìm kiếm sản phẩm' sẽ trở thành Use Case.", img: null }]
  },
  {
    id: 4,
    phase: 'learning',
    type: 'interactive',
    interactionType: 'click_connect',
    title: 'Thiết lập Liên kết (Association)',
    question: 'Chạm 1 điểm bên trái và 1 điểm bên phải để nối các Actor với Use Case hợp lý.',
    leftNodes: [
      { id: 'a1', label: 'Khách hàng' },
      { id: 'a2', label: 'Quản trị viên' }
    ],
    rightNodes: [
      { id: 'u1', label: 'Xóa tài khoản người dùng' },
      { id: 'u2', label: 'Xem lịch sử mua hàng' }
    ],
    correctPairs: [{ from: 'a1', to: 'u2' }, { from: 'a2', to: 'u1' }],
    explanation: [{ text: "Đường Association (liên kết cơ bản) thể hiện việc Actor đó có quyền kích hoạt hoặc tham gia vào Use Case tương ứng.", img: null }]
  },
  {
    id: 5,
    phase: 'learning',
    type: 'interactive',
    interactionType: 'slider_exploratory', 
    title: 'Simulating Exceptional Flows (<<extend>>)',
    question: 'Kéo thanh tải trọng server. Quan sát khi nào chức năng ngoại lệ được kích hoạt.',
    explanation: [{ text: "<<extend>> relationships được sử dụng cho các luồng rẽ nhánh, lỗi, hoặc hành vi tùy chọn chỉ xảy ra trong điều kiện cụ thể (như server bị quá tải).", img: null }]
  },
  {
    id: 6,
    phase: 'learning',
    type: 'interactive',
    interactionType: 'ordering', 
    title: 'Trình tự Thiết kế Hệ thống',
    question: 'Sắp xếp các bước từ trên (đầu tiên) xuống dưới (cuối cùng).',
    options: [
      { id: 'o1', label: 'Xác định Ranh giới Hệ thống (Boundary)', correctOrder: 1 },
      { id: 'o2', label: 'Xác định Primary Actors', correctOrder: 2 },
      { id: 'o3', label: 'Định nghĩa Core Use Cases', correctOrder: 3 },
      { id: 'o4', label: 'Khai báo Include/Extend', correctOrder: 4 }
    ],
    explanation: [{ text: "Tư duy đúng: Bạn phải biết mình xây cái gì (Ranh giới), cho ai dùng (Actor), làm được gì (Use Case), rồi mới tối ưu luồng (Include/Extend).", img: null }]
  },
  {
    id: 7,
    phase: 'learning',
    type: 'interactive',
    interactionType: 'block_mapping', 
    title: 'Biên dịch Sơ đồ thành Kiến trúc',
    question: 'Lắp ráp các khối để hoàn thiện luồng tương tác.',
    options: [
      { id: 'b1', label: 'Khách hàng' },
      { id: 'b2', label: '— Association —' },
      { id: 'b3', label: 'Duyệt Catalog' }
    ],
    correctSequence: ['b1', 'b2', 'b3'],
    explanation: [{ text: "Actor giao tiếp trực tiếp với Use Case thông qua một đường Association đơn giản không có mũi tên.", img: null }]
  },
  {
    id: 8,
    phase: 'learning',
    type: 'interactive',
    interactionType: 'map_runner',
    title: 'Mô phỏng Luồng chạy (Sandbox)',
    question: 'Chọn thành phần để tạo luồng. Nhấn Kiểm tra để "Run" thử sơ đồ của bạn!',
    options: {
      step1: [{id: 'act1', label: 'User', type: 'actor'}],
      step2: [
        {id: 'rel1', label: 'Association', type: 'association'},
        {id: 'rel2', label: '<<include>>', type: 'include'}
      ],
      step3: [{id: 'uc1', label: 'Login', type: 'usecase'}]
    },
    correctSequence: ['act1', 'rel1', 'uc1'],
    explanation: [{ text: "Actor phải được nối với Use Case bằng đường Association. Ký hiệu <<include>> chỉ được dùng để nối 2 Use Case với nhau, không nối với Actor!", img: null }]
  },
  {
    id: 9,
    phase: 'skill_check', 
    type: 'interactive',
    interactionType: 'equation_builder', 
    title: 'Quy tắc Ràng buộc (Skill Check)',
    question: 'Lắp ráp công thức: Một user không thể "Checkout" mà không qua "Process Payment".',
    options: [
      { id: 'e1', label: 'Checkout', type: 'usecase' },
      { id: 'e2', label: '<<include>>', type: 'relation' },
      { id: 'e3', label: '<<extend>>', type: 'relation' },
      { id: 'e4', label: 'Process Payment', type: 'usecase' },
    ],
    correctSequence: ['e1', 'e2', 'e4'],
    explanation: [{ text: "Checkout phụ thuộc hoàn toàn vào Process Payment để hoàn tất. Sự phụ thuộc bắt buộc này phải dùng <<include>>.", img: null }]
  },
  {
    id: 10,
    phase: 'skill_check',
    type: 'interactive',
    interactionType: 'mcq', 
    title: 'Bản chất Ranh giới (Skill Check)',
    question: 'Chức năng cốt lõi của System Boundary là gì?',
    options: [
      { id: 'm1', label: 'Gom nhóm các Actor lại với nhau để dễ nhìn.', isCorrect: false },
      { id: 'm2', label: 'Tách biệt rạch ròi trách nhiệm của phần mềm (bên trong) với môi trường (bên ngoài).', isCorrect: true },
      { id: 'm3', label: 'Xác định các server vật lý chứa dữ liệu.', isCorrect: false }
    ],
    explanation: [{ text: "System Boundary là một ranh giới khái niệm. Mọi Use Case (bên trong) là phần code bạn phải viết. Mọi Actor (bên ngoài) là những thứ bạn không kiểm soát được.", img: null }]
  }
];

export default function AdvancedLessonPlayer() {
  const [globalPhase, setGlobalPhase] = useState('intro'); // intro, lesson, skill_check_splash, skill_check, complete
  const [stepIndex, setStepIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [hasTried, setHasTried] = useState(false);
  
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

  const currentData = LESSON_DATA[stepIndex];
  const progressPercent = (stepIndex / LESSON_DATA.length) * 100;

  useEffect(() => {
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
    } else if (type === 'click_connect') {
      const correctPairs = currentData.correctPairs;
      if (connections.length !== correctPairs.length) {
        isCorrect = false;
      } else {
        isCorrect = correctPairs.every(cp => 
          connections.some(conn => conn.from === cp.from && conn.to === cp.to)
        );
      }
      currentHint = 'Kết nối không hợp lý. Hãy xem ai có thẩm quyền thực hiện chức năng nào.';
    } else if (type === 'map_runner') {
      const userIds = runnerSelection.map(s => s?.id);
      isCorrect = JSON.stringify(userIds) === JSON.stringify(currentData.correctSequence);
      currentHint = 'Đường truyền lỗi! Không thể dùng <<include>> để nối Actor với phần mềm.';
      
      // Sandbox Runner Animation Trigger
      setStatus('running');
      setTimeout(() => {
        if (isCorrect) {
          setStatus('correct');
          if (!hasTried && globalPhase === 'lesson') setXp(p => p + 10);
        } else {
          setStatus('incorrect');
          setHint(currentHint);
          setHasTried(true);
        }
      }, 2000);
      return;
    }

    if (isCorrect) {
      setStatus('correct');
      if (!hasTried && globalPhase === 'lesson') setXp(p => p + 15);
      if (globalPhase === 'skill_check') setXp(p => p + 25);
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
    // Do NOT reset hasViewedExplanation here so it persists logic, actually wait, reset it for new question.
    setHasViewedExplanation(false); 

    if (stepIndex < LESSON_DATA.length - 1) {
      const nextData = LESSON_DATA[stepIndex + 1];
      if (nextData.phase === 'skill_check' && currentData.phase === 'learning') {
        setGlobalPhase('skill_check_splash');
      }
      setStepIndex(p => p + 1);
    } else {
      setGlobalPhase('complete');
    }
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
        <div className="w-full mt-6 flex flex-col items-center gap-12 bg-[#1A1A1A] p-8 rounded-3xl border border-neutral-800 relative overflow-hidden">
           {/* Glow Effect */}
           {isOverloaded && <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-3xl transition-opacity duration-1000"></div>}
           
           {/* Visualizer */}
           <div className="flex flex-col items-center justify-center w-full relative h-40 z-10">
              {/* Connection Line */}
              <svg className="absolute w-full h-full pointer-events-none top-0 left-0" style={{ zIndex: -1 }}>
                 <path d="M 50% 50% Q 65% 25% 80% 25%" fill="none" stroke={isOverloaded ? '#EAB308' : '#333'} strokeWidth="3" strokeDasharray="6 6" className="transition-all duration-700" />
              </svg>

              {/* Base Use Case */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 bg-[#0A0A0A] p-2 rounded-[50%]">
                 <div className="w-32 h-16 border-2 border-white rounded-[50%] flex items-center justify-center bg-[#222] font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    Checkout
                 </div>
              </div>

              {/* Extend Branch */}
              <div className={`absolute top-0 right-[5%] flex flex-col items-center transition-all duration-700 origin-bottom-left
                  ${isOverloaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`}>
                 <div className="text-xs font-mono text-yellow-500 mb-1 font-bold bg-[#1A1A1A] px-2 rounded">&lt;&lt;extend&gt;&gt;</div>
                 <div className="w-36 h-16 border-2 border-dashed border-yellow-500 rounded-[50%] flex items-center justify-center font-bold text-center text-sm px-2 bg-yellow-500/10 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                    Show Error
                 </div>
              </div>
           </div>

           {/* Server Load Indicator */}
           <div className="w-full flex flex-col items-center gap-4 mt-4 max-w-md z-10">
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
                <span className="text-lg">{currentData.correctSequence.map(id => currentData.options.find(o=>o.id===id).label).join(' ➔ ')}</span>
             </div>
          )}
        </div>
      )
    }

    // Fallback block mapping...
    return <div className="text-neutral-500 mt-10 italic">Interaction Type `{type}` rendering is simplified.</div>;
  };

  const renderBottomBar = () => {
    return (
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent z-40 flex items-end justify-between max-w-4xl mx-auto right-0">
        
        {/* Left Side: Mascot & Hints */}
        <div className="flex items-end relative w-1/2 min-h-[80px]">
          {globalPhase === 'lesson' && (
            <div className="relative">
              <div className="absolute -top-32 -left-8 w-24 h-24 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-[bounce_3s_infinite]">
                <Mascot state={status === 'correct' ? 'correct' : status === 'incorrect' ? 'hint' : status === 'showing_answer' ? 'explaining' : 'path_idle'} size="scale-100" />
              </div>
              
              {/* Floating Tooltips based on state */}
              {(status === 'incorrect' || status === 'showing_answer') && (
                <div className={`absolute bottom-full left-1/2 mb-4 w-64 p-4 rounded-2xl text-sm font-bold shadow-xl animate-in slide-in-from-bottom-2 fade-in
                  ${status === 'incorrect' ? 'bg-yellow-500 text-black' : 'bg-[#222] text-white border border-neutral-700'}`}>
                  <div className={`absolute -bottom-2 left-6 w-4 h-4 rotate-45 ${status === 'incorrect' ? 'bg-yellow-500' : 'bg-[#222] border-b border-r border-neutral-700'}`}></div>
                  {status === 'incorrect' && hint}
                  {status === 'showing_answer' && "Đây là đáp án chính xác."}
                </div>
              )}
              {status === 'correct' && (
                <div className="absolute bottom-full left-1/2 mb-4 w-32 p-3 rounded-2xl text-sm font-bold bg-green-600 text-white shadow-xl animate-in slide-in-from-bottom-2 fade-in text-center">
                  <div className="absolute -bottom-2 left-6 w-4 h-4 rotate-45 bg-green-600"></div>
                  Tuyệt vời!
                </div>
              )}
            </div>
          )}

          {globalPhase === 'skill_check' && status !== 'idle' && status !== 'ready' && status !== 'running' && (
            <div className="flex items-center gap-3 mb-2 animate-in fade-in">
              {status === 'correct' ? (
                <><CheckCircle2 size={24} className="text-green-500" /> <span className="font-bold text-lg text-green-500">Chính xác</span></>
              ) : (
                <><AlertCircle size={24} className="text-red-500" /> <span className="font-bold text-lg text-red-500">Chưa đúng</span></>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-3 w-1/2 justify-end">
          
          {status === 'idle' && (
            <button disabled className="px-10 py-3.5 rounded-full font-black text-lg bg-[#222] text-neutral-500 cursor-not-allowed">Check</button>
          )}

          {status === 'ready' && (
            <button onClick={handleCheck} className="px-10 py-3.5 rounded-full font-black text-lg bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2">
              {currentData?.interactionType === 'map_runner' && <Play size={20} fill="currentColor" />}
              Check
            </button>
          )}

          {status === 'running' && (
            <button disabled className="px-10 py-3.5 rounded-full font-black text-lg bg-white text-black opacity-80 cursor-wait">
              Running...
            </button>
          )}

          {status === 'correct' && (
            <>
              {currentData?.explanation && (
                 <button onClick={() => { setIsModalOpen(true); setHasViewedExplanation(true); }} className="px-6 py-3.5 rounded-full font-bold text-[#AAA] hover:text-white bg-[#222] transition-colors">Why?</button>
              )}
              <button onClick={handleNext} className="px-10 py-3.5 rounded-full font-black text-lg bg-green-500 text-black hover:bg-green-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                {globalPhase === 'skill_check' && stepIndex === LESSON_DATA.length - 1 ? 'Finish' : 'Continue'}
              </button>
            </>
          )}

          {status === 'incorrect' && globalPhase === 'lesson' && (
            <>
              <button onClick={() => setStatus('showing_answer')} className="px-6 py-3.5 rounded-full font-bold text-white bg-[#333] hover:bg-[#444] transition-colors">See answer</button>
              <button onClick={() => { setStatus('idle'); setHasTried(true); }} className="px-10 py-3.5 rounded-full font-black text-lg bg-yellow-500 text-black hover:bg-yellow-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)]">Try again</button>
            </>
          )}

          {status === 'showing_answer' && (
            <>
              <button onClick={() => { setIsModalOpen(true); setHasViewedExplanation(true); }} className="px-6 py-3.5 rounded-full font-bold text-white bg-transparent border-2 border-neutral-700 hover:border-neutral-500 transition-colors">Why?</button>
              {/* If viewed explanation, lock it to "Continue". Else allow "Skip" */}
              <button onClick={handleNext} className={`px-10 py-3.5 rounded-full font-black text-lg active:scale-95 transition-all ${hasViewedExplanation ? 'bg-white text-black' : 'bg-[#333] text-white hover:bg-[#444]'}`}>
                {hasViewedExplanation ? 'Continue' : 'Skip explanation'}
              </button>
            </>
          )}

          {status === 'skill_check_incorrect' && (
            <>
              {currentData?.explanation && (
                 <button onClick={() => { setIsModalOpen(true); setHasViewedExplanation(true); }} className="px-6 py-3.5 rounded-full font-bold text-[#AAA] hover:text-white bg-[#222] transition-colors">Why?</button>
              )}
              <button onClick={handleNext} className="px-10 py-3.5 rounded-full font-black text-lg bg-[#222] text-white border border-neutral-700 hover:bg-[#333] active:scale-95 transition-all">
                {stepIndex === LESSON_DATA.length - 1 ? 'Finish' : 'Continue'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const styles = `
    body { background-color: #0A0A0A; color: white; margin: 0; }
    @keyframes dropIn { 0% { transform: translateY(-100vh); opacity: 0; } 30% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
    @keyframes splashUp { 0% { transform: translateY(100vh) scale(0.5); opacity: 0; } 20% { transform: translateY(0) scale(1); opacity: 1; } 80% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
    @keyframes slideRight { 0% { left: 0; opacity: 1; } 50% { left: 50%; opacity: 1; } 100% { left: 100%; opacity: 0; } }
  `;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden flex flex-col relative selection:bg-green-500/30">
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

      {/* Top Navigation Bar */}
      {(globalPhase === 'lesson' || globalPhase === 'skill_check') && (
        <header className="flex items-center justify-between px-4 py-4 z-40 relative max-w-5xl mx-auto w-full">
          <button className="text-neutral-500 hover:text-white transition-colors"><X size={24} /></button>
          
          <div className="flex-1 mx-8 max-w-xl flex items-center h-2.5 bg-neutral-800 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ width: `${progressPercent}%` }}></div>
            {LESSON_DATA.map((_, i) => <div key={i} className="flex-1 border-r-4 border-[#0A0A0A] h-full z-10 last:border-r-0"></div>)}
          </div>

          <div className="flex items-center gap-1.5 font-bold text-lg text-neutral-300">
            <span className="animate-in slide-in-from-bottom-1 fade-in" key={xp}>{xp}</span>
            <Zap size={22} className="text-yellow-500" fill="currentColor" />
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative max-w-3xl mx-auto w-full px-6 pt-4 pb-40 z-10">
        
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
             <button onClick={()=>window.location.reload()} className="mt-12 px-14 py-4 rounded-full font-black text-lg bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">Continue</button>
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

      {(globalPhase === 'lesson' || globalPhase === 'skill_check') && renderBottomBar()}

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
      
    </div>
  );
}