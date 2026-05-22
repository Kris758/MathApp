interface ProgressBarProps {
  current: number;
  required: number;
  label?: string;
}

export function ProgressBar({ current, required, label }: ProgressBarProps) {
  const percent = Math.min(100, (current / required) * 100);

  return (
    <div className="progress-bar-wrap">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={required}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
        <div className="progress-shine" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-count">
        {current} / {required} correct to level up
      </span>
    </div>
  );
}
