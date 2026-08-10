import React from 'react';
import { Sparkles, Trophy, ShieldAlert, Users, Zap, CheckCircle2, Bot, Cpu, BrainCircuit, Wand2 } from 'lucide-react';
import { GameLevel } from '../types';
import { soundManager } from '../utils/audio';

interface HomeScreenProps {
  selectedLevel: GameLevel;
  onSelectLevel: (level: GameLevel) => void;
  onStartGame: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedLevel,
  onSelectLevel,
  onStartGame,
}) => {
  const levels: { id: GameLevel; title: string; subtitle: string; icon: string; color: string; border: string; bg: string }[] = [
    {
      id: 'EXPLORER',
      title: '🟢 EXPLORER',
      subtitle: 'Tiểu học • Mức dễ',
      icon: '🌱',
      color: 'text-emerald-400',
      border: 'border-emerald-500/50',
      bg: 'bg-emerald-950/40 hover:bg-emerald-900/50',
    },
    {
      id: 'CHALLENGER',
      title: '🔵 CHALLENGER',
      subtitle: 'THCS • Mức trung bình',
      icon: '⚡',
      color: 'text-sky-400',
      border: 'border-sky-500/50',
      bg: 'bg-sky-950/40 hover:bg-sky-900/50',
    },
    {
      id: 'MASTER',
      title: '🔴 MASTER',
      subtitle: 'THPT • Mức thử thách',
      icon: '🔥',
      color: 'text-rose-400',
      border: 'border-rose-500/50',
      bg: 'bg-rose-950/40 hover:bg-rose-900/50',
    },
    {
      id: 'MIXED',
      title: '🌈 MIXED',
      subtitle: 'Hỗn hợp tất cả cấp học',
      icon: '✨',
      color: 'text-amber-300',
      border: 'border-amber-500/50',
      bg: 'bg-amber-950/40 hover:bg-amber-900/50',
    },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in py-8">
      {/* Top Banner Tag */}
      <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-200 text-base font-bold mb-6 animate-pulse shadow-md">
        <Sparkles className="w-5 h-5 text-yellow-300" />
        <span>NGÀY HỘI MÔN HỌC • MINI GAMESHOW AI</span>
      </div>

      {/* Main Title & Tagline */}
      <h1 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-fuchsia-300 mb-3 tracking-tight drop-shadow-2xl">
        AI CHALLENGE
      </h1>
      <h2 className="text-3xl sm:text-5xl font-black text-white mb-3">
        ĐẤU TRÍ CÙNG AI
      </h2>
      <p className="text-xl sm:text-2xl font-black text-amber-300 mb-10 bg-slate-900/90 px-8 py-3 rounded-2xl border-2 border-amber-500/40 shadow-xl">
        “12 phút – Bạn có thắng được AI?”
      </p>

      {/* Level Selection */}
      <div className="w-full max-w-5xl mb-12">
        <p className="text-cyan-300 text-xl sm:text-2xl font-black mb-6 uppercase tracking-wider flex items-center justify-center gap-2.5">
          <Cpu className="w-7 h-7 text-cyan-400" />
          <span>CHỌN CẤP ĐỘ ĐẤU TRÍ HỌC SỰ:</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => {
                  onSelectLevel(lvl.id);
                  soundManager.playScore();
                }}
                className={`relative flex flex-col items-center p-6 rounded-3xl border-2 transition-all duration-300 text-center ${lvl.bg} ${
                  isSelected
                    ? `${lvl.border} shadow-2xl shadow-indigo-500/30 ring-4 ring-amber-400 scale-105`
                    : 'border-slate-800 opacity-85 hover:opacity-100 hover:scale-102'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 text-amber-400">
                    <CheckCircle2 className="w-7 h-7 fill-amber-400 text-slate-950" />
                  </div>
                )}
                <span className="text-5xl mb-3">{lvl.icon}</span>
                <span className={`text-2xl font-black ${lvl.color} mb-1.5`}>{lvl.title}</span>
                <span className="text-sm font-bold text-slate-200">{lvl.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={() => {
          soundManager.playStart();
          onStartGame();
        }}
        className="group relative inline-flex items-center justify-center px-12 py-6 text-3xl font-black text-white bg-gradient-to-r from-emerald-500 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl hover:shadow-indigo-500/60 hover:scale-108 active:scale-95 transition-all duration-300 border-2 border-emerald-300/50"
      >
        <span className="flex items-center gap-4">
          <span>🚀 BẮT ĐẦU VÒNG ĐẤU</span>
          <Zap className="w-9 h-9 text-yellow-300 group-hover:rotate-12 transition-transform" />
        </span>
      </button>
    </div>
  );
};
