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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Content</label>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="REGULAR">Regular</option>
          <option value="HOTS">HOTS</option>
        </select>
      </div>
      {options.map((option, index) => (
        <div key={index}>
          <label>Option Content</label>
          <input
            value={option.content}
            onChange={(e) =>
              handleOptionChange(index, "content", e.target.value)
            }
          />
          <label>Is Correct</label>
          <input
            type="checkbox"
            checked={option.isCorrect}
            onChange={(e) =>
              handleOptionChange(index, "isCorrect", e.target.checked)
            }
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
