import { generateQuestion } from './questionGenerators';
import type { Question } from './types';

/** Full bank of questions built for each level */
export const POOL_SIZE = 200;
/** How many questions the student sees per level attempt */
export const SESSION_SIZE = 50;

function questionKey(q: Question): string {
  return `${q.prompt}::${q.answer}`;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Build up to 200 unique questions for one level */
export function buildLevelPool(levelId: number, targetSize = POOL_SIZE): Question[] {
  const seen = new Set<string>();
  const pool: Question[] = [];
  let attempts = 0;
  const maxAttempts = targetSize * 80;

  while (pool.length < targetSize && attempts < maxAttempts) {
    attempts++;
    const q = generateQuestion(levelId);
    const key = questionKey(q);
    if (!seen.has(key)) {
      seen.add(key);
      pool.push({ ...q, id: `L${levelId}-P${pool.length}` });
    }
  }

  return pool;
}

/** Pick 50 random questions from the 200-question pool */
export function pickSessionQuestions(
  pool: Question[],
  count = SESSION_SIZE
): Question[] {
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export interface SessionInfo {
  questionInSession: number;
  sessionTotal: number;
  poolTotal: number;
}

export class LevelQuestionSession {
  private readonly pool: Question[];
  private session: Question[];
  private index = 0;

  constructor(levelId: number) {
    this.pool = buildLevelPool(levelId);
    this.session = pickSessionQuestions(this.pool);
  }

  get current(): Question {
    return this.session[this.index];
  }

  get info(): SessionInfo {
    return {
      questionInSession: this.index + 1,
      sessionTotal: this.session.length,
      poolTotal: this.pool.length,
    };
  }

  /** Call after a correct answer to load the next question from the 50 */
  advance(): Question {
    this.index++;
    if (this.index >= this.session.length) {
      this.session = pickSessionQuestions(this.pool);
      this.index = 0;
    }
    return this.current;
  }
}

export function createLevelSession(levelId: number): LevelQuestionSession {
  return new LevelQuestionSession(levelId);
}
