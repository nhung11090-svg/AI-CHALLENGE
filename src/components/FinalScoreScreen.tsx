import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Sparkles, Heart, Lightbulb, Zap, GraduationCap, UserCheck } from 'lucide-react';
import { TeamScore } from '../types';
import { soundManager } from '../utils/audio';
import { FptSchoolLogo } from './FptSchoolLogo';

interface FinalScoreScreenProps {
  teamA: TeamScore;
  teamB: TeamScore;
  onNextGroup: () => void;
}

export const FinalScoreScreen: React.FC<FinalScoreScreenProps> = ({
  teamA,
  teamB,
  onNextGroup,
}) => {
  useEffect(() => {
    soundManager.playVictory();

    // Trigger confetti cannon
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      confetti({
        particleCount: 40,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const isWinnerA = teamA.score > teamB.score;
  const isWinnerB = teamB.score > teamA.score;
  const isDraw = teamA.score === teamB.score;

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col items-center text-center animate-fade-in">
      {/* Title */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm mb-4">
        <Trophy className="w-5 h-5 text-yellow-300" />
        <span>KẾT QUẢ TỔNG KẾT • AI CHALLENGE</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tight">
        TỔNG ĐIỂM CHUNG CUỘC
      </h1>

      {/* Score Comparison Cards */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl mb-10">
        {/* TEAM A */}
        <div
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center ${
            isWinnerA
              ? 'bg-rose-950/80 border-amber-400 ring-4 ring-yellow-400 scale-105 shadow-2xl shadow-rose-900/50'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white font-black text-3xl flex items-center justify-center shadow-lg mb-2">A</div>
          <h3 className="text-2xl font-black text-rose-400 mb-1">{teamA.name}</h3>
          <span className="text-6xl font-black text-yellow-300 my-2">⭐ {teamA.score}</span>
          {isWinnerA && (
            <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black animate-bounce mt-2">
              🏆 ĐỘI CHIẾN THẮNG
            </span>
          )}
        </div>

        {/* TEAM B */}
        <div
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center ${
            isWinnerB
              ? 'bg-blue-950/80 border-amber-400 ring-4 ring-yellow-400 scale-105 shadow-2xl shadow-blue-900/50'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-3xl flex items-center justify-center shadow-lg mb-2">B</div>
          <h3 className="text-2xl font-black text-blue-400 mb-1">{teamB.name}</h3>
          <span className="text-6xl font-black text-yellow-300 my-2">⭐ {teamB.score}</span>
          {isWinnerB && (
            <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black animate-bounce mt-2">
              🏆 ĐỘI CHIẾN THẮNG
            </span>
          )}
        </div>
      </div>

      {/* Winner Banner */}
      <div className="w-full max-w-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-2 border-indigo-400/50 rounded-3xl p-6 shadow-2xl mb-10">
        <h2 className="text-3xl sm:text-5xl font-black text-yellow-300 tracking-wide mb-2">
          {isWinnerA && `🏆 ${teamA.name.toUpperCase()} CHIẾN THẮNG!`}
          {isWinnerB && `🏆 ${teamB.name.toUpperCase()} CHIẾN THẮNG!`}
          {isDraw && `🤝 HÒA NHAU – CON NGƯỜI CÙNG CHIẾN THẮNG AI!`}
        </h2>
        <p className="text-indigo-200 text-lg font-medium">
          Cả hai đội đã xuất sắc vượt qua các thử thách công nghệ cùng AI!
        </p>
      </div>

      {/* Educational Closing Takeaways */}
      <div className="w-full max-w-3xl bg-slate-900/90 border-2 border-indigo-500/30 rounded-3xl p-6 mb-10 text-left shadow-xl">
        <h3 className="text-xl font-black text-indigo-300 mb-4 text-center uppercase tracking-wider flex items-center justify-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-300" />
          <span>THÔNG ĐIỆP TỪ AI ARENA</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">🤖</span>
            <span className="text-sm font-semibold text-slate-200">
              AI có thể tạo ra sản phẩm rất giống con người.
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">🧠</span>
            <span className="text-sm font-semibold text-slate-200">
              AI có thể suy luận từ thông tin chúng ta cung cấp.
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">🎯</span>
            <span className="text-sm font-semibold text-slate-200">
              AI hoạt động tốt hơn khi con người đưa ra yêu cầu tốt.
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-500/20 border-2 border-amber-400/50 p-5 rounded-2xl text-center">
          <p className="text-xl sm:text-2xl font-black text-amber-300 mb-1">
            “AI KHÔNG THAY THẾ SỰ SÁNG TẠO CỦA BẠN.”
          </p>
          <p className="text-base font-bold text-white">
            Hãy học cách sử dụng AI thông minh & làm chủ công nghệ!
          </p>
        </div>
      </div>

      {/* Next Group Button */}
      <button
        onClick={() => {
          soundManager.playStart();
          onNextGroup();
        }}
        className="px-14 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:scale-108 active:scale-95 text-white font-black text-3xl rounded-3xl shadow-2xl transition duration-300 border-2 border-emerald-300/50 flex items-center gap-4"
      >
        <RotateCcw className="w-9 h-9 text-yellow-300 animate-spin-slow" />
        <span>🔄 NHÓM TIẾP THEO</span>
      </button>
    </div>
  );
};
