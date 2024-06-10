// app/admin/dashboard/page.jsx

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DashboardCard from "@/components/dashboardCard";

export default function Dashboard() {
  const [quizCount, setQuizCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [usersWithQuizResults, setUsersWithQuizResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const quizCountResponse = await axios.get("/api/quiz/count");
        setQuizCount(quizCountResponse.data.count);

        const courseCountResponse = await axios.get("/api/courses/count");
        setCourseCount(courseCountResponse.data.count);

        const userCountResponse = await axios.get("/api/user/count");
        setUserCount(userCountResponse.data.count);

        const usersWithQuizResultsResponse = await axios.get(
          "/api/user/quiz-results"
        );
        setUsersWithQuizResults(usersWithQuizResultsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto space-y-8 p-8">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl mt-4 font-bold">Dashboard Admin</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <DashboardCard title="Total Quiz" count={quizCount} />
        <DashboardCard title="Total Video Pembelajaran" count={courseCount} />
        <DashboardCard title="Total Pengguna" count={userCount} />
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold">List User dan Nilai Quiz</h2>
        <ul className="mt-4 space-y-4">
          {usersWithQuizResults.map((user) => (
            <UserQuizResults key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function UserQuizResults({ user }) {
  const [showQuizResults, setShowQuizResults] = useState(false);

  return (
    <li className="border p-4 rounded-lg shadow">
      <p>
        <strong>Nama:</strong> {user.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.quizResults.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowQuizResults(!showQuizResults)}
            className="bg-merah-500 text-white px-4 py-2 rounded hover:bg-merah-700 focus:outline-none focus:ring-2 focus:ring-merah-400"
          >
            {showQuizResults ? "Sembunyikan" : "Tampilkan"} Hasil Quiz
          </button>
          {showQuizResults && (
            <div className="mt-4">
              <p className="font-bold">Hasil Quiz:</p>
              {user.quizResults.map((result, index) => (
                <div key={index} className="mt-2 p-4 border rounded shadow-sm">
                  <p>
                    <strong>Quiz:</strong> {result.quiz.title}
                  </p>
                  <p>
                    <strong>Skor:</strong> {result.score}
                  </p>
                  <p>
                    <strong>Durasi:</strong> {result.duration} detik
                  </p>
                  <p>
                    <strong>Mengerjakan pada :</strong>{" "}
                    {new Date(result.startedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}
