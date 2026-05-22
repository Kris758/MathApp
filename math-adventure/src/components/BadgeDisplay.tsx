import { LEVELS } from '../game/levels';

interface BadgeDisplayProps {
  earnedBadges: string[];
}

export function BadgeDisplay({ earnedBadges }: BadgeDisplayProps) {
  return (
    <section className="badge-display" aria-label="Badges earned">
      <h3 className="badge-title">Mission Badges</h3>
      <div className="badge-grid">
        {LEVELS.map((level) => {
          const earned = earnedBadges.includes(level.badge);
          return (
            <div
              key={level.id}
              className={`badge-item ${earned ? 'earned' : 'locked'}`}
              title={level.badge}
            >
              <span className="badge-emoji">{earned ? level.badgeEmoji : '🔒'}</span>
              <span className="badge-name">{level.badge}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
