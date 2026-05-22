import { useCallback, useRef, useState } from 'react';
import {
  getCorrectFeedback,
  getIncorrectFeedback,
  getLevelUpFeedback,
} from './feedback';
import { getLevel, LEVELS } from './levels';
import {
  createLevelSession,
  type LevelQuestionSession,
  type SessionInfo,
} from './questionPool';
import type { FeedbackType, GameStats, Question } from './types';

const INITIAL_STATS: GameStats = {
  currentLevel: 1,
  levelCorrect: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  totalQuestions: 0,
  stars: 0,
  coins: 0,
  badges: [],
  completed: false,
};

interface SubmitResult {
  isCorrect: boolean;
  leveledUp: boolean;
  completed: boolean;
}

function processAnswer(
  prev: GameStats,
  isCorrect: boolean,
  levelId: number
): { stats: GameStats; result: SubmitResult } {
  const next: GameStats = {
    ...prev,
    totalQuestions: prev.totalQuestions + 1,
  };

  if (!isCorrect) {
    next.totalIncorrect += 1;
    return {
      stats: next,
      result: { isCorrect: false, leveledUp: false, completed: false },
    };
  }

  next.totalCorrect += 1;
  next.levelCorrect += 1;
  next.stars += 1;
  next.coins += 10;

  const level = getLevel(levelId);
  let leveledUp = false;
  let completed = false;

  if (next.levelCorrect >= level.requiredCorrect) {
    const badge = level.badge;
    if (!next.badges.includes(badge)) {
      next.badges = [...next.badges, badge];
    }

    if (levelId >= LEVELS.length) {
      completed = true;
      next.completed = true;
      if (!next.badges.includes('Math Adventure Champion')) {
        next.badges = [...next.badges, 'Math Adventure Champion'];
      }
    } else {
      leveledUp = true;
      next.currentLevel = levelId + 1;
      next.levelCorrect = 0;
    }
  }

  return {
    stats: next,
    result: { isCorrect: true, leveledUp, completed },
  };
}

function startSession(levelId: number): {
  session: LevelQuestionSession;
  question: Question;
  info: SessionInfo;
} {
  const session = createLevelSession(levelId);
  return { session, question: session.current, info: session.info };
}

export function useGameState() {
  const initialSession = startSession(1);
  const sessionRef = useRef<LevelQuestionSession>(initialSession.session);

  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [question, setQuestion] = useState<Question>(initialSession.question);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo>(initialSession.info);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [hint, setHint] = useState('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [shake, setShake] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const levelConfig = getLevel(stats.currentLevel);

  const loadLevelSession = useCallback((levelId: number) => {
    const { session, question: q, info } = startSession(levelId);
    sessionRef.current = session;
    setQuestion(q);
    setSessionInfo(info);
  }, []);

  const submitAnswer = useCallback(() => {
    if (stats.completed || isProcessing) return;

    const trimmed = input.trim();
    if (trimmed === '' || Number.isNaN(Number(trimmed))) {
      setFeedback('Please enter a number for your answer.');
      setFeedbackType('incorrect');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsProcessing(true);
    const userAnswer = parseInt(trimmed, 10);
    const isCorrect = userAnswer === question.answer;

    if (!isCorrect) {
      const { stats: updated } = processAnswer(stats, false, stats.currentLevel);
      setStats(updated);
      setFeedback(getIncorrectFeedback());
      setFeedbackType('incorrect');
      setHint(question.hint);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setIsProcessing(false);
      }, 500);
      return;
    }

    const { stats: updated, result } = processAnswer(
      stats,
      true,
      stats.currentLevel
    );
    setStats(updated);

    setFeedback(getCorrectFeedback());
    setFeedbackType('correct');
    setHint('');
    setPulse(true);

    setTimeout(() => {
      setPulse(false);

      if (result.leveledUp) {
        setFeedback(getLevelUpFeedback());
        setFeedbackType('levelUp');
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2200);
      }

      if (result.completed) {
        setFeedback(
          'Congratulations! You completed the Math Adventure and became a Math Adventure Champion!'
        );
        setFeedbackType('levelUp');
      } else {
        if (result.leveledUp) {
          loadLevelSession(updated.currentLevel);
        } else {
          const nextQ = sessionRef.current.advance();
          setQuestion(nextQ);
          setSessionInfo(sessionRef.current.info);
        }
        setInput('');
        if (!result.leveledUp) {
          setFeedback('');
          setFeedbackType(null);
        }
      }

      setIsProcessing(false);
    }, 900);
  }, [input, question, stats, isProcessing, loadLevelSession]);

  const resetGame = useCallback(() => {
    setStats(INITIAL_STATS);
    loadLevelSession(1);
    setInput('');
    setFeedback('');
    setHint('');
    setFeedbackType(null);
    setShowCelebration(false);
    setIsProcessing(false);
  }, [loadLevelSession]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') submitAnswer();
    },
    [submitAnswer]
  );

  return {
    stats,
    question,
    sessionInfo,
    input,
    setInput,
    feedback,
    hint,
    feedbackType,
    levelConfig,
    submitAnswer,
    resetGame,
    showCelebration,
    shake,
    pulse,
    handleKeyDown,
    isProcessing,
  };
}
