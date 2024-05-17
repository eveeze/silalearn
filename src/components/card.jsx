// components/CourseCard.js

import Image from "next/image";
import Link from "next/link";

export default function Card({ course }) {
  return (
    <div className="bg-red-300 shadow-lg rounded-lg overflow-hidden mx-auto border-4 border-red-400">
      <div className="p-8 flex justify-center items-center">
        <Image
          src={"/logo/logo_silalearn.png"}
          width={150}
          height={150}
          alt="logo silalearn"
          className=""
        />
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-bold ">{course.title}</h2>
        <p>{course.description}</p>
        <p>${course.price}</p>
        <div></div>
        <Link
          className="text-white text-lg hover:underline mt-4 block"
          href={"learn/course/" + course.slug}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
