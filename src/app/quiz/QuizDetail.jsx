// app/quiz/QuizDetail.jsx
import React, { useState } from "react";
import axios from "axios";

const QuizDetail = ({ quiz, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("/api/quiz/submit", {
      quizId: quiz.id,
      answers,
    });
    setScore(result.data.score);
    onComplete();
  };

  if (score !== null) {
    return (
      <div className="p-4 bg-white shadow-md rounded">Your score: {score}</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      {quiz.questions.map((question) => (
        <div key={question.id} className="mb-4">
          <h3 className="text-lg font-bold">{question.content}</h3>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={index}
                checked={answers[question.id] === index}
                onChange={() => handleOptionChange(question.id, index)}
                className="mr-2"
              />
              <span>{option.content}</span>
            </div>
          ))}
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

export default QuizDetail;
