import { useState } from "react";
import Start from "./start";
import Screen1 from "./screen1";

const Quiz = () => {
  const [stage, setStage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      {stage === 2 && <Screen1 onSubmit={handleSubmit} onBack={prevStep} />}
      {isSubmitted && <p>Submitted successfully.</p>}
    </div>
  );
};

export default Quiz;
