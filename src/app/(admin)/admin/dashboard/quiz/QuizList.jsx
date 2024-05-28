// admin/dashboard/quiz/QuizList.jsx
import React from "react";

const QuizList = ({ quizzes, onSelect, onEdit, onDelete }) => {
  return (
    <div className="mt-4">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="p-4 mb-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-bold">{quiz.title}</h2>
          <p>{quiz.description}</p>
          <button
            onClick={() => onSelect(quiz)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            View Questions
          </button>
          <button
            onClick={() => onEdit(quiz)}
            className="mt-2 ml-2 px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(quiz.id)}
            className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
