import { useContext, useEffect, useState } from "react";
import { context } from "./context";
import Question from "./question";

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [index, setIndex] = useState(0);
  const quizData = useContext(context);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const increaseIndex = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    setIsLoading(true);

    const cat = quizData.category;
    const difLevel = quizData.difLevel;
    let src = "";
    if (difLevel === "all" && cat === "all") {
      src = " https://opentdb.com/api.php?amount=10&";
    } else if (difLevel === "all") {
      src = `https://opentdb.com/api.php?category=${cat}&amount=10&`;
    } else if (cat === "all") {
      src = `https://opentdb.com/api.php?difficulty=${difLevel}&amount=10&`;
    } else {
      src = `https://opentdb.com/api.php?difficulty=${difLevel}&category=${cat}&amount=10&`;
    }
    fetch(`${src}`)
      .then((result) => result.json())
      .then((result) => {
        setQuestions(result.results);
        setCurrentQuestion(result.results[index]);
        setAnswers([
          ...result.results[index].incorrect_answers,
          result.results[index].correct_answer
        ]);
        setCorrectAnswer(result.results[index].correct_answer);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [index, setErrorMessage]);

  return (
    <div>
      {currentQuestion && (
        <Question
          src={questions}
          answers={answers}
          data={currentQuestion}
          handleClick={increaseIndex}
          answer={correctAnswer}
          questionIndex={index}
        />
      )}
    </div>
  );
};
export default Quiz;
