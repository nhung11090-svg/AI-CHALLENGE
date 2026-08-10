import { DetectiveHistoryItem, DetectiveAIResponse, GameLevel, CostGuardSettings, PromptSelection } from '../types';
import { getDemoDetectiveNextStep } from '../data/game2DecisionTree';
import { generateDemoSVG } from '../data/game3Options';

class AIService {
  private isDemoModeForce: boolean = false;

  setDemoMode(forceDemo: boolean) {
    this.isDemoModeForce = forceDemo;
  }

  // Method 1: Check Server Status
  async getStatus() {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('Status check failed');
      return await res.json();
    } catch {
      return {
        hasKey: false,
        textAiStatus: 'demo',
        imageAiStatus: 'demo',
        dailyImageCount: 0,
        dailyImageLimit: 30,
        sessionImageCount: 0,
        sessionImageLimit: 1,
      };
    }
  }

  // Method 2: Ask Detective (Game 2)
  async askDetective(
    category: string,
    level: GameLevel,
    history: DetectiveHistoryItem[]
  ): Promise<DetectiveAIResponse> {
    if (this.isDemoModeForce) {
      // Simulate small delay for gameshow feel
      await new Promise((r) => setTimeout(r, 600));
      return getDemoDetectiveNextStep(category, history);
    }

    try {
      const res = await fetch('/api/detective', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, level, history }),
      });

      if (!res.ok) {
        throw new Error('Detective API Error');
      }

      const data = await res.json();
      if (data.type && data.text) {
        return { type: data.type, text: data.text };
      }
      throw new Error('Invalid schema from Detective API');
    } catch (err) {
      console.warn('Falling back to offline decision tree for Game 2 Detective:', err);
      return getDemoDetectiveNextStep(category, history);
    }
  }

  // Method 3: Generate Image (Game 3)
  async generateImage(
    prompt: string,
    selection: PromptSelection,
    quality: 'ECONOMY' | 'STANDARD' | 'HIGH' = 'ECONOMY',
    overrideCostGuard: boolean = false
  ): Promise<{ success: boolean; imageUrl: string; reason?: string; message?: string }> {
    if (this.isDemoModeForce) {
      await new Promise((r) => setTimeout(r, 800));
      return {
        success: true,
        imageUrl: generateDemoSVG(selection),
        message: 'DEMO IMAGE (Chế độ Demo Mode offline)',
      };
    }

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, quality, overrideCostGuard }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.imageUrl) {
        return {
          success: true,
          imageUrl: data.imageUrl,
        };
      }

      // Quota exceeded or error
      if (res.status === 429) {
        return {
          success: false,
          imageUrl: generateDemoSVG(selection),
          reason: data.error,
          message: data.message || 'Đã đạt giới hạn tạo ảnh.',
        };
      }

      throw new Error(data.message || 'Lỗi sinh ảnh AI');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối';
      console.warn('Image generation fallback to demo image:', errorMessage);
      return {
        success: false,
        imageUrl: generateDemoSVG(selection),
        reason: 'FALLBACK_DEMO',
        message: 'Không thể kết nối API. Hiển thị ảnh Demo minh họa.',
      };
    }
  }

  // Method 4: Reset Session Counter
  async resetSession() {
    try {
      await fetch('/api/reset-session', { method: 'POST' });
    } catch {
      // ignore
    }
  }

  // Method 5: Update Limits (Teacher Control)
  async updateLimits(maxDaily: number, resetDaily: boolean = false, resetSession: boolean = false) {
    try {
      const res = await fetch('/api/update-limits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxDaily, resetDailyCounter: resetDaily, resetSessionCounter: resetSession }),
      });
      return await res.json();
    } catch {
      return null;
    }
  }
}

export const aiService = new AIService();
