import React from 'react';
import { Volume2, VolumeX, Settings, Sparkles, Trophy, Clock } from 'lucide-react';
import { TeamScore, ActiveGameTab } from '../types';
import { soundManager } from '../utils/audio';
import { FptSchoolLogo } from './FptSchoolLogo';

interface HeaderProps {
  teamA: TeamScore;
  teamB: TeamScore;
  activeTab: ActiveGameTab;
  game1Progress: number; // 0 to 4
  timerSeconds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTeacherControl: () => void;
  onAdjustScore: (team: 'A' | 'B', delta: number) => void;
  imagesToday: number;
  dailyImageLimit: number;
}

export const Header: React.FC<HeaderProps> = ({
  teamA,
  teamB,
  activeTab,
  game1Progress,
  timerSeconds,
  soundEnabled,
  onToggleSound,
  onOpenTeacherControl,
  onAdjustScore,
  imagesToday,
  dailyImageLimit,
}) => {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStepText = () => {
    switch (activeTab) {
      case 'HOME':
        return 'TRANG CHỦ';
      case 'TEAMS':
        return 'CHUẨN BỊ ĐỘI';
      case 'GAME1':
        return `GAME 1: AI HAY NGƯỜI? (${game1Progress}/4)`;
      case 'GAME2':
        return 'GAME 2: AI THÁM TỬ';
      case 'GAME3':
        return 'GAME 3: PROMPT THẦN TỐC';
      case 'FINAL':
        return 'KẾT QUẢ CHUNG CUỘC';
      default:
        return 'AI ARENA';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-indigo-500/20 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Game Progress */}
        <div className="flex items-center gap-3 shrink-0">
          <FptSchoolLogo size="sm" showFullName={true} />

          <div className="hidden xl:flex items-center bg-slate-800/90 px-3.5 py-2 rounded-xl border border-indigo-500/40 text-amber-300 font-bold text-base shadow">
            {getStepText()}
          </div>
        </div>

        {/* Global Team Scoreboard (High Contrast & Visible for Projector) */}
        {activeTab !== 'HOME' && (
          <div className="flex items-center gap-3 md:gap-5 bg-slate-950/90 px-4 py-2 rounded-2xl border-2 border-indigo-500/40 shadow-xl">
            {/* Team A Score */}
            <div className="flex items-center gap-2 bg-rose-950/80 border border-rose-500/50 px-3.5 py-1.5 rounded-xl">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-rose-600 text-white font-black text-sm shadow">A</span>
              <span className="text-xl sm:text-2xl font-black text-rose-400">{teamA.name}:</span>
              <span className="text-2xl sm:text-3xl font-black text-yellow-300 flex items-center gap-1">
                ⭐ {teamA.score}
              </span>
              {/* Discrete score buttons for Teacher */}
              <div className="flex flex-col ml-1.5 opacity-70 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onAdjustScore('A', 1)}
                  className="text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white px-1.5 rounded-t leading-none py-0.5"
                  title="+1 điểm Đội A"
                >
                  +1
                </button>
                <button
                  onClick={() => onAdjustScore('A', -1)}
                  className="text-xs font-bold bg-slate-700 hover:bg-slate-600 text-rose-300 px-1.5 rounded-b leading-none py-0.5"
                  title="-1 điểm Đội A"
                >
                  -1
                </button>
              </div>
            </div>

            <div className="text-indigo-400 font-black text-xl">VS</div>

            {/* Team B Score */}
            <div className="flex items-center gap-2 bg-blue-950/80 border border-blue-500/50 px-3.5 py-1.5 rounded-xl">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-sm shadow">B</span>
              <span className="text-xl sm:text-2xl font-black text-blue-400">{teamB.name}:</span>
              <span className="text-2xl sm:text-3xl font-black text-yellow-300 flex items-center gap-1">
                ⭐ {teamB.score}
              </span>
              {/* Discrete score buttons for Teacher */}
              <div className="flex flex-col ml-1.5 opacity-70 hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onAdjustScore('B', 1)}
                  className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-1.5 rounded-t leading-none py-0.5"
                  title="+1 điểm Đội B"
                >
                  +1
                </button>
                <button
                  onClick={() => onAdjustScore('B', -1)}
                  className="text-xs font-bold bg-slate-700 hover:bg-slate-600 text-blue-300 px-1.5 rounded-b leading-none py-0.5"
                  title="-1 điểm Đội B"
                >
                  -1
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Timer & Teacher Controls */}
        <div className="flex items-center gap-2.5">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-slate-800/90 text-amber-300 px-4 py-2 rounded-xl border border-amber-500/40 font-mono font-black text-base sm:text-lg shadow-md">
            <Clock className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <span>⏱ {formatTime(timerSeconds)}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.enabled = !soundEnabled;
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-6 h-6 text-cyan-400" /> : <VolumeX className="w-6 h-6 text-slate-500" />}
          </button>

          {/* Teacher Settings Button */}
          <button
            onClick={onOpenTeacherControl}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-500/50 font-bold text-sm sm:text-base transition shadow-md"
            title="Điều khiển của Giáo Viên"
          >
            <Settings className="w-5 h-5 text-purple-300" />
            <span className="hidden md:inline">Giáo Viên</span>
          </button>
        </div>
      </div>
    </header>
  );
};
