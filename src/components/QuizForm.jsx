import React, { useState } from "react";
import axios from "axios";

const QuizForm = ({ quiz, onSubmit }) => {
  const [title, setTitle] = useState(quiz ? quiz.title : "");
  const [description, setDescription] = useState(quiz ? quiz.description : "");
  const [questions, setQuestions] = useState(quiz ? quiz.questions : []);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        content: "",
        type: "REGULAR",
        options: [
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
        ],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ title, description, questions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {questions.map((q, qIndex) => (
        <div key={qIndex}>
          <label>Question Content</label>
          <input
            value={q.content}
            onChange={(e) =>
              handleQuestionChange(qIndex, "content", e.target.value)
            }
          />
          <label>Type</label>
          <select
            value={q.type}
            onChange={(e) =>
              handleQuestionChange(qIndex, "type", e.target.value)
            }
          >
            <option value="REGULAR">Regular</option>
            <option value="HOTS">HOTS</option>
          </select>
          {q.options.map((o, oIndex) => (
            <div key={oIndex}>
              <label>Option Content</label>
              <input
                value={o.content}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, "content", e.target.value)
                }
              />
              <label>Is Correct</label>
              <input
                type="checkbox"
                checked={o.isCorrect}
                onChange={(e) =>
                  handleOptionChange(
                    qIndex,
                    oIndex,
                    "isCorrect",
                    e.target.checked
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizForm;
