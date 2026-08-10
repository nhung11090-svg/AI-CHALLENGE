import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, HelpCircle, Sparkles, ArrowRight, Bot, Loader2 } from 'lucide-react';
import { DetectiveCategory, DetectiveHistoryItem, DetectiveAIResponse, GameLevel } from '../types';
import { getCategoriesForLevel } from '../data/game2DecisionTree';
import { aiService } from '../services/aiService';
import { soundManager } from '../utils/audio';

interface Game2AIDetectiveProps {
  level: GameLevel;
  onAwardPoint: (team: 'A' | 'B', pts: number) => void;
  onCompleteGame2: () => void;
}

export const Game2AIDetective: React.FC<Game2AIDetectiveProps> = ({
  level,
  onAwardPoint,
  onCompleteGame2,
}) => {
  const [categories, setCategories] = useState<DetectiveCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DetectiveCategory | null>(null);
  const [history, setHistory] = useState<DetectiveHistoryItem[]>([]);
  const [currentResponse, setCurrentResponse] = useState<DetectiveAIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const [showWordPoolModal, setShowWordPoolModal] = useState(false);
  const [wordPoolSuggestions, setWordPoolSuggestions] = useState<string[]>([]);
  const [awardedA, setAwardedA] = useState(false);
  const [awardedB, setAwardedB] = useState(false);

  const handleOpenWordPool = () => {
    if (!selectedCategory) return;
    // Pick 8 random words from selectedCategory.examples
    const shuffled = [...selectedCategory.examples].sort(() => 0.5 - Math.random());
    setWordPoolSuggestions(shuffled.slice(0, 8));
    setShowWordPoolModal(true);
  };

  useEffect(() => {
    const cats = getCategoriesForLevel(level);
    setCategories(cats);
    setSelectedCategory(null);
    setHistory([]);
    setCurrentResponse(null);
  }, [level]);

  const handleStartGameWithCategory = async (cat: DetectiveCategory) => {
    setSelectedCategory(cat);
    setHistory([]);
    setLoading(true);
    soundManager.playAIThinking();

    const initialResponse = await aiService.askDetective(cat.name, level, []);
    setCurrentResponse(initialResponse);
    setLoading(false);
  };

  const handleAnswerQuestion = async (ans: 'YES' | 'NO' | 'MAYBE') => {
    if (!selectedCategory || !currentResponse || currentResponse.type !== 'question') return;

    soundManager.playScore();

    const newHistory: DetectiveHistoryItem[] = [
      ...history,
      {
        questionNumber: history.length + 1,
        question: currentResponse.text,
        answer: ans,
      },
    ];

    setHistory(newHistory);
    setLoading(true);
    soundManager.playAIThinking();

    const nextResponse = await aiService.askDetective(selectedCategory.name, level, newHistory);
    setCurrentResponse(nextResponse);
    setLoading(false);

    if (nextResponse.type === 'guess') {
      soundManager.playVictory();
    }
  };

  const handleAward = (team: 'A' | 'B', pts: number) => {
    if (team === 'A' && !awardedA) {
      onAwardPoint('A', pts);
      setAwardedA(true);
      soundManager.playScore();
    } else if (team === 'B' && !awardedB) {
      onAwardPoint('B', pts);
      setAwardedB(true);
      soundManager.playScore();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col items-center">
      {/* Title & Slogan */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-200 font-bold text-base mb-3 shadow">
          <span>GAME 2 • AI THÁM TỬ (TỐI ĐA 7 CÂU HỎI)</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          AI THÁM TỬ
        </h2>
        <p className="text-2xl font-black text-amber-300 mt-2">
          “AI có đọc được suy nghĩ của bạn?”
        </p>
      </div>

      {/* STEP 1: Select Category */}
      {!selectedCategory && (
        <div className="w-full bg-slate-900/95 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-black text-cyan-200 mb-3 text-center">
            BƯỚC 1: CHỌN CHỦ ĐỀ CHO AI DỰ ĐOÁN
          </h3>
          <p className="text-slate-200 text-base sm:text-lg mb-8 text-center max-w-2xl font-semibold">
            Một đại diện học sinh nghĩ ngầm 1 bí mật thuộc chủ đề đã chọn. AI sẽ đặt tối đa 7 câu hỏi Có/Không!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleStartGameWithCategory(cat)}
                className="flex flex-col items-center p-6 rounded-3xl bg-slate-950 border-2 border-slate-800 hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all text-center group shadow-lg"
              >
                <span className="text-5xl mb-3 group-hover:animate-bounce">{cat.icon}</span>
                <span className="text-xl font-black text-slate-100 mb-1.5">{cat.name}</span>
                <span className="text-xs font-semibold text-slate-300">Ví dụ: {cat.examples.slice(0, 2).join(', ')}...</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: AI Questioning & Guessing */}
      {selectedCategory && (
        <div className="w-full max-w-4xl bg-slate-900/95 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-between w-full border-b-2 border-slate-800 pb-4 mb-6 gap-3">
            <span className="text-base sm:text-lg font-black text-cyan-300">
              CHỦ ĐỀ: {selectedCategory.name}
            </span>
            <button
              onClick={handleOpenWordPool}
              className="px-4 py-2 bg-indigo-900/90 hover:bg-indigo-800 text-indigo-100 border border-indigo-400/50 rounded-2xl text-sm sm:text-base font-bold transition flex items-center gap-1.5 shadow"
            >
              💡 Gợi Ý Từ Cho Học Sinh
            </button>
            <span className="text-base font-black text-amber-300 bg-amber-950/80 border border-amber-500/40 px-4 py-1.5 rounded-full shadow">
              CÂU HỎI {history.length + 1} / 7
            </span>
          </div>

          {/* Question History Breadcrumb */}
          {history.length > 0 && (
            <div className="w-full bg-slate-950/90 p-4 rounded-2xl border border-slate-800 mb-6 max-h-44 overflow-y-auto shadow-inner">
              <span className="text-xs sm:text-sm font-black text-amber-400 block mb-2 uppercase">Lịch sử trả lời:</span>
              <div className="flex flex-col gap-1.5 text-sm sm:text-base">
                {history.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-200 font-medium">
                    <span>{idx + 1}. {item.question}</span>
                    <span className="font-black text-cyan-400 ml-2">
                      {item.answer === 'YES' ? '✅ CÓ' : item.answer === 'NO' ? '❌ KHÔNG' : '🤔 KHÔNG CHẮC'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Thinking or Active Question/Guess */}
          {loading ? (
            <div className="py-16 flex flex-col items-center gap-4">
              <Loader2 className="w-16 h-16 text-cyan-400 animate-spin" />
              <span className="text-2xl font-black text-cyan-300 animate-pulse">
                AI Detective đang phân tích suy nghĩ...
              </span>
            </div>
          ) : currentResponse ? (
            <div className="w-full flex flex-col items-center text-center">
              {currentResponse.type === 'question' ? (
                <>
                  <div className="bg-gradient-to-r from-cyan-950 to-indigo-950 border-2 border-cyan-400/60 rounded-3xl p-8 mb-8 w-full shadow-2xl">
                    <span className="text-sm font-black text-cyan-400 uppercase tracking-wider block mb-3">
                      CÂU HỎI TỪ AI DETECTIVE:
                    </span>
                    <p className="text-3xl sm:text-5xl font-black text-white leading-snug">
                      "{currentResponse.text}"
                    </p>
                  </div>

                  {/* Student Answer Buttons */}
                  <div className="grid grid-cols-3 gap-5 w-full">
                    <button
                      onClick={() => handleAnswerQuestion('YES')}
                      className="py-6 px-4 rounded-3xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-2xl sm:text-3xl shadow-2xl hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 border-2 border-emerald-300/40"
                    >
                      <span>✅ CÓ</span>
                    </button>

                    <button
                      onClick={() => handleAnswerQuestion('NO')}
                      className="py-6 px-4 rounded-3xl bg-rose-600 hover:bg-rose-500 text-white font-black text-2xl sm:text-3xl shadow-2xl hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 border-2 border-rose-300/40"
                    >
                      <span>❌ KHÔNG</span>
                    </button>

                    <button
                      onClick={() => handleAnswerQuestion('MAYBE')}
                      className="py-6 px-4 rounded-3xl bg-amber-600 hover:bg-amber-500 text-white font-black text-2xl sm:text-3xl shadow-2xl hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 border-2 border-amber-300/40"
                    >
                      <span>🤔 KHÔNG CHẮC</span>
                    </button>
                  </div>
                </>
              ) : (
                /* AI GUESS RESULT SCREEN */
                <div className="w-full bg-indigo-950/90 border-2 border-amber-400 rounded-3xl p-8 animate-fade-in flex flex-col items-center shadow-2xl">
                  <div className="text-6xl mb-3">🏆</div>
                  <span className="text-base font-black text-amber-300 uppercase tracking-wider">
                    DỰ ĐOÁN CUỐI CÙNG CỦA AI:
                  </span>
                  <h3 className="text-4xl sm:text-6xl font-black text-yellow-300 my-6 drop-shadow-lg">
                    "{currentResponse.text}"
                  </h3>
                  <p className="text-slate-100 text-xl font-bold mb-8">
                    Học sinh xác nhận AI đã đoán ĐÚNG hay SAI?
                  </p>

                  {/* Awarding Points */}
                  <div className="w-full pt-6 border-t border-indigo-800 flex flex-wrap items-center justify-center gap-5">
                    <button
                      onClick={() => handleAward('A', 2)}
                      disabled={awardedA}
                      className={`px-6 py-3.5 rounded-2xl font-black text-xl transition ${
                        awardedA
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-xl hover:scale-105'
                      }`}
                    >
                      {awardedA ? '✓ ĐÃ CỘNG 2 ĐIỂM A' : '+2 ĐIỂM ĐỘI A'}
                    </button>

                    <button
                      onClick={() => handleAward('B', 2)}
                      disabled={awardedB}
                      className={`px-6 py-3.5 rounded-2xl font-black text-xl transition ${
                        awardedB
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:scale-105'
                      }`}
                    >
                      {awardedB ? '✓ ĐÃ CỘNG 2 ĐIỂM B' : '+2 ĐIỂM ĐỘI B'}
                    </button>
                  </div>

                  <button
                    onClick={onCompleteGame2}
                    className="mt-10 px-12 py-5 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-black text-3xl rounded-3xl shadow-2xl hover:scale-105 transition flex items-center gap-4"
                  >
                    <span>TIẾP TỤC SANG GAME 3</span>
                    <ArrowRight className="w-9 h-9" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
      {/* Word Pool Suggestions Modal */}
      {showWordPoolModal && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-3xl p-8 max-w-xl w-full text-center shadow-2xl animate-fade-in">
            <h3 className="text-3xl font-black text-amber-300 mb-3">
              💡 GỢI Ý ĐỐI TƯỢNG BÍ MẬT
            </h3>
            <p className="text-slate-200 text-base mb-6">
              Học sinh có thể chọn ngầm 1 trong các từ gợi ý thuộc chủ đề{' '}
              <strong className="text-cyan-400 font-black">{selectedCategory.name}</strong> dưới đây:
            </p>

            <div className="grid grid-cols-2 gap-4 my-6">
              {wordPoolSuggestions.map((w, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border-2 border-indigo-500/40 p-4 rounded-2xl font-extrabold text-slate-100 text-lg hover:border-amber-400 transition shadow"
                >
                  ✨ {w}
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={handleOpenWordPool}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-indigo-200 rounded-2xl font-bold text-base"
              >
                🔄 Đổi Dãy Từ Khác
              </button>
              <button
                onClick={() => setShowWordPoolModal(false)}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-base shadow-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
