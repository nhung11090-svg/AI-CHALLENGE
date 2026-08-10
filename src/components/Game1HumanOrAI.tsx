import React, { useState, useEffect } from 'react';
import { Eye, HelpCircle, CheckCircle, XCircle, ArrowRight, Award, RotateCcw, Lightbulb, Sparkles } from 'lucide-react';
import { Game1Question, GameLevel } from '../types';
import { getQuestionsForRound } from '../data/game1Questions';
import { soundManager } from '../utils/audio';

interface Game1HumanOrAIProps {
  level: GameLevel;
  onAwardPoint: (team: 'A' | 'B', pts: number) => void;
  onCompleteGame1: () => void;
  onProgressUpdate: (current: number) => void;
}

export const Game1HumanOrAI: React.FC<Game1HumanOrAIProps> = ({
  level,
  onAwardPoint,
  onCompleteGame1,
  onProgressUpdate,
}) => {
  const [questions, setQuestions] = useState<Game1Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [awardedA, setAwardedA] = useState(false);
  const [awardedB, setAwardedB] = useState(false);

  useEffect(() => {
    const { questions: qList } = getQuestionsForRound(level);
    setQuestions(qList);
    setCurrentIndex(0);
    setRevealed(false);
    onProgressUpdate(1);
  }, [level]);

  const currentQ = questions[currentIndex];

  if (!currentQ) {
    return <div className="text-center p-8 text-white">Đang tải câu hỏi...</div>;
  }

  const handleReveal = () => {
    setRevealed(true);
    soundManager.playCorrect();
  };

  const handleAward = (team: 'A' | 'B') => {
    if (team === 'A' && !awardedA) {
      onAwardPoint('A', currentQ.points);
      setAwardedA(true);
      soundManager.playScore();
    } else if (team === 'B' && !awardedB) {
      onAwardPoint('B', currentQ.points);
      setAwardedB(true);
      soundManager.playScore();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setRevealed(false);
      setAwardedA(false);
      setAwardedB(false);
      onProgressUpdate(nextIdx + 1);
      soundManager.playStart();
    } else {
      // Completed all questions in round
      soundManager.playVictory();
      onCompleteGame1();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col items-center">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-200 font-bold text-base mb-3 shadow">
          <span>GAME 1 • CÂU {currentIndex + 1} / {questions.length || 4}</span>
          {currentQ.points > 1 && (
            <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-xs font-black animate-bounce">
              🔥 CÂU QUYẾT ĐỊNH (2 ĐIỂM)
            </span>
          )}
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          ẢNH THẬT HAY AI?
        </h2>
        <p className="text-2xl font-black text-amber-300 mt-2">
          “Bạn có nhận ra đâu là ảnh chụp thật?”
        </p>
      </div>

      {/* Question Card Display Area */}
      <div className="w-full bg-slate-900/95 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6 flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-black text-indigo-100 mb-5 text-center">
          {currentQ.title}
        </h3>

        {/* Media Display - High Quality Photorealistic Image */}
        {currentQ.contentUrl && (
          <div className="w-full max-w-3xl h-[380px] sm:h-[480px] rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 flex items-center justify-center p-3 mb-6 shadow-inner relative group">
            <img
              src={currentQ.contentUrl}
              alt="Bức ảnh quan sát"
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
        )}

        {/* Big Choice Buttons: 📷 ẢNH THẬT vs 🤖 ẢNH AI */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-lg my-4">
          <div
            className={`p-6 rounded-3xl border-2 text-center transition-all ${
              revealed && currentQ.answer === 'HUMAN'
                ? 'bg-emerald-600/50 border-emerald-300 ring-4 ring-yellow-400 scale-105 shadow-2xl'
                : 'bg-slate-800/90 border-slate-700'
            }`}
          >
            <span className="text-5xl block mb-2">📷</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-200">ẢNH THẬT</span>
          </div>

          <div
            className={`p-6 rounded-3xl border-2 text-center transition-all ${
              revealed && currentQ.answer === 'AI'
                ? 'bg-purple-600/50 border-purple-300 ring-4 ring-yellow-400 scale-105 shadow-2xl'
                : 'bg-slate-800/90 border-slate-700'
            }`}
          >
            <span className="text-5xl block mb-2">🤖</span>
            <span className="text-2xl sm:text-3xl font-black text-purple-200">ẢNH AI</span>
          </div>
        </div>

        {/* Reveal Answer Section */}
        {!revealed ? (
          <button
            onClick={handleReveal}
            className="mt-6 px-12 py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-3xl rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition flex items-center gap-4"
          >
            <Eye className="w-9 h-9" />
            <span>XEM ĐÁP ÁN</span>
          </button>
        ) : (
          <div className="w-full max-w-3xl bg-indigo-950/90 border-2 border-amber-400/80 rounded-3xl p-6 text-center mt-6 animate-fade-in shadow-2xl">
            <div className="text-3xl sm:text-4xl font-black mb-3 flex items-center justify-center gap-3">
              <span className="text-amber-300">ĐÁP ÁN ĐÚNG:</span>
              <span className={currentQ.answer === 'AI' ? 'text-purple-300' : 'text-emerald-300'}>
                {currentQ.answer === 'AI' ? '🤖 ẢNH DO AI TẠO RA' : '📷 ẢNH CHỤP THẬT'}
              </span>
            </div>
            <p className="text-xl sm:text-2xl text-indigo-100 font-bold leading-relaxed mb-4">{currentQ.explanation}</p>

            {/* Point Awarding Control */}
            <div className="mt-6 pt-5 border-t border-indigo-800 flex flex-wrap items-center justify-center gap-5">
              <span className="text-base font-black text-amber-200 w-full sm:w-auto">
                CỘNG ĐIỂM CHO ĐỘI TRẢ LỜI ĐÚNG ({currentQ.points} ĐIỂM):
              </span>
              <button
                onClick={() => handleAward('A')}
                disabled={awardedA}
                className={`px-6 py-3 rounded-2xl font-black text-xl transition flex items-center gap-2 ${
                  awardedA
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-xl hover:scale-105'
                }`}
              >
                <span>+${currentQ.points}</span>
                <span>ĐỘI A</span>
              </button>

              <button
                onClick={() => handleAward('B')}
                disabled={awardedB}
                className={`px-6 py-3 rounded-2xl font-black text-xl transition flex items-center gap-2 ${
                  awardedB
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:scale-105'
                }`}
              >
                <span>+${currentQ.points}</span>
                <span>ĐỘI B</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Educational Message Banner */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-amber-500/10 via-indigo-900/60 to-purple-900/60 border border-amber-400/40 rounded-2xl p-4 text-center shadow-lg mb-6">
        <div className="flex items-center justify-center gap-2 text-amber-300 font-black text-base mb-1">
          <Lightbulb className="w-5 h-5 text-yellow-300" />
          <span>THÔNG ĐIỆP GIÁO DỤC</span>
        </div>
        <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
          “Ảnh AI ngày càng giống ảnh thật. Quan sát bằng mắt có thể giúp phát hiện một số dấu hiệu nhưng không phải lúc nào cũng xác định chính xác nguồn gốc hình ảnh.”
        </p>
      </div>

      {/* Next Question Navigation */}
      {revealed && (
        <button
          onClick={handleNextQuestion}
          className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-black text-3xl rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition flex items-center gap-4"
        >
          <span>{currentIndex < questions.length - 1 ? 'CÂU HỎI TIẾP THEO' : 'HOÀN THÀNH GAME 1'}</span>
          <ArrowRight className="w-9 h-9" />
        </button>
      )}
    </div>
  );
};

