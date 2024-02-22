import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { context } from "./context";
const Home = () => {
  const [list, setList] = useState([]);
  const data = useContext(context);
  const [options, setOptions] = useState([]);
  const [pickedOption, setpickedOption] = useState(data.category);
  const [difficulty, setDifficulty] = useState(data.difLevel);
  const getData = async () => {
    let data = fetch("https://opentdb.com/api_category.php");
    Promise.all([data])
      .then(async (response) => {
        const res = await response[0].json();
        Object.keys(res).forEach(function (key) {
          list.push(res[key]);
        });
        const result = list[1];
        setOptions(result);
      })
      .catch((err) => console.log(err));
  };
  const handleSelectOption = (e) => {
    setpickedOption(e.target.value);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const startQuiz = () => {
    data.setCategory(pickedOption);
    data.setDifLevel(difficulty);
    data.startTimer();
  };

  useEffect(() => {
    getData();
  });
  return (
    <div>
      <div>
        <p>Difficulty</p>
        <select value={difficulty} onChange={handleDifficulty}>
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <p>Category</p>
        <select value={pickedOption} onChange={handleSelectOption}>
          <option value="all">All</option>
          {options &&
            options.map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              );
            })}
        </select>
      </div>

      <NavLink className="link" to="/quiz" onClick={startQuiz}>
        Start quiz
      </NavLink>
    </div>
  );
};
export default Home;
