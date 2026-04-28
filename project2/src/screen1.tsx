type Props = {
  question: string;
  options: string[];
  correctAnswer: string;
  score: number;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  hasAnswered: boolean;
  onAnswerSelect: (option: string) => void;
  onNext: () => void;
  onBack: () => void;
  difficulty: string;
};

const Screen1 = ({
  question,
  options,
  correctAnswer,
  score,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  hasAnswered,
  onAnswerSelect,
  onNext,
  onBack,
  difficulty,
}: Props) => {
  const questionNumber = currentQuestion + 1;

  function getOptionClassName(option: string) {
    if (!hasAnswered) {
      return `quiz-option${selectedAnswer === option ? " quiz-option--selected" : ""}`;
    }

    if (option === correctAnswer) {
      return "quiz-option quiz-option--correct";
    }

    if (option === selectedAnswer && option !== correctAnswer) {
      return "quiz-option quiz-option--wrong";
    }

    return "quiz-option quiz-option--locked";
  }

  return (
    <section className="quiz-screen">
      <div className="quiz-screen__top">
        <span className="quiz-pill">{difficulty}</span>
        <span className="quiz-pill">Question {questionNumber}</span>
        <span className="quiz-pill">Score: {score}</span>
      </div>

      <div className="quiz-card">
        <p className="quiz-card__eyebrow">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2>{question}</h2>

        <div className="quiz-options" aria-label="Answer options">
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              className={getOptionClassName(option)}
              onClick={() => onAnswerSelect(option)}
              disabled={hasAnswered}
            >
              <span className="quiz-option__index">{index + 1}</span>
              <span>{option}</span>
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          <button type="button" className="quiz-action quiz-action--secondary" onClick={onBack}>
            Back
          </button>
          {hasAnswered && (
            <button type="button" className="quiz-action quiz-action--primary" onClick={onNext}>
              {questionNumber === totalQuestions ? "Finish" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Screen1;
