"use client";
// app/admin/dashboard/course/page.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import AdminButton from "@/components/adminButton";
import AdminCard from "@/components/adminCard";
import { useRouter } from "next/navigation";

export default function CourseDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  const createCourse = () => {
    router.push("/admin/dashboard/course/create-course");
  };

  // Menggunakan slug sebagai parameter untuk editCourse
  const editCourse = (slug) => {
    router.push(`/admin/dashboard/course/edit-course/${slug}`);
  };

  const deleteCourse = async (slug) => {
    try {
      await axios.delete(`/api/admin/course/${slug}`);
      setCourses(courses.filter((course) => course.slug !== slug));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto space-y-8 p-8">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl mt-4 font-bold">Admin Dashboard</h1>
      </div>
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-3xl font-bold">Manage Courses</h2>
        <AdminButton onClick={createCourse}>Create Course</AdminButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {courses.map((course) => (
          <div className="p-4 border rounded-lg shadow-md" key={course.id}>
            <AdminCard
              course={course}
              // Menggunakan slug sebagai parameter untuk onEdit
              onEdit={() => editCourse(course.slug)}
              onDelete={() => deleteCourse(course.slug)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
