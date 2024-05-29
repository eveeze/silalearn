import React from "react";

const QuestionList = ({ questions, onEditQuestion }) => {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium">{question.text}</h3>
          <button
            onClick={() => onEditQuestion(question)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
