import { useState, useEffect, useContext } from "react";
import { context } from "./context";
import { useNavigate } from "react-router-dom";
function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
const Question = ({
  questionIndex,
  src,
  data,
  handleClick,
  answers,
  answer
}) => {
  const [randomArray, setRandomArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const dcontext = useContext(context);

  const selected = (value) => {
    setActiveIndex(value);
    setSelectedAnswer(answers[value]);
  };
  let score = 0;
  let navigate = useNavigate();
  const nav = () => {
    let path = `/result`;
    navigate(path);
  };

  const resetActiveIndex = () => {
    setActiveIndex(-1);
    setSelectedAnswer(null);
    if (selectedAnswer === answer) {
      score = 1;
      dcontext.points.push(score);
    }
    if (questionIndex === src.length - 1) {
      dcontext.setIsRunning(false);
      nav();
    }
  };

  useEffect(() => {
    setRandomArray(shuffleArray(answers));
  }, [data]);
  return (
    <div>
      <p>{questionIndex + 1}</p>
      <p className="question">{data.question}</p>
      <div className="answers">
        {randomArray.map((el, index) => (
          <p
            className={
              index === activeIndex ? "answer selectedAnswer" : "answer"
            }
            key={index}
            onClick={() => selected(index)}
          >
            <span>{el}</span>
          </p>
        ))}

        <button
          disabled={!selectedAnswer}
          onClick={() => {
            resetActiveIndex();
            handleClick();
          }}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};
export default Question;
