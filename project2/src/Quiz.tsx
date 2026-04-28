import { useState } from "react";
import Start from "./start";
import Screen1 from "./screen1";

const quizQuestions = [
  {
    question: "What is 12 + 8?",
    options: ["18", "20", "22", "24"],
  },
];

const Quiz = () => {
  const [stage, setStage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score] = useState(0);

  const currentQuestion = quizQuestions[0];

  function nextStep() {
    setStage((prev) => prev + 1);
  }

  function prevStep() {
    setStage((prev) => prev - 1);
  }

  function handleSubmit() {
    setIsSubmitted(true);
  }

  return (
    <div>
      {stage === 1 && <Start nextStage={nextStep} />}
      {stage === 2 && (
        <Screen1
          question={currentQuestion.question}
          options={currentQuestion.options}
          currentScore={score}
          questionNumber={1}
          totalQuestions={quizQuestions.length}
          onSubmit={handleSubmit}
          onBack={prevStep}
        />
      )}
      {isSubmitted && <p>Submitted successfully.</p>}
    </div>
  );
};

export default Quiz;
