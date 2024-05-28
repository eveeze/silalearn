import React, { useState } from "react";

const QuestionForm = ({ question, onSubmit }) => {
  const [content, setContent] = useState(question ? question.content : "");
  const [type, setType] = useState(question ? question.type : "REGULAR");
  const [options, setOptions] = useState(
    question
      ? question.options
      : [
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
        ]
  );

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      content,
      type,
      options,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700">
          Content
        </label>
        <input
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="REGULAR">Regular</option>
          <option value="HOTS">HOTS</option>
        </select>
      </div>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mt-2">
          <input
            type="text"
            value={option.content}
            onChange={(e) =>
              handleOptionChange(index, "content", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label className="ml-2 text-gray-700">Correct</label>
          <input
            type="checkbox"
            checked={option.isCorrect}
            onChange={(e) =>
              handleOptionChange(index, "isCorrect", e.target.checked)
            }
            className="ml-2"
          />
        </div>
      ))}
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default QuestionForm;
