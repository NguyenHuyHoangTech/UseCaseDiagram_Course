import { useState, useEffect } from 'react';
import { X, Zap, Sparkles, RotateCcw, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2, Database } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Mascot from '../components/Mascot';
import LessonBottomBar from '../components/LessonBottomBar';
import BuildDiagramInteractive from '../components/interactive/BuildDiagram';
import HighlightDiagramInteractive from '../components/interactive/HighlightDiagram';
import { ALL_LESSONS } from '../data/lessons';
const PodiumSVG = () => (
  <svg viewBox="0 0 200 100" className="w-64 h-32 absolute bottom-0 left-1/2 -translate-x-1/2">
    <ellipse cx="100" cy="50" rx="80" ry="25" fill="#EAB308" opacity="0.3" filter="blur(10px)" />
    <ellipse cx="100" cy="50" rx="60" ry="15" fill="#EAB308" />
    <ellipse cx="100" cy="45" rx="60" ry="15" fill="#FDE047" />
    <path d="M40 45 L40 60 C40 68 100 80 160 60 L160 45 Z" fill="#CA8A04" />
    <ellipse cx="100" cy="45" rx="45" ry="10" fill="#FEF08A" />
    <circle cx="100" cy="45" r="5" fill="#FFF" opacity="0.5" />
  </svg>
);

export default function LessonPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const LESSON_DATA = id && ALL_LESSONS[id] ? ALL_LESSONS[id] : [];
  
  const [phase, setPhase] = useState('intro_anim');
  const [currentStep, setCurrentStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [xpAddedAnim, setXpAddedAnim] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isStreakPopupOpen, setIsStreakPopupOpen] = useState(false);
  
  const [status, setStatus] = useState('idle'); 
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [failedOptions, setFailedOptions] = useState<string[]>([]);
  const [hasViewedExplanation, setHasViewedExplanation] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState(0);

  const currentData = LESSON_DATA[currentStep];

  useEffect(() => {
    if (!LESSON_DATA || LESSON_DATA.length === 0) {
      navigate('/');
      return;
    }
    
    // Auto advance if intro
    if (phase === 'intro_anim') {
      const t = setTimeout(() => setPhase('learning'), 3500); 
      return () => clearTimeout(t);
    }
    if (phase === 'transition') {
      const t = setTimeout(() => setPhase('skill_check'), 2500);
      return () => clearTimeout(t);
    }
  }, [phase]);



  const handleSelect = (option: any) => {
    if (status === 'idle' || status === 'ready' || status === 'incorrect') {
      setSelectedOption(option);
      setStatus('ready');
    }
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    
    if (selectedOption.isCorrect) {
      setStatus('correct');
      if (status !== 'showing_answer') {
        const added = phase === 'skill_check' ? 20 : 10;
        setXp(prev => prev + added);
        setXpAddedAnim(added);
        setTimeout(() => setXpAddedAnim(null), 1000);
      }
    } else {
      setStatus(phase === 'skill_check' ? 'skill_check_incorrect' : 'incorrect');
      setFailedOptions(prev => [...prev, selectedOption.id]);
    }
  };

  const handleTryAgain = () => {
    setStatus('idle');
    setSelectedOption(null);
    setHasViewedExplanation(false);
  };

  const handleSeeAnswer = () => {
    setStatus('showing_answer');
    const correctOpt = currentData.options?.find((o: any) => o.isCorrect);
    setSelectedOption(correctOpt);
  };

  const handleNext = () => {
    setIsModalOpen(false);
    setModalPage(0);
    setStatus('idle');
    setSelectedOption(null);
    setFailedOptions([]);
    setHasViewedExplanation(false);
    setActiveTab(0);

    if (currentData.type === 'skill_check_transition') {
      setPhase('transition');
      setCurrentStep(prev => prev + 1);
      return;
    }

    if (currentStep < LESSON_DATA.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setPhase('complete');
    }
  };

  const progressPercent = (currentStep / LESSON_DATA.length) * 100;

  const getMascotState = () => {
    if (status === 'correct') return 'correct';
    if (status === 'incorrect') return 'hint';
    if (status === 'showing_answer') return 'explaining';
    return 'path_idle';
  };

  const styles = `
    @keyframes dropIn { 0% { transform: translateY(-100vh); opacity: 0; } 30% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
    @keyframes splashUp { 0% { transform: translateY(100vh) scale(0.5); opacity: 0; } 20% { transform: translateY(0) scale(1); opacity: 1; } 80% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
    @keyframes shakeScreen { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-5px); } 40%, 80% { transform: translateX(5px); } }
    @keyframes floatUpFadeXP {
      0% { transform: translateY(0) scale(0.5); opacity: 0; }
      20% { transform: translateY(-10px) scale(1.2); opacity: 1; }
      80% { transform: translateY(-30px) scale(1); opacity: 1; }
      100% { transform: translateY(-40px) scale(1); opacity: 0; }
    }
  `;

  return (
    <div className="h-screen overflow-hidden bg-[#000] text-white font-sans flex flex-col relative selection:bg-green-500/30 p-2 md:p-3">
      <style>{styles}</style>

      {/* --- OVERLAYS --- */}
      {phase === 'intro_anim' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]">
          <div className="flex flex-col items-center animate-[dropIn_3.5s_ease-in-out_forwards]">
             <div className="w-16 h-64 bg-gradient-to-t from-green-500/40 to-transparent blur-md -mb-16 rounded-t-full"></div>
             <Mascot state="entry" size="scale-150" />
          </div>
        </div>
      )}

      {phase === 'transition' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] backdrop-blur-sm">
          <div className="flex flex-col items-center animate-[splashUp_2.5s_ease-in-out_forwards]">
             <div className="relative">
               <Mascot state="skill_check" size="scale-[1.2]" />
             </div>
             <h2 className="text-2xl font-bold mt-6 tracking-wide text-white drop-shadow-md">Skill check</h2>
          </div>
        </div>
      )}

      {/* --- TOP NAVIGATION BAR (NOW OUTSIDE FRAME) --- */}
      {(phase === 'learning' || phase === 'skill_check') && (
        <header className="flex items-center justify-center px-4 py-4 z-40 relative w-full shrink-0">
          <Link to="/" className="absolute left-6 text-neutral-500 hover:text-white transition-colors"><X size={26} strokeWidth={3} /></Link>
          
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
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 text-green-400 font-black text-xl pointer-events-none drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] z-50 flex items-center whitespace-nowrap" style={{ animation: 'floatUpFadeXP 1.5s ease-out forwards' }}>
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
      <div className={`flex-1 overflow-hidden rounded-[2rem] border-2 flex flex-col relative transition-all duration-300 bg-[#0a0a0a] mx-2 md:mx-6 mt-2 md:mt-4 mb-4 md:mb-8
          ${(status === 'incorrect' || status === 'skill_check_incorrect') ? 'border-[#ca8a04] animate-[shakeScreen_0.4s_ease-in-out]' : ''}
          ${status === 'correct' ? 'border-[#4ADE80] shadow-[0_0_40px_rgba(74,222,128,0.15)]' : ''}
          ${(status === 'idle' || status === 'ready' || status === 'showing_answer') ? 'border-neutral-800' : ''}
      `}>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col relative overflow-y-auto w-full px-6 pt-10 md:pt-14 pb-32 z-10">
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        
        {phase === 'complete' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 w-full max-w-lg mx-auto">
             <div className="relative w-64 h-64 flex items-center justify-center mb-4">
                <div className="absolute -top-32 w-[200%] h-64 bg-gradient-to-b from-white/20 to-transparent blur-2xl clip-path-polygon-[20%_0,80%_0,100%_100%,0_100%]"></div>
                <div className="absolute top-0 z-10">
                  <Mascot state="lesson_complete" size="scale-125" />
                </div>
                <PodiumSVG />
             </div>
             
             <h1 className="text-4xl font-black mb-6 text-white drop-shadow-md">Hoàn thành bài học!</h1>
             
             {/* XP Ranking Card */}
             <div className="w-full bg-[#1A1A1A] p-8 rounded-[2rem] border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col items-center">
                <p className="text-neutral-400 text-sm font-bold tracking-widest uppercase mb-4">Tổng Kinh Nghiệm</p>
                <div className="flex items-center gap-3 text-6xl font-black text-white mb-8 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                   <Zap size={48} className="text-yellow-400" fill="currentColor" />
                   {xp}
                </div>
                
                {/* Ranking Progress Bar */}
                <div className="w-full flex flex-col gap-2 relative">
                   <div className="flex justify-between text-xs font-bold text-neutral-500 uppercase tracking-wider px-2">
                     <span>Đồng (0)</span>
                     <span className={xp >= 40 ? 'text-blue-400' : ''}>Bạc (40)</span>
                     <span className={xp >= 80 ? 'text-yellow-400' : ''}>Vàng (80)</span>
                   </div>
                   <div className="w-full h-4 bg-neutral-800 rounded-full overflow-hidden relative border border-neutral-700 shadow-inner">
                      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000 ease-out" style={{ width: `${Math.min((xp / 80) * 100, 100)}%` }}></div>
                   </div>
                </div>
                
                {/* Rank Up Celebration Overlay */}
                {xp >= 40 && (
                   <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in duration-500" onClick={(e) => (e.currentTarget.style.display = 'none')}>
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.8)] border-4 border-blue-200 animate-bounce">
                         <div className="text-4xl font-black text-white">BẠC</div>
                      </div>
                      <h2 className="text-3xl font-black text-white mt-6 drop-shadow-lg text-center leading-tight">THĂNG HẠNG!</h2>
                      <p className="text-blue-200 font-medium mt-2">Bạn đã xuất sắc vượt mốc 40 XP</p>
                      <p className="text-neutral-500 text-sm mt-4 animate-pulse">(Click để tắt)</p>
                   </div>
                )}
             </div>
             
             <Link to="/" className="mt-8 w-full py-4 bg-[#eab308] text-black font-black text-xl rounded-full hover:bg-yellow-400 active:scale-95 transition-all shadow-[0_0_30px_rgba(234,179,8,0.4)] flex items-center justify-center">
                Tiếp tục
             </Link>
          </div>
        )}

        {(phase === 'learning' || phase === 'skill_check') && currentData && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentData.question && <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white leading-tight px-4">{currentData.question}</h1>}
            {!currentData.question && currentData.title && <h1 className="text-2xl font-bold mb-8 text-center">{currentData.title}</h1>}
            {currentData.subtitle && <p className="text-neutral-400 text-center mb-8">{currentData.subtitle}</p>}
            
            <div className="flex-1 flex flex-col items-center justify-center relative w-full mb-8">
               {currentData.type === 'theory' && currentData.image}

               {currentData.type === 'info_tabs' && currentData.tabs && (
                 <div className="w-full flex flex-col gap-4">
                    <div className="flex bg-[#1A1A1A] p-1 rounded-full border border-neutral-800">
                       {currentData.tabs.map((tab: any, idx: number) => (
                         <button key={idx} onClick={() => setActiveTab(idx)} className={`flex-1 py-2 rounded-full font-bold text-sm transition-all ${activeTab === idx ? 'bg-yellow-500 text-black shadow-md' : 'text-neutral-500 hover:text-white'}`}>
                            {tab.tabTitle}
                         </button>
                       ))}
                    </div>
                    <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-neutral-800 flex flex-col items-center min-h-[300px] justify-center animate-in fade-in slide-in-from-bottom-2">
                       {/* Mock Image Placeholder */}
                       <div className="w-40 h-40 bg-neutral-800 rounded-full mb-6 flex items-center justify-center border-4 border-neutral-700 shadow-inner relative">
                          {currentData.tabs[activeTab].image === 'box' && <div className="w-20 h-20 bg-blue-500 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>}
                          {currentData.tabs[activeTab].image === 'actor' && <div className="w-12 h-12 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)]"></div>}
                          {currentData.tabs[activeTab].image === 'rule' && <AlertCircle size={64} className="text-orange-500" />}
                          {currentData.tabs[activeTab].image === 'api' && <Database size={64} className="text-purple-500" />}
                          {currentData.tabs[activeTab].image === 'budget' && <div className="text-5xl">💰</div>}
                          {!currentData.tabs[activeTab].image && <Sparkles size={64} className="text-yellow-500" />}
                       </div>
                       <p className="text-xl text-center leading-relaxed text-neutral-300 font-medium">
                         {currentData.tabs[activeTab].content}
                       </p>
                    </div>
                 </div>
               )}

               {currentData.type === 'skill_check_transition' && (
                 <div className="w-full flex flex-col items-center justify-center gap-6 mt-10">
                    <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.5)] border-4 border-yellow-200">
                       <Zap size={60} className="text-yellow-900 fill-yellow-900" />
                    </div>
                    <p className="text-2xl text-center font-black text-white max-w-md drop-shadow-md">
                       {currentData.subtitle}
                    </p>
                 </div>
               )}

               {currentData.interactionType === 'selection' && currentData.options && (
                 <div className="w-full flex flex-col gap-3">
                   {currentData.options.map((opt: any) => {
                     const isSelected = selectedOption?.id === opt.id;
                     const isCurrentlyFailing = (status === 'incorrect' || status === 'skill_check_incorrect') && isSelected;
                     const isFailed = failedOptions.includes(opt.id) && !isCurrentlyFailing;
                     
                     let btnClass = "w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all active:scale-[0.98] cursor-pointer bg-[#1A1A1A] ";
                     
                     if (isFailed) {
                       btnClass += "border-neutral-800 bg-neutral-900 opacity-40 cursor-not-allowed";
                     } else if (status === 'idle' || status === 'ready') {
                       btnClass += isSelected ? "border-white bg-[#222]" : "border-neutral-700 hover:border-neutral-500";
                     } else if (phase === 'skill_check') {
                       if (isSelected && status === 'correct') btnClass += "border-green-500 bg-green-500/10";
                       else if (status === 'skill_check_incorrect') {
                         if (isSelected) btnClass += "border-red-500 bg-red-500/10";
                         else if (opt.isCorrect) btnClass += "border-green-500 bg-green-500/10";
                         else btnClass += "border-neutral-700 opacity-50";
                       }
                       else btnClass += "border-neutral-700 opacity-50";
                     } else {
                       if (isSelected && status === 'correct') btnClass += "border-green-500 bg-green-500/10";
                       else if (isSelected && status === 'incorrect') btnClass += "border-orange-500 bg-orange-500/10";
                       else if (status === 'showing_answer' && opt.isCorrect) btnClass += "border-white bg-white/10";
                       else btnClass += "border-neutral-700 opacity-50";
                     }

                     return (
                       <button key={opt.id} onClick={() => handleSelect(opt)} className={btnClass} disabled={status === 'correct' || status === 'showing_answer' || status === 'skill_check_incorrect' || isFailed}>
                         {isFailed ? <X className="text-red-500" /> : opt.icon && <span className="text-2xl">{opt.icon}</span>}
                         <span className={`font-bold text-lg flex-1 text-left ${isFailed ? 'line-through text-neutral-500' : ''}`}>{opt.label}</span>
                         {(status === 'correct' || status === 'showing_answer') && opt.isCorrect && isSelected && <CheckCircle2 className="text-green-500" />}
                         {status === 'incorrect' && !opt.isCorrect && isSelected && <AlertCircle className="text-orange-500" />}
                         {status === 'skill_check_incorrect' && isSelected && <AlertCircle className="text-red-500" />}
                         {status === 'skill_check_incorrect' && opt.isCorrect && <CheckCircle2 className="text-green-500" />}
                       </button>
                     );
                   })}
                 </div>
               )}

               {currentData.interactionType === 'sorting' && currentData.options && (
                 <div className="w-full flex flex-col gap-6 items-center">
                    {/* The Target Item to Sort */}
                    <div className={`px-8 py-6 rounded-2xl text-2xl font-black shadow-xl mb-4 transition-all duration-500 border-b-4 ${status === 'correct' ? 'bg-green-500/20 text-green-400 border-green-500/50' : (status === 'incorrect' || status === 'skill_check_incorrect' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-neutral-800 text-white border-neutral-700')} `}>
                       {currentData.targetItem}
                    </div>
                    
                    <div className="w-full grid grid-cols-2 gap-4">
                       {currentData.options.map((opt: any) => {
                         const isSelected = selectedOption?.id === opt.id;
                         const isCurrentlyFailing = (status === 'incorrect' || status === 'skill_check_incorrect') && isSelected;
                         const isFailed = failedOptions.includes(opt.id) && !isCurrentlyFailing;

                         let boxClass = "flex-1 p-8 rounded-3xl border-4 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer active:scale-95 bg-[#111] relative ";
                         
                         if (isFailed) {
                           boxClass += "border-neutral-800 bg-neutral-900 opacity-40 cursor-not-allowed";
                         } else if (status === 'idle' || status === 'ready') {
                           boxClass += isSelected ? "border-yellow-500 shadow-[0_0_30px_rgba(250,204,21,0.3)] bg-[#1A1A1A]" : "border-neutral-800 hover:border-neutral-600 border-dashed";
                         } else if (phase === 'skill_check') {
                           if (isSelected && status === 'correct') boxClass += "border-green-500 bg-green-500/10";
                           else if (status === 'skill_check_incorrect') {
                             if (isSelected) boxClass += "border-red-500 bg-red-500/10";
                             else if (opt.isCorrect) boxClass += "border-green-500 bg-green-500/10";
                             else boxClass += "border-neutral-800 opacity-50";
                           } else boxClass += "border-neutral-800 opacity-50";
                         } else {
                           if (isSelected && status === 'correct') boxClass += "border-green-500 bg-green-500/10";
                           else if (isSelected && status === 'incorrect') boxClass += "border-orange-500 bg-orange-500/10";
                           else if (status === 'showing_answer' && opt.isCorrect) boxClass += "border-white bg-white/10";
                           else boxClass += "border-neutral-800 opacity-50";
                         }

                         return (
                           <div key={opt.id} onClick={() => { if(!isFailed) handleSelect(opt) }} className={boxClass} style={{ pointerEvents: (status === 'idle' || status === 'ready') && !isFailed ? 'auto' : 'none' }}>
                             {isFailed ? <X size={64} className="text-red-500/50 mb-2" /> : (opt.id.includes('in') ? <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-xl flex items-center justify-center bg-blue-500/10"><CheckCircle2 className="text-blue-500 opacity-50"/></div> : <div className="w-12 h-12 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>)}
                             <span className={`font-bold text-xl text-center ${isFailed ? 'line-through text-neutral-500' : ''}`}>{opt.label}</span>
                             {(status === 'correct' || status === 'showing_answer') && opt.isCorrect && isSelected && <div className="absolute -top-3 -right-3 bg-green-500 rounded-full p-1 text-white shadow-lg"><CheckCircle2 size={24} /></div>}
                             {status === 'incorrect' && !opt.isCorrect && isSelected && <div className="absolute -top-3 -right-3 bg-orange-500 rounded-full p-1 text-white shadow-lg"><AlertCircle size={24} /></div>}
                             {status === 'skill_check_incorrect' && isSelected && <div className="absolute -top-3 -right-3 bg-red-500 rounded-full p-1 text-white shadow-lg"><AlertCircle size={24} /></div>}
                           </div>
                         );
                       })}
                    </div>
                 </div>
               )}
               {currentData.interactionType === 'build_diagram' && (
                 <BuildDiagramInteractive data={currentData} status={status} onComplete={handleSelect} />
               )}

               {currentData.interactionType === 'highlight_diagram' && (
                 <HighlightDiagramInteractive data={currentData} status={status} onComplete={handleSelect} />
               )}

               {currentData.type === 'interactive' && status !== 'idle' && status !== 'correct' && status !== 'showing_answer' && (
                  <button onClick={handleTryAgain} className="absolute -bottom-6 right-0 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors bg-[#0A0A0A] px-3 py-1 rounded-full border border-neutral-800">
                    <RotateCcw size={14} /> Start over
                  </button>
               )}
            </div>
          </div>
        )}
        </div>
      </main>
      </div> {/* End Frame */}

      {/* --- BOTTOM CONTROLS & MASCOT --- */}
      <div className="absolute inset-0 pointer-events-none p-2 md:p-3 flex flex-col z-50">
         <div className="flex-1 relative mx-2 md:mx-6 mt-2 md:mt-4 mb-4 md:mb-8">
            <LessonBottomBar
              phase={phase}
              status={status}
              isTheory={currentData?.type === 'theory' || currentData?.type === 'info_tabs' || currentData?.type === 'skill_check_transition'}
              hasExplanation={!!currentData?.explanation}
              hint={selectedOption?.hint}
              isModalOpen={isModalOpen}
              hasViewedExplanation={hasViewedExplanation}
              isLastStep={currentStep === LESSON_DATA.length - 1}
              mascotState={getMascotState()}
              onCheck={handleCheck}
              onNext={handleNext}
              onTryAgain={handleTryAgain}
              onSeeAnswer={handleSeeAnswer}
              onOpenModal={() => setIsModalOpen(true)}
            />
         </div>
      </div>

      {/* --- EXPLANATION MODAL (Why?) --- */}
      {isModalOpen && currentData?.explanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1A1A1A] w-full max-w-lg rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 pb-2">
              <h3 className="text-xl font-bold">Explanation</h3>
              <button onClick={() => { setIsModalOpen(false); setHasViewedExplanation(true); }} className="text-neutral-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 pt-4 flex-1">
              {currentData.explanation[modalPage].img && (
                <div className="mb-6 w-full flex justify-center">
                  {currentData.explanation[modalPage].img}
                </div>
              )}
              <p className="text-neutral-300 leading-relaxed">
                {currentData.explanation[modalPage].text}
              </p>
            </div>

            {currentData.explanation.length > 1 && (
              <div className="flex items-center justify-between p-4 bg-[#111] border-t border-neutral-800">
                <button 
                  onClick={() => setModalPage(p => Math.max(0, p - 1))}
                  className={`p-2 rounded-full hover:bg-neutral-800 ${modalPage === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                  disabled={modalPage === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="flex gap-2">
                  {currentData.explanation.map((_: any, i: number) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === modalPage ? 'bg-white' : 'bg-neutral-700'}`}></div>
                  ))}
                </div>

                <button 
                  onClick={() => setModalPage(p => Math.min(currentData.explanation.length - 1, p + 1))}
                  className={`p-2 rounded-full hover:bg-neutral-800 ${modalPage === currentData.explanation.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                  disabled={modalPage === currentData.explanation.length - 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}
