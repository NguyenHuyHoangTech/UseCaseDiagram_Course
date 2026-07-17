import { useState, useEffect } from 'react';
import { X, Zap, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Mascot from '../components/Mascot';

const DumbbellSVG = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
    <rect x="20" y="45" width="60" height="10" fill="#4b5563" />
    <rect x="10" y="25" width="20" height="50" rx="4" fill="#374151" />
    <rect x="70" y="25" width="20" height="50" rx="4" fill="#374151" />
    <rect x="5" y="35" width="10" height="30" rx="2" fill="#1f2937" />
    <rect x="85" y="35" width="10" height="30" rx="2" fill="#1f2937" />
  </svg>
);

const PurpleGemSVG = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_10px_30px_rgba(168,85,247,0.6)]">
    <polygon points="50,5 95,30 50,95 5,30" fill="#a855f7" />
    <polygon points="50,5 95,30 50,45 5,30" fill="#d8b4fe" />
    <polygon points="50,5 75,30 50,95 25,30" fill="#9333ea" />
    <polygon points="50,45 95,30 50,95" fill="#7e22ce" />
  </svg>
);

const ShieldSVG = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_10px_20px_rgba(217,119,6,0.3)]">
    <path d="M50 10 C50 10 85 15 85 45 C85 75 50 95 50 95 C50 95 15 75 15 45 C15 15 50 10 50 10 Z" fill="#D97706" />
    <path d="M50 15 C50 15 80 20 80 45 C80 70 50 88 50 88 C50 88 20 70 20 45 C20 20 50 15 50 15 Z" fill="#F59E0B" />
    <circle cx="50" cy="45" r="15" fill="#FFF" opacity="0.9" />
    <path d="M40 48 L60 48 M45 42 L55 42 L55 54 L45 54 Z" stroke="#F59E0B" strokeWidth="2" fill="#F59E0B" />
  </svg>
);

const REVIEW_DATA = [
  {
    id: 1,
    type: 'visual-select',
    question: "Bạn đang thiết kế hệ thống web TTKPianoCenter. Hãy chạm để chọn thực thể bắt buộc phải nằm BÊN TRONG ranh giới hệ thống (System Boundary).",
    elements: [
      { id: 'e1', label: 'Khách hàng mua đàn', shape: 'actor', isCorrect: false },
      { id: 'e2', label: 'Bộ lọc AuthenFilter', shape: 'box', isCorrect: true },
      { id: 'e3', label: 'Cổng thanh toán VNPay', shape: 'server', isCorrect: false }
    ],
    explanation: [
      { text: "Khách hàng và Cổng thanh toán là các tác nhân ngoại vi (Actors).", img: null },
      { text: "Bộ lọc AuthenFilter là các đoạn mã xử lý logic bên trong web app do bạn viết, do đó nó nằm hoàn toàn bên trong ranh giới trách nhiệm của hệ thống.", img: null }
    ]
  },
  {
    id: 2,
    type: 'fill-nodes',
    question: "Lắp ráp đúng vị trí Trái - Phải cho luồng chức năng 'Cập nhật danh mục đàn' dựa trên mô hình MVC.",
    diagram: { center: 'Cập nhật danh mục đàn' },
    options: [
      { id: 'opt_admin', label: 'Quản trị viên' },
      { id: 'opt_db', label: 'Cơ sở dữ liệu Relational DB' }
    ],
    correctAnswer: { left: 'opt_admin', right: 'opt_db' },
    explanation: [
      { text: "Quản trị viên là người chủ động gửi request (thông qua View/Servlet) nên đóng vai trò Primary Actor (Bên trái).", img: null },
      { text: "Database Server là hệ thống lưu trữ bị động chờ truy vấn thông qua JDBC, nên đóng vai trò Secondary Actor (Bên phải).", img: null }
    ]
  },
  {
    id: 3,
    type: 'mcq',
    question: "Hệ thống TTKPianoCenter có một luồng tự động: Quét và hủy các đơn hàng chưa thanh toán sau 24h. Ai là Primary Actor khởi tạo Use Case 'Hủy đơn hàng' này?",
    options: [
      { id: 'A', label: "Nhân viên kho (Họ chỉ xem kết quả, không khởi tạo).", isCorrect: false },
      { id: 'B', label: "Khách hàng (Họ không thao tác hủy).", isCorrect: false },
      { id: 'C', label: "Thời gian / Time Trigger", isCorrect: true }
    ],
    explanation: [{ text: "Không có con người nào bấm nút hủy ở đây cả. Hệ thống tự động đếm lùi 24h, do đó Thời gian (Time) chính là tác nhân chủ động đánh thức hệ thống.", img: null }]
  },
  {
    id: 4,
    type: 'visual-select',
    question: "Bản thiết kế Use Case cho tính năng 'Đăng nhập' dưới đây có một liên kết vi phạm nghiêm trọng quy tắc UML. Hãy chạm để cắt đứt nó!",
    elements: [
      { id: 'c1', label: 'Người dùng ➔ Đăng nhập', shape: 'connection', from: 'Người dùng', to: '( Đăng nhập )', isCorrect: false },
      { id: 'c2', label: 'Đăng nhập ➔ Database', shape: 'connection', from: '( Đăng nhập )', to: 'Database Người dùng', isCorrect: false },
      { id: 'c3', label: 'Người dùng ➔ Database', shape: 'connection', from: 'Người dùng', to: 'Database Người dùng', isCorrect: true }
    ],
    explanation: [{ text: "Khách hàng không thể giao tiếp trực tiếp với cơ sở dữ liệu! Họ bắt buộc phải thông qua ranh giới hệ thống (Use Case Đăng nhập), từ đó hệ thống mới thay mặt họ kết nối với Database.", img: null }]
  }
];

export default function LevelReview() {
  const [phase, setPhase] = useState('splash');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [status, setStatus] = useState('idle');
  const [selectedOpt, setSelectedOpt] = useState<any>(null);
  
  // States for fill-nodes
  const [selectedLeft, setSelectedLeft] = useState<any>(null);
  const [selectedRight, setSelectedRight] = useState<any>(null);
  const [activeSlot, setActiveSlot] = useState<'left' | 'right' | null>(null);

  const [mistakesCount, setMistakesCount] = useState(0);
  const [xp, setXp] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState(0);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);

  const currentQ = REVIEW_DATA[currentIndex];
  const progressPercent = (currentIndex / REVIEW_DATA.length) * 100;

  useEffect(() => {
    if (phase === 'splash') {
      const timer = setTimeout(() => setPhase('quiz'), 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleSelect = (opt: any) => {
    if (status === 'idle' || status === 'ready') {
      if (currentQ.type === 'fill-nodes') {
        if (activeSlot === 'left') {
           setSelectedLeft(opt);
           if (selectedRight && selectedRight.id === opt.id) setSelectedRight(null);
           setActiveSlot(null);
        } else if (activeSlot === 'right') {
           setSelectedRight(opt);
           if (selectedLeft && selectedLeft.id === opt.id) setSelectedLeft(null);
           setActiveSlot(null);
        } else {
           // Auto assign to empty slot
           if (!selectedLeft) setSelectedLeft(opt);
           else if (!selectedRight && selectedLeft?.id !== opt.id) setSelectedRight(opt);
        }
      } else {
        setSelectedOpt(opt);
        setStatus('ready');
      }
    }
  };

  useEffect(() => {
    if (currentQ.type === 'fill-nodes') {
      if (selectedLeft && selectedRight) {
        setStatus('ready');
      } else {
        setStatus('idle');
      }
    }
  }, [selectedLeft, selectedRight, currentQ]);

  const handleCheck = () => {
    if (currentQ.type === 'fill-nodes') {
      if (!selectedLeft || !selectedRight) return;
      if (selectedLeft.id === currentQ.correctAnswer?.left && selectedRight.id === currentQ.correctAnswer?.right) {
        setStatus('correct');
        setXp(prev => prev + 20);
      } else {
        setStatus('incorrect');
        setMistakesCount(prev => prev + 1);
      }
    } else {
      if (!selectedOpt) return;
      if (selectedOpt.isCorrect) {
        setStatus('correct');
        setXp(prev => prev + 20);
      } else {
        setStatus('incorrect');
        setMistakesCount(prev => prev + 1);
      }
    }
  };

  const handleNext = () => {
    setIsModalOpen(false);
    setModalPage(0);
    setStatus('idle');
    setSelectedOpt(null);
    setSelectedLeft(null);
    setSelectedRight(null);
    setActiveSlot(null);

    if (currentIndex < REVIEW_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      if (mistakesCount > 1) {
        setPhase('tricky');
      } else {
        setPhase('complete');
      }
    }
  };

  const renderQuestionArea = () => {
    if (currentQ.type === 'visual-select') {
      return (
        <div className="flex flex-col md:flex-row justify-center gap-6 w-full mt-6">
          {currentQ.elements?.map((el: any) => {
            const isSelected = selectedOpt?.id === el.id;
            let elClass = "relative flex flex-col items-center justify-center p-8 rounded-3xl border-4 cursor-pointer transition-all flex-1 ";

            if (status === 'idle' || status === 'ready') {
              elClass += isSelected ? "border-white bg-white/10 scale-[1.02]" : "border-neutral-700 bg-neutral-900/50 hover:border-neutral-500 hover:bg-neutral-800";
            } else {
              if (el.isCorrect) elClass += "border-green-500 bg-green-500/20 text-green-400 ";
              else if (isSelected && !el.isCorrect) elClass += "border-red-500 bg-red-500/20 text-red-400 ";
              else elClass += "border-neutral-800 bg-neutral-900/30 text-neutral-500 opacity-40 ";
            }

            return (
              <div key={el.id} onClick={() => handleSelect(el)} className={elClass}>
                {el.shape === 'actor' && (
                  <svg viewBox="0 0 24 24" className="w-16 h-16 mb-4 stroke-current drop-shadow-md" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
                {el.shape === 'box' && (
                  <div className="w-24 h-24 mb-4 border-4 border-dashed border-current flex items-center justify-center rounded-xl bg-black/20 shadow-inner">
                    <span className="text-xs font-mono tracking-widest uppercase opacity-70">System</span>
                  </div>
                )}
                {el.shape === 'server' && (
                  <svg viewBox="0 0 24 24" className="w-16 h-16 mb-4 stroke-current drop-shadow-md" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                )}
                {el.shape === 'connection' && (
                  <div className="w-full flex items-center justify-between gap-4 p-4 py-8 mb-2 border-2 border-neutral-700 bg-black/40 rounded-xl">
                     <span className="font-mono text-sm text-center flex-1">{el.from}</span>
                     <div className="w-12 h-1 bg-current relative shrink-0">
                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 border-l-[8px] border-l-current border-y-[6px] border-y-transparent"></div>
                     </div>
                     <span className="font-mono text-sm text-center flex-1">{el.to}</span>
                  </div>
                )}

                <span className="font-bold text-lg text-center mt-2">{el.label}</span>

                {(status === 'correct' || status === 'incorrect') && el.isCorrect && <CheckCircle2 size={32} className="absolute -top-4 -right-4 text-green-500 bg-[#09090b] rounded-full" />}
                {status === 'incorrect' && isSelected && !el.isCorrect && <AlertCircle size={32} className="absolute -top-4 -right-4 text-red-500 bg-[#09090b] rounded-full" />}
              </div>
            )
          })}
        </div>
      );
    }

    if (currentQ.type === 'fill-nodes') {
      return (
        <div className="w-full flex flex-col items-center gap-12 mt-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-xl font-bold bg-neutral-900/50 p-10 rounded-[2rem] border border-neutral-800 w-full justify-center shadow-lg">
            
            {/* LEFT SLOT */}
            <div 
               onClick={() => { if (status === 'idle' || status === 'ready') setActiveSlot('left') }}
               className={`flex flex-col items-center min-w-[200px] p-6 rounded-2xl border-4 border-dashed cursor-pointer transition-all
                  ${activeSlot === 'left' ? 'border-white bg-white/10' : 
                    selectedLeft ? (status === 'correct' ? 'border-green-500 bg-green-500/20 text-green-400' : status === 'incorrect' ? 'border-red-500 bg-red-500/20 text-red-400' : 'border-neutral-500 bg-neutral-800 text-white') 
                    : 'border-neutral-700 hover:border-neutral-500'}`}
            >
               <span className={`text-sm mb-2 ${selectedLeft ? 'text-current' : 'text-neutral-500'}`}>Trái (Primary Actor)</span>
               <span className="font-bold text-center">{selectedLeft ? selectedLeft.label : '[ Chỗ trống 1 ]'}</span>
            </div>

            <div className="flex-1 w-full flex items-center px-4">
               <div className="w-full border-b-4 border-dashed border-neutral-500 relative">
                 <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-neutral-500"></div>
               </div>
            </div>

            <div className="px-8 py-6 border-4 border-blue-500 text-white rounded-[50%] bg-blue-500/20 text-center shadow-[inset_0_0_15px_rgba(59,130,246,0.5)] shrink-0 max-w-[250px]">
               {currentQ.diagram?.center}
            </div>

            <div className="flex-1 w-full flex items-center px-4">
               <div className="w-full border-b-4 border-dashed border-neutral-500 relative">
                 <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-neutral-500"></div>
               </div>
            </div>

            {/* RIGHT SLOT */}
            <div 
               onClick={() => { if (status === 'idle' || status === 'ready') setActiveSlot('right') }}
               className={`flex flex-col items-center min-w-[200px] p-6 rounded-2xl border-4 border-dashed cursor-pointer transition-all
                  ${activeSlot === 'right' ? 'border-white bg-white/10' : 
                    selectedRight ? (status === 'correct' ? 'border-green-500 bg-green-500/20 text-green-400' : status === 'incorrect' ? 'border-red-500 bg-red-500/20 text-red-400' : 'border-neutral-500 bg-neutral-800 text-white') 
                    : 'border-neutral-700 hover:border-neutral-500'}`}
            >
               <span className={`text-sm mb-2 ${selectedRight ? 'text-current' : 'text-neutral-500'}`}>Phải (Secondary Actor)</span>
               <span className="font-bold text-center">{selectedRight ? selectedRight.label : '[ Chỗ trống 2 ]'}</span>
            </div>

          </div>

          <div className="flex gap-4 w-full justify-center">
            {currentQ.options?.map((opt: any) => {
              const isUsed = (selectedLeft && selectedLeft.id === opt.id) || (selectedRight && selectedRight.id === opt.id);
              
              return (
                <button 
                  key={opt.id} 
                  onClick={() => handleSelect(opt)} 
                  disabled={(status !== 'idle' && status !== 'ready') || (isUsed && !activeSlot)} 
                  className={`px-8 py-5 rounded-2xl border-2 font-bold transition-all text-lg flex items-center justify-center shadow-lg
                     ${isUsed && !activeSlot ? 'opacity-30 border-neutral-700 bg-neutral-900 cursor-not-allowed text-neutral-500' : 'border-white bg-white/10 hover:bg-white/20 active:scale-95'}`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col gap-4 mt-6">
        {currentQ.options?.map((opt: any) => {
          const isSelected = selectedOpt?.id === opt.id;
          let btnClass = "w-full p-5 rounded-2xl border-4 flex items-center gap-4 transition-all text-left font-bold text-lg ";

          if (status === 'idle' || status === 'ready') {
            btnClass += isSelected
              ? "border-white bg-white/10 scale-[1.01]"
              : "border-neutral-700 bg-neutral-900/50 hover:border-neutral-500 hover:bg-neutral-800 cursor-pointer";
          } else {
            if (opt.isCorrect) {
              btnClass += "border-green-500 bg-green-500/10 text-green-400";
            } else if (isSelected && !opt.isCorrect) {
              btnClass += "border-red-500 bg-red-500/10 text-red-400";
            } else {
              btnClass += "border-neutral-800 bg-neutral-900/30 text-neutral-500 opacity-40";
            }
          }

          return (
            <button key={opt.id} onClick={() => handleSelect(opt)} disabled={status !== 'idle' && status !== 'ready'} className={btnClass}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 shrink-0
                ${(status !== 'idle' && status !== 'ready' && opt.isCorrect) ? 'border-green-500 bg-green-500 text-black' :
                  (status === 'incorrect' && isSelected && !opt.isCorrect) ? 'border-red-500 bg-red-500 text-white' :
                    isSelected && (status === 'idle' || status === 'ready') ? 'border-white text-white' : 'border-neutral-600 text-neutral-400'}`}>
                {opt.id}
              </div>
              <span className="flex-1">{opt.label}</span>
              {(status === 'correct' || status === 'incorrect') && opt.isCorrect && <CheckCircle2 className="text-green-500 shrink-0" size={28} />}
              {status === 'incorrect' && isSelected && !opt.isCorrect && <AlertCircle className="text-red-500 shrink-0" size={28} />}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: phase === 'complete' ? '#1e1b4b' : phase === 'tricky' ? '#111' : '#09090b', color: '#f8fafc', minHeight: '100vh' }}
      className="font-sans overflow-hidden flex flex-col relative transition-colors duration-1000">
      <style>{`
        @keyframes splashUp {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          20% { transform: translateY(0) scale(1); opacity: 1; }
          80% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* --- SPLASH SCREEN --- */}
      {phase === 'splash' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#09090b' }}>
          <div className="flex flex-col items-center animate-[splashUp_2.5s_ease-in-out_forwards]">
            <div className="relative">
              <Mascot state="skill_check" size="scale-[1.2]" />
            </div>
            <h2 className="text-2xl font-bold mt-10 tracking-widest uppercase text-white drop-shadow-md">Skill check</h2>
          </div>
        </div>
      )}

      {/* --- QUIZ HEADER --- */}
      {phase === 'quiz' && (
        <header className="flex items-center justify-between px-6 py-5 z-40 relative max-w-5xl mx-auto w-full">
          <button onClick={() => setIsQuitModalOpen(true)} className="text-neutral-500 hover:text-white transition-colors">
            <X size={28} />
          </button>

          <div className="flex-1 mx-8 h-2.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-lg text-neutral-300">
            <span>{xp}</span>
            <Zap size={22} className="text-yellow-500" fill="currentColor" />
          </div>
        </header>
      )}

      {/* --- MAIN CONTENT (QUIZ) --- */}
      {phase === 'quiz' && (
        <main className="flex-1 flex flex-col items-center pt-8 px-6 max-w-5xl mx-auto w-full pb-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center leading-relaxed">
            {currentQ.question}
          </h1>
          {renderQuestionArea()}
        </main>
      )}

      {/* --- FOOTER CONTROLS (QUIZ) --- */}
      {phase === 'quiz' && (
        <div className="fixed bottom-0 left-0 right-0 p-6 z-40" style={{ background: 'linear-gradient(to top, #09090b 70%, transparent)' }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">

            <div className="w-1/3 flex items-center gap-3">
              {status === 'correct' && (
                <><CheckCircle2 size={32} className="text-green-500" /> <span className="font-bold text-2xl text-green-500">Correct</span></>
              )}
              {status === 'incorrect' && (
                <><AlertCircle size={32} className="text-red-500" /> <span className="font-bold text-2xl text-red-500">Incorrect</span></>
              )}
            </div>

            <div className="w-2/3 flex justify-end gap-3">
              {status === 'idle' && (
                <button disabled className="px-14 py-4 rounded-full font-black text-lg bg-[#222] text-neutral-500 cursor-not-allowed">
                  Check
                </button>
              )}

              {status === 'ready' && (
                <button onClick={handleCheck} className="px-14 py-4 rounded-full font-black text-lg bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Check
                </button>
              )}

              {(status === 'correct' || status === 'incorrect') && (
                <>
                  <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 rounded-full font-bold text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700">
                    Why?
                  </button>
                  <button onClick={handleNext} className={`px-14 py-4 rounded-full font-black text-lg active:scale-95 transition-all shadow-lg
                    ${status === 'correct' ? 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white text-black hover:bg-neutral-200'}`}>
                    {currentIndex === REVIEW_DATA.length - 1 ? 'Finish' : 'Continue'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- EXPLANATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-[2rem] border border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200" style={{ backgroundColor: '#18181b' }}>
            <div className="flex items-center justify-between p-6 pb-4 border-b border-neutral-800/50">
              <h3 className="text-xl font-bold">Explanation</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 flex-1 min-h-[180px] flex items-center">
              <p className="text-neutral-200 text-lg leading-relaxed text-center w-full">
                {currentQ.explanation[modalPage].text}
              </p>
            </div>

            {currentQ.explanation.length > 1 && (
              <div className="flex items-center justify-between p-4 bg-black/20 border-t border-neutral-800">
                <button
                  onClick={() => setModalPage(p => Math.max(0, p - 1))}
                  className={`p-2 rounded-full hover:bg-neutral-800 ${modalPage === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                  disabled={modalPage === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex gap-2">
                  {currentQ.explanation.map((_: any, i: number) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === modalPage ? 'bg-white' : 'bg-neutral-700'}`}></div>
                  ))}
                </div>
                <button
                  onClick={() => setModalPage(p => Math.min(currentQ.explanation.length - 1, p + 1))}
                  className={`p-2 rounded-full hover:bg-neutral-800 ${modalPage === currentQ.explanation.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                  disabled={modalPage === currentQ.explanation.length - 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TRICKY FINISH SCREEN (FAILED) --- */}
      {phase === 'tricky' && (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700 px-6 text-center" style={{ backgroundColor: '#111' }}>
          <DumbbellSVG />
          <h1 className="text-4xl md:text-5xl font-black mb-4 mt-8 text-neutral-300">That was tricky!</h1>
          <p className="text-neutral-500 text-lg md:text-xl mb-12 max-w-sm">
            (Phần này hơi khó nhằn đấy). Hãy ôn lại một chút và thử lại nhé!
          </p>
          <div className="fixed bottom-10 w-full max-w-md mx-auto px-6">
            <Link to="/">
              <button className="w-full py-4 bg-white text-black font-black text-xl rounded-full hover:bg-neutral-200 active:scale-95 transition-all">
                Continue
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* --- LEVEL COMPLETE SCREEN (PASSED) --- */}
      {phase === 'complete' && (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-1000 px-6 text-center" style={{ background: 'linear-gradient(to bottom, #3b0764, #1e1b4b)' }}>
          <PurpleGemSVG />
          <h1 className="text-4xl md:text-5xl font-black mb-12 mt-16 drop-shadow-lg text-white">Level complete!</h1>
          <div className="flex flex-col items-center">
            <span className="text-purple-300 font-black text-sm tracking-widest uppercase mb-2 drop-shadow">TOTAL XP</span>
            <div className="flex items-center gap-1 text-6xl font-black text-white drop-shadow-md">
              {xp} <Zap size={44} className="text-yellow-400" fill="currentColor" />
            </div>
          </div>
          <div className="fixed bottom-10 w-full max-w-md mx-auto px-6">
            <button onClick={() => setPhase('league')} className="w-full py-4 bg-white hover:bg-neutral-100 text-purple-900 font-black text-xl rounded-full active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* --- LEAGUE RANK UP SCREEN --- */}
      {phase === 'league' && (
        <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ backgroundColor: '#09090b' }}>
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          <div className="flex flex-col items-center pt-20 px-6">
            <ShieldSVG />
            <h1 className="text-4xl md:text-5xl font-black mt-8 mb-3">You're #1!</h1>
            <p className="text-neutral-400 text-center max-w-sm text-lg leading-relaxed">
              You're in the top spot of the <br /><span className="font-bold text-neutral-200">Hydrogen League!</span>
            </p>
            <p className="text-sm text-neutral-500 font-bold mt-4 mb-12">3 days left</p>

            <div className="w-full max-w-lg flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between p-4 px-6 rounded-2xl bg-green-900/30 border-2 border-green-800/50 shadow-[0_0_20px_rgba(34,197,94,0.1)] transform hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-5">
                  <span className="w-6 text-center font-black text-yellow-500 text-lg">1</span>
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-inner">N</div>
                  <span className="font-bold text-white text-lg">Nguyễn Huy H</span>
                </div>
                <span className="font-black text-green-400 text-lg">{1240 + xp} XP</span>
              </div>

              <div className="flex items-center justify-between p-4 px-6 rounded-2xl text-neutral-400 bg-neutral-900/30">
                <div className="flex items-center gap-5">
                  <span className="w-6 text-center font-bold text-lg">2</span>
                  <div className="w-12 h-12 rounded-full bg-red-800/80 flex items-center justify-center text-white font-bold text-xl">X</div>
                  <span className="font-bold text-lg">XiaoMing H</span>
                </div>
                <span className="font-bold text-lg">1240 XP</span>
              </div>
            </div>
          </div>

          <div className="fixed bottom-10 w-full max-w-md mx-auto px-6 left-1/2 -translate-x-1/2">
            <Link to="/">
              <button className="w-full py-4 bg-white text-black font-black text-xl rounded-full hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                Continue
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Quit Modal */}
      {isQuitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1f1f1f] w-full max-w-[400px] rounded-[2rem] p-8 pb-6 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-200 border border-neutral-800">
             <h3 className="text-2xl font-black text-white tracking-wide mb-2">Bạn có chắc không?</h3>
             <p className="text-neutral-300 font-medium text-center mb-8">Nếu thoát bây giờ, bạn sẽ mất toàn bộ quá trình học và XP của bài này.</p>
             <button onClick={() => setIsQuitModalOpen(false)} className="w-full bg-[#E5E5E5] hover:bg-white text-black font-bold text-[17px] py-4 rounded-2xl mb-4 transition-colors shadow-[0_4px_0_#b3b3b3] active:translate-y-1 active:shadow-[0_0_0_#b3b3b3]">Tiếp tục học</button>
             <Link to="/" className="text-[#ff5b5b] font-bold text-lg hover:text-red-400 transition-colors uppercase tracking-widest pt-2">Thoát</Link>
          </div>
        </div>
      )}

    </div>
  );
}
