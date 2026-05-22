import type { FeedbackType, Question } from '../game/types';
import { NumericKeypad } from './NumericKeypad';

interface QuestionAreaProps {
  question: Question;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  feedback: string;
  hint: string;
  feedbackType: FeedbackType;
  shake: boolean;
  pulse: boolean;
  disabled: boolean;
}

export function QuestionArea({
  question,
  input,
  onInputChange,
  onSubmit,
  feedback,
  hint,
  feedbackType,
  shake,
  pulse,
  disabled,
}: QuestionAreaProps) {
  const displayValue = input || '—';

  return (
    <section className={`question-area ${shake ? 'shake' : ''} ${pulse ? 'pulse' : ''}`}>
      <div className="question-card">
        <p className="question-label">Solve this:</p>
        <h2 className="question-prompt">{question.prompt}</h2>

        <div className="answer-section">
          <div
            className="answer-display"
            role="status"
            aria-live="polite"
            aria-label={input ? `Your answer: ${input}` : 'Your answer, empty'}
          >
            <span className="answer-display-value">{displayValue}</span>
            {!input && (
              <span className="answer-display-hint">Use the keypad below</span>
            )}
          </div>

          <NumericKeypad
            value={input}
            onChange={onInputChange}
            onSubmit={onSubmit}
            disabled={disabled}
          />
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
