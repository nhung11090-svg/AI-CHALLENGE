import React, { useState } from 'react';
import { Users, Zap, Shield, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TeamSetupScreenProps {
  teamAName: string;
  teamBName: string;
  onUpdateNames: (nameA: string, nameB: string) => void;
  onTeamsReady: () => void;
}

export const TeamSetupScreen: React.FC<TeamSetupScreenProps> = ({
  teamAName,
  teamBName,
  onUpdateNames,
  onTeamsReady,
}) => {
  const [nameA, setNameA] = useState(teamAName);
  const [nameB, setNameB] = useState(teamBName);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleStartCountdown = () => {
    onUpdateNames(nameA || 'ĐỘI A', nameB || 'ĐỘI B');
    soundManager.playStart();
    setCountdown(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        soundManager.playCountdown();
        setCountdown(current);
      } else if (current === 0) {
        soundManager.playStart();
        setCountdown(0); // "GO!"
      } else {
        clearInterval(interval);
        onTeamsReady();
      }
    }, 900);
  };

  if (countdown !== null) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-bounce mb-6">
          <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-rose-500 drop-shadow-2xl">
            {countdown > 0 ? countdown : 'GO! 🚀'}
          </span>
        </div>
        <p className="text-3xl font-extrabold text-indigo-300 tracking-wider">
          {countdown > 0 ? 'VÒNG 1 SẮP BẮT ĐẦU...' : 'ĐẤU TRÍ VỚI AI VÒNG 1!'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
        CHIA ĐỘI ĐẤU TRÍ
      </h2>
      <p className="text-lg text-slate-300 mb-8 max-w-xl">
        Mỗi lượt chơi dành cho 10-30 học sinh. Hai đội sẽ thi đấu đối kháng trực tiếp!
      </p>

      {/* Team Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* TEAM A */}
        <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-900/90 border-2 border-rose-500/50 shadow-xl shadow-rose-950/40">
          <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white font-black text-4xl flex items-center justify-center shadow-lg mb-3">A</div>
          <h3 className="text-2xl font-black text-rose-400 mb-2">ĐỘI A</h3>
          <input
            type="text"
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            placeholder="Tên Đội A..."
            className="w-full text-center text-xl font-bold bg-slate-950 text-rose-200 border border-rose-500/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* TEAM B */}
        <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-900/90 border-2 border-blue-500/50 shadow-xl shadow-blue-950/40">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-4xl flex items-center justify-center shadow-lg mb-3">B</div>
          <h3 className="text-2xl font-black text-blue-400 mb-2">ĐỘI B</h3>
          <input
            type="text"
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            placeholder="Tên Đội B..."
            className="w-full text-center text-xl font-bold bg-slate-950 text-blue-200 border border-blue-500/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Ready Button */}
      <button
        onClick={handleStartCountdown}
        className="px-12 py-5 text-2xl font-black text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-indigo-300/40 flex items-center gap-3"
      >
        <span>SẴN SÀNG CHIẾN ĐẤU</span>
        <ArrowRight className="w-8 h-8 text-yellow-300" />
      </button>
    </div>
  );
};
