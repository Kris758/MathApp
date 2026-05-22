// Word-to-number helpers for Level 2

const ONES: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
};

const TENS: Record<string, number> = {
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

export function numberToWords(n: number): string {
  if (n < 20) {
    const entry = Object.entries(ONES).find(([, v]) => v === n);
    return entry?.[0] ?? String(n);
  }
  const tens = Math.floor(n / 10) * 10;
  const ones = n % 10;
  const tensWord = Object.entries(TENS).find(([, v]) => v === tens)?.[0];
  if (ones === 0) return tensWord ?? String(n);
  const onesWord = Object.entries(ONES).find(([, v]) => v === ones)?.[0];
  return `${tensWord}-${onesWord}`;
}

export function randomWordNumber(min: number, max: number): { value: number; text: string } {
  const value = randInt(min, max);
  return { value, text: numberToWords(value) };
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
