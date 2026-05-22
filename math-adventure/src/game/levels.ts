import type { LevelConfig } from './types';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: 'Planet Add',
    skill: 'Basic Addition',
    requiredCorrect: 5,
    badge: 'Addition Hero',
    badgeEmoji: '➕',
  },
  {
    id: 2,
    name: 'Word Galaxy',
    skill: 'Worded Addition',
    requiredCorrect: 5,
    badge: 'Word Problem Wizard',
    badgeEmoji: '📝',
  },
  {
    id: 3,
    name: 'Double-Digit Nebula',
    skill: 'Two-Digit Addition',
    requiredCorrect: 6,
    badge: 'Two-Digit Champion',
    badgeEmoji: '🔢',
  },
  {
    id: 4,
    name: 'Group Cluster',
    skill: 'Multiplication Concepts',
    requiredCorrect: 6,
    badge: 'Multiplication Explorer',
    badgeEmoji: '✖️',
  },
  {
    id: 5,
    name: 'Times Table Station',
    skill: 'Multiplication Facts',
    requiredCorrect: 7,
    badge: 'Multiplication Master',
    badgeEmoji: '🚀',
  },
  {
    id: 6,
    name: 'Share Sector',
    skill: 'Division as Sharing',
    requiredCorrect: 6,
    badge: 'Division Explorer',
    badgeEmoji: '🍪',
  },
  {
    id: 7,
    name: 'Fact Frontier',
    skill: 'Division Facts',
    requiredCorrect: 7,
    badge: 'Math Adventure Champion',
    badgeEmoji: '🏆',
  },
];

export function getLevel(levelId: number): LevelConfig {
  return LEVELS.find((l) => l.id === levelId) ?? LEVELS[0];
}
