import { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Lock, Check, ArrowUp } from 'lucide-react';
import Mascot from '../components/Mascot';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { LESSON_METADATA } from '../data/lessons';

const CourseIconSVG = () => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    <div className="absolute w-20 h-16 bg-blue-500/20 rounded-xl transform rotate-6"></div>
    <div className="absolute w-20 h-16 bg-blue-600 rounded-xl shadow-lg flex items-center justify-center -rotate-3">
       <div className="w-12 h-2 bg-white/50 rounded-full mb-4"></div>
       <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-yellow-400"></div>
       <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-white"></div>
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

const ACTIVE_LESSON_ID = 3;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('courses'); // 'home' | 'courses'
  const [isMascotVisible, setIsMascotVisible] = useState(true);
  const [selectedLessonId, setSelectedLessonId] = useState(ACTIVE_LESSON_ID);
  
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsMascotVisible(entry.isIntersecting); },
      { root: null, threshold: 0.1, rootMargin: "-100px 0px 0px 0px" }
    );
    if (mascotRef.current) observer.observe(mascotRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

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

    return (
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16 animate-in fade-in">
        
        {/* Left Column: Course Info (Sticky) */}
        <div className="w-full lg:w-1/3">
           <div className="sticky top-24 bg-[#1A1A1A] p-8 rounded-3xl border border-neutral-800 shadow-xl">
              <CourseIconSVG />
              <h1 className="text-3xl font-black mt-6 mb-3">Use Case Diagram</h1>
              <p className="text-neutral-400 font-medium leading-relaxed mb-6">
                Master software architecture. Learn how to define boundaries, identify actors, and design core system behaviors using UML standards.
              </p>
              <div className="flex items-center gap-6 font-bold text-sm text-neutral-300">
                 <span className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center"><Check size={12}/></div> 22 Lessons</span>
                 <span className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center"><Zap size={12}/></div> 240 Exercises</span>
              </div>
           </div>
        </div>

        {/* Right Column: The Path (No SVG, purely CSS Zigzag) */}
        <div className="w-full lg:w-2/3 relative pb-40 flex flex-col items-center">
           
           {sortedLevelKeys.map((levelKey) => {
             const levelData = LEVEL_INFO[levelKey];
             const lessons = levelsMapping[levelKey] || [];
             if (lessons.length === 0) return null;

             return (
               <div key={levelKey} className="w-full flex flex-col items-center">
                 {/* Sticky Level Header */}
                 <div className="sticky top-[80px] z-30 w-full flex justify-center mt-12 mb-16 pointer-events-none">
                    <div className="w-full max-w-xs bg-[#1A1A1A]/80 backdrop-blur-md py-3 px-8 rounded-full border border-neutral-700/50 text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-t border-t-neutral-600 pointer-events-auto">
                       <span className="text-neutral-500 font-black text-[10px] tracking-widest uppercase">{levelData.num}</span>
                       <h2 className="text-lg font-bold text-white mt-0.5">{levelData.name}</h2>
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
                     
                     const nodeRef = isActive ? mascotRef : null;

                     const renderedNode = (
                       <div 
                         key={lesson.id} 
                         ref={nodeRef}
                         onClick={() => setSelectedLessonId(lesson.id)}
                         className={`flex flex-col items-center relative transition-transform duration-500 cursor-pointer ${isSelected ? 'mb-40' : 'mb-8'}`}
                         style={{ transform: `translateX(${translateX}px)` }}
                       >
                          {/* COMPLETED NODE */}
                          {isCompleted && (
                            <div className="relative flex items-center justify-center group z-10">
                               <div className="w-[100px] h-[60px] bg-gradient-to-b from-[#fde047] to-[#ca8a04] rounded-[50%] border-t border-t-white/60 border-b-8 border-[#854d0e] shadow-[0_15px_25px_rgba(0,0,0,0.6),_inset_0_-4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center transform group-active:scale-95 transition-transform group-hover:brightness-110">
                                  <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white/60 flex items-center justify-center shadow-inner">
                                     <Check size={20} className="text-white drop-shadow-md" strokeWidth={4} />
                                  </div>
                               </div>
                               <div className="absolute left-[110px] whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity">
                                  <h3 className="font-bold text-neutral-400">{lesson.title}</h3>
                               </div>
                            </div>
                          )}

                          {/* LOCKED NODE */}
                          {isLocked && (
                            <div className="relative flex items-center justify-center opacity-40 z-10">
                               <div className="w-[80px] h-[48px] bg-gradient-to-b from-[#333] to-[#222] rounded-[50%] border-b-8 border-[#111] shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center">
                                  <Lock size={16} className="text-neutral-500" />
                               </div>
                            </div>
                          )}

                          {/* ACTIVE NODE */}
                          {isActive && (
                            <div className="relative flex flex-col items-center justify-center mt-4 z-20">
                               {/* Massive Glow */}
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-yellow-500/20 rounded-full blur-[50px] pointer-events-none"></div>
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-yellow-400/40 rounded-full blur-[20px] pointer-events-none"></div>
                               
                               {/* The Glowing Platform */}
                               <div className="relative w-[130px] h-[75px] bg-gradient-to-b from-[#fef08a] to-[#eab308] rounded-[50%] border-b-8 border-[#a16207] shadow-[0_10px_40px_rgba(234,179,8,0.6),_inset_0_-4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center">
                                  {/* Center pure light */}
                                  <div className="w-[70px] h-[35px] bg-white rounded-[50%] blur-[4px]"></div>
                                  
                                  {/* Floating Mascot */}
                                  <div className="absolute -top-[60px] animate-bounce">
                                     <Mascot state="path_idle" size="scale-[0.3]" />
                                  </div>
                               </div>
                            </div>
                          )}

                          {/* SELECTED ACTIVE CARD (Floating below node) */}
                          {isSelected && (
                             <div className="absolute top-[120px] w-[340px] bg-[#1A1A1A] p-6 rounded-[2rem] border border-neutral-700 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_60px_rgba(234,179,8,0.2)] border-t-[6px] border-t-yellow-500/80 flex flex-col items-center z-30 cursor-default animate-in fade-in slide-in-from-top-4" onClick={(e) => e.stopPropagation()}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-yellow-500 blur-md opacity-50"></div>
                                <h3 className="text-xl font-black text-white mb-6 text-center">{lesson.title}</h3>
                                <Link to={`/lesson/${lesson.id}`} className="w-full py-4 bg-[#eab308] text-black font-black text-xl rounded-full hover:bg-yellow-400 active:scale-95 transition-all shadow-[0_0_30px_rgba(234,179,8,0.4)] flex items-center justify-center">
                                   {isActive ? 'Start' : (isCompleted ? 'Practice' : 'Jump')}
                                </Link>
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
          className={`fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#1A1A1A] border-2 border-neutral-700 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 hover:bg-[#222] active:scale-95 transition-all duration-500 ${isMascotVisible ? 'translate-y-32 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
        >
          <ArrowUp size={28} strokeWidth={3} />
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-yellow-500/30">
      <Header />
      {/* Tabs */}
      <div className="border-b border-neutral-800 bg-[#0A0A0A] flex justify-center sticky top-16 z-40">
        <div className="flex gap-8">
            <button onClick={() => setActiveTab('home')} className={`py-4 font-bold border-b-2 transition-colors ${activeTab === 'home' ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`}>Home</button>
            <button onClick={() => setActiveTab('courses')} className={`py-4 font-bold border-b-2 transition-colors ${activeTab === 'courses' ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`}>Courses</button>
        </div>
      </div>
      <main>
        {activeTab === 'home' ? renderHome() : renderCourses()}
      </main>
    </div>
  );
}
