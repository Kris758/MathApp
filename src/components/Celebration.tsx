interface CelebrationProps {
  show: boolean;
}

const PARTICLES = [
  { emoji: '🚀', x: -100, y: -80 },
  { emoji: '⭐', x: 120, y: -60 },
  { emoji: '🪐', x: -80, y: 90 },
  { emoji: '✨', x: 90, y: 100 },
  { emoji: '🌟', x: 0, y: -120 },
];

export function Celebration({ show }: CelebrationProps) {
  if (!show) return null;

  return (
    <div className="celebration-overlay" aria-hidden="true">
      <div className="celebration-rays" />
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="celebration-particle"
          style={
            {
              '--tx': `${p.x}px`,
              '--ty': `${p.y}px`,
            } as React.CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
      <p className="celebration-text">New Level Unlocked!</p>
    </div>
  );
}
