// app/quiz/QuizCard.jsx
"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const QuizCard = ({ quiz, onSelect }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/session", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log("user belum login");
      }
    };
    fetchUser();
  }, []);

  const handleLogin = () => {
    router.push(`/login`);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105">
      <h2 className="text-xl font-bold text-red-600">{quiz.title}</h2>
      <p className="text-gray-700 mb-4">{quiz.description}</p>
      {user ? (
        <button
          onClick={() => onSelect(quiz.id)}
          className="w-full py-2 mt-4 text-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Mulai Quiz
        </button>
      ) : (
        <button
          onClick={() => handleLogin()}
          className="w-full py-2 mt-4 text-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Login untuk Memulai Quiz
        </button>
      )}
    </div>
  );
};

export default QuizCard;
