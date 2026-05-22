/** Decorative animated star background */
export function Starfield() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 11) % 100}%`,
    size: (i % 3) + 1,
    delay: `${(i % 8) * 0.4}s`,
    duration: `${2 + (i % 5)}s`,
  }));

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
