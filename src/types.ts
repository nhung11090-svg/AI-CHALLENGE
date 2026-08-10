export type GameLevel = 'EXPLORER' | 'CHALLENGER' | 'MASTER' | 'MIXED';

export type TeamId = 'A' | 'B';

export interface TeamScore {
  name: string;
  score: number;
}

export type QuestionType = 'image' | 'text';
export type AnswerType = 'AI' | 'HUMAN';

export interface Game1Question {
  id: string;
  level: 'EXPLORER' | 'CHALLENGER' | 'MASTER';
  type: QuestionType;
  title: string;
  contentUrl?: string; // Image URL or SVG string/data
  textSnippet?: string; // Short text if text type
  answer: AnswerType;
  explanation: string;
  points: number; // 1 for normal, 2 for final bonus
  sourceNote?: string; // Teacher/Admin mode only - hidden from students
}

export interface DatasetImage {
  id: string; // Neutral ID e.g. "IMG_00101"
  filename: string; // Neutral e.g. "IMG_00101.jpg"
  contentUrl: string; // Photorealistic image URL
  sourceType: 'ai' | 'real';
  level: 'EXPLORER' | 'CHALLENGER' | 'MASTER';
  category: 'Đời sống' | 'Đồ vật' | 'Thiên nhiên' | 'Kiến trúc' | 'Ẩm thực' | 'Công nghệ';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  title: string;
  explanation: string;
  sourceNote?: string; // Admin mode only - hidden from students
  enabled: boolean;
  flaggedTooEasy?: boolean;
  points?: number;
}

export interface DetectiveHistoryItem {
  questionNumber: number;
  question: string;
  answer: 'YES' | 'NO' | 'MAYBE';
}

export interface DetectiveCategory {
  id: string;
  name: string;
  icon: string;
  level: GameLevel[];
  examples: string[];
}

export interface DetectiveAIResponse {
  type: 'question' | 'guess';
  text: string;
  confidence?: number;
  reasoning?: string; // for demo mode
}

export interface PromptOption {
  id: string;
  label: string;
  englishLabel: string;
  icon: string;
}

export interface PromptSelection {
  character?: PromptOption;
  location?: PromptOption;
  action?: PromptOption;
  style?: PromptOption;
  details: PromptOption[];
}

export interface CostGuardSettings {
  maxImagesPerSession: number; // default 1
  maxImagesPerDay: number; // default 30
  imagesToday: number;
  imagesInSession: number;
  imageQuality: 'ECONOMY' | 'STANDARD' | 'HIGH';
}

export type AIOnlineStatus = 'online' | 'demo' | 'quota_reached' | 'offline';

export interface TeacherSettings {
  isEventMode: boolean; // default true
  isDemoMode: boolean; // default false
  pinEnabled: boolean;
  pin: string; // default '1234'
  soundEnabled: boolean;
  timerPresetSeconds: number; // default 720 (12 minutes)
}

export type ActiveGameTab = 'HOME' | 'TEAMS' | 'GAME1' | 'GAME2' | 'GAME3' | 'FINAL';
