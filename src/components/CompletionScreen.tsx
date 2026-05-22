import type { GameStats } from '../game/types';
import { BadgeDisplay } from './BadgeDisplay';

interface CompletionScreenProps {
  stats: GameStats;
  onPlayAgain: () => void;
}

export function CompletionScreen({ stats, onPlayAgain }: CompletionScreenProps) {
  return (
    <div className="completion-screen">
      <div className="completion-burst" aria-hidden="true" />
      <div className="completion-content">
        <span className="completion-trophy">🏆</span>
        <h2>Mission Complete!</h2>
        <p className="completion-message">
          Congratulations! You completed the Math Adventure and became a Math
          Adventure Champion!
        </p>

        <div className="completion-stats">
          <div className="completion-stat">
            <span className="big-num">{stats.totalQuestions}</span>
            <span>Questions Answered</span>
          </div>
          <div className="completion-stat">
            <span className="big-num correct">{stats.totalCorrect}</span>
            <span>Correct Answers</span>
          </div>
          <div className="completion-stat">
            <span className="big-num incorrect">{stats.totalIncorrect}</span>
            <span>Incorrect Answers</span>
          </div>
          <div className="completion-stat">
            <span className="big-num">{stats.stars}</span>
            <span>Stars Earned</span>
          </div>
          <div className="completion-stat">
            <span className="big-num">{stats.coins}</span>
            <span>Coins Earned</span>
          </div>
        </div>

        <BadgeDisplay earnedBadges={stats.badges} />

        <button type="button" className="play-again-btn" onClick={onPlayAgain}>
          Explore Again 🌌
        </button>
      </div>
    </div>
  );
}
