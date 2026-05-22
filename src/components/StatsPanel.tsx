import type { GameStats } from '../game/types';

interface StatsPanelProps {
  stats: GameStats;
  totalScore: number;
}

export function StatsPanel({ stats, totalScore }: StatsPanelProps) {
  return (
    <aside className="stats-panel">
      <div className="stat-card">
        <span className="stat-icon">⭐</span>
        <div>
          <span className="stat-value">{stats.stars}</span>
          <span className="stat-label">Stars</span>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon">🪙</span>
        <div>
          <span className="stat-value">{stats.coins}</span>
          <span className="stat-label">Coins</span>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon">🎯</span>
        <div>
          <span className="stat-value">{totalScore}</span>
          <span className="stat-label">Score</span>
        </div>
      </div>
    </aside>
  );
}
