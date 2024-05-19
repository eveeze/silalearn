// components/CourseCard.js

import Image from "next/image";
import Link from "next/link";

export default function Card({ course }) {
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
      <div className="p-8">
        <h2 className="text-2xl font-bold ">{course.title}</h2>
        <p>{course.description}</p>
        <p>${course.price}</p>
        <div></div>
        <Link
          className="text-black text-lg hover:underline mt-4 block"
          href={"learn/course/" + course.slug}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
