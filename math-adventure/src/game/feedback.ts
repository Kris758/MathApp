import { pick } from './numbers';

const CORRECT_MESSAGES = [
  'Great job!',
  'Awesome thinking!',
  'You solved it!',
  'Nice work, math explorer!',
  'Stellar answer!',
  'You nailed it!',
  'Brilliant!',
];

const INCORRECT_MESSAGES = [
  'Good try! Let\'s practice one more like this.',
  'Almost! Let\'s break it down together.',
  'Nice effort. Try another one from this level.',
  'Keep going — you\'re learning!',
  'Not quite, but you\'re getting closer!',
];

const LEVEL_UP_MESSAGES = [
  'Level complete! New planet unlocked!',
  'Amazing! You earned a badge!',
  'You conquered this sector!',
  'Onward to the next adventure!',
];

export function getCorrectFeedback(): string {
  return pick(CORRECT_MESSAGES);
}

export function getIncorrectFeedback(): string {
  return pick(INCORRECT_MESSAGES);
}

export function getLevelUpFeedback(): string {
  return pick(LEVEL_UP_MESSAGES);
}
