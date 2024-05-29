// app/quiz/QuizList.jsx
import React from "react";

const QuizList = ({ quizzes, onSelect }) => {
  return (
    <div className="mt-4">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="p-4 mb-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-bold">{quiz.title}</h2>
          <p>{quiz.description}</p>
          <button
            onClick={() => onSelect(quiz.id)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
