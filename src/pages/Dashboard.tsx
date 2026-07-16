import { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Lock, Check, ChevronUp } from 'lucide-react';
import Mascot from '../components/Mascot';
import Header from '../components/Header';

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('courses'); // 'home' | 'courses'
  const [isMascotVisible, setIsMascotVisible] = useState(true);
  
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
    if (mascotRef.current) {
      mascotRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderHome = () => (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 animate-in fade-in">
      {/* Left Column - Stats */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <h2 className="text-xl font-bold">Welcome, Nguyễn Huy</h2>
        
        {/* Streak Card */}
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

        {/* League Card */}
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
             {/* Ranks */}
             <div className="flex items-center justify-between p-3 rounded-2xl text-neutral-400">
               <div className="flex items-center gap-4"><span className="w-4 font-bold">2</span><div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white font-bold">O</div><span className="font-bold">Orly E</span></div>
               <span className="font-bold">1105 XP</span>
             </div>
             {/* User Rank */}
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

      {/* Right Column - Jump back in */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <h2 className="text-xl font-bold">Jump back in</h2>
        
        {/* Course Card Stack */}
        <div className="relative pt-4 pr-4">
           {/* Back cards for stack effect */}
           <div className="absolute inset-0 bg-[#222] rounded-3xl transform translate-x-4 translate-y-4 border border-neutral-800"></div>
           <div className="absolute inset-0 bg-[#1A1A1A] rounded-3xl transform translate-x-2 translate-y-2 border border-neutral-800"></div>
           
           {/* Main Card */}
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

                 <button onClick={()=>setActiveTab('courses')} className="w-full mt-4 py-5 bg-yellow-500 text-black font-black text-xl rounded-full hover:bg-yellow-400 active:scale-95 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                    Start
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16 animate-in fade-in">
      
      {/* Left Column: Course Info (Sticky) */}
      <div className="w-full lg:w-1/3">
         <div className="sticky top-24 bg-[#111] p-8 rounded-3xl border border-neutral-800 shadow-xl">
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

      {/* Right Column: The Path */}
      <div className="w-full lg:w-2/3 relative pb-40">
         
         {/* Central Energy Track Line */}
         <div className="absolute top-0 bottom-0 left-[38px] w-2 bg-neutral-900 rounded-full z-0"></div>
         <div className="absolute top-0 h-[280px] left-[38px] w-2 bg-gradient-to-b from-purple-500 to-transparent rounded-full z-0"></div>

         {/* Sticky Level Header */}
         <div className="sticky top-[80px] z-30 flex justify-center mb-16 pt-4">
            <div className="w-full max-w-sm bg-[#0A0A0A]/80 backdrop-blur-md py-4 px-8 rounded-2xl border border-purple-500/30 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-t-4 border-t-purple-500">
               <span className="text-purple-400 font-black text-xs tracking-widest uppercase">Level 1</span>
               <h2 className="text-xl font-bold text-white mt-1">System & Actors</h2>
            </div>
         </div>

         {/* Node 1: Completed */}
         <div className="relative flex items-center gap-8 mb-16 z-10 group cursor-pointer">
            <div className="w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-purple-900 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
               {/* Isometric Base */}
               <div className="w-[70px] h-[70px] bg-[#1a1525] rounded-full border-4 border-[#2d2440] shadow-[inset_0_-8px_0_rgba(0,0,0,0.5)] flex items-center justify-center transform group-active:scale-95 transition-transform">
                  <Check size={32} className="text-purple-400" strokeWidth={3} />
               </div>
            </div>
            <div className="flex flex-col">
               <h3 className="text-xl font-bold text-neutral-300 group-hover:text-white transition-colors">System Boundaries</h3>
               <span className="text-sm font-bold text-purple-400/0 group-hover:text-purple-400 transition-colors cursor-pointer mt-1 flex items-center gap-1">Practice <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[10px]">↺</div></span>
            </div>
         </div>

         {/* Node 2: CURRENT (Active) */}
         <div className="relative flex items-center gap-8 mb-16 z-20" ref={mascotRef}>
            <div className="w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center relative">
               {/* Glow / Energy Base */}
               <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
               <div className="absolute w-[90px] h-[90px] rounded-full border-2 border-green-500/30 animate-[spin_4s_linear_infinite]"></div>
               
               {/* 3D Platform */}
               <div className="w-[70px] h-[70px] bg-[#111] rounded-full border-4 border-neutral-700 shadow-[inset_0_-8px_0_rgba(0,0,0,0.8),_0_10px_20px_rgba(34,197,94,0.3)] flex items-center justify-center relative">
                  {/* Floating Mascot */}
                  <div className="absolute -top-[52px]">
                     <Mascot state="path_idle" size="scale-[0.4]" />
                  </div>
                  <div className="w-6 h-2 bg-green-500/50 rounded-full blur-sm absolute bottom-3"></div>
               </div>
            </div>
            
            {/* Active Card */}
            <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-neutral-700 shadow-2xl flex-1 transform hover:scale-[1.02] transition-transform">
               <h3 className="text-xl font-black text-white mb-4">Identifying Actors</h3>
               <button className="w-full py-4 bg-green-500 text-black font-black text-lg rounded-full hover:bg-green-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  Start
               </button>
            </div>
         </div>

         {/* Node 3: Locked */}
         <div className="relative flex items-center gap-8 mb-16 z-10 opacity-50">
            <div className="w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center relative">
               {/* Isometric Base */}
               <div className="w-[70px] h-[70px] bg-[#111] rounded-full border-4 border-[#222] shadow-[inset_0_-8px_0_rgba(0,0,0,0.8)] flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#333] rounded-full"></div>
               </div>
               <div className="absolute -bottom-2 -right-2 bg-[#222] p-1.5 rounded-full border border-[#111]">
                  <Lock size={14} className="text-neutral-500" />
               </div>
            </div>
            <div>
               <h3 className="text-xl font-bold text-neutral-500">Non-human Actors</h3>
            </div>
         </div>
         
         {/* Sticky Level Header 2 */}
         <div className="sticky top-[80px] z-30 flex justify-center mb-16 pt-4">
            <div className="w-full max-w-sm bg-[#0A0A0A]/80 backdrop-blur-md py-4 px-8 rounded-2xl border border-neutral-800 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-t-4 border-t-neutral-800">
               <span className="text-neutral-500 font-black text-xs tracking-widest uppercase">Level 2</span>
               <h2 className="text-xl font-bold text-neutral-400 mt-1">Core Use Cases</h2>
            </div>
         </div>

         {/* Node 4: Locked */}
         <div className="relative flex items-center gap-8 mb-16 z-10 opacity-50">
            <div className="w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center relative">
               <div className="w-[70px] h-[70px] bg-[#111] rounded-full border-4 border-[#222] shadow-[inset_0_-8px_0_rgba(0,0,0,0.8)] flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#333] rounded-full"></div>
               </div>
            </div>
            <div>
               <h3 className="text-xl font-bold text-neutral-500">Verb-Noun Rule</h3>
            </div>
         </div>
      </div>
      
      {/* Floating Jump Here Bar */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-[#1A1A1A] p-4 rounded-3xl border border-neutral-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-3 transition-all duration-500 ${isMascotVisible ? 'translate-y-40 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
         <div className="flex justify-between items-center px-2">
            <h4 className="font-bold text-white truncate pr-4">Identifying Actors</h4>
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
               <ChevronUp size={20} className="text-neutral-400"/>
            </div>
         </div>
         <button onClick={scrollToCurrent} className="w-full py-4 bg-[#333] hover:bg-[#444] text-white font-black text-lg rounded-2xl active:scale-95 transition-all">
            Jump here
         </button>
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-green-500/30">
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
