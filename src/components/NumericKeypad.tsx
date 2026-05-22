const KEYPAD_KEYS = [
  { key: '7', label: '7', type: 'digit' as const },
  { key: '8', label: '8', type: 'digit' as const },
  { key: '9', label: '9', type: 'digit' as const },
  { key: '4', label: '4', type: 'digit' as const },
  { key: '5', label: '5', type: 'digit' as const },
  { key: '6', label: '6', type: 'digit' as const },
  { key: '1', label: '1', type: 'digit' as const },
  { key: '2', label: '2', type: 'digit' as const },
  { key: '3', label: '3', type: 'digit' as const },
  { key: '0', label: '0', type: 'digit' as const },
  { key: 'backspace', label: '⌫', type: 'action' as const },
  { key: 'clear', label: 'C', type: 'action' as const },
];

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  maxLength?: number;
}

function appendDigit(current: string, digit: string, maxLength: number): string {
  if (current.length >= maxLength) return current;
  return current + digit;
}

export function NumericKeypad({
  value,
  onChange,
  onSubmit,
  disabled = false,
  maxLength = 4,
}: NumericKeypadProps) {
  const handleDigit = (digit: string) => {
    if (disabled) return;
    onChange(appendDigit(value, digit, maxLength));
  };

  const handleBackspace = () => {
    if (disabled || value.length === 0) return;
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    if (disabled) return;
    onChange('');
  };

  const handleKey = (key: (typeof KEYPAD_KEYS)[number]) => {
    if (key.type === 'digit') handleDigit(key.key);
    else if (key.key === 'backspace') handleBackspace();
    else handleClear();
  };

  return (
    <div className="numeric-keypad" role="group" aria-label="Number keypad">
      {KEYPAD_KEYS.map((key) => (
        <button
          key={key.key}
          type="button"
          className={`keypad-key ${key.type === 'action' ? 'keypad-key--action' : ''}`}
          onClick={() => handleKey(key)}
          disabled={
            disabled ||
            (key.key === 'backspace' && value.length === 0) ||
            (key.key === 'clear' && value.length === 0)
          }
          aria-label={
            key.type === 'digit'
              ? `Digit ${key.label}`
              : key.key === 'backspace'
                ? 'Delete last digit'
                : 'Clear answer'
          }
        >
          {key.label}
        </button>
      ))}
      <button
        type="button"
        className="keypad-key keypad-key--enter"
        onClick={onSubmit}
        disabled={disabled}
        aria-label="Check answer"
      >
        ✓ Check
      </button>
    </div>
  );
}
