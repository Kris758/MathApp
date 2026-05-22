import type { Question } from './types';
import {
  hintBasicAddition,
  hintBaskets,
  hintDivision,
  hintEqualGroups,
  hintGroupsShort,
  hintMultiply,
  hintRepeatedAddition,
  hintSharing,
  hintTwoDigitAddition,
  hintWordAddition,
} from './hints';
import { pick, randInt, randomWordNumber, uid } from './numbers';

// Level 1: Basic addition
function generateLevel1(): Question {
  const a = randInt(1, 15);
  const b = randInt(1, 12);
  return {
    id: uid(),
    prompt: `${a} + ${b}`,
    answer: a + b,
    hint: hintBasicAddition(a, b),
  };
}

// Level 2: Worded addition
function generateLevel2(): Question {
  const a = randomWordNumber(10, 70);
  const b = randomWordNumber(10, 70);
  return {
    id: uid(),
    prompt: `${a.text} + ${b.text}`,
    answer: a.value + b.value,
    hint: hintWordAddition(a.text, b.text, a.value, b.value),
  };
}

// Level 3: Two-digit addition
function generateLevel3(): Question {
  const a = randInt(25, 85);
  const b = randInt(15, 45);
  return {
    id: uid(),
    prompt: `${a} + ${b}`,
    answer: a + b,
    hint: hintTwoDigitAddition(a, b),
  };
}

// Level 4: Multiplication concepts
type MultConcept = () => Question;

const multConceptGenerators: MultConcept[] = [
  () => {
    const groups = randInt(2, 5);
    const each = randInt(2, 6);
    const items = pick(['apples', 'stars', 'rocks', 'gems', 'orbs']);
    return {
      id: uid(),
      prompt: `${groups} groups of ${each} ${items} equals how many ${items}?`,
      answer: groups * each,
      hint: hintEqualGroups(groups, each, items),
    };
  },
  () => {
    const n = randInt(2, 5);
    const times = randInt(2, 4);
    const sum = n * times;
    const parts = Array(times).fill(String(n)).join(' + ');
    return {
      id: uid(),
      prompt: parts,
      answer: sum,
      hint: hintRepeatedAddition(n, times),
    };
  },
  () => {
    const groups = randInt(2, 6);
    const each = randInt(2, 5);
    return {
      id: uid(),
      prompt: `${groups} groups of ${each}`,
      answer: groups * each,
      hint: hintGroupsShort(groups, each),
    };
  },
  () => {
    const a = randInt(2, 5);
    const b = randInt(2, 5);
    return {
      id: uid(),
      prompt: `${a} × ${b}`,
      answer: a * b,
      hint: hintMultiply(a, b),
    };
  },
  () => {
    const baskets = randInt(2, 5);
    const each = randInt(3, 6);
    const fruit = pick(['oranges', 'apples', 'berries', 'planets']);
    return {
      id: uid(),
      prompt: `If there are ${baskets} baskets with ${each} ${fruit} in each basket, how many ${fruit} are there?`,
      answer: baskets * each,
      hint: hintBaskets(baskets, each, fruit),
    };
  },
];

function generateLevel4(): Question {
  return pick(multConceptGenerators)();
}

// Level 5: Multiplication facts
function generateLevel5(): Question {
  const factors = [0, 1, 2, 3, 4, 5, 6, 10];
  const a = pick(factors);
  const b = pick([...factors.filter((f) => f <= 6), 2, 3, 4, 5]);
  return {
    id: uid(),
    prompt: `${a} × ${b}`,
    answer: a * b,
    hint: hintMultiply(a, b),
  };
}

// Level 6: Division as sharing
function generateLevel6(): Question {
  const divisor = pick([2, 3, 4, 5]);
  const quotient = randInt(2, 6);
  const total = divisor * quotient;
  const items = pick(['cookies', 'toys', 'candies', 'apples', 'stars', 'gems']);
  const scenarios = [
    { people: 'kids', each: 'kid' },
    { people: 'friends', each: 'friend' },
    { people: 'children', each: 'child' },
    { people: 'explorers', each: 'explorer' },
  ];
  const { people, each } = pick(scenarios);
  return {
    id: uid(),
    prompt: `${total} ${items} are shared equally by ${divisor} ${people}. How many ${items} does each ${each} get?`,
    answer: quotient,
    hint: hintSharing(total, divisor, items, each),
  };
}

// Level 7: Division facts
function generateLevel7(): Question {
  const divisor = pick([2, 3, 4, 5, 10]);
  const quotient = randInt(2, 8);
  const dividend = divisor * quotient;
  return {
    id: uid(),
    prompt: `${dividend} ÷ ${divisor}`,
    answer: quotient,
    hint: hintDivision(dividend, divisor),
  };
}

const generators: Record<number, () => Question> = {
  1: generateLevel1,
  2: generateLevel2,
  3: generateLevel3,
  4: generateLevel4,
  5: generateLevel5,
  6: generateLevel6,
  7: generateLevel7,
};

export function generateQuestion(levelId: number): Question {
  const gen = generators[levelId] ?? generateLevel1;
  return gen();
}
