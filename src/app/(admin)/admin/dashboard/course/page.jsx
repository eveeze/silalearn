"use client";
// app/admin/dashboard/course/page.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import AdminButton from "@/components/adminButton";
import AdminCard from "@/components/adminCard";
import { useRouter } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { Player } from "@lottiefiles/react-lottie-player";
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
        <h2 className="text-3xl font-bold">Kelola Video Pembelajaran</h2>
        <AdminButton onClick={createCourse}>Create Course</AdminButton>
      </div>
      {courses.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Player
            src={
              "https://lottie.host/564cfe76-8786-4125-a92a-123715e2f3c8/u2gdUDYNVi.json"
            }
            className="player w-[400px] h-[400px] "
            loop
            autoplay
          />
          <h1 className="text-2xl font-bold mt-4">
            Video Pembelajaran Belum ditambahkan
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {courses.map((course) => (
            <div className="" key={course.id}>
              <AdminCard
                course={course}
                onEdit={() => editCourse(course.slug)}
                onDelete={() => deleteCourse(course.slug)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
