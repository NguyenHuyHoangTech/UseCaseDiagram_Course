import { NavLink, Link } from 'react-router-dom';
import { Zap, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8 h-full">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white cursor-pointer">
            Brilliant
          </Link>
          <nav className="hidden md:flex gap-6 h-full items-center">
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                `h-full font-bold flex items-center border-b-4 transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `h-full font-bold flex items-center border-b-4 transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Courses
            </NavLink>
            <div className="relative group h-full flex items-center">
              <span className="font-bold text-neutral-400 cursor-pointer hover:text-neutral-200 h-full flex items-center border-b-4 border-transparent">
                More ▼
              </span>
              <div className="absolute top-16 left-0 w-48 bg-[#1A1A1A] border border-neutral-800 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity flex flex-col overflow-hidden z-50">
                <Link to="/lesson/1" className="px-4 py-3 font-bold text-neutral-300 hover:bg-[#222] hover:text-white transition-colors">Lesson</Link>
                <Link to="/advanced-lesson/3" className="px-4 py-3 font-bold text-neutral-300 hover:bg-[#222] hover:text-white transition-colors">Advanced Lesson</Link>
                <Link to="/review" className="px-4 py-3 font-bold text-neutral-300 hover:bg-[#222] hover:text-white transition-colors">Review</Link>
                <Link to="/map" className="px-4 py-3 font-bold text-neutral-300 hover:bg-[#222] hover:text-white transition-colors">Test Map</Link>
                <Link to="/playground" className="px-4 py-3 font-bold text-neutral-300 hover:bg-[#222] hover:text-white transition-colors">Playground</Link>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block px-4 py-1.5 rounded-full border border-neutral-700 text-sm font-bold hover:bg-neutral-800 transition-colors text-white">Gift Premium</button>
          <div className="flex items-center gap-1.5 font-black text-lg bg-neutral-900 px-4 py-1.5 rounded-full border border-neutral-800 text-white">
            2 <Zap size={20} className="text-yellow-500 fill-yellow-500" />
          </div>
          <button className="text-neutral-400 hover:text-white md:hidden"><Menu size={24}/></button>
        </div>
      </div>
    </header>
  );
}
