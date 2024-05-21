// app/course/page.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "@/components/search";
import Card from "@/components/card";
import { spartan } from "../layout";
import { josefin } from "../layout";
import { righteous } from "../layout";

const dummyCourses = [
  {
    id: 1,
    title: "Pengertian Pancasila sebagai Dasar Negara",
    description: "pelajari pancasila sebagai dasar negara",
  },
  {
    id: 2,
    title: "Pancasila sebagai filosofi negara",
    description: "Pelajari Pancasila sebagai filosofi negara",
  },
  {
    id: 3,
    title: "Sejarah Bagaimana Lahirnya Pancasila",
    description: "Pelajari bagaimana sejarah pancasila ",
  },
];
export default function CoursesPage() {
  {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      async function fetchCourses() {
        try {
          const response = await axios.get("/api/course");
          setCourses(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }

      fetchCourses();
    }, []);
  }
  return (
    <div className="w-full min-h-dvh mx-auto space-y-8 bg-merah-100 p-8 max-w-screen-xl">
      <div className="grid grid-cols-2">
        <div>
          <h1 className={`text-5xl font-bold mt-20 ${spartan.className}`}>
            Video Pembelajaran
          </h1>
        </div>
        <div className="mt-12">
          <Search
            placeholder="Cari Video Pembelajaran"
            id={"search"}
            name={"search"}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {dummyCourses.map((course, i) => (
          <div className="overflow-hidden height-100%" key={i}>
            <Card course={course} key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
