// components/CourseCard.jsx

import Image from "next/image";
import Link from "next/link";
import AdminButton from "./adminButton";

export default function AdminCard({ course, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto border-2 border-black transform transition-transform hover:scale-105 duration-300">
      <div className="p-8 flex justify-center items-center">
        <Image
          src={"/logo/logo_silalearn.png"}
          width={150}
          height={150}
          alt="logo silalearn"
          className="transition-opacity duration-300 hover:opacity-80"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold transition-colors duration-300 hover:text-merah-300">
          {course.title}
        </h2>
        <p className="transition-colors duration-300 hover:text-gray-700">
          {course.description}
        </p>
        <div className="grid grid-cols-2 gap-8 items-center mt-4">
          <div>
            <AdminButton
              onClick={onEdit}
              className="!bg-white border-2 border-merah-300 !text-merah-300 transition-colors duration-300 hover:!bg-merah-200"
            >
              Edit Course
            </AdminButton>
          </div>
          <div>
            <AdminButton
              onClick={onDelete}
              className="!bg-merah-300 transition-colors duration-300 hover:!bg-merah-700"
            >
              Delete Course
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
  );
}
