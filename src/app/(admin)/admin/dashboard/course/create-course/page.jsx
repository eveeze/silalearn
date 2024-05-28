"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

export default function CreateCourse() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const cookies = useCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/admin/course",
        {
          title,
          description,
          videoUrl,
        },
        {
          headers: { Authorization: "Bearer " + cookies.get("adminAuthToken") },
        }
      );
      router.push("/admin/dashboard/course");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="min-h-screen max-w-screen-md mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Create Course</h1>
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
          Create Course
        </button>
      </form>
    </div>
  );
}
