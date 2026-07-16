import { useState, useEffect } from 'react';
import { X, Zap, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Mascot from '../components/Mascot';

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
    question: "Select the component that represents a Primary Actor.",
    elements: [
      { id: 'e1', label: 'Customer', shape: 'actor', isCorrect: true },
      { id: 'e2', label: 'ATM Software', shape: 'box', isCorrect: false },
      { id: 'e3', label: 'Withdraw Cash', shape: 'usecase', isCorrect: false }
    ],
    explanation: [
      { text: "An actor is an external entity (human or another system) that interacts with your software.", img: null },
      { text: "It is always represented by a stick figure and placed outside the system boundary.", img: null }
    ]
  },
  {
    id: 2,
    type: 'fill-blank',
    question: "Construct the logic: A user cannot 'Checkout' without 'Processing Payment'.",
    diagram: { base: 'Checkout', target: 'Process Payment' },
    options: [
      { id: 'o1', label: '<<include>>', isCorrect: true },
      { id: 'o2', label: '<<extend>>', isCorrect: false },
      { id: 'o3', label: 'Association', isCorrect: false }
    ],
    explanation: [{ text: "<<include>> means the base use case is completely dependent on the included use case to finish its goal. It is a mandatory step.", img: null }]
  },
  {
    id: 3,
    type: 'mcq',
    question: "What is the true purpose of the System Boundary box?",
    options: [
      { id: 'A', label: "To show physical servers.", isCorrect: false },
      { id: 'B', label: "To separate internal software responsibilities from external users.", isCorrect: true },
      { id: 'C', label: "To group actors together.", isCorrect: false }
    ],
    explanation: [{ text: "The boundary defines the scope of the system. Everything inside is what you build (Use Cases), everything outside is what interacts with it (Actors).", img: null }]
  },
  {
    id: 4,
    type: 'fill-blank',
    question: "Construct the logic: 'Login' might occasionally trigger 'Show Invalid Password Error'.",
    diagram: { base: 'Login', target: 'Show Error' },
    options: [
      { id: 'o1', label: '<<include>>', isCorrect: false },
      { id: 'o2', label: '<<extend>>', isCorrect: true }
    ],
    explanation: [{ text: "<<extend>> is used for optional or exceptional flows that only happen under specific conditions (like entering a wrong password).", img: null }]
  },
  {
    id: 5,
    type: 'visual-select',
    question: "Select the component that represents a Use Case.",
    elements: [
      { id: 'e1', label: 'Cashier', shape: 'actor', isCorrect: false },
      { id: 'e2', label: 'Print Receipt', shape: 'usecase', isCorrect: true },
      { id: 'e3', label: 'Database', shape: 'box', isCorrect: false }
    ],
    explanation: [{ text: "A Use Case is a specific action or goal the system performs, represented by a horizontal oval.", img: null }]
  }
];

export default function LevelReview() {
  const [phase, setPhase] = useState('splash');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [status, setStatus] = useState('idle');
  const [selectedOpt, setSelectedOpt] = useState<any>(null);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [xp, setXp] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState(0);

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
      setSelectedOpt(opt);
      setStatus('ready');
    }
  };

  const handleCheck = () => {
    if (!selectedOpt) return;

    if (selectedOpt.isCorrect) {
      setStatus('correct');
      setXp(prev => prev + 20);
    } else {
      setStatus('incorrect');
      setMistakesCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setIsModalOpen(false);
    setModalPage(0);
    setStatus('idle');
    setSelectedOpt(null);

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
                {el.shape === 'usecase' && (
                  <div className="w-32 h-16 mb-4 border-4 border-current rounded-[50%] flex items-center justify-center bg-black/20 shadow-inner"></div>
                )}

                <span className="font-bold text-lg">{el.label}</span>

                {(status === 'correct' || status === 'incorrect') && el.isCorrect && <CheckCircle2 size={32} className="absolute -top-4 -right-4 text-green-500 bg-[#09090b] rounded-full" />}
                {status === 'incorrect' && isSelected && !el.isCorrect && <AlertCircle size={32} className="absolute -top-4 -right-4 text-red-500 bg-[#09090b] rounded-full" />}
              </div>
            )
          })}
        </div>
      );
    }

    if (currentQ.type === 'fill-blank') {
      return (
        <div className="w-full flex flex-col items-center gap-12 mt-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-xl font-bold bg-neutral-900/50 p-10 rounded-[2rem] border border-neutral-800 w-full justify-center shadow-lg">
            <div className="px-8 py-4 border-2 border-white rounded-full bg-black/40">{currentQ.diagram?.base}</div>

            <div className="flex flex-col items-center min-w-[200px]">
              <span className={`text-sm mb-3 font-mono px-4 py-1.5 rounded transition-colors
                    ${selectedOpt && (status === 'idle' || status === 'ready') ? 'bg-white text-black font-bold' :
                  selectedOpt && status === 'correct' ? 'bg-green-500 text-black font-bold' :
                    selectedOpt && status === 'incorrect' ? 'bg-red-500 text-white font-bold' :
                      'bg-neutral-800 text-neutral-500 border border-neutral-700 border-dashed'}`}>
                {selectedOpt ? selectedOpt.label : "Tap below to fill"}
              </span>
              <div className="w-full border-b-4 border-dashed border-neutral-500 relative">
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-neutral-500"></div>
              </div>
            </div>

            <div className="px-8 py-4 border-2 border-neutral-400 text-neutral-300 rounded-full bg-black/20">{currentQ.diagram?.target}</div>
          </div>

          <div className="flex gap-4 w-full">
            {currentQ.options?.map((opt: any) => {
              const isSelected = selectedOpt?.id === opt.id;
              let btnClass = "flex-1 p-5 rounded-2xl border-4 font-bold transition-all text-lg flex items-center justify-center gap-3 ";

              if (status === 'idle' || status === 'ready') {
                btnClass += isSelected ? "border-white bg-white/10 scale-[1.02]" : "border-neutral-700 bg-neutral-900/50 text-white hover:border-neutral-500";
              } else {
                if (opt.isCorrect) btnClass += "border-green-500 bg-green-500/20 text-green-400 ";
                else if (isSelected && !opt.isCorrect) btnClass += "border-red-500 bg-red-500/20 text-red-400 ";
                else btnClass += "border-neutral-800 bg-neutral-900/30 text-neutral-600 opacity-40 ";
              }

              return (
                <button key={opt.id} onClick={() => handleSelect(opt)} disabled={status !== 'idle' && status !== 'ready'} className={btnClass}>
                  {opt.label}
                  {(status === 'correct' || status === 'incorrect') && opt.isCorrect && <CheckCircle2 size={24} />}
                  {status === 'incorrect' && isSelected && !opt.isCorrect && <AlertCircle size={24} />}
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 
                ${(status !== 'idle' && status !== 'ready' && opt.isCorrect) ? 'border-green-500 bg-green-500 text-black' :
                  (status === 'incorrect' && isSelected && !opt.isCorrect) ? 'border-red-500 bg-red-500 text-white' :
                    isSelected && (status === 'idle' || status === 'ready') ? 'border-white text-white' : 'border-neutral-600 text-neutral-400'}`}>
                {opt.id}
              </div>
              <span className="flex-1">{opt.label}</span>
              {(status === 'correct' || status === 'incorrect') && opt.isCorrect && <CheckCircle2 className="text-green-500" size={28} />}
              {status === 'incorrect' && isSelected && !opt.isCorrect && <AlertCircle className="text-red-500" size={28} />}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: phase === 'complete' ? '#1e1b4b' : '#09090b', color: '#f8fafc', minHeight: '100vh' }}
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
          <Link to="/" className="text-neutral-500 hover:text-white transition-colors">
            <X size={28} />
          </Link>

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
        <main className="flex-1 flex flex-col items-center pt-8 px-6 max-w-4xl mx-auto w-full pb-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700 px-6 text-center" style={{ backgroundColor: '#09090b' }}>
          <Mascot state="level_failed" size="scale-150" />
          <h1 className="text-4xl md:text-5xl font-black mb-4 mt-8">That was tricky!</h1>
          <p className="text-neutral-400 text-lg md:text-xl mb-12 max-w-sm">
            Level review not cleared, keep working through the course
          </p>
          <div className="flex flex-col items-center">
            <span className="text-neutral-500 font-black text-sm tracking-widest uppercase mb-2">TOTAL XP</span>
            <div className="flex items-center gap-1 text-5xl font-black">
              {xp} <Zap size={36} className="text-green-500" fill="currentColor" />
            </div>
          </div>
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
          <Mascot state="level_complete" size="scale-[1.5]" />
          <h1 className="text-4xl md:text-5xl font-black mb-12 mt-16 drop-shadow-lg text-white">Level complete!</h1>
          <div className="flex flex-col items-center">
            <span className="text-purple-300 font-black text-sm tracking-widest uppercase mb-2 drop-shadow">TOTAL XP</span>
            <div className="flex items-center gap-1 text-6xl font-black text-white drop-shadow-md">
              {xp} <Zap size={44} className="text-green-400" fill="currentColor" />
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

    </div>
  );
}
