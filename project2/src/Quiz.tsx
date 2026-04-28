import { useState } from "react";
import Start, { type Difficulty } from "./start";
import Screen1 from "./screen1";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const quizQuestions: Record<Difficulty, Question[]> = {
  Easy: [
    {
      question: "What is 12 + 8?",
      options: ["18", "20", "22", "24"],
      answer: "20",
    },
    {
      question: "What is 15 - 7?",
      options: ["6", "7", "8", "9"],
      answer: "8",
    },
    {
      question: "What is 6 x 3?",
      options: ["18", "16", "21", "24"],
      answer: "18",
    },
    {
      question: "What is 20 / 4?",
      options: ["4", "5", "6", "8"],
      answer: "5",
    },
    {
      question: "What is 9 + 5?",
      options: ["12", "13", "14", "15"],
      answer: "14",
    },
  ],
  Medium: [
    {
      question: "What is 24 + 17?",
      options: ["39", "40", "41", "42"],
      answer: "41",
    },
    {
      question: "What is 36 / 6 + 4?",
      options: ["8", "9", "10", "12"],
      answer: "10",
    },
    {
      question: "What is 14 x 3?",
      options: ["36", "40", "42", "44"],
      answer: "42",
    },
    {
      question: "What is 50 - 18?",
      options: ["30", "31", "32", "33"],
      answer: "32",
    },
    {
      question: "What is 7 x 8?",
      options: ["54", "56", "58", "64"],
      answer: "56",
    },
  ],
  Hard: [
    {
      question: "What is 18 x 6 - 15?",
      options: ["83", "88", "93", "98"],
      answer: "93",
    },
    {
      question: "What is 144 / 12 + 19?",
      options: ["29", "30", "31", "32"],
      answer: "31",
    },
    {
      question: "What is 25 x 4?",
      options: ["90", "95", "100", "105"],
      answer: "100",
    },
    {
      question: "What is 81 / 9 x 7?",
      options: ["56", "63", "72", "81"],
      answer: "63",
    },
    {
      question: "What is 64 - 27?",
      options: ["35", "36", "37", "38"],
      answer: "37",
    },
  ],
  Expert: [
    {
      question: "What is (18 x 5) - (24 / 3)?",
      options: ["78", "80", "82", "84"],
      answer: "82",
    },
    {
      question: "What is 13 squared?",
      options: ["156", "159", "169", "196"],
      answer: "169",
    },
    {
      question: "What is 144 / 12 + 7 x 6?",
      options: ["48", "52", "54", "60"],
      answer: "54",
    },
    {
      question: "What is 17 x 8 - 29?",
      options: ["97", "103", "107", "111"],
      answer: "107",
    },
    {
      question: "What is (9 x 9) - (7 x 4)?",
      options: ["43", "49", "53", "57"],
      answer: "53",
    },
  ],
};

const Quiz = () => {
  const [stage, setStage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestions = selectedDifficulty ? quizQuestions[selectedDifficulty] : [];
  const activeQuestion = currentQuestions[currentQuestion];

  function startQuiz(difficulty: Difficulty) {
    setSelectedDifficulty(difficulty);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsComplete(false);
    setStage(2);
  }

  function prevStep() {
    if (currentQuestion === 0) {
      setStage(1);
      setSelectedDifficulty(null);
      setSelectedAnswer(null);
      setHasAnswered(false);
      return;
    }

    setCurrentQuestion((prev) => prev - 1);
    setSelectedAnswer(null);
    setHasAnswered(false);
  }

  function handleAnswerSelect(answer: string) {
    if (hasAnswered || !activeQuestion) {
      return;
    }

    setSelectedAnswer(answer);
    setHasAnswered(true);

    const isCorrect = answer === activeQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNextQuestion() {
    if (!hasAnswered || !activeQuestion) {
      return;
    }

    const isLastQuestion = currentQuestion === currentQuestions.length - 1;

    if (isLastQuestion) {
      setIsComplete(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
    setHasAnswered(false);
  }

  function restartQuiz() {
    setStage(1);
    setSelectedDifficulty(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsComplete(false);
  }

  return (
    <div>
      {stage === 1 && <Start startQuiz={startQuiz} />}
      {stage === 2 && activeQuestion && !isComplete && (
        <Screen1
          question={activeQuestion.question}
          options={activeQuestion.options}
          correctAnswer={activeQuestion.answer}
          score={score}
          currentQuestion={currentQuestion}
          totalQuestions={currentQuestions.length}
          selectedAnswer={selectedAnswer}
          hasAnswered={hasAnswered}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNextQuestion}
          onBack={prevStep}
          difficulty={selectedDifficulty ?? "Easy"}
        />
      )}
      {stage === 2 && isComplete && (
        <section className="quiz-screen">
          <div className="quiz-card">
            <p className="quiz-card__eyebrow">{selectedDifficulty} Complete</p>
            <h2>
              You scored {score} out of {currentQuestions.length}
            </h2>
            <div className="quiz-actions">
              <button
                type="button"
                className="quiz-action quiz-action--secondary"
                onClick={restartQuiz}
              >
                Choose Another Level
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Quiz;
