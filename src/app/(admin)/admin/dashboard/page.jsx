"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("/api/admin/user"); // Sesuaikan endpoint API
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto p-8">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl mt-4 font-bold">Admin Dashboard</h1>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Users and Their Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div className="p-4 border rounded-lg shadow-md" key={user.id}>
              <h3 className="text-xl font-bold">{user.fullName}</h3>
              <p>{user.email}</p>
              <div className="mt-4">
                <h4 className="font-bold">Courses:</h4>
                <ul className="list-disc list-inside">
                  {user.courses.map((course) => (
                    <li key={course.id}>{course.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
