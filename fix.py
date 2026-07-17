import re

with open('src/pages/LessonPlayer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add missing imports
imports = """import SliderReveal from '../components/interactive/SliderReveal';
import DragToBins from '../components/interactive/DragToBins';
import TextHighlight from '../components/interactive/TextHighlight';
import BlockMapping from '../components/interactive/BlockMapping';
import Ordering from '../components/interactive/Ordering';
import ClickConnect from '../components/interactive/ClickConnect';
import CutEdge from '../components/interactive/CutEdge';
import CableSelect from '../components/interactive/CableSelect';
import SliderExploratory from '../components/interactive/SliderExploratory';
import EquationBuilder from '../components/interactive/EquationBuilder';
import MapRunner from '../components/interactive/MapRunner';
import SliderExtend from '../components/interactive/SliderExtend';
import FlipEdge from '../components/interactive/FlipEdge';
import TreeMapping from '../components/interactive/TreeMapping';
import VisualSelectEdge from '../components/interactive/VisualSelectEdge';
import { ALL_LESSONS } from '../data/lessons';
import Leaderboard from './Leaderboard';

const SplashIconSVG = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32 mb-8 animate-in zoom-in spin-in-12 duration-1000">
    <circle cx="50" cy="50" r="45" fill="none" stroke="#4ADE80" strokeWidth="8" strokeDasharray="200" className="animate-[spin_4s_linear_infinite]" />
    <path d="M30 50 L45 65 L70 35" fill="none" stroke="#4ADE80" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" className="animate-[draw_1s_ease-out_forwards]" />
  </svg>
);

const PurpleGemSVG = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 mb-6">
    <path d="M50 10 L80 40 L50 90 L20 40 Z" fill="#A855F7" stroke="#D8B4FE" strokeWidth="4" className="drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
    <path d="M50 10 L80 40 L50 60 L20 40 Z" fill="#D8B4FE" opacity="0.5" />
    <path d="M35 40 L65 40 L50 80 Z" fill="#9333EA" />
  </svg>
);

const DumbbellSVG = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 mb-6">
    <rect x="10" y="30" width="20" height="40" rx="4" fill="#525252" />
    <rect x="70" y="30" width="20" height="40" rx="4" fill="#525252" />
    <rect x="30" y="45" width="40" height="10" fill="#737373" />
    <circle cx="20" cy="50" r="15" fill="#404040" />
    <circle cx="80" cy="50" r="15" fill="#404040" />
  </svg>
);"""

content = content.replace("import { ALL_LESSONS } from '../data/lessons';", imports)

# 2. Add mistakesCount and fix status type
content = content.replace(
    "const [status, setStatus] = useState('idle');",
    "const [status, setStatus] = useState<'idle' | 'ready' | 'correct' | 'incorrect' | 'skill_check_incorrect' | 'showing_answer'>('idle');\n  const [mistakesCount, setMistakesCount] = useState(0);"
)

# 3. Handle check and Handle component complete
handle_check = """
  const handleComponentComplete = (result: any) => {
    if (!result) {
      setStatus('idle');
      return;
    }
    
    if (result.isCorrect) {
      setStatus('correct');
      if (status !== 'showing_answer') {
        const added = phase === 'skill_check' ? 20 : 10;
        setXp(prev => prev + added);
        setXpAddedAnim(added);
        setTimeout(() => setXpAddedAnim(null), 1000);
      }
    } else {
      setMistakesCount(prev => prev + 1);
      setStatus(phase === 'skill_check' ? 'skill_check_incorrect' : 'incorrect');
    }
  };

  const handleCheck = () => {
"""
content = content.replace("  const handleCheck = () => {\n", handle_check)

# 4. mistakesCount increment in handleCheck
content = content.replace(
    "setStatus(phase === 'skill_check' ? 'skill_check_incorrect' : 'incorrect');",
    "setMistakesCount(prev => prev + 1);\n      setStatus(phase === 'skill_check' ? 'skill_check_incorrect' : 'incorrect');"
)

# 5. nextPhase transition
old_next = """    if (currentStep < LESSON_DATA.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setPhase('complete');
    }"""
new_next = """    if (currentStep < LESSON_DATA.length - 1) {
      setCurrentStep(prev => prev + 1);
      const nextStepIndex = currentStep + 1;
      if (LESSON_DATA[nextStepIndex]?.type === 'skill_check') {
         setPhase('skill_check');
      }
    } else {
      if (mistakesCount > 1) {
        setPhase('tricky');
      } else {
        setPhase('complete');
      }
    }"""
content = content.replace(old_next, new_next)

# 6. Inject the tricky and complete phases correctly.
# Find the start of `{phase === 'complete' && (`
old_complete = """        {phase === 'complete' && ("""
new_complete = """      {phase === 'tricky' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]">
          <div className="flex flex-col items-center max-w-sm text-center animate-in zoom-in slide-in-from-bottom-8 duration-700">
            <DumbbellSVG />
            <Mascot state="level_failed" size="scale-[1.5]" className="mb-10" />
            
            <h1 className="text-3xl font-black mb-4 text-white">That was tricky!</h1>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              Bạn đã hoàn thành bài kiểm tra, nhưng vẫn còn một vài chỗ bị nhầm lẫn. Hãy xem lại lý thuyết và thử sức lại nhé!
            </p>

            <Link to="/" className="w-full">
              <button className="w-full py-4 rounded-2xl bg-neutral-800 text-white font-bold text-lg hover:bg-neutral-700 transition-colors shadow-lg">
                Về trang chủ
              </button>
            </Link>
          </div>
        </div>
      )}

      {phase === 'complete' && ("""
content = content.replace(old_complete, new_complete)

# 7. Add leaderboard wrap
old_frame = """      {/* FRAME */}
      <div className={`flex-1 overflow-hidden"""

new_frame = """      {/* FRAME */}
      {phase === 'leaderboard' ? (
         <Leaderboard oldXp={initialXp} newXp={xp} onContinue={() => navigate('/')} />
      ) : (
      <div className={`flex-1 overflow-hidden"""
content = content.replace(old_frame, new_frame)

old_endframe = """      </main>
      </div> {/* End Frame */}"""

new_endframe = """      </main>
      </div> {/* End Frame */}
      )}"""
content = content.replace(old_endframe, new_endframe)

# 8. Complete Continue button replaced by Leaderboard transition
old_continue = """                <Link to="/" className="w-full mt-6">
                  <button className="w-full py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                    Continue
                  </button>
                </Link>"""
new_continue = """                <div className="w-full mt-6 space-y-4 max-w-sm">
                  <button onClick={() => setPhase('leaderboard')} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                    Xem Bảng Xếp Hạng
                  </button>
                  <Link to="/" className="block w-full">
                    <button className="w-full py-4 rounded-2xl bg-neutral-800 text-white font-bold text-lg hover:bg-neutral-700 transition-colors">
                      Về trang chủ
                    </button>
                  </Link>
                </div>"""
content = content.replace(old_continue, new_continue)

# 9. Inject components
components = """               {currentData.interactionType === 'slider_reveal' && (
                 <SliderReveal data={currentData} status={status} onComplete={handleSelect} />
               )}

               {currentData.interactionType === 'drag_to_bins' && (
                  <DragToBins data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'text_highlight' && (
                  <TextHighlight data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'block_mapping' && (
                  <BlockMapping data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'ordering' && (
                  <Ordering data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'click_connect' && (
                  <ClickConnect data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'cut_edge' && (
                  <CutEdge data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'cable_select' && (
                  <CableSelect data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'slider_exploratory' && (
                  <SliderExploratory data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'equation_builder' && (
                  <EquationBuilder data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'map_runner' && (
                  <MapRunner data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'slider_extend' && (
                  <SliderExtend data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'flip_edge' && (
                  <FlipEdge data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'tree_mapping' && (
                  <TreeMapping data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

               {currentData.interactionType === 'visual_select_edge' && (
                  <VisualSelectEdge data={currentData} status={status} onComplete={handleComponentComplete} />
               )}

"""
old_interactive_marker = "               {currentData.type === 'interactive' && status !== 'idle' && status !== 'correct' && status !== 'showing_answer' && ("

content = content.replace(old_interactive_marker, components + old_interactive_marker)


with open('src/pages/LessonPlayer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated LessonPlayer.tsx cleanly.")
