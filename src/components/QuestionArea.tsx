import { parseStackedMath } from '../game/parseStackedMath';
import type { FeedbackType, Question } from '../game/types';
import { NumericKeypad } from './NumericKeypad';
import { StackedMath } from './StackedMath';

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
  const stacked = parseStackedMath(question.prompt);
  const displayValue = input || '—';

  return (
    <section className={`question-area ${shake ? 'shake' : ''} ${pulse ? 'pulse' : ''}`}>
      <div className="question-card">
        <p className="question-label">Solve this:</p>

        <div className="question-workspace">
          <div className="problem-panel">
            {stacked ? (
              <StackedMath
                operator={stacked.operator}
                operands={stacked.operands}
                answer={input}
              />
            ) : (
              <>
                <h2 className="question-prompt">{question.prompt}</h2>
                <div
                  className="answer-display"
                  role="status"
                  aria-live="polite"
                  aria-label={input ? `Your answer: ${input}` : 'Your answer, empty'}
                >
                  <span className="answer-display-value">{displayValue}</span>
                  {!input && (
                    <span className="answer-display-hint">Use the keypad</span>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="keypad-panel">
            <NumericKeypad
              value={input}
              onChange={onInputChange}
              onSubmit={onSubmit}
              disabled={disabled}
            />
          </div>
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
