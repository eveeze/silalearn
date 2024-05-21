// components/CourseCard.js

import Image from "next/image";
import Link from "next/link";
import AdminButton from "./adminButton";

export default function AdminCard({ course }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto border-2 border-black">
      <div className="p-8 flex justify-center items-center">
        <Image
          src={"/logo/logo_silalearn.png"}
          width={150}
          height={150}
          alt="logo silalearn"
          className=""
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold ">{course.title}</h2>
        <p>{course.description}</p>
        <p>${course.price}</p>
        <div className="grid grid-cols-2 gap-8 items-center">
          <div>
            <AdminButton className="!bg-black">Edit Course</AdminButton>
          </div>
          <div>
            <AdminButton className="!bg-merah-300">Delete Course</AdminButton>
          </div>
        </div>
      </div>
    </div>
  );
}
