interface Props {
  nextStage: () => void;
}
const Start = ({ nextStage }: Props) => {
  const difficultyLevels = ["Easy", "Medium", "Hard", "Expert"];

  return (
    <div>
      <h1>Math Quiz</h1>
      <p>Choose Quiz Difficulty</p>
      <div>
        {difficultyLevels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={nextStage}
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
  );
};

export default Start;
