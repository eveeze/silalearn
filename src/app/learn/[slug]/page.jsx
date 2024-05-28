// app/learn/[slug]/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import VideoPlayer from "@/components/VideoPlayer";
import { spartan, josefin } from "@/app/layout";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (slug) {
          const response = await axios.get(`/api/courses/${slug}`);
          console.log("Fetched course data:", response.data); // Debugging log
          setCourse(response.data);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [slug]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-dvh mx-auto space-y-8 p-8 max-w-screen-xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto border-2 border-black p-8 mt-16">
        {course.videoUrl ? (
          <VideoPlayer url={course.videoUrl} />
        ) : (
          <p>Video not available</p>
        )}
        <h1 className={`text-3xl font-bold mb-4 ${spartan.className}`}>
          {course.title}
        </h1>
        <p className={`text-gray-700 mb-8 ${josefin.className}`}>
          {course.description}
        </p>
      </div>
    </div>
  );
}
