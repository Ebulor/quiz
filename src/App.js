import "./styles.css";
import Router from "./components/router";
import { useState, useEffect } from "react";
import { context } from "./components/context";

export default function App() {
  const [category, setCategory] = useState("all");
  const [difLevel, setDifLevel] = useState("all");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  return (
    <context.Provider
      value={{
        category,
        setCategory,
        difLevel,
        setDifLevel,
        time,
        setTime,
        startTimer,
        setIsRunning,
        points,
        setPoints
      }}
    >
      <div className="App">
        <Router />
      </div>
    </context.Provider>
  );
}
