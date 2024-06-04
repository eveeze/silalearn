"use client";
"use client";
import { useState, useEffect } from "react";
import AdminButton from "@/components/adminButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import AdminQuizCard from "@/components/adminQuizCard";
export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const res = await fetch("/api/quiz/index");
    const data = await res.json();
    setQuizzes(data);
  };

  const handleDelete = async (id) => {
    await fetch("/api/admin/quiz/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchQuizzes();
  };

  const handleEdit = (id) => {
    router.push(`/admin/dashboard/quiz/edit-quiz/${id}`);
  };

  return (
    <div className="min-h-dvh w-full mx-auto p-8 space-y-8 max-w-screen-xl">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl mt-4 font-bold">Admin Dashboard</h1>
      </div>
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-3xl font-bold">Kelola Quiz</h2>
        <AdminButton
          onClick={() => router.push("/admin/dashboard/quiz/create-quiz")}
        >
          Buat Quiz
        </AdminButton>
      </div>
      {quizzes.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Player
            src={
              "https://lottie.host/d4157726-f2ee-4dad-82a8-cac1c976b376/gWLWI4eq3y.json"
            }
            className="player w-[400px] h-[400px] "
            autoplay
            loop
          />
          <h1 className="text-4xl font-bold">Quiz Belum Ditambahkan</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <AdminQuizCard
              key={quiz.id}
              quiz={quiz}
              onEdit={() => handleEdit(quiz.id)}
              onDelete={() => handleDelete(quiz.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
