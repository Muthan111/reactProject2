type Props = {
  question: string;
  options: string[];
  currentScore: number;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: () => void;
  onBack: () => void;
};

const Screen1 = ({
  question,
  options,
  currentScore,
  questionNumber,
  totalQuestions,
  onSubmit,
  onBack,
}: Props) => {
  return (
    <section className="quiz-screen">
      <div className="quiz-screen__top">
        <span className="quiz-pill">Question {questionNumber}</span>
        <span className="quiz-pill">Score: {currentScore}</span>
      </div>

      <div className="quiz-card">
        <p className="quiz-card__eyebrow">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2>{question}</h2>

        <div className="quiz-options" aria-label="Answer options">
          {options.map((option, index) => (
            <button key={option} type="button" className="quiz-option">
              <span className="quiz-option__index">{index + 1}</span>
              <span>{option}</span>
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          <button type="button" className="quiz-action quiz-action--secondary" onClick={onBack}>
            Back
          </button>
          <button type="button" className="quiz-action quiz-action--primary" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Screen1;
