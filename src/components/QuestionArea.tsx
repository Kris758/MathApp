import { useRef } from 'react';
import type { FeedbackType, Question } from '../game/types';

interface QuestionAreaProps {
  question: Question;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  feedback: string;
  hint: string;
  feedbackType: FeedbackType;
  shake: boolean;
  pulse: boolean;
  disabled: boolean;
}

/** Keep only digits so the numeric keyboard works cleanly on iPad */
function sanitizeNumericInput(value: string): string {
  return value.replace(/\D/g, '');
}

export function QuestionArea({
  question,
  input,
  onInputChange,
  onSubmit,
  onKeyDown,
  feedback,
  hint,
  feedbackType,
  shake,
  pulse,
  disabled,
}: QuestionAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    // Keep the answer box visible when the iPad keyboard opens
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  return (
    <section className={`question-area ${shake ? 'shake' : ''} ${pulse ? 'pulse' : ''}`}>
      <div className="question-card">
        <p className="question-label">Solve this:</p>
        <h2 className="question-prompt">{question.prompt}</h2>

        <div className="answer-row">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            enterKeyHint="go"
            className="answer-input"
            value={input}
            onChange={(e) => onInputChange(sanitizeNumericInput(e.target.value))}
            onKeyDown={onKeyDown}
            onFocus={handleFocus}
            placeholder="Tap to type your answer"
            disabled={disabled}
            aria-label="Your answer"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button
            type="button"
            className="submit-btn"
            onClick={onSubmit}
            disabled={disabled}
          >
            Check Answer
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`feedback ${feedbackType ?? ''}`}
          role="status"
          aria-live="polite"
        >
          {feedbackType === 'correct' && <span className="feedback-icon">✨</span>}
          {feedbackType === 'incorrect' && <span className="feedback-icon">💫</span>}
          {feedbackType === 'levelUp' && <span className="feedback-icon">🎉</span>}
          <p>{feedback}</p>
        </div>
      )}

      {hint && (
        <div className="hint-box" role="note">
          <span className="hint-label">Hint</span>
          <p>{hint}</p>
        </div>
      )}
    </section>
  );
}
