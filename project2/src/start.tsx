interface Props {
  startQuiz: (difficulty: Difficulty) => void;
}
export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

const Start = ({ startQuiz }: Props) => {
  // Keeping the levels in an array makes the difficulty buttons easy to render and update together.
  const difficultyLevels: Difficulty[] = ["Easy", "Medium", "Hard", "Expert"];

  return (
    <section className="quiz-screen">
      <div className="quiz-card">
        <p className="quiz-card__eyebrow">Math Quiz</p>
        <h1>Choose Quiz Difficulty</h1>
        <p>Each difficulty starts with 5 questions, and continuing adds more.</p>
      <div>
        {difficultyLevels.map((level) => (
          <button
            key={level}
            type="button"
            className="quiz-action quiz-action--primary"
            onClick={() => startQuiz(level)}
            style={{
              margin: "0.5rem",
              padding: "0.75rem 1.5rem",
              cursor: "pointer",
            }}
          >
            {level}
          </button>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Start;
