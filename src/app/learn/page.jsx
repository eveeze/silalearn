// app/course/page.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "@/components/search";
import Card from "@/components/card";


const dummyCourses = [
  {
    id: 1,
    title: "Pengertian Pancasila sebagai Dasar Negara",
    description: "pelajari pancasila sebagai dasar negara",
    price: 0,
  },
  {
    id: 2,
    title: "Pancasila sebagai filosofi negara",
    description: "Pelajari Pancasila sebagai filosofi negara",
    price: 199.99,
  },
  {
    id: 3,
    title: "Sejarah Lahirnya Pancasila",
    description: "Pelajari bagaimana sejarah pancasila ",
    price: 299.99,
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
          <h1 className="text-6xl font-bold mt-16">Courses</h1>
        </div>
        <div className="mt-12">
          <Search id={"search"} name={"search"} />
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
