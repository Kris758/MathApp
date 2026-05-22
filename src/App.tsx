import { BadgeDisplay } from './components/BadgeDisplay';
import { Celebration } from './components/Celebration';
import { CompletionScreen } from './components/CompletionScreen';
import { LevelHeader } from './components/LevelHeader';
import { QuestionArea } from './components/QuestionArea';
import { Starfield } from './components/Starfield';
import { StatsPanel } from './components/StatsPanel';
import { useGameState } from './game/useGameState';
import './App.css';

function App() {
  const {
    stats,
    question,
    input,
    setInput,
    feedback,
    hint,
    feedbackType,
    levelConfig,
    submitAnswer,
    resetGame,
    showCelebration,
    shake,
    pulse,
    isProcessing,
    sessionInfo,
  } = useGameState();

  const totalScore = stats.totalCorrect * 10 + stats.stars * 5;

  if (stats.completed) {
    return (
      <div className="app">
        <Starfield />
        <CompletionScreen stats={stats} onPlayAgain={resetGame} />
      </div>
    );
  }

  return (
    <div className="app">
      <Starfield />
      <Celebration show={showCelebration} />

      <div className="game-container">
        <header className="game-title-bar">
          <div className="title-group">
            <span className="rocket-icon" aria-hidden="true">
              🚀
            </span>
            <div>
              <h1 className="game-title">Math Adventure</h1>
              <p className="game-subtitle">Space Quest — Explore the Math Galaxy</p>
            </div>
          </div>
          <StatsPanel stats={stats} totalScore={totalScore} />
        </header>

        <main className="game-main">
          <LevelHeader
            level={levelConfig}
            levelCorrect={stats.levelCorrect}
            currentLevelNum={stats.currentLevel}
            sessionInfo={sessionInfo}
          />

          <QuestionArea
            question={question}
            input={input}
            onInputChange={setInput}
            onSubmit={submitAnswer}
            feedback={feedback}
            hint={hint}
            feedbackType={feedbackType}
            shake={shake}
            pulse={pulse}
            disabled={isProcessing}
          />

          <div className="tracker-row">
            <div className="tracker-card">
              <span className="tracker-label">Level correct</span>
              <span className="tracker-value">{stats.levelCorrect}</span>
            </div>
            <div className="tracker-card">
              <span className="tracker-label">Total correct</span>
              <span className="tracker-value success">{stats.totalCorrect}</span>
            </div>
            <div className="tracker-card">
              <span className="tracker-label">Total incorrect</span>
              <span className="tracker-value muted">{stats.totalIncorrect}</span>
            </div>
            <div className="tracker-card">
              <span className="tracker-label">Questions</span>
              <span className="tracker-value">{stats.totalQuestions}</span>
            </div>
          </div>

          <BadgeDisplay earnedBadges={stats.badges} />
        </main>

        <footer className="game-footer">
          <p>Use the on-screen keypad to enter your answer and continue your space quest!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
