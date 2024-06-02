// app/quiz/QuizCard.jsx
import React from "react";

const QuizCard = ({ quiz, onSelect }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105">
      <h2 className="text-xl font-bold text-red-600">{quiz.title}</h2>
      <p className="text-gray-700 mb-4">{quiz.description}</p>
      <button
        onClick={() => onSelect(quiz.id)}
        className="w-full py-2 mt-4 text-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
      >
        Mulai Quiz
      </button>
    </div>
  );
};

export default QuizCard;
