// app/quiz/QuestionCard.jsx
import React from "react";

const QuestionCard = ({ question, onOptionChange, selectedOption }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md transform transition duration-300">
      <h3 className="text-lg font-bold text-red-600">{question.content}</h3>
      <div className="mt-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onOptionChange(question.id, index)}
            className={`w-full p-4 mt-2 text-left rounded-lg transition duration-200 ${
              selectedOption === index
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"
            }`}
          >
            {option.content}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
