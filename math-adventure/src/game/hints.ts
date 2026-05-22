/** Build clear, question-specific hints for a 7-year-old */

function capWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function hintBasicAddition(a: number, b: number): string {
  const bigger = Math.max(a, b);
  const smaller = Math.min(a, b);
  const steps: number[] = [];
  for (let i = 1; i <= smaller; i++) {
    steps.push(bigger + i);
  }
  const counting =
    steps.length <= 6
      ? `Count up from ${bigger}: ${steps.join(', ')}.`
      : `Count up ${smaller} steps from ${bigger}.`;
  return `${a} + ${b}: ${counting} The answer is ${a + b}.`;
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
      `Now put them together: ${tensSum} + ${onesSum} = ${a + b}.`
    );
  }

  return (
    `${capWord(wordA)} = ${a} and ${capWord(wordB)} = ${b}. ` +
    `Now add the numbers: ${a} + ${b} = ${a + b}.`
  );
}

export function hintTwoDigitAddition(a: number, b: number): string {
  const tensA = Math.floor(a / 10);
  const onesA = a % 10;
  const tensB = Math.floor(b / 10);
  const onesB = b % 10;
  const onesSum = onesA + onesB;
  const answer = a + b;

  if (onesSum >= 10) {
    const carried = Math.floor(onesSum / 10);
    const onesResult = onesSum % 10;
    const tensTotal = tensA + tensB + carried;
    return (
      `Break ${a} into ${tensA} tens and ${onesA} ones. Break ${b} into ${tensB} tens and ${onesB} ones. ` +
      `Ones: ${onesA} + ${onesB} = ${onesSum}. That is 1 ten and ${onesResult} ones (carry the 1). ` +
      `Tens: ${tensA} + ${tensB} + 1 = ${tensTotal}. Answer: ${tensTotal}${onesResult} = ${answer}.`
    );
  }

  const tensTotal = tensA + tensB;
  return (
    `Add the tens: ${tensA}0 + ${tensB}0 = ${tensTotal}0. ` +
    `Add the ones: ${onesA} + ${onesB} = ${onesSum}. ` +
    `Put them together: ${tensTotal}0 + ${onesSum} = ${answer}.`
  );
}

export function hintEqualGroups(
  groups: number,
  each: number,
  itemLabel: string
): string {
  const parts = Array(groups).fill(String(each)).join(' + ');
  const answer = groups * each;
  return (
    `${groups} groups of ${each} ${itemLabel} means ${parts}. ` +
    `That is ${each} × ${groups} = ${answer}.`
  );
}

export function hintRepeatedAddition(n: number, times: number): string {
  const parts = Array(times).fill(String(n)).join(' + ');
  const answer = n * times;
  return `You are adding ${n} a total of ${times} times: ${parts} = ${answer}.`;
}

export function hintGroupsShort(groups: number, each: number): string {
  const parts = Array(groups).fill(String(each)).join(' + ');
  return `${groups} groups of ${each} means ${parts} = ${groups * each}.`;
}

export function hintMultiply(a: number, b: number): string {
  const answer = a * b;
  if (a === 0 || b === 0) return `Any number times 0 is 0. So ${a} × ${b} = 0.`;
  if (a === 1) return `Times 1 means the number stays the same: 1 × ${b} = ${b}.`;
  if (b === 1) return `Times 1 means the number stays the same: ${a} × 1 = ${a}.`;
  if (a === 10) return `${b} × 10 = ${b} with a zero on the end = ${answer}.`;
  if (b === 10) return `${a} × 10 = ${a} with a zero on the end = ${answer}.`;

  const groups = a;
  const perGroup = b;
  const addition = Array(groups).fill(String(perGroup)).join(' + ');

  return (
    `${a} × ${b} means ${groups} groups of ${perGroup}: ${addition} = ${answer}.`
  );
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
  const answer = total / divisor;
  const group = PERSON_PLURAL[eachPerson] ?? `${eachPerson}s`;
  return (
    `${total} ${items} shared equally among ${divisor} ${group} is ${total} ÷ ${divisor}. ` +
    `Ask yourself: ${divisor} × what = ${total}? Since ${divisor} × ${answer} = ${total}, each ${eachPerson} gets ${answer}.`
  );
}

export function hintDivision(dividend: number, divisor: number): string {
  const answer = dividend / divisor;
  return (
    `${dividend} ÷ ${divisor} asks: how many in each group if you split ${dividend} into ${divisor} equal groups? ` +
    `What times ${divisor} equals ${dividend}? ${divisor} × ${answer} = ${dividend}, so the answer is ${answer}.`
  );
}
