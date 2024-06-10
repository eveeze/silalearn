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
    <div className="text-white max-w-screen-sm mx-auto mt-8 p-8 md:p-16 border-2 bg-merah-300 border-merah-700 rounded-xl mb-16">
      <h1 className="text-4xl font-bold mb-8">Edit Video Pembelajaran</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">
            Judul
          </label>
          <input
            type="text"
            id="title"
            placeholder="Masukan Judul yang baru"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium">
            Deskripsi
          </label>
          <textarea
            id="description"
            placeholder="Masukan Deskripsi yang baru"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black h-[150px]"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="videoUrl" className="block text-lg font-medium">
            Link Video
          </label>
          <input
            type="text"
            id="videoUrl"
            placeholder="Masukan Link Video yang baru"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="text-black ${josefin.className} w-full border-2 border-merah-800 bg-merah-100 focus:ring-2 focus:outline-none focus:ring-merah-700  shadow-lg shadow-red-500/50 dark:shadow-lg hover:bg-merah-200 hover:border-2 hover:border-merah-700 font-medium rounded-xl text-sm px-8 py-4 text-center me-2 mb-2 mt-4"
        >
          Update Video Pembelajaran
        </button>
      </form>
    </div>
  );
}
