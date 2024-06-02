// app/quiz/QuizList.jsx
import React from "react";
import QuizCard from "./QuizCard";

const QuizList = ({ quizzes, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default QuizList;
