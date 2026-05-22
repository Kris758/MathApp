interface StackedMathProps {
  operator: string;
  operands: string[];
  answer: string;
}

export function StackedMath({ operator, operands, answer }: StackedMathProps) {
  const topOperands = operands.slice(0, -1);
  const bottomOperand = operands[operands.length - 1];
  const bottomRow = topOperands.length + 1;
  const lineRow = bottomRow + 1;
  const answerRow = lineRow + 1;
  const ariaLabel = `${operands.join(` ${operator} `)}. Your answer: ${answer || 'not entered'}`;

  return (
    <div className="stacked-math" aria-label={ariaLabel}>
      <div
        className="stacked-math-grid"
        style={{ gridTemplateRows: `repeat(${answerRow}, auto)` }}
      >
        {topOperands.map((operand, index) => (
          <span
            key={`top-${index}`}
            className="stacked-num"
            style={{ gridColumn: 2, gridRow: index + 1 }}
          >
            {operand}
          </span>
        ))}
        <span className="stacked-op" style={{ gridColumn: 1, gridRow: bottomRow }}>
          {operator}
        </span>
        <span className="stacked-num" style={{ gridColumn: 2, gridRow: bottomRow }}>
          {bottomOperand}
        </span>
        <div className="stacked-rule" style={{ gridColumn: 2, gridRow: lineRow }} />
        <span
          className={`stacked-answer ${answer ? 'has-value' : 'is-empty'}`}
          style={{ gridColumn: 2, gridRow: answerRow }}
          aria-hidden="true"
        >
          {answer || '?'}
        </span>
      </div>
    </div>
  );
}
