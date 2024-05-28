import React, { useState, useEffect } from "react";

const QuizForm = ({ quiz, onSubmit }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
    } else {
      setTitle("");
    }
  }, [quiz]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...quiz, title });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        {quiz ? "Update Quiz" : "Create Quiz"}
      </button>
    </form>
  );
};

export default QuizForm;
