export interface Question {
  id: string;
  prompt: string;
  answer: number;
  hint: string;
}

export interface LevelConfig {
  id: number;
  name: string;
  skill: string;
  requiredCorrect: number;
  badge: string;
  badgeEmoji: string;
}

export interface GameStats {
  currentLevel: number;
  levelCorrect: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalQuestions: number;
  stars: number;
  coins: number;
  badges: string[];
  completed: boolean;
}

export type FeedbackType = 'correct' | 'incorrect' | 'levelUp' | null;
