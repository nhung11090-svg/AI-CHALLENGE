import { Game1Question, GameLevel } from '../types';
import { datasetManager } from './game1Dataset';

export function getQuestionsForRound(
  level: GameLevel,
  recentHistoryIds: string[] = []
): { questions: Game1Question[]; updatedHistoryIds: string[] } {
  const datasetImages = datasetManager.getQuestionsForSession(level);

  const questions: Game1Question[] = datasetImages.map((img) => ({
    id: img.id,
    level: img.level,
    type: 'image',
    title: img.title,
    contentUrl: img.contentUrl,
    answer: img.sourceType === 'ai' ? 'AI' : 'HUMAN',
    explanation: img.explanation,
    points: img.points || 1,
    sourceNote: img.sourceNote,
  }));

  const selectedIds = questions.map((q) => q.id);
  const updatedHistoryIds = [...recentHistoryIds, ...selectedIds].slice(-24);

  return { questions, updatedHistoryIds };
}
