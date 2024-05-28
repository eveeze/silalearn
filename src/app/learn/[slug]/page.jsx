// app/learn/[slug]/page.jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import VideoPlayer from "@/components/VideoPlayer";

export default function CourseDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (slug) {
          const response = await axios.get(`/api/courses/${slug}`);
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
    <div className="course-detail-page">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      {course.videoUrl && <VideoPlayer url={course.videoUrl} />}
    </div>
  );
}
