import { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Lock, Check, ArrowUp } from 'lucide-react';
import Mascot from '../components/Mascot';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { LESSON_METADATA } from '../data/lessons';

const CourseIconSVG = () => (
  <div className="relative w-32 h-32 flex items-center justify-center group cursor-default mb-4">
    {/* Animated glowing backdrop */}
    <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl group-hover:bg-blue-400/30 transition-colors duration-500 pointer-events-none"></div>
    
    {/* Back layer (glass panel) */}
    <div className="absolute w-28 h-28 bg-white/5 backdrop-blur-xl rounded-[2rem] transform rotate-12 border border-white/10 group-hover:rotate-[15deg] transition-transform duration-500"></div>
    
    {/* Middle layer (UML actors abstract) */}
    <div className="absolute w-28 h-28 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[2rem] shadow-2xl flex items-center justify-center -rotate-6 group-hover:-rotate-3 transition-transform duration-500 overflow-hidden border border-blue-400/30">
       <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
       <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl transform -translate-x-1/2 translate-y-1/2"></div>
       
       <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 p-4">
          {/* Mock UML System Box */}
          <div className="w-full h-10 bg-white/20 rounded-xl border border-white/30 backdrop-blur-md relative flex items-center justify-center shadow-inner group-hover:bg-white/30 transition-colors duration-500">
             <div className="w-10 h-1.5 bg-white/50 rounded-full"></div>
             {/* Small line connecting to actor */}
             <div className="absolute -left-4 top-1/2 w-4 h-0.5 bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)]"></div>
          </div>
          <div className="flex gap-5 mt-1">
             {/* Mock Actor 1 */}
             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-[0_0_15px_rgba(250,204,21,0.6),_inset_0_2px_4px_rgba(255,255,255,0.8)] border border-yellow-200"></div>
             {/* Mock Actor 2 */}
             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.6),_inset_0_2px_4px_rgba(255,255,255,0.8)] border border-cyan-200"></div>
          </div>
       </div>
    </div>
    
    {/* Floating accent elements */}
    <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-300 to-yellow-500 p-2.5 rounded-2xl shadow-[0_10px_20px_rgba(250,204,21,0.4)] transform rotate-12 animate-bounce border border-yellow-100">
       <Zap size={18} className="text-yellow-900 fill-yellow-900 drop-shadow-md" />
    </div>
  </div>
);

const LEVEL_INFO: Record<string, { num: string; name: string }> = {
  'Level1_SystemAndActors': { num: 'LEVEL 1', name: 'System & Actors' },
  'Level2_CoreUseCases': { num: 'LEVEL 2', name: 'Core Use Cases' },
  'Level3_AdvancedRelationships': { num: 'LEVEL 3', name: 'Advanced Relationships' },
  'Level4_RefiningDiagram': { num: 'LEVEL 4', name: 'Refining the Diagram' },
  'Level5_RealWorldArchitectures': { num: 'LEVEL 5', name: 'Real-World Architectures' },
};

// Map lessons by level
const levelsMapping: Record<string, any[]> = {};
LESSON_METADATA.forEach(lesson => {
  if (!levelsMapping[lesson.level]) levelsMapping[lesson.level] = [];
  levelsMapping[lesson.level].push(lesson);
});
const sortedLevelKeys = Object.keys(LEVEL_INFO);

const getCompletedLessons = () => {
  try {
    return JSON.parse(localStorage.getItem('completed_lessons') || '[]');
  } catch {
    return [];
  }
};

export default function Dashboard() {
  const location = useLocation();
  const isHome = location.pathname === '/home';
  const [isMascotVisible, setIsMascotVisible] = useState(true);
  const [isSelectedNodeVisible, setIsSelectedNodeVisible] = useState(true);
  
  const completedLessons = getCompletedLessons();
  const firstUncompleted = LESSON_METADATA.find(l => !completedLessons.includes(l.id))?.id || LESSON_METADATA[LESSON_METADATA.length - 1].id;
  const ACTIVE_LESSON_ID = firstUncompleted;

  const [selectedLessonId, setSelectedLessonId] = useState(ACTIVE_LESSON_ID);
  
  const selectedLessonData = LESSON_METADATA.find(l => l.id === selectedLessonId);
  const isActiveLessonSelected = selectedLessonId === ACTIVE_LESSON_ID;
  const isCardVisible = selectedLessonData && isSelectedNodeVisible;
  const showJumpArrow = !isActiveLessonSelected || !isMascotVisible;

  const mascotRef = useRef<HTMLDivElement>(null);
  const selectedNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => { setIsMascotVisible(entry.isIntersecting); },
      { root: null, threshold: 0.1, rootMargin: "-100px 0px 0px 0px" }
    );
    if (mascotRef.current) observer1.observe(mascotRef.current);

    const observer2 = new IntersectionObserver(
      ([entry]) => { setIsSelectedNodeVisible(entry.isIntersecting); },
      { root: null, threshold: 0.1, rootMargin: "-100px 0px 0px 0px" }
    );
    if (selectedNodeRef.current) observer2.observe(selectedNodeRef.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, [selectedLessonId, isHome]);

  const scrollToCurrent = () => {
    setSelectedLessonId(ACTIVE_LESSON_ID);
    if (mascotRef.current) {
      mascotRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderHome = () => (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 animate-in fade-in">
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <h2 className="text-xl font-bold">Welcome, Nguyễn Huy</h2>
        <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-neutral-800 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-1 text-5xl font-black">2 <Zap size={40} className="text-yellow-500 fill-yellow-500" /></div>
            <div className="flex items-center gap-1"><Zap size={20} className="text-neutral-600 fill-neutral-600" /><Zap size={20} className="text-neutral-600 fill-neutral-600" /></div>
          </div>
          <div className="flex justify-between">
            {['W', 'Th', 'F', 'S', 'Su'].map((day, i) => (
               <div key={day} className="flex flex-col items-center gap-2">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i < 2 ? 'bg-yellow-500' : 'bg-[#222]'}`}>
                    <Zap size={20} className={i < 2 ? 'text-black fill-black' : 'text-neutral-600 fill-neutral-600'} />
                 </div>
                 <span className={`text-sm font-bold ${i === 1 ? 'text-white' : 'text-neutral-500'}`}>{day}</span>
               </div>
            ))}
          </div>
        </div>
        <div className="bg-[#1A1A1A] rounded-3xl border border-neutral-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
             <div className="flex items-center gap-3">
               <Shield size={36} className="text-amber-600 fill-amber-700" />
               <div>
                 <h4 className="font-black text-sm tracking-widest text-neutral-300">HYDROGEN LEAGUE</h4>
                 <p className="text-xs font-bold text-neutral-500 mt-1">Top 15 advance • 3 days left</p>
               </div>
             </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
             <div className="flex items-center justify-between p-3 rounded-2xl text-neutral-400">
               <div className="flex items-center gap-4"><span className="w-4 font-bold">2</span><div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white font-bold">O</div><span className="font-bold">Orly E</span></div>
               <span className="font-bold">1105 XP</span>
             </div>
             <div className="flex items-center justify-between p-3 rounded-2xl bg-green-900/30 border border-green-800/50 text-white shadow-lg transform scale-105">
               <div className="flex items-center gap-4"><span className="w-4 font-bold text-yellow-500">3</span><div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold shadow-inner">N</div><span className="font-bold text-lg">Nguyễn Huy H</span></div>
               <span className="font-black text-green-400">955 XP</span>
             </div>
             <div className="flex items-center justify-between p-3 rounded-2xl text-neutral-400">
               <div className="flex items-center gap-4"><span className="w-4 font-bold">4</span><div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center text-white font-bold">A</div><span className="font-bold">Ana S</span></div>
               <span className="font-bold">485 XP</span>
             </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <h2 className="text-xl font-bold">Jump back in</h2>
        <div className="relative pt-4 pr-4">
           <div className="absolute inset-0 bg-[#222] rounded-3xl transform translate-x-4 translate-y-4 border border-neutral-800"></div>
           <div className="absolute inset-0 bg-[#1A1A1A] rounded-3xl transform translate-x-2 translate-y-2 border border-neutral-800"></div>
           <div className="relative bg-[#111] p-8 rounded-3xl border border-neutral-700 shadow-2xl flex flex-col items-center">
              <h3 className="text-2xl font-black mt-2">Use Case Diagram</h3>
              <span className="text-yellow-500 font-bold text-xs tracking-widest uppercase mt-2">Level 1</span>
              <div className="my-10 relative">
                 <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                 <CourseIconSVG />
                 <div className="absolute -top-4 -right-4 bg-black p-2 rounded-full shadow-lg border border-neutral-700 animate-bounce">
                    <Zap size={20} className="text-yellow-500 fill-yellow-500" />
                 </div>
              </div>
              <div className="w-full max-w-md flex flex-col gap-4">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-neutral-800">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full border-4 border-green-500 bg-green-500/20 flex items-center justify-center"><Check size={20} className="text-green-500"/></div>
                       <span className="font-bold text-neutral-400">System Boundaries</span>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-lg transform scale-105 z-10 relative">
                    <div className="flex items-center gap-4">
                       <div className="relative w-12 h-12 flex items-center justify-center">
                         <div className="absolute inset-0 border-4 border-yellow-500 rounded-full animate-ping opacity-20"></div>
                         <div className="w-full h-full rounded-full border-4 border-yellow-500 bg-black flex items-center justify-center relative overflow-hidden">
                            <Mascot state="path_idle" size="scale-[0.25]" className="absolute" />
                         </div>
                       </div>
                       <span className="font-bold text-lg text-white">Identifying Actors</span>
                    </div>
                 </div>
                 <Link to="/lesson/3" className="w-full mt-4 py-5 bg-yellow-500 text-black font-black text-xl rounded-full hover:bg-yellow-400 active:scale-95 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center justify-center">
                    Start
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => {
    let globalLessonIndex = 0;
    const isLockedSelection = selectedLessonId > ACTIVE_LESSON_ID;
    
    const cardBorderClass = isLockedSelection 
      ? "border-t-[6px] border-t-neutral-600 shadow-[0_30px_60px_rgba(0,0,0,0.9),_0_0_40px_rgba(255,255,255,0.05)]" 
      : "border-t-[6px] border-t-yellow-500/80 shadow-[0_30px_60px_rgba(0,0,0,0.9),_0_0_40px_rgba(234,179,8,0.2)]";

    return (
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16 animate-in fade-in">
        
        {/* Left Column: Course Info (Sticky) */}
        <div className="w-full lg:w-[420px] shrink-0">
           <div className="sticky top-24 relative group">
              {/* Card glowing backdrop */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl rounded-[3rem] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative bg-[#1A1A1A]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-neutral-700/50 shadow-[0_30px_60px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:border-neutral-600/50 transition-colors duration-500">
                 <CourseIconSVG />
                 <h1 className="text-4xl font-black mt-8 mb-4 tracking-tight drop-shadow-md">Use Case Diagram</h1>
                 <p className="text-neutral-400 font-medium leading-relaxed mb-8 text-lg">
                   Master software architecture. Learn how to define boundaries, identify actors, and design core system behaviors using UML standards.
                 </p>
                 <div className="flex items-center gap-6 font-bold text-sm text-neutral-300">
                    <span className="flex items-center gap-2 bg-neutral-900/80 px-4 py-2.5 rounded-full border border-neutral-800 shadow-inner">
                       <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center"><Check size={12} className="text-yellow-500"/></div> 
                       22 Lessons
                    </span>
                    <span className="flex items-center gap-2 bg-neutral-900/80 px-4 py-2.5 rounded-full border border-neutral-800 shadow-inner">
                       <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><Zap size={12} className="text-blue-500 fill-blue-500"/></div> 
                       240 Exercises
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Column: The Path */}
        <div className="flex-1 relative pb-40 flex flex-col items-center">
           
           {sortedLevelKeys.map((levelKey) => {
             const levelData = LEVEL_INFO[levelKey];
             const lessons = levelsMapping[levelKey] || [];
             if (lessons.length === 0) return null;

             return (
               <div key={levelKey} className="w-full flex flex-col items-center">
                 {/* Sticky Level Header */}
                 <div className="sticky top-[80px] z-30 w-full flex justify-center mt-12 mb-16 pointer-events-none">
                    <div className="w-full max-w-sm bg-gradient-to-b from-[#2A2A2A] to-[#111] py-4 px-10 rounded-full border-b-[6px] border-b-yellow-800 border-t border-t-yellow-300 border-x border-x-yellow-600/50 text-center shadow-[0_20px_40px_rgba(0,0,0,0.9),_0_0_20px_rgba(234,179,8,0.2),_inset_0_2px_10px_rgba(255,255,255,0.1)] pointer-events-auto relative overflow-hidden">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-yellow-300/40 blur-md rounded-full"></div>
                       <span className="text-neutral-400 font-black text-[11px] tracking-widest uppercase drop-shadow-md">{levelData.num}</span>
                       <h2 className="text-xl font-black text-white mt-0.5 drop-shadow-lg">{levelData.name}</h2>
                    </div>
                 </div>

                 {/* Nodes for this level */}
                 <div className="flex flex-col items-center gap-6 w-full relative">
                   {lessons.map((lesson) => {
                     const isCompleted = lesson.id < ACTIVE_LESSON_ID;
                     const isActive = lesson.id === ACTIVE_LESSON_ID;
                     const isLocked = lesson.id > ACTIVE_LESSON_ID;

                     const isSelected = lesson.id === selectedLessonId;

                     // Calculate Zigzag margin based on global index
                     const zigZagPattern = [0, 40, 80, 40, 0, -40, -80, -40]; // Pixel offsets
                     const translateX = zigZagPattern[globalLessonIndex % zigZagPattern.length];
                     
                     const setRefs = (el: HTMLDivElement | null) => {
                       if (isActive) mascotRef.current = el;
                       if (isSelected) selectedNodeRef.current = el;
                     };

                     const renderedNode = (
                       <div 
                         key={lesson.id} 
                         ref={setRefs}
                         onClick={() => setSelectedLessonId(lesson.id)}
                         className="flex flex-col items-center relative transition-transform duration-500 cursor-pointer mb-20"
                         style={{ transform: `translateX(${translateX}px)` }}
                       >

                          {/* COMPLETED NODE */}
                          {isCompleted && (
                            <div className="relative flex items-center justify-center group z-10">
                               {/* ROTATING GOLD RING */}
                               {isSelected && (
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                                     <div className="w-[120px] h-[120px] rounded-full border-[3px] border-transparent border-t-yellow-400 border-r-yellow-500 animate-[spin_3s_linear_infinite] shadow-[0_0_15px_rgba(250,204,21,0.5)] transform scale-y-[0.57] opacity-90"></div>
                                  </div>
                               )}
                               <div className="relative w-[110px] h-[65px] bg-gradient-to-b from-[#fef08a] to-[#eab308] rounded-[50%] border-t-[2px] border-t-yellow-100 border-b-[10px] border-[#a16207] shadow-[0_15px_30px_rgba(202,138,4,0.5),_inset_0_-2px_15px_rgba(0,0,0,0.2)] flex items-center justify-center transform group-active:scale-95 transition-transform group-hover:brightness-110 z-10">
                                  {/* Raised Checkmark Center */}
                                  <div className="w-[60px] h-[35px] bg-gradient-to-b from-[#fef08a] to-[#ca8a04] rounded-[50%] flex items-center justify-center shadow-[0_5px_10px_rgba(0,0,0,0.5),_inset_0_2px_5px_rgba(255,255,255,0.8)] border-b-[4px] border-[#854d0e] border-t border-yellow-200">
                                     <Check size={20} className="text-[#653808] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]" strokeWidth={5} />
                                  </div>
                               </div>
                               <div className="absolute left-[130px] whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity z-20">
                                  <h3 className="font-bold text-neutral-400">{lesson.title}</h3>
                               </div>
                            </div>
                          )}

                          {/* LOCKED NODE */}
                          {isLocked && (
                            <div className="relative flex items-center justify-center opacity-90 z-10 group mt-2">
                               {/* ROTATING GOLD RING */}
                               {isSelected && (
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                                     <div className="w-[100px] h-[100px] rounded-full border-[3px] border-transparent border-t-yellow-400 border-r-yellow-500 animate-[spin_3s_linear_infinite] shadow-[0_0_15px_rgba(250,204,21,0.5)] transform scale-y-[0.57] opacity-90"></div>
                                  </div>
                               )}
                               <div className="relative w-[80px] h-[48px] bg-gradient-to-b from-[#555] to-[#333] rounded-[50%] border-t-[2px] border-t-neutral-400 border-b-8 border-[#222] shadow-[0_10px_20px_rgba(0,0,0,0.8),_inset_0_-2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center transform group-active:scale-95 transition-transform group-hover:brightness-110 z-10">
                                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-neutral-500 to-neutral-700 border border-neutral-400 flex items-center justify-center shadow-inner">
                                     <Lock size={14} className="text-neutral-300 drop-shadow-md" />
                                  </div>
                               </div>
                               <div className="absolute left-[110px] whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity z-20">
                                  <h3 className="font-bold text-neutral-400">{lesson.title}</h3>
                               </div>
                            </div>
                          )}

                          {/* ACTIVE NODE */}
                          {isActive && (
                            <div className="relative flex items-center justify-center mt-4 z-20 group">
                               {/* ROTATING GOLD RING */}
                               {isSelected && (
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                                     <div className="w-[160px] h-[160px] rounded-full border-[3px] border-transparent border-t-yellow-400 border-r-yellow-500 animate-[spin_3s_linear_infinite] shadow-[0_0_15px_rgba(250,204,21,0.5)] transform scale-y-[0.57] opacity-90"></div>
                                  </div>
                               )}
                               {/* Massive Glow */}
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-yellow-500/20 rounded-full blur-[50px] pointer-events-none"></div>
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-yellow-400/40 rounded-full blur-[20px] pointer-events-none"></div>
                               
                               {/* The Glowing Platform */}
                               <div className="relative w-[130px] h-[75px] bg-gradient-to-b from-[#fef08a] to-[#eab308] rounded-[50%] border-b-8 border-[#a16207] shadow-[0_10px_40px_rgba(234,179,8,0.6),_inset_0_-4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center z-10">
                                  {/* Center pure light */}
                                  <div className="w-[70px] h-[35px] bg-white rounded-[50%] blur-[4px]"></div>
                                  
                                  {/* Floating Mascot */}
                                  <div className="absolute -top-[90px] animate-bounce pointer-events-none">
                                     <Mascot state="path_idle" size="scale-[0.5]" />
                                  </div>
                               </div>
                               
                               {/* Active Node Text */}
                               <div className="absolute left-[160px] whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity z-20">
                                  <h3 className="font-bold text-white text-lg drop-shadow-md">{lesson.title}</h3>
                               </div>
                            </div>
                          )}
                       </div>
                     );

                     globalLessonIndex++;
                     return renderedNode;
                   })}
                 </div>
               </div>
             );
           })}
        </div>
        
        {/* Floating Jump Here Button */}
        <button 
          onClick={scrollToCurrent} 
          className={`fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#1A1A1A] border-2 border-neutral-700 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 hover:bg-[#222] active:scale-95 transition-all duration-500 ${!showJumpArrow ? 'translate-y-32 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
        >
          <ArrowUp size={28} strokeWidth={3} />
        </button>

        {/* FIXED BOTTOM CARD */}
        {selectedLessonData && (
          <div 
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm bg-[#1A1A1A] p-6 rounded-[2rem] border-x border-x-neutral-700 border-b border-b-neutral-800 flex flex-col items-center transition-all duration-500 overflow-hidden ${cardBorderClass} ${!isCardVisible ? 'translate-y-40 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ánh sáng chiếu từ dưới lên (Bottom Glow) */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t ${isLockedSelection ? 'from-white/5' : 'from-yellow-500/10'} to-transparent pointer-events-none`}></div>
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-full h-16 ${isLockedSelection ? 'bg-white/10' : 'bg-yellow-500/30'} blur-2xl pointer-events-none`}></div>
            
            <h3 className="text-xl font-black text-white mb-6 text-center relative z-10">{selectedLessonData.title}</h3>
            <Link to={selectedLessonData.slug.includes('SkillCheck') ? '/review' : `/lesson/${selectedLessonData.id}`} className={`w-full py-4 font-black text-xl rounded-full active:scale-95 transition-all flex items-center justify-center relative z-10 ${isLockedSelection ? 'bg-[#222] text-white hover:bg-[#333] border border-neutral-700' : 'bg-[#eab308] text-black hover:bg-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.4)]'}`}>
               {selectedLessonId === ACTIVE_LESSON_ID ? 'Start' : (selectedLessonId < ACTIVE_LESSON_ID ? 'Practice' : 'Jump')}
            </Link>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-yellow-500/30">
      <Header />
      <main>
        {isHome ? renderHome() : renderCourses()}
      </main>
    </div>
  );
}
