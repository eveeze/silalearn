"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
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
        "Silalearn menawarkan akses gratis ke sebagian besar kontennya. Pengguna dapat menikmati berbagai materi pembelajaran dan modul interaktif tanpa biaya. Namun, untuk fitur premium seperti kursus mendalam, sertifikasi, dan konsultasi dengan ahli, mungkin dikenakan biaya tertentu.",
    },
    {
      question: "Apa jenis materi pembelajaran yang tersedia di SilaLearn?",
      answer:
        "Rangkuman tentang berbagai jenis materi pembelajaran yang dapat diakses di SilaLearn, mulai dari  video, kuis. Juga, bagaimana materi-materi tersebut disusun dan dikelompokkan untuk memudahkan pengguna dalam memilih topik yang diminati.",
    },
  ];

  return (
    <>
      <div className="min-h-dvh w-full mx-auto ">
        <div className="grid grid-cols-2 mt-16 p-8 gap-8 bg-gradient-to-b from-merah-300 to-merah-200">
          <div className="mt-8 space-y-6 text-center">
            <h1 className="text-5xl font-bold text-black mt-32">
              Perluas Wawasan Dengan SILALEARN
            </h1>
            <h2 className="text-lg">
              Jelajahi Semangat Pancasila, program edukasi seru yang dikemas
              dengan video animasi informatif dan kuis interaktif! Temukan makna
              mendalam Pancasila, uji pemahamanmu, dan dapatkan hadiah menarik!
              Cocok untuk pelajar, masyarakat umum, dan pecinta Indonesia.
            </h2>
            <div className="flex items-center justify-center mt-16 gap-8">
              <button className="btn hover:bg-merah-500 focus:ring focus:outline-none focus:ring-red-500">
                Mulai Belajar
              </button>
              <button className="btn hover:bg-merah-500 focus:ring focus:outline-none focus:ring-red-500">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={"/image/hero.png"}
              width={548}
              height={394}
              alt="hero image"
              className="mt-8"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto p-8 bg-gradient-to-t from-merah-300 to-merah-200">
          <div className="flex items-center justify-center">
            <Image
              src={"/image/about.png"}
              width={500}
              height={500}
              alt="About Image"
            />
          </div>
          <div id="about" className="mt-14">
            <h1 className="text-6xl font-bold text-left">About Us</h1>
            <p className="text-2xl font-normal mt-6">
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
        <div className="min-h-dvh bg-gradient-to-b from-merah-300 to-merah-200">
          <div className="w-full max-w-screen-xl mx-auto px-8">
            <div className="text-black">
              <div className="border-2 border-transparent border-opacity-25 rounded-3xl mb-4 flex flex-col md:flex-row items-center">
                <h1 className="text-6xl font-bold mb-8 text-center justify-center flex items-center gap-4 mt-16">
                  FAQ
                </h1>
              </div>

              <div className="mb-8">
                {dummyData.map((data, index) => (
                  <div key={index} className="mb-4">
                    <button
                      className="border-2 border-white border-opacity-25 rounded-3xl p-6 mt-4 mb-4 w-full"
                      onClick={() => toggleQuestion(index)}
                    >
                      <div className="relative text-left">
                        <div>
                          <h1 className="font-bold text-2xl">
                            {data.question}
                          </h1>
                          {activeQuestion === index && (
                            <p className="text-paragraph mt-2">{data.answer}</p>
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
