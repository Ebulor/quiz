import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Quiz from "./quiz";
import Result from "./result";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
};
export default Router;
