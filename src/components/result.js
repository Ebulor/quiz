import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { context } from "./context";

const Result = () => {
  const quizData = useContext(context);
  const time = quizData.time;
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  let finalPoint = 0;
  for (let i = 0; i < quizData.points.length; i++) {
    finalPoint += quizData.points[i];
  }
  const reset = () => {
    quizData.setTime(0);
    quizData.setPoints([]);
    quizData.setCategory("all");
    quizData.setDifLevel("all");
  };
  return (
    <div>
      <p>Your score is : {finalPoint}</p>
      <p>
        Time spent - {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>

      <NavLink className="link" to="/" onClick={reset}>
        Start quiz again!
      </NavLink>
    </div>
  );
};
export default Result;
