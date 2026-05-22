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

/** Parse prompts like "5 + 4" or "12 ÷ 3" into vertical stack notation. */
export function parseStackedMath(prompt: string): StackedMathProblem | null {
  const trimmed = prompt.trim();

  for (const { regex, operator } of BINARY_PATTERNS) {
    const match = trimmed.match(regex);
    if (match) {
      return { operator, operands: [match[1], match[2]] };
    }
  }

  const addParts = trimmed.split(/\s*\+\s*/);
  if (addParts.length >= 2 && addParts.every((part) => /^\d+$/.test(part))) {
    return { operator: '+', operands: addParts };
  }

  return null;
}
