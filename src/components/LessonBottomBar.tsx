import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Mascot from './Mascot';
import { Link } from 'react-router-dom';

interface LessonBottomBarProps {
  phase: 'learning' | 'lesson' | 'skill_check' | 'complete' | string;
  status: 'idle' | 'ready' | 'correct' | 'incorrect' | 'showing_answer' | 'skill_check_incorrect' | string;
  isTheory?: boolean;
  hasExplanation?: boolean;
  hint?: string;
  isModalOpen: boolean;
  hasViewedExplanation: boolean;
  isLastStep: boolean;
  mascotState: string;

  onCheck: () => void;
  onNext: () => void;
  onTryAgain: () => void;
  onSeeAnswer: () => void;
  onOpenModal: () => void;
}

export default function LessonBottomBar({
  phase,
  status,
  isTheory = false,
  hasExplanation = false,
  hint,
  isModalOpen,
  hasViewedExplanation,
  isLastStep,
  mascotState,
  onCheck,
  onNext,
  onTryAgain,
  onSeeAnswer,
  onOpenModal
}: LessonBottomBarProps) {
  if (phase !== 'learning' && phase !== 'lesson' && phase !== 'skill_check' && phase !== 'complete') {
    return null;
  }

  return (
    <div className={`absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent z-40 flex items-end justify-center pointer-events-none rounded-b-[1.8rem] transition-all duration-300
      border-b-2 border-l-2 border-r-2
      ${status === 'correct' ? 'border-[#4ADE80] shadow-[0_10px_40px_rgba(74,222,128,0.15)]' : ''}
      ${(status === 'incorrect' || status === 'skill_check_incorrect') ? 'border-[#ca8a04]' : ''}
      ${(status === 'idle' || status === 'ready' || status === 'showing_answer' || phase === 'complete') ? 'border-neutral-800' : ''}
    `}>
      
      {/* Left Side: Mascot & Hints */}
      <div className="absolute bottom-0 left-0 flex items-end z-50 pointer-events-auto">
        {(phase === 'learning' || phase === 'lesson') && (
          <div className="relative w-24 h-24 -mb-2 -ml-2 flex justify-center">
            <Mascot state={mascotState} size="scale-75" />
            
            {/* Floating Tooltips */}
            {(status === 'incorrect' || status === 'showing_answer') && (
              <div className={`absolute bottom-[90%] left-[80%] ml-4 w-64 p-4 rounded-2xl text-sm font-bold shadow-xl animate-in slide-in-from-left-2 fade-in
                ${status === 'incorrect' ? 'bg-[#ca8a04] text-white' : 'bg-[#222] text-white border border-neutral-700'}`}>
                <div className={`absolute -bottom-2 -left-2 w-4 h-4 rotate-45 ${status === 'incorrect' ? 'bg-[#ca8a04]' : 'bg-[#222] border-b border-l border-neutral-700'}`}></div>
                {status === 'incorrect' && (hint || "Không chính xác, thử lại nhé!")}
                {status === 'showing_answer' && "Đây là đáp án chính xác."}
              </div>
            )}
            {status === 'correct' && (
              <div className="absolute bottom-[90%] left-[80%] ml-4 w-32 p-3 rounded-2xl text-sm font-bold bg-[#4ADE80] text-black shadow-xl animate-in slide-in-from-left-2 fade-in text-center">
                <div className="absolute -bottom-2 -left-2 w-4 h-4 rotate-45 bg-[#4ADE80]"></div>
                Tuyệt vời!
              </div>
            )}
          </div>
        )}

        {phase === 'skill_check' && status !== 'idle' && status !== 'ready' && (
          <div className="absolute bottom-6 left-6 flex items-center gap-3 animate-in fade-in whitespace-nowrap">
            {status === 'correct' ? (
              <><CheckCircle2 size={24} className="text-green-500" /> <span className="font-bold text-lg text-green-500">Correct</span></>
            ) : (
              <><AlertCircle size={24} className="text-red-500" /> <span className="font-bold text-lg text-red-500">Incorrect</span></>
            )}
          </div>
        )}
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex items-center gap-3 pointer-events-auto z-50 mb-2 w-full justify-center">
        {phase === 'complete' && (
           <Link to="/" className="w-full max-w-sm flex items-center justify-center py-4 rounded-full font-black text-lg bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
             Continue
           </Link>
        )}

        {phase !== 'complete' && isTheory && (
          <button onClick={onNext} className="px-10 py-3.5 rounded-full font-black text-lg bg-[#EEE] text-black hover:bg-white active:scale-95 transition-all">
            Continue
          </button>
        )}

        {!isTheory && phase !== 'complete' && (
          <>
            {status === 'idle' && (
              <button disabled className="px-10 py-3.5 rounded-full font-black text-lg bg-[#222] text-neutral-500 cursor-not-allowed">
                Check
              </button>
            )}

            {status === 'ready' && (
              <button onClick={onCheck} className="px-10 py-3.5 rounded-full font-black text-lg bg-[#EEE] text-black hover:bg-white active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
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
                {hasExplanation && (
                  <button onClick={onOpenModal} className="px-6 py-3.5 rounded-full font-bold text-[#AAA] hover:text-white bg-[#222] transition-colors">
                    Why?
                  </button>
                )}
                <button onClick={onNext} className="px-10 py-3.5 rounded-full font-black text-lg bg-green-500 text-black hover:bg-green-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                  {isLastStep ? 'Finish' : 'Continue'}
                </button>
              </>
            )}

            {status === 'incorrect' && (
              <>
                <button onClick={onSeeAnswer} className="px-6 py-3.5 rounded-full font-bold text-white bg-[#333] hover:bg-[#444] transition-colors">
                  See answer
                </button>
                <button onClick={onTryAgain} className="px-10 py-3.5 rounded-full font-black text-lg bg-yellow-500 text-black hover:bg-yellow-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  Try again
                </button>
              </>
            )}

            {status === 'showing_answer' && (
              <>
                {hasExplanation && (
                  <button onClick={onOpenModal} className="px-6 py-3.5 rounded-full font-bold text-white bg-transparent border-2 border-neutral-700 hover:border-neutral-500 transition-colors">
                    Why?
                  </button>
                )}
                {(!isModalOpen && !hasViewedExplanation && hasExplanation) ? (
                  <button onClick={onNext} className="px-10 py-3.5 rounded-full font-bold text-white bg-[#333] hover:bg-[#444] active:scale-95 transition-all">
                    Skip explanation
                  </button>
                ) : (
                  <button onClick={onNext} className="px-10 py-3.5 rounded-full font-black text-lg bg-[#EEE] text-black hover:bg-white active:scale-95 transition-all">
                    Continue
                  </button>
                )}
              </>
            )}

            {status === 'skill_check_incorrect' && (
              <>
                {hasExplanation && (
                  <button onClick={onOpenModal} className="px-6 py-3.5 rounded-full font-bold text-[#AAA] hover:text-white bg-[#222] transition-colors whitespace-nowrap">
                    Why?
                  </button>
                )}
                <button onClick={onNext} className="px-10 py-3.5 rounded-full font-black text-lg bg-[#333] text-white hover:bg-[#444] transition-colors whitespace-nowrap">
                  {isLastStep ? 'Finish' : 'Continue'}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
