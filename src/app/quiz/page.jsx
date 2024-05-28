// app/quiz/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizList from "./QuizList";
import QuizDetail from "./QuizDetail";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data } = await axios.get("/api/quiz");
      setQuizzes(data);
    };
    fetchQuizzes();
  }, []);

  const handleSelectQuiz = async (id) => {
    const { data } = await axios.get(`/api/quiz/${id}`);
    setSelectedQuiz(data);
  };

  const handleQuizComplete = () => {
    setSelectedQuiz(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
      {selectedQuiz ? (
        <QuizDetail quiz={selectedQuiz} onComplete={handleQuizComplete} />
      ) : (
        <QuizList quizzes={quizzes} onSelect={handleSelectQuiz} />
      )}
    </div>
  );
};

export default QuizzesPage;
