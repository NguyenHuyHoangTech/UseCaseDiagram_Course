import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, Crown, Medal } from 'lucide-react';

interface LeaderboardProps {
  oldXp: number;
  newXp: number;
  onContinue: () => void;
}

interface UserScore {
  id: string;
  name: string;
  score: number;
  isMe: boolean;
  avatar: string;
}

const FAKE_USERS = [
  { id: '1', name: 'AlexTheGreat', baseScore: 0, avatar: '🦊' },
  { id: '2', name: 'CodeNinja99', baseScore: -15, avatar: '🥷' },
  { id: '3', name: 'SarahDev', baseScore: 10, avatar: '👩‍💻' },
  { id: '4', name: 'ProBuilder', baseScore: 25, avatar: '🏗️' },
  { id: '5', name: 'UMLMaster', baseScore: -5, avatar: '🧙‍♂️' },
  { id: '6', name: 'NoobCoder', baseScore: -30, avatar: '👶' },
];

export default function Leaderboard({ oldXp, newXp, onContinue }: LeaderboardProps) {
  const [currentXp, setCurrentXp] = useState(oldXp);
  const [users, setUsers] = useState<UserScore[]>([]);
  const [showRankUp, setShowRankUp] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Initialize users
  useEffect(() => {
    const initialUsers: UserScore[] = FAKE_USERS.map(u => ({
      ...u,
      isMe: false,
      score: Math.max(0, oldXp + u.baseScore)
    }));
    
    initialUsers.push({
      id: 'me',
      name: 'Bạn',
      score: oldXp,
      isMe: true,
      avatar: '🌟'
    });

    // Sort descending
    initialUsers.sort((a, b) => b.score - a.score);
    setUsers(initialUsers);
  }, [oldXp]);

  // Animate XP
  useEffect(() => {
    if (currentXp >= newXp) {
      if (oldXp < 40 && newXp >= 40) {
        // Delay rank up slightly after reaching score
        setTimeout(() => setShowRankUp(true), 800);
      }
      setTimeout(() => setAnimationComplete(true), 1500);
      return;
    }

    const timer = setInterval(() => {
      setCurrentXp(prev => {
        const next = Math.min(prev + 1, newXp);
        
        // Update user score and re-sort
        setUsers(currentUsers => {
          const updated = currentUsers.map(u => u.isMe ? { ...u, score: next } : u);
          return updated.sort((a, b) => b.score - a.score);
        });

        return next;
      });
    }, 40); // speed of counting

    return () => clearInterval(timer);
  }, [currentXp, newXp, oldXp]);

  return (
    <div className="flex-1 bg-[#0a0a0a] text-white font-sans flex flex-col items-center py-8 px-4 relative overflow-y-auto custom-scrollbar rounded-[2rem] border-2 border-neutral-800 mx-2 md:mx-6 mt-2 md:mt-4 mb-4 md:mb-8">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent blur-3xl rounded-full pointer-events-none"></div>

      <div className="w-full max-w-xl z-10 flex flex-col items-center mt-10">
        
        <div className="mb-12 text-center animate-in slide-in-from-top-8 duration-700">
          <Trophy size={64} className="mx-auto text-yellow-400 mb-4 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]" />
          <h1 className="text-4xl font-black tracking-tight mb-2">Bảng Xếp Hạng</h1>
          <p className="text-neutral-400 font-medium">Bạn đang thi đua với các học viên khác</p>
        </div>

        {/* Leaderboard List */}
        <ul className="w-full flex flex-col gap-3 relative">
          <AnimatePresence>
            {users.map((user, index) => {
              const isTop = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;

              return (
                <motion.li
                  key={user.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 30,
                    layout: { duration: 0.4 } 
                  }}
                  className={`flex items-center p-4 rounded-2xl border-2 transition-colors relative overflow-hidden
                    ${user.isMe ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] z-10' : 'bg-[#111] border-neutral-800'}
                  `}
                >
                  {user.isMe && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  )}

                  <div className="w-10 font-black text-xl text-center shrink-0">
                    {isTop ? <Crown size={24} className="text-yellow-400 mx-auto" /> : 
                     isSecond ? <Medal size={24} className="text-gray-300 mx-auto" /> : 
                     isThird ? <Medal size={24} className="text-amber-600 mx-auto" /> : 
                     <span className="text-neutral-500">#{index + 1}</span>}
                  </div>

                  <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center text-2xl mx-4 shrink-0 shadow-inner border border-neutral-800">
                    {user.avatar}
                  </div>

                  <div className="flex-1 flex flex-col justify-center truncate">
                    <span className={`font-bold truncate ${user.isMe ? 'text-white text-lg' : 'text-neutral-300'}`}>
                      {user.name} {user.isMe && "(Bạn)"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-black text-2xl shrink-0">
                    <Zap size={20} className={user.isMe ? 'text-yellow-400' : 'text-neutral-600'} fill="currentColor" />
                    <motion.span 
                       key={user.score}
                       initial={user.isMe ? { scale: 1.5, color: '#FBBF24' } : {}}
                       animate={user.isMe ? { scale: 1, color: '#FFFFFF' } : {}}
                       className={user.isMe ? 'text-white' : 'text-neutral-400'}
                    >
                      {user.score}
                    </motion.span>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {animationComplete && (
           <motion.button 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={onContinue}
             className="mt-12 w-full max-w-sm py-4 bg-[#eab308] text-black font-black text-xl rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] flex items-center justify-center cursor-pointer"
           >
              Tiếp tục
           </motion.button>
        )}

      </div>

      {/* Rank Up Celebration Overlay */}
      <AnimatePresence>
        {showRankUp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRankUp(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              className="w-48 h-48 bg-gradient-to-br from-blue-300 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(59,130,246,0.8)] border-8 border-blue-200"
            >
              <div className="text-6xl font-black text-white drop-shadow-lg">BẠC</div>
            </motion.div>
            
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-black text-white mt-12 drop-shadow-2xl tracking-tight"
            >
              THĂNG HẠNG!
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-blue-200 font-medium mt-4 text-center"
            >
              Bạn đã xuất sắc vượt mốc 40 XP
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={(e) => { e.stopPropagation(); setShowRankUp(false); }}
              className="mt-16 px-12 py-4 bg-[#eab308] text-black font-black text-xl rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Tiếp tục
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
