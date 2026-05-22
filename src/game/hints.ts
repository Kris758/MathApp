/** Build clear, question-specific hints for a 7-year-old (no final answers). */

function capWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function hintBasicAddition(a: number, b: number): string {
  const bigger = Math.max(a, b);
  const smaller = Math.min(a, b);
  if (smaller <= 6) {
    return `${a} + ${b}: Count up ${smaller} steps from ${bigger}. What number do you land on?`;
  }
  return `${a} + ${b}: Start at ${bigger} and count up ${smaller} more.`;
}

export function hintWordAddition(
  wordA: string,
  wordB: string,
  a: number,
  b: number
): string {
  const tensA = Math.floor(a / 10) * 10;
  const onesA = a % 10;
  const tensB = Math.floor(b / 10) * 10;
  const onesB = b % 10;

  if (tensA > 0 || tensB > 0) {
    const tensSum = tensA + tensB;
    const onesSum = onesA + onesB;
    return (
      `${capWord(wordA)} = ${a} and ${capWord(wordB)} = ${b}. ` +
      `Add the tens: ${tensA} + ${tensB} = ${tensSum}. ` +
      `Add the ones: ${onesA} + ${onesB} = ${onesSum}. ` +
      `Now add ${tensSum} and ${onesSum} together.`
    );
  }

  return (
    `${capWord(wordA)} = ${a} and ${capWord(wordB)} = ${b}. ` +
    `Now add ${a} and ${b} together.`
  );
}

export function hintTwoDigitAddition(a: number, b: number): string {
  const tensA = Math.floor(a / 10);
  const onesA = a % 10;
  const tensB = Math.floor(b / 10);
  const onesB = b % 10;
  const onesSum = onesA + onesB;

  if (onesSum >= 10) {
    const onesResult = onesSum % 10;
    const tensTotal = tensA + tensB + 1;
    return (
      `Break ${a} into ${tensA} tens and ${onesA} ones. Break ${b} into ${tensB} tens and ${onesB} ones. ` +
      `Ones: ${onesA} + ${onesB} = ${onesSum}. That is 1 ten and ${onesResult} ones (carry the 1). ` +
      `Tens: ${tensA} + ${tensB} + 1 = ${tensTotal}. Put your tens and ones together for the final number.`
    );
  }

  const tensTotal = tensA + tensB;
  return (
    `Add the tens: ${tensA}0 + ${tensB}0 = ${tensTotal}0. ` +
    `Add the ones: ${onesA} + ${onesB} = ${onesSum}. ` +
    `Put your tens and ones together for the final number.`
  );
}

export function hintEqualGroups(
  groups: number,
  each: number,
  itemLabel: string
): string {
  const parts = Array(groups).fill(String(each)).join(' + ');
  return (
    `${groups} groups of ${each} ${itemLabel} means ${parts}. ` +
    `You can also think of it as ${each} × ${groups}.`
  );
}

export function hintRepeatedAddition(n: number, times: number): string {
  const parts = Array(times).fill(String(n)).join(' + ');
  return `You are adding ${n} a total of ${times} times: ${parts}. Add them all up!`;
}

export function hintGroupsShort(groups: number, each: number): string {
  const parts = Array(groups).fill(String(each)).join(' + ');
  return `${groups} groups of ${each} means ${parts}. What is the total?`;
}

export function hintMultiply(a: number, b: number): string {
  if (a === 0 || b === 0) {
    return `What happens when you multiply a number by 0? Try ${a} × ${b}.`;
  }
  if (a === 1) {
    return `Times 1 does not change the number. Look at the other number in 1 × ${b}.`;
  }
  if (b === 1) {
    return `Times 1 does not change the number. Look at the other number in ${a} × 1.`;
  }
  if (a === 10 || b === 10) {
    return `Multiplying by 10 adds a zero to the end of the other number. Try ${a} × ${b}.`;
  }

  const groups = a;
  const perGroup = b;
  const addition = Array(groups).fill(String(perGroup)).join(' + ');

  return `${a} × ${b} means ${groups} groups of ${perGroup}: ${addition}. Add them up!`;
}

export function hintBaskets(baskets: number, each: number, item: string): string {
  return hintEqualGroups(baskets, each, item);
}

const PERSON_PLURAL: Record<string, string> = {
  kid: 'kids',
  friend: 'friends',
  child: 'children',
  explorer: 'explorers',
};

export function hintSharing(
  total: number,
  divisor: number,
  items: string,
  eachPerson: string
): string {
  const group = PERSON_PLURAL[eachPerson] ?? `${eachPerson}s`;
  return (
    `${total} ${items} shared equally among ${divisor} ${group} is ${total} ÷ ${divisor}. ` +
    `Ask yourself: ${divisor} × what = ${total}?`
  );
}

export function hintDivision(dividend: number, divisor: number): string {
  return (
    `${dividend} ÷ ${divisor} asks: how many in each group if you split ${dividend} into ${divisor} equal groups? ` +
    `What times ${divisor} equals ${dividend}?`
  );
}
