"use client";
import { useState, useEffect } from "react";
import AdminButton from "@/components/adminButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchQuizzes();
  };

  return (
    <div className="min-h-dvh w-full mx-auto p-8 space-y-8 max-w-screen-xl">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl mt-4 font-bold">Admin Dashboard</h1>
      </div>
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-3xl font-bold">Manage Quiz</h2>
        <AdminButton
          onClick={() => router.push("/admin/dashboard/quiz/create-quiz")}
        >
          Buat Quiz
        </AdminButton>
      </div>
      {quizzes.length === 0 ? (
        <p>Belum ada quiz</p>
      ) : (
        <div>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="mb-4">
              <h3 className="text-xl font-bold">{quiz.title}</h3>
              <p>{quiz.description}</p>
              <div className="flex space-x-4">
                <AdminButton onClick={() => handleDelete(quiz.id)}>
                  Hapus
                </AdminButton>
                <Link href={`/admin/dashboard/quiz/edit-quiz/${quiz.id}`}>
                  <AdminButton>Edit</AdminButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
