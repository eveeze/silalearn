// app/quiz/QuizDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { formatTime } from "@/utils/formatTime";

const QuizDetail = ({ quiz, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(quiz.questions));
  }, [quiz.questions]);

  useEffect(() => {
    startTimer();
    return () => stopTimer(); // Clean up the timer on component unmount
  }, []);

  const startTimer = () => {
    if (!timerRef.current) {
      // Check if the timer is already running
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    stopTimer(); // Stop the timer when submitting the quiz

    const token = localStorage.getItem("authToken");

    try {
      const result = await axios.post(
        "/api/quiz/submit",
        {
          quizId: quiz.id,
          answers: Object.entries(answers).map(([questionId, optionIndex]) => ({
            questionId: parseInt(questionId),
            optionId: quiz.questions.find((q) => q.id === parseInt(questionId))
              .options[optionIndex].id,
            startedAt: new Date(),
          })),
          duration: time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onComplete({ ...result.data, quizId: quiz.id });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <span className="font-bold">Time: {formatTime(time)}</span>
      </div>
      {currentQuestion ? (
        <TransitionGroup>
          <CSSTransition
            key={currentQuestion.id}
            timeout={300}
            classNames="question"
          >
            <QuestionCard
              question={currentQuestion}
              onOptionChange={handleOptionChange}
              selectedOption={answers[currentQuestion.id]}
            />
          </CSSTransition>
        </TransitionGroup>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={handleNextQuestion}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        {currentQuestionIndex < shuffledQuestions.length - 1
          ? "Next Question"
          : "Submit"}
      </button>
    </div>
  );
};

export default QuizDetail;
