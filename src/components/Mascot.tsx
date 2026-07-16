
// Cấu trúc các cặp mắt/miệng cực kỳ dễ thương
const faces = {
  normal: (
    <g className="animate-[blink_4s_infinite] origin-center">
      <circle cx="38" cy="50" r="5" fill="white" />
      <circle cx="62" cy="50" r="5" fill="white" />
    </g>
  ),
  shy_welcoming: (
    <g className="animate-[blink_4s_infinite] origin-center">
      <circle cx="38" cy="48" r="8" fill="white" />
      <circle cx="62" cy="48" r="8" fill="white" />
      <g className="animate-[eye-shift_8s_ease-in-out_infinite]">
        <circle cx="38" cy="48" r="4" fill="#111" />
        <circle cx="62" cy="48" r="4" fill="#111" />
        <circle cx="36.5" cy="46.5" r="1.5" fill="white" />
        <circle cx="60.5" cy="46.5" r="1.5" fill="white" />
      </g>
      <ellipse cx="24" cy="54" rx="5" ry="2.5" fill="#FF7EA5" opacity="0.5" />
      <ellipse cx="76" cy="54" rx="5" ry="2.5" fill="#FF7EA5" opacity="0.5" />
      <path d="M46 56 Q50 60 54 56" stroke="#111" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </g>
  ),
  thinking_hard: (
    <g className="animate-[blink_4s_infinite]">
      <circle cx="36" cy="46" r="7.5" fill="white" />
      <circle cx="64" cy="46" r="7.5" fill="white" />
      <g>
         <circle cx="39" cy="44" r="3.5" fill="#111" />
         <circle cx="67" cy="44" r="3.5" fill="#111" />
         <circle cx="37.5" cy="42.5" r="1.2" fill="white" />
         <circle cx="65.5" cy="42.5" r="1.2" fill="white" />
      </g>
      {/* Eyebrows - arched like curious/cute */}
      <path d="M30 38 Q36 33 42 38" stroke="#111" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M58 38 Q64 33 70 38" stroke="#111" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      <ellipse cx="22" cy="52" rx="4.5" ry="2" fill="#FF7EA5" opacity="0.4" />
      <ellipse cx="78" cy="52" rx="4.5" ry="2" fill="#FF7EA5" opacity="0.4" />
      {/* Cute "o" mouth */}
      <circle cx="50" cy="54" r="2.5" fill="#111" />
    </g>
  ),
  observing: (
    <g className="animate-[blink_5s_infinite] origin-center">
      <circle cx="38" cy="50" r="6" fill="white" />
      <circle cx="62" cy="50" r="6" fill="white" />
      <g>
        <circle cx="38" cy="50" r="3" fill="#111" />
        <circle cx="62" cy="50" r="3" fill="#111" />
      </g>
      <path d="M48 56 L50 54 L52 56" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  ),
  welcoming: (
    <g>
      <circle cx="38" cy="48" r="6" fill="white" className="animate-[blink_4s_infinite]" />
      <circle cx="62" cy="48" r="6" fill="white" className="animate-[blink_4s_infinite]" />
      <path d="M45 56 Q50 60 55 56" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="28" cy="54" rx="5" ry="2.5" fill="#FF7EA5" opacity="0.6" />
      <ellipse cx="72" cy="54" rx="5" ry="2.5" fill="#FF7EA5" opacity="0.6" />
    </g>
  ),
  excited: (
    <g>
      <path d="M33 46 Q38 42 43 46" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M57 46 Q62 42 67 46" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M45 54 Q50 64 55 54 Z" fill="white" />
      <ellipse cx="30" cy="50" rx="4" ry="2" fill="#FF7EA5" opacity="0.6" />
      <ellipse cx="70" cy="50" rx="4" ry="2" fill="#FF7EA5" opacity="0.6" />
    </g>
  ),
  happy: (
    <g stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none">
      <path d="M33 52 Q38 42 43 52" />
      <path d="M57 52 Q62 42 67 52" />
    </g>
  ),
  sad: (
    <g stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none">
      <path d="M33 46 Q38 54 43 46" />
      <path d="M57 46 Q62 54 67 46" />
      <path d="M47 62 Q50 58 53 62" strokeWidth="3" />
    </g>
  ),
  determined: (
    <g stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M33 46 L40 50 L33 54" />
      <path d="M67 46 L60 50 L67 54" />
    </g>
  ),
  wide: (
    <g>
      <circle cx="38" cy="50" r="7" fill="white" />
      <circle cx="62" cy="50" r="7" fill="white" />
      <circle cx="38" cy="50" r="2" fill="black" />
      <circle cx="62" cy="50" r="2" fill="black" />
      <circle cx="50" cy="62" r="3" fill="white" />
    </g>
  ),
  wink: (
    <g stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none">
      <circle cx="38" cy="50" r="4.5" fill="white" stroke="none" />
      <path d="M57 52 Q62 42 67 52" />
    </g>
  ),
  sleeping: (
    <g stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none">
      <path d="M33 50 L43 50" />
      <path d="M57 50 L67 50" />
    </g>
  ),
  starry: (
    <g fill="white">
      <path d="M38 42 l2 4 l4 1 l-3 3 l1 4 l-4 -2 l-4 2 l1 -4 l-3 -3 l4 -1 z" />
      <path d="M62 42 l2 4 l4 1 l-3 3 l1 4 l-4 -2 l-4 2 l1 -4 l-3 -3 l4 -1 z" />
      <path d="M45 58 Q50 65 55 58 Z" fill="white" />
    </g>
  )
};

export const Mascot = ({ state = 'path_idle', className = '', size }: { state?: string, className?: string, size?: string }) => {
  const config: Record<string, any> = {
    path_idle: { grad: "green-grad", face: "shy_welcoming", anim: "animate-[levitate_4s_ease-in-out_infinite]", aura: "bg-green-500/10", leftHand: "animate-[beckon-hand_2.5s_infinite]", rightHand: "translate-y-2" },
    greeting: { grad: "green-grad", face: "happy", anim: "animate-[levitate_3s_ease-in-out_infinite]", aura: "bg-green-500/20", leftHand: "animate-[wave-hello_1s_infinite]", rightHand: "translate-y-0" },
    entry: { grad: "green-grad", face: "excited", anim: "animate-[drop-in_1s_cubic-bezier(0.34,1.56,0.64,1)_forwards]", aura: "bg-green-500/30", showSparkles: true, leftHand: "-translate-y-10", rightHand: "-translate-y-10" },
    thinking: { grad: "blue-grad", face: "thinking_hard", anim: "animate-[levitate_3.5s_ease-in-out_infinite]", aura: "bg-blue-500/20", showQuestion: false, leftHand: "translate-y-0", rightHand: "animate-[chin-tap_2s_infinite]" },
    corner_idle: { grad: "green-grad", face: "observing", anim: "animate-[levitate_5s_ease-in-out_infinite]", aura: "bg-green-500/10", size: "scale-75", leftHand: "translate-y-2", rightHand: "translate-y-2" },
    correct: { grad: "green-grad", face: "happy", anim: "animate-[happy-jump_1.2s_ease-in-out]", aura: "bg-green-400/50", showHearts: true, leftHand: "-translate-y-6", rightHand: "-translate-y-6" },
    hint: { grad: "yellow-grad", face: "wink", anim: "animate-[hint-pop_1s_ease-in-out_forwards]", aura: "bg-yellow-500/30", showBulb: true, leftHand: "translate-y-0", rightHand: "-translate-y-4" },
    skill_check: { grad: "orange-grad", face: "determined", anim: "animate-[energy-gather_2s_ease-in-out_forwards]", aura: "bg-orange-500/50", showHeadband: true, isIntense: true, leftHand: "-translate-y-2", rightHand: "-translate-y-2" },
    shocked: { grad: "gray-grad", face: "wide", anim: "animate-[shake_0.5s_infinite]", aura: "bg-neutral-500/20", leftHand: "-translate-y-2", rightHand: "-translate-y-2" },
    sleeping: { grad: "purple-grad", face: "sleeping", anim: "animate-[levitate_5s_ease-in-out_infinite]", aura: "bg-purple-500/20", showZzz: true, leftHand: "translate-y-2", rightHand: "translate-y-2" },
    lesson_complete: { grad: "green-grad", face: "happy", anim: "animate-[victory-dance_1.5s_ease-in-out_infinite]", aura: "bg-green-500/50", showConfetti: true, leftHand: "-translate-y-8", rightHand: "-translate-y-8" },
    level_failed: { grad: "gray-grad", face: "sad", anim: "animate-[drop-heavy_1s_ease-out_forwards]", aura: "bg-neutral-600/20", showSweat: true, showDumbbell: true, leftHand: "translate-y-4", rightHand: "translate-y-4" },
    level_complete: { grad: "gold-grad", face: "starry", anim: "animate-[levitate_2s_ease-in-out_infinite]", aura: "bg-yellow-500/40", showPodium: true, showCrown: true, leftHand: "-translate-y-2", rightHand: "-translate-y-2" },
    course_complete: { grad: "rainbow-grad", face: "starry", anim: "animate-[levitate_1s_ease-in-out_infinite]", aura: "bg-white/40", showEpicAura: true, showSunglasses: true, leftHand: "-translate-y-4", rightHand: "-translate-y-4" },
    explaining: { grad: "blue-grad", face: "happy", anim: "animate-[levitate_3s_ease-in-out_infinite]", aura: "bg-blue-500/30", showGlasses: true, leftHand: "-translate-y-4", rightHand: "animate-[beckon-hand_2.5s_infinite]" },
  };

  const current = config[state] || config.path_idle;

  return (
    <div className={`relative flex flex-col items-center justify-center ${size || current.size || 'scale-100'} ${className}`}>
      
      {/* Vầng hào quang (Aura) */}
      <div className={`absolute w-40 h-40 rounded-full blur-2xl transition-all duration-700 ${current.aura} ${current.isIntense ? 'animate-[pulse-ring_1.5s_infinite]' : ''}`}></div>
      {current.showEpicAura && <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-3xl animate-[spin_4s_linear_infinite]"></div>}

      {/* Đạo cụ: Vương miện */}
      {current.showCrown && (
        <svg className="absolute -top-12 w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-bounce z-20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 22h20v-2H2v2zm7-11.45l-3.32 4.43c-.22.29-.65.29-.86 0L2 10.55V2h2.29l2.45 4.9 2.57-5.14c.2-.4.78-.4.98 0l2.57 5.14L15.3 2H17.6v8.55l-2.82 4.43c-.21.29-.64.29-.86 0L10 10.55zM22 2h-2.1l-2.83 4.54-2.5-5.01c-.2-.4-.78-.4-.98 0l-2.5 5.01L8.27 2H6.17l3.6 4.8L7.6 9.6l3.32-4.43c.22-.29.65-.29.86 0L14 8.71l2.17-3.54L19.77 10 22 7.03V2z"/>
        </svg>
      )}

      {/* Đạo cụ: Bóng đèn (Hint) */}
      {current.showBulb && (
        <div className="absolute -top-16 -right-6 animate-[lightbulb-pop_0.5s_ease-out_forwards] z-20">
          <svg className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,1)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.8 11.11l-.8.56V16h-4v-2.33l-.8-.56C7.84 12.16 7 10.68 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.68-.84 3.16-2.2 4.11zM10 20h4v1h-4v-1zm1 2h2v1h-2v-1z"/>
          </svg>
        </div>
      )}

      {/* Đạo cụ: Lấp lánh (Sparkles - Entry) */}
      {current.showSparkles && (
        <div className="absolute -top-6 w-full flex justify-between px-4 z-20">
           <div className="text-yellow-400 animate-[float-up_1s_ease-out_forwards]">✨</div>
           <div className="text-yellow-400 animate-[float-up_1.2s_ease-out_forwards_0.3s] text-xl">✨</div>
           <div className="text-yellow-400 animate-[float-up_0.9s_ease-out_forwards_0.1s] text-sm">✨</div>
        </div>
      )}

      {/* Đạo cụ: Trái tim bay (Correct) */}
      {current.showHearts && (
        <div className="absolute -top-10 -right-4 z-20 flex gap-2">
           <div className="text-pink-500 animate-[float-up_1s_ease-in_forwards]">❤️</div>
           <div className="text-pink-400 animate-[float-up_1.2s_ease-in_forwards_0.2s] text-sm">❤️</div>
        </div>
      )}

      {/* Đạo cụ: Dấu hỏi (Thinking) */}
      {current.showQuestion && (
        <div className="absolute -top-12 right-0 z-20 font-black text-3xl text-blue-400 drop-shadow-md animate-[float-up_1.5s_infinite]">?</div>
      )}

      {/* Đạo cụ: Zzz (Sleeping) */}
      {current.showZzz && (
        <div className="absolute -top-12 -right-4 z-20 font-black text-purple-400 drop-shadow-md">
           <span className="inline-block animate-[float-up_2s_infinite] text-lg">Z</span>
           <span className="inline-block animate-[float-up_2s_infinite_0.5s] text-xl ml-1">z</span>
           <span className="inline-block animate-[float-up_2s_infinite_1s] text-sm ml-1">z</span>
        </div>
      )}

      {/* CORE MASCOT SVG */}
      <div className={`relative w-36 h-36 z-10 ${current.anim} transform-origin-bottom`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" /><stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
            <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" /><stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" /><stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
            <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" /><stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
            <linearGradient id="gray-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9CA3AF" /><stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" /><stop offset="50%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" /><stop offset="50%" stopColor="#A855F7" /><stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
            <filter id="inner-glow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
              <feFlood floodColor="white" floodOpacity="0.4" result="glowColor"/>
              <feComposite in="glowColor" in2="blur" operator="in" result="glow"/>
              <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="glow"/></feMerge>
            </filter>
          </defs>

          {/* Cánh tay lơ lửng */}
          <g className="transition-transform duration-300">
             <circle cx="12" cy="65" r="8" fill={`url(#${current.grad})`} className={`transition-all duration-500 origin-center ${current.leftHand}`} />
             <circle cx="88" cy="65" r="8" fill={`url(#${current.grad})`} className={`transition-all duration-500 origin-center ${current.rightHand}`} />
          </g>

          {/* Thân linh vật (Squircle béo tròn) */}
          <rect x="18" y="20" width="64" height="64" rx="26" fill={`url(#${current.grad})`} filter="url(#inner-glow)" className="transition-all duration-500" />
          
          {/* Băng đô Skill Check (Buộc trên đầu) */}
          {current.showHeadband && (
            <g className="animate-[fade-in_0.3s_ease-out]">
              <path d="M 18 35 Q 50 42 82 35 L 82 45 Q 50 52 18 45 Z" fill="#EF4444" />
              <circle cx="50" cy="43" r="5" fill="white" opacity="0.9" />
              <path d="M 18 40 Q 5 55 10 65 Q 15 75 5 85" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" fill="none" className="animate-[wave-hand_1.5s_infinite_alternate] origin-[18px_40px]" />
            </g>
          )}

          {/* Kính râm (Course Complete) */}
          {current.showSunglasses && (
            <g className="z-30 drop-shadow-md">
               <path d="M 22 45 L 78 45 L 75 55 Q 60 65 50 50 Q 40 65 25 55 Z" fill="#111" />
               <path d="M 25 47 L 45 47 M 55 47 L 75 47" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
            </g>
          )}

          {/* Kính cận trí thức (Explaining) */}
          {current.showGlasses && (
            <g className="z-30 drop-shadow-sm">
               <rect x="24" y="44" width="22" height="14" rx="4" fill="none" stroke="#222" strokeWidth="2.5" />
               <rect x="54" y="44" width="22" height="14" rx="4" fill="none" stroke="#222" strokeWidth="2.5" />
               <path d="M 46 48 L 54 48" stroke="#222" strokeWidth="2.5" />
            </g>
          )}

          {/* Lớp màn hình (Visor/Mặt) */}
          {!current.showSunglasses && (
            <rect x="25" y="38" width="50" height="28" rx="12" fill="#0A0A0A" className="transition-all duration-300" />
          )}
          
          {/* Đôi mắt (Expressions) */}
          {!current.showSunglasses && (faces as any)[current.face]}
          
        </svg>

        {/* Mồ hôi (Khi Failed) */}
        {current.showSweat && (
          <div className="absolute top-4 right-4 w-3 h-5 bg-blue-400/80 rounded-[50%] blur-[1px] animate-[sweat-drop_1.5s_infinite]"></div>
        )}
      </div>

      {/* Bóng đổ dưới mặt đất */}
      <div className={`mt-2 w-24 h-4 bg-black/40 rounded-[50%] blur-sm transition-all duration-500 ${state.includes('idle') || state === 'course_complete' || state === 'thinking' || state === 'sleeping' || state === 'greeting' ? 'animate-[shadow-pulse_3s_ease-in-out_infinite]' : ''}`}></div>

      {/* Đạo cụ: Tạ sắt (Khi Failed) */}
      {current.showDumbbell && (
        <div className="absolute -bottom-6 -right-10 w-24 h-24 opacity-80 animate-[drop-heavy_0.5s_ease-out_forwards_0.5s]">
          <svg viewBox="0 0 100 100">
             <path d="M20 45 L80 45" stroke="#444" strokeWidth="8" strokeLinecap="round" />
             <rect x="15" y="25" width="15" height="40" rx="4" fill="#777" />
             <rect x="70" y="25" width="15" height="40" rx="4" fill="#777" />
          </svg>
        </div>
      )}

      {/* Đạo cụ: Bục vinh quang (Khi Level Complete) */}
      {current.showPodium && (
        <div className="absolute -bottom-16 w-48 h-16 z-0 animate-[drop-in_1s_ease-out]">
          <div className="w-full h-full bg-gradient-to-b from-yellow-500 to-yellow-800 rounded-[50%] border-t-4 border-yellow-300 opacity-90 shadow-[0_20px_50px_rgba(250,204,21,0.3)]"></div>
          <div className="absolute inset-0 bg-white/20 rounded-[50%] blur-md"></div>
        </div>
      )}
      
      {/* Pháo giấy (Khi Hoàn thành bài) */}
      {current.showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
           {[...Array(8)].map((_, i) => (
             <div key={i} className={`absolute w-3 h-3 bg-${['red','yellow','blue','green','purple','pink'][i%6]}-500 rounded-sm animate-[drop-heavy_1s_ease-out_infinite]`} style={{ left: `${Math.random() * 150 - 25}%`, top: `${Math.random() * 100 - 50}%`, animationDelay: `${Math.random()}s` }}></div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Mascot;
