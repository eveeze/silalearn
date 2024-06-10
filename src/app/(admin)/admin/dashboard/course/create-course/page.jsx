// admin/dashboard/course/create-course
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/course", {
        title,
        description,
        videoUrl,
      });
      router.push("/admin/dashboard/course");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="text-white max-w-screen-sm mx-auto mt-8 p-8 md:p-16 border-2 bg-merah-300 border-merah-700 rounded-xl mb-16 ">
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
            placeholder="Masukan Judul Video Pembelajaran"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black "
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            placeholder="Masukan Deskripsi Video Pembelajaran"
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded h-[150px] text-black "
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="videoUrl" className="block text-lg font-medium">
            Video URL
          </label>
          <input
            type="text"
            id="videoUrl"
            placeholder="Masukan Link Video Pembelajaran"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="text-black ${josefin.className} w-full border-2 border-merah-800 bg-merah-100 focus:ring-2 focus:outline-none focus:ring-merah-700  shadow-lg shadow-red-500/50 dark:shadow-lg hover:bg-merah-200 hover:border-2 hover:border-merah-700 font-medium rounded-xl text-sm px-8 py-4 text-center me-2 mb-2 mt-4"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
