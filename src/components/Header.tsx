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
              to="/" 
              className={({ isActive }) => 
                `h-full font-bold flex items-center border-b-4 transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/lesson" 
              className={({ isActive }) => 
                `h-full font-bold flex items-center border-b-4 transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Lesson
            </NavLink>
            <NavLink 
              to="/advanced-lesson" 
              className={({ isActive }) => 
                `h-full font-bold flex items-center border-b-4 transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Advanced Lesson
            </NavLink>
            <NavLink 
              to="/review" 
              className={({ isActive }) => 
                `h-full font-bold flex items-center border-b-4 transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Review
            </NavLink>
            <NavLink 
              to="/map" 
              className={({ isActive }) => 
                `h-full font-bold flex items-center border-b-4 transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Test Map
            </NavLink>
            <NavLink 
              to="/playground" 
              className={({ isActive }) => 
                `h-full font-bold flex items-center border-b-4 transition-colors ${isActive ? 'border-white text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'}`
              }
            >
              Playground
            </NavLink>
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
