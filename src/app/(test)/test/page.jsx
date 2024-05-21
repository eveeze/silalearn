"use client";
import Input from "@/components/input";
import HeroTopIcon from "@/icons/hero_top";
import Card from "@/components/card";

const Courses = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    price: 0,
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    description:
      "Become a full-stack web developer with this comprehensive course.",
    price: 199.99,
  },
  {
    id: 3,
    title: "Data Science and Machine Learning",
    description:
      "Master data science and machine learning with practical projects.",
    price: 299.99,
  },
];
export default function Test() {
  return (
    <div className="pt-24 pb-96 bg-merah-100">
      {/* Button */}
      <h1>ini button</h1>

      <div className="p-12 ">
        <Input
          type={"text"}
          id={"confirmEmail"}
          name={"confirmEmail"}
          title={"Konfirmasi Email"}
          placeholder={"email@gmail.com"}
        />
      </div>
      <div className="p-12"></div>
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {Courses.map((Courses, i) => (
          <div key={i}>
            <Card course={Courses} key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
