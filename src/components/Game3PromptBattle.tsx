import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Shield, Image as ImageIcon, Loader2, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { PromptOption, PromptSelection } from '../types';
import { getGame3SessionOptions, buildPromptFromSelection } from '../data/game3Options';
import { aiService } from '../services/aiService';
import { soundManager } from '../utils/audio';

interface Game3PromptBattleProps {
  imagesToday: number;
  dailyImageLimit: number;
  sessionImageCount: number;
  onAwardPoint: (team: 'A' | 'B', pts: number) => void;
  onCompleteGame3: () => void;
  onTeacherRegenerateImage?: () => void;
}

export const Game3PromptBattle: React.FC<Game3PromptBattleProps> = ({
  imagesToday,
  dailyImageLimit,
  sessionImageCount,
  onAwardPoint,
  onCompleteGame3,
}) => {
  const [options, setOptions] = useState(() => getGame3SessionOptions());
  const [step, setStep] = useState<number>(1);
  const [selection, setSelection] = useState<PromptSelection>({
    details: [],
  });

  useEffect(() => {
    // Refresh randomized options pool for new Game 3 session
    setOptions(getGame3SessionOptions());
  }, []);

  const [loading, setLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [awardedA, setAwardedA] = useState(false);
  const [awardedB, setAwardedB] = useState(false);

  const isImageGeneratedInSession = sessionImageCount > 0 || generatedImageUrl !== null;

  const handleSelectCharacter = (opt: PromptOption) => {
    setSelection((prev) => ({ ...prev, character: opt }));
    soundManager.playScore();
    setStep(2);
  };

  const handleSelectLocation = (opt: PromptOption) => {
    setSelection((prev) => ({ ...prev, location: opt }));
    soundManager.playScore();
    setStep(3);
  };

  const handleSelectAction = (opt: PromptOption) => {
    setSelection((prev) => ({ ...prev, action: opt }));
    soundManager.playScore();
    setStep(4);
  };

  const handleSelectStyle = (opt: PromptOption) => {
    setSelection((prev) => ({ ...prev, style: opt }));
    soundManager.playScore();
    setStep(5);
  };

  const handleToggleDetail = (opt: PromptOption) => {
    soundManager.playScore();
    setSelection((prev) => {
      const exists = prev.details.some((d) => d.id === opt.id);
      if (exists) {
        return { ...prev, details: prev.details.filter((d) => d.id !== opt.id) };
      }
      if (prev.details.length >= 2) {
        return prev; // max 2
      }
      return { ...prev, details: [...prev.details, opt] };
    });
  };

  const { vietnamesePrompt, englishPrompt } = buildPromptFromSelection(selection);

  const handleGenerateImage = async (override: boolean = false) => {
    if (isImageGeneratedInSession && !override) return;

    setLoading(true);
    setErrorMessage(null);
    soundManager.playAIThinking();

    const res = await aiService.generateImage(englishPrompt, selection, 'ECONOMY', override);

    setLoading(false);
    if (res.imageUrl) {
      setGeneratedImageUrl(res.imageUrl);
      soundManager.playVictory();
    }
    if (!res.success && res.message) {
      setErrorMessage(res.message);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(vietnamesePrompt);
    setCopiedPrompt(true);
    soundManager.playScore();
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleAward = (team: 'A' | 'B') => {
    if (team === 'A' && !awardedA) {
      onAwardPoint('A', 3);
      setAwardedA(true);
      soundManager.playScore();
    } else if (team === 'B' && !awardedB) {
      onAwardPoint('B', 3);
      setAwardedB(true);
      soundManager.playScore();
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col items-center">
      {/* Title & Slogan */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-200 font-bold text-base mb-3 shadow">
          <span>GAME 3 • PROMPT THẦN TỐC</span>
          <span className="bg-slate-800 text-amber-300 px-3 py-0.5 rounded-full text-xs font-mono font-bold">
            🛡 COST GUARD: {imagesToday} / {dailyImageLimit} Ảnh
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          PROMPT THẦN TỐC
        </h2>
        <p className="text-2xl font-black text-amber-300 mt-2">
          “3 từ – 1 Prompt – 1 tác phẩm AI!”
        </p>
      </div>

      {/* Step Wizard Buttons */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-8">
        {['1. NHÂN VẬT (ĐỘI A)', '2. ĐỊA ĐIỂM (ĐỘI B)', '3. HÀNH ĐỘNG', '4. PHONG CÁCH', '5. TẠO TÁC PHẨM'].map((stTitle, idx) => {
          const stNum = idx + 1;
          const isActive = step === stNum;
          const isDone = step > stNum;
          return (
            <button
              key={stNum}
              onClick={() => setStep(stNum)}
              className={`px-4 py-2 rounded-2xl font-black text-sm sm:text-base transition shadow ${
                isActive
                  ? 'bg-fuchsia-600 text-white ring-4 ring-fuchsia-300 scale-105'
                  : isDone
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'bg-slate-900 text-slate-500'
              }`}
            >
              {stTitle}
            </button>
          );
        })}
      </div>

      {/* STEP 1: CHARACTER */}
      {step === 1 && (
        <div className="w-full bg-slate-900/95 border-2 border-fuchsia-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-black text-rose-400 mb-3 text-center flex items-center justify-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-rose-600 text-white font-black text-lg shadow">A</span>
            <span>ĐỘI A CHỌN NHÂN VẬT CHÍNH</span>
          </h3>
          <p className="text-slate-200 text-base font-bold mb-6 text-center">Chọn 1 nhân vật đại diện cho đội của bạn:</p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full">
            {options.characters.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectCharacter(opt)}
                className={`p-5 rounded-3xl bg-slate-950 border-2 text-center transition flex flex-col items-center hover:scale-105 ${
                  selection.character?.id === opt.id
                    ? 'border-fuchsia-400 bg-fuchsia-950/70 ring-4 ring-fuchsia-400'
                    : 'border-slate-800 hover:border-fuchsia-400'
                }`}
              >
                <span className="text-5xl mb-3">{opt.icon}</span>
                <span className="text-base font-black text-white">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: LOCATION */}
      {step === 2 && (
        <div className="w-full bg-slate-900/95 border-2 border-fuchsia-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-black text-blue-400 mb-3 text-center flex items-center justify-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-lg shadow">B</span>
            <span>ĐỘI B CHỌN ĐỊA ĐIỂM</span>
          </h3>
          <p className="text-slate-200 text-base font-bold mb-6 text-center">Chọn không gian cho bức tranh:</p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full">
            {options.locations.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectLocation(opt)}
                className={`p-5 rounded-3xl bg-slate-950 border-2 text-center transition flex flex-col items-center hover:scale-105 ${
                  selection.location?.id === opt.id
                    ? 'border-fuchsia-400 bg-fuchsia-950/70 ring-4 ring-fuchsia-400'
                    : 'border-slate-800 hover:border-fuchsia-400'
                }`}
              >
                <span className="text-5xl mb-3">{opt.icon}</span>
                <span className="text-base font-black text-white">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: ACTION */}
      {step === 3 && (
        <div className="w-full bg-slate-900/95 border-2 border-fuchsia-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-black text-amber-300 mb-3 text-center">
            👥 CẢ LỚP CHỌN HÀNH ĐỘNG
          </h3>
          <p className="text-slate-200 text-base font-bold mb-6 text-center">Nhân vật sẽ đang làm gì?</p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full">
            {options.actions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectAction(opt)}
                className={`p-5 rounded-3xl bg-slate-950 border-2 text-center transition flex flex-col items-center hover:scale-105 ${
                  selection.action?.id === opt.id
                    ? 'border-fuchsia-400 bg-fuchsia-950/70 ring-4 ring-fuchsia-400'
                    : 'border-slate-800 hover:border-fuchsia-400'
                }`}
              >
                <span className="text-5xl mb-3">{opt.icon}</span>
                <span className="text-base font-black text-white">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: STYLE */}
      {step === 4 && (
        <div className="w-full bg-slate-900/95 border-2 border-fuchsia-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-black text-purple-300 mb-3 text-center">
            🎨 CHỌN PHONG CÁCH NGHỆ THUẬT
          </h3>
          <p className="text-slate-200 text-base font-bold mb-6 text-center">Định hình phong cách đồ họa:</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 w-full">
            {options.styles.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectStyle(opt)}
                className={`p-5 rounded-3xl bg-slate-950 border-2 text-center transition flex flex-col items-center hover:scale-105 ${
                  selection.style?.id === opt.id
                    ? 'border-fuchsia-400 bg-fuchsia-950/70 ring-4 ring-fuchsia-400'
                    : 'border-slate-800 hover:border-fuchsia-400'
                }`}
              >
                <span className="text-5xl mb-3">{opt.icon}</span>
                <span className="text-base font-black text-white">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: DETAILS & GENERATE */}
      {step === 5 && (
        <div className="w-full max-w-5xl bg-slate-900/95 border-2 border-fuchsia-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-black text-yellow-300 mb-3 text-center">
            ✨ BỔ SUNG CHI TIẾT & BẮT ĐẦU TẠO ẢNH
          </h3>
          <p className="text-slate-200 text-base font-bold mb-6 text-center">
            Chọn tối đa 2 chi tiết độc đáo (tùy chọn):
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full mb-8">
            {options.details.map((opt) => {
              const isSelected = selection.details.some((d) => d.id === opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => handleToggleDetail(opt)}
                  className={`p-3.5 rounded-2xl border-2 text-sm font-black transition flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-fuchsia-600 border-fuchsia-300 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-fuchsia-400'
                  }`}
                >
                  <span className="text-lg">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Built Vietnamese Prompt Display */}
          <div className="w-full bg-slate-950 p-6 rounded-3xl border-2 border-indigo-500/40 mb-8 text-left relative shadow-xl">
            <span className="text-xs sm:text-sm font-black text-indigo-400 block mb-2 uppercase">
              PROMPT HOÀN CHỈNH DO AI ARENA TỰ ĐỘNG GHÉP:
            </span>
            <p className="text-xl sm:text-2xl text-indigo-100 font-extrabold leading-relaxed pr-14">
              "{vietnamesePrompt}"
            </p>
            <button
              onClick={handleCopyPrompt}
              className="absolute top-4 right-4 p-3 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-2xl border border-slate-700 transition shadow"
              title="Sao chép Prompt"
            >
              {copiedPrompt ? <Check className="w-6 h-6 text-emerald-400" /> : <Copy className="w-6 h-6" />}
            </button>
          </div>

          {/* AI COST GUARD STRICT RESTRICTION NOTICE */}
          {isImageGeneratedInSession && (
            <div className="w-full bg-amber-950/90 border-2 border-amber-500/50 p-4 rounded-2xl mb-6 text-center text-amber-200 text-sm font-black">
              ⚠️ Đã tạo 1 ảnh cho lượt chơi này. Nút tạo ảnh bị khóa để bảo vệ chi phí (Cost Guard).
            </div>
          )}

          {errorMessage && (
            <div className="w-full bg-rose-950/90 border-2 border-rose-500/50 p-4 rounded-2xl mb-6 text-center text-rose-200 text-sm font-black">
              {errorMessage}
            </div>
          )}

          {/* Image Generation Action Button */}
          {!generatedImageUrl ? (
            <button
              onClick={() => handleGenerateImage(false)}
              disabled={loading || isImageGeneratedInSession}
              className={`w-full max-w-lg py-6 rounded-3xl font-black text-3xl shadow-2xl transition flex items-center justify-center gap-4 ${
                loading || isImageGeneratedInSession
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:scale-105 active:scale-95 text-white border-2 border-fuchsia-300/60'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-9 h-9 animate-spin" />
                  <span>AI ĐANG SINH TÁC PHẨM...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-9 h-9 text-yellow-300" />
                  <span>✨ TẠO ẢNH AI</span>
                </>
              )}
            </button>
          ) : (
            /* IMAGE RESULT DISPLAY */
            <div className="w-full flex flex-col items-center animate-fade-in">
              <div className="w-full max-w-2xl h-[420px] sm:h-[500px] bg-slate-950 border-2 border-fuchsia-400 rounded-3xl overflow-hidden shadow-2xl p-3 mb-8 flex items-center justify-center">
                <img
                  src={generatedImageUrl}
                  alt="AI Generated Artwork"
                  className="max-h-full max-w-full object-contain rounded-2xl shadow-xl"
                />
              </div>

              {/* Award Points & Navigation */}
              <div className="w-full border-t-2 border-slate-800 pt-8 flex flex-col items-center">
                <p className="text-xl sm:text-2xl font-black text-indigo-200 mb-4 text-center">
                  BÌNH CHỌN VÀ CỘNG ĐIỂM TÁC PHẨM (3 ĐIỂM):
                </p>

                <div className="flex gap-5 mb-10">
                  <button
                    onClick={() => handleAward('A')}
                    disabled={awardedA}
                    className={`px-8 py-4 rounded-2xl font-black text-2xl transition ${
                      awardedA
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-xl hover:scale-105'
                    }`}
                  >
                    {awardedA ? '✓ ĐÃ CỘNG 3 ĐIỂM A' : '+3 ĐIỂM ĐỘI A'}
                  </button>

                  <button
                    onClick={() => handleAward('B')}
                    disabled={awardedB}
                    className={`px-8 py-4 rounded-2xl font-black text-2xl transition ${
                      awardedB
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:scale-105'
                    }`}
                  >
                    {awardedB ? '✓ ĐÃ CỘNG 3 ĐIỂM B' : '+3 ĐIỂM ĐỘI B'}
                  </button>
                </div>

                <button
                  onClick={onCompleteGame3}
                  className="px-12 py-6 bg-gradient-to-r from-emerald-500 via-indigo-600 to-purple-600 text-white font-black text-3xl rounded-3xl shadow-2xl hover:scale-105 transition flex items-center gap-4 border-2 border-emerald-300/50"
                >
                  <span>🏆 XEM KẾT QUẢ CHUNG CUỘC</span>
                  <ArrowRight className="w-9 h-9 text-yellow-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
