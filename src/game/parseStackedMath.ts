export interface StackedMathProblem {
  operator: string;
  operands: string[];
}

const BINARY_PATTERNS: { regex: RegExp; operator: string }[] = [
  { regex: /^(\d+)\s*\+\s*(\d+)$/, operator: '+' },
  { regex: /^(\d+)\s*-\s*(\d+)$/, operator: '−' },
  { regex: /^(\d+)\s*[×x*]\s*(\d+)$/i, operator: '×' },
  { regex: /^(\d+)\s*÷\s*(\d+)$/, operator: '÷' },
];

/** Larger addends/factors first so the top row shows the bigger number. */
function stackOperands(operator: string, operands: string[]): string[] {
  if (operator === '+' || operator === '×') {
    return [...operands].sort((a, b) => Number(b) - Number(a));
  }
  return operands;
}

/** Parse prompts like "5 + 4" or "12 ÷ 3" into vertical stack notation. */
export function parseStackedMath(prompt: string): StackedMathProblem | null {
  const trimmed = prompt.trim();

  for (const { regex, operator } of BINARY_PATTERNS) {
    const match = trimmed.match(regex);
    if (match) {
      const operands = stackOperands(operator, [match[1], match[2]]);
      return { operator, operands };
    }
  }

  const addParts = trimmed.split(/\s*\+\s*/);
  if (addParts.length >= 2 && addParts.every((part) => /^\d+$/.test(part))) {
    return { operator: '+', operands: stackOperands('+', addParts) };
  }

  return null;
}
