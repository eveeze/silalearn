import Image from "next/image";
import Link from "next/link";
import { josefin, spartan } from "@/app/layout";
export default function Card({ course }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto border-2 border-black transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="p-8 flex justify-center items-center bg-gray-100">
        <Image
          src={"/logo/logo_silalearn.png"}
          width={150}
          height={150}
          alt="logo silalearn"
          className=""
        />
      </div>
      <div className="p-8">
        <h2 className={`text-2xl font-bold mb-2 ${spartan.className}`}>
          {course.title}
        </h2>
        <p className={`text-gray-700 mb-4 ${josefin.className}`}>
          {course.description}
        </p>
        <Link
          className="text-black text-lg hover:underline mt-4 block"
          href={`/courses/${course.slug}`}
        >
          Belajar Sekarang
        </Link>
      </div>
    </div>
  );
}
