import React, { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import Mascot from '../components/Mascot';
import Header from '../components/Header';

export default function MascotPlayground() {
  const [activeState, setActiveState] = useState('path_idle');
  const [key, setKey] = useState(0); 

  const states = [
    { id: 'path_idle', label: '1. Đứng yên trên lộ trình (Idle)', desc: 'Tiết chế lại sự nhún nhảy. Mắt to, con ngươi đảo liên tục đầy ngại ngùng, miệng mỉm cười nhẹ. 1 tay vẫy chậm mời gọi.' },
    { id: 'greeting', label: '2. Vẫy tay chào (Greeting)', desc: 'Mắt cười nhắm tít, tay đưa lên cao vẫy qua lại rất rõ ràng.' },
    { id: 'entry', label: '3. Nhảy vào bài học (Entry)', desc: 'Rơi từ trên xuống, mặt cực phấn khích, giơ 2 tay lên cao, lấp lánh tung tóe chúc học tốt!' },
    { id: 'thinking', label: '4. Đang suy nghĩ (Thinking)', desc: 'Chuyển màu xanh lam, một mắt ngước lên đảo tròng, tay phải gõ nhịp đưa lên cằm, miệng gợn sóng.' },
    { id: 'corner_idle', label: '5. Thu nhỏ ở góc màn hình (Corner)', desc: 'Nằm gọn gàng ở góc trái. Mắt mở to quan sát đảo liên tục trái phải, đầy tính "có hồn".' },
    { id: 'correct', label: '6. Trả lời Đúng (Correct)', desc: 'Nhảy cẫng lên ăn mừng, vung tay, thả tim bay.' },
    { id: 'hint', label: '7. Nháy mắt Gợi ý (Hint)', desc: 'Chuyển màu vàng, nháy mắt tinh nghịch, bật bóng đèn.' },
    { id: 'skill_check', label: '8. Sẵn sàng Skill Check (Focus)', desc: 'Chuyển màu cam, đeo băng đô đỏ, mắt quyết tâm (><), tỏa hào quang.' },
    { id: 'shocked', label: '9. Bất ngờ/Lỗi sai (Shocked)', desc: 'Chuyển màu xám, mắt mở to (OO), cơ thể rung bần bật.' },
    { id: 'sleeping', label: '10. Đi ngủ (Inactivity)', desc: 'Chuyển màu tím, mắt nhắm nghiền, nhả bong bóng Zzz.' },
    { id: 'lesson_complete', label: '11. Hoàn thành Bài (Victory)', desc: 'Nhảy múa xoay vòng, tay vung lên, pháo giấy rơi.' },
    { id: 'level_failed', label: '12. Chưa qua Level (Failed)', desc: 'Mắt buồn mếu máo, rơi phịch xuống mệt mỏi, đổ mồ hôi, bị tạ đè.' },
    { id: 'level_complete', label: '13. Hoàn thành Level', desc: 'Mắt lấp lánh vì sao, mạ vàng toàn thân, đội vương miện, đứng trên bục.' },
    { id: 'course_complete', label: '14. Tốt nghiệp Khóa (Mastery)', desc: 'Lên form tối thượng: Hào quang vũ trụ, gradient cầu vồng, đeo kính râm cool ngầu!' },
  ];

  const handlePlay = () => {
    setKey(prev => prev + 1);
  };

  const currentDesc = states.find(s => s.id === activeState)?.desc;

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans flex flex-col items-center">
      <Header />
      
      {/* Control Panel */}
      <div className="w-full bg-[#111] border-b border-neutral-800 p-6 flex flex-col md:flex-row items-center justify-center gap-6 z-40 shadow-2xl relative">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/50">
             <Sparkles className="text-green-400" />
           </div>
           <h1 className="text-xl font-black tracking-tight">B-Bot <span className="text-neutral-500 font-medium">Playground</span></h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-2xl">
          <select 
            className="flex-1 bg-neutral-900 border border-neutral-700 text-white font-bold p-3 rounded-xl outline-none focus:border-green-500 transition-colors w-full cursor-pointer appearance-none"
            value={activeState}
            onChange={(e) => { setActiveState(e.target.value); setKey(prev => prev + 1); }}
          >
            {states.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          
          <button 
            onClick={handlePlay}
            className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-black px-8 py-3 rounded-xl active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] w-full md:w-auto justify-center"
          >
            <RefreshCw size={20} /> Diễn lại
          </button>
        </div>
      </div>

      {/* Description Bar */}
      <div className="w-full bg-[#1a1a24] text-center p-3 text-sm text-neutral-300 border-b border-neutral-800 font-medium">
        <span className="text-neutral-500 mr-2">Trạng thái hiện tại:</span> {currentDesc}
      </div>

      {/* Sân khấu trình diễn (Stage) */}
      <div className="flex-1 w-full max-w-5xl relative flex items-center justify-center overflow-hidden">
        
        {/* Lưới không gian 3D (Background) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) scale(2)', transformOrigin: 'bottom' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>

        {/* The Mascot */}
        <div key={key} className="relative z-10 w-full h-[500px] flex items-center justify-center">
           <Mascot state={activeState} />
        </div>
        
      </div>
      
    </div>
  );
}
