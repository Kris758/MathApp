import type { SessionInfo } from '../game/questionPool';
import type { LevelConfig } from '../game/types';
import { ProgressBar } from './ProgressBar';

interface LevelHeaderProps {
  level: LevelConfig;
  levelCorrect: number;
  currentLevelNum: number;
  sessionInfo: SessionInfo;
}

export function LevelHeader({
  level,
  levelCorrect,
  currentLevelNum,
  sessionInfo,
}: LevelHeaderProps) {
  return (
    <header className="level-header">
      <div className="level-badge">
        <span className="level-num">Level {currentLevelNum}</span>
        <span className="level-of">of 7</span>
      </div>
      <div>
        <h2 className="level-name">{level.name}</h2>
        <p className="level-skill">{level.skill}</p>
        <p className="session-info">
          Question {sessionInfo.questionInSession} of {sessionInfo.sessionTotal}{' '}
          <span className="session-pool-note">
            (from {sessionInfo.poolTotal} in this level&apos;s pool)
          </span>
        </p>
      </div>
      <ProgressBar
        current={levelCorrect}
        required={level.requiredCorrect}
        label="Progress to next planet"
      />
    </header>
  );
}
