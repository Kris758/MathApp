const DIGIT_ROWS: readonly (readonly string[])[] = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0'],
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

  return (
    <div className="numeric-keypad" role="group" aria-label="Number keypad">
      {DIGIT_ROWS.map((row, rowIndex) => (
        <div className="keypad-row" key={rowIndex}>
          {row.map((digit) => (
            <button
              key={digit}
              type="button"
              className="keypad-key"
              onClick={() => handleDigit(digit)}
              disabled={disabled}
              aria-label={`Digit ${digit}`}
            >
              {digit}
            </button>
          ))}
          {rowIndex === DIGIT_ROWS.length - 1 && (
            <>
              <button
                type="button"
                className="keypad-key keypad-key--action"
                onClick={handleBackspace}
                disabled={disabled || value.length === 0}
                aria-label="Delete last digit"
              >
                ⌫
              </button>
              <button
                type="button"
                className="keypad-key keypad-key--action"
                onClick={handleClear}
                disabled={disabled || value.length === 0}
                aria-label="Clear answer"
              >
                C
              </button>
            </>
          )}
        </div>
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
