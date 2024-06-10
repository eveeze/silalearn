// app/learn/page.jsx

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "@/components/search";
import Card from "@/components/card";
import { spartan } from "../layout";
import { josefin } from "../layout";
import { righteous } from "../layout";
import { Player } from "@lottiefiles/react-lottie-player";
export default function CoursesPage() {
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

  return (
    <div className="w-full min-h-dvh mx-auto space-y-8 bg-merah-100 p-8 max-w-screen-xl">
      <div className="grid grid-cols-2">
        <div>
          <h1
            className={`text-2xl md:text-3xl lg:text-[40px] font-bold mt-20 ${spartan.className}`}
          >
            Video Pembelajaran
          </h1>
        </div>
        <div className="mt-12">
          <Search placeholder="Cari Video " id={"search"} name={"search"} />
        </div>
      </div>
      {courses.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Player
            src={
              "https://lottie.host/366c04e0-7efe-44fc-9d0e-8a5bf5d5a984/hfFNKGw63D.json"
            }
            className="player w-[400px] h-[400px] "
            autoplay
            loop
          />
          <h1 className="text-4xl font-bold">Video Pembelajaran Kosong</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div className="overflow-hidden height-100%" key={course.id}>
              <Card course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
