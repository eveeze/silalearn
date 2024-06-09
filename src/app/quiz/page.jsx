// app/quiz/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizList from "./QuizList";
import QuizDetail from "./QuizDetail";
import QuizResults from "./QuizResult";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaClipboardQuestion } from "react-icons/fa6";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

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

  const handleQuizComplete = (result) => {
    setSelectedQuiz(null);
    setQuizResult(result);
  };

  return (
    <div className="w-full min-h-dvh mx-auto space-y-8 bg-merah-100 p-8 max-w-screen-xl mt-16">
      <div className="w-full p-8 border-2 border-merah-300 rounded-xl">
        <div className="flex items-center justify-center gap-4">
          <FaClipboardQuestion className="size-8" />
          <h1 className="text-2xl font-bold text-center">Quiz Rules</h1>
        </div>
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      {quizzes.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Player
            src={
              "https://lottie.host/e4df6ab1-a308-4ca4-b6ba-5a158256a091/YP8eixg78n.json"
            }
            className="player w-[400px] h-[400px]"
            autoplay
            loop
          />
          <h1 className="text-4xl font-bold">Quiz Masih Kosong</h1>
        </div>
      ) : (
        <div className="p-4 min-h-dvh mt-20">
          <div>
            <h1 className="text-2xl font-bold mb-4">Daftar Quiz</h1>
            {quizResult ? (
              <QuizResults result={quizResult} />
            ) : selectedQuiz ? (
              <QuizDetail quiz={selectedQuiz} onComplete={handleQuizComplete} />
            ) : (
              <QuizList quizzes={quizzes} onSelect={handleSelectQuiz} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
