import { useState, useEffect } from 'react';
import { X, Zap, RotateCcw, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Mascot from '../components/Mascot';
import LessonBottomBar from '../components/LessonBottomBar';
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

const LESSON_DATA = [
  {
    id: 0,
    type: 'theory',
    title: 'The System Boundary',
    subtitle: 'Let’s learn how to separate what is inside the software from what is outside using Use Case Diagrams.',
    image: (
      <div className="w-full h-64 bg-[#1A1A1A] rounded-2xl border border-neutral-800 flex items-center justify-center relative overflow-hidden">
        <div className="w-48 h-32 border-2 border-dashed border-blue-500/50 rounded-xl flex items-center justify-center relative bg-blue-900/10">
           <span className="absolute -top-3 left-3 bg-[#1A1A1A] px-2 text-xs text-blue-400 font-mono">System</span>
           <div className="w-16 h-8 border-2 border-white rounded-[50%] flex items-center justify-center text-xs">Login</div>
        </div>
        <div className="absolute left-10 flex flex-col items-center">
           <div className="w-6 h-6 rounded-full border-2 border-white"></div>
           <div className="w-1 h-6 bg-white"></div>
           <div className="w-6 h-1 bg-white -mt-4"></div>
           <span className="text-xs mt-2 text-neutral-400">Actor</span>
        </div>
      </div>
    )
  },
  {
    id: 1,
    type: 'interactive',
    interactionType: 'selection',
    title: 'Select the entity that belongs OUTSIDE the system boundary.',
    options: [
      { id: 'opt1', label: 'Customer', icon: '👤', isCorrect: true, hint: '' },
      { id: 'opt2', label: 'Database', icon: '🗄️', isCorrect: false, hint: 'Databases store data for your software. They are part of the internal system, not external users.' },
      { id: 'opt3', label: 'Auth Logic', icon: '⚙️', isCorrect: false, hint: 'Logic and code are the internals of your system.' }
    ],
    explanation: [
      { 
        text: 'Actors are external entities. They can be humans (like a Customer) or other external systems (like a third-party Payment API).', 
        img: <div className="h-32 bg-green-900/20 border border-green-500/30 rounded-xl flex items-center justify-center text-green-400 font-bold w-full">Actor = External</div> 
      },
      { 
        text: 'The system boundary box contains only the functions (Use Cases) that your software is responsible for building.', 
        img: <div className="h-32 bg-blue-900/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 font-bold w-full">Boundary = Responsibility</div> 
      }
    ]
  },
  {
    id: 2,
    type: 'theory',
    title: 'Optional Behaviors',
    subtitle: 'Sometimes a Use Case only happens under certain conditions. We use <<extend>> for this.',
    image: (
      <div className="w-full h-64 bg-[#1A1A1A] rounded-2xl border border-neutral-800 flex items-center justify-center gap-8">
        <div className="w-24 h-12 border-2 border-white rounded-[50%] flex items-center justify-center text-xs text-center leading-tight">Checkout</div>
        <div className="flex flex-col items-center">
           <span className="text-[10px] text-yellow-500 font-mono mb-1">&lt;&lt;extend&gt;&gt;</span>
           <div className="w-16 h-0 border-b-2 border-dashed border-yellow-500 relative">
             <div className="absolute -left-1 -top-1.5 w-3 h-3 border-t-2 border-l-2 border-yellow-500 -rotate-45"></div>
           </div>
        </div>
        <div className="w-24 h-12 border-2 border-neutral-500 rounded-[50%] flex items-center justify-center text-xs text-neutral-400 text-center leading-tight">Apply<br/>Coupon</div>
      </div>
    )
  },
  {
    id: 3,
    type: 'skill_check',
    interactionType: 'selection',
    title: 'Which of these represents a MANDATORY step that another Use Case always includes?',
    options: [
      { id: 'a', label: '<<extend>>', isCorrect: false },
      { id: 'b', label: '<<include>>', isCorrect: true },
      { id: 'c', label: 'Association', isCorrect: false }
    ],
    explanation: [
      { text: '<<include>> means the base use case CANNOT finish without calling the included use case. It is mandatory.', img: null }
    ]
  }
];

export default function LessonPlayer() {
  const [phase, setPhase] = useState('intro_anim'); 
  const [currentStep, setCurrentStep] = useState(0);
  const [xp, setXp] = useState(0);
  
  const [status, setStatus] = useState('idle'); 
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [hasViewedExplanation, setHasViewedExplanation] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState(0);

  const currentData = LESSON_DATA[currentStep];

  useEffect(() => {
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
      if (status !== 'showing_answer') setXp(prev => prev + (phase === 'skill_check' ? 20 : 10));
    } else {
      setStatus(phase === 'skill_check' ? 'skill_check_incorrect' : 'incorrect');
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
    setHasViewedExplanation(false);

    if (currentStep < LESSON_DATA.length - 1) {
      const nextData = LESSON_DATA[currentStep + 1];
      if (nextData.type === 'skill_check') {
        setPhase('transition');
      }
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

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden flex flex-col relative selection:bg-green-500/30">
      <style>{`
        @keyframes dropIn {
          0% { transform: translateY(-100vh); opacity: 0; }
          30% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes splashUp {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          20% { transform: translateY(0) scale(1); opacity: 1; }
          80% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

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

      {/* --- TOP BAR --- */}
      <header className="flex items-center justify-between px-4 py-4 z-40 relative bg-gradient-to-b from-[#0A0A0A] to-transparent">
        <Link to="/" className="text-neutral-500 hover:text-white transition-colors">
          <X size={24} />
        </Link>
        
        <div className="flex-1 mx-8 max-w-xl flex items-center h-2 bg-neutral-800 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
          {LESSON_DATA.map((_, i) => (
             <div key={i} className="flex-1 border-r-4 border-[#0A0A0A] h-full z-10 last:border-r-0"></div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 font-bold text-neutral-300">
          <span>{xp}</span>
          <Zap size={20} className="text-yellow-500" fill="currentColor" />
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col relative max-w-3xl mx-auto w-full px-6 pt-4 pb-32 z-10">
        
        {phase === 'complete' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
             <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                <div className="absolute -top-32 w-[200%] h-64 bg-gradient-to-b from-white/20 to-transparent blur-2xl clip-path-polygon-[20%_0,80%_0,100%_100%,0_100%]"></div>
                <div className="absolute top-0 z-10">
                  <Mascot state="lesson_complete" size="scale-125" />
                </div>
                <PodiumSVG />
             </div>
             <h1 className="text-3xl font-black mb-2">Lesson complete!</h1>
             <p className="text-neutral-400 text-sm font-bold tracking-widest uppercase mb-1">Total XP</p>
             <div className="flex items-center gap-2 text-5xl font-black text-white">
                {xp} <Zap size={40} className="text-yellow-500" fill="currentColor" />
             </div>
          </div>
        )}

        {(phase === 'learning' || phase === 'skill_check') && currentData && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold mb-8 text-center">{currentData.title}</h1>
            {currentData.subtitle && <p className="text-neutral-400 text-center mb-8">{currentData.subtitle}</p>}
            
            <div className="flex-1 flex flex-col items-center justify-center relative w-full mb-8">
               {currentData.type === 'theory' && currentData.image}

               {currentData.interactionType === 'selection' && currentData.options && (
                 <div className="w-full flex flex-col gap-3">
                   {currentData.options.map((opt: any) => {
                     const isSelected = selectedOption?.id === opt.id;
                     let btnClass = "w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all active:scale-[0.98] cursor-pointer bg-[#1A1A1A] ";
                     
                     if (status === 'idle' || status === 'ready') {
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
                       <button key={opt.id} onClick={() => handleSelect(opt)} className={btnClass} disabled={status === 'correct' || status === 'showing_answer' || status === 'skill_check_incorrect'}>
                         {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                         <span className="font-bold text-lg flex-1 text-left">{opt.label}</span>
                         {(status === 'correct' || status === 'showing_answer') && opt.isCorrect && isSelected && <CheckCircle2 className="text-green-500" />}
                         {status === 'incorrect' && !opt.isCorrect && isSelected && <AlertCircle className="text-orange-500" />}
                         {status === 'skill_check_incorrect' && isSelected && <AlertCircle className="text-red-500" />}
                         {status === 'skill_check_incorrect' && opt.isCorrect && <CheckCircle2 className="text-green-500" />}
                       </button>
                     );
                   })}
                 </div>
               )}

               {currentData.type === 'interactive' && status !== 'idle' && status !== 'correct' && status !== 'showing_answer' && (
                  <button onClick={handleTryAgain} className="absolute -bottom-6 right-0 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors bg-[#0A0A0A] px-3 py-1 rounded-full border border-neutral-800">
                    <RotateCcw size={14} /> Start over
                  </button>
               )}
            </div>
          </div>
        )}
      </main>

      {/* --- BOTTOM CONTROLS & MASCOT --- */}
      <LessonBottomBar
        phase={phase}
        status={status}
        isTheory={currentData?.type === 'theory'}
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

      {/* --- EXPLANATION MODAL (Why?) --- */}
      {isModalOpen && currentData?.explanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1A1A1A] w-full max-w-lg rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 pb-2">
              <h3 className="text-xl font-bold">Explanation</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white">
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
