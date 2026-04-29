import { useState } from "react";
import Start, { type Difficulty } from "./start";
import Screen1 from "./screen1";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const INITIAL_QUESTION_COUNT = 5;
const QUESTION_COUNT_INCREMENT = 1;

// Questions are grouped by difficulty so the selected level can directly drive the quiz flow.
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

function shuffleQuestions(questions: Question[]) {
  const shuffledQuestions = [...questions];

  for (let index = shuffledQuestions.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledQuestions[index], shuffledQuestions[swapIndex]] = [
      shuffledQuestions[swapIndex],
      shuffledQuestions[index],
    ];
  }

  return shuffledQuestions;
}

function buildRoundQuestions(difficulty: Difficulty, questionCount: number) {
  const difficultyQuestions = quizQuestions[difficulty];
  const roundQuestions: Question[] = [];

  while (roundQuestions.length < questionCount) {
    roundQuestions.push(...shuffleQuestions(difficultyQuestions));
  }

  return roundQuestions.slice(0, questionCount);
}

const Quiz = () => {
  // `stage` controls whether we show the difficulty picker or the quiz/results screen.
  const [stage, setStage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [questionCount, setQuestionCount] = useState(INITIAL_QUESTION_COUNT);
  const [completedQuestionCount, setCompletedQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const activeQuestion = currentQuestions[currentQuestion];

  function startQuiz(
    difficulty: Difficulty,
    preservedScore = 0,
    nextQuestionCount = INITIAL_QUESTION_COUNT,
    preservedCompletedQuestionCount = 0
  ) {
    // Starting a new quiz resets question progress, but callers can preserve score for same-difficulty replays.
    setSelectedDifficulty(difficulty);
    setCurrentQuestions(buildRoundQuestions(difficulty, nextQuestionCount));
    setQuestionCount(nextQuestionCount);
    setCompletedQuestionCount(preservedCompletedQuestionCount);
    setCurrentQuestion(0);
    setScore(preservedScore);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsComplete(false);
    setStage(2);
  }

  function prevStep() {
    // If we're on the first question, "Back" returns to difficulty selection instead of going negative.
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
    // Lock the question after one choice so score changes only once per question.
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

    // The last answered question transitions to the results view instead of another question.
    const isLastQuestion = currentQuestion === currentQuestions.length - 1;

    if (isLastQuestion) {
      setIsComplete(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
    setHasAnswered(false);
  }

  function restartSameDifficulty() {
    if (!selectedDifficulty) {
      return;
    }

    startQuiz(
      selectedDifficulty,
      score,
      questionCount + QUESTION_COUNT_INCREMENT,
      completedQuestionCount + currentQuestions.length
    );
  }

  function restartQuiz() {
    // Returning to the start screen clears all quiz-specific state.
    setStage(1);
    setSelectedDifficulty(null);
    setCurrentQuestions([]);
    setQuestionCount(INITIAL_QUESTION_COUNT);
    setCompletedQuestionCount(0);
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
              You scored {score} out of {completedQuestionCount + currentQuestions.length}
            </h2>
            <div className="quiz-actions">
              <button
                type="button"
                className="quiz-action quiz-action--primary"
                onClick={restartSameDifficulty}
              >
                Continue Same Difficulty
              </button>
              <button
                type="button"
                className="quiz-action quiz-action--secondary"
                onClick={restartQuiz}
              >
                Restart Entire Game
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Quiz;
