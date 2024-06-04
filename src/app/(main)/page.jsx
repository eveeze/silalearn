"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { josefin } from "../layout";
import { spartan } from "../layout";
import Link from "next/link";
export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion((prevQuestion) =>
      prevQuestion === index ? null : index
    );
  };

  const dummyData = [
    {
      question: "Apa itu Silalearn ?",
      answer:
        "Silalearn adalah platform pembelajaran online yang dirancang khusus untuk mempelajari Pancasila. Melalui Silalearn, pengguna dapat mengakses berbagai materi pembelajaran, video, kuis, dan modul interaktif yang membantu dalam memahami dan mengamalkan nilai-nilai Pancasila dalam kehidupan sehari-hari.",
    },
    {
      question: "Apakah Silalearn gratis?",
      answer:
        "Silalearn menawarkan akses gratis . Pengguna dapat menikmati berbagai materi pembelajaran dan modul interaktif tanpa biaya.",
    },
    {
      question: "Apa jenis materi pembelajaran yang tersedia di Silalearn?",
      answer:
        "Rangkuman tentang berbagai jenis materi pembelajaran yang dapat diakses di SilaLearn, mulai dari  video, kuis. Juga, bagaimana materi-materi tersebut disusun dan dikelompokkan untuk memudahkan pengguna dalam memilih topik yang diminati.",
    },
  ];

  return (
    <>
      <div className="min-h-dvh w-full mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 p-8 gap-8 bg-merah-100">
          <div className="mt-8 space-y-4 text-center md:text-right">
            <h1
              className={`text-4xl md:text-[64px] font-bold text-black mt-32 ${spartan.className}`}
            >
              Perluas Wawasan Dengan Silalearn
            </h1>
            <h2 className={`${josefin.className} text-2xl font-medium`}>
              Halo teman-teman! Di SilaLearn, kalian bisa belajar Pancasila
              dengan cara yang seru. Temukan video, cerita, kuis, dan permainan
              menarik di sini. Ayo mulai belajar dan jadi pahlawan Pancasila!
            </h2>
            <div className="flex items-center justify-center mt-16 gap-8">
              <Link
                href={"/learn"}
                className="btn hover:bg-merah-500 focus:ring focus:outline-none focus:ring-red-500 font-medium rounded-lg"
              >
                Mulai Belajar
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={"/image/hero_final.png"}
              width={500}
              height={300}
              alt="hero image"
              className="mt-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto p-8 bg-merah-100">
          <div className="flex items-center justify-center mt-20">
            <Image
              src={"/image/about.png"}
              width={500}
              height={500}
              alt="About Image"
            />
          </div>

          <div id="about" className="mt-14">
            <h1
              className={`text-[64px] ${spartan.className} font-bold text-left`}
            >
              About Us
            </h1>
            <p className={`text-2xl font-medium mt-6 ${josefin.className}`}>
              Silalearn hadir sebagai solusi belajar yang menyenangkan dan
              interaktif bagi anak-anak. Didirikan dengan visi untuk menumbuhkan
              kecintaan belajar pada anak-anak, Silalearn menawarkan berbagai
              video pembelajaran dan kuis seru yang dikemas dengan menarik dan
              mudah dipahami. Dengan video animasi penuh warna dan kuis
              interaktif, Silalearn membantu anak-anak belajar dengan lebih
              mudah, menyenangkan, dan meningkatkan pemahaman mereka. Silalearn
              menyediakan berbagai topik pembelajaran yang sesuai dengan usia
              dan minat anak-anak, serta dirancang dengan antarmuka yang mudah
              digunakan dan ramah anak.
            </p>
          </div>
        </div>

        <div className="min-h-dvh bg-merah-100">
          <div className="w-full max-w-screen-xl mx-auto px-8">
            <div className="text-black">
              <div className="border-2 border-transparent border-opacity-25 rounded-3xl mb-4 flex flex-col md:flex-row items-center">
                <h1
                  className={`text-6xl font-bold mb-8 text-center justify-center flex items-center gap-4 mt-16 ${spartan.className}`}
                >
                  FAQ
                </h1>
              </div>

              <div className="mb-8">
                {dummyData.map((data, index) => (
                  <div key={index} className="mb-4">
                    <button
                      className="border-2 border-black border-opacity-25 rounded-3xl p-6 mt-4 mb-4 w-full"
                      onClick={() => toggleQuestion(index)}
                    >
                      <div className="relative text-left">
                        <div>
                          <h1
                            className={`font-bold text-2xl ${spartan.className}`}
                          >
                            {data.question}
                          </h1>
                          {activeQuestion === index && (
                            <p
                              className={`text-paragraph mt-2 ${josefin.className}`}
                            >
                              {data.answer}
                            </p>
                          )}
                        </div>
                        <FiArrowUpRight className="flex float-end size-8 " />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
