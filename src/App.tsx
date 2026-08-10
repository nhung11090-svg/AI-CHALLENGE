import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { TeamSetupScreen } from './components/TeamSetupScreen';
import { Game1HumanOrAI } from './components/Game1HumanOrAI';
import { Game2AIDetective } from './components/Game2AIDetective';
import { Game3PromptBattle } from './components/Game3PromptBattle';
import { FinalScoreScreen } from './components/FinalScoreScreen';
import { TeacherControlPanel } from './components/TeacherControlPanel';

import {
  GameLevel,
  TeamScore,
  ActiveGameTab,
  TeacherSettings,
  CostGuardSettings,
  AIOnlineStatus,
} from './types';
import { aiService } from './services/aiService';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveGameTab>('HOME');
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>('MIXED');

  const [teamA, setTeamA] = useState<TeamScore>({ name: 'ĐỘI A', score: 0 });
  const [teamB, setTeamB] = useState<TeamScore>({ name: 'ĐỘI B', score: 0 });

  const [game1Progress, setGame1Progress] = useState(0);

  // Timer: 12 minutes (720 seconds)
  const [timerSeconds, setTimerSeconds] = useState(720);
  const [timerRunning, setTimerRunning] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [teacherControlOpen, setTeacherControlOpen] = useState(false);

  const [textAiStatus, setTextAiStatus] = useState<AIOnlineStatus>('online');
  const [imageAiStatus, setImageAiStatus] = useState<AIOnlineStatus>('online');

  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings>({
    isEventMode: true,
    isDemoMode: false,
    pinEnabled: false,
    pin: '1234',
    soundEnabled: true,
    timerPresetSeconds: 720,
  });

  const [costGuard, setCostGuard] = useState<CostGuardSettings>({
    maxImagesPerSession: 1,
    maxImagesPerDay: 30,
    imagesToday: 0,
    imagesInSession: 0,
    imageQuality: 'ECONOMY',
  });

  // Fetch status from server on load
  useEffect(() => {
    aiService.getStatus().then((st) => {
      setTextAiStatus(st.textAiStatus);
      setImageAiStatus(st.imageAiStatus);
      setCostGuard((prev) => ({
        ...prev,
        imagesToday: st.dailyImageCount || 0,
        maxImagesPerDay: st.dailyImageLimit || 30,
        imagesInSession: st.sessionImageCount || 0,
      }));
    });
  }, []);

  // Timer interval countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Keyboard Shortcuts for Teacher Controller
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore inside text inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      } else if (e.key === 'a' || e.key === 'A') {
        handleAdjustScore('A', 1);
      } else if (e.key === 'b' || e.key === 'B') {
        handleAdjustScore('B', 1);
      } else if (e.key === 'ArrowRight') {
        handleNavigateNext();
      } else if (e.key === 'ArrowLeft') {
        handleNavigatePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  const handleAdjustScore = (team: 'A' | 'B', delta: number) => {
    if (team === 'A') {
      setTeamA((prev) => ({ ...prev, score: Math.max(0, prev.score + delta) }));
    } else {
      setTeamB((prev) => ({ ...prev, score: Math.max(0, prev.score + delta) }));
    }
  };

  const handleNavigateNext = () => {
    if (activeTab === 'HOME') setActiveTab('TEAMS');
    else if (activeTab === 'TEAMS') setActiveTab('GAME1');
    else if (activeTab === 'GAME1') setActiveTab('GAME2');
    else if (activeTab === 'GAME2') setActiveTab('GAME3');
    else if (activeTab === 'GAME3') setActiveTab('FINAL');
  };

  const handleNavigatePrev = () => {
    if (activeTab === 'FINAL') setActiveTab('GAME3');
    else if (activeTab === 'GAME3') setActiveTab('GAME2');
    else if (activeTab === 'GAME2') setActiveTab('GAME1');
    else if (activeTab === 'GAME1') setActiveTab('TEAMS');
    else if (activeTab === 'TEAMS') setActiveTab('HOME');
  };

  const handleNextGroup = () => {
    setTeamA({ name: 'ĐỘI A', score: 0 });
    setTeamB({ name: 'ĐỘI B', score: 0 });
    setGame1Progress(0);
    setTimerSeconds(teacherSettings.timerPresetSeconds);
    setTimerRunning(false);
    aiService.resetSession();
    setCostGuard((prev) => ({ ...prev, imagesInSession: 0 }));
    setActiveTab('TEAMS');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Fixed Header */}
      <Header
        teamA={teamA}
        teamB={teamB}
        activeTab={activeTab}
        game1Progress={game1Progress}
        timerSeconds={timerSeconds}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenTeacherControl={() => setTeacherControlOpen(true)}
        onAdjustScore={handleAdjustScore}
        imagesToday={costGuard.imagesToday}
        dailyImageLimit={costGuard.maxImagesPerDay}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col justify-center">
        {activeTab === 'HOME' && (
          <HomeScreen
            selectedLevel={selectedLevel}
            onSelectLevel={(lvl) => setSelectedLevel(lvl)}
            onStartGame={() => {
              setTimerRunning(true);
              setActiveTab('TEAMS');
            }}
          />
        )}

        {activeTab === 'TEAMS' && (
          <TeamSetupScreen
            teamAName={teamA.name}
            teamBName={teamB.name}
            onUpdateNames={(nA, nB) => {
              setTeamA((prev) => ({ ...prev, name: nA }));
              setTeamB((prev) => ({ ...prev, name: nB }));
            }}
            onTeamsReady={() => {
              setTimerRunning(true);
              setActiveTab('GAME1');
            }}
          />
        )}

        {activeTab === 'GAME1' && (
          <Game1HumanOrAI
            level={selectedLevel}
            onAwardPoint={(team, pts) => handleAdjustScore(team, pts)}
            onCompleteGame1={() => setActiveTab('GAME2')}
            onProgressUpdate={(cur) => setGame1Progress(cur)}
          />
        )}

        {activeTab === 'GAME2' && (
          <Game2AIDetective
            level={selectedLevel}
            onAwardPoint={(team, pts) => handleAdjustScore(team, pts)}
            onCompleteGame2={() => setActiveTab('GAME3')}
          />
        )}

        {activeTab === 'GAME3' && (
          <Game3PromptBattle
            imagesToday={costGuard.imagesToday}
            dailyImageLimit={costGuard.maxImagesPerDay}
            sessionImageCount={costGuard.imagesInSession}
            onAwardPoint={(team, pts) => handleAdjustScore(team, pts)}
            onCompleteGame3={() => setActiveTab('FINAL')}
          />
        )}

        {activeTab === 'FINAL' && (
          <FinalScoreScreen
            teamA={teamA}
            teamB={teamB}
            onNextGroup={handleNextGroup}
          />
        )}
      </main>

      {/* Teacher Settings Slideout Drawer */}
      <TeacherControlPanel
        isOpen={teacherControlOpen}
        onClose={() => setTeacherControlOpen(false)}
        teacherSettings={teacherSettings}
        costGuard={costGuard}
        activeTab={activeTab}
        textAiStatus={textAiStatus}
        imageAiStatus={imageAiStatus}
        onUpdateTeacherSettings={(newSt) => setTeacherSettings((prev) => ({ ...prev, ...newSt }))}
        onUpdateCostGuard={(newCg) => setCostGuard((prev) => ({ ...prev, ...newCg }))}
        onAdjustScore={handleAdjustScore}
        onSelectLevel={setSelectedLevel}
        selectedLevel={selectedLevel}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setTeacherControlOpen(false);
        }}
        onResetSession={handleNextGroup}
      />
    </div>
  );
}
