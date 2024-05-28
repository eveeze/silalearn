// app/admin/dashboard/course/edit-course/[slug]/page.jsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import slugify from "slugify";

export default function EditCourse() {
  const router = useRouter();
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const cookie = useCookies();

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`/api/courses/${slug}`);
        const course = response.data;
        setTitle(course.title);
        setDescription(course.description);
        setVideoUrl(course.videoUrl);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    }

    fetchCourse();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSlug = slugify(title, { lower: true }); // Perbaikan: Menggunakan slug baru yang dihasilkan dari judul yang diubah
      await axios.put(
        `/api/admin/course/${slug}`,
        {
          title,
          description,
          videoUrl,
          slug: newSlug, // Perbaikan: Menggunakan slug baru untuk mengidentifikasi course yang diubah
        },
        {
          headers: { Authorization: "Bearer " + cookie.get("adminAuthToken") },
        }
      );
      router.push("/admin/dashboard/course");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="min-h-screen max-w-screen-md mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="videoUrl" className="block text-lg font-medium">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}
